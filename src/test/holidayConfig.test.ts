import { describe, expect, it } from "vitest";
import { HOLIDAY_ENABLED, HOLIDAY_END, isHolidayActive } from "@/holiday/holidayConfig";

describe("holidayConfig", () => {
  it("is enabled with the configured end date", () => {
    expect(HOLIDAY_ENABLED).toBe(true);
    expect(HOLIDAY_END).toBe("2027-01-06");
  });

  it("is active before the end date", () => {
    expect(isHolidayActive(new Date("2026-11-02T12:00:00"))).toBe(true);
    expect(isHolidayActive(new Date("2027-01-06T23:59:59"))).toBe(true);
  });

  it("turns off automatically after the end date", () => {
    expect(isHolidayActive(new Date("2027-01-07T00:00:01"))).toBe(false);
  });
});
