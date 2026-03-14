import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const getResponseApiKey = Deno.env.get("GETRESPONSE_API_KEY");
    if (!getResponseApiKey) {
      throw new Error("GETRESPONSE_API_KEY is not configured");
    }

    const { email, name, campaignId } = await req.json();

    // Default campaign ID for the newsletter (using list token)
    const DEFAULT_CAMPAIGN_ID = "CiFHU";
    const finalCampaignId = campaignId || DEFAULT_CAMPAIGN_ID;

    if (!email) {
      throw new Error("Email is required");
    }

    console.log("Subscribing to newsletter:", { email, name, campaignId: finalCampaignId });

    // GetResponse API endpoint for adding contacts
    const response = await fetch("https://api.getresponse.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${getResponseApiKey}`,
      },
      body: JSON.stringify({
        email: email,
        name: name || undefined,
        campaign: {
          campaignId: finalCampaignId,
        },
      }),
    });

    // GetResponse returns 202 Accepted on success with no body, or 409 if contact exists
    if (response.status === 202 || response.status === 201) {
      console.log("Successfully subscribed:", email);

      // Fire Zapier webhook for newsletter signup (fire-and-forget)
      const zapierUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
      if (zapierUrl) {
        fetch(zapierUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "newsletter_signup",
            timestamp: new Date().toISOString(),
            source: "moderntech.store",
            email,
            name: name || "",
          }),
        }).catch((err) => console.error("Zapier webhook error:", err));
      }

      return new Response(
        JSON.stringify({ success: true, message: "Successfully subscribed!" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    if (response.status === 409) {
      // Contact already exists - this is not really an error for the user
      console.log("Contact already exists:", email);
      return new Response(
        JSON.stringify({ success: true, message: "You're already subscribed!" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Handle error responses
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    console.error("GetResponse API error:", response.status, errorData);
    throw new Error(errorData.message || `Failed to subscribe (status: ${response.status})`);
  } catch (error: unknown) {
    console.error("Error subscribing to newsletter:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
