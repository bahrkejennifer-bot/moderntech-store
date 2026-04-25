import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function getPinterestToken(supabase: any): Promise<string | null> {
  const { data } = await supabase.from("pinterest_tokens").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (!data) return Deno.env.get("PINTEREST_ACCESS_TOKEN") || null;

  if (data.expires_at && data.refresh_token) {
    const expiresAt = new Date(data.expires_at).getTime();
    if (expiresAt < Date.now() + 3600000) {
      const appId = Deno.env.get("PINTEREST_APP_ID");
      const appSecret = Deno.env.get("PINTEREST_APP_SECRET");
      if (appId && appSecret) {
        try {
          const resp = await fetch("https://api.pinterest.com/v5/oauth/token", {
            method: "POST",
            headers: { "Authorization": `Basic ${btoa(`${appId}:${appSecret}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: data.refresh_token }).toString(),
          });
          if (resp.ok) {
            const t = await resp.json();
            await supabase.from("pinterest_tokens").update({
              access_token: t.access_token, refresh_token: t.refresh_token || data.refresh_token,
              expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : data.expires_at,
              updated_at: new Date().toISOString(),
            }).eq("id", data.id);
            return t.access_token;
          } else { await resp.text(); }
        } catch (e) { console.error("Refresh failed:", e); }
      }
    }
  }
  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const accessToken = await getPinterestToken(supabase);
    const adAccountId = Deno.env.get("PINTEREST_AD_ACCOUNT_ID");

    if (!accessToken || !adAccountId) {
      console.warn("Pinterest credentials not configured — skipping conversion tracking");
      return new Response(JSON.stringify({ skipped: true, reason: "credentials_missing" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { events } = await req.json();

    if (!events || !Array.isArray(events) || events.length === 0) {
      throw new Error("No events provided");
    }

    const formattedEvents = events.map((event: Record<string, unknown>) => ({
      event_name: event.event_name || "page_visit",
      action_source: "web",
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: event.event_source_url || "",
      user_data: {
        client_ip_address: "0.0.0.0",
        client_user_agent: event.user_agent || "",
        ...(event.email ? { em: [event.email] } : {}),
      },
      ...(event.custom_data ? { custom_data: event.custom_data } : {}),
    }));

    const payload = { data: formattedEvents };

    console.log("Sending Pinterest conversion events:", JSON.stringify({
      ad_account_id: adAccountId,
      event_count: formattedEvents.length,
      event_names: formattedEvents.map((e: Record<string, unknown>) => e.event_name),
    }));

    const response = await fetch(
      `https://api.pinterest.com/v5/ad_accounts/${adAccountId}/events`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.text();
    console.log("Pinterest Conversions API response:", response.status, result);

    if (!response.ok) {
      console.warn(`Pinterest API error ${response.status}: ${result} — skipping`);
      return new Response(JSON.stringify({ skipped: true, reason: "api_error", status: response.status }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, result: JSON.parse(result) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pinterest conversion error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
