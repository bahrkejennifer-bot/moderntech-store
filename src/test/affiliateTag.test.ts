import { describe, expect, it } from "vitest";
import { AFFILIATE_TAG, isEligible, withAffiliateTag, type CatalogProduct } from "../lib/curatedSelections";

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
    expect(url.searchParams.get("tag")).toBe("moderntechs04-20");
    expect(url.pathname).toBe("/dp/B0D62PMB3R");
    expect(url.searchParams.get("tag")).not.toBe("moderntech02-20");
  });

  it("keeps other parameters intact when rewriting the tag", () => {
    const link = "https://www.amazon.com/dp/B0DXFFY4YV/ref=title?tag=moderntech02-20&th=1";
    const url = new URL(withAffiliateTag(link));
    expect(url.searchParams.get("th")).toBe("1");
    expect(url.searchParams.get("tag")).toBe(AFFILIATE_TAG);
  });

  it("accepts catalog rows tagged with either known Modern Tech ID", () => {
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=moderntechs04-20"))).toBe(true);
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20"))).toBe(true);
  });

  it("rejects links without a known Modern Tech tag, a non-product path, or an inactive row", () => {
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/s?k=other&tag=moderntechs04-20"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=someoneelse-20"))).toBe(false);
    expect(isEligible(product("https://www.amazon.com/dp/B0D62PMB3R?tag=moderntechs04-20", { is_active: false }))).toBe(false);
  });
});
