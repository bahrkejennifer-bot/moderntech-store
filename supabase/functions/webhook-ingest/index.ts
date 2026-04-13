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

    const affiliateTag = "moderntechs04-20";
    const saved = [];
    const updated = [];
    const skipped = [];

    // Fetch existing products for dedup / upsert
    const { data: existing } = await supabase.from("scraped_products").select("id, title, affiliate_link");
    const existingMap = new Map(
      (existing || []).map((p) => [p.title.toLowerCase().trim(), p])
    );

    for (const product of products.slice(0, 10)) {
      const title = product.title || "Untitled";
      const normalizedTitle = title.toLowerCase().trim();

      // Build affiliate link
      let affiliateLink = product.product_url || product.affiliate_link || "";
      if (affiliateLink && !affiliateLink.includes("tag=")) {
        const sep = affiliateLink.includes("?") ? "&" : "?";
        affiliateLink = `${affiliateLink}${sep}tag=${affiliateTag}`;
      } else if (!affiliateLink) {
        affiliateLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}&tag=${affiliateTag}`;
      }

      const match = existingMap.get(normalizedTitle);

      if (match) {
        // UPSERT: Update existing product with fresh link, image, price & mark active
        const { error } = await supabase
          .from("scraped_products")
          .update({
            affiliate_link: affiliateLink,
            price: product.price || match.price,
            image_url: product.image_url || match.image_url,
            source_url: url || null,
            is_active: true,
          })
          .eq("id", match.id);

        if (!error) updated.push(title);
        continue;
      }

      // INSERT new product
      const { data: inserted, error } = await supabase
        .from("scraped_products")
        .insert({
          title,
          price: product.price || null,
          image_url: product.image_url || null,
          affiliate_link: affiliateLink,
          source_url: url || null,
          category: product.category || null,
          is_active: true,
        })
        .select()
        .single();

      if (!error && inserted) {
        existingMap.set(normalizedTitle, inserted);
        saved.push(inserted);
      }
    }

    return new Response(
      JSON.stringify({ success: true, saved: saved.length, updated: updated.length, skipped: skipped.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
