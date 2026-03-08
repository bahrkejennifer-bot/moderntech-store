import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    const { name, email } = await req.json();
    if (!email) throw new Error("Email is required");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Modern Tech LLC <onboarding@resend.dev>",
        to: [email],
        subject: "🚀 Your 90-Day Amazon Associate Roadmap is Here!",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:hsl(240,20%,15%);font-size:28px;margin:0 0 8px;">Welcome to the Roadmap, ${name || "Friend"}! 🎉</h1>
      <p style="color:hsl(200,10%,45%);font-size:16px;margin:0;">Your 90-day journey to Amazon Associate success starts now.</p>
    </div>
    
    <div style="background:hsl(200,20%,96%);border-radius:12px;padding:24px;margin-bottom:24px;">
      <h2 style="color:hsl(240,20%,15%);font-size:20px;margin:0 0 16px;">Your 90-Day Checklist Overview</h2>
      
      <div style="margin-bottom:16px;">
        <p style="color:hsl(160,85%,40%);font-weight:bold;margin:0 0 4px;">📅 Days 1–30: Foundation</p>
        <p style="color:hsl(200,10%,45%);margin:0;font-size:14px;">Set up your site, pick your niche, and create your first 10 product reviews.</p>
      </div>
      
      <div style="margin-bottom:16px;">
        <p style="color:hsl(195,95%,50%);font-weight:bold;margin:0 0 4px;">📈 Days 31–60: Growth</p>
        <p style="color:hsl(200,10%,45%);margin:0;font-size:14px;">Build your email list, optimize for SEO, and launch your social strategy.</p>
      </div>
      
      <div>
        <p style="color:hsl(15,100%,55%);font-weight:bold;margin:0 0 4px;">💰 Days 61–90: Monetization</p>
        <p style="color:hsl(200,10%,45%);margin:0;font-size:14px;">Scale traffic, automate content, and hit your first commission milestones.</p>
      </div>
    </div>
    
    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://moderntech-store.lovable.app/free-roadmap" style="display:inline-block;background:hsl(160,85%,40%);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px;">
        Download Your Full Roadmap PDF
      </a>
    </div>
    
    <div style="text-align:center;border-top:1px solid hsl(240,10%,90%);padding-top:24px;">
      <p style="color:hsl(200,10%,45%);font-size:13px;margin:0;">
        You're receiving this because you signed up at Modern Tech LLC.<br>
        <a href="https://moderntech-store.lovable.app" style="color:hsl(160,85%,40%);">Visit our site</a>
      </p>
    </div>
  </div>
</body>
</html>`,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Welcome email sent to:", email, data);
    return new Response(JSON.stringify({ success: true }), {
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
