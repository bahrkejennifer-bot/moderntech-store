import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Sparkles, Loader2, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COVER_REELS = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-reels.jpg";
const COVER_CANVA = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-canva.jpg";
const COVER_YOUTUBE = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-youtube.jpg";

// Vogue-inspired palette — high contrast for readability
const CREAM = "hsl(36 30% 94%)";
const CREAM_SOFT = "hsl(36 25% 97%)";
const INK = "hsl(0 0% 4%)";          // near-black for headlines
const INK_BODY = "hsl(0 0% 12%)";    // body text — dark, readable
const INK_MUTED = "hsl(0 0% 28%)";   // captions/labels
const ROSE_GOLD = "hsl(14 55% 48%)";
const HAIRLINE = "hsl(0 0% 15% / 0.18)";

const bundleItems = [
  {
    cover: COVER_REELS,
    name: "Reels Master Class",
    value: "FREE",
    no: "No. 01",
    desc: "Learn to create attention-grabbing reels that stop the scroll — hooks, structure, and the rhythm of short-form that actually works.",
  },
  {
    cover: COVER_CANVA,
    name: "Canva Master Class",
    value: "$29",
    no: "No. 02",
    desc: "Design polished, branded graphics in Canva. Templates, brand kits, and the visual system that makes your content look expensive.",
  },
  {
    cover: COVER_YOUTUBE,
    name: "YouTube Master Class",
    value: "$49",
    no: "No. 03",
    desc: "Build a smarter YouTube channel with practical strategies — planning, video flow, and the growth fundamentals that compound.",
  },
];

const allFeatures = [
  "Hooks, content ideas, and structure tips for reels",
  "Practical strategies for better short-form videos",
  "Design tips for polished, professional content",
  "Branding guidance to build a consistent look",
  "Layout ideas for social media & digital products",
  "Planning tips to structure your YouTube strategy",
  "Video flow guidance for engaging, watchable videos",
  "Channel growth ideas to build your audience",
  "30-day launch plan",
];

const CreatorBundle = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "The Complete Creator Bundle",
          productSlug: "creator-bundle",
          amount: 5900,
          successUrl: "https://moderntech.store/creator-funnel/success?product=creator-bundle",
          cancelUrl: "https://moderntech.store/creator-bundle",
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM, color: INK_BODY }}>
      <Helmet>
        <title>The Complete Creator Bundle — Save $19 | Modern Tech</title>
        <meta name="description" content="Get all three master classes together for just $59. Learn reels, Canva, and YouTube in one practical bundle designed to help creators build better content." />
      </Helmet>
      <Navigation />

      {/* MAGAZINE MASTHEAD */}
      <section className="pt-24 pb-4 px-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: INK_MUTED }}>
          Modern Tech LLC · Tech Today, Trend Tomorrow
        </p>
        <div className="mx-auto mt-3 h-px w-24" style={{ backgroundColor: INK }} />
      </section>

      {/* HERO */}
      <section className="pt-6 pb-20 px-6 text-center max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: ROSE_GOLD }}>
          ◆ The Creator Issue ◆
        </p>
        <h1
          className="font-serif tracking-tight mb-7 text-5xl sm:text-6xl md:text-7xl leading-[0.95]"
          style={{ fontWeight: 400, color: INK }}
        >
          The Complete<br />
          <em style={{ fontStyle: "italic", color: ROSE_GOLD }}>Creator Bundle.</em>
        </h1>
        <p
          className="font-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: INK_BODY }}
        >
          Three master classes — Reels, Canva, and YouTube — bundled into one quiet,
          luxurious system for creators who want results without burning out.
        </p>
      </section>

      {/* WHAT'S INSIDE — magazine spread */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: INK_MUTED }}>
            What's Inside
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 400, color: INK }}>
            Three master classes.<br />
            <em style={{ fontStyle: "italic", color: ROSE_GOLD }}>One quiet revolution.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {bundleItems.map((item) => (
            <article key={item.name} className="text-center">
              {/* LARGE IMAGE — Vogue editorial */}
              <div
                className="mx-auto mb-6 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm"
                style={{
                  border: `0.5px solid ${HAIRLINE}`,
                  boxShadow: "0 20px 50px -20px hsl(0 0% 0% / 0.25)",
                }}
              >
                <img
                  src={item.cover}
                  alt={`${item.name} cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: INK_MUTED }}>
                {item.no} · {item.value}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl mb-3 tracking-tight" style={{ fontWeight: 400, color: INK }}>
                {item.name}
              </h3>
              <p className="font-light text-sm sm:text-base leading-relaxed max-w-xs mx-auto" style={{ color: INK_BODY }}>
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-md mx-auto px-8">
        <div className="h-px" style={{ backgroundColor: INK, opacity: 0.2 }} />
      </div>

      {/* CTA card */}
      <section className="max-w-xl mx-auto px-6 py-20">
        <div
          className="p-10 sm:p-14 rounded-sm text-center"
          style={{ backgroundColor: INK, color: CREAM }}
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: ROSE_GOLD }}>
            ◆ The Bundle ◆
          </p>
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" style={{ color: ROSE_GOLD }} />
            ))}
          </div>
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span className="font-mono text-base line-through" style={{ color: "hsl(36 20% 70%)" }}>
              $78
            </span>
            <span className="font-serif text-7xl" style={{ color: ROSE_GOLD, fontWeight: 400 }}>
              $59
            </span>
          </div>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(36 25% 88%)" }}>
            All three · Save $19
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-9" style={{ color: "hsl(36 20% 75%)" }}>
            One payment · Lifetime access
          </p>

          <ul className="space-y-2.5 mb-10 text-left max-w-sm mx-auto">
            {allFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 font-light text-[13px] leading-relaxed" style={{ color: "hsl(36 25% 92%)" }}>
                <Check className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: ROSE_GOLD }} /> {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase px-8 py-5 rounded-sm transition-all hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${ROSE_GOLD} 0%, hsl(12 55% 38%) 100%)`,
              color: CREAM,
              boxShadow: `0 16px 50px -10px ${ROSE_GOLD}`,
            }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get the Bundle <Sparkles className="w-3.5 h-3.5" /></>}
          </button>

          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mt-6" style={{ color: "hsl(36 25% 85%)" }}>
            Instant delivery
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto text-center py-14" style={{ borderTop: `0.5px solid ${HAIRLINE}` }}>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-5" style={{ fontWeight: 400, color: INK }}>
            Built for real people<br />
            <em style={{ fontStyle: "italic", color: ROSE_GOLD }}>creating real content.</em>
          </h2>
          <p className="font-light text-base leading-relaxed max-w-lg mx-auto" style={{ color: INK_BODY }}>
            These guides are designed to be practical, easy to follow, and useful whether you're just starting out or ready to level up your content and brand.
          </p>
        </div>
      </section>

      {/* Or shop individually */}
      <section className="px-6 pb-20">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: INK_MUTED }}>
            Prefer to start with one?
          </p>
          <Link
            to="/digital-products"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase hover:opacity-60 transition-opacity"
            style={{ color: INK }}
          >
            Shop Individual Guides <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default CreatorBundle;
