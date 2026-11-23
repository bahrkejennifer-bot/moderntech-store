import { describe, expect, it } from "vitest";
import { kidsTabletEpisodeProducts } from "@/lib/kidsTabletEpisode";

describe("owner-approved tablet episode destinations", () => {
  const asins = ["B0DZ75TN5F", "B0GQJPWLDG", "B0FLB24WJC", "B0DLJ34V7G"];
  it("contains exactly four picks", () => {
    expect(kidsTabletEpisodeProducts).toHaveLength(4);
  });
  asins.forEach((asin, index) => {
    it(`preserves the supplied ${asin} destination and active tag`, () => {
      expect(kidsTabletEpisodeProducts[index]?.url).toBe(`https://www.amazon.com/dp/${asin}?tag=moderntech02-20`);
    });
  });
});