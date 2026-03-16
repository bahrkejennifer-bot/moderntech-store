import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate via shared secret (no JWT needed)
    const webhookSecret = Deno.env.get("WEBHOOK_INGEST_SECRET");
    if (!webhookSecret) {
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const providedSecret = req.headers.get("x-webhook-secret");
    if (providedSecret !== webhookSecret) {
      return new Response(JSON.stringify({ error: "Invalid webhook secret" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { products, url } = body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return new Response(JSON.stringify({ error: "products array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const affiliateTag = "moderntechs0c-20";
    const saved = [];
    const skipped = [];

    // Fetch existing titles for dedup
    const { data: existing } = await supabase.from("scraped_products").select("title");
    const existingTitles = new Set(
      (existing || []).map((p) => p.title.toLowerCase().trim())
    );

    for (const product of products.slice(0, 10)) {
      const title = product.title || "Untitled";
      if (existingTitles.has(title.toLowerCase().trim())) {
        skipped.push(title);
        continue;
      }

      let affiliateLink = product.product_url || product.affiliate_link || "";
      if (affiliateLink && !affiliateLink.includes("tag=")) {
        const sep = affiliateLink.includes("?") ? "&" : "?";
        affiliateLink = `${affiliateLink}${sep}tag=${affiliateTag}`;
      } else if (!affiliateLink) {
        affiliateLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}&tag=${affiliateTag}`;
      }

      const { data: inserted, error } = await supabase
        .from("scraped_products")
        .insert({
          title,
          price: product.price || null,
          image_url: product.image_url || null,
          affiliate_link: affiliateLink,
          source_url: url || null,
          category: product.category || null,
        })
        .select()
        .single();

      if (!error && inserted) {
        existingTitles.add(title.toLowerCase().trim());
        saved.push(inserted);
      }
    }

    return new Response(
      JSON.stringify({ success: true, saved: saved.length, skipped: skipped.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
