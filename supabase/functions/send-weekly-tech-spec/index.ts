import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SENDER_DOMAIN = "www.moderntech.store";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const getResponseApiKey = Deno.env.get("GETRESPONSE_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) throw new Error("Missing server config");

    const { spec_id } = await req.json();
    if (!spec_id) throw new Error("spec_id is required");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the approved spec
    const { data: spec, error: specError } = await supabase
      .from("weekly_tech_specs")
      .select("*")
      .eq("id", spec_id)
      .single();

    if (specError || !spec) throw new Error("Newsletter draft not found");
    if (spec.status === "sent") throw new Error("This newsletter has already been sent");

    // 1. Send via Cloud pipeline to lead_captures subscribers
    const { data: leads, error: leadsError } = await supabase
      .from("lead_captures")
      .select("email, name")
      .order("created_at", { ascending: false });

    if (leadsError) {
      console.error("Failed to fetch leads:", leadsError);
    }

    const uniqueEmails = new Map<string, string>();
    for (const lead of leads || []) {
      if (!uniqueEmails.has(lead.email)) {
        uniqueEmails.set(lead.email, lead.name || lead.email.split("@")[0]);
      }
    }

    let cloudSent = 0;
    for (const [email, name] of uniqueEmails) {
      const messageId = `tech-spec-${spec.id}-${email}-${Date.now()}`;

      // Log pending
      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "weekly_tech_spec",
        recipient_email: email,
        status: "pending",
      });

      // Enqueue
      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: email,
          from: `The Tech Brief <hello@${SENDER_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject: spec.subject,
          html: spec.html_content,
          purpose: "transactional",
          label: "weekly_tech_spec",
          queued_at: new Date().toISOString(),
        },
      });

      if (enqueueError) {
        console.error(`Failed to enqueue for ${email}:`, enqueueError);
      } else {
        cloudSent++;
      }
    }

    // 2. Send via GetResponse (if API key exists)
    let getResponseSent = false;
    if (getResponseApiKey) {
      try {
        // Create a newsletter in GetResponse
        const grResponse = await fetch("https://api.getresponse.com/v3/newsletters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `api-key ${getResponseApiKey}`,
          },
          body: JSON.stringify({
            subject: spec.subject,
            name: `Weekly Tech Spec - ${new Date().toISOString().split("T")[0]}`,
            content: {
              html: spec.html_content,
              plain: spec.plain_text || undefined,
            },
            sendSettings: {
              selectedCampaigns: ["default"],
            },
          }),
        });

        if (grResponse.ok) {
          getResponseSent = true;
          console.log("GetResponse newsletter created successfully");
        } else {
          const grError = await grResponse.text();
          console.error("GetResponse error:", grResponse.status, grError);
        }
      } catch (grErr) {
        console.error("GetResponse send failed:", grErr);
      }
    }

    // Mark as sent
    await supabase
      .from("weekly_tech_specs")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        recipients_count: cloudSent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", spec_id);

    return new Response(
      JSON.stringify({
        success: true,
        cloud_recipients: cloudSent,
        getresponse_sent: getResponseSent,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
