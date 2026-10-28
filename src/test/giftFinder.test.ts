import { describe, it, expect } from "vitest";
import { matchGifts, findRecipient, findBudget, amazonGiftSearchUrl } from "../components/home/GiftFinder";
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

  it("matches an existing item by its name", () => {
    expect(matchGifts("Rocketbook", [rocketbook]).map(({ pick }) => pick.slug)).toEqual(["rocketbook-core"]);
  });

  it("handles hyphenated notebook interests", () => {
    expect(matchGifts("reusable note-book", [rocketbook])).toHaveLength(1);
  });

  it("offers an unmatched item search on Amazon with the current affiliate tag", () => {
    const query = "coffee maker";
    expect(matchGifts(query, [rocketbook])).toHaveLength(0);
    const url = new URL(amazonGiftSearchUrl(query));
    expect(url.origin).toBe("https://www.amazon.com");
    expect(url.pathname).toBe("/s");
    expect(url.searchParams.get("k")).toBe(query);
    expect(url.searchParams.get("tag")).toBe("moderntechs04-20");
  });

  it("preserves the recipient and budget in the Amazon search", () => {
    const query = "gift for mother $360 or less";
    expect(new URL(amazonGiftSearchUrl(query)).searchParams.get("k")).toBe(query);
  });

  it("encodes input without allowing it to change the destination or tag", () => {
    const url = new URL(amazonGiftSearchUrl("camera &tag=other https://example.com"));
    expect(url.hostname).toBe("www.amazon.com");
    expect(url.searchParams.getAll("tag")).toEqual(["moderntechs04-20"]);
    expect(url.searchParams.get("k")).toBe("camera &tag=other https://example.com");
  });
});
