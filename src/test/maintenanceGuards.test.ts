import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { weeklyEdition } from "@/lib/signalWeeklyEdition";

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
      expect(read(f)).toContain("The Edit · Weekly Newsletter");
      expect(read(f)).not.toContain("The Signal");
    }
  });

  it("keeps /the-edit canonical and redirects /the-signal to it", () => {
    const app = read("src/App.tsx");
    expect(app).toMatch(/path="\/the-edit" element=\{<Blog \/>\}/);
    expect(app).toMatch(/path="\/the-signal" element=\{<LegacySignalRedirect \/>\}/);
    expect(app).toMatch(/path="\/the-edit\/:slug" element=\{<BlogPost \/>\}/);
    expect(app).toMatch(/path="\/the-signal\/:slug" element=\{<BlogPostRedirect \/>\}/);
    expect(app).toContain('to={`/the-edit${search}${hash}`}');
    expect(app).toContain('to={`/the-edit/${slug || ""}${search}${hash}`}');
    expect(read("src/pages/Blog.tsx")).toContain('<link rel="canonical" href="https://moderntech.store/the-edit" />');
    expect(app).toContain('path="/podcast" element={<TheSignal />}');
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

  it("keeps the approved Christmas newsletter signup heading", () => {
    for (const f of ["src/pages/Index.tsx", "src/pages/Blog.tsx"]) {
      expect(read(f)).toMatch(/>Get our weekly Christmas Amazon finds</);
    }
    expect(read("src/components/ModernTechEditSignup.tsx")).toMatch(/Get our weekly Christmas Amazon finds\s*<\/h3>/);
  });

  it("keeps the supplied live homepage holiday note and FAQ", () => {
    const index = read("src/pages/Index.tsx");
    const start = index.indexOf('id="selections"');
    const note = index.slice(start, index.indexOf("affiliateDisclosure", start));
    expect(note).toContain("https://www.aboutamazon.com/news/retail/when-is-amazon-black-friday-faq");
    expect(note).toContain("Black Friday is November 27. Cyber Monday is November 30.");
    expect(note).toContain('>Amazon</a>.');
    expect(note).not.toContain("amazon-black-friday-cyber-monday-deals-2026");
    expect(note).not.toContain("Official Amazon event details");
    for (const banned of [/best deal/i, /save \d/i, /% off/i, /discount/i, /limited/i, /only \d+ left/i, /expires/i, /countdown/i, /\$\d/]) {
      expect(note).not.toMatch(banned);
    }
  });

  it("retains the four supplied live edition notes in order", () => {
    expect(weeklyEdition.intro).toEqual([
      "This week's Modern Tech rhythm moved from wellness to hands-on family learning and a quieter Sunday reset. The three picks below solve practical problems without turning the page into a catalog.",
      "Prime Big Deal Days ran October 6–7 and is over, so this edition contains no event pricing or urgency. Check the current price and delivery date on Amazon before buying.",
    ]);
    expect(weeklyEdition.newsNotes).toEqual([
      { label: "Family STEM", text: "Scratch's free Animate a Character activity was this week's hands-on idea. No purchase is required.", url: "https://www.scratchfoundation.org/learn/learning-library/animate-character" },
      { label: "Smart-home news", text: "Ring announced the Pan-Tilt Indoor Cam 2K with movement tracking and a physical privacy shutter. We do not yet have a verified Amazon affiliate URL for this exact model, so it is not included in the product cards.", url: "https://ring.com/products/pan-tilt-indoor-cam-2k" },
      { label: "Shopping-event status", text: "Cyber Monday is November 30. Amazon has not announced specific offers yet.", url: "https://www.aboutamazon.com/news/retail/when-is-amazon-cyber-monday-faq" },
      { label: "Holiday calendar", text: "Veterans Day is Wednesday, November 11, and Thanksgiving is Thursday, November 26. We are planning gift coverage without claiming an unannounced retailer sale window.", url: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/" },
    ]);
    expect(read("src/lib/signalWeeklyEdition.ts")).not.toMatch(/amazon-prime-big-deals-day-2026-when-october-6-7|amazon-black-friday-cyber-monday-deals-2026/);
  });
});
