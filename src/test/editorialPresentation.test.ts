import { describe, expect, it } from "vitest";
import { compactArchivePreview, editorialText } from "@/lib/editorialPresentation";
import { weeklyEdition, MAX_WEEKLY_PICKS } from "@/lib/signalWeeklyEdition";

describe("reversible editorial presentation", () => {
  it("removes exact Amazon prices from historical presentation", () => {
    expect(editorialText("Phone stand $9.99")).toBe("Phone stand current Amazon pricing");
  });
  it("removes exact star ratings", () => {
    expect(editorialText("Phone stand 4.5 stars")).toBe("Phone stand");
  });
  it("removes exact review counts", () => {
    expect(editorialText("Phone stand 71,812 reviews")).toBe("Phone stand");
  });
  it("keeps the October 11 archive and its original three selections", () => {
    expect(weeklyEdition.weekOf).toBe("2026-10-11");
    expect(weeklyEdition.pickSlugs).toEqual(["renpho-elis-1", "snap-circuits-jr-sc-100", "anker-solix-c300-dc"]);
    expect(MAX_WEEKLY_PICKS).toBe(4);
    expect(weeklyEdition.pickSlugs.length).toBeLessThanOrEqual(MAX_WEEKLY_PICKS);
  });
  it("bounds a long archive preview without selecting new products", () => {
    expect(compactArchivePreview("Useful tech. ".repeat(100)).length).toBe(420);
  });
});