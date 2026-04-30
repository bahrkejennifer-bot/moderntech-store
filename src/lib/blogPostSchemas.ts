// Per-post SEO schema enhancements (FAQ + HowTo + Product) keyed by slug.
// Returned nodes are appended to StructuredData's @graph.

type SchemaNode = Record<string, unknown>;

const SITE = "https://moderntech.store";

export const getBlogPostExtraSchemas = (slug: string): SchemaNode[] => {
  const builder = SCHEMA_MAP[slug];
  return builder ? builder() : [];
};

/**
 * Build a stable Product @id for a blog post product. Mirrors the convention
 * used inside buildBlogProductSchemas so other nodes (HowTo, BlogPosting)
 * can reference the same Product node in the @graph.
 */
export const blogProductId = (
  slug: string,
  product: BlogProductInput,
  index: number,
): string => `${SITE}/blog/${slug}#product-${product.id || index + 1}`;

/**
 * Build cross-reference nodes that explicitly link the BlogPosting to each
 * Product in the @graph via `mentions` + `about`. Returns a partial node that
 * the caller can spread/merge onto its BlogPosting (or a standalone patch
 * node if you'd rather append it).
 */
export const buildBlogProductCrossRefs = (
  slug: string,
  products: BlogProductInput[] | null | undefined,
): { mentions: { "@id": string }[] } | null => {
  if (!Array.isArray(products) || products.length === 0) return null;
  const refs = products
    .filter((p) => p && (p.title || p.id) && p.affiliate_link)
    .map((p, idx) => ({ "@id": blogProductId(slug, p, idx) }));
  if (refs.length === 0) return null;
  return { mentions: refs };
};

export interface BlogProductInput {
  id?: string;
  title?: string;
  description?: string;
  image_url?: string;
  affiliate_link?: string;
  badge?: string;
  brand?: string;
  price?: string | number;
  currency?: string;
}

/**
 * Build Product + Offer JSON-LD nodes from a blog post's `products` JSONB array.
 * Each affiliate item becomes a schema.org/Product with an Offer pointing at
 * the affiliate URL so Google can attribute the recommendation.
 */
export const buildBlogProductSchemas = (
  slug: string,
  products: BlogProductInput[] | null | undefined,
): SchemaNode[] => {
  if (!Array.isArray(products) || products.length === 0) return [];
  const postUrl = `${SITE}/blog/${slug}`;

  return products
    .filter((p) => p && (p.title || p.id) && p.affiliate_link)
    .map((p, idx) => {
      const productId = `${postUrl}#product-${p.id || idx + 1}`;
      const node: SchemaNode = {
        "@type": "Product",
        "@id": productId,
        name: p.title,
        ...(p.description ? { description: p.description } : {}),
        ...(p.image_url ? { image: p.image_url } : {}),
        ...(p.brand
          ? { brand: { "@type": "Brand", name: p.brand } }
          : {}),
        ...(p.badge ? { award: p.badge } : {}),
        review: {
          "@type": "Review",
          author: {
            "@type": "Organization",
            name: "Modern Tech LLC",
            url: SITE,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          publisher: { "@id": `${SITE}/#organization` },
        },
        offers: {
          "@type": "Offer",
          url: p.affiliate_link,
          availability: "https://schema.org/InStock",
          priceCurrency: p.currency || "USD",
          ...(p.price !== undefined && p.price !== null && p.price !== ""
            ? { price: String(p.price).replace(/[^0-9.]/g, "") || undefined }
            : {}),
          seller: {
            "@type": "Organization",
            name: "Amazon",
          },
        },
        isRelatedTo: { "@id": `${postUrl}#blogposting` },
      };
      return node;
    });
};

const SCHEMA_MAP: Record<string, () => SchemaNode[]> = {
  "podcast-starter-kit-mic-headphones-light": () => {
    const url = `${SITE}/blog/podcast-starter-kit-mic-headphones-light`;
    return [
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: "How to Start a Podcast With Just 3 Pieces of Gear",
        description:
          "A 3-step Jen-Verified setup using a Blue Yeti USB mic, Sony WH-1000XM5 headphones, and a Neewer 18-inch ring light to launch a pro-sounding podcast on day one.",
        // Anchor the HowTo back to the parent BlogPosting and the products it uses
        isPartOf: { "@id": `${url}#blogposting` },
        about: [
          { "@id": `${url}#product-blue-yeti-usb` },
          { "@id": `${url}#product-sony-wh-1000xm5` },
          { "@id": `${url}#product-neewer-18-ring-light` },
        ],
        totalTime: "PT30M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "550",
        },
        supply: [
          { "@type": "HowToSupply", name: "USB-A or USB-C port on your computer" },
          { "@type": "HowToSupply", name: "Quiet room with soft surfaces" },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Blue Yeti USB Podcast Microphone",
            url: "https://www.amazon.com/dp/B00N1YPXW2?tag=moderntechs0c-20",
            // Cross-reference: same item exists as a Product node in the @graph
            item: { "@id": `${url}#product-blue-yeti` },
          },
          {
            "@type": "HowToTool",
            name: "Sony WH-1000XM5 Noise-Cancelling Headphones",
            url: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
            item: { "@id": `${url}#product-sony-wh1000xm5` },
          },
          {
            "@type": "HowToTool",
            name: "Neewer 18-inch Ring Light Kit",
            url: "https://www.amazon.com/dp/B0D451DGK8?tag=moderntechs0c-20",
            item: { "@id": `${url}#product-neewer-ring-light` },
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Plug in the Blue Yeti and set the cardioid pattern",
            text: "Connect the Blue Yeti via USB, switch the polar pattern dial to cardioid, and speak about 4–6 inches from the front grille for broadcast-grade vocals.",
            url: `${url}#step-mic`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Monitor with the Sony WH-1000XM5",
            text: "Plug the Sony WH-1000XM5 into your interface or computer to monitor in real time. Noise cancellation lets you edit and master from anywhere.",
            url: `${url}#step-headphones`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Light your face with the Neewer 18-inch ring light",
            text: "Place the Neewer 18-inch ring light directly in front of you at eye level for soft, even, on-camera lighting that instantly upgrades video podcasts and Reels.",
            url: `${url}#step-light`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#blogposting` },
        about: [
          { "@id": `${url}#product-blue-yeti` },
          { "@id": `${url}#product-sony-wh1000xm5` },
          { "@id": `${url}#product-neewer-ring-light` },
        ],
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I really only need 3 pieces of gear to start a podcast?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A USB mic (Blue Yeti), a great pair of monitoring headphones (Sony WH-1000XM5), and a ring light (Neewer 18-inch) cover audio capture, monitoring, and on-camera lighting — the only three things that actually move the needle for a beginner podcast.",
            },
          },
          {
            "@type": "Question",
            name: "Is the Blue Yeti good for beginner podcasters?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Blue Yeti is the most recommended USB podcast mic for beginners because it is plug-and-play, includes four polar patterns, and delivers studio-quality audio without an audio interface.",
            },
          },
          {
            "@type": "Question",
            name: "Why use the Sony WH-1000XM5 for podcast editing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Sony WH-1000XM5 offers industry-leading noise cancellation and a clean, broadcast-friendly frequency response, so you can hear pops, sibilance, and background noise while editing — anywhere.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a ring light if I only do audio podcasts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you ever plan to clip your podcast for YouTube, TikTok, Reels, or Shorts, yes. The Neewer 18-inch ring light makes you look professional on camera with zero studio setup.",
            },
          },
          {
            "@type": "Question",
            name: "How much does this 3-piece podcast starter kit cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The full Jen-Verified kit lands around $500–$600 total, depending on sales — far less than the typical $2,000+ podcast starter rabbit hole.",
            },
          },
        ],
      },
    ];
  },
};
