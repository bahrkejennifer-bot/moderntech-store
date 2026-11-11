import { describe, it, expect } from "vitest";
import { selections, verifiedImages, withVerifiedImage, withAffiliateTag, isEligible, asinOf } from "@/lib/curatedSelections";

const expected: Record<string, [string, string]> = {
  "rocketbook-core": ["B0DP3HRDC2", "71lZL1GA+AL"],
  "soundcore-space-one": ["B0C6KFZC9Z", "71hpOPfOGoL"],
  "benq-screenbar-halo-2": ["B0DK59YKRS", "41fmQI53UNL"],
  "renpho-elis-1": ["B01N1UX8RW", "61KqTsLN+pL"],
  "snap-circuits-jr-sc-100": ["B00008BFZH", "71wjLjOAVBL"],
  "jbl-flip-6": ["B09GJVTRNZ", "61Eaj593GtL"],
  "anker-solix-c300-dc": ["B0D62PMB3R", "20240604-1523121"],
};

describe("verified product images", () => {
  it("covers all seven selections in unchanged order", () => {
    expect(selections.map((s) => s.slug)).toEqual(Object.keys(expected));
  });
  for (const [slug, [asin, token]] of Object.entries(expected)) {
    it(`${slug} maps to ${asin} with image token ${token}`, () => {
      expect(verifiedImages[slug].asin).toBe(asin);
      expect(verifiedImages[slug].imageUrl).toContain(token);
      const sel = selections.find((s) => s.slug === slug)!;
      const row = { id: sel.id, title: "T", image_url: "https://old.example/x.jpg", affiliate_link: `https://www.amazon.com/dp/${asin}?tag=moderntech02-20`, is_active: true };
      const out = withVerifiedImage(slug, row);
      expect(out.image_url).toBe(verifiedImages[slug].imageUrl);
      expect(isEligible(out)).toBe(true);
      const href = new URL(withAffiliateTag(out.affiliate_link));
      expect(href.searchParams.get("tag")).toBe("moderntechs04-20");
      expect(asinOf(href.toString())).toBe(asin);
    });
  }
  it("does not override when the catalog link points at a different ASIN", () => {
    const row = { id: "x", title: "T", image_url: "keep.jpg", affiliate_link: "https://www.amazon.com/dp/B000000000?tag=moderntechs04-20", is_active: true };
    expect(withVerifiedImage("jbl-flip-6", row).image_url).toBe("keep.jpg");
  });
});
