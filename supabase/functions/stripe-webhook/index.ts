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

// Direct download links for Creator Trio products
const DROPBOX_DOWNLOADS: Record<string, { url: string; label: string }> = {
  "faceless-reels-guide": {
    url: "https://www.dropbox.com/scl/fi/64k64w8tv4gx9xcbn3ycn/Copy-of-THE-FACELESS-REELS-GUIDE.pdf?rlkey=lqa72bclfozyyf6x8forzovrk&st=2jk0hgjd&dl=1",
    label: "The Faceless Reels Guide",
  },
  "canva-masterclass": {
    url: "https://www.dropbox.com/scl/fi/0j3w5usws5y3nma47ax55/Copy-of-Canva-Crash-Course.mp4?rlkey=q5ri8tdbmrdfb5s1veh44npzc&st=dfcwgait&dl=1",
    label: "Canva Design Masterclass",
  },
  "faceless-youtube-automation": {
    url: "https://www.dropbox.com/scl/fi/m7jm72g5tda1n9r8ysn1d/Copy-of-FACELESS-YOUTUBE-ESPA-OL-1.pdf?rlkey=n89vv578uzw818ph9u89ispm7&st=h0fd6m0c&dl=1",
    label: "Faceless YouTube AI Automation",
  },
};

const BUNDLE_SLUGS = ["faceless-reels-guide", "canva-masterclass", "faceless-youtube-automation"];

function buildDownloadSection(productSlug: string | undefined): string {
  if (!productSlug) return "";

  // Bundle: show all 3 download links
  if (productSlug === "creator-bundle") {
    const links = BUNDLE_SLUGS.map((slug) => {
      const dl = DROPBOX_DOWNLOADS[slug];
      return `
        <a href="${dl.url}"
           style="display:block;background:#1e293b;color:#f8fafc;padding:14px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;margin-bottom:10px;text-align:center;">
          📥 Download: ${dl.label}
        </a>`;
    }).join("");

    return `
      <div style="margin:30px 0;">
        <p style="font-weight:bold;font-size:16px;margin-bottom:14px;color:#1e293b;">Your 3 Guides Are Ready:</p>
        ${links}
        <p style="margin-top:12px;color:#64748b;font-size:13px;text-align:center;">
          Save these files — your downloads are always available.
        </p>
      </div>`;
  }

  // Single product
  const dl = DROPBOX_DOWNLOADS[productSlug];
  if (dl) {
    return `
      <div style="text-align:center;margin:30px 0;">
        <a href="${dl.url}"
           style="display:inline-block;background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);color:#f8fafc;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;box-shadow:0 4px 14px rgba(30,41,59,0.4);">
          📥 Download ${dl.label}
        </a>
        <p style="margin-top:12px;color:#64748b;font-size:13px;">
          Save your file to keep it forever!
        </p>
      </div>`;
  }

  return "";
}

serve(async (req) => {
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

    // Log abandoned/failed checkouts to checkout_errors for debugging
    if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from("checkout_errors").insert({
          stage: event.type === "checkout.session.expired" ? "session_expired" : "payment_failed",
          product_slug: session.metadata?.productSlug || null,
          customer_email: session.customer_details?.email || null,
          stripe_session_id: session.id,
          amount_cents: session.amount_total ?? null,
          error_message: event.type,
          metadata: { payment_status: session.payment_status, status: session.status },
        });
      } catch (logErr) {
        console.error("Failed to log checkout failure:", logErr);
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object as Stripe.PaymentIntent;
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from("checkout_errors").insert({
          stage: "payment_failed",
          customer_email: pi.receipt_email || null,
          amount_cents: pi.amount ?? null,
          error_code: pi.last_payment_error?.code || null,
          error_message: pi.last_payment_error?.message || "payment_intent.payment_failed",
          metadata: { payment_intent_id: pi.id, decline_code: pi.last_payment_error?.decline_code },
        });
      } catch (logErr) {
        console.error("Failed to log payment failure:", logErr);
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;
      const productName = session.metadata?.productName || "your guide";
      const productSlug = session.metadata?.productSlug;

      console.log("Processing checkout for:", customerEmail, "Product:", productName, "Slug:", productSlug);

      if (customerEmail) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Record the purchase. Bundle purchases grant access to all three included products.
        if (productSlug) {
          try {
            const productSlugs = productSlug === "creator-bundle" ? BUNDLE_SLUGS : [productSlug];
            const { data: products, error: productsError } = await supabase
              .from("digital_products")
              .select("id")
              .in("slug", productSlugs);

            if (productsError) throw productsError;

            if (products?.length) {
              const { data: authUser } = await supabase.auth.admin.listUsers();
              const matchingUser = authUser?.users?.find((u: { email?: string }) => u.email === customerEmail);
              const userId = matchingUser?.id || "00000000-0000-0000-0000-000000000000";

              const purchaseRows = products.map((product) => ({
                  user_id: userId,
                  product_id: product.id,
                  customer_email: customerEmail,
                  stripe_session_id: session.id,
              }));

              const { error: purchaseError } = await supabase
                .from("purchases")
                .upsert(purchaseRows, { onConflict: "stripe_session_id,product_id", ignoreDuplicates: true });

              if (purchaseError) throw purchaseError;
              console.log("Purchase recorded for:", customerEmail, "Products:", productSlugs.join(", "));
            }
          } catch (e) {
            console.error("Error recording purchase:", e);
          }
        }

        // Build download section
        const downloadHtml = buildDownloadSection(productSlug);

        // Build upsell block for non-bundle purchases
        const isBundle = productSlug === "creator-bundle";
        const isFunnelProduct = ["canva-masterclass", "faceless-youtube-automation", "creator-bundle"].includes(productSlug || "");
        let upsellHtml = "";
        if (isFunnelProduct && !isBundle) {
          upsellHtml = `
            <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);border-radius:12px;padding:30px;margin:30px 0;text-align:center;">
              <p style="color:#fbbf24;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">💎 EXCLUSIVE OFFER</p>
              <h3 style="color:#f8fafc;font-size:20px;margin-bottom:12px;">Get the Complete Creator Bundle</h3>
              <p style="color:#94a3b8;font-size:14px;margin-bottom:20px;">
                All 3 guides — Faceless Reels, Canva Masterclass &amp; YouTube Automation — for just <strong style="color:#fbbf24;">$59</strong> <span style="text-decoration:line-through;">$78</span>
              </p>
              <a href="https://moderntech.store/creator-bundle"
                 style="display:inline-block;background:#fbbf24;color:#0f172a;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">
                Upgrade to the Bundle →
              </a>
            </div>`;
        }

        // Send the email
        try {
          const emailResponse = await resend.emails.send({
            from: "Modern Tech LLC <noreply@moderntech.store>",
            to: [customerEmail],
            subject: `Your ${productName} is Ready to Download!`,
            html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;background-color:#ede8e3;">
  <div style="background:#ffffff;border-radius:8px;padding:40px 30px;margin:0 auto;max-width:560px;">
    <div style="text-align:center;margin-bottom:30px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#b0a8a0;margin-bottom:8px;">Modern Tech LLC</p>
      <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#2c2825;margin:0 0 10px;">Thank You for Your Purchase!</h1>
    </div>
    
    <div style="background:#f8f6f3;border-radius:8px;padding:24px;margin-bottom:24px;">
      <h2 style="margin-top:0;font-family:Georgia,serif;font-size:18px;font-weight:400;color:#2c2825;">Your ${productName} is Ready</h2>
      <p style="color:#5a5550;font-size:14px;line-height:1.7;">We're thrilled to have you as a customer! Your purchase has been confirmed and your digital ${isBundle ? "guides are" : "guide is"} ready for download.</p>
    </div>

    ${downloadHtml || `
      <p style="color:#5a5550;font-size:14px;"><strong>What's next?</strong></p>
      <ul style="color:#5a5550;font-size:14px;">
        <li>Your download link will be available shortly</li>
        <li>Save your guide to your favorite device</li>
        <li>Start exploring the expert content inside</li>
      </ul>
    `}

    ${upsellHtml}
    
    <div style="background:#f8f6f3;border-radius:8px;padding:20px;margin:24px 0;">
      <h3 style="margin-top:0;font-family:Georgia,serif;font-size:15px;font-weight:400;color:#2c2825;">Need Help?</h3>
      <p style="margin-bottom:0;color:#5a5550;font-size:13px;">If you have any questions, contact us at <a href="mailto:info@moderntech.store" style="color:#c8a0a0;">info@moderntech.store</a>.</p>
    </div>
    
    <div style="text-align:center;padding-top:20px;border-top:1px solid #e8e3de;">
      <p style="font-family:Georgia,serif;font-size:13px;font-style:italic;color:#2c2825;margin:16px 0 4px;">Modern Tech LLC</p>
      <p style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#b0a8a0;">Tech today · Trend tomorrow</p>
      <p style="margin-top:16px;">
        <a href="https://moderntech.store" style="color:#c8a0a0;text-decoration:none;font-size:12px;">Visit Our Store</a>
      </p>
    </div>
  </div>
</body>
</html>`,
          });

          if (emailResponse?.error) {
            console.error("Resend error:", emailResponse.error);
            throw new Error(emailResponse.error.message || "Email send failed");
          }

          console.log("Purchase email sent to:", customerEmail);

          // Fire Zapier webhook (fire-and-forget)
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
          console.error("Failed to send email:", emailError);
          throw emailError;
        }
      } else {
        console.error("No customer email found");
        throw new Error("No customer email found in session");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase.from("checkout_errors").insert({
        stage: "webhook_error",
        error_message: error instanceof Error ? error.message : String(error),
      });
    } catch (logErr) {
      console.error("Failed to log webhook error:", logErr);
    }
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
