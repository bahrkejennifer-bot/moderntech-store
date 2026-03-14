import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Trending keywords mapped to our product categories for 2026
const TRENDING_TOPICS: Record<string, { keywords: string[]; hashtags: string[] }> = {
  "Health & Wellness": {
    keywords: [
      "smart ring 2026", "biohacking for beginners", "sleep quality tracker",
      "titanium wearable tech", "longevity tech", "oura ring review",
      "fitness tracker comparison", "health wearable", "biometric tracking",
      "minimalist tech aesthetic", "wellness gadgets", "recovery wearable"
    ],
    hashtags: [
      "#SmartRing", "#Biohacking", "#SleepTracker", "#WearableTech",
      "#HealthTech", "#FitnessTracker", "#Longevity", "#OuraRing",
      "#WellnessTech", "#BiometricTracking"
    ],
  },
  "Home & Safety": {
    keywords: [
      "smart home 2026", "home security system", "smart lock review",
      "video doorbell best", "home automation", "smart camera indoor",
      "mesh wifi setup", "child safety tech", "smart smoke detector"
    ],
    hashtags: [
      "#SmartHome", "#HomeSecurity", "#SmartLock", "#HomeAutomation",
      "#SafeHome", "#TechHome", "#SmartCamera", "#HomeSafety"
    ],
  },
  "Content Creator Corner": {
    keywords: [
      "content creator gear 2026", "youtube setup beginner", "podcast equipment",
      "streaming setup", "creator studio essentials", "ring light review",
      "USB microphone best", "stream deck setup", "creator on a budget"
    ],
    hashtags: [
      "#ContentCreator", "#CreatorGear", "#YouTubeSetup", "#PodcastGear",
      "#StreamingSetup", "#CreatorEssentials", "#TechCreator"
    ],
  },
};

const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate, I earn from qualifying purchases. I am an amazon associate and that I make a small percentage from sales.";

function buildTrendingDescription(
  product: any,
  category: string,
  trendKeyword: string
): string {
  const topicData = TRENDING_TOPICS[category];
  const hashtags = topicData
    ? topicData.hashtags.slice(0, 5).join(" ")
    : "#TechDeals";

  const templates = [
    `🔥 TRENDING: ${trendKeyword}\n\n${product.title} is exactly what you need. Top-rated and trending right now!\n\n${AFFILIATE_DISCLOSURE}\n\n${hashtags}`,
    `📈 ${trendKeyword} is blowing up!\n\nGet ahead of the trend with ${product.title} — smart pick for 2026.\n\n${AFFILIATE_DISCLOSURE}\n\n${hashtags}`,
    `✨ Everyone's searching for "${trendKeyword}" — here's our top pick:\n\n${product.title}\n\n${AFFILIATE_DISCLOSURE}\n\n${hashtags}`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const accessToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
    const boardId = Deno.env.get("PINTEREST_BOARD_ID");

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json().catch(() => ({}));
    const { publish = false, pins_per_category = 2 } = body;

    // Pull products from each category
    const { data: products, error } = await supabase
      .from("scraped_products")
      .select("*")
      .in("category", Object.keys(TRENDING_TOPICS))
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw new Error(`DB query failed: ${error.message}`);
    if (!products?.length) {
      return new Response(
        JSON.stringify({ success: true, message: "No products found", pins: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Group products by category
    const byCategory: Record<string, typeof products> = {};
    for (const p of products) {
      const cat = p.category || "General";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(p);
    }

    // Build trending pins — pick top products per category + match trending keywords
    const trendingPins: any[] = [];

    for (const [category, catProducts] of Object.entries(byCategory)) {
      const topicData = TRENDING_TOPICS[category];
      if (!topicData) continue;

      const selected = catProducts.slice(0, pins_per_category);
      for (const product of selected) {
        // Pick a random trending keyword for this category
        const keyword =
          topicData.keywords[Math.floor(Math.random() * topicData.keywords.length)];

        trendingPins.push({
          category,
          trending_keyword: keyword,
          pin: {
            title: `${product.title}`.substring(0, 100),
            description: buildTrendingDescription(product, category, keyword),
            link: product.affiliate_link,
            image_url: product.image_url,
            board_id: boardId || "NOT_CONFIGURED",
          },
          product_id: product.id,
        });
      }
    }

    // Publish if requested
    const pinResults: any[] = [];
    if (publish && accessToken && boardId) {
      for (const entry of trendingPins) {
        try {
          const pinResponse = await fetch("https://api.pinterest.com/v5/pins", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              board_id: entry.pin.board_id,
              title: entry.pin.title,
              description: entry.pin.description,
              link: entry.pin.link,
              media_source: {
                source_type: "image_url",
                url: entry.pin.image_url,
              },
            }),
          });

          const result = await pinResponse.text();
          console.log(`Trending pin "${entry.pin.title}": ${pinResponse.status} — ${result}`);
          pinResults.push({
            title: entry.pin.title,
            keyword: entry.trending_keyword,
            status: pinResponse.status,
            success: pinResponse.ok,
          });

          await new Promise((r) => setTimeout(r, 2000));
        } catch (pinErr) {
          console.error(`Trending pin error: ${pinErr}`);
          pinResults.push({
            title: entry.pin.title,
            keyword: entry.trending_keyword,
            status: 0,
            success: false,
            error: String(pinErr),
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_trending_pins: trendingPins.length,
        trending_pins: trendingPins,
        ...(publish ? { pin_results: pinResults } : {}),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Trending pins error:", error);
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
