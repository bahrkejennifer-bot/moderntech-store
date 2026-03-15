import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/mt-welcome-logo.png";
const SENDER_DOMAIN = "www.moderntech.store";

const CATEGORIES = [
  "Health & Wellness",
  "Home & Safety",
  "Creator Gear",
  "College Essentials",
  "Gaming",
  "Connectivity",
  "Kids Tech",
];

function buildEmailTemplate(subject: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#ede8e3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ede8e3;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <div style="width:60px;height:60px;border-radius:50%;overflow:hidden;border:3px solid #f0ebe6;display:inline-block;">
                <img src="${LOGO_URL}" alt="Modern Tech" width="60" height="60" style="display:block;width:60px;height:60px;object-fit:cover;border:0;" />
              </div>
              <p style="margin:12px 0 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#b0a8a0;">
                THE WEEKLY TECH SPEC
              </p>
              <h1 style="margin:8px 0 0;font-family:'Georgia',serif;font-size:24px;font-weight:400;color:#2c2825;line-height:1.3;">
                ${subject}
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 60px 0;">
              <div style="height:1px;background-color:#e8e3de;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px 48px 0;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:32px 48px 0;">
              <a href="https://moderntech.store/blog" style="display:inline-block;background-color:#c8a0a0;color:#ffffff;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 40px;border:0;">
                Explore All Picks
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 48px 48px;">
              <div style="height:1px;background-color:#e8e3de;margin-bottom:24px;"></div>
              <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:13px;font-style:italic;color:#2c2825;text-align:center;">
                Modern Tech LLC
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#b0a8a0;text-align:center;">
                Tech today · Trend tomorrow
              </p>
              <p style="margin:16px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#b0a8a0;text-align:center;">
                You received this because you subscribed at
                <a href="https://moderntech.store" style="color:#c8a0a0;text-decoration:underline;">moderntech.store</a>
              </p>
              <p style="margin:8px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#b0a8a0;text-align:center;">
                As an Amazon Associate, I earn from qualifying purchases. #ad
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) throw new Error("Missing server config");
    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch latest 5 published blog posts from the last 14 days
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const { data: posts, error: postsError } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, image_url, created_at")
      .eq("is_published", true)
      .gte("created_at", twoWeeksAgo)
      .order("created_at", { ascending: false })
      .limit(5);

    if (postsError) throw new Error(`Failed to fetch posts: ${postsError.message}`);

    const postSummaries = (posts || []).map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      category: p.category || "Tech",
    }));

    // Use AI to generate the newsletter content
    const prompt = `You are the editor of "The Weekly Tech Spec" by Modern Tech LLC. Write a weekly newsletter email.

BRAND VOICE: Authoritative, witty, and radically honest. You're an expert curator and supportive peer. Use short paragraphs and bold text for scannability.

STRUCTURE:
1. Opening hook (2-3 sentences) — reference a real-life problem or 2026 tech trend affecting how we live, work, stay connected, or stay healthy
2. For each blog post below, write a brief section (3-4 sentences) that:
   - Identifies a REAL PROBLEM people face (at work, home, health, safety, staying connected)
   - Points to the product/solution from the post as the fix
   - Includes a clear call-to-action link
3. Brief closing (1-2 sentences) teasing next week

CATEGORIES WE COVER: ${CATEGORIES.join(", ")}

LATEST POSTS TO FEATURE:
${postSummaries.map((p, i) => `${i + 1}. "${p.title}" (${p.category}) — ${p.excerpt}
   Link: https://moderntech.store/blog/${p.slug}`).join("\n")}

${postSummaries.length === 0 ? "No new posts this week — write a general tech trends roundup instead with links to https://moderntech.store/blog" : ""}

OUTPUT FORMAT: Return valid HTML suitable for email (inline styles, no CSS classes). Use these style conventions:
- Section headers: <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b0a8a0;">SECTION LABEL</p>
- Body text: <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
- Bold/emphasis: <strong style="color:#2c2825;">
- Links: <a href="URL" style="color:#c8a0a0;text-decoration:underline;">
- Section dividers: <div style="height:1px;background-color:#e8e3de;margin:24px 0;"></div>

Also return a compelling email subject line (under 60 chars).

Return your response as a JSON object with two keys: "subject" (string) and "body_html" (string containing the HTML).`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a newsletter content generator. Always return valid JSON." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_newsletter",
              description: "Generate the weekly tech spec newsletter",
              parameters: {
                type: "object",
                properties: {
                  subject: { type: "string", description: "Email subject line, under 60 chars" },
                  body_html: { type: "string", description: "HTML body content for the newsletter" },
                },
                required: ["subject", "body_html"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_newsletter" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) throw new Error("AI rate limit exceeded, try again later");
      if (aiResponse.status === 402) throw new Error("AI credits required, please add funds");
      throw new Error(`AI generation failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) throw new Error("AI did not return expected tool call");

    const { subject, body_html } = JSON.parse(toolCall.function.arguments);
    const fullHtml = buildEmailTemplate(subject, body_html);

    // Save draft to database
    const postIds = (posts || []).map((p) => p.id);
    const { data: spec, error: insertError } = await supabase
      .from("weekly_tech_specs")
      .insert({
        subject,
        html_content: fullHtml,
        plain_text: body_html.replace(/<[^>]*>/g, "").substring(0, 5000),
        blog_post_ids: postIds,
        status: "draft",
      })
      .select("id, subject, status")
      .single();

    if (insertError) throw new Error(`Failed to save draft: ${insertError.message}`);

    console.log("Weekly Tech Spec draft generated:", spec.id);
    return new Response(JSON.stringify({ success: true, spec }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
