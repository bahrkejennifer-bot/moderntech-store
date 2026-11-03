import { describe, it, expect } from "vitest";
import { normalizeSubscriber, SUBSCRIBE_CONSENT_LINE } from "@/lib/subscribers";
import { subscribersToCsv } from "@/lib/subscribersCsv";

describe("subscribers list", () => {
  it("stores one lowercase email with source page and freebie", () => {
    const row = normalizeSubscriber({ email: "  Jen@Example.COM ", freebie: "smart-ring-buyers-guide", sourcePage: "/free-smart-ring-guide" });
    expect(row).toMatchObject({ email: "jen@example.com", freebie: "smart-ring-buyers-guide", source_page: "/free-smart-ring-guide" });
  });

  it("name is optional", () => {
    expect(normalizeSubscriber({ email: "a@b.co", sourcePage: "/" })?.name).toBeNull();
  });

  it("records the consent line only when consent is given", () => {
    expect(normalizeSubscriber({ email: "a@b.co", consent: true, sourcePage: "/" })?.consent_text).toBe("Get The Signal every week. Unsubscribe anytime.");
    expect(normalizeSubscriber({ email: "a@b.co", sourcePage: "/" })?.consent).toBe(false);
    expect(SUBSCRIBE_CONSENT_LINE).not.toContain("—");
  });

  it("rejects invalid emails", () => {
    expect(normalizeSubscriber({ email: "not-an-email" })).toBeNull();
  });

  it("CSV export neutralizes spreadsheet formulas", () => {
    const csv = subscribersToCsv([{ email: "x@y.co", name: "=HACK()", signup_date: "2026-11-02", source_page: "/", freebie: null, consent: true }]);
    expect(csv.split("\r\n")[1]).toContain(`"'=HACK()"`);
  });
});
