import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Loader2, Home, Heart, Briefcase, Baby, Sparkles, Gift } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SITE = "https://moderntech.store";
const PATH = "/free-guide-tech-essentials";
const LEAD_MAGNET_SLUG = "tech-essentials-2026";

const PILLARS = [
  {
    icon: Home,
    label: "SMART HOME",
    title: "Calmer, Safer Living Spaces",
    blurb:
      "Hub-agnostic picks for lighting, locks, and ambient sensors that disappear into your home — no app fatigue.",
    items: ["Matter-ready hubs", "Apple Home / Alexa picks", "Family-safe cameras"],
  },
  {
    icon: Heart,
    label: "HEALTH & WELLNESS",
    title: "Quiet Biometrics, Loud Insight",
    blurb:
      "Smart rings, recovery wearables, and circadian lighting curated by a registered nurse — no hype, only signal.",
    items: ["Oura Ring 4 deep-dive", "HRV trackers worth the data", "Red-light & sleep stack"],
  },
  {
    icon: Briefcase,
    label: "OFFICE & PRODUCTIVITY",
    title: "Workspaces That Earn Their Footprint",
    blurb:
      "Desks, audio, and lighting designed for deep work, async calls, and the occasional reels shoot.",
    items: ["Sub-$500 monitors", "Studio-grade USB mics", "Cable-tamed desk setups"],
  },
  {
    icon: Baby,
    label: "KIDS & STEM",
    title: "Screen-Optional Learning",
    blurb:
      "Educational tech vetted for ages 3–18 — gadgets that build curiosity without melting attention spans.",
    items: ["Coding kits by age", "Read-aloud devices", "Family-safe wearables"],
  },
];

const FAQS = [
  {
    q: "Is this guide really free?",
    a: "Yes. Drop your email and we send the 2026 Tech Essentials guide instantly — no card, no trial, no upsell required.",
  },
  {
    q: "Who curates the picks?",
    a: "Every product is Jen-Verified by Modern Tech LLC. We're an independent affiliate publisher, not a brand — we only feature gear we'd put in our own home.",
  },
  {
    q: "Will you spam me?",
    a: "No. You'll get the guide, a short welcome note, and an occasional Sunday edit. Unsubscribe in one click any time.",
  },
  {
    q: "Are the product links affiliate links?",
    a: "Most are. We earn a small commission when you buy through Amazon and partner brands — at no extra cost to you. That funds the editorial work.",
  },
];

const TechEssentialsGuide = () => {
  const [step, setStep] = useState<"gate" | "upsell">("gate");
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    try {
      await supabase.from("lead_captures").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        lead_magnet: LEAD_MAGNET_SLUG,
      });

      await supabase.functions.invoke("send-welcome-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          lead_magnet: LEAD_MAGNET_SLUG,
        },
      });

      toast.success("Check your inbox — your 2026 Tech Essentials guide is on its way.");
      setStep("upsell");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBundleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "The Complete Creator Bundle",
          productSlug: "creator-bundle",
          amount: 5900,
          successUrl: `${SITE}/creator-funnel/success?product=creator-bundle`,
          cancelUrl: `${SITE}${PATH}`,
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ── JSON-LD: WebPage + BreadcrumbList + ItemList + FAQPage ──
  const itemListGraph = {
    "@type": "ItemList",
    "@id": `${SITE}${PATH}#itemlist`,
    name: "2026 Tech Essentials — Four-Category Edit",
    numberOfItems: PILLARS.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: PILLARS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.label.replace(/\b\w/g, (c) => c.toUpperCase())} — ${p.title}`,
      description: p.blurb,
    })),
  };

  const faqGraph = {
    "@type": "FAQPage",
    "@id": `${SITE}${PATH}#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const offerGraph = {
    "@type": "Offer",
    "@id": `${SITE}${PATH}#offer`,
    name: "2026 Tech Essentials Guide",
    price: "0.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE}${PATH}`,
    seller: { "@id": `${SITE}/#organization` },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Free 2026 Tech Essentials Guide — Smart Home, Health, Office, Kids | Modern Tech</title>
        <meta
          name="description"
          content="The free Jen-Verified 2026 Tech Essentials Guide — curated picks across smart home, health, office, and kids tech. Editorial, independent, no fluff."
        />
        <link rel="canonical" href={`${SITE}${PATH}`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Modern Tech LLC" />
        <meta property="og:title" content="Free 2026 Tech Essentials Guide — Modern Tech" />
        <meta
          property="og:description"
          content="Curated 2026 tech across smart home, health, office, and kids — by Modern Tech LLC. Free, instant download."
        />
        <meta property="og:url" content={`${SITE}${PATH}`} />
        <meta property="og:image" content={`${SITE}/lovable-uploads/modern-tech-logo.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free 2026 Tech Essentials Guide" />
        <meta
          name="twitter:description"
          content="Smart home, health, office, kids — Jen-Verified picks for 2026. Free instant download."
        />
      </Helmet>

      <StructuredData
        title="Free 2026 Tech Essentials Guide"
        description="Curated 2026 tech across smart home, health, office, and kids — by Modern Tech LLC."
        path={PATH}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Free Guides", path: "/digital-products" },
          { name: "2026 Tech Essentials", path: PATH },
        ]}
        extraGraph={[itemListGraph, faqGraph, offerGraph]}
      />

      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
          style={{ color: "hsl(220 15% 14% / 0.4)" }}
        >
          THE FREE EDIT · ISSUE 01 · 2026
        </p>
        <h1
          className="font-serif text-5xl md:text-7xl tracking-tight mb-6 max-w-3xl"
          style={{ fontWeight: 400, lineHeight: 1.05 }}
        >
          The Tech<br />Worth Owning<br />in 2026.
        </h1>
        <p
          className="font-mono text-[12px] tracking-[0.05em] max-w-xl leading-relaxed"
          style={{ color: "hsl(220 15% 14% / 0.6)" }}
        >
          One free guide. Four categories. Zero filler. Smart home, health &amp; wellness, office,
          and kids — curated, tested, and Jen-Verified for the year ahead.
        </p>
      </section>

      {step === "gate" ? (
        <>
          {/* ── Email Gate ── */}
          <section className="max-w-md mx-auto px-6 pb-20">
            <div
              className="p-8 rounded-sm"
              style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-center mb-4"
                style={{ color: "hsl(220 15% 14% / 0.4)" }}
              >
                FREE · INSTANT DELIVERY
              </p>
              <h2 className="font-serif text-2xl text-center mb-2" style={{ fontWeight: 400 }}>
                Get the 2026 Tech Essentials
              </h2>
              <p
                className="font-mono text-[11px] text-center mb-6 leading-relaxed"
                style={{ color: "hsl(220 15% 14% / 0.5)" }}
              >
                We'll email it within minutes. No card, no fluff.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your first name"
                  required
                  className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
                  style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
                  style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send Me the Guide <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* ── Pillars / What's Inside ── */}
          <section className="max-w-5xl mx-auto px-6 pb-24">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-10 text-center"
              style={{ color: "hsl(220 15% 14% / 0.4)" }}
            >
              WHAT'S INSIDE — FOUR EDITS
            </p>
            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "hsl(220 15% 14% / 0.1)" }}>
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.label}
                    className="p-10"
                    style={{ backgroundColor: "hsl(0 0% 100%)" }}
                  >
                    <div className="flex items-baseline gap-3 mb-6">
                      <span
                        className="font-mono text-[10px] tracking-[0.2em]"
                        style={{ color: "hsl(220 15% 14% / 0.3)" }}
                      >
                        0{i + 1}
                      </span>
                      <Icon className="w-4 h-4" style={{ color: "hsl(220 15% 14% / 0.5)" }} />
                      <span
                        className="font-mono text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "hsl(220 15% 14% / 0.5)" }}
                      >
                        {p.label}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl mb-3" style={{ fontWeight: 400 }}>
                      {p.title}
                    </h3>
                    <p
                      className="font-mono text-[12px] leading-relaxed mb-5"
                      style={{ color: "hsl(220 15% 14% / 0.6)" }}
                    >
                      {p.blurb}
                    </p>
                    <ul className="space-y-1.5">
                      {p.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2 font-mono text-[11px]"
                          style={{ color: "hsl(220 15% 14% / 0.7)" }}
                        >
                          <span style={{ color: "hsl(14 50% 60%)" }}>—</span> {it}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="max-w-3xl mx-auto px-6 pb-28">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8 text-center"
              style={{ color: "hsl(220 15% 14% / 0.4)" }}
            >
              QUESTIONS, ANSWERED
            </p>
            <div className="space-y-px" style={{ backgroundColor: "hsl(220 15% 14% / 0.1)" }}>
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group p-6"
                  style={{ backgroundColor: "hsl(0 0% 100%)" }}
                >
                  <summary
                    className="font-serif text-lg cursor-pointer list-none flex justify-between items-center"
                    style={{ fontWeight: 400 }}
                  >
                    {f.q}
                    <span
                      className="font-mono text-[10px] transition-transform group-open:rotate-45"
                      style={{ color: "hsl(220 15% 14% / 0.4)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="font-mono text-[12px] mt-4 leading-relaxed"
                    style={{ color: "hsl(220 15% 14% / 0.6)" }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* ── Upsell: Creator Bundle ── */
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div
            className="text-center mb-12 p-6 rounded-sm"
            style={{ backgroundColor: "hsl(140 30% 92%)", border: "0.5px solid hsl(140 30% 70% / 0.3)" }}
          >
            <Check className="w-6 h-6 mx-auto mb-2" style={{ color: "hsl(140 40% 40%)" }} />
            <p className="font-serif text-lg mb-1">Your guide is on its way.</p>
            <p className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              Check your inbox at <strong>{form.email}</strong>
            </p>
          </div>

          <div className="text-center mb-10">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(220 15% 14% / 0.4)" }}
            >
              ONE-TIME OFFER · WHILE YOU'RE HERE
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-3" style={{ fontWeight: 400 }}>
              Build the Brand Behind the Tech.
            </h2>
            <p
              className="font-mono text-[11px] max-w-lg mx-auto leading-relaxed"
              style={{ color: "hsl(220 15% 14% / 0.5)" }}
            >
              The Complete Creator Bundle — Reels, Canva, and YouTube master classes — for everyone
              ready to monetize taste, not just consume it.
            </p>
          </div>

          <div
            className="relative p-10 rounded-sm"
            style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}
              >
                BEST VALUE · SAVE $19
              </span>
            </div>
            <Gift className="w-7 h-7 mx-auto mb-4" style={{ color: "hsl(14 50% 88%)" }} />
            <h3 className="font-serif text-2xl text-center mb-2" style={{ fontWeight: 400 }}>
              The Complete Creator Bundle
            </h3>
            <div className="text-center mb-6">
              <span
                className="font-mono text-[11px] line-through mr-2"
                style={{ color: "hsl(30 25% 95% / 0.4)" }}
              >
                $78
              </span>
              <span className="font-serif text-4xl" style={{ color: "hsl(14 50% 88%)" }}>
                $59
              </span>
            </div>
            <ul className="space-y-2 mb-8 max-w-md mx-auto">
              {[
                "Reels Master Class — short-form that converts",
                "Canva Master Class — design like a brand",
                "YouTube Master Class — long-form growth system",
                "30-day money-back guarantee",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 font-mono text-[11px]"
                  style={{ color: "hsl(30 25% 95% / 0.85)" }}
                >
                  <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "hsl(14 50% 88%)" }} /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleBundleCheckout}
              disabled={checkoutLoading}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-4 transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}
            >
              {checkoutLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Unlock the Bundle <Sparkles className="w-3 h-3" />
                </>
              )}
            </button>
          </div>

          <p
            className="text-center font-mono text-[10px] tracking-[0.2em] uppercase mt-8"
            style={{ color: "hsl(220 15% 14% / 0.4)" }}
          >
            NO THANKS — JUST WAITING FOR MY FREE GUIDE.
          </p>
        </section>
      )}

      <AffiliateFooter />
    </div>
  );
};

export default TechEssentialsGuide;
