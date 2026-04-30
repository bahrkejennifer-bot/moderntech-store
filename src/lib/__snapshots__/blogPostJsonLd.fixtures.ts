/**
 * Golden fixtures for the podcast BlogPost JSON-LD output.
 *
 * These mirror exactly what <BlogPost /> serialises into the document <head>
 * for the dynamic post slug `how-to-start-your-first-podcast`, plus the
 * FAQPage block embedded inside its `content_html`.
 *
 * If BlogPost.tsx changes the @graph shape (adds a node, renames a field,
 * changes URL structure, etc.), the snapshot tests in
 * `blogPostJsonLd.snapshot.test.ts` will fail and force a deliberate review.
 *
 * To intentionally accept a change:  bunx vitest run -u
 */

export const PODCAST_SLUG = "how-to-start-your-first-podcast";

export const buildPodcastBlogPostingGraph = (slug: string = PODCAST_SLUG) => ({
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
      // Mixed @id references — author is inline, publisher/mainEntityOfPage are pure refs.
      author: { "@type": "Organization", name: "Modern Tech LLC", url: "https://moderntech.store" },
      publisher: { "@id": "https://moderntech.store/#organization" },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://moderntech.store/blog/${slug}#webpage`,
      },
      url: `https://moderntech.store/blog/${slug}`,
      inLanguage: "en-US",
      keywords: "Creator Gear, podcast, start, your, first",
      wordCount: 850,
      articleBody: "Everyone wants to start a podcast...",
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
