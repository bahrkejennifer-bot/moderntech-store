import { describe, expect, it } from "vitest";
import { november18CollectionProducts, november18Products, november18Sections } from "../lib/november18Edition";

describe("November 18 owner-supplied edition", () => {
  const expected = [
    ["B0H1HZZD2G", "9.99", 4.5, 193], ["B0C7GKYR2K", "15.99", 4.6, 1668], ["B0CMJTSVRW", "24.99", 4.3, 9245],
    ["B09NN1MJQS", "16.99", 4.2, 26426], ["B0B1RWJ4QJ", "38.00", 4.5, 9064], ["B0CVX1TSJR", "24.99", 4.4, 1765], ["B0DB86TWRJ", "39.99", 4.4, 21667],
    ["B0B8D4JZN4", "26.99", 4.7, 1757], ["B0CR1P4XJY", "8.99", 4.5, 1477], ["B0FFSSWTB6", "29.99", 4.5, 1470], ["B07XTKJXPT", "29.99", 4.6, 4000],
    ["B0BR3M8XHK", "13.99", 4.6, 33132], ["B0DP42G526", "8.99", 4.8, 3045], ["B0CG1PTWCM", "5.99", 4.6, 608],
    ["B08MKT9B7X", "49.99", 4.5, 7800], ["B0FL22QSGP", "28.99", 4.7, 1700], ["B00FA2RLX2", "28.99", 4.7, 41400], ["B0DFMTNQ9X", "32.99", 4.2, 106], ["B07FDXDB3W", "39.99", 4.2, 48000],
  ];
  it.each(expected)("preserves supplied figures and destination for %s", (asin, price, rating, reviews) => {
    const product = november18Products.find(p => p.asin === asin);
    expect(product).toMatchObject({ asin, price, rating, reviews, affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=moderntech02-20` });
    expect(product?.imageUrl).toContain("/__l5e/assets-v1/");
  });
  it("groups all 19 products into five supplied themes", () => {
    expect(november18Products).toHaveLength(19);
    expect(november18Sections.map(section => november18Products.filter(p => p.group === section.id).length)).toEqual([3, 4, 4, 3, 5]);
  });
  it("places matching products in the existing collection destinations", () => {
    expect(november18CollectionProducts("/office-essentials").map(p => p.asin)).toEqual(["B0H1HZZD2G", "B0C7GKYR2K", "B0CMJTSVRW"]);
    expect(november18CollectionProducts("/health-wellness-tech")).toHaveLength(4);
    expect(november18CollectionProducts("/kids-stem")).toHaveLength(4);
    expect(november18CollectionProducts("/smart-home-security")).toHaveLength(8);
    expect(november18CollectionProducts("/digital-products")).toEqual([]);
  });
});
