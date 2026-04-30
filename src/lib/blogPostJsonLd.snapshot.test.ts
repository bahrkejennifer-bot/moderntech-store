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
  buildBlogIndexGraph,
  buildSmartRingFreeGuideArticle,
  buildAmazonAssociateFreeGuideArticle,
  PODCAST_POST_FAQ_HTML,
  PODCAST_SLUG,
} from "./__snapshots__/blogPostJsonLd.fixtures";
import { extractJsonLdFromHtml, validateJsonLdStrings } from "./jsonLdValidation";

const stableSerialise = (value: unknown) => JSON.stringify(value, null, 2);
const errorsOf = (graph: unknown) =>
  validateJsonLdStrings([JSON.stringify(graph)]).checks.filter((c) => c.severity === "error");

describe("BlogPost JSON-LD — golden snapshots: dynamic podcast post", () => {
  it("matches the full @graph snapshot", () => {
    expect(stableSerialise(buildPodcastDynamicGraph(PODCAST_SLUG))).toMatchInlineSnapshot(`
      "{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://moderntech.store/#organization",
            "name": "Modern Tech LLC",
            "url": "https://moderntech.store",
            "logo": {
              "@type": "ImageObject",
              "url": "https://moderntech.store/lovable-uploads/modern-tech-logo.png"
            },
            "sameAs": [
              "https://www.pinterest.com/moderntechstore",
              "https://www.youtube.com/@moderntechllc",
              "https://www.instagram.com/moderntechllc"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://moderntech.store/#website",
            "url": "https://moderntech.store",
            "name": "Modern Tech LLC",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "inLanguage": "en-US",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://moderntech.store/blog?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "WebPage",
            "@id": "https://moderntech.store/blog/how-to-start-your-first-podcast#webpage",
            "url": "https://moderntech.store/blog/how-to-start-your-first-podcast",
            "name": "How to Start Your First Podcast",
            "description": "Start your first podcast with 3 pieces of creator gear.",
            "isPartOf": {
              "@id": "https://moderntech.store/#website"
            },
            "inLanguage": "en-US",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://moderntech.store/blog/how-to-start-your-first-podcast#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://moderntech.store/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://moderntech.store/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "How to Start Your First Podcast",
                "item": "https://moderntech.store/blog/how-to-start-your-first-podcast"
              }
            ]
          },
          {
            "@type": "BlogPosting",
            "@id": "https://moderntech.store/blog/how-to-start-your-first-podcast#blogposting",
            "headline": "How to Start Your First Podcast",
            "description": "Start your first podcast with 3 pieces of creator gear.",
            "image": [
              "https://moderntech.store/podcast-hero.jpg"
            ],
            "datePublished": "2026-04-29T00:00:00Z",
            "dateModified": "2026-04-29T00:00:00Z",
            "articleSection": "Creator Gear",
            "articleBody": "Everyone wants to start a podcast...",
            "wordCount": 850,
            "keywords": "Creator Gear, Modern Tech LLC, podcast, start, your, first",
            "inLanguage": "en-US",
            "author": {
              "@type": "Organization",
              "name": "Modern Tech LLC",
              "url": "https://moderntech.store"
            },
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://moderntech.store/blog/how-to-start-your-first-podcast#webpage"
            },
            "url": "https://moderntech.store/blog/how-to-start-your-first-podcast"
          }
        ]
      }"
    `);
  });

  it("matches the embedded FAQPage extracted from content_html", () => {
    const blocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    expect(blocks).toHaveLength(1);
    expect(stableSerialise(JSON.parse(blocks[0]))).toMatchInlineSnapshot(`
      "{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What gear do I need to start my first podcast?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "USB mic, noise-cancelling headphones, ring light."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need an XLR microphone to start a podcast?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. A USB mic delivers broadcast quality."
            }
          },
          {
            "@type": "Question",
            "name": "How much does it cost to start a podcast in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Roughly $400–$600 in gear plus a free hosting tier."
            }
          }
        ]
      }"
    `);
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
    expect(stableSerialise(buildSmartRingStaticGraph())).toMatchInlineSnapshot(`
      "{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://moderntech.store/#organization",
            "name": "Modern Tech LLC",
            "url": "https://moderntech.store",
            "logo": {
              "@type": "ImageObject",
              "url": "https://moderntech.store/lovable-uploads/modern-tech-logo.png"
            },
            "sameAs": [
              "https://www.pinterest.com/moderntechstore",
              "https://www.youtube.com/@moderntechllc",
              "https://www.instagram.com/moderntechllc"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://moderntech.store/#website",
            "url": "https://moderntech.store",
            "name": "Modern Tech LLC",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "inLanguage": "en-US",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://moderntech.store/blog?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "WebPage",
            "@id": "https://moderntech.store/blog/smart-ring-guide-valentines-2026#webpage",
            "url": "https://moderntech.store/blog/smart-ring-guide-valentines-2026",
            "name": "The Ultimate Smart Ring Guide for 2026",
            "description": "Smart rings have quietly become the most intimate wearable technology on the market. Unlike bulky smartwatches or intrusive fitness bands, a smart ring sits discreetly on yo…",
            "isPartOf": {
              "@id": "https://moderntech.store/#website"
            },
            "inLanguage": "en-US",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://moderntech.store/blog/smart-ring-guide-valentines-2026#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://moderntech.store/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://moderntech.store/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "The Ultimate Smart Ring Guide for 2026",
                "item": "https://moderntech.store/blog/smart-ring-guide-valentines-2026"
              }
            ]
          },
          {
            "@type": "BlogPosting",
            "@id": "https://moderntech.store/blog/smart-ring-guide-valentines-2026#blogposting",
            "headline": "The Ultimate Smart Ring Guide for 2026",
            "description": "Smart rings have quietly become the most intimate wearable technology on the market. Unlike bulky smartwatches or intrusive fitness bands, a smart ring sits discreetly on yo…",
            "image": "https://moderntech.store/assets/smart-ring-hero.jpg",
            "datePublished": "2026-02-02T00:00:00.000Z",
            "dateModified": "2026-02-02T00:00:00.000Z",
            "articleSection": "Health & Wellness",
            "author": {
              "@type": "Organization",
              "name": "Modern Tech LLC",
              "url": "https://moderntech.store"
            },
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "mainEntityOfPage": {
              "@id": "https://moderntech.store/blog/smart-ring-guide-valentines-2026#webpage"
            },
            "url": "https://moderntech.store/blog/smart-ring-guide-valentines-2026"
          }
        ]
      }"
    `);
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
    expect(stableSerialise(buildCreatorGearDynamicGraph())).toMatchInlineSnapshot(`
      "{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://moderntech.store/#organization",
            "name": "Modern Tech LLC",
            "url": "https://moderntech.store",
            "logo": {
              "@type": "ImageObject",
              "url": "https://moderntech.store/lovable-uploads/modern-tech-logo.png"
            },
            "sameAs": [
              "https://www.pinterest.com/moderntechstore",
              "https://www.youtube.com/@moderntechllc",
              "https://www.instagram.com/moderntechllc"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://moderntech.store/#website",
            "url": "https://moderntech.store",
            "name": "Modern Tech LLC",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "inLanguage": "en-US",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://moderntech.store/blog?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "WebPage",
            "@id": "https://moderntech.store/blog/top-creator-gear-2026#webpage",
            "url": "https://moderntech.store/blog/top-creator-gear-2026",
            "name": "Top Creator Gear of 2026",
            "description": "The 5 pieces of creator gear we actually use every day in 2026.",
            "isPartOf": {
              "@id": "https://moderntech.store/#website"
            },
            "inLanguage": "en-US",
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://moderntech.store/blog/top-creator-gear-2026#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://moderntech.store/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://moderntech.store/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Top Creator Gear of 2026",
                "item": "https://moderntech.store/blog/top-creator-gear-2026"
              }
            ]
          },
          {
            "@type": "BlogPosting",
            "@id": "https://moderntech.store/blog/top-creator-gear-2026#blogposting",
            "headline": "Top Creator Gear of 2026",
            "description": "The 5 pieces of creator gear we actually use every day in 2026.",
            "image": [
              "https://moderntech.store/creator-gear-hero.jpg"
            ],
            "datePublished": "2026-03-15T00:00:00Z",
            "dateModified": "2026-03-20T00:00:00Z",
            "articleSection": "Creator Gear",
            "articleBody": "Five tools, zero filler.",
            "wordCount": 612,
            "keywords": "Creator Gear, Modern Tech LLC, creator, gear, 2026",
            "inLanguage": "en-US",
            "author": {
              "@type": "Organization",
              "name": "Modern Tech LLC",
              "url": "https://moderntech.store"
            },
            "publisher": {
              "@id": "https://moderntech.store/#organization"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://moderntech.store/blog/top-creator-gear-2026#webpage"
            },
            "url": "https://moderntech.store/blog/top-creator-gear-2026"
          }
        ]
      }"
    `);
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
