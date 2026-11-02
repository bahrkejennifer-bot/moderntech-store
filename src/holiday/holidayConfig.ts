// Holiday mode switch. Features gated on isHolidayActive() turn off
// automatically after HOLIDAY_END; no code change needed.
export const HOLIDAY_ENABLED = true;
export const HOLIDAY_END = '2027-01-06';

export const isHolidayActive = (now: Date = new Date()): boolean => {
  if (!HOLIDAY_ENABLED) return false;
  const end = new Date(`${HOLIDAY_END}T23:59:59`);
  return now <= end;
};
