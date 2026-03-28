import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://moderntech.store";

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: products, error } = await supabase
      .from("scraped_products")
      .select("id, title, image_url, category, created_at, affiliate_link")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(`DB error: ${error.message}`);

    const urls = (products || []).map((p) => {
      const lastmod = new Date(p.created_at).toISOString().split("T")[0];
      const imageTag = p.image_url
        ? `
      <image:image>
        <image:loc>${escapeXml(p.image_url)}</image:loc>
        <image:title>${escapeXml(p.title)}</image:title>
      </image:image>`
        : "";
      return `  <url>
    <loc>${escapeXml(SITE_URL + "/trending-products")}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imageTag}
  </url>`;
    }).join("\n");

    // Also include category pages as product sitemaps
    const categories = [
      { path: "/smart-home-security", name: "Smart Home & Security" },
      { path: "/wellness-tech", name: "Wellness Tech" },
      { path: "/digital-lifestyle", name: "Digital Lifestyle" },
      { path: "/productivity-family", name: "Productivity & Family" },
    ];

    const categoryUrls = categories.map((c) => `  <url>
    <loc>${escapeXml(SITE_URL + c.path)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${categoryUrls}
${urls}
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
    console.error("Product sitemap error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/xml" } }
    );
  }
});
