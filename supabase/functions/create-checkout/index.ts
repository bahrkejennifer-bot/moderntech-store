import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const { priceId, productName, productSlug, amount, successUrl, cancelUrl } = await req.json();

    if (!priceId && !productSlug) {
      return new Response(JSON.stringify({ error: "Product is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const siteUrl = "https://moderntech.store";
    let verifiedName = productName || "Digital Product";
    let verifiedAmount = typeof amount === "number" ? amount : 999;

    if (!priceId && productSlug) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Checkout database configuration is missing");
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { data: product, error: productError } = await supabase
        .from("products_public")
        .select("title, price, is_free")
        .eq("slug", productSlug)
        .maybeSingle();

      if (productError) throw productError;
      if (!product || product.is_free) {
        return new Response(JSON.stringify({ error: "Product is not available for checkout" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }

      verifiedName = product.title;
      verifiedAmount = Math.round(Number(product.price || 0) * 100);
    }

    if (!Number.isFinite(verifiedAmount) || verifiedAmount < 50) {
      return new Response(JSON.stringify({ error: "Invalid product price" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("Creating checkout session for:", { productName: verifiedName, productSlug, amount: verifiedAmount, priceId });

    let sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      success_url: successUrl || `${siteUrl}/digital-products?success=true&product=${productSlug || ""}`,
      cancel_url: cancelUrl || `${siteUrl}/digital-products?canceled=true`,
      metadata: {
        productName: verifiedName,
        productSlug: productSlug || "",
      },
    };

    // If a price ID is provided, use it directly
    if (priceId) {
      sessionConfig.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
    } else {
      // Create a one-time price on the fly
      sessionConfig.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: verifiedName,
            },
            unit_amount: verifiedAmount,
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Error creating checkout session:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";

    // Log failure to checkout_errors for debugging
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (supabaseUrl && supabaseServiceKey) {
        let body: Record<string, unknown> = {};
        try { body = await req.clone().json(); } catch { /* body already consumed */ }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from("checkout_errors").insert({
          stage: "create_checkout",
          product_slug: typeof body.productSlug === "string" ? body.productSlug : null,
          amount_cents: typeof body.amount === "number" ? body.amount : null,
          error_message: errorMessage,
          metadata: { input: body },
        });
      }
    } catch (logErr) {
      console.error("Failed to log checkout error:", logErr);
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
