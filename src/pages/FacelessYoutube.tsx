import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Youtube, Loader2, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const features = [
  "Complete faceless YouTube system",
  "AI tool stack & automation setup",
  "Niche selection framework",
  "Monetization roadmap",
  "Script-to-upload workflow",
  "Bonus: 30-day launch plan",
];

const FacelessYoutube = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "Faceless YouTube Automation",
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
    <div className="min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>Faceless YouTube Automation — Build a Profitable Channel | ModernTech</title>
        <meta name="description" content="Build a profitable faceless YouTube channel with AI. Complete system including niche selection, automation setup, and monetization roadmap." />
      </Helmet>
      <Navigation />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
              DIGITAL GUIDE
            </p>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 400 }}>
              Faceless YouTube<br />Automation
            </h1>
            <p className="font-mono text-[12px] tracking-[0.05em] leading-relaxed mb-8" style={{ color: "hsl(40 10% 12% / 0.6)" }}>
              Build a profitable YouTube channel without ever showing your face. This comprehensive guide covers everything from AI tools to monetization — with a complete 30-day launch plan.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 font-mono text-[12px]" style={{ color: "hsl(40 10% 12% / 0.7)" }}>
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(40 10% 12% / 0.4)" }} /> {f}
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-4xl">$49</span>
              <span className="font-mono text-[11px]" style={{ color: "hsl(40 10% 12% / 0.4)" }}>one-time payment</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get Instant Access <ArrowRight className="w-3 h-3" /></>}
            </button>
          </div>

          <div className="p-8 rounded-sm text-center" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
            <Youtube className="w-16 h-16 mx-auto mb-6" style={{ color: "hsl(40 10% 12% / 0.2)" }} />
            <h2 className="font-serif text-2xl mb-3" style={{ fontWeight: 400 }}>What's Inside</h2>
            <p className="font-mono text-[11px] leading-relaxed mb-6" style={{ color: "hsl(40 10% 12% / 0.5)" }}>
              A step-by-step PDF guide to building an AI-powered faceless YouTube channel — from choosing your niche to getting your first paycheck.
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "hsl(45 80% 55%)" }} />
              ))}
            </div>
            <p className="font-mono text-[10px]" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
              Instant delivery • PDF format • Lifetime access
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-md mx-auto text-center pt-8" style={{ borderTop: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
            30-DAY MONEY-BACK GUARANTEE
          </p>
          <p className="font-mono text-[11px]" style={{ color: "hsl(40 10% 12% / 0.5)" }}>
            Not satisfied? We'll refund every penny — no questions asked.
          </p>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default FacelessYoutube;
