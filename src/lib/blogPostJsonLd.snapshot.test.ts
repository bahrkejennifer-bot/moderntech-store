/**
 * Golden snapshot tests for every BlogPost JSON-LD template variant.
 *
 * Snapshots lock in the exact serialised JSON-LD shipped to Googlebot for:
 *  - Static template posts (e.g. smart-ring-guide-valentines-2026)
 *  - Dynamic AI-generated posts (e.g. how-to-start-your-first-podcast)
 *  - Dynamic posts with mixed @id refs but no embedded FAQ
 *  - The combined page output (site @graph + in-content FAQPage)
 *
 * Inline snapshots so reviewers see drift directly in the PR diff.
 *
 * To intentionally accept changes:
 *     bunx vitest run -u src/lib/blogPostJsonLd.snapshot.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  buildPodcastDynamicGraph,
  buildSmartRingStaticGraph,
  buildCreatorGearDynamicGraph,
  PODCAST_POST_FAQ_HTML,
  PODCAST_SLUG,
} from "./__snapshots__/blogPostJsonLd.fixtures";
import { extractJsonLdFromHtml, validateJsonLdStrings } from "./jsonLdValidation";

const stableSerialise = (value: unknown) => JSON.stringify(value, null, 2);
const errorsOf = (graph: unknown) =>
  validateJsonLdStrings([JSON.stringify(graph)]).checks.filter((c) => c.severity === "error");

describe("BlogPost JSON-LD — golden snapshots: dynamic podcast post", () => {
  it("matches the full @graph snapshot", () => {
    expect(stableSerialise(buildPodcastDynamicGraph(PODCAST_SLUG))).toMatchInlineSnapshot();
  });

  it("matches the embedded FAQPage extracted from content_html", () => {
    const blocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    expect(blocks).toHaveLength(1);
    expect(stableSerialise(JSON.parse(blocks[0]))).toMatchInlineSnapshot();
  });

  it("end-to-end output (site graph + FAQ) validates with zero errors", () => {
    const graph = buildPodcastDynamicGraph(PODCAST_SLUG);
    const faq = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    const result = validateJsonLdStrings([JSON.stringify(graph), ...faq]);
    expect(result.checks.filter((c) => c.severity === "error")).toEqual([]);
    for (const t of ["BlogPosting", "BreadcrumbList", "FAQPage", "Organization", "WebPage", "WebSite"]) {
      expect(result.typesFound.has(t)).toBe(true);
    }
  });
});

describe("BlogPost JSON-LD — golden snapshots: static template (smart-ring guide)", () => {
  it("matches the full @graph snapshot", () => {
    expect(stableSerialise(buildSmartRingStaticGraph())).toMatchInlineSnapshot();
  });

  it("uses image as a string (not array) — static-template invariant", () => {
    const graph = buildSmartRingStaticGraph();
    const blogPosting = (graph["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "BlogPosting",
    )!;
    expect(typeof blogPosting.image).toBe("string");
  });

  it("validates with zero errors", () => {
    expect(errorsOf(buildSmartRingStaticGraph())).toEqual([]);
  });
});

describe("BlogPost JSON-LD — golden snapshots: dynamic template (no embedded FAQ)", () => {
  it("matches the full @graph snapshot", () => {
    expect(stableSerialise(buildCreatorGearDynamicGraph())).toMatchInlineSnapshot();
  });

  it("uses image as an array — dynamic-template invariant", () => {
    const graph = buildCreatorGearDynamicGraph();
    const blogPosting = (graph["@graph"] as Record<string, unknown>[]).find(
      (n) => n["@type"] === "BlogPosting",
    )!;
    expect(Array.isArray(blogPosting.image)).toBe(true);
  });

  it("validates with zero errors", () => {
    expect(errorsOf(buildCreatorGearDynamicGraph())).toEqual([]);
  });
});
