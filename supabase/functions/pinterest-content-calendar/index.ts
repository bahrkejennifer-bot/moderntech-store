import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Only the 3 current store pillars
const ACTIVE_CATEGORIES = [
  "Health & Wellness",
  "Home & Safety",
  "Content Creator Corner",
];

// Pin description templates per category for variety
const PIN_TEMPLATES: Record<string, string[]> = {
  "Health & Wellness": [
    "Level up your wellness routine ✨ {title} — a must-have for health-conscious living.",
    "Your health goals just got easier 💪 Check out {title} and feel the difference.",
    "Prioritize your well-being with {title} — trending for a reason! 🌿",
  ],
  "Home & Safety": [
    "Keep your home safe & smart 🏠 {title} — peace of mind, simplified.",
    "Upgrade your home security with {title} — smart protection made easy 🔒",
    "A safer home starts here 🏡 Discover {title} and protect what matters most.",
  ],
  "Content Creator Corner": [
    "Create like a pro 🎬 {title} — the gear every content creator needs.",
    "Upgrade your setup with {title} — your audience will notice the difference ✨",
    "Essential creator gear alert 🎙️ {title} takes your content to the next level.",
  ],
};

const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate, I earn from qualifying purchases. I am an amazon associate and that I make a small percentage from sales.";

function getRandomTemplate(category: string, title: string): string {
  const templates = PIN_TEMPLATES[category] || [
    "Check out {title} — a top pick from Modern Tech! ⚡",
  ];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return `${template.replace("{title}", title)}\n\n${AFFILIATE_DISCLOSURE}`;
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
    const { publish = false, limit = 15 } = body;

    // Pull newest products from the 3 active categories only
    const { data: products, error } = await supabase
      .from("scraped_products")
      .select("*")
      .in("category", ACTIVE_CATEGORIES)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw new Error(`DB query failed: ${error.message}`);
    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No products found for active categories", calendar: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build a monthly content calendar — spread pins across 4 weeks
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Distribute pins evenly across the month (Mon/Wed/Fri schedule)
    const pinDays: number[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dayOfWeek = new Date(year, month, d).getDay();
      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        pinDays.push(d);
      }
    }

    const calendar = products.map((product, idx) => {
      const scheduledDay = pinDays[idx % pinDays.length];
      const scheduledDate = new Date(year, month, scheduledDay);

      return {
        scheduled_date: scheduledDate.toISOString().split("T")[0],
        day_of_week: scheduledDate.toLocaleDateString("en-US", { weekday: "long" }),
        category: product.category,
        pin: {
          title: (product.title || "").substring(0, 100),
          description: getRandomTemplate(product.category || "General", product.title),
          link: product.affiliate_link,
          image_url: product.image_url,
          board_id: boardId || "NOT_CONFIGURED",
        },
        product_id: product.id,
      };
    });

    // Sort by date
    calendar.sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date));

    // If publish=true, actually post to Pinterest
    const pinResults: any[] = [];
    if (publish && accessToken && boardId) {
      for (const entry of calendar) {
        // Only publish pins scheduled for today or earlier
        const today = new Date().toISOString().split("T")[0];
        if (entry.scheduled_date > today) continue;

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
          console.log(`Pin "${entry.pin.title}": ${pinResponse.status}`);
          pinResults.push({
            title: entry.pin.title,
            status: pinResponse.status,
            success: pinResponse.ok,
          });

          // Rate limit protection
          await new Promise((r) => setTimeout(r, 2000));
        } catch (pinErr) {
          console.error(`Pin error: ${pinErr}`);
          pinResults.push({
            title: entry.pin.title,
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
        month: `${year}-${String(month + 1).padStart(2, "0")}`,
        total_pins_scheduled: calendar.length,
        categories: ACTIVE_CATEGORIES,
        calendar,
        ...(publish ? { pin_results: pinResults } : {}),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Content calendar error:", error);
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
