import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Help-desk knowledge grounded in the site's actual published policies.
const SYSTEM_PROMPT = `You are the customer support assistant for Modern Tech LLC (moderntech.store), a curated tech recommendation site.

Answer questions using only these facts from our help docs:

WHO WE ARE
- Modern Tech LLC operates moderntech.store as an affiliate marketing website. We review and recommend tech products and link to third-party retailers, primarily Amazon.com.
- We do not sell or ship physical products ourselves. Purchases happen on Amazon (or another retailer) after clicking our links.

PHYSICAL PRODUCT ORDERS (Amazon)
- Order status, shipping, tracking, delivery, returns and refunds for physical products are handled by Amazon, not by us.
- To return an Amazon purchase: log in to your Amazon account, go to Your Orders, find the item, and follow Amazon's return instructions.
- We cannot see or manage a visitor's Amazon order. Never claim to look up an Amazon order.

DIGITAL PRODUCTS (PDF guides sold on moderntech.store)
- Digital guides are sold directly by Modern Tech LLC and delivered by email with a secure download link after checkout.
- If a download email did not arrive: check spam/junk, then contact us and we will resend it.
- Digital product sales are final due to their nature, but we help with any technical download issue.
- If the visitor gives their email address, their Modern Tech digital purchases (if any) are listed in the context below. You may confirm those purchases and help with download issues. Never invent purchases that are not listed.

NEWSLETTER
- The Signal is our free weekly tech newsletter. Visitors can subscribe on the site and unsubscribe anytime.

CONTACT AND ESCALATION
- If you are not sure of an answer, or the visitor needs a human (refund dispute, missing email after checking spam, account issue, press, business inquiry), say so honestly and offer to hand the conversation to the team.
- When the visitor wants a human, ask them to tap "Talk to a person" below the chat and leave their email. The team replies from info@moderntech.store.

RULES
- Be warm, concise and honest. Keep answers under 120 words.
- Never invent policies, prices, discounts, order data, or product claims.
- Never promise a refund for Amazon purchases; that is Amazon's decision.
- If something is outside the facts above, say you are not sure and offer the human handoff.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);
  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_WINDOW_MS;
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) rateLimitMap.delete(key);
    }
  }
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") || "unknown";
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });

const TOKEN_RE = /^[A-Za-z0-9-]{20,80}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = getClientIp(req);
    if (!checkRateLimit(clientIp)) {
      return json({ error: "Too many messages. Please wait a minute and try again." }, 429);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Backend not configured");
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid request" }, 400);

    const { action = "message", visitorToken, message, email } = body as {
      action?: string;
      visitorToken?: string;
      message?: string;
      email?: string;
    };

    if (!visitorToken || typeof visitorToken !== "string" || !TOKEN_RE.test(visitorToken)) {
      return json({ error: "Invalid visitor token" }, 400);
    }

    // Get or create the visitor's single conversation
    let { data: conversation } = await supabase
      .from("support_conversations")
      .select("*")
      .eq("visitor_token", visitorToken)
      .maybeSingle();

    if (!conversation) {
      const { data: created, error: createErr } = await supabase
        .from("support_conversations")
        .insert({ visitor_token: visitorToken })
        .select("*")
        .single();
      if (createErr) throw createErr;
      conversation = created;
    }

    if (action === "history") {
      const { data: messages } = await supabase
        .from("support_messages")
        .select("role, content, created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true })
        .limit(100);
      return json({ messages: messages ?? [], status: conversation.status });
    }

    if (action === "escalate") {
      const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
      if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 255) {
        return json({ error: "Please provide a valid email address." }, 400);
      }

      await supabase
        .from("support_conversations")
        .update({ status: "escalated", visitor_email: cleanEmail, updated_at: new Date().toISOString() })
        .eq("id", conversation.id);

      const { data: transcript } = await supabase
        .from("support_messages")
        .select("role, content, created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true })
        .limit(100);

      const rows = (transcript ?? []).map((m) =>
        `<tr><td style="color:#8a8580;padding-right:12px;vertical-align:top;white-space:nowrap;">${escapeHtml(m.role)}</td><td style="padding-bottom:8px;">${escapeHtml(m.content)}</td></tr>`
      ).join("");
      const html = `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,sans-serif;color:#2c2825;">
<p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8580;margin:0 0 8px;">Modern Tech · Support handoff</p>
<h1 style="font-size:18px;font-weight:600;margin:0 0 6px;">Support chat needs a human</h1>
<p style="font-size:14px;margin:0 0 16px;">Visitor email: <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>
<table cellpadding="4" cellspacing="0" style="font-size:13px;border-collapse:collapse;">${rows || '<tr><td>No messages recorded.</td></tr>'}</table>
</body></html>`;

      const messageId = `support-handoff-${conversation.id}-${Date.now()}`;
      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "support_handoff",
        recipient_email: "info@moderntech.store",
        status: "pending",
      });
      const { error: qErr } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          idempotency_key: messageId,
          to: "info@moderntech.store",
          from: "Modern Tech LLC <noreply@notify.www.moderntech.store>",
          sender_domain: "notify.www.moderntech.store",
          subject: `Support handoff: ${cleanEmail}`.slice(0, 150),
          html,
          purpose: "transactional",
          label: "support_handoff",
          queued_at: new Date().toISOString(),
        },
      });
      if (qErr) console.error("handoff email enqueue failed", qErr);

      await supabase.from("support_messages").insert({
        conversation_id: conversation.id,
        role: "assistant",
        content: "Thanks - I've passed our conversation to the team. They'll reply to your email from info@moderntech.store. Anything else I can help with in the meantime?",
      });

      return json({
        reply: "Thanks - I've passed our conversation to the team. They'll reply to your email from info@moderntech.store. Anything else I can help with in the meantime?",
        status: "escalated",
      });
    }

    // Default action: chat message
    if (!message || typeof message !== "string" || !message.trim()) {
      return json({ error: "Message is required" }, 400);
    }
    const cleanMessage = message.trim().slice(0, 1000);

    await supabase.from("support_messages").insert({
      conversation_id: conversation.id,
      role: "user",
      content: cleanMessage,
    });

    // Capture an email address if the visitor shares one, for order lookups
    const emailMatch = cleanMessage.match(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/);
    if (emailMatch && !conversation.visitor_email) {
      await supabase
        .from("support_conversations")
        .update({ visitor_email: emailMatch[0].toLowerCase(), updated_at: new Date().toISOString() })
        .eq("id", conversation.id);
      conversation.visitor_email = emailMatch[0].toLowerCase();
    }

    // Order context: only the visitor's own digital purchases, only after they share an email
    let orderContext = "The visitor has not shared an email address, so no order information is available.";
    if (conversation.visitor_email) {
      const { data: purchases } = await supabase
        .from("purchases")
        .select("customer_email, purchased_at, digital_products(title)")
        .eq("customer_email", conversation.visitor_email)
        .order("purchased_at", { ascending: false })
        .limit(10);
      if (purchases && purchases.length > 0) {
        const lines = purchases.map((p) => {
          const title = (p.digital_products as { title?: string } | null)?.title ?? "Digital guide";
          const when = new Date(p.purchased_at).toISOString().slice(0, 10);
          return `- ${title} (purchased ${when})`;
        });
        orderContext = `Modern Tech digital purchases on record for ${conversation.visitor_email}:\n${lines.join("\n")}`;
      } else {
        orderContext = `No Modern Tech digital purchases are on record for ${conversation.visitor_email}.`;
      }
    }

    const { data: history } = await supabase
      .from("support_messages")
      .select("role, content")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true })
      .limit(20);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const conversationMessages = [
      { role: "system", content: `${SYSTEM_PROMPT}\n\nORDER CONTEXT\n${orderContext}` },
      ...((history ?? []) as ChatMessage[]).slice(-12),
    ];

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
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply: string = data.choices?.[0]?.message?.content ||
      "I'm not sure about that one. Tap \"Talk to a person\" and our team will help you directly.";

    await supabase.from("support_messages").insert({
      conversation_id: conversation.id,
      role: "assistant",
      content: reply,
    });

    return json({ reply, status: conversation.status });
  } catch (error: unknown) {
    console.error("Error in support-chat:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return json({ error: errorMessage }, 500);
  }
});
