import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("No stripe-signature header found");
      return new Response(JSON.stringify({ error: "No signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the webhook signature using async method for Deno compatibility
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Received Stripe event:", event.type);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;
      const productName = session.metadata?.productName || "your guide";
      const productSlug = session.metadata?.productSlug;

      console.log("Processing checkout completion for:", customerEmail, "Product:", productName, "Slug:", productSlug);

      if (customerEmail) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Generate a signed download URL for the PDF
        let downloadUrl = "";
        let downloadButtonHtml = "";
        let productId: string | null = null;
        
        if (productSlug) {
          try {
            // Look up the product to get the PDF path and id
            const { data: product, error: productError } = await supabase
              .from("digital_products")
              .select("id, pdf_path")
              .eq("slug", productSlug)
              .single();
            
            if (productError) {
              console.error("Error fetching product:", productError);
            } else if (product) {
              productId = product.id;
              
              if (product.pdf_path) {
                // Generate a signed URL that expires in 7 days (604800 seconds)
                const { data: signedUrlData, error: signedUrlError } = await supabase
                  .storage
                  .from("digital-products")
                  .createSignedUrl(product.pdf_path, 604800);
                
                if (signedUrlError) {
                  console.error("Error creating signed URL:", signedUrlError);
                } else if (signedUrlData?.signedUrl) {
                  downloadUrl = signedUrlData.signedUrl;
                  console.log("Generated signed download URL for:", product.pdf_path);
                  
                  downloadButtonHtml = `
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${downloadUrl}" 
                         style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">
                        📥 Download Your Guide Now
                      </a>
                      <p style="margin-top: 12px; color: #64748b; font-size: 14px;">
                        This link expires in 7 days. Save your guide to keep it forever!
                      </p>
                    </div>
                  `;
                }
              }
            }
          } catch (storageError) {
            console.error("Error generating download URL:", storageError);
          }
        }
        
        // Record the purchase in the database
        if (productId) {
          try {
            // Look up the user by email from auth.users
            const { data: authUser } = await supabase.auth.admin.listUsers();
            const matchingUser = authUser?.users?.find(u => u.email === customerEmail);
            const userId = matchingUser?.id || "00000000-0000-0000-0000-000000000000";
            
            // Use upsert to handle webhook retries gracefully
            const { error: purchaseError } = await supabase
              .from("purchases")
              .upsert({
                user_id: userId,
                product_id: productId,
                customer_email: customerEmail,
                stripe_session_id: session.id,
              }, {
                onConflict: "stripe_session_id",
                ignoreDuplicates: true,
              });
            
            if (purchaseError) {
              console.error("Error recording purchase:", purchaseError);
            } else {
              console.log("Purchase recorded successfully for:", customerEmail);
            }
          } catch (purchaseRecordError) {
            console.error("Error recording purchase:", purchaseRecordError);
            // Don't fail the webhook if purchase recording fails
          }
        }
        
        // Send confirmation email with download link + bundle upsell
        const isBundle = productSlug === "creator-bundle";
        const isFunnelProduct = ["canva-masterclass", "faceless-youtube-automation", "creator-bundle"].includes(productSlug || "");
        
        // Build upsell block for non-bundle funnel purchases
        let upsellHtml = "";
        if (isFunnelProduct && !isBundle) {
          upsellHtml = `
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center;">
              <p style="color: #fbbf24; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">💎 EXCLUSIVE OFFER</p>
              <h3 style="color: #f8fafc; font-size: 20px; margin-bottom: 12px;">Get the Complete Creator Bundle</h3>
              <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
                All 3 guides — Faceless Reels, Canva Masterclass &amp; YouTube Automation — for just <strong style="color: #fbbf24;">$59</strong> <span style="text-decoration: line-through;">$78</span>
              </p>
              <a href="https://moderntech.store/creator-funnel"
                 style="display: inline-block; background: #fbbf24; color: #0f172a; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Upgrade to the Bundle →
              </a>
            </div>
          `;
        }

        try {
          const emailResponse = await resend.emails.send({
            from: "Modern Tech LLC <noreply@moderntech.store>",
            to: [customerEmail],
            subject: `Your ${productName} is Ready to Download!`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #2563eb; margin-bottom: 10px;">Thank You for Your Purchase!</h1>
                </div>
                
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                  <h2 style="margin-top: 0; color: #1e40af;">Your ${productName} is Ready</h2>
                  <p>We're thrilled to have you as a customer! Your purchase has been confirmed and your digital guide is ready for download.</p>
                  
                  ${downloadButtonHtml || `
                    <p><strong>What's next?</strong></p>
                    <ul>
                      <li>Your download link will be available shortly</li>
                      <li>Save your guide to your favorite device</li>
                      <li>Start exploring the expert recommendations inside</li>
                    </ul>
                  `}
                </div>

                ${upsellHtml}
                
                <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <h3 style="margin-top: 0; color: #475569;">Need Help?</h3>
                  <p style="margin-bottom: 0;">If you have any questions or need assistance, contact us at info@moderntech.store.</p>
                </div>
                
                <div style="text-align: center; color: #64748b; font-size: 14px;">
                  <p>Best regards,<br><strong>The Modern Tech LLC Team</strong></p>
                  <p style="margin-top: 20px;">
                    <a href="https://moderntechllc.com" style="color: #2563eb; text-decoration: none;">Visit Our Website</a>
                  </p>
                </div>
              </body>
              </html>
            `,
          });

          if (emailResponse?.error) {
            console.error("Resend returned an error:", emailResponse.error);
            throw new Error(emailResponse.error.message || "Email send failed");
          }

          console.log("Confirmation email sent successfully:", emailResponse);

          // Fire Zapier webhook for product purchase (fire-and-forget)
          const zapierUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
          if (zapierUrl) {
            fetch(zapierUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "product_purchase",
                timestamp: new Date().toISOString(),
                source: "moderntech.store",
                email: customerEmail,
                product_name: productName,
                product_slug: productSlug || "",
                amount: (session.amount_total || 0) / 100,
              }),
            }).catch((err) => console.error("Zapier webhook error:", err));
          }
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // Fail the webhook so Stripe retries the event instead of silently succeeding.
          throw emailError;
        }
      } else {
        console.error("No customer email found in session");
        throw new Error("No customer email found in session");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    // Log full error server-side for debugging
    console.error("Webhook error:", error);
    
    // Return generic error to avoid leaking internal details
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
