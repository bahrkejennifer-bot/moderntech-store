import { describe, expect, it, vi } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { createHandoutHandler, issueToken, validToken, signupInput, HANDOUT_CONSENT, handoutEmail } from "../../supabase/functions/get-kids-tablet-handout/handout";
import { normalizeSubscriber, SUBSCRIBE_CONSENT_LINE } from "@/lib/subscribers";

const secret = "isolated-unit-test-signing-key-not-a-project-credential";
const pdfPath = "supabase/functions/get-kids-tablet-handout/kids-first-tablet-handout.pdf";

function harness(saveError = false, queueError = false, suppressed = false) {
  const rows = new Map<string, unknown>();
  const upsert = vi.fn(async (row) => { rows.set(row.email, row); return { error: saveError ? { code: "failure" } : null }; });
  const rpc = vi.fn(async () => ({ error: queueError ? { message: "disabled" } : null }));
  const work: Promise<void>[] = [];
  const readPdf = vi.fn(async () => new Uint8Array(readFileSync(pdfPath)));
  const client = { from: vi.fn((table) => table === "subscribers" ? { upsert } : {
    upsert: async () => ({ error: null }),
    select: () => ({ eq: () => ({
      limit: () => ({ maybeSingle: async () => ({ data: suppressed ? { email: "parent@example.com" } : null, error: null }) }),
      single: async () => ({ data: { token: "isolated-unsubscribe-token" }, error: null }),
    }) }),
  }), rpc };
  return { rows, upsert, rpc, readPdf, work, client,
    handler: createHandoutHandler({ client, secret, readPdf, cors: {},
      functionUrl: "https://example.com/functions/v1/get-kids-tablet-handout", background: p => { work.push(p); } }) };
}

const submit = (email = "parent@example.com") => new Request("https://example.com/functions/v1/get-kids-tablet-handout", {
  method: "POST", body: JSON.stringify({ email }),
});

describe("protected kids tablet handout", () => {
  it("requires valid email before subscriber saving, download issuance or email queuing", async () => {
    const h = harness();
    for (const email of ["", "not-an-email", "a@b", "a".repeat(256) + "@example.com"]) {
      expect((await h.handler(submit(email))).status).toBe(400);
    }
    expect(h.upsert).not.toHaveBeenCalled();
    expect(h.rpc).not.toHaveBeenCalled();
    expect(signupInput({ email: "parent@example.com", name: "x".repeat(101) })).toBeNull();
  });

  it("records mandatory consent and the exact source/freebie in the existing subscribers list", async () => {
    const h = harness();
    expect((await h.handler(submit(" Parent@Example.com "))).status).toBe(200);
    await Promise.all(h.work);
    expect(h.client.from).toHaveBeenCalledWith("subscribers");
    expect(h.upsert).toHaveBeenCalledWith({ email: "parent@example.com", name: null,
      source_page: "/free-downloads/kids-tablet-handout", freebie: "kids-tablet-handout", consent: true,
      consent_text: "Get the free handout plus weekly finds from The Edit. Unsubscribe anytime." }, { onConflict: "email" });
  });

  it("keeps shared consent defaults and allows the handout-specific consent record", () => {
    expect(normalizeSubscriber({ email: "parent@example.com", consent: true })?.consent_text).toBe(SUBSCRIBE_CONSENT_LINE);
    expect(normalizeSubscriber({ email: "parent@example.com", consent: true, consentText: HANDOUT_CONSENT })?.consent_text).toBe(HANDOUT_CONSENT);
  });

  it("issues fresh links for repeat email without duplicate subscribers", async () => {
    const h = harness();
    const first = await (await h.handler(submit())).json();
    const second = await (await h.handler(submit())).json();
    await Promise.all(h.work);
    expect(h.rows.size).toBe(1);
    expect(first.downloadUrl).not.toBe(second.downloadUrl);
  });

  it("does not issue a download if saving the subscriber fails", async () => {
    const h = harness(true);
    expect((await h.handler(submit())).status).toBe(503);
    expect(h.rpc).not.toHaveBeenCalled();
  });

  it("serves original PDF bytes only with a valid issued token", async () => {
    const h = harness();
    expect((await h.handler(new Request("https://example.com?email=parent@example.com"))).status).toBe(403);
    expect(h.readPdf).not.toHaveBeenCalled();
    const { downloadUrl } = await (await h.handler(submit())).json();
    const response = await h.handler(new Request(downloadUrl));
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array(readFileSync(pdfPath)));
    await Promise.all(h.work);
  });

  it("rejects expired or altered tokens and expires links after exactly one hour", async () => {
    const now = Date.now();
    const { token, expiresAt } = await issueToken(secret, now);
    expect(Date.parse(expiresAt)).toBe((Math.floor(now / 1000) + 3600) * 1000);
    expect(await validToken(token, secret, now)).toBe(true);
    expect(await validToken(token, secret, now + 3600 * 1000)).toBe(false);
    expect(await validToken(token.slice(0, -1) + (token.endsWith("0") ? "1" : "0"), secret, now)).toBe(false);
    expect(await validToken(token, "wrong-key", now)).toBe(false);
  });

  it("queues one app email with HTML/text and idempotency but queue failure cannot block delivery", async () => {
    const h = harness(false, true);
    const result = await h.handler(submit());
    expect(result.status).toBe(200);
    const { downloadUrl } = await result.json();
    await Promise.all(h.work);
    expect(h.rpc).toHaveBeenCalledTimes(1);
    const [name, args] = h.rpc.mock.calls[0] as unknown as [string, { queue_name: string; payload: Record<string, string> }];
    expect(name).toBe("enqueue_email");
    expect(args.queue_name).toBe("transactional_emails");
    expect(args.payload.purpose).toBe("transactional");
    expect(args.payload.idempotency_key).toBe(args.payload.message_id);
    expect(args.payload.from).toBe("Modern Tech LLC <noreply@notify.www.moderntech.store>");
    expect(args.payload.sender_domain).toBe("notify.www.moderntech.store");
    expect(args.payload.unsubscribe_token).toBe("isolated-unsubscribe-token");
    expect(args.payload.text).toContain(downloadUrl);
    expect((await h.handler(new Request(downloadUrl))).status).toBe(200);
    expect(handoutEmail(downloadUrl).text).not.toMatch(/\u2014|amazon\./);
  });

  it("respects email suppression while still issuing the on-page PDF", async () => {
    const h = harness(false, false, true);
    expect((await h.handler(submit())).status).toBe(200);
    await Promise.all(h.work);
    expect(h.rpc).not.toHaveBeenCalled();
  });

  it("removes the static PDF while retaining the original private asset", () => {
    expect(existsSync("public/downloads/kids-first-tablet-handout.pdf")).toBe(false);
    expect(readFileSync(pdfPath).subarray(0, 5).toString()).toBe("%PDF-");
  });
});