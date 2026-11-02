/**
 * Where each free download lives, so it can be handed over on screen right
 * after the email is saved. Mirrors the destinations the confirmation and
 * welcome emails already use.
 */
export const FREEBIE_DESTINATIONS: Record<string, { label: string; href: string }> = {
  "amazon-associate-guide": { label: "Amazon Associate Guide", href: "/amazon-associate-guide" },
  "free-affiliate-quick-start": { label: "Amazon Affiliate Quick-Start Guide", href: "/amazon-associate-guide" },
  "parents-smart-home-safety-checklist": { label: "Smart Home Safety Checklist", href: "/free-smart-home-checklist" },
  "smart-ring-buyers-guide": { label: "Smart Ring Buyer's Guide", href: "/free-smart-ring-guide" },
  "creator-gear-starter-kit": { label: "Creator Gear Starter Kit", href: "/free-creator-gear-guide" },
  "dorm-room-tech-setup": { label: "Dorm Room Tech Setup", href: "/free-dorm-room-guide" },
  "screen-free-kids-tech-toys": { label: "Screen-Free Kids Tech Guide", href: "/free-screen-free-kids-guide" },
  "90-day-amazon-associate-roadmap": { label: "90-Day Amazon Associate Roadmap", href: "/free-roadmap" },
  "tech-essentials-2026": { label: "2026 Tech Essentials Guide", href: "/digital-products" },
  "faceless-reels-guide": {
    label: "The Faceless Reels Guide",
    href: "https://www.dropbox.com/scl/fi/64k64w8tv4gx9xcbn3ycn/Copy-of-THE-FACELESS-REELS-GUIDE.pdf?rlkey=lqa72bclfozyyf6x8forzovrk&st=2jk0hgjd&dl=1",
  },
};

const KEY = "mt_unlocked_freebies";

export function markFreebieUnlocked(slug: string) {
  try {
    const set = new Set<string>(JSON.parse(localStorage.getItem(KEY) || "[]"));
    set.add(slug);
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch { /* storage unavailable */ }
}

export function isFreebieUnlocked(slug: string): boolean {
  try {
    return (JSON.parse(localStorage.getItem(KEY) || "[]") as string[]).includes(slug);
  } catch {
    return false;
  }
}
