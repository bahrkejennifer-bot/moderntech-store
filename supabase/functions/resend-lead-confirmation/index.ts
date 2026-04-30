import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/modern-tech-logo-circle.png";
const SITE_BASE_URL = "https://moderntech.store";
const SENDER_DOMAIN = "notify.www.moderntech.store";

const GUIDE_LABELS: Record<string, string> = {
  "amazon-associate-guide": "90-Day Amazon Associate Roadmap",
  "parents-smart-home-safety-checklist": "Parent's Smart Home Safety Checklist",
  "smart-ring-buyers-guide": "Smart Ring Buyer's Guide",
  "creator-gear-starter-kit": "Creator Gear Starter Kit",
  "dorm-room-tech-setup": "Dorm Room Tech Setup Guide",
  "screen-free-kids-tech-toys": "Screen-Free Kids Tech Guide",
  "free-affiliate-quick-start": "Amazon Affiliate Quick-Start Guide",
  "faceless-reels-guide": "The Faceless Reels Guide",
  "tech-essentials-2026": "2026 Tech Essentials Guide",
  "creator-funnel": "Faceless Creator Bundle",
  "founders-tech-stack": "Founder's Sovereign Tech Stack",
  "90-day-amazon-associate-roadmap": "90-Day Amazon Associate Roadmap",
};

function buildConfirmHtml(name: string, guideLabel: string, confirmUrl: string): string {
  const safeName = name && name.trim() ? name.split(" ")[0] : "there";
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Confirm your subscription</title></head>
<body style="margin:0;padding:0;background-color:#ede8e3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ede8e3;">
    <tr><td align="center" style="padding:48px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;">
        <tr><td align="center" style="padding:40px 40px 0;">
          <img src="${LOGO_URL}" alt="Modern Tech LLC" width="64" height="64" style="display:block;border-radius:50%;border:0;" />
        </td></tr>
        <tr><td style="padding:24px 48px 0;text-align:center;">
          <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#b0a8a0;">Fresh confirmation link</p>
          <h1 style="margin:0 0 16px;font-family:'Georgia',serif;font-size:26px;font-weight:400;color:#2c2825;line-height:1.3;">Here's a new link, ${safeName}</h1>
          <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#5a5550;">
            Click below to confirm and unlock your <strong>${guideLabel}</strong>.
          </p>
        </td></tr>
        <tr><td align="center" style="padding:0 48px 8px;">
          <a href="${confirmUrl}" style="display:inline-block;background-color:#c8a0a0;color:#ffffff;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
            Confirm &amp; Get My Guide
          </a>
        </td></tr>
        <tr><td style="padding:24px 48px 0;text-align:center;">
          <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#a0998f;">
            Or paste this link in your browser:<br/>
            <a href="${confirmUrl}" style="color:#c8a0a0;word-break:break-all;">${confirmUrl}</a>
          </p>
        </td></tr>
        <tr><td style="padding:36px 48px 40px;text-align:center;">
          <div style="height:1px;background-color:#e8e3de;margin-bottom:20px;"></div>
          <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:13px;font-style:italic;color:#2c2825;">Modern Tech LLC</p>
          <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#b0a8a0;">
            This new link expires in 24 hours. Didn't sign up? Ignore this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const previousToken = typeof body.token === "string" ? body.token.trim() : "";
    const emailInput = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!previousToken && !emailInput) {
      return new Response(JSON.stringify({ error: "Missing token or email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Look up the most recent pending row by token (preferred) or email.
    let query = supabase
      .from("pending_lead_confirmations")
      .select("email, name, lead_magnet, source_path, confirmed_at")
      .order("created_at", { ascending: false })
      .limit(1);
    query = previousToken ? query.eq("token", previousToken) : query.eq("email", emailInput);
    const { data: pending, error: lookupErr } = await query.maybeSingle();

    if (lookupErr) {
      console.error("lookup error", lookupErr);
      return new Response(JSON.stringify({ error: "Lookup failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // If we can't find the pending row, fall back to checking lead_captures for a confirmed email.
    const targetEmail = pending?.email || emailInput;
    if (!targetEmail) {
      return new Response(JSON.stringify({ error: "No matching signup found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Already confirmed → just resend the welcome/guide email and return.
    const { data: alreadyLead } = await supabase
      .from("lead_captures")
      .select("id, name, lead_magnet")
      .eq("email", targetEmail)
      .limit(1)
      .maybeSingle();

    if (alreadyLead || pending?.confirmed_at) {
      const name = pending?.name || alreadyLead?.name || targetEmail.split("@")[0];
      const magnet = pending?.lead_magnet || alreadyLead?.lead_magnet || "90-day-amazon-associate-roadmap";
      await supabase.functions.invoke("send-welcome-email", {
        body: { name, email: targetEmail, lead_magnet: magnet },
      }).catch((e) => console.error("welcome resend failed", e));
      return new Response(JSON.stringify({ success: true, already_confirmed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!pending) {
      return new Response(JSON.stringify({ error: "No pending confirmation found for this email" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate a fresh token and insert a new pending row (preserves audit trail).
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const newToken = Array.from(tokenBytes).map((b) => b.toString(16).padStart(2, "0")).join("");

    const cleanName = (pending.name || targetEmail.split("@")[0]).slice(0, 100);
    const magnet = pending.lead_magnet || "90-day-amazon-associate-roadmap";

    const { error: insertErr } = await supabase.from("pending_lead_confirmations").insert({
      token: newToken,
      email: targetEmail,
      name: cleanName,
      lead_magnet: magnet,
      source_path: pending.source_path ?? null,
    });
    if (insertErr) {
      console.error("pending insert error", insertErr);
      throw new Error("Failed to create new confirmation");
    }

    const guideLabel = GUIDE_LABELS[magnet] || "Free Guide";
    const confirmUrl = `${SITE_BASE_URL}/confirm-email?token=${newToken}`;
    const html = buildConfirmHtml(cleanName, guideLabel, confirmUrl);
    const messageId = `confirm-resend-${targetEmail}-${Date.now()}`;

    await supabase.from("email_send_log").insert({
      message_id: messageId,
      template_name: "lead_confirmation_resend",
      recipient_email: targetEmail,
      status: "pending",
    });

    const { error: enqueueErr } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: messageId,
        to: targetEmail,
        from: `Modern Tech LLC <noreply@${SENDER_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: "Your new confirmation link",
        html,
        purpose: "transactional",
        label: "lead_confirmation_resend",
        queued_at: new Date().toISOString(),
      },
    });

    if (enqueueErr) {
      console.error("enqueue error", enqueueErr);
      throw new Error("Failed to queue resend email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error(msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
