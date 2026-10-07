// The Signal's current weekly edition. Max 4 picks, chosen from the curated homepage catalog
// (the products social posts link to via /#product-<slug>). No separate campaign schedule is
// configured, so this explicit list IS the record of the week's selection. Each pick's photo was
// checked by eye against its exact model; a pick without a matching photo is dropped, never substituted.
export const weeklyEdition = {
  weekOf: "2026-10-05",
  title: "Desk upgrades worth giving (or keeping)",
  intro: [
    "Holiday lists are starting early this year, and the gifts that get used are the ones that fix a small daily annoyance. This week's Signal keeps it to four picks for the desk and the weekend.",
    "Prices on Amazon change often, so we don't list them here. Check the current price and delivery date on Amazon before you buy.",
  ],
  pickSlugs: ["rocketbook-core", "soundcore-space-one", "benq-screenbar-halo-2", "jbl-flip-6"],
} as const;

export const MAX_WEEKLY_PICKS = 4;
