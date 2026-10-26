import { describe, it, expect } from "vitest";
import {
  recordDigitalSignup, dedupeKeyFor, buildAdminNotification, ADMIN_NOTIFICATION_EMAIL,
} from "../../supabase/functions/_shared/digital-signup";

// In-memory mock of the service-role client. Nothing is sent anywhere.
function mockClient() {
  const rows: any[] = [];
  const calls = { enqueued: [] as any[], subscribed: [] as any[], logs: [] as any[] };
  const from = (table: string) => {
    if (table === "email_send_log") return { insert: async (r: any) => { calls.logs.push(r); return { error: null }; } };
    let filters: Array<[string, any]> = [];
    let patch: any = null;
    const api: any = {
      insert(r: any) {
        const dup = rows.find((x) => x.dedupe_key === r.dedupe_key);
        const res = dup ? { data: null, error: { code: "23505" } } : (rows.push({ id: `id${rows.length}`, ...r }), { data: { id: `id${rows.length - 1}` }, error: null });
        return { select: () => ({ maybeSingle: async () => res }) };
      },
      update(p: any) { patch = p; filters = []; return api; },
      eq(k: string, v: any) { filters.push([k, v]); return api; },
      select() { return api; },
      async maybeSingle() {
        const hit = rows.find((r) => filters.every(([k, v]) => r[k] === v));
        if (hit && patch) Object.assign(hit, patch);
        return { data: hit ? { id: hit.id } : null, error: null };
      },
      then(res: any) { // awaited update without select
        rows.filter((r) => filters.every(([k, v]) => r[k] === v)).forEach((r) => Object.assign(r, patch));
        return Promise.resolve({ error: null }).then(res);
      },
    };
    return api;
  };
  return {
    rows, calls,
    client: {
      from,
      rpc: async (_n: string, args: any) => { calls.enqueued.push(args.payload); return { error: null }; },
      functions: { invoke: async (_n: string, args: any) => { calls.subscribed.push(args.body); return { error: null }; } },
    },
  };
}

const paid = { kind: "paid" as const, email: "Buyer@Example.com", productSlug: "creator-bundle", productLabel: "The Complete Creator Bundle", amountCents: 5900, stripeSessionId: "cs_test_1" };

describe("digital signup", () => {
  it("paid purchase without consent: notifies once, never enrolls", async () => {
    const m = mockClient();
    const r = await recordDigitalSignup(m.client, { ...paid, newsletterOptIn: false });
    expect(r).toEqual({ duplicate: false, notified: true, enrolled: false });
    expect(m.calls.subscribed).toHaveLength(0);
    expect(m.calls.enqueued[0].to).toBe(ADMIN_NOTIFICATION_EMAIL);
    expect(m.rows[0].email).toBe("buyer@example.com");
    expect(m.rows[0].newsletter_consent_at).toBeNull();
  });

  it("Stripe retry of same session does not re-notify or re-enroll", async () => {
    const m = mockClient();
    await recordDigitalSignup(m.client, { ...paid, newsletterOptIn: true });
    const again = await recordDigitalSignup(m.client, { ...paid, newsletterOptIn: true });
    expect(again.duplicate).toBe(true);
    expect(m.calls.enqueued).toHaveLength(1);
    expect(m.calls.subscribed).toHaveLength(1);
  });

  it("consent stores text + time and enrolls via existing newsletter flow", async () => {
    const m = mockClient();
    const r = await recordDigitalSignup(m.client, { ...paid, newsletterOptIn: true, consentAt: "2026-10-07T00:00:00Z" });
    expect(r.enrolled).toBe(true);
    expect(m.rows[0].newsletter_consent_text).toMatch(/The Signal/);
    expect(m.rows[0].newsletter_consent_at).toBe("2026-10-07T00:00:00Z");
    expect(m.rows[0].newsletter_enrolled_at).toBeTruthy();
  });

  it("repeat free signup that later opts in upgrades consent without a second notification", async () => {
    const m = mockClient();
    const free = { kind: "free" as const, email: "a@b.co", productSlug: "faceless-reels-guide" };
    await recordDigitalSignup(m.client, { ...free, newsletterOptIn: false });
    const r = await recordDigitalSignup(m.client, { ...free, newsletterOptIn: true });
    expect(r).toMatchObject({ duplicate: true, enrolled: true });
    expect(m.calls.enqueued).toHaveLength(1);
    expect(dedupeKeyFor({ ...free, email: "A@B.CO", newsletterOptIn: false })).toBe("free:faceless-reels-guide:a@b.co");
  });

  it("escapes customer-supplied text in the notification", () => {
    const { html } = buildAdminNotification({ ...paid, email: "<script>x</script>@e.com", newsletterOptIn: false });
    expect(html).not.toContain("<script>");
    expect(html).toContain("$59.00");
  });
});
