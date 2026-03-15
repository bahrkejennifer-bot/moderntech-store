import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) throw new Error("Missing server config");

    const url = new URL(req.url);
    const specId = url.searchParams.get("spec_id");
    const action = url.searchParams.get("action");

    if (!specId || action !== "approve") throw new Error("Invalid approval link");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check the spec exists and is a draft
    const { data: spec, error: specError } = await supabase
      .from("weekly_tech_specs")
      .select("id, subject, status")
      .eq("id", specId)
      .single();

    if (specError || !spec) throw new Error("Newsletter draft not found");

    if (spec.status === "sent") {
      return new Response(renderPage("Already Sent", "This newsletter has already been sent to subscribers.", "#86868b"), {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (spec.status === "approved") {
      return new Response(renderPage("Already Approved", `"${spec.subject}" is approved and scheduled for Monday 7:00 AM EST.`, "#34c759"), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Mark as approved
    const { error: updateError } = await supabase
      .from("weekly_tech_specs")
      .update({ status: "approved", updated_at: new Date().toISOString() })
      .eq("id", specId);

    if (updateError) throw new Error(`Failed to approve: ${updateError.message}`);

    console.log(`Tech Spec ${specId} approved for Monday send`);

    return new Response(
      renderPage(
        "Approved ✓",
        `"${spec.subject}" has been approved and will be sent to all subscribers on Monday at 7:00 AM EST.`,
        "#34c759"
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(renderPage("Error", msg, "#ff3b30"), {
      headers: { "Content-Type": "text/html" },
      status: 400,
    });
  }
});

function renderPage(title: string, message: string, color: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head>
<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;max-width:480px;padding:48px;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="width:64px;height:64px;border-radius:50%;background:${color}20;display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px;">
      <span style="font-size:28px;">${title.includes("✓") ? "✅" : title.includes("Error") ? "❌" : "ℹ️"}</span>
    </div>
    <h1 style="font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#1d1d1f;margin:0 0 12px;">${title}</h1>
    <p style="font-size:16px;color:#424245;line-height:1.6;margin:0 0 32px;">${message}</p>
    <a href="https://moderntech.store/admin/tech-spec" style="display:inline-block;background:#1d1d1f;color:#fff;font-size:13px;font-weight:500;text-decoration:none;padding:12px 28px;border-radius:8px;">View Dashboard →</a>
    <p style="margin:24px 0 0;font-size:11px;color:#86868b;">Modern Tech LLC</p>
  </div>
</body></html>`;
}
