import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the latest blog post
    const { data: latestPost, error: postError } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, category")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (postError || !latestPost) {
      console.log("No published blog post found, skipping roundup.");
      return new Response(JSON.stringify({ success: true, message: "No new post to send" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get all subscribers from lead_captures
    const { data: subscribers, error: subError } = await supabase
      .from("lead_captures")
      .select("name, email");

    if (subError || !subscribers?.length) {
      console.log("No subscribers found.");
      return new Response(JSON.stringify({ success: true, message: "No subscribers" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const postUrl = `https://moderntech-store.lovable.app/weekly-edit/${latestPost.slug}`;
    const monthName = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

    let sent = 0;
    let failed = 0;

    // Send emails in batches of 10
    for (let i = 0; i < subscribers.length; i += 10) {
      const batch = subscribers.slice(i, i + 10);

      const promises = batch.map(async (sub) => {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "Modern Tech LLC <onboarding@resend.dev>",
              to: [sub.email],
              subject: `📱 ${monthName} Tech Roundup — ${latestPost.title}`,
              html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <p style="color:hsl(160,85%,40%);font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Monthly Tech Roundup</p>
      <h1 style="color:hsl(240,20%,15%);font-size:26px;margin:0 0 8px;">${latestPost.title}</h1>
      <p style="color:hsl(200,10%,45%);font-size:15px;margin:0;">Hey ${sub.name || "there"}, here's what's trending in ${latestPost.category || "tech"} this month.</p>
    </div>
    
    <div style="background:hsl(200,20%,96%);border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="color:hsl(240,20%,15%);font-size:15px;line-height:1.6;margin:0;">
        ${latestPost.excerpt || "We've curated the hottest tech products and trends this month. Click below to read the full roundup with our expert picks and Amazon affiliate links."}
      </p>
    </div>
    
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${postUrl}" style="display:inline-block;background:hsl(160,85%,40%);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px;">
        Read the Full Roundup
      </a>
    </div>
    
    <div style="text-align:center;border-top:1px solid hsl(240,10%,90%);padding-top:24px;">
      <p style="color:hsl(200,10%,45%);font-size:13px;margin:0;">
        Modern Tech LLC · <a href="https://moderntech-store.lovable.app" style="color:hsl(160,85%,40%);">moderntech-store.lovable.app</a>
      </p>
    </div>
  </div>
</body>
</html>`,
            }),
          });

          if (res.ok) {
            sent++;
          } else {
            const errData = await res.json();
            console.error(`Failed for ${sub.email}:`, errData);
            failed++;
          }
        } catch (e) {
          console.error(`Error sending to ${sub.email}:`, e);
          failed++;
        }
      });

      await Promise.all(promises);
    }

    console.log(`Monthly roundup sent: ${sent} success, ${failed} failed`);
    return new Response(
      JSON.stringify({ success: true, sent, failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
