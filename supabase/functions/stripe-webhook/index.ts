import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

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

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
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

      console.log("Processing checkout completion for:", customerEmail);

      if (customerEmail) {
        // Send confirmation email with Resend
        try {
          const emailResponse = await resend.emails.send({
            from: "Modern Tech LLC <onboarding@resend.dev>",
            to: [customerEmail],
            subject: `Your ${productName} is Ready!`,
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
                  <p><strong>What's next?</strong></p>
                  <ul>
                    <li>Check your email for the download link</li>
                    <li>Save your guide to your favorite device</li>
                    <li>Start exploring the expert recommendations inside</li>
                  </ul>
                </div>
                
                <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <h3 style="margin-top: 0; color: #475569;">Need Help?</h3>
                  <p style="margin-bottom: 0;">If you have any questions or need assistance, simply reply to this email. We're here to help!</p>
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

          console.log("Confirmation email sent successfully:", emailResponse);
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // Don't fail the webhook if email fails - log and continue
        }
      } else {
        console.warn("No customer email found in session");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
