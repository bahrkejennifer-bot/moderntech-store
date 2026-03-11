const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
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

    // Format events for Pinterest Conversions API v5
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
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.text();
    console.log("Pinterest Conversions API response:", response.status, result);

    if (!response.ok) {
      throw new Error(`Pinterest API error ${response.status}: ${result}`);
    }

    return new Response(JSON.stringify({ success: true, result: JSON.parse(result) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pinterest conversion error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
