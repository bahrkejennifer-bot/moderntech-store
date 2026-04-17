import { Helmet } from "react-helmet-async";
import { Star, Check, Sparkles, ArrowRight, Quote } from "lucide-react";

// Lux palette
const CREAM = "hsl(36 33% 96%)";
const BLUSH = "hsl(12 45% 88%)";
const BLUSH_DEEP = "hsl(8 40% 78%)";
const TAUPE = "hsl(28 18% 38%)";
const LIGHT_GRAY = "hsl(30 8% 92%)";
const CHARCOAL = "hsl(30 10% 6%)";
const CHARCOAL_SOFT = "hsl(30 10% 18%)";
const ROSE_GOLD = "hsl(14 65% 55%)";
const ROSE_GOLD_DEEP = "hsl(12 60% 42%)";

const BUNDLE_URL = "https://www.moderntech.store/creator-bundle";

const products = [
  {
    name: "Faceless Instagram Reels",
    tag: "FREE",
    price: "Free",
    desc: "The exact framework to grow a faceless Reels page that pulls in followers while you sleep — no camera, no face, no fuss.",
  },
  {
    name: "Canva Master Class",
    tag: "$29",
    price: "$29",
    desc: "Design polished, scroll-stopping graphics in Canva. Templates, brand kits, and the visual system that makes your content look expensive.",
  },
  {
    name: "Faceless YouTube Automation",
    tag: "$49",
    price: "$49",
    desc: "Build a hands-off YouTube channel using AI tools, voiceovers, and a content engine that runs without you on camera.",
  },
];

const loved = [
  "Stunning, easy-to-follow lessons that feel like a private masterclass",
  "Real templates, real workflows — nothing fluffy, nothing recycled",
  "Designed for people who want to look polished without burning out",
  "Faceless strategy that actually works in 2026 algorithms",
  "Lifetime access — revisit it whenever you launch something new",
];

const reviews = [
  {
    quote: "I bought the bundle on a whim and it paid for itself in a week. The Canva class alone is worth $200.",
    name: "Maya R.",
    role: "Faceless creator, 42k followers",
  },
  {
    quote: "Finally — a course set that doesn't talk down to you. It feels like Vogue meets a business school.",
    name: "Sienna L.",
    role: "Boutique owner",
  },
  {
    quote: "I'm a quiet introvert. The faceless YouTube blueprint changed everything. First $1k month after 6 weeks.",
    name: "Jordan K.",
    role: "Digital nomad",
  },
];

const FacelessCreatorBundle = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM, color: CHARCOAL }}>
      <Helmet>
        <title>The Faceless Creator Bundle — Reels, Canva & YouTube | Modern Tech</title>
        <meta
          name="description"
          content="Three master classes. One luxe price. Build a faceless content empire with Reels, Canva, and YouTube — all for $59."
        />
      </Helmet>

      {/* HERO */}
      <section className="px-5 sm:px-8 pt-16 pb-14 md:pt-24 md:pb-20 max-w-3xl mx-auto text-center">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
          style={{ color: ROSE_GOLD_DEEP }}
        >
          ◆ The Faceless Creator Edit ◆
        </p>
        <h1
          className="font-serif tracking-tight mb-6 text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
          style={{ fontWeight: 400, color: CHARCOAL }}
        >
          Build a content empire.<br />
          <em style={{ color: ROSE_GOLD_DEEP, fontStyle: "italic" }}>Never show your face.</em>
        </h1>
        <p
          className="font-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8"
          style={{ color: CHARCOAL_SOFT }}
        >
          Three master classes — Reels, Canva, and Faceless YouTube — bundled into one quiet, luxurious system for the creator who wants results without the spotlight.
        </p>

        <a
          href={BUNDLE_URL}
          className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase px-10 py-5 rounded-sm transition-all hover:scale-[1.02] hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${ROSE_GOLD} 0%, ${ROSE_GOLD_DEEP} 100%)`,
            color: CREAM,
            boxShadow: `0 12px 40px -12px ${ROSE_GOLD_DEEP}`,
          }}
        >
          Get the Bundle — $59 <Sparkles className="w-3.5 h-3.5" />
        </a>
        <p className="font-mono text-[10px] mt-5 tracking-[0.15em]" style={{ color: TAUPE }}>
          Save $19 • Lifetime access • Instant delivery
        </p>
      </section>

      {/* DIVIDER */}
      <div className="max-w-md mx-auto px-8">
        <div className="h-px" style={{ backgroundColor: BLUSH_DEEP, opacity: 0.5 }} />
      </div>

      {/* WHAT'S INSIDE */}
      <section className="px-5 sm:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-center mb-3"
          style={{ color: TAUPE }}
        >
          What's Inside
        </p>
        <h2
          className="font-serif text-3xl sm:text-4xl text-center mb-12 tracking-tight"
          style={{ fontWeight: 400, color: CHARCOAL }}
        >
          Three master classes.<br />
          <em style={{ fontStyle: "italic", color: ROSE_GOLD_DEEP }}>One quiet revolution.</em>
        </h2>

        <div className="space-y-6">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="p-7 sm:p-9 rounded-sm"
              style={{
                backgroundColor: i === 1 ? BLUSH : LIGHT_GRAY,
                border: `0.5px solid ${BLUSH_DEEP}`,
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: TAUPE }}
                >
                  No. 0{i + 1}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    backgroundColor: p.tag === "FREE" ? ROSE_GOLD_DEEP : CHARCOAL,
                    color: CREAM,
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <h3
                className="font-serif text-2xl sm:text-3xl mb-3 tracking-tight"
                style={{ fontWeight: 400, color: CHARCOAL }}
              >
                {p.name}
              </h3>
              <p
                className="font-light text-sm sm:text-base leading-relaxed"
                style={{ color: CHARCOAL_SOFT }}
              >
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT PEOPLE LOVED */}
      <section className="px-5 sm:px-8 py-16 md:py-20" style={{ backgroundColor: LIGHT_GRAY }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-center mb-3"
            style={{ color: ROSE_GOLD_DEEP }}
          >
            What People Loved
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl text-center mb-10 tracking-tight"
            style={{ fontWeight: 400, color: CHARCOAL }}
          >
            The little things that made it<br />
            <em style={{ fontStyle: "italic", color: ROSE_GOLD_DEEP }}>feel different.</em>
          </h2>
          <ul className="space-y-4 max-w-xl mx-auto">
            {loved.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-light text-sm sm:text-base leading-relaxed"
                style={{ color: CHARCOAL_SOFT }}
              >
                <Check
                  className="w-4 h-4 mt-1 shrink-0"
                  style={{ color: ROSE_GOLD_DEEP }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-5 sm:px-8 py-16 md:py-24 max-w-4xl mx-auto">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-center mb-3"
          style={{ color: TAUPE }}
        >
          The Reviews
        </p>
        <h2
          className="font-serif text-3xl sm:text-4xl text-center mb-12 tracking-tight"
          style={{ fontWeight: 400, color: CHARCOAL }}
        >
          From the women who<br />
          <em style={{ fontStyle: "italic", color: ROSE_GOLD_DEEP }}>built it quietly.</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="p-7 rounded-sm flex flex-col"
              style={{
                backgroundColor: CREAM,
                border: `0.5px solid ${BLUSH_DEEP}`,
              }}
            >
              <Quote
                className="w-5 h-5 mb-4"
                style={{ color: ROSE_GOLD, transform: "scaleX(-1)" }}
              />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-current"
                    style={{ color: ROSE_GOLD_DEEP }}
                  />
                ))}
              </div>
              <blockquote
                className="font-serif text-base leading-relaxed mb-5 flex-1"
                style={{ fontWeight: 400, color: CHARCOAL, fontStyle: "italic" }}
              >
                "{r.quote}"
              </blockquote>
              <figcaption>
                <p
                  className="font-mono text-[11px] tracking-[0.1em] uppercase"
                  style={{ color: CHARCOAL }}
                >
                  {r.name}
                </p>
                <p className="font-mono text-[10px] mt-1" style={{ color: TAUPE }}>
                  {r.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 sm:px-8 pb-20 md:pb-28">
        <div
          className="max-w-xl mx-auto p-8 sm:p-12 rounded-sm text-center"
          style={{
            background: `linear-gradient(160deg, ${CHARCOAL} 0%, hsl(30 8% 10%) 100%)`,
            color: CREAM,
          }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ color: ROSE_GOLD }}
          >
            ◆ The Bundle ◆
          </p>
          <h2
            className="font-serif text-4xl sm:text-5xl mb-6 tracking-tight leading-[1.05]"
            style={{ fontWeight: 400 }}
          >
            All three.<br />
            <em style={{ fontStyle: "italic", color: ROSE_GOLD }}>Yours forever.</em>
          </h2>

          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span
              className="font-mono text-base line-through"
              style={{ color: "hsl(36 20% 75%)" }}
            >
              $78
            </span>
            <span
              className="font-serif text-6xl sm:text-7xl"
              style={{ color: ROSE_GOLD, fontWeight: 400 }}
            >
              $59
            </span>
          </div>
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8"
            style={{ color: "hsl(36 30% 88%)" }}
          >
            Save $19 • One payment • Lifetime
          </p>

          <a
            href={BUNDLE_URL}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto font-mono text-[11px] tracking-[0.25em] uppercase px-12 py-5 rounded-sm transition-all hover:scale-[1.02] hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${ROSE_GOLD} 0%, ${ROSE_GOLD_DEEP} 100%)`,
              color: CREAM,
              boxShadow: `0 16px 50px -10px ${ROSE_GOLD_DEEP}`,
            }}
          >
            Get the Bundle <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <p
            className="font-mono text-[9px] tracking-[0.2em] uppercase mt-6"
            style={{ color: "hsl(36 25% 80%)" }}
          >
            30-day guarantee · Instant access
          </p>
        </div>

        <p
          className="text-center font-mono text-[10px] tracking-[0.2em] uppercase mt-12"
          style={{ color: TAUPE }}
        >
          Modern Tech LLC · The Art of Modern Tech
        </p>
      </section>
    </div>
  );
};

export default FacelessCreatorBundle;
