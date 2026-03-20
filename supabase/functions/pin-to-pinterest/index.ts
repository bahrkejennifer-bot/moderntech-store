import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/** Reads the latest Pinterest access token from DB, auto-refreshes if expired */
async function getPinterestToken(supabase: any): Promise<string> {
  const { data, error } = await supabase
    .from("pinterest_tokens")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    // Fallback to env secret
    const envToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
    if (envToken) return envToken;
    throw new Error("No Pinterest token found in DB or environment");
  }

  // Check if token is expired or about to expire (within 1 hour)
  if (data.expires_at) {
    const expiresAt = new Date(data.expires_at).getTime();
    const oneHourFromNow = Date.now() + 60 * 60 * 1000;

    if (expiresAt < oneHourFromNow && data.refresh_token) {
      console.log("Pinterest token expired or expiring soon, refreshing...");
      try {
        const appId = Deno.env.get("PINTEREST_APP_ID");
        const appSecret = Deno.env.get("PINTEREST_APP_SECRET");
        if (!appId || !appSecret) throw new Error("Missing app credentials for refresh");

        const basicAuth = btoa(`${appId}:${appSecret}`);
        const response = await fetch("https://api.pinterest.com/v5/oauth/token", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: data.refresh_token,
          }).toString(),
        });

        if (response.ok) {
          const newToken = await response.json();
          const newExpiresAt = newToken.expires_in
            ? new Date(Date.now() + newToken.expires_in * 1000).toISOString()
            : null;

          await supabase
            .from("pinterest_tokens")
            .update({
              access_token: newToken.access_token,
              refresh_token: newToken.refresh_token || data.refresh_token,
              expires_at: newExpiresAt,
              updated_at: new Date().toISOString(),
            })
            .eq("id", data.id);

          console.log("✅ Pinterest token auto-refreshed successfully");
          return newToken.access_token;
        } else {
          const errText = await response.text();
          console.error("Token refresh failed:", errText);
        }
      } catch (refreshErr) {
        console.error("Auto-refresh error:", refreshErr);
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
    const { title, description, image_url, affiliate_link } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const accessToken = await getPinterestToken(supabase);
    const boardId = Deno.env.get("PINTEREST_BOARD_ID");

    if (!boardId) {
      throw new Error("PINTEREST_BOARD_ID not configured");
    }

    const pinData = {
      board_id: boardId,
      title: title?.substring(0, 100) || "Check this out!",
      description: description || `${title} — Shop now via our affiliate link! As an Amazon Associate, I earn from qualifying purchases.`,
      link: affiliate_link,
      media_source: {
        source_type: "image_url",
        url: image_url,
      },
    };

    console.log("Creating Pinterest pin:", JSON.stringify({ board_id: boardId, title: pinData.title }));

    // Use sandbox while app is in Trial access; switch to api.pinterest.com once Standard access is granted
    const apiBase = Deno.env.get("PINTEREST_USE_PRODUCTION") === "true"
      ? "https://api.pinterest.com"
      : "https://api-sandbox.pinterest.com";

    const response = await fetch(`${apiBase}/v5/pins`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pinData),
    });

    const result = await response.text();
    console.log("Pinterest API response:", response.status, result);

    if (!response.ok) {
      throw new Error(`Pinterest API error ${response.status}: ${result}`);
    }

    return new Response(JSON.stringify({ success: true, pin: JSON.parse(result) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pinterest pin error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
