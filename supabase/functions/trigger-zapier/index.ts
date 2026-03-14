import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const zapierWebhookUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
    if (!zapierWebhookUrl) {
      console.warn("ZAPIER_WEBHOOK_URL not configured — skipping");
      return new Response(
        JSON.stringify({ skipped: true, reason: "no_webhook_url" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const payload = await req.json();
    const { event, data } = payload;

    if (!event) {
      throw new Error("Missing 'event' field in request body");
    }

    console.log("Triggering Zapier webhook:", { event, data_keys: Object.keys(data || {}) });

    // Fire to Zapier — no-cors equivalent in Deno, just fire and check
    const zapResponse = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        source: "moderntech.store",
        ...data,
      }),
    });

    const zapStatus = zapResponse.status;
    const zapBody = await zapResponse.text();
    console.log("Zapier response:", zapStatus, zapBody);

    return new Response(
      JSON.stringify({ success: true, zapier_status: zapStatus }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: unknown) {
    console.error("Zapier trigger error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
