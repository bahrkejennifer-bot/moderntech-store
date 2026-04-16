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

const bundleItems = [
  { cover: COVER_REELS, name: "Reels Master Class", value: "FREE", desc: "Learn to create attention-grabbing reels that stop the scroll" },
  { cover: COVER_CANVA, name: "Canva Master Class", value: "$29", desc: "Design polished graphics and branded content in Canva" },
  { cover: COVER_YOUTUBE, name: "YouTube Master Class", value: "$49", desc: "Build smarter YouTube content with practical strategies" },
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
    <div className="min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>The Complete Creator Bundle — Save $19 | Modern Tech</title>
        <meta name="description" content="Get all three master classes together for just $59. Learn reels, Canva, and YouTube in one practical bundle designed to help creators build better content." />
      </Helmet>
      <Navigation />

      <section className="pt-28 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: "hsl(45 80% 55% / 0.15)", border: "1px solid hsl(45 80% 55% / 0.3)" }}>
          <Sparkles className="w-3 h-3" style={{ color: "hsl(45 80% 55%)" }} />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(45 60% 35%)" }}>BEST VALUE — SAVE $19</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 400, color: "hsl(40 10% 8%)" }}>
          The Complete<br />Creator Bundle
        </h1>
        <p className="font-mono text-[12px] tracking-[0.05em] max-w-xl mx-auto leading-relaxed" style={{ color: "hsl(40 10% 12% / 0.6)" }}>
          Learn reels, Canva, and YouTube together in one practical bundle designed to help creators and business owners build content that looks better, performs better, and sells better.
        </p>
      </section>

      {/* What's included */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {bundleItems.map((item) => {
            return (
              <div key={item.name} className="p-6 rounded-sm text-center" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
                <div className="mx-auto mb-4 aspect-[3/4] w-28 overflow-hidden rounded-sm" style={{ border: "0.5px solid hsl(40 10% 12% / 0.08)" }}>
                  <img
                    src={item.cover}
                    alt={`${item.name} cover`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-lg mb-1" style={{ fontWeight: 400 }}>{item.name}</h3>
                <p className="font-mono text-[10px] mb-2" style={{ color: "hsl(40 10% 12% / 0.5)" }}>{item.desc}</p>
                <span className="font-mono text-[11px] tracking-[0.1em]" style={{ color: "hsl(40 10% 12% / 0.4)" }}>{item.value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA card */}
      <section className="max-w-lg mx-auto px-6 pb-16">
        <div className="p-8 rounded-sm text-center" style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" style={{ color: "hsl(45 80% 55%)" }} />
            ))}
          </div>
          <div className="mb-4">
            <span className="font-mono text-[12px] line-through mr-2" style={{ color: "hsl(40 18% 91% / 0.4)" }}>$78</span>
            <span className="font-serif text-5xl" style={{ color: "hsl(45 80% 55%)" }}>$59</span>
          </div>
          <p className="font-mono text-[11px] mb-2" style={{ color: "hsl(40 18% 91% / 0.5)" }}>
            Buy all 3 for $59 and save $19
          </p>
          <p className="font-mono text-[10px] mb-6" style={{ color: "hsl(40 18% 91% / 0.4)" }}>
            One payment • All three products • Lifetime access
          </p>

          <ul className="space-y-2 mb-8 text-left max-w-sm mx-auto">
            {allFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 font-mono text-[11px]" style={{ color: "hsl(40 18% 91% / 0.8)" }}>
                <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "hsl(45 80% 55%)" }} /> {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "hsl(45 80% 55%)", color: "hsl(40 10% 12%)" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get the Bundle <Sparkles className="w-3 h-3" /></>}
          </button>

          <p className="font-mono text-[9px] mt-4" style={{ color: "hsl(40 18% 91% / 0.3)" }}>
            30-day money-back guarantee • Instant delivery
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto text-center py-12" style={{ borderTop: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
          <h2 className="font-serif text-3xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
            Built for Real People Creating Real Content
          </h2>
          <p className="font-mono text-[11px] leading-relaxed max-w-lg mx-auto" style={{ color: "hsl(40 10% 12% / 0.5)" }}>
            These guides are designed to be practical, easy to follow, and useful whether you're just starting out or ready to level up your content and brand.
          </p>
        </div>
      </section>

      {/* Or shop individually */}
      <section className="px-6 pb-20">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
            Prefer to start with one?
          </p>
          <Link
            to="/digital-products"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
            style={{ color: "hsl(40 10% 12% / 0.6)" }}
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