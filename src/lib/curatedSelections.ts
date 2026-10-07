export interface CatalogProduct {
  id: string;
  title: string;
  image_url: string | null;
  affiliate_link: string;
  is_active: boolean;
}

// Explicit, reversible merchandising; all names, photos and affiliate destinations are read from the catalog.
export const selections = [
  { id: "b68d4132-35fd-48a6-afe1-a23c27d97ef9", slug: "rocketbook-core", audience: "For the note-taker who still likes a pen", benefit: "Write by hand, scan your notes to the cloud, then wipe the pages clean for reuse.", limitation: "Pages are reusable, not a permanent paper archive." },
  { id: "12f82e99-c9b9-4a08-ba6a-af18ec1abca6", slug: "soundcore-space-one", audience: "For focus in shared spaces", benefit: "Adaptive noise cancellation and a listed 40-hour battery make it a practical workday companion.", limitation: "These are battery-powered headphones, so they still need charging." },
  { id: "c54218bd-8361-40d4-ac72-f4027d508a5b", slug: "benq-screenbar-halo-2", audience: "For a monitor-based desk setup", benefit: "A monitor light with glare-free desk lighting and a soft rear halo.", limitation: "Designed for a monitor, not for lighting an entire room." },
  { id: "f4828b84-e0c2-4b70-869f-a3bed7fb37c8", slug: "renpho-elis-1", audience: "For tracking wellness trends at home", benefit: "Tracks 13 body-composition metrics in one scale.", limitation: "A home scale is a trend tool, not a medical assessment." },
  { id: "961410f4-1bbe-4dec-8148-9741e236cdf4", slug: "snap-circuits-jr-sc-100", audience: "For hands-on circuit discovery", benefit: "28 snap-together pieces can make more than 100 circuits.", limitation: "A physical kit, not a screen-based course." },
  { id: "450e46a0-1080-4f7d-89ab-f97f3cce0ff5", slug: "jbl-flip-6", audience: "For music beyond the desk", benefit: "A waterproof portable speaker with a listed 12-hour battery.", limitation: "Portable battery power means it needs recharging." },
  { id: "e0aa4d9a-7a15-4c10-9dcb-b48999bdbd48", slug: "anker-solix-c300-dc", audience: "For portable power away from an outlet", benefit: "A 288Wh portable power station with solar-ready charging.", limitation: "The DC model is for compatible DC-powered devices; check ports before buying." },
] as const;

export type Selection = (typeof selections)[number];

export const isEligible = (product: CatalogProduct) => {
  try {
    const url = new URL(product.affiliate_link);
    return product.is_active && Boolean(product.image_url) && /(^|\.)amazon\.com$/.test(url.hostname) &&
      /\/dp\/[A-Z0-9]{10}(?:\/|$)/i.test(url.pathname) && url.searchParams.get("tag") === "moderntechs04-20";
  } catch { return false; }
};
