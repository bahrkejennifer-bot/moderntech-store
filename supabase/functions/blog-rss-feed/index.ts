import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://moderntech.store";
const FEED_TITLE = "Modern Tech LLC — Blog & Guides";
const FEED_DESCRIPTION =
  "Expert reviews, buying guides, and curated tech picks for health, home safety, creator gear, and more. As an Amazon Associate, we earn from qualifying purchases.";

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// Static blog posts
const STATIC_ARTICLES = [
  {
    slug: "smart-ring-guide-valentines-2026",
    title: "The Ultimate Smart Ring Guide for 2026",
    category: "Health & Wellness",
    excerpt: "From smart rings that know you're getting sick before you do — here's the wellness tech worth your attention in 2026.",
    image: "https://moderntech-store.lovable.app/src/assets/heroes/smart-ring-guide-hero.png",
    date: "2026-02-02",
  },
  {
    slug: "home-safety-smart-devices-2026",
    title: "6 Smart Home Safety Devices That Actually Protect Your Family",
    category: "Home & Safety",
    excerpt: "Smart locks, video doorbells, and smoke detectors that think. Here's the home safety tech that's worth every penny.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/smart-home-devices-hero.jpg",
    date: "2026-02-05",
  },
  {
    slug: "gaming-monitors-peripherals-2026",
    title: "6 Gaming Upgrades That'll Make Your Friends Jealous",
    category: "Gaming",
    excerpt: "PS5, Steam Deck OLED, 240Hz monitors, and mice lighter than your excuses. Here's the 2026 gaming gear that actually levels you up.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/gaming-monitors-hero.jpg",
    date: "2026-02-10",
  },
  {
    slug: "wireless-earbuds-connectivity-2026",
    title: "The 6 Best Wireless Earbuds & Connectivity Gadgets",
    category: "Connectivity",
    excerpt: "AirPods that adapt, trackers that find your lost everything, and WiFi that reaches the basement.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/wireless-earbuds-hero.jpg",
    date: "2026-02-12",
  },
  {
    slug: "college-essentials-tech-guide-2026",
    title: "Surviving College: The Only 6 Tech Gadgets You Need",
    category: "College & School",
    excerpt: "Skip the dorm room garage sale. Here are the 6 battle-tested gadgets that'll get you through lectures and all-nighters.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/college-tech-hero.jpg",
    date: "2026-02-15",
  },
  {
    slug: "kids-tech-guide-2026",
    title: "Parent-Approved: 6 Tech Toys That Actually Teach",
    category: "Kids Tech",
    excerpt: "Tablets with guardrails, coding robots that make STEM fun, and headphones that protect little ears.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/kids-tech-hero.jpg",
    date: "2026-02-18",
  },
  {
    slug: "creator-gear-starter-kit-2026",
    title: "Creator Gear Starter Kit: 6 Tools Under $200",
    category: "Content Creator Corner",
    excerpt: "Start creating like a pro without breaking the bank. Mics, lights, cameras, and stream decks all under $200.",
    image: "https://moderntech-store.lovable.app/src/assets/blog/tech-default-hero.jpg",
    date: "2026-02-20",
  },
];

// Static guide pages
const STATIC_GUIDES = [
  { path: "/free-smart-ring-guide", title: "Smart Ring Buyer's Guide", excerpt: "Everything you need to know before buying your first smart ring.", date: "2026-01-15" },
  { path: "/free-smart-home-checklist", title: "Smart Home Safety Checklist", excerpt: "Room-by-room safety checklist to protect your family with smart tech.", date: "2026-01-20" },
  { path: "/free-creator-gear-guide", title: "Creator Gear Guide", excerpt: "The essential gear list for aspiring content creators on any budget.", date: "2026-01-25" },
  { path: "/free-dorm-room-guide", title: "Dorm Room Tech Guide", excerpt: "Pack smart: the complete tech guide for college dorm living.", date: "2026-02-01" },
  { path: "/free-screen-free-kids-guide", title: "Screen-Free Kids Guide", excerpt: "Fun, educational alternatives to screen time for kids of all ages.", date: "2026-02-05" },
  { path: "/amazon-associate-guide", title: "Amazon Associate Guide", excerpt: "Step-by-step guide to earning through Amazon's affiliate program.", date: "2026-02-10" },
  { path: "/wellness-smart-ring-analysis", title: "Wellness Smart Ring Analysis", excerpt: "Deep dive analysis comparing the top smart rings for health tracking.", date: "2026-02-15" },
  { path: "/biometric-audit", title: "Biometric Audit Guide", excerpt: "How to audit your biometric data for better health insights.", date: "2026-03-01" },
  { path: "/founders-tech-stack", title: "Founder's Tech Stack", excerpt: "The exact tools and tech Modern Tech LLC uses to run the business.", date: "2026-03-10" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch dynamic blog posts
    const { data: dbPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, image_url, category, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw new Error(`DB error: ${error.message}`);

    const now = new Date().toUTCString();

    // Build items from static articles
    const staticItems = STATIC_ARTICLES.map((a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(SITE_URL + "/blog/" + a.slug)}</link>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(SITE_URL + "/blog/" + a.slug)}</guid>
      <enclosure url="${escapeXml(a.image)}" type="image/jpeg" length="0" />
    </item>`).join("\n");

    // Build items from DB posts
    const dbItems = (dbPosts || []).map((p) => {
      const imageTag = p.image_url
        ? `\n      <enclosure url="${escapeXml(p.image_url)}" type="image/jpeg" length="0" />`
        : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(SITE_URL + "/blog/" + p.slug)}</link>
      <description>${escapeXml(p.excerpt || p.title)}</description>
      <category>${escapeXml(p.category || "Tech")}</category>
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(SITE_URL + "/blog/" + p.slug)}</guid>${imageTag}
    </item>`;
    }).join("\n");

    // Build items from guide pages
    const guideItems = STATIC_GUIDES.map((g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${escapeXml(SITE_URL + g.path)}</link>
      <description>${escapeXml(g.excerpt)}</description>
      <category>Guides</category>
      <pubDate>${new Date(g.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(SITE_URL + g.path)}</guid>
    </item>`).join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/functions/v1/blog-rss-feed" rel="self" type="application/rss+xml" />
${staticItems}
${dbItems}
${guideItems}
  </channel>
</rss>`;

    return new Response(rss, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Blog RSS feed error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>${error instanceof Error ? error.message : "Unknown error"}</description></channel></rss>`,
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/rss+xml" } }
    );
  }
});
