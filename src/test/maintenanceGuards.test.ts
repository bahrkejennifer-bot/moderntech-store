import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === "test" || f === "__snapshots__" ? [] : walk(p);
    return /\.(tsx?|xml)$/.test(f) && !/\.test\.tsx?$/.test(f) ? [p] : [];
  });
const files = [...walk("src"), ...walk("supabase/functions"), "public/sitemap.xml"];
const read = (p: string) => readFileSync(p, "utf8");

describe("storefront maintenance guards", () => {
  it("uses the selected Silent Night piano recording for Christmas playback, not lofi or Jingle Bells", () => {
    const asset = JSON.parse(read("src/assets/silent-night-piano.mp3.asset.json"));
    expect(asset.original_filename).toBe("silent-night-piano.mp3");
    expect(asset.content_type).toBe("audio/mpeg");
    for (const file of ["src/pages/Index.tsx", "src/components/ChristmasMusic.tsx"]) {
      expect(read(file)).toContain('import christmasSong from "@/assets/silent-night-piano.mp3.asset.json"');
      expect(read(file)).toContain("src={christmasSong.url}");
      expect(read(file)).not.toContain('src="/audio/lofi-music.mp3"');
      expect(read(file)).not.toContain("jingle-bells-calm.mp3.asset.json");
    }
  });

  it("allows only moderntech02-20 as the default or generated Amazon tag", () => {
    const bad = files.flatMap((f) => {
      const source = read(f);
      // Closed IDs are allowed only inside the catalog legacy rewrite list.
      const active = f === "src/lib/curatedSelections.ts"
        ? source.replace(/(?:export )?const legacyTags = \[[^\]]*\];/, "") : source;
      const closed = ["moderntech" + "s04-20", "moderntech" + "s0c-20"];
      const violations = closed.filter((tag) => active.includes(tag)).map((tag) => `${f}: active ${tag}`);
      const tags = [...active.matchAll(/amazon\.com[^"'`\s]*[?&]tag=([A-Za-z0-9-]+)/g),
        ...active.matchAll(/(?:AFFILIATE_TAG|affiliateTag)\s*=\s*["']([^"']+)["']/g),
        ...active.matchAll(/searchParams\.set\(["']tag["'],\s*["']([^"']+)["']/g)];
      return [...violations, ...tags.filter((m) => m[1] !== "moderntech02-20").map((m) => `${f}: ${m[1]}`)];
    });
    expect(bad).toEqual([]);
  });

  it("retains the restored newsletter publication in the public landing pages", () => {
    for (const f of ["src/pages/Blog.tsx", "src/pages/Index.tsx"]) {
      expect(read(f)).toContain("The Signal · Weekly Newsletter");
    }
  });

  it("keeps /the-signal canonical and redirects /the-edit to it", () => {
    const app = read("src/App.tsx");
    expect(app).toMatch(/path="\/the-signal" element=\{<Blog \/>\}/);
    expect(app).toMatch(/path="\/the-edit" element=\{<LegacySignalRedirect \/>\}/);
  });

  it("does not show the stale Spring deals card on the newsletter landing", () => {
    const blog = read("src/pages/Blog.tsx");
    expect(blog).not.toMatch(/Best Spring Tech Deals 2026/);
    expect(blog).not.toMatch(/can.t be beat/);
  });

  it("gates holiday images on the holiday switch and keeps the original hero as fallback", () => {
    const index = read("src/pages/Index.tsx");
    expect(index).toMatch(/isHolidayActive/);
    expect(index).toMatch(/holiday-hero\.jpg/);
    expect(index).toMatch(/iphone-gift\.jpg/);
    expect(index).toMatch(/src=\{heroImg\}/);
  });

  it("keeps the email signup heading exactly 'Get The Signal by email'", () => {
    for (const f of ["src/pages/Index.tsx", "src/pages/Blog.tsx"]) {
      expect(read(f)).toMatch(/>Get The Signal by email</);
      expect(read(f)).not.toMatch(/Christmas Amazon finds/);
    }
  });

  it("keeps the homepage holiday note on the Amazon event page with a verified-offers qualifier", () => {
    const index = read("src/pages/Index.tsx");
    const start = index.indexOf('id="selections"');
    const note = index.slice(start, index.indexOf("affiliateDisclosure", start));
    expect(note).toContain("https://www.aboutamazon.com/news/retail/amazon-black-friday-cyber-monday-deals-2026");
    expect(note).toContain("Official Amazon event details");
    expect(note).toMatch(/Amazon's Black Friday Week and Cyber Monday event runs November 19 to 30\./);
    expect(note).toMatch(/Offers on these exact featured products are shown only when verified\./);
    expect(note).not.toContain("amazon-black-friday-faq");
    expect(note).not.toMatch(/Black Friday is November 27/);
    for (const banned of [/best deal/i, /save \d/i, /% off/i, /discount/i, /limited/i, /only \d+ left/i, /expires/i, /countdown/i, /\$\d/]) {
      expect(note).not.toMatch(banned);
    }
  });

  it("uses neutral official-source shopping guidance", () => {
    const edition = read("src/lib/signalWeeklyEdition.ts");
    expect(edition).not.toMatch(/amazon-prime-big-deals-day-2026-when-october-6-7/);
    expect(edition).not.toMatch(/has not announced|unannounced retailer sale window/);
    expect(edition).toContain("https://www.aboutamazon.com/news/retail/amazon-black-friday-cyber-monday-deals-2026");
  });
});
