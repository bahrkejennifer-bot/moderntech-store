import techOfTheMonthJune2026 from "@/assets/heroes/tech-of-the-month-june-2026.jpg.asset.json";

export interface TechOfTheMonthEntry {
  slug: string;                // URL slug, e.g. "june-2026"
  monthLabel: string;          // "June 2026"
  publishedDate: string;       // ISO date for OG article:published_time
  title: string;               // <h1> + <title>
  tagline: string;             // short editorial hook
  metaDescription: string;     // <=160 chars
  ogTitle: string;
  ogDescription: string;
  image: { url: string; width: number; height: number; alt: string };
  intro: string;               // body paragraph
  picks: Array<{ name: string; category: string; why: string }>;
}

const BASE = "https://moderntech.store";

export const techOfTheMonthEntries: TechOfTheMonthEntry[] = [
  {
    slug: "june-2026",
    monthLabel: "June 2026",
    publishedDate: "2026-06-01",
    title: "Tech of the Month: June 2026 — Quiet Luxury, Loud Tech",
    tagline: "Quiet Luxury, Loud Tech.",
    metaDescription:
      "The Modern Tech June 2026 Edit: a titanium smart ring, cinema-grade wireless earbuds, and the marble-desk essentials keeping the studio calm and the output sharp.",
    ogTitle: "Tech of the Month · June 2026 | Modern Tech",
    ogDescription:
      "Modern Tech's June 2026 obsession list — titanium smart ring, cinema-grade earbuds, and the marble workspace behind the studio.",
    image: {
      url: techOfTheMonthJune2026.url,
      width: 1600,
      height: 1008,
      alt: "June 2026 Tech of the Month flat lay — titanium smart ring, wireless earbuds, silver laptop, and peonies on marble",
    },
    intro:
      "June is the month the studio finally exhales. This edit is quiet on the surface and loud where it counts — sleep tracking on the finger, cinema in the ear, and a workspace that photographs as well as it performs.",
    picks: [
      {
        name: "Titanium Smart Ring",
        category: "Health & Wellness",
        why: "Jewelry-first biometrics — sleep, HRV, and recovery without another screen on the wrist.",
      },
      {
        name: "Cinema-Grade Wireless Earbuds",
        category: "Audio",
        why: "Adaptive noise-cancellation that finally holds up on planes, patios, and podcast edits.",
      },
      {
        name: "Marble-Top Studio Desk",
        category: "Office",
        why: "A calm surface makes the laptop look better, the coffee taste better, and the Zoom look intentional.",
      },
    ],
  },
];

export function getTechOfTheMonth(slug: string): TechOfTheMonthEntry | undefined {
  return techOfTheMonthEntries.find((e) => e.slug === slug);
}

export function getCurrentTechOfTheMonth(): TechOfTheMonthEntry {
  return techOfTheMonthEntries[0];
}

export function canonicalTechOfTheMonthUrl(slug: string): string {
  return `${BASE}/tech-of-the-month/${slug}`;
}
