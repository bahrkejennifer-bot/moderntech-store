import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products } = await req.json();

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "No products provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const now = new Date();
    const monthName = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();

    // Build product list for the prompt
    const productList = products
      .map(
        (p: any, i: number) =>
          `${i + 1}. **${p.title}** (Niche: ${p.niche || "Tech"})\n   Affiliate Link: ${p.affiliate_link}\n   Image: ${p.image_url || "N/A"}`
      )
      .join("\n\n");

    const systemPrompt = `You are the head copywriter for Modern Tech LLC — an expert tech curator and supportive peer for new creators building their digital empires in 2026.

BRAND VOICE:
- Tone: Authoritative but accessible, witty, and radically honest
- You don't just "sell" tech; you solve problems
- Start with a relatable "struggle" or a specific 2026 tech trend
- For every product, explain the PROBLEM it solves BEFORE mentioning features
- Use headers like "Why This Matters for Your Studio" or "The Problem It Solves"
- Short paragraphs (2-3 sentences), bullet points, bold text for key takeaways
- Be specific about why each product matters in 2026

WRITING FORMAT:
Write a ~1,500-word Monthly Tech Roundup blog post in clean HTML (no <html>, <head>, or <body> tags — just the article content).

Structure:
1. A catchy, SEO-optimized headline (wrapped in <h1>)
2. An engaging intro (2-3 paragraphs) discussing current 2026 tech trends for creators, home safety, and wellness
3. A dedicated <h2> section for EACH product with:
   - The problem it solves (1-2 sentences)
   - Key benefits as a <ul> list (3-4 bullets)
   - A call-to-action link: <a href="AFFILIATE_LINK" target="_blank" rel="noopener noreferrer nofollow">Check it out on Amazon →</a>
4. A "Final Thoughts" wrap-up section
5. End with the exact disclosure: <p class="affiliate-disclosure"><strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. I am an Amazon Associate and I make a small percentage from sales. #ad</p>

IMPORTANT:
- Use the EXACT affiliate links provided — do not modify them
- Do NOT include prices (users will see them when they click)
- Make it scannable with bold text, bullets, and clear headers
- Include SEO-friendly subheadings
- Write for creators and families who want practical, trustworthy tech recommendations`;

    const userPrompt = `Write the ${monthName} ${year} Monthly Tech Roundup for Modern Tech LLC.

Here are the products to feature:

${productList}

Remember: No prices. Use the exact affiliate links. Make it ~1,500 words. Start with a hook about the creator economy or tech trends in ${monthName} ${year}.`;

    console.log(`Generating blog post for ${monthName} ${year}...`);

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required — add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const contentHtml =
      aiData.choices?.[0]?.message?.content || "";

    if (!contentHtml) {
      throw new Error("AI returned empty content");
    }

    // Extract title from the generated HTML
    const titleMatch = contentHtml.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const title =
      titleMatch?.[1]?.replace(/<[^>]+>/g, "") ||
      `${monthName} ${year} Tech Roundup: Fresh Finds for Creators & Families`;

    // Generate slug
    const slug = `monthly-tech-roundup-${monthName.toLowerCase()}-${year}`;

    // Generate excerpt
    const excerptMatch = contentHtml.match(/<p[^>]*>(.*?)<\/p>/i);
    const excerpt =
      excerptMatch?.[1]?.replace(/<[^>]+>/g, "").substring(0, 200) ||
      `Your ${monthName} ${year} roundup of the best tech for creators, home safety, and wellness.`;

    // Build products JSON for the blog_posts table
    const productsJson = products.map((p: any) => ({
      title: p.title,
      affiliate_link: p.affiliate_link,
      image_url: p.image_url,
      niche: p.niche || "Tech",
    }));

    // Save to blog_posts table
    const { data: blogPost, error: insertError } = await supabase
      .from("blog_posts")
      .upsert(
        {
          title,
          slug,
          excerpt,
          category: "Tech Roundup",
          image_url:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format",
          content_html: contentHtml,
          products: productsJson,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (insertError) {
      console.error("Insert blog post error:", insertError);
      throw new Error(`Failed to save blog post: ${insertError.message}`);
    }

    console.log(`Blog post saved: ${title} (${slug})`);

    // Send email notification via GetResponse webhook or Make.com
    const webhookUrl = Deno.env.get("MAKECOM_WEBHOOK_URL");
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "new_blog_post",
            title,
            slug,
            url: `https://moderntech-store.lovable.app/blog/${slug}`,
            excerpt,
            product_count: products.length,
            published_at: new Date().toISOString(),
          }),
        });
        console.log("New post notification sent via webhook");
      } catch (e) {
        console.error("Webhook notification error:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        blog_post: {
          id: blogPost.id,
          title,
          slug,
          url: `/blog/${slug}`,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generate blog post error:", error);
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
