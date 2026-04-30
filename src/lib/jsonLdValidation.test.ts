import { describe, it, expect } from "vitest";
import {
  validateJsonLdStrings,
  validateNode,
  extractJsonLdFromHtml,
  type Check,
} from "./jsonLdValidation";

// ── Fixture: the FAQPage JSON-LD embedded inside the podcast post's content_html ──
// Mirrors what's stored in blog_posts for slug="how-to-start-your-first-podcast".
const PODCAST_POST_FAQ_HTML = `
<h2 id="faq">FAQ</h2>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What gear do I need to start my first podcast?","acceptedAnswer":{"@type":"Answer","text":"USB mic, noise-cancelling headphones, ring light."}},
    {"@type":"Question","name":"Do I need an XLR microphone to start a podcast?","acceptedAnswer":{"@type":"Answer","text":"No. A USB mic delivers broadcast quality."}},
    {"@type":"Question","name":"How much does it cost to start a podcast in 2026?","acceptedAnswer":{"@type":"Answer","text":"Roughly $400–$600 in gear plus a free hosting tier."}}
  ]
}
</script>
`;

// ── Fixture: the @graph BlogPost.tsx constructs at runtime for the dynamic post ──
const buildBlogPostingGraph = (slug: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://moderntech.store/#organization",
      name: "Modern Tech LLC",
      url: "https://moderntech.store",
      logo: { "@type": "ImageObject", url: "https://moderntech.store/logo.png" },
      sameAs: ["https://www.pinterest.com/moderntechstore"],
    },
    {
      "@type": "WebPage",
      "@id": `https://moderntech.store/blog/${slug}#webpage`,
      url: `https://moderntech.store/blog/${slug}`,
      name: "How to Start Your First Podcast",
      description: "Start your first podcast with 3 pieces of creator gear.",
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `https://moderntech.store/blog/${slug}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://moderntech.store/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://moderntech.store/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: "How to Start Your First Podcast",
          item: `https://moderntech.store/blog/${slug}`,
        },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": `https://moderntech.store/blog/${slug}#blogposting`,
      headline: "How to Start Your First Podcast in 2026",
      description: "Start your first podcast with 3 pieces of creator gear.",
      image: ["https://moderntech.store/podcast-hero.jpg"],
      datePublished: "2026-04-29T00:00:00Z",
      dateModified: "2026-04-29T00:00:00Z",
      articleSection: "Creator Gear",
      author: { "@type": "Organization", name: "Modern Tech LLC", url: "https://moderntech.store" },
      publisher: { "@id": "https://moderntech.store/#organization" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://moderntech.store/blog/${slug}#webpage` },
      url: `https://moderntech.store/blog/${slug}`,
      inLanguage: "en-US",
      keywords: "Creator Gear, podcast, start, your, first",
      wordCount: 850,
      articleBody: "Everyone wants to start a podcast...",
    },
  ],
});

const errors = (checks: Check[]) => checks.filter((c) => c.severity === "error");

describe("JSON-LD validation — Podcast blog post", () => {
  it("extracts FAQPage from embedded content_html", () => {
    const blocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toContain("FAQPage");
  });

  it("validates the FAQPage block with no errors", () => {
    const blocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    const result = validateJsonLdStrings(blocks);
    expect(errors(result.checks)).toEqual([]);
    expect(result.typesFound.has("FAQPage")).toBe(true);
  });

  it("validates the @graph (BlogPosting + BreadcrumbList + WebPage + Organization) with no errors", () => {
    const graph = buildBlogPostingGraph("how-to-start-your-first-podcast");
    const result = validateJsonLdStrings([JSON.stringify(graph)]);
    expect(errors(result.checks)).toEqual([]);
    expect(result.typesFound.has("BlogPosting")).toBe(true);
    expect(result.typesFound.has("BreadcrumbList")).toBe(true);
    expect(result.typesFound.has("Organization")).toBe(true);
  });

  it("end-to-end: validates BOTH the page @graph AND the in-content FAQPage together", () => {
    const graph = buildBlogPostingGraph("how-to-start-your-first-podcast");
    const faqBlocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    const result = validateJsonLdStrings([JSON.stringify(graph), ...faqBlocks]);
    expect(errors(result.checks)).toEqual([]);
    // All three rich-result schema types must be present
    expect(result.typesFound.has("BlogPosting")).toBe(true);
    expect(result.typesFound.has("BreadcrumbList")).toBe(true);
    expect(result.typesFound.has("FAQPage")).toBe(true);
  });
});

describe("JSON-LD validation — negative cases (regression guards)", () => {
  it("flags BlogPosting missing required fields", () => {
    const checks: Check[] = [];
    validateNode({ "@type": "BlogPosting", headline: "Only headline" }, checks);
    const required = errors(checks).map((c) => c.message);
    expect(required.some((m) => m.includes("datePublished"))).toBe(true);
    expect(required.some((m) => m.includes("author"))).toBe(true);
    expect(required.some((m) => m.includes("image"))).toBe(true);
  });

  it("flags BreadcrumbList items missing position/name/item", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", name: "Home" }], // missing item + position
      },
      checks,
    );
    expect(errors(checks).length).toBeGreaterThan(0);
  });

  it("flags FAQPage with empty mainEntity", () => {
    const checks: Check[] = [];
    validateNode({ "@type": "FAQPage", mainEntity: [] }, checks);
    expect(errors(checks).some((c) => c.message.includes("empty mainEntity"))).toBe(true);
  });

  it("flags FAQPage Question missing acceptedAnswer.text", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "" } },
        ],
      },
      checks,
    );
    expect(errors(checks).some((c) => c.message.includes("acceptedAnswer.text"))).toBe(true);
  });

  it("warns when BlogPosting headline exceeds 110 chars", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "x".repeat(120),
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
      },
      checks,
    );
    expect(checks.some((c) => c.severity === "warning" && c.message.includes("110"))).toBe(true);
  });
});

describe("JSON-LD validation — @id-only reference skipping at depth", () => {
  it("skips a top-level @id-only publisher reference (no Organization required-field errors)", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "Post",
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
        publisher: { "@type": "Organization", "@id": "https://moderntech.store/#organization" },
      },
      checks,
    );
    expect(errors(checks)).toEqual([]);
  });

  it("skips @id-only references nested inside arrays (e.g. mentions/sameAs-as-objects)", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "Post",
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
        mentions: [
          { "@type": "Organization", "@id": "https://moderntech.store/#organization" },
          { "@type": "WebPage", "@id": "https://moderntech.store/blog#webpage" },
        ],
      },
      checks,
    );
    expect(errors(checks)).toEqual([]);
  });

  it("skips deeply-nested @id-only references inside plain objects", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "Post",
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
        // Arbitrary nested wrapper containing a deep @id-only ref
        isPartOf: {
          collection: {
            primary: { "@type": "Organization", "@id": "https://moderntech.store/#organization" },
          },
        },
      },
      checks,
    );
    expect(errors(checks)).toEqual([]);
  });

  it("still validates a nested object that has @id PLUS real fields (not a pure ref)", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "Post",
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
        // Has @id AND additional fields → NOT a pure ref → inline validation runs.
        // BlogPosting's headline-length warning fires regardless of inline mode,
        // so we use it as a probe to confirm recursion actually entered this node.
        about: {
          "@type": "BlogPosting",
          "@id": "https://moderntech.store/blog/other#blogposting",
          headline: "y".repeat(120),
        },
      },
      checks,
    );
    expect(checks.some((c) => c.severity === "warning" && c.message.includes("110"))).toBe(true);
  });

  it("skips @id-only refs mixed with real-typed nodes inside the same array", () => {
    const checks: Check[] = [];
    validateNode(
      {
        "@type": "BlogPosting",
        headline: "Post",
        datePublished: "2026-01-01",
        author: { "@type": "Organization", name: "MT" },
        image: ["https://example.com/x.jpg"],
        mentions: [
          // Pure @id ref hiding inside the array — must be skipped
          { "@id": "https://moderntech.store/#organization" },
          // Real typed node alongside it — should validate inline without errors
          { "@type": "Organization", name: "Modern Tech LLC", url: "https://moderntech.store" },
        ],
      },
      checks,
    );
    expect(errors(checks)).toEqual([]);
  });
});
