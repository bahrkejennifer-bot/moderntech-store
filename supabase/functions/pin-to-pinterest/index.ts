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
    const { title, description, image_url, affiliate_link } = await req.json();

    const accessToken = Deno.env.get("PINTEREST_ACCESS_TOKEN");
    const boardId = Deno.env.get("PINTEREST_BOARD_ID");

    if (!accessToken || !boardId) {
      throw new Error("Pinterest credentials not configured");
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

    const response = await fetch("https://api.pinterest.com/v5/pins", {
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
