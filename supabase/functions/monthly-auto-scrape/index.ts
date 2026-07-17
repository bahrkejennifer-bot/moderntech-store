import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const AMAZON_CATEGORY_URLS = [
  {
    niche: "Health & Wellness Tech",
    urls: [
      "https://www.amazon.com/s?k=smart+ring+health+tracker",
      "https://www.amazon.com/s?k=fitness+recovery+wearable",
    ],
  },
  {
    niche: "Smart Home & Security",
    urls: [
      "https://www.amazon.com/s?k=video+doorbell+camera",
      "https://www.amazon.com/s?k=smart+home+security+system",
    ],
  },
  {
    niche: "Creator & Office Tech",
    urls: [
      "https://www.amazon.com/s?k=usb+microphone+content+creator",
      "https://www.amazon.com/s?k=webcam+ring+light+streaming",
    ],
  },
];
const AFFILIATE_TAG = "moderntechs0c-20";

const BLOCKED_TITLE_PATTERNS = [
  /example\.com/i,
  /^example product/i,
  /^placeholder/i,
  /^product\s*\d+$/i,
  /\bant\b|\binsect\b|\bgnat\b|\bfly trap\b|\bpest control\b|\bbug spray\b/i,
  /\bbiker shorts\b|\bgarden flag\b|\bmeat thermometer\b|\bcooling towel\b|\bweighted vest\b|\bpocket hose\b/i,
];

function isValidProduct(product: { title?: string; product_url?: string; image_url?: string }): boolean {
  const title = (product.title || "").trim();
  if (!title || title.toLowerCase() === "untitled product") return false;
  if (BLOCKED_TITLE_PATTERNS.some((re) => re.test(title))) return false;
  const url = product.product_url || "";
  const img = product.image_url || "";
  if (url.includes("example.com") || img.includes("example.com")) return false;
  return true;
}

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
                    "Extract the top 5 best-selling REAL products actually visible on this Amazon page. For each product get the title, price (including currency symbol), main image URL (high-res), and the product page URL (full Amazon URL). If the page did not load properly or you cannot find real products, return an empty products array — never invent, guess, or use example/placeholder data.",
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

            if (!isValidProduct(product)) {
              console.warn(`Rejected fabricated/off-brand product: "${title}"`);
              allSkipped.push(title);
              continue;
            }

            if (existingTitles.has(title.toLowerCase().trim())) {
              allSkipped.push(title);
              continue;
            }

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

          if (products.length > 0) break;
        } catch (scrapeErr) {
          console.error(`Error scraping ${url}:`, scrapeErr);
        }
      }
    }

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
