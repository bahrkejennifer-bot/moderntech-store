import { describe, expect, it } from "vitest";
import { AFFILIATE_TAG, legacyTags, isEligible, withAffiliateTag, type CatalogProduct } from "../lib/curatedSelections";

const product = (affiliate_link: string, overrides: Partial<CatalogProduct> = {}): CatalogProduct => ({
  id: "test-id",
  title: "Test product",
  image_url: "https://example.com/image.jpg",
  affiliate_link,
  is_active: true,
  ...overrides,
});

describe("storefront affiliate tag", () => {
  it("rewrites the tag to the required ID while preserving the ASIN and path", () => {
    const link = "https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20";
    const url = new URL(withAffiliateTag(link));
    expect(url.searchParams.get("tag")).toBe("moderntech02-20");
    expect(url.pathname).toBe("/dp/B0D62PMB3R");
    expect(AFFILIATE_TAG).toBe("moderntech02-20");
  });

  it("keeps other parameters intact when rewriting the tag", () => {
    const link = "https://www.amazon.com/dp/B0DXFFY4YV/ref=title?tag=moderntech02-20&th=1";
    const url = new URL(withAffiliateTag(link));
    expect(url.searchParams.get("th")).toBe("1");
    expect(url.searchParams.get("tag")).toBe(AFFILIATE_TAG);
  });

  it("accepts catalog rows tagged with any known Modern Tech ID", () => {
    for (const tag of legacyTags) {
      const stored = `https://www.amazon.com/dp/B0D62PMB3R?tag=${tag}`;
      expect(isEligible(product(stored))).toBe(true);
      const rendered = new URL(withAffiliateTag(stored));
      expect(rendered.searchParams.getAll("tag")).toEqual(["moderntech02-20"]);
      expect(rendered.pathname).toBe("/dp/B0D62PMB3R");
    }
  });

  it("keeps a moderntech02-20 catalog row eligible and renders it with the required tag", () => {
    const stored = "https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20";
    expect(isEligible(product(stored))).toBe(true);
    const rendered = new URL(withAffiliateTag(stored));
    expect(rendered.searchParams.get("tag")).toBe("moderntech02-20");
    expect(rendered.searchParams.get("tag")).toBe(AFFILIATE_TAG);
    expect(rendered.pathname).toBe("/dp/B0D62PMB3R");
    expect(rendered.toString()).toContain("tag=moderntech02-20");
  });

  it("rejects links without a known Modern Tech tag, a non-product path, or an inactive row", () => {
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/s?k=other&tag=moderntech02-20"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=someoneelse-20"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20", { is_active: false }))).toBe(false);
  });
});
