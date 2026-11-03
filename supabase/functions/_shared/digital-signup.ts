// Shared, dependency-free logic for digital-product signups (free + paid).
// - Persists the signup + optional newsletter consent (service role only table).
// - Deduplicates via a unique dedupe_key (Stripe session id for paid, product+email for free),
//   so Stripe webhook retries and repeat requests never notify or enroll twice.
// - Enrolls in the existing newsletter list ONLY when the buyer ticked the consent box.
// - Sends one concise notification to the existing business inbox via the existing email queue.
// Product delivery never depends on anything in this file.

// Existing business inbox already used for admin notifications in this project. Server-side only.
export const ADMIN_NOTIFICATION_EMAIL = "info@moderntech.store";
export const SENDER_DOMAIN = "notify.www.moderntech.store";
export const NEWSLETTER_CONSENT_TEXT =
  "Send me The Signal, our weekly tech newsletter. Unsubscribe anytime.";
// Explicit newsletter signups (not digital products) — handled by the existing newsletter flow.
export const NEWSLETTER_ONLY_MAGNETS = new Set(["modern-tech-edit"]);

export interface SignupInput {
  kind: "free" | "paid";
  email: string;
  name?: string | null;
  productSlug?: string | null;
  productLabel?: string | null;
  source?: string | null;
  amountCents?: number | null;
  stripeSessionId?: string | null;
  newsletterOptIn: boolean;
  consentAt?: string | null;
}

export interface SignupResult {
  duplicate: boolean;
  notified: boolean;
  enrolled: boolean;
}

// Minimal structural types so this can be unit-tested with a mock client.
// deno-lint-ignore no-explicit-any
type AnyClient = any;

export function dedupeKeyFor(input: SignupInput): string {
  if (input.kind === "paid") return `paid:${input.stripeSessionId ?? ""}`;
  return `free:${(input.productSlug ?? "unknown").toLowerCase()}:${input.email.trim().toLowerCase()}`;
}

export function escapeHtml(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function buildAdminNotification(input: SignupInput): { subject: string; html: string } {
  const label = input.productLabel || input.productSlug || "Digital product";
  const what = input.kind === "paid" ? "Paid purchase confirmed" : "Free download signup";
  const amount = input.kind === "paid" && typeof input.amountCents === "number"
    ? `$${(input.amountCents / 100).toFixed(2)}` : null;
  const rows: Array<[string, string]> = [
    ["Type", what],
    ["Product", label],
    ["Email", input.email],
    ...(amount ? [["Amount", amount] as [string, string]] : []),
    ["Newsletter opt-in", input.newsletterOptIn ? "Yes" : "No"],
    ["Source", input.source || "—"],
    ["Time (UTC)", new Date().toISOString()],
  ];
  const html = `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,sans-serif;color:#2c2825;">
<p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8580;margin:0 0 8px;">Modern Tech · Store notification</p>
<h1 style="font-size:18px;font-weight:600;margin:0 0 16px;">${escapeHtml(what)}: ${escapeHtml(label)}</h1>
<table cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
${rows.map(([k, v]) => `<tr><td style="color:#8a8580;padding-right:16px;">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join("")}
</table></body></html>`;
  return { subject: `${what}: ${label}`.slice(0, 150), html };
}

export async function recordDigitalSignup(supabase: AnyClient, input: SignupInput): Promise<SignupResult> {
  const email = input.email.trim().toLowerCase();
  const dedupe_key = dedupeKeyFor({ ...input, email });
  const consentAt = input.newsletterOptIn ? (input.consentAt || new Date().toISOString()) : null;
  const result: SignupResult = { duplicate: false, notified: false, enrolled: false };

  const { data: inserted, error } = await supabase
    .from("digital_product_signups")
    .insert({
      dedupe_key,
      kind: input.kind,
      email,
      product_slug: input.productSlug ?? null,
      product_label: input.productLabel ?? null,
      source: input.source ?? null,
      amount_cents: input.amountCents ?? null,
      stripe_session_id: input.stripeSessionId ?? null,
      newsletter_opt_in: input.newsletterOptIn,
      newsletter_consent_text: input.newsletterOptIn ? NEWSLETTER_CONSENT_TEXT : null,
      newsletter_consent_at: consentAt,
    })
    .select("id")
    .maybeSingle();

  let rowId: string | null = inserted?.id ?? null;
  if (error) {
    if (error.code !== "23505") throw error;
    result.duplicate = true;
    // Repeat signup: only upgrade consent (never downgrade, never re-notify).
    if (!input.newsletterOptIn) return result;
    const { data: upgraded } = await supabase
      .from("digital_product_signups")
      .update({ newsletter_opt_in: true, newsletter_consent_text: NEWSLETTER_CONSENT_TEXT, newsletter_consent_at: consentAt })
      .eq("dedupe_key", dedupe_key)
      .eq("newsletter_opt_in", false)
      .select("id")
      .maybeSingle();
    if (!upgraded) return result; // already consented earlier — already enrolled
    rowId = upgraded.id;
  }

  if (input.newsletterOptIn) {
    try {
      const { error: subErr } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email, name: input.name || email.split("@")[0], source: `digital:${input.productSlug ?? ""}` },
      });
      if (!subErr && rowId) {
        await supabase.from("digital_product_signups")
          .update({ newsletter_enrolled_at: new Date().toISOString() }).eq("id", rowId);
        result.enrolled = true;
      }
    } catch (e) {
      console.error("newsletter enrollment failed", e);
    }
  }

  if (!result.duplicate) {
    try {
      const { subject, html } = buildAdminNotification({ ...input, email });
      const messageId = `signup-admin-${dedupe_key}`;
      await supabase.from("email_send_log").insert({
        message_id: messageId, template_name: "digital_signup_admin",
        recipient_email: ADMIN_NOTIFICATION_EMAIL, status: "pending",
      });
      const { error: qErr } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          idempotency_key: messageId,
          to: ADMIN_NOTIFICATION_EMAIL,
          from: `Modern Tech LLC <noreply@${SENDER_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject, html,
          purpose: "transactional",
          label: "digital_signup_admin",
          queued_at: new Date().toISOString(),
        },
      });
      if (!qErr && rowId) {
        await supabase.from("digital_product_signups")
          .update({ admin_notified_at: new Date().toISOString() }).eq("id", rowId);
        result.notified = true;
      }
    } catch (e) {
      console.error("admin notification failed", e);
    }
  }
  return result;
}
