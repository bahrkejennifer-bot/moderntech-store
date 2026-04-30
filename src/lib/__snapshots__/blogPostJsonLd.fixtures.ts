/**
 * Golden fixtures for every BlogPost JSON-LD template variant.
 *
 * `composeBlogPostGraph` mirrors `StructuredData.tsx` exactly — same ORG node,
 * same WebPage/BreadcrumbList shape, same `extraGraph` placement — so snapshots
 * here lock in the *real* serialised payload that ships to Googlebot.
 *
 * Templates covered:
 *  1. Podcast post (dynamic + embedded FAQPage)         — original case
 *  2. Static template (smart-ring-guide-valentines-2026) — `BlogPost.tsx` static branch
 *  3. Dynamic template w/ FAQ (how-to-start-your-first-podcast) — `BlogPost.tsx` dynamic branch
 *  4. Dynamic template w/o FAQ (top-creator-gear-2026)   — minimal dynamic shape
 *
 * Update intentionally with: bunx vitest run -u
 */

const SITE = "https://moderntech.store";
const LOGO = `${SITE}/lovable-uploads/modern-tech-logo.png`;

// Mirrors the ORG constant in src/components/StructuredData.tsx
const ORG_NODE = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Modern Tech LLC",
  url: SITE,
  logo: { "@type": "ImageObject", url: LOGO },
  sameAs: [
    "https://www.pinterest.com/moderntechstore",
    "https://www.youtube.com/@moderntechllc",
    "https://www.instagram.com/moderntechllc",
  ],
};

interface Breadcrumb {
  name: string;
  path: string;
}

/**
 * Compose the exact `@graph` `StructuredData` emits for a blog post.
 * `extraGraph` represents the page-specific BlogPosting node (and any siblings).
 */
export const composeBlogPostGraph = (opts: {
  path: string; // e.g. "/blog/some-slug"
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  extraGraph: Record<string, unknown>[];
  includeWebSite?: boolean;
}) => {
  const url = `${SITE}${opts.path}`;
  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": `${SITE}/#website` },
    inLanguage: "en-US",
    publisher: { "@id": `${SITE}/#organization` },
  };
  const webSite = opts.includeWebSite
    ? [
        {
          "@type": "WebSite",
          "@id": `${SITE}/#website`,
          url: SITE,
          name: "Modern Tech LLC",
          publisher: { "@id": `${SITE}/#organization` },
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ]
    : [];
  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: opts.breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.path.startsWith("http") ? b.path : `${SITE}${b.path}`,
    })),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [ORG_NODE, ...webSite, webPage, breadcrumbNode, ...opts.extraGraph],
  };
};

// ── Template 1 + 3: Dynamic post (podcast) ────────────────────────────────
export const PODCAST_SLUG = "how-to-start-your-first-podcast";

export const buildPodcastDynamicGraph = (slug: string = PODCAST_SLUG) =>
  composeBlogPostGraph({
    path: `/blog/${slug}`,
    title: "How to Start Your First Podcast",
    description: "Start your first podcast with 3 pieces of creator gear.",
    includeWebSite: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "How to Start Your First Podcast", path: `/blog/${slug}` },
    ],
    extraGraph: [
      {
        "@type": "BlogPosting",
        "@id": `${SITE}/blog/${slug}#blogposting`,
        headline: "How to Start Your First Podcast",
        description: "Start your first podcast with 3 pieces of creator gear.",
        image: ["https://moderntech.store/podcast-hero.jpg"],
        datePublished: "2026-04-29T00:00:00Z",
        dateModified: "2026-04-29T00:00:00Z",
        articleSection: "Creator Gear",
        articleBody: "Everyone wants to start a podcast...",
        wordCount: 850,
        keywords: "Creator Gear, Modern Tech LLC, podcast, start, your, first",
        inLanguage: "en-US",
        author: { "@type": "Organization", name: "Modern Tech LLC", url: SITE },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}#webpage` },
        url: `${SITE}/blog/${slug}`,
      },
    ],
  });

export const PODCAST_POST_FAQ_HTML = `
<h2 id="faq">FAQ</h2>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What gear do I need to start my first podcast?","acceptedAnswer":{"@type":"Answer","text":"USB mic, noise-cancelling headphones, ring light."}},
    {"@type":"Question","name":"Do I need an XLR microphone to start a podcast?","acceptedAnswer":{"@type":"Answer","text":"No. A USB mic delivers broadcast quality."}},
    {"@type":"Question","name":"How much does it cost to start a podcast in 2026?","acceptedAnswer":{"@type":"Answer","text":"Roughly $400\u2013$600 in gear plus a free hosting tier."}}
  ]
}
</script>
`;

// ── Template 2: Static post (smart-ring guide) ───────────────────────────
// Mirrors the static branch of BlogPost.tsx — note `image` is a STRING (not array)
// and dateModified === datePublished (single `post.date` field).
export const SMART_RING_SLUG = "smart-ring-guide-valentines-2026";

export const buildSmartRingStaticGraph = () => {
  const slug = SMART_RING_SLUG;
  const title = "The Ultimate Smart Ring Guide for 2026";
  const description =
    "Smart rings have quietly become the most intimate wearable technology on the market. Unlike bulky smartwatches or intrusive fitness bands, a smart ring sits discreetly on yo…";
  const isoDate = new Date("2026-02-02").toISOString();
  return composeBlogPostGraph({
    path: `/blog/${slug}`,
    title,
    description,
    includeWebSite: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: title, path: `/blog/${slug}` },
    ],
    extraGraph: [
      {
        "@type": "BlogPosting",
        "@id": `${SITE}/blog/${slug}#blogposting`,
        headline: title,
        description,
        image: `${SITE}/assets/smart-ring-hero.jpg`,
        datePublished: isoDate,
        dateModified: isoDate,
        articleSection: "Health & Wellness",
        author: { "@type": "Organization", name: "Modern Tech LLC", url: SITE },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@id": `${SITE}/blog/${slug}#webpage` },
        url: `${SITE}/blog/${slug}`,
      },
    ],
  });
};

// ── Template 4: Dynamic post WITHOUT embedded FAQ ────────────────────────
export const CREATOR_GEAR_SLUG = "top-creator-gear-2026";

export const buildCreatorGearDynamicGraph = () => {
  const slug = CREATOR_GEAR_SLUG;
  const title = "Top Creator Gear of 2026";
  const description = "The 5 pieces of creator gear we actually use every day in 2026.";
  return composeBlogPostGraph({
    path: `/blog/${slug}`,
    title,
    description,
    includeWebSite: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: title, path: `/blog/${slug}` },
    ],
    extraGraph: [
      {
        "@type": "BlogPosting",
        "@id": `${SITE}/blog/${slug}#blogposting`,
        headline: title,
        description,
        image: ["https://moderntech.store/creator-gear-hero.jpg"],
        datePublished: "2026-03-15T00:00:00Z",
        dateModified: "2026-03-20T00:00:00Z",
        articleSection: "Creator Gear",
        articleBody: "Five tools, zero filler.",
        wordCount: 612,
        keywords: "Creator Gear, Modern Tech LLC, creator, gear, 2026",
        inLanguage: "en-US",
        author: { "@type": "Organization", name: "Modern Tech LLC", url: SITE },
        publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}#webpage` },
        url: `${SITE}/blog/${slug}`,
      },
    ],
  });
};
