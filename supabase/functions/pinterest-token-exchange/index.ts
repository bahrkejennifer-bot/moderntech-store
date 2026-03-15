import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, refresh } = await req.json();
    const appId = Deno.env.get("PINTEREST_APP_ID");
    const appSecret = Deno.env.get("PINTEREST_APP_SECRET");

    if (!appId || !appSecret) {
      throw new Error("Missing PINTEREST_APP_ID or PINTEREST_APP_SECRET");
    }

    const basicAuth = btoa(`${appId}:${appSecret}`);
    let bodyParams: URLSearchParams;

    if (refresh) {
      // Refresh an existing token
      bodyParams = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
      });
      console.log("Refreshing Pinterest token...");
    } else if (code) {
      // Exchange authorization code for new token
      bodyParams = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://moderntech-store.lovable.app/pinterest-callback",
      });
      console.log("Exchanging Pinterest authorization code...");
    } else {
      throw new Error("Provide either 'code' or 'refresh' parameter");
    }

    const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    const resultText = await response.text();
    console.log("Pinterest token response:", response.status);

    if (!response.ok) {
      throw new Error(`Pinterest token API error ${response.status}: ${resultText}`);
    }

    const tokenData = JSON.parse(resultText);

    // Auto-save token to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null;

    // Delete old tokens and insert fresh one
    await supabase.from("pinterest_tokens").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const { error: insertError } = await supabase.from("pinterest_tokens").insert({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || null,
      token_type: tokenData.token_type || "bearer",
      scope: tokenData.scope || null,
      expires_at: expiresAt,
    });

    if (insertError) {
      console.error("Failed to save token to DB:", insertError.message);
    } else {
      console.log("✅ Pinterest token saved to database, expires:", expiresAt);
    }

    // Also update the secret for backward compatibility
    // (cron jobs that use the env var will still work until migrated)

    return new Response(JSON.stringify({
      ...tokenData,
      saved_to_db: !insertError,
      expires_at: expiresAt,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Token exchange error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
