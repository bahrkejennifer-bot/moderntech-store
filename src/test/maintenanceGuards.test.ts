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
  it("uses only the moderntechs04-20 Amazon tag", () => {
    const bad = files.flatMap((f) =>
      [...read(f).matchAll(/amazon\.com[^"'`\s]*[?&]tag=([A-Za-z0-9-]+)/g)].map((m) => m[1]).filter((t) => t !== "moderntechs04-20").map((t) => `${f}: ${t}`));
    expect(bad).toEqual([]);
  });

  it("brands the newsletter as The Signal, never The Edit", () => {
    const bad = files.filter((f) => /\bThe Edit\b(?!orial)|Weekly Blog/.test(read(f)));
    expect(bad).toEqual([]);
  });

  it("keeps /the-signal canonical and redirects /the-edit to it", () => {
    const app = read("src/App.tsx");
    expect(app).toMatch(/path="\/the-signal" element=\{<Blog \/>\}/);
    expect(app).toMatch(/path="\/the-edit" element=\{<LegacyEditRedirect \/>\}/);
  });

  it("does not show the stale Spring deals card on the newsletter landing", () => {
    const blog = read("src/pages/Blog.tsx");
    expect(blog).not.toMatch(/Best Spring Tech Deals 2026/);
    expect(blog).not.toMatch(/can.t be beat/);
  });

  it("restores the original editorial hero without holiday image swaps", () => {
    const index = read("src/pages/Index.tsx");
    expect(index).not.toMatch(/holiday-hero\.jpg|iphone-gift\.jpg/);
    expect(index).toMatch(/src=\{heroImg\}/);
  });
});
