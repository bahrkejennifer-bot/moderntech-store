import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Shield, ArrowRight, ChevronDown, Zap, BookOpen, Target, TrendingUp, Gift, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const faqItems = [
  { q: "Do I need any tech experience to follow this?", a: "Not at all. The Blueprint is designed for complete beginners. Every step is explained in plain language with screenshots and templates you can copy." },
  { q: "How quickly can I start earning?", a: "Most students see their first commissions within 30–60 days of following the system. Some have earned within the first two weeks." },
  { q: "Is this just another generic affiliate course?", a: "No. This is the exact system we used to build ModernTech.store. Real strategies, real results — not theory from someone who's never done it." },
  { q: "What if it doesn't work for me?", a: "You're covered by our 30-day money-back guarantee. If you follow the steps and don't see results, we'll refund every penny." },
  { q: "Do I get lifetime access?", a: "Yes. Buy once, access forever — including all future updates and bonus materials we add." },
];

const modules = [
  { icon: Target, title: "Module 1: Niche Selection", desc: "Find a profitable niche that matches your interests — with our proven validation framework." },
  { icon: BookOpen, title: "Module 2: Site Architecture", desc: "Build a site that Google loves. Templates, layouts, and the exact tech stack we use." },
  { icon: TrendingUp, title: "Module 3: Content Engine", desc: "The content formula that drives organic traffic. SEO, product reviews, and comparison posts that convert." },
  { icon: Zap, title: "Module 4: Traffic & Pinterest", desc: "Our Pinterest automation system that sends thousands of visitors monthly — on autopilot." },
  { icon: Gift, title: "Module 5: Monetization", desc: "Beyond Amazon — email funnels, digital products, and stacking multiple revenue streams." },
];

const testimonials = [
  { name: "Sarah M.", role: "Mom & Side Hustler", quote: "I went from zero to $800/month in 90 days following the Blueprint. The Pinterest module alone was worth 10x the price." },
  { name: "David L.", role: "Tech Enthusiast", quote: "Finally, a course that shows you what actually works — not vague theory. My affiliate site is now my primary income." },
  { name: "Aisha K.", role: "College Student", quote: "I built my first affiliate site during winter break. Already covering my textbook costs every semester." },
];

const Blueprint = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "Amazon Affiliate Blueprint 2026",
          productSlug: "amazon-affiliate-blueprint-2026",
          amount: 2700,
          successUrl: "https://moderntech.store/blueprint/success",
          cancelUrl: "https://moderntech.store/blueprint",
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Unable to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vogue-theme min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>Amazon Affiliate Blueprint 2026 — ModernTech</title>
        <meta name="description" content="The exact Amazon affiliate system that built ModernTech.store. 5 modules, bonus toolkit, and step-by-step guidance for $27." />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-8 pt-20 pb-16 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 10% 12% / 0.45)" }}>
          THE AMAZON AFFILIATE BLUEPRINT 2026
        </p>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] mb-8" style={{ fontWeight: 400 }}>
          Stop Guessing. Start Earning.
        </h1>
        <p className="font-serif text-xl md:text-2xl leading-relaxed mb-4" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(40 10% 12% / 0.7)" }}>
          The Exact Amazon Affiliate System That Built ModernTech.store — Now Yours for $27.
        </p>
        <div className="mt-10">
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Instant Access — $27"}
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-[700px] mx-auto px-8 py-16">
        <div className="border-t border-b" style={{ borderColor: "hsl(40 10% 12% / 0.12)" }}>
          <div className="py-12">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-8" style={{ fontWeight: 400, fontStyle: "italic" }}>
              The Problem
            </h2>
            <div className="space-y-4 font-mono text-[12px] leading-relaxed" style={{ color: "hsl(40 10% 12% / 0.65)" }}>
              <p>You've watched the YouTube videos. Read the blog posts. Maybe even started a site.</p>
              <p>But you're still guessing. Still not earning. Still stuck in the gap between "I want to do this" and actually making money.</p>
              <p>The problem isn't you — it's that nobody shows you the complete system. Until now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="max-w-[800px] mx-auto px-8 py-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
          WHAT'S INSIDE
        </p>
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-12" style={{ fontWeight: 400 }}>
          5 Modules + Bonus Toolkit
        </h2>
        <div className="space-y-0">
          {modules.map((mod, i) => (
            <div key={i} className="flex gap-6 py-8" style={{ borderTop: i > 0 ? "0.5px solid hsl(40 10% 12% / 0.1)" : "none" }}>
              <div className="shrink-0 w-10 h-10 flex items-center justify-center" style={{ border: "0.5px solid hsl(40 10% 12% / 0.15)" }}>
                <mod.icon className="w-4 h-4" style={{ color: "hsl(40 10% 12% / 0.5)" }} />
              </div>
              <div>
                <h3 className="font-mono text-[11px] tracking-[0.15em] uppercase mb-2">{mod.title}</h3>
                <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(40 10% 12% / 0.6)", fontWeight: 300 }}>{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6" style={{ backgroundColor: "hsl(40 10% 12% / 0.04)", border: "0.5px solid hsl(40 10% 12% / 0.08)" }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(40 10% 12% / 0.4)" }}>BONUS</p>
          <p className="font-serif text-lg" style={{ fontWeight: 400 }}>Affiliate Starter Toolkit</p>
          <p className="font-mono text-[11px] mt-2" style={{ color: "hsl(40 10% 12% / 0.55)" }}>Templates, swipe files, keyword sheets, and our private Pinterest pin templates.</p>
        </div>
      </section>

      {/* Value Stack */}
      <section className="max-w-[600px] mx-auto px-8 py-16 text-center">
        <div className="py-12 border-t border-b" style={{ borderColor: "hsl(40 10% 12% / 0.12)" }}>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: "hsl(40 10% 12% / 0.4)" }}>THE VALUE</p>
          <div className="space-y-3 mb-8">
            {["5 Complete Modules — $197", "Bonus Toolkit — $47", "Pinterest Templates — $27", "Lifetime Updates — $26"].map((item, i) => (
              <div key={i} className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em]" style={{ color: "hsl(40 10% 12% / 0.6)" }}>
                <span className="flex items-center gap-2"><Check className="w-3 h-3" /> {item.split(" — ")[0]}</span>
                <span>{item.split(" — ")[1]}</span>
              </div>
            ))}
          </div>
          <div className="h-px w-full mb-6" style={{ backgroundColor: "hsl(40 10% 12% / 0.1)" }} />
          <p className="font-mono text-[11px] tracking-[0.1em] mb-1" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
            Total Value: <span className="line-through">$297</span>
          </p>
          <p className="font-serif text-5xl tracking-tight mt-2" style={{ fontWeight: 400 }}>$27</p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: "hsl(40 10% 12% / 0.4)" }}>One-time payment</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[800px] mx-auto px-8 py-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
          WHAT OTHERS ARE SAYING
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6" style={{ border: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
              <p className="font-serif text-sm leading-relaxed mb-6" style={{ fontStyle: "italic", color: "hsl(40 10% 12% / 0.7)" }}>
                "{t.quote}"
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase">{t.name}</p>
              <p className="font-mono text-[9px] tracking-[0.1em] mt-1" style={{ color: "hsl(40 10% 12% / 0.4)" }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[700px] mx-auto px-8 py-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: "hsl(40 10% 12% / 0.4)" }}>FAQ</p>
        {faqItems.map((faq, i) => (
          <div key={i} style={{ borderBottom: "0.5px solid hsl(40 10% 12% / 0.1)" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left group"
            >
              <span className="font-mono text-[11px] tracking-[0.1em] pr-4">{faq.q}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 transition-transform duration-300"
                style={{ color: "hsl(40 10% 12% / 0.3)", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-6" : "max-h-0"}`}>
              <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(40 10% 12% / 0.6)", fontWeight: 300 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="get-access" className="max-w-[600px] mx-auto px-8 py-20 text-center">
        <div className="p-10" style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}>
          <Shield className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(40 18% 91% / 0.5)" }} />
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(40 18% 91% / 0.4)" }}>
            30-DAY MONEY-BACK GUARANTEE
          </p>
          <h2 className="font-serif text-3xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
            Ready to Build Your Affiliate Business?
          </h2>
          <p className="font-serif text-sm mb-8" style={{ color: "hsl(40 18% 91% / 0.6)", fontWeight: 300 }}>
            One payment. Lifetime access. Zero risk.
          </p>
          {/* Gumroad placeholder — replace href with real Gumroad URL */}
          <a
            href="#gumroad-link"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}
          >
            Get Instant Access — $27 <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Blueprint;
