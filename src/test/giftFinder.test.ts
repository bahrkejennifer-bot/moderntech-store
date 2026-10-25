import { describe, it, expect } from "vitest";
import { matchGifts, findRecipient, findBudget } from "../components/home/GiftFinder";
import type { FinderPick } from "../components/home/GiftFinder";

const rocketbook: FinderPick = {
  slug: "rocketbook-core",
  title: "Rocketbook Core",
  imageUrl: null,
  audience: "note-takers",
  benefit: "Reusable notebook",
  limitation: "Requires special pen",
};

describe("gift finder matching", () => {
  it("matches the Note-taking chip on its own", () => {
    const results = matchGifts("note-taking", [rocketbook]);
    expect(results).toHaveLength(1);
    expect(results[0].pick.slug).toBe("rocketbook-core");
    expect(results[0].matched).toContain("note-taking");
  });

  it("matches the owner's exact query followed by the Note-taking chip", () => {
    const query = "gift for mother $360 or less note-taking";
    expect(findRecipient(query)?.word).toBe("mother");
    expect(findBudget(query)).toBe(360);
    const results = matchGifts(query, [rocketbook]);
    expect(results).toHaveLength(1);
    expect(results[0].pick.slug).toBe("rocketbook-core");
  });

  it("does not match unrelated text", () => {
    expect(matchGifts("gardening", [rocketbook])).toHaveLength(0);
  });
});
