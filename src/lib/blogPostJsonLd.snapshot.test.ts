/**
 * Golden snapshot tests for the podcast BlogPost JSON-LD output.
 *
 * These lock in the *exact* serialised JSON-LD that ships to Googlebot, so any
 * accidental drift (renamed field, changed slug pattern, mutated breadcrumb
 * order, mixed @id ref turning into a full inline node, etc.) is caught in CI.
 *
 * Snapshots are inline (`toMatchInlineSnapshot`) so reviewers see the diff
 * directly in the PR — no hidden `__snapshots__` files to chase.
 *
 * To intentionally update after a deliberate change:
 *     bunx vitest run -u src/lib/blogPostJsonLd.snapshot.test.ts
 */

import { describe, it, expect } from "vitest";
import {
  buildPodcastBlogPostingGraph,
  PODCAST_POST_FAQ_HTML,
  PODCAST_SLUG,
} from "./__snapshots__/blogPostJsonLd.fixtures";
import { extractJsonLdFromHtml, validateJsonLdStrings } from "./jsonLdValidation";

const stableSerialise = (value: unknown) => JSON.stringify(value, null, 2);

describe("BlogPost JSON-LD — golden snapshots", () => {
  it("matches the full @graph snapshot for the podcast post", () => {
    const graph = buildPodcastBlogPostingGraph(PODCAST_SLUG);
    expect(stableSerialise(graph)).toMatchInlineSnapshot(`
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
              "url": "https://moderntech.store/logo.png"
            },
            "sameAs": [
              "https://www.pinterest.com/moderntechstore"
            ]
          },
          {
            "@type": "WebPage",
            "@id": "https://moderntech.store/blog/how-to-start-your-first-podcast#webpage",
            "url": "https://moderntech.store/blog/how-to-start-your-first-podcast",
            "name": "How to Start Your First Podcast",
            "description": "Start your first podcast with 3 pieces of creator gear.",
            "inLanguage": "en-US"
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
            "headline": "How to Start Your First Podcast in 2026",
            "description": "Start your first podcast with 3 pieces of creator gear.",
            "image": [
              "https://moderntech.store/podcast-hero.jpg"
            ],
            "datePublished": "2026-04-29T00:00:00Z",
            "dateModified": "2026-04-29T00:00:00Z",
            "articleSection": "Creator Gear",
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
            "url": "https://moderntech.store/blog/how-to-start-your-first-podcast",
            "inLanguage": "en-US",
            "keywords": "Creator Gear, podcast, start, your, first",
            "wordCount": 850,
            "articleBody": "Everyone wants to start a podcast..."
          }
        ]
      }"
    `);
  });

  it("matches the snapshot for mixed @id references inside BlogPosting", () => {
    const blogPosting = buildPodcastBlogPostingGraph(PODCAST_SLUG)["@graph"][3] as Record<
      string,
      unknown
    >;
    // Pluck only the fields that exercise mixed @id reference shapes.
    const mixedRefs = {
      author: blogPosting.author,
      publisher: blogPosting.publisher,
      mainEntityOfPage: blogPosting.mainEntityOfPage,
    };
    expect(stableSerialise(mixedRefs)).toMatchInlineSnapshot(`
      "{
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
        }
      }"
    `);
  });

  it("matches the snapshot for the BreadcrumbList (order + URLs locked)", () => {
    const breadcrumb = buildPodcastBlogPostingGraph(PODCAST_SLUG)["@graph"][2];
    expect(stableSerialise(breadcrumb)).toMatchInlineSnapshot(`
      "{
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
      }"
    `);
  });

  it("matches the snapshot for the embedded FAQPage extracted from content_html", () => {
    const blocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    expect(blocks).toHaveLength(1);
    const faq = JSON.parse(blocks[0]);
    expect(stableSerialise(faq)).toMatchInlineSnapshot(`
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

  it("the snapshotted output passes schema validation with zero errors", () => {
    // Belt-and-suspenders: the golden output must also be semantically valid.
    // Catches the case where someone updates the snapshot to something Google
    // would reject.
    const graph = buildPodcastBlogPostingGraph(PODCAST_SLUG);
    const faqBlocks = extractJsonLdFromHtml(PODCAST_POST_FAQ_HTML);
    const result = validateJsonLdStrings([JSON.stringify(graph), ...faqBlocks]);
    const errors = result.checks.filter((c) => c.severity === "error");
    expect(errors).toEqual([]);
    expect(result.typesFound.has("BlogPosting")).toBe(true);
    expect(result.typesFound.has("BreadcrumbList")).toBe(true);
    expect(result.typesFound.has("FAQPage")).toBe(true);
    expect(result.typesFound.has("Organization")).toBe(true);
    expect(result.typesFound.has("WebPage")).toBe(true);
  });
});
