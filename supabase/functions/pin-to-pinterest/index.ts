const PINTEREST_WEBHOOK_URL = "https://hook.us2.make.com/x9jm5p6f987cmkfghgapsf3gpkztrhcp";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // If image_url is a base64 data URL (local bundled asset), extract the base64
    // and attach it separately so Make.com can use it directly without hotlink issues.
    let finalPayload = { ...payload };
    if (typeof payload.image_url === "string" && payload.image_url.startsWith("data:")) {
      const [meta, base64] = payload.image_url.split(",");
      const mimeMatch = meta.match(/data:([^;]+);/);
      finalPayload = {
        ...payload,
        image_url: null, // no public URL available
        image_base64: base64,
        image_mime: mimeMatch ? mimeMatch[1] : "image/jpeg",
      };
    }

    const response = await fetch(PINTEREST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pinterest proxy error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
