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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Invalid auth");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) throw new Error("Admin access required");

    const { productTitle, productPrice, productImage, affiliateLink, category, humanReview } = await req.json();

    // 1. Build newsletter HTML
    const newsletterHtml = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="padding:40px 30px;text-align:center;background:#0a0a0a;color:#ffffff;">
          <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;margin:0 0 8px;">🔥 Hot Pick of the Week</h1>
          <p style="font-size:14px;color:#a0a0a0;margin:0;">Nurse-Verified by Modern Tech LLC</p>
        </div>
        <div style="padding:30px;">
          ${productImage ? `<img src="${productImage}" alt="${productTitle}" style="width:100%;max-height:300px;object-fit:contain;border-radius:12px;margin-bottom:20px;" />` : ""}
          <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#111;margin:0 0 12px;">${productTitle}</h2>
          ${productPrice ? `<p style="font-size:24px;font-weight:700;color:#059669;margin:0 0 16px;">${productPrice}</p>` : ""}
          ${category ? `<span style="display:inline-block;background:#f0f0f0;padding:4px 12px;border-radius:20px;font-size:12px;color:#555;margin-bottom:20px;">${category}</span>` : ""}
          <div style="margin:24px 0;">
            <a href="${affiliateLink}" style="display:inline-block;background:#059669;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:16px;">
              Check it out on Amazon →
            </a>
          </div>
          <p style="font-size:11px;color:#999;margin-top:20px;">
            As an Amazon Associate, Modern Tech LLC earns from qualifying purchases.
          </p>
        </div>
      </div>
    `;

    // 2. Fetch subscribers
    const { data: subscribers } = await supabase
      .from("lead_captures")
      .select("email");

    const recipientCount = subscribers?.length || 0;

    if (humanReview) {
      // Draft mode: just enqueue a single draft notification to admin
      await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          to: "info@moderntech.store",
          from: "Modern Tech LLC <info@moderntech.store>",
          subject: `[DRAFT] 🔥 Hot Pick: ${productTitle}`,
          html: `<p style="font-family:Inter,sans-serif;background:#fef3c7;padding:16px;border-radius:8px;color:#92400e;font-size:14px;">⚠️ <strong>DRAFT MODE</strong> — This is a preview. ${recipientCount} subscribers will receive this once you send the final broadcast from the Email Dashboard.</p>${newsletterHtml}`,
        },
      });

      // 3. Auto-pin to Pinterest
      const { data: pinterestToken } = await supabase
        .from("pinterest_tokens")
        .select("access_token")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let pinterestStatus = "no_token";
      if (pinterestToken?.access_token) {
        const boardId = Deno.env.get("PINTEREST_BOARD_ID");
        if (boardId && productImage) {
          try {
            const pinRes = await fetch("https://api.pinterest.com/v5/pins", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${pinterestToken.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                board_id: boardId,
                title: productTitle.substring(0, 100),
                description: `🔥 ${productTitle} ${productPrice || ""} — Nurse-Verified pick! ${affiliateLink}\n\n#tech #gadgets #amazonfinds #moderntech\n\nAs an Amazon Associate, I earn from qualifying purchases.`,
                media_source: { source_type: "image_url", url: productImage },
                link: affiliateLink,
              }),
            });
            pinterestStatus = pinRes.ok ? "pinned" : "pin_failed";
          } catch { pinterestStatus = "pin_error"; }
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          mode: "human_review",
          newsletter: "draft_sent_to_admin",
          pinterest: pinterestStatus,
          social: { instagram: "pending_api", facebook: "pending_api", tiktok: "pending_api" },
          recipientCount,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Autonomous: blast to all subscribers
      if (subscribers && subscribers.length > 0) {
        for (const sub of subscribers) {
          await supabase.rpc("enqueue_email", {
            queue_name: "transactional_emails",
            payload: {
              to: sub.email,
              from: "Modern Tech LLC <info@moderntech.store>",
              subject: `🔥 Hot Pick: ${productTitle}`,
              html: newsletterHtml,
            },
          });
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          mode: "autonomous",
          newsletter: `queued_${recipientCount}_recipients`,
          social: { pinterest: "queued", instagram: "pending_api", facebook: "pending_api", tiktok: "pending_api" },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
