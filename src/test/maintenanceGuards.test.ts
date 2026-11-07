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

  it("uses only the moderntechs04-20 Amazon tag", () => {
    const bad = files.flatMap((f) =>
      [...read(f).matchAll(/amazon\.com[^"'`\s]*[?&]tag=([A-Za-z0-9-]+)/g)].map((m) => m[1]).filter((t) => t !== "moderntechs04-20").map((t) => `${f}: ${t}`));
    expect(bad).toEqual([]);
  });

  it("brands the newsletter as The Edit, never The Signal", () => {
    const bad = files.filter((f) => /\bThe Signal\b|Weekly Blog/.test(read(f)));
    expect(bad).toEqual([]);
  });

  it("keeps /the-edit canonical and redirects /the-signal to it", () => {
    const app = read("src/App.tsx");
    expect(app).toMatch(/path="\/the-edit" element=\{<Blog \/>\}/);
    expect(app).toMatch(/path="\/the-signal" element=\{<LegacySignalRedirect \/>\}/);
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

  it("keeps the email signup heading exactly 'Get The Edit by email'", () => {
    for (const f of ["src/pages/Index.tsx", "src/pages/Blog.tsx"]) {
      expect(read(f)).toMatch(/>Get The Edit by email</);
      expect(read(f)).not.toMatch(/Christmas Amazon finds/);
    }
  });

  it("points the shopping-event note at Amazon's current Cyber Monday FAQ, not the expired October event", () => {
    const edition = read("src/lib/signalWeeklyEdition.ts");
    expect(edition).not.toMatch(/amazon-prime-big-deals-day-2026-when-october-6-7/);
    expect(edition).toMatch(/Cyber Monday is November 30\. Amazon has not announced specific offers yet\./);
    expect(edition).toMatch(/https:\/\/www\.aboutamazon\.com\/news\/retail\/when-is-amazon-cyber-monday-faq/);
  });
});
