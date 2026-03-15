import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/mt-welcome-logo.png";

function buildEmailTemplate(subject: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:48px 48px 0;text-align:center;">
              <div style="width:52px;height:52px;border-radius:50%;overflow:hidden;border:2px solid #e5e5e7;display:inline-block;">
                <img src="${LOGO_URL}" alt="Modern Tech" width="52" height="52" style="display:block;width:52px;height:52px;object-fit:cover;border:0;" />
              </div>
              <p style="margin:16px 0 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#86868b;">
                TECH SPECS WEEKLY REPORT
              </p>
              <h1 style="margin:8px 0 0;font-family:'Georgia',serif;font-size:26px;font-weight:400;color:#1d1d1f;line-height:1.25;letter-spacing:-0.01em;">
                ${subject}
              </h1>
              <p style="margin:8px 0 0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#86868b;">
                Precision Intelligence for the Modern Enterprise
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 48px 0;">
              <div style="height:1px;background-color:#e5e5e7;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 48px 0;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:36px 48px 0;">
              <a href="https://moderntech.store/blog" style="display:inline-block;background-color:#1d1d1f;color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.05em;text-decoration:none;padding:14px 36px;border-radius:8px;">
                Explore All Picks
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px 48px 48px;">
              <div style="height:1px;background-color:#e5e5e7;margin-bottom:24px;"></div>
              <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:13px;font-style:italic;color:#1d1d1f;text-align:center;">
                Modern Tech LLC
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#86868b;text-align:center;">
                Tech today · Trend tomorrow
              </p>
              <p style="margin:16px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#86868b;text-align:center;">
                You received this because you subscribed at
                <a href="https://moderntech.store" style="color:#1d1d1f;text-decoration:underline;">moderntech.store</a>
              </p>
              <p style="margin:8px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#86868b;text-align:center;">
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

    // Also fetch digital products for the "Digital Assets" pillar
    const { data: products } = await supabase
      .from("digital_products")
      .select("title, slug, description, is_free, price")
      .order("display_order", { ascending: true })
      .limit(3);

    const postSummaries = (posts || []).map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      category: p.category || "Tech",
    }));

    const productSummaries = (products || []).map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.description || "",
      isFree: p.is_free,
      price: p.price,
    }));

    const prompt = `You are the editor of "Tech Specs Weekly Report" by Modern Tech LLC.

BRAND IDENTITY: Apple-aesthetic. Monochromatic visuals, extreme white space, "less is more" editorial voice. Authoritative, witty, radically honest. You are an expert curator — never salesy, never fluffy. Short paragraphs. Never more than 3 sentences per paragraph.

TAGLINE: "Precision Intelligence for the Modern Enterprise"

STRUCTURE — Follow this exact blueprint:

## 1. THE LEAD: "The Friction of [Problem]"
Open with a sharp, specific observation about a real-life friction point affecting how people live, work, stay connected, or stay healthy in 2026. Reference a real trend or statistic. 2-3 sentences max. End with the cost of inaction.

## 2. THE SOLUTION: Integrated Approach
One transitional paragraph (2 sentences) introducing this week's three pillars of optimization.

## 3. PILLAR 1 — DIGITAL ASSETS: "The Architecture of Scale"
Subtitle: "For the firm looking to build once and sell forever."
Feature ONE of our digital products below. Frame it as removing guesswork from a specific problem. Include a clear action link.

OUR DIGITAL PRODUCTS:
${productSummaries.map((p) => `- "${p.title}" (${p.isFree ? 'FREE' : `$${p.price}`}) — ${p.description}
  Link: https://moderntech.store/digital-products`).join("\n")}

## 4. PILLAR 2 — AI IMPLEMENTATION: "Beyond the Hype"  
Subtitle: "For the leader seeking measurable ROI from Machine Learning."
Write about how our AI-powered tools (like the Tech Chatbot or AI-generated content) help automate real tasks. Link to our blog or tools page. Frame AI as "a specialized labor force, not a chatbot."

## 5. PILLAR 3 — HARDWARE & GEAR: "The Professional's Toolkit"
Subtitle: "Curated essentials for the high-output workspace."
Feature 2-3 products from our latest blog posts. Frame as: "You cannot run elite software on mediocre hardware." Each product gets 1 sentence + link.

LATEST BLOG POSTS TO DRAW FROM:
${postSummaries.map((p, i) => `${i + 1}. "${p.title}" (${p.category}) — ${p.excerpt}
   Link: https://moderntech.store/blog/${p.slug}`).join("\n")}

${postSummaries.length === 0 ? "No new posts this week — use general 2026 tech trends and link to https://moderntech.store/blog" : ""}

## 6. THE "NO-FLUFF" COMPARISON TABLE
Create a simple HTML table with 4 columns: Category | The Problem | The Solution | The Outcome
Three rows: Digital, AI, Hardware/Affiliate. Keep each cell to 3-5 words max.

## 7. CLOSING
One sentence teasing next week's focus. One sentence with a direct CTA.

TONE RULES:
- Never use "Click here." Use action phrases: "View the Spec Sheet →" or "Upgrade Your Stack →"
- No stock-photo language. No "synergy" or "leverage." Write like a Bloomberg columnist, not a marketer.
- Bold key phrases sparingly for scannability.

OUTPUT FORMAT: Return valid HTML for email (inline styles only, no CSS classes). Use these exact style tokens:

- Section label: <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#86868b;">LABEL</p>
- Section title: <h2 style="margin:0 0 12px;font-family:'Georgia',serif;font-size:20px;font-weight:400;color:#1d1d1f;line-height:1.3;">Title</h2>
- Subtitle: <p style="margin:0 0 16px;font-family:'Georgia',serif;font-size:14px;font-style:italic;color:#6e6e73;">Subtitle text</p>
- Body text: <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#424245;">Text</p>
- Bold: <strong style="color:#1d1d1f;">
- Links: <a href="URL" style="color:#1d1d1f;text-decoration:underline;font-weight:500;">Link Text →</a>
- Dividers: <div style="height:1px;background-color:#e5e5e7;margin:28px 0;"></div>
- Table: Use simple HTML table with inline styles, light borders (#e5e5e7), monospace headers, 13px body text.

Also generate a compelling email subject line under 60 characters. Think Bloomberg meets Apple.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an elite newsletter content generator specializing in high-end tech editorial. Always return structured output via tool calls." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_newsletter",
              description: "Generate the Tech Specs Weekly Report newsletter",
              parameters: {
                type: "object",
                properties: {
                  subject: { type: "string", description: "Email subject line, under 60 chars, Bloomberg-meets-Apple tone" },
                  body_html: { type: "string", description: "Complete HTML body content following the exact blueprint structure" },
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

    console.log("Tech Specs Weekly Report draft generated:", spec.id);
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
