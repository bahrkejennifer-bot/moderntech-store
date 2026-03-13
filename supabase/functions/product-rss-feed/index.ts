import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://moderntech.store";
const FEED_TITLE = "Modern Tech LLC — Top Picks";
const FEED_DESCRIPTION =
  "Curated tech products for health, home safety, and content creators. As an Amazon Associate, we earn from qualifying purchases.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Pull products from active categories only
    const { data: products, error } = await supabase
      .from("scraped_products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw new Error(`DB error: ${error.message}`);

    const now = new Date().toUTCString();

    const items = (products || [])
      .map((p) => {
        const title = escapeXml(p.title || "Untitled");
        const link = escapeXml(p.affiliate_link || SITE_URL);
        const imageUrl = p.image_url ? escapeXml(p.image_url) : "";
        const category = escapeXml(p.category || "General");
        const pubDate = new Date(p.created_at).toUTCString();
        const description = escapeXml(
          `${p.title} — Shop this top-rated ${p.category || "tech"} pick from Modern Tech. As an Amazon Associate, we earn from qualifying purchases.`
        );

        return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <category>${category}</category>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="false">${escapeXml(p.id)}</guid>${
          imageUrl
            ? `
      <enclosure url="${imageUrl}" type="image/jpeg" length="0" />`
            : ""
        }
    </item>`;
      })
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/functions/v1/product-rss-feed" rel="self" type="application/rss+xml" />
${items}
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
    console.error("RSS feed error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>${error instanceof Error ? error.message : "Unknown error"}</description></channel></rss>`,
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/rss+xml" },
      }
    );
  }
});
