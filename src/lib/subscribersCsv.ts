export interface SubscriberRow {
  email: string;
  name: string | null;
  signup_date: string;
  source_page: string | null;
  freebie: string | null;
  consent: boolean;
}

const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  // Stop spreadsheet apps from running a value as a formula.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function subscribersToCsv(rows: SubscriberRow[]): string {
  const header = ["email", "name", "signup_date", "source_page", "freebie", "weekly_consent"];
  const lines = rows.map((r) =>
    [r.email, r.name, r.signup_date, r.source_page, r.freebie, r.consent ? "yes" : "no"].map(cell).join(","),
  );
  return [header.join(","), ...lines].join("\r\n");
}
