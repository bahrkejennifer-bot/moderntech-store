import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://moderntech.store";

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// Static blog posts (hardcoded slugs from BlogPost.tsx)
const STATIC_BLOG_SLUGS = [
  { slug: "smart-ring-guide-valentines-2026", title: "The Ultimate Smart Ring Guide for 2026", image: "smart-ring-guide-hero.png" },
  { slug: "home-safety-smart-devices-2026", title: "6 Smart Home Safety Devices That Actually Protect Your Family", image: "smart-home-devices-hero.jpg" },
  { slug: "creator-gear-starter-kit-2026", title: "Creator Gear Starter Kit: 6 Tools Under $200", image: "tech-default-hero.jpg" },
  { slug: "gaming-monitors-peripherals-2026", title: "6 Gaming Upgrades That'll Make Your Friends Jealous", image: "gaming-monitors-hero.jpg" },
  { slug: "wireless-earbuds-connectivity-2026", title: "The 6 Best Wireless Earbuds & Connectivity Gadgets", image: "wireless-earbuds-hero.jpg" },
  { slug: "college-essentials-tech-guide-2026", title: "Surviving College: The Only 6 Tech Gadgets You Need", image: "college-tech-hero.jpg" },
  { slug: "kids-tech-guide-2026", title: "Parent-Approved: 6 Tech Toys That Actually Teach", image: "kids-tech-hero.jpg" },
];

// Static guide pages
const GUIDE_PAGES = [
  { path: "/free-roadmap", title: "Free Tech Roadmap" },
  { path: "/free-smart-home-checklist", title: "Smart Home Safety Checklist" },
  { path: "/free-smart-ring-guide", title: "Smart Ring Buyer's Guide" },
  { path: "/free-creator-gear-guide", title: "Creator Gear Guide" },
  { path: "/free-dorm-room-guide", title: "Dorm Room Tech Guide" },
  { path: "/free-screen-free-kids-guide", title: "Screen-Free Kids Guide" },
  { path: "/amazon-associate-guide", title: "Amazon Associate Guide" },
  { path: "/wellness-smart-ring-analysis", title: "Wellness Smart Ring Analysis" },
  { path: "/sonic-edit", title: "Sonic Edit Guide" },
  { path: "/biometric-audit", title: "Biometric Audit Guide" },
  { path: "/founders-tech-stack", title: "Founder's Tech Stack" },
  { path: "/digital-products", title: "Digital Products" },
  { path: "/tech-gift-cheatsheet", title: "Tech Gift Cheatsheet" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch dynamic blog posts from DB
    const { data: dbPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, title, image_url, updated_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`DB error: ${error.message}`);

    // Static blog post URLs
    const staticBlogUrls = STATIC_BLOG_SLUGS.map((post) => `  <url>
    <loc>${escapeXml(SITE_URL + "/weekly-edit/" + post.slug)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(SITE_URL + "/src/assets/blog/" + post.image)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
  </url>`).join("\n");

    // Dynamic blog post URLs from DB
    const dynamicBlogUrls = (dbPosts || []).map((post) => {
      const lastmod = new Date(post.updated_at).toISOString().split("T")[0];
      const imageTag = post.image_url
        ? `
    <image:image>
      <image:loc>${escapeXml(post.image_url)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>`
        : "";
      return `  <url>
    <loc>${escapeXml(SITE_URL + "/weekly-edit/" + post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
    }).join("\n");

    // Guide pages
    const guideUrls = GUIDE_PAGES.map((page) => `  <url>
    <loc>${escapeXml(SITE_URL + page.path)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");

    // Blog index
    const blogIndexUrl = `  <url>
    <loc>${escapeXml(SITE_URL + "/weekly-edit")}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blogIndexUrl}
${staticBlogUrls}
${dynamicBlogUrls}
${guideUrls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Blog sitemap error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/xml" } }
    );
  }
});
