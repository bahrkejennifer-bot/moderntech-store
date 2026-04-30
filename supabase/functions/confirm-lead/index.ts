import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GUIDE_ROUTES: Record<string, string> = {
  "amazon-associate-guide": "/amazon-associate-guide",
  "parents-smart-home-safety-checklist": "/free-smart-home-checklist",
  "smart-ring-buyers-guide": "/free-smart-ring-guide",
  "creator-gear-starter-kit": "/free-creator-gear-guide",
  "dorm-room-tech-setup": "/free-dorm-room-guide",
  "screen-free-kids-tech-toys": "/free-screen-free-kids-guide",
  "free-affiliate-quick-start": "/amazon-associate-guide",
  "tech-essentials-2026": "/tech-essentials-success",
  "creator-funnel": "/creator-funnel",
  "founders-tech-stack": "/founders-tech-stack",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string" || token.length < 32 || token.length > 128) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: pending, error: fetchErr } = await supabase
      .from("pending_lead_confirmations")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (fetchErr || !pending) {
      return new Response(JSON.stringify({ error: "Invalid or expired link" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const guideRoute = GUIDE_ROUTES[pending.lead_magnet] || "/digital-products";

    // Already confirmed — idempotent success
    if (pending.confirmed_at) {
      return new Response(JSON.stringify({
        success: true, already_confirmed: true, redirect: guideRoute, lead_magnet: pending.lead_magnet,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (new Date(pending.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "This confirmation link has expired. Please sign up again." }), {
        status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark as confirmed
    await supabase
      .from("pending_lead_confirmations")
      .update({ confirmed_at: new Date().toISOString() })
      .eq("token", token);

    // Insert into lead_captures (ignore unique conflicts)
    const { error: leadErr } = await supabase.from("lead_captures").insert({
      email: pending.email,
      name: pending.name,
      lead_magnet: pending.lead_magnet,
    });
    if (leadErr && leadErr.code !== "23505") {
      console.error("lead_captures insert error", leadErr);
    }

    // Trigger welcome email with the actual guide link
    supabase.functions.invoke("send-welcome-email", {
      body: { name: pending.name, email: pending.email, lead_magnet: pending.lead_magnet },
    }).catch((e) => console.error("welcome email invoke failed", e));

    // Forward to GetResponse via existing newsletter pipeline (best-effort)
    supabase.functions.invoke("subscribe-newsletter", {
      body: { name: pending.name, email: pending.email, source: pending.lead_magnet },
    }).catch(() => {});

    return new Response(JSON.stringify({
      success: true, redirect: guideRoute, lead_magnet: pending.lead_magnet,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error(msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
