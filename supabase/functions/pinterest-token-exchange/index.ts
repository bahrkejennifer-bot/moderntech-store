const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    const appId = Deno.env.get("PINTEREST_APP_ID");
    const appSecret = Deno.env.get("PINTEREST_APP_SECRET");

    if (!appId || !appSecret) {
      throw new Error("Missing PINTEREST_APP_ID or PINTEREST_APP_SECRET");
    }

    const basicAuth = btoa(`${appId}:${appSecret}`);

    const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://moderntech-store.lovable.app/pinterest-callback",
      }).toString(),
    });

    const result = await response.text();
    console.log("Pinterest token response:", response.status, result);

    return new Response(result, {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
