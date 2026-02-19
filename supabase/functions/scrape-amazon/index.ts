import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseAuth = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } =
      await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Check admin role using service role client
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action } = body;

    // Handle promote action
    if (action === "promote") {
      const { product } = body;
      if (!product) {
        return new Response(JSON.stringify({ error: "Product data required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const webhookUrl = Deno.env.get("MAKECOM_WEBHOOK_URL");
      if (!webhookUrl) {
        return new Response(JSON.stringify({ error: "Webhook not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "product_promoted",
          title: product.title,
          image_url: product.image_url,
          affiliate_link: product.affiliate_link,
          promoted_at: new Date().toISOString(),
        }),
      });

      if (!webhookResponse.ok) {
        const errText = await webhookResponse.text();
        throw new Error(`Webhook failed [${webhookResponse.status}]: ${errText}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default scrape action
    const url = body.url;
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ error: "Firecrawl not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Scraping Amazon URL:", url);

    // Scrape the page with Firecrawl using JSON extraction
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url.trim(),
        formats: [
          {
            type: "json",
            schema: {
              type: "object",
              properties: {
                products: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      price: { type: "string" },
                      image_url: { type: "string" },
                      product_url: { type: "string" },
                    },
                  },
                  maxItems: 5,
                },
              },
            },
            prompt:
              "Extract the top 5 best-selling products from this Amazon page. For each product get the title, price (including currency symbol), main image URL, and the product page URL (full Amazon URL).",
          },
        ],
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({
          error: scrapeData.error || "Scraping failed",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract products from response
    const jsonData = scrapeData.data?.json || scrapeData.json || {};
    const products = jsonData.products || [];

    if (products.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No products found on this page",
          raw: jsonData,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Found ${products.length} products`);

    const affiliateTag = "moderntechs0c-20";
    const savedProducts = [];

    for (const product of products) {
      // Build affiliate link
      let affiliateLink = product.product_url || "";
      if (affiliateLink && !affiliateLink.includes("tag=")) {
        const separator = affiliateLink.includes("?") ? "&" : "?";
        affiliateLink = `${affiliateLink}${separator}tag=${affiliateTag}`;
      } else if (!affiliateLink) {
        affiliateLink = `https://www.amazon.com/s?k=${encodeURIComponent(product.title || "")}&tag=${affiliateTag}`;
      }

      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("scraped_products")
        .insert({
          title: product.title || "Untitled Product",
          price: product.price || null,
          image_url: product.image_url || null,
          affiliate_link: affiliateLink,
          source_url: url,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        continue;
      }

      savedProducts.push(inserted);
    }

    // Send webhook to Make.com
    const webhookUrl = Deno.env.get("MAKECOM_WEBHOOK_URL");
    if (webhookUrl && savedProducts.length > 0) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "products_scraped",
            source_url: url,
            products: savedProducts,
            scraped_at: new Date().toISOString(),
          }),
        });
        console.log("Webhook response status:", webhookResponse.status);
        await webhookResponse.text();
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        products: savedProducts,
        count: savedProducts.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
