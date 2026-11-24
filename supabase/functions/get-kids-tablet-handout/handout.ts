import { emailTextFromHtml } from "../_shared/email-content.ts";

export const HANDOUT_CONSENT = "Get the free handout plus weekly finds from The Edit. Unsubscribe anytime.";
export const HANDOUT_SOURCE = "/free-downloads/kids-tablet-handout";
export const HANDOUT_FREEBIE = "kids-tablet-handout";
export const HANDOUT_BUCKET = "digital-products";
export const HANDOUT_STORAGE_PATH = "handouts/kids-first-tablet-handout-9c4f2a7e1b8d4053.pdf";
export const LINK_TTL_SECONDS = 3600;

// Read the original PDF from private storage with the server-side service-role client.
// deno-lint-ignore no-explicit-any
export async function readHandoutFromStorage(client: any, bucket = HANDOUT_BUCKET, path = HANDOUT_STORAGE_PATH): Promise<Uint8Array> {
  const { data, error } = await client.storage.from(bucket).download(path);
  if (error || !data) throw error ?? new Error("Handout PDF missing from storage");
  return new Uint8Array(await data.arrayBuffer());
}

export function signupInput(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  if (typeof input.email !== "string" || (input.name !== undefined && typeof input.name !== "string")) return null;
  const email = input.email.trim().toLowerCase();
  if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (typeof input.name === "string" && input.name.trim().length > 100) return null;
  return { email, name: typeof input.name === "string" ? input.name.trim() || null : null,
    source_page: HANDOUT_SOURCE, freebie: HANDOUT_FREEBIE, consent: true, consent_text: HANDOUT_CONSENT };
}

const encoder = new TextEncoder();
const hex = (bytes: ArrayBuffer) => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
async function signingKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function issueToken(secret: string, now = Date.now()) {
  const expires = Math.floor(now / 1000) + LINK_TTL_SECONDS;
  const body = `${expires}.${crypto.randomUUID()}`;
  const signature = await crypto.subtle.sign("HMAC", await signingKey(secret), encoder.encode(`kids-tablet-handout:${body}`));
  return { token: `${body}.${hex(signature)}`, expiresAt: new Date(expires * 1000).toISOString() };
}

export async function validToken(token: string, secret: string, now = Date.now()) {
  const match = /^(\d{10})\.([0-9a-f-]{36})\.([0-9a-f]{64})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  const current = Math.floor(now / 1000);
  if (expires <= current || expires > current + LINK_TTL_SECONDS) return false;
  const bytes = new Uint8Array(match[3].match(/../g)?.map(v => parseInt(v, 16)) ?? []);
  return crypto.subtle.verify("HMAC", await signingKey(secret), bytes, encoder.encode(`kids-tablet-handout:${match[1]}.${match[2]}`));
}

export function handoutEmail(link: string) {
  // Link is generated server-side, never accepted from the visitor.
  const safeLink = link.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const html = `<html><body><h1>Modern Tech LLC</h1><p>Your Kid's First Tablet Setup handout is ready.</p>
<p><a href="${safeLink}">Download your handout</a>. This link expires in one hour.</p>
<p>You can also download from the handout page by entering your email again if this link has expired.</p>
<p><a href="https://moderntech.store/the-edit">The Edit</a>. Unsubscribe anytime.</p></body></html>`;
  return { html, text: emailTextFromHtml(html) };
}

// Structural client type keeps tests isolated from real queues and recipients.
// deno-lint-ignore no-explicit-any
export function createHandoutHandler(deps: { client: any; secret: string; functionUrl: string;
  readPdf: () => Promise<Uint8Array>; cors: Record<string, string>; background: (work: Promise<void>) => void }) {
  const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
    status, headers: { ...deps.cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: deps.cors });
    try {
      if (req.method === "GET") {
        const token = new URL(req.url).searchParams.get("token") ?? "";
        if (!await validToken(token, deps.secret)) return json({ error: "This download link is invalid or expired. Please enter your email on the handout page for a new link." }, 403);
        const pdf = await deps.readPdf();
        return new Response(pdf as BodyInit, { headers: { ...deps.cors, "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="kids-first-tablet-handout.pdf"', "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
      }
      if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
      let body: unknown;
      try { body = await req.json(); } catch { return json({ error: "Please enter a valid email address." }, 400); }
      const row = signupInput(body);
      if (!row) return json({ error: "Please enter a valid email address and a first name under 100 characters." }, 400);
      // Reconfirm and upgrade repeat signup consent in the same existing list.
      const { error } = await deps.client.from("subscribers").upsert(row, { onConflict: "email" });
      if (error) return json({ error: "Could not save your email. Please try again." }, 503);
      const { token, expiresAt } = await issueToken(deps.secret);
      const url = new URL(deps.functionUrl);
      url.searchParams.set("token", token);
      const downloadUrl = url.toString();
      const messageId = `kids-tablet-handout-${crypto.randomUUID()}`;
      deps.background((async () => {
        try {
          const { data: suppressed, error: suppressionError } = await deps.client.from("suppressed_emails")
            .select("email").eq("email", row.email).limit(1).maybeSingle();
          if (suppressionError) throw suppressionError;
          if (suppressed) return;
          const { error: tokenInsertError } = await deps.client.from("email_unsubscribe_tokens")
            .upsert({ email: row.email, token: crypto.randomUUID() }, { onConflict: "email", ignoreDuplicates: true });
          if (tokenInsertError) throw tokenInsertError;
          const { data: unsubscribe, error: tokenError } = await deps.client.from("email_unsubscribe_tokens")
            .select("token").eq("email", row.email).single();
          if (tokenError || !unsubscribe?.token) throw new Error("Missing unsubscribe token");
          const { html, text } = handoutEmail(downloadUrl);
          const { error: queueError } = await deps.client.rpc("enqueue_email", {
            queue_name: "transactional_emails",
            payload: { message_id: messageId, idempotency_key: messageId,
              to: row.email, from: "Modern Tech LLC <noreply@notify.www.moderntech.store>",
              sender_domain: "notify.www.moderntech.store", subject: "Your Kid's First Tablet Setup handout",
              html, text, purpose: "transactional", unsubscribe_token: unsubscribe.token,
              label: "kids-tablet-handout", queued_at: new Date().toISOString() },
          });
          if (queueError) console.error("Handout email could not be queued.");
        } catch { console.error("Handout email could not be queued."); }
      })());
      return json({ downloadUrl, expiresAt });
    } catch {
      return json({ error: "Your handout is temporarily unavailable. Please try again." }, 503);
    }
  };
}