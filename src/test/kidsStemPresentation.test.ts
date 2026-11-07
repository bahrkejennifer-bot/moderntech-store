import { describe, expect, it } from "vitest";
import { prepareKidsStemProducts } from "@/lib/kidsStemPresentation";
import type { Product } from "@/hooks/useProductsByCategory";

const row = (id: string, category: string, image_url = "https://example.com/photo.jpg"): Product => ({
  id, category, image_url, title: id, description: null, price: null, rating: null, badge: null,
  display_order: 0, affiliate_link: "https://www.amazon.com/dp/B00008BFZH?tag=moderntech02-20",
});

describe("Kids & STEM presentation", () => {
  it("puts all children’s picks first, preserves within-category order and every product/link", () => {
    const input = [row("ai", "AI Tech"), row("college", "college"), row("snap", "kids-tech"), row("osmo", "kids-tech")];
    const output = prepareKidsStemProducts(input);
    expect(output.map(p => p.id)).toEqual(["snap", "osmo", "college", "ai"]);
    expect(output.map(p => p.affiliate_link)).toEqual(input.map(p => p.affiliate_link));
    expect(input.map(p => p.id)).toEqual(["ai", "college", "snap", "osmo"]);
  });
  it("uses the existing verified SC-100 photo without altering its title or affiliate URL", () => {
    const original = row("snap", "kids-tech");
    const [output] = prepareKidsStemProducts([original]);
    expect(output.image_url).toContain("71wjLjOAVBL");
    expect(output.title).toBe(original.title);
    expect(output.affiliate_link).toBe(original.affiliate_link);
  });
  it("omits known broken placeholders and tracking pixels without dropping products", () => {
    const input = [row("missing", "AI Tech", "https://example.com/placeholder.jpg"), row("pixel", "AI Tech", "https://fls-na.amazon.com/1/batch")]
      .map(p => ({ ...p, affiliate_link: "https://www.amazon.com/dp/B0FLYF8DDH?tag=moderntech02-20" }));
    const output = prepareKidsStemProducts(input);
    expect(output).toHaveLength(2);
    expect(output.map(p => p.image_url)).toEqual([null, null]);
    expect(output.map(p => p.affiliate_link)).toEqual(input.map(p => p.affiliate_link));
  });
});