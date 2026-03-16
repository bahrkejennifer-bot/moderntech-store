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
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing auth");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    // Verify admin
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) throw new Error("Admin access required");

    const { subject, body } = await req.json();
    if (!subject || !body) throw new Error("Subject and body required");

    // Fetch all subscribers
    const { data: subscribers, error: subError } = await adminClient
      .from("lead_captures")
      .select("email, name");
    if (subError) throw subError;

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ success: true, recipientCount: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build clean HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border-radius:12px;padding:40px;border:1px solid #E5E7EB;">
      <div style="margin-bottom:24px;">
        <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#9CA3AF;">Modern Tech LLC</span>
      </div>
      <h1 style="font-family:'Georgia',serif;font-size:24px;color:#111827;margin:0 0 20px 0;font-weight:600;">${subject}</h1>
      <div style="font-size:16px;line-height:1.7;color:#374151;">
        ${body.split("\n").map((line: string) => line.trim() ? `<p style="margin:0 0 16px 0;">${line}</p>` : "").join("")}
      </div>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:32px 0;" />
      <p style="font-size:12px;color:#9CA3AF;margin:0;">
        © ${new Date().getFullYear()} Modern Tech LLC · <a href="https://moderntech.store" style="color:#6B7280;">moderntech.store</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    // Enqueue each email
    const messageId = `broadcast-${Date.now()}`;
    let enqueued = 0;

    for (const sub of subscribers) {
      await adminClient.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          to: sub.email,
          from: "Modern Tech LLC <info@moderntech.store>",
          subject,
          html: htmlContent,
          message_id: `${messageId}-${enqueued}`,
          template_name: "broadcast",
        },
      });

      // Log pending
      await adminClient.from("email_send_log").insert({
        message_id: `${messageId}-${enqueued}`,
        template_name: "broadcast",
        recipient_email: sub.email,
        status: "pending",
      });

      enqueued++;
    }

    return new Response(
      JSON.stringify({ success: true, recipientCount: enqueued, messageId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
