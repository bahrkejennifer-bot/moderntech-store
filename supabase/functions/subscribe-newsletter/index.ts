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

    // Default campaign ID for the newsletter
    const DEFAULT_CAMPAIGN_ID = "CIFHU";
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GetResponse API error:", errorData);
      
      // Handle specific error cases
      if (response.status === 409) {
        // Contact already exists - this is not really an error for the user
        return new Response(
          JSON.stringify({ success: true, message: "You're already subscribed!" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
      
      throw new Error(errorData.message || "Failed to subscribe");
    }

    const data = await response.json();
    console.log("Successfully subscribed:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed!" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
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
