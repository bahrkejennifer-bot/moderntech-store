import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Youtube, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const features = [
  "Planning tips to structure your content strategy",
  "Video flow guidance for engaging, watchable videos",
  "Channel growth ideas to build your audience",
  "Branding guidance for a professional look",
  "Guidance for creating useful, engaging content",
  "Bonus: 30-day launch plan",
];

const whoItsFor = [
  "Beginners starting their first YouTube channel",
  "Growing creators who want a smarter strategy",
  "Business owners using video for marketing",
  "Anyone who wants to grow on YouTube with confidence",
];

const FacelessYoutube = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "YouTube Master Class",
          productSlug: "faceless-youtube-automation",
          amount: 4900,
          successUrl: "https://moderntech.store/creator-funnel/success?product=faceless-youtube-automation",
          cancelUrl: "https://moderntech.store/faceless-youtube",
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
    <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>YouTube Master Class — Build & Grow Your Channel | Modern Tech</title>
        <meta name="description" content="The YouTube Master Class helps you build a smarter content strategy with practical guidance on planning, structuring, and growing your videos." />
      </Helmet>
      <Navigation />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
              DIGITAL GUIDE
            </p>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 400 }}>
              YouTube<br />Master Class
            </h1>
            <p className="font-mono text-[12px] tracking-[0.05em] leading-relaxed mb-8" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
              The YouTube Master Class helps you build a smarter content strategy with practical guidance on planning, structuring, and growing your videos.
            </p>

            <div className="mb-8">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
                What's Included
              </p>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-mono text-[12px]" style={{ color: "hsl(220 15% 14% / 0.7)" }}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(220 15% 14% / 0.4)" }} /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-4xl">$49</span>
              <span className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.4)" }}>one-time payment</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Buy for $49 <ArrowRight className="w-3 h-3" /></>}
            </button>
          </div>

          <div>
            <div className="p-8 rounded-sm text-center mb-6" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
              <Youtube className="w-16 h-16 mx-auto mb-6" style={{ color: "hsl(220 15% 14% / 0.2)" }} />
              <h2 className="font-serif text-2xl mb-3" style={{ fontWeight: 400 }}>Who It's For</h2>
              <ul className="space-y-3 text-left max-w-xs mx-auto">
                {whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
                    <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "hsl(220 15% 14% / 0.3)" }} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "hsl(14 50% 88%)" }} />
              ))}
            </div>
            <p className="font-mono text-[10px] text-center" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
              Instant delivery • PDF format • Lifetime access
            </p>
          </div>
        </div>
      </section>

      {/* Bundle Upsell */}
      <section className="px-6 pb-16">
        <div className="max-w-md mx-auto p-6 text-center" style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}>
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(14 50% 88%)" }}>Save $19</p>
          <p className="font-serif text-lg mb-3">Get all 3 Master Classes for $59</p>
          <Link
            to="/creator-bundle"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
            style={{ color: "hsl(14 50% 88%)" }}
          >
            See the Bundle <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Guarantee */}
      <section className="pb-20 px-6">
        <div className="max-w-md mx-auto text-center pt-8" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
            30-DAY MONEY-BACK GUARANTEE
          </p>
          <p className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
            Not satisfied? We'll refund every penny — no questions asked.
          </p>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default FacelessYoutube;