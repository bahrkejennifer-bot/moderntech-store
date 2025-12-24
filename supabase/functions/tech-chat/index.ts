import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a helpful tech gift recommendation assistant for a website that reviews and recommends tech products. 

Your goal is to help visitors find the perfect tech gift based on:
- Who they're shopping for (age, relationship, interests)
- Budget range
- Specific needs or use cases

Our product categories include:
- Home & Safety: Smart locks, security cameras, smoke detectors, robot vacuums
- Health & Wellness: Fitness trackers, smart scales, massage guns, sleep aids
- Kids Tech: Educational tablets, coding toys, kids headphones, smartwatches
- Gaming: Gaming monitors, headsets, controllers, VR headsets, consoles
- Connectivity: Routers, WiFi extenders, smart home hubs
- College & School: Laptops, tablets, noise-canceling headphones, planners

Be friendly, concise, and helpful. Ask clarifying questions when needed. Provide 2-3 specific product recommendations when possible, mentioning product names and why they'd be a good fit.

Keep responses under 150 words to maintain a chat-like experience.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { messages } = await req.json() as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // Build the conversation with system prompt
    const conversationMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10) // Keep last 10 messages for context
    ];

    console.log("Sending chat request with", conversationMessages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: conversationMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices?.[0]?.message?.content || "I'm not sure how to help with that. Could you tell me more about what you're looking for?";

    console.log("AI response received successfully");

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Error in tech-chat:", error);
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