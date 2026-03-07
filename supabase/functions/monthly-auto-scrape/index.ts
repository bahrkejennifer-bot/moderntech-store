import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const AMAZON_CATEGORY_URLS = [
  {
    niche: "Home Safety",
    urls: [
      "https://www.amazon.com/Best-Sellers-Home-Security-Surveillance/zgbs/hi/2972638011",
      "https://www.amazon.com/gp/new-releases/hi/2972638011",
    ],
  },
  {
    niche: "Health & Wellness",
    urls: [
      "https://www.amazon.com/Best-Sellers-Sports-Outdoors-Exercise-Fitness/zgbs/sporting-goods/3407731",
      "https://www.amazon.com/Best-Sellers-Health-Personal-Care/zgbs/hpc",
    ],
  },
  {
    niche: "Creator Gear",
    urls: [
      "https://www.amazon.com/Best-Sellers-Computers-Accessories-Streaming-Media-Players/zgbs/pc/13Icons880011",
      "https://www.amazon.com/Best-Sellers-Musical-Instruments-Microphones/zgbs/mi/11974561",
    ],
  },
];

const AFFILIATE_TAG = "moderntechs0c-20";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    const accessToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
    const boardId = Deno.env.get("PINTEREST_BOARD_ID");

    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Load existing titles for duplicate detection
    const existingTitles = new Set<string>();
    const { data: existing } = await supabase
      .from("scraped_products")
      .select("title");
    if (existing) {
      for (const p of existing) {
        existingTitles.add(p.title.toLowerCase().trim());
      }
    }

    const allSaved: any[] = [];
    const allSkipped: string[] = [];
    const pinResults: any[] = [];

    for (const category of AMAZON_CATEGORY_URLS) {
      // Try each URL in the category (best sellers first, then new releases)
      for (const url of category.urls) {
        try {
          console.log(`Scraping ${category.niche}: ${url}`);

          const scrapeResponse = await fetch(
            "https://api.firecrawl.dev/v1/scrape",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${firecrawlKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url,
                formats: ["extract"],
                extract: {
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
                    "Extract the top 5 best-selling products from this Amazon page. For each product get the title, price (including currency symbol), main image URL (high-res), and the product page URL (full Amazon URL).",
                },
                waitFor: 3000,
              }),
            }
          );

          const scrapeData = await scrapeResponse.json();
          if (!scrapeResponse.ok) {
            console.error(`Firecrawl error for ${url}:`, scrapeData);
            continue;
          }

          const extractData =
            scrapeData.data?.extract || scrapeData.extract || {};
          const products = extractData.products || [];
          console.log(
            `Found ${products.length} products for ${category.niche}`
          );

          for (const product of products) {
            const title = product.title || "Untitled Product";

            if (existingTitles.has(title.toLowerCase().trim())) {
              allSkipped.push(title);
              continue;
            }

            // Build affiliate link
            let affiliateLink = product.product_url || "";
            if (affiliateLink && !affiliateLink.includes("tag=")) {
              const sep = affiliateLink.includes("?") ? "&" : "?";
              affiliateLink = `${affiliateLink}${sep}tag=${AFFILIATE_TAG}`;
            } else if (!affiliateLink) {
              affiliateLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}&tag=${AFFILIATE_TAG}`;
            }

            const { data: inserted, error: insertError } = await supabase
              .from("scraped_products")
              .insert({
                title,
                price: product.price || null,
                image_url: product.image_url || null,
                affiliate_link: affiliateLink,
                source_url: url,
                category: category.niche,
              })
              .select()
              .single();

            if (insertError) {
              console.error("Insert error:", insertError);
              continue;
            }

            existingTitles.add(title.toLowerCase().trim());
            allSaved.push({ ...inserted, niche: category.niche });

            // Auto-pin to Pinterest
            if (accessToken && boardId && product.image_url) {
              try {
                const pinData = {
                  board_id: boardId,
                  title: title.substring(0, 100),
                  description: `${title} — Shop now! As an Amazon Associate, I earn from qualifying purchases. I am an amazon associate and that i make a small percentage from sales.`,
                  link: affiliateLink,
                  media_source: {
                    source_type: "image_url",
                    url: product.image_url,
                  },
                };

                const pinResponse = await fetch(
                  "https://api.pinterest.com/v5/pins",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pinData),
                  }
                );

                const pinResult = await pinResponse.text();
                console.log(
                  `Pinterest pin for "${title}": ${pinResponse.status}`
                );

                pinResults.push({
                  title,
                  status: pinResponse.status,
                  success: pinResponse.ok,
                });

                // Small delay to avoid rate limiting
                await new Promise((r) => setTimeout(r, 1500));
              } catch (pinErr) {
                console.error(`Pinterest error for "${title}":`, pinErr);
                pinResults.push({
                  title,
                  status: 0,
                  success: false,
                  error: String(pinErr),
                });
              }
            }
          }

          // If we got products from the first URL, skip the fallback
          if (products.length > 0) break;
        } catch (scrapeErr) {
          console.error(`Error scraping ${url}:`, scrapeErr);
        }
      }
    }

    // Generate AI blog post from saved products
    let blogResult = null;
    if (allSaved.length > 0) {
      try {
        console.log("Triggering blog post generation...");
        const blogResponse = await fetch(
          `${supabaseUrl}/functions/v1/generate-blog-post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serviceRoleKey}`,
            },
            body: JSON.stringify({ products: allSaved }),
          }
        );
        blogResult = await blogResponse.json();
        console.log("Blog generation result:", blogResult);
      } catch (blogErr) {
        console.error("Blog generation error:", blogErr);
      }
    }

    // Send webhook to Make.com if configured
    const webhookUrl = Deno.env.get("MAKECOM_WEBHOOK_URL");
    if (webhookUrl && allSaved.length > 0) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "monthly_auto_scrape",
            products: allSaved,
            blog_post: blogResult,
            scraped_at: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error("Webhook error:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        saved_count: allSaved.length,
        skipped_count: allSkipped.length,
        pin_results: pinResults,
        blog_post: blogResult,
        products: allSaved,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Monthly auto-scrape error:", error);
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
