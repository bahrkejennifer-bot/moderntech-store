import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Loader2, Mail, Gift, Sparkles, Inbox } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SITE = "https://moderntech.store";
const PATH = "/free-guide-tech-essentials/success";

interface LocationState {
  email?: string;
  name?: string;
}

const TechEssentialsSuccess = () => {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const email = state?.email ?? "";
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>You're In — 2026 Tech Essentials Guide is on its way | Modern Tech</title>
        <meta
          name="description"
          content="Your free 2026 Tech Essentials guide is on its way. Check your inbox — and unlock the Complete Creator Bundle while you're here."
        />
        <link rel="canonical" href={`${SITE}${PATH}`} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="You're In — 2026 Tech Essentials Guide" />
        <meta property="og:description" content="Your free guide is on its way. Check your inbox." />
        <meta property="og:url" content={`${SITE}${PATH}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <StructuredData
        title="2026 Tech Essentials — Confirmation"
        description="Confirmation page for the free 2026 Tech Essentials guide email delivery."
        path={PATH}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Free Guides", path: "/digital-products" },
          { name: "2026 Tech Essentials", path: "/free-guide-tech-essentials" },
          { name: "Confirmation", path: PATH },
        ]}
      />

      <Navigation />

      {/* ── Confirmation Hero ── */}
      <section className="max-w-2xl mx-auto px-6 pt-28 pb-16 text-center">
        <div
          className="w-14 h-14 mx-auto mb-8 flex items-center justify-center"
          style={{ border: "0.5px solid hsl(220 15% 14% / 0.15)" }}
        >
          <Check className="w-6 h-6" style={{ color: "hsl(220 15% 14% / 0.65)" }} />
        </div>

        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
          style={{ color: "hsl(220 15% 14% / 0.45)" }}
        >
          DELIVERY CONFIRMED · ISSUE 01 · 2026
        </p>

        <h1
          className="font-serif text-4xl md:text-6xl tracking-tight mb-6"
          style={{ fontWeight: 400, lineHeight: 1.05 }}
        >
          You're in.<br />Your guide is on its way.
        </h1>

        <p
          className="font-mono text-[12px] leading-relaxed max-w-md mx-auto mb-2"
          style={{ color: "hsl(220 15% 14% / 0.6)" }}
        >
          The 2026 Tech Essentials Guide is being emailed{" "}
          {email ? (
            <>
              to <strong style={{ color: "hsl(220 15% 14%)" }}>{email}</strong>
            </>
          ) : (
            "to your inbox"
          )}{" "}
          right now. It usually arrives within 2–3 minutes.
        </p>
      </section>

      {/* ── What to do next ── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div
          className="grid md:grid-cols-3 gap-px"
          style={{ backgroundColor: "hsl(220 15% 14% / 0.1)" }}
        >
          {[
            {
              icon: Inbox,
              label: "STEP 01",
              title: "Open your inbox",
              blurb: "Look for an email from info@moderntech.store with your download link.",
            },
            {
              icon: Mail,
              label: "STEP 02",
              title: "Whitelist us",
              blurb: "Drag us out of Promotions so future Sunday edits land in your primary tab.",
            },
            {
              icon: Sparkles,
              label: "STEP 03",
              title: "Read & explore",
              blurb: "Open the guide, then browse our editorial picks across all four categories.",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-8" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
                <Icon className="w-4 h-4 mb-4" style={{ color: "hsl(220 15% 14% / 0.5)" }} />
                <p
                  className="font-mono text-[10px] tracking-[0.2em] mb-2"
                  style={{ color: "hsl(220 15% 14% / 0.4)" }}
                >
                  {s.label}
                </p>
                <h3 className="font-serif text-lg mb-2" style={{ fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p
                  className="font-mono text-[11px] leading-relaxed"
                  style={{ color: "hsl(220 15% 14% / 0.6)" }}
                >
                  {s.blurb}
                </p>
              </div>
            );
          })}
        </div>

        <p
          className="text-center font-mono text-[10px] tracking-[0.15em] mt-6"
          style={{ color: "hsl(220 15% 14% / 0.4)" }}
        >
          DIDN'T GET IT? CHECK SPAM OR EMAIL{" "}
          <a href="mailto:info@moderntech.store" className="underline">
            info@moderntech.store
          </a>
        </p>
      </section>

      {/* ── Creator Bundle Upsell ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(220 15% 14% / 0.4)" }}
          >
            ONE-TIME OFFER · WHILE YOU'RE HERE
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl tracking-tight mb-3"
            style={{ fontWeight: 400 }}
          >
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

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
            style={{ color: "hsl(220 15% 14% / 0.5)" }}
          >
            NO THANKS — BACK TO HOMEPAGE <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default TechEssentialsSuccess;
