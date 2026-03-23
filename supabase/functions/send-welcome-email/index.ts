import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/modern-tech-logo-circle.png";
const HERO_BG_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/email-welcome-hero-bg.jpg";

const SENDER_DOMAIN = "notify.www.moderntech.store";

function buildWelcomeHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Art of Modern Tech</title>
</head>
<body style="margin:0;padding:0;background-color:#ede8e3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ede8e3;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">

          <tr>
            <td style="padding:0;">
              <img src="${HERO_BG_URL}" alt="Hi there!" width="600" style="display:block;width:100%;height:auto;border:0;" />
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="90" valign="top">
                    <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;border:3px solid #f0ebe6;">
                      <img src="${LOGO_URL}" alt="Modern Tech LLC" width="80" height="80" style="display:block;width:80px;height:80px;object-fit:cover;border:0;" />
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:16px;">
                    <h1 style="margin:0 0 6px;font-family:'Georgia',serif;font-size:22px;font-weight:400;color:#2c2825;line-height:1.3;">
                      Hello, Welcome to The Art of Modern Tech
                    </h1>
                    <p style="margin:0;font-family:'Georgia',serif;font-size:14px;font-style:italic;color:#5a5550;line-height:1.5;">
                      "I share modern gadgets, AI tools, and digital products that make life easier, smarter, and a little more stylish."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 60px 0;">
              <div style="height:1px;background-color:#e8e3de;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                Hello, welcome to Modern Tech. Thank you for joining us and we hope you enjoy your free guide!
              </p>
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                We curate the technology that shapes how you live, work, and play — distilled into what actually matters. No noise, no filler. Just the essentials.
              </p>
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                Your free guide is ready for you. Click below to explore it now.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:32px 48px 0;">
              <a href="https://moderntech.store/smart-ring-guide" style="display:inline-block;background-color:#c8a0a0;color:#ffffff;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 40px;border:0;">
                View Your Guide
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 60px 0;">
              <div style="height:1px;background-color:#e8e3de;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b0a8a0;">
                What's ahead
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="24" valign="top" style="padding-top:2px;">
                    <div style="width:8px;height:8px;background-color:#c8a0a0;border-radius:50%;"></div>
                  </td>
                  <td style="padding-bottom:14px;">
                    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#5a5550;">
                      <strong style="color:#2c2825;">Curated picks</strong> — hand-selected tech worth your attention
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="padding-top:2px;">
                    <div style="width:8px;height:8px;background-color:#c8a0a0;border-radius:50%;"></div>
                  </td>
                  <td style="padding-bottom:14px;">
                    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#5a5550;">
                      <strong style="color:#2c2825;">In-depth guides</strong> — smart home, wellness, gaming & more
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="24" valign="top" style="padding-top:2px;">
                    <div style="width:8px;height:8px;background-color:#c8a0a0;border-radius:50%;"></div>
                  </td>
                  <td>
                    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#5a5550;">
                      <strong style="color:#2c2825;">Exclusive deals</strong> — subscriber-only pricing & early access
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 48px 48px;">
              <div style="height:1px;background-color:#e8e3de;margin-bottom:24px;"></div>
              <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:13px;font-style:italic;color:#2c2825;text-align:center;">
                Modern Tech LLC
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#b0a8a0;text-align:center;">
                Tech today · Trend tomorrow
              </p>
              <p style="margin:16px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#b0a8a0;text-align:center;">
                You're receiving this because you signed up at
                <a href="https://moderntech.store" style="color:#c8a0a0;text-decoration:underline;">moderntech.store</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing server configuration");
    }

    const { name, email } = await req.json();
    if (!email) throw new Error("Email is required");

    const firstName = name || "Friend";
    const html = buildWelcomeHtml(firstName);
    const messageId = `welcome-${email}-${Date.now()}`;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log as pending
    await supabase.from("email_send_log").insert({
      message_id: messageId,
      template_name: "welcome",
      recipient_email: email,
      status: "pending",
    });

    // Enqueue to the transactional_emails queue (processed by process-email-queue)
    const { error: enqueueError } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: messageId,
        to: email,
        from: `Modern Tech LLC <noreply@${SENDER_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: "Welcome to The Art of Modern Tech — Essential curation for a modern life.",
        html,
        purpose: "transactional",
        label: "welcome",
        queued_at: new Date().toISOString(),
      },
    });

    if (enqueueError) {
      console.error("Failed to enqueue welcome email:", enqueueError);
      throw new Error("Failed to queue email for delivery");
    }

    console.log("Welcome email enqueued for:", email, messageId);
    return new Response(JSON.stringify({ success: true, message_id: messageId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
