// The Signal's dated archived edition. Max 4 picks, chosen from the curated homepage catalog
// (the products social posts link to via /#product-<slug>). No separate campaign schedule is
// configured, so this explicit list IS the record of the week's selection. Each pick's photo was
// checked by eye against its exact model; a pick without a matching photo is dropped, never substituted.
type NewsNote = { label: string; text: string; url: string };

export const weeklyEdition = {
  weekOf: "2026-10-11",
  title: "Three useful picks for wellness, family STEM, and portable power",
  intro: [
    "This October 11 edition moved from wellness to hands-on family learning and a quieter Sunday reset. The three archived picks below solve practical problems without turning the page into a catalog.",
    "Prime Big Deal Days ran October 6–7 and is over, so this edition contains no event pricing or urgency. Check the current price and delivery date on Amazon before buying.",
  ],
  newsNotes: [
    { label: "Family STEM", text: "Scratch's free Animate a Character activity was this edition's hands-on idea. No purchase is required.", url: "https://www.scratchfoundation.org/learn/learning-library/animate-character" },
    { label: "Smart-home news", text: "Ring announced the Pan-Tilt Indoor Cam 2K with movement tracking and a physical privacy shutter. We do not yet have a verified Amazon affiliate URL for this exact model, so it is not included in the product cards.", url: "https://ring.com/products/pan-tilt-indoor-cam-2k" },
    { label: "Official Amazon event details", text: "Explore thoughtful tech gifts and check Amazon's official event guidance. Offers on these exact featured products are shown only when verified.", url: "https://www.aboutamazon.com/news/retail/amazon-black-friday-cyber-monday-deals-2026" },
  ] satisfies readonly NewsNote[],
  pickSlugs: ["renpho-elis-1", "snap-circuits-jr-sc-100", "anker-solix-c300-dc"],
} as const;

export const MAX_WEEKLY_PICKS = 4;
