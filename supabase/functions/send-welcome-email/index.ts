import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/mt-monogram-logo.png";
const HERO_URL = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/email-assets/email-hero-tech-lifestyle.jpg";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

    const { name, email } = await req.json();
    if (!email) throw new Error("Email is required");

    const firstName = name || "Friend";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "The Tech Brief <hello@notify.www.moderntech.store>",
        to: [email],
        subject: "Welcome to The Tech Brief — Essential curation for a modern life.",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Tech Brief</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f5f3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f3;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Inner card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:48px 40px 24px;">
              <img src="${LOGO_URL}" alt="Modern Tech" width="64" height="64" style="display:block;width:64px;height:auto;border:0;" />
            </td>
          </tr>

          <!-- Brand name -->
          <tr>
            <td align="center" style="padding:0 40px 8px;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#b0a8a0;">Modern Tech LLC</p>
            </td>
          </tr>

          <!-- Thin rule -->
          <tr>
            <td style="padding:0 60px;">
              <div style="height:1px;background-color:#e8e3de;"></div>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td style="padding:32px 40px 0;">
              <img src="${HERO_URL}" alt="Tech lifestyle" width="520" style="display:block;width:100%;height:auto;border:0;" />
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding:40px 48px 0;">
              <h1 style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;font-style:italic;color:#2c2825;line-height:1.3;">
                Welcome to The Tech Brief
              </h1>
            </td>
          </tr>

          <!-- Tagline -->
          <tr>
            <td align="center" style="padding:12px 48px 0;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b0a8a0;">
                Essential curation for a modern life
              </p>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td style="padding:32px 48px 0;">
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                ${firstName}, thank you for joining us.
              </p>
              <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                We curate the technology that shapes how you live, work, and play — distilled into what actually matters. No noise, no filler. Just the essentials.
              </p>
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5a5550;">
                Your free guide is ready for you. Click below to explore it now.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:36px 48px 0;">
              <a href="https://moderntech.store/smart-ring-guide" style="display:inline-block;background-color:#c8a0a0;color:#ffffff;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 40px;border:0;">
                View Your Guide
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:40px 60px 0;">
              <div style="height:1px;background-color:#e8e3de;"></div>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="padding:32px 48px 0;">
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

          <!-- Footer -->
          <tr>
            <td style="padding:40px 48px 48px;">
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
        <!-- /Inner card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Welcome email sent to:", email, data);
    return new Response(JSON.stringify({ success: true }), {
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
