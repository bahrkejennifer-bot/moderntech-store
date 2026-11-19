import { describe, expect, it } from "vitest";
import { weeklyEdition, MAX_WEEKLY_PICKS } from "@/lib/signalWeeklyEdition";

describe("weekly edition selection safeguards", () => {
  it("keeps the October 11 archive and its original three selections", () => {
    expect(weeklyEdition.weekOf).toBe("2026-10-11");
    expect(weeklyEdition.pickSlugs).toEqual(["renpho-elis-1", "snap-circuits-jr-sc-100", "anker-solix-c300-dc"]);
    expect(MAX_WEEKLY_PICKS).toBe(4);
    expect(weeklyEdition.pickSlugs.length).toBeLessThanOrEqual(MAX_WEEKLY_PICKS);
  });
});
