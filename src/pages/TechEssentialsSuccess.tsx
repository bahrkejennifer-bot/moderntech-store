import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Loader2, Mail, Gift, Sparkles, Inbox, Send, AlertCircle, Copy, Printer, Share2, Link2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SITE = "https://moderntech.store";
const PATH = "/free-guide-tech-essentials/success";
const LEAD_MAGNET_SLUG = "tech-essentials-2026";
const RESEND_COOLDOWN_SECONDS = 60;

interface LocationState {
  email?: string;
  name?: string;
}

type ResendStatus = "idle" | "sending" | "sent" | "error";

const TechEssentialsSuccess = () => {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const email = state?.email ?? "";
  const name = state?.name ?? "";
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // ── Resend email state ──
  const [resendStatus, setResendStatus] = useState<ResendStatus>("idle");
  const [cooldown, setCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const SHARE_URL = `${SITE}${PATH}#deliverability-card`;

  const SENDER_EMAIL = "info@moderntech.store";

  const handleCopySender = async () => {
    try {
      await navigator.clipboard.writeText(SENDER_EMAIL);
      setCopied(true);
      toast.success("Copied — now paste into your contacts or safe-sender list.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't copy. Long-press the address to copy manually.");
    }
  };

  const handlePrintCard = () => {
    document.body.classList.add("printing-deliverability");
    const cleanup = () => {
      document.body.classList.remove("printing-deliverability");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    // Defer to next tick so the class is applied before the print dialog snapshots layout
    setTimeout(() => window.print(), 50);
  };

  const handleShareCard = async () => {
    const shareText =
      "Modern Tech — Deliverability Card: how to whitelist info@moderntech.store and recover the 2026 Tech Essentials Guide.";
    // Try native share first (mobile)
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
          title: "Modern Tech · Deliverability Card",
          text: shareText,
          url: SHARE_URL,
        });
        return;
      } catch {
        /* user cancelled — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setShareCopied(true);
      toast.success("Link copied — save it or email it to yourself for later.");
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Final fallback: open mailto with everything pre-filled
      const subject = encodeURIComponent("Modern Tech — Deliverability Card (save for later)");
      const body = encodeURIComponent(`${shareText}\n\n${SHARE_URL}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  // Auto-scroll into view when the page is opened with the deliverability anchor
  useEffect(() => {
    if (location.hash === "#deliverability-card") {
      const el = document.getElementById("deliverability-card");
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      toast.error("We don't have your email on file. Please return to the guide page and submit again.");
      return;
    }
    if (cooldown > 0 || resendStatus === "sending") return;

    setResendStatus("sending");
    try {
      const { error } = await supabase.functions.invoke("send-welcome-email", {
        body: { name: name || "there", email, lead_magnet: LEAD_MAGNET_SLUG },
      });
      if (error) throw error;
      setResendStatus("sent");
      setResendCount((c) => c + 1);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      toast.success("Sent again. Give it a minute and check your inbox.");
    } catch {
      setResendStatus("error");
      toast.error("We couldn't resend it. Please try again in a moment.");
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

      {/* ── Confirmation Hero (asymmetric, left-aligned editorial) ── */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-16 px-5 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)" }}
          >
            <Check className="w-4 h-4" style={{ color: "hsl(220 15% 14% / 0.7)" }} />
          </div>
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(220 15% 14% / 0.45)" }}
          >
            DELIVERY CONFIRMED · ISSUE 01 · 2026
          </p>
        </div>

        <h1
          className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight mb-6 sm:mb-8 max-w-3xl"
          style={{ fontWeight: 400, lineHeight: 1.05 }}
        >
          You're in.<br />The guide<br />is on its way.
        </h1>

        <div
          className="max-w-xl pl-4 sm:pl-6"
          style={{ borderLeft: "0.5px solid hsl(220 15% 14% / 0.15)" }}
        >
          <p
            className="font-mono text-[12px] leading-relaxed"
            style={{ color: "hsl(220 15% 14% / 0.65)" }}
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
        </div>
      </section>

      {/* ── What to do next — hairline grid ── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-12 sm:pb-20">
        <div className="flex items-baseline justify-between mb-6 sm:mb-10">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(220 15% 14% / 0.4)" }}
          >
            WHAT TO DO NEXT
          </p>
          <span
            className="font-mono text-[10px] tracking-[0.2em]"
            style={{ color: "hsl(220 15% 14% / 0.3)" }}
          >
            03 STEPS
          </span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ backgroundColor: "hsl(220 15% 14% / 0.1)" }}
        >
          {[
            {
              icon: Inbox,
              label: "01",
              title: "Open your inbox",
              blurb: "Look for an email from info@moderntech.store with your download link.",
            },
            {
              icon: Mail,
              label: "02",
              title: "Whitelist us",
              blurb: "Drag us out of Promotions so future Sunday edits land in your primary tab.",
            },
            {
              icon: Sparkles,
              label: "03",
              title: "Read & explore",
              blurb: "Open the guide, then browse our editorial picks across all four categories.",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-6 sm:p-8 md:p-10"
                style={{ backgroundColor: "hsl(0 0% 100%)" }}
              >
                <div className="flex items-baseline gap-3 mb-5 sm:mb-6">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: "hsl(220 15% 14% / 0.3)" }}
                  >
                    {s.label}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: "hsl(220 15% 14% / 0.5)" }} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl mb-2 sm:mb-3" style={{ fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p
                  className="font-mono text-[11px] sm:text-[12px] leading-relaxed"
                  style={{ color: "hsl(220 15% 14% / 0.6)" }}
                >
                  {s.blurb}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Resend Email — prominent, with countdown + status ── */}
        <div
          className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-sm"
          style={{
            backgroundColor: "hsl(40 18% 95%)",
            border: "0.5px solid hsl(220 15% 14% / 0.12)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-3.5 h-3.5" style={{ color: "hsl(220 15% 14% / 0.5)" }} />
                <p
                  className="font-mono text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "hsl(220 15% 14% / 0.5)" }}
                >
                  STILL NOTHING IN YOUR INBOX?
                </p>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl mb-2" style={{ fontWeight: 400 }}>
                Resend the guide
              </h3>
              <p
                className="font-mono text-[11px] sm:text-[12px] leading-relaxed"
                style={{ color: "hsl(220 15% 14% / 0.6)" }}
              >
                {email ? (
                  <>
                    We'll send it again to{" "}
                    <strong style={{ color: "hsl(220 15% 14%)" }}>{email}</strong>. Check your
                    spam folder too — sometimes it hides there.
                  </>
                ) : (
                  <>
                    Check your spam folder, or email{" "}
                    <a href="mailto:info@moderntech.store" className="underline">
                      info@moderntech.store
                    </a>{" "}
                    and we'll resend manually.
                  </>
                )}
              </p>
            </div>

            <div className="shrink-0 sm:min-w-[220px]">
              <button
                onClick={handleResend}
                disabled={!email || cooldown > 0 || resendStatus === "sending"}
                className="w-full sm:w-auto flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 transition-all duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "hsl(220 15% 14%)",
                  color: "hsl(30 25% 95%)",
                  minWidth: 200,
                }}
              >
                {resendStatus === "sending" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…
                  </>
                ) : cooldown > 0 ? (
                  <>
                    Resend in {cooldown}s
                  </>
                ) : resendStatus === "sent" ? (
                  <>
                    <Send className="w-3 h-3" /> Send Again
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" /> Resend Email
                  </>
                )}
              </button>

              {/* Status line */}
              <div className="mt-3 text-center sm:text-right min-h-[16px]">
                {resendStatus === "sent" && cooldown > 0 && (
                  <p
                    className="font-mono text-[10px] tracking-[0.15em] uppercase flex items-center justify-center sm:justify-end gap-1.5"
                    style={{ color: "hsl(140 40% 35%)" }}
                  >
                    <Check className="w-3 h-3" /> SENT{resendCount > 1 ? ` · ×${resendCount}` : ""}
                  </p>
                )}
                {resendStatus === "error" && (
                  <p
                    className="font-mono text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: "hsl(0 60% 45%)" }}
                  >
                    FAILED — TRY AGAIN
                  </p>
                )}
                {resendStatus === "idle" && !email && (
                  <p
                    className="font-mono text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: "hsl(220 15% 14% / 0.4)" }}
                  >
                    NO EMAIL ON FILE
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Deliverability checklist (print-friendly) ── */}
          <div
            id="deliverability-card"
            className="mt-6 pt-6 deliverability-card"
            style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}
          >
            {/* Print-only header */}
            <div className="print-only mb-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
                MODERN TECH LLC · DELIVERABILITY CARD
              </p>
              <h2 className="font-serif text-3xl mb-1" style={{ fontWeight: 400, lineHeight: 1.1 }}>
                Whitelist & Recover the 2026 Tech Essentials Guide
              </h2>
              <p className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.55)" }}>
                Keep this for later — every step you need to fix inbox delivery in under a minute.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 mb-4 deliverability-card__header">
              <p
                className="font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "hsl(220 15% 14% / 0.5)" }}
              >
                FIX DELIVERY IN 60 SECONDS
              </p>
              <button
                onClick={handlePrintCard}
                aria-label="Print or save deliverability checklist"
                className="no-print flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-2 transition-all duration-200 hover:opacity-85"
                style={{
                  border: "0.5px solid hsl(220 15% 14% / 0.4)",
                  color: "hsl(220 15% 14%)",
                  backgroundColor: "transparent",
                }}
              >
                <Printer className="w-3 h-3" /> PRINT / SAVE
              </button>
            </div>

            {/* Sender address — one-tap copy */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 mb-5 rounded-sm"
              style={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "0.5px solid hsl(220 15% 14% / 0.15)",
              }}
            >
              <div className="min-w-0">
                <p
                  className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "hsl(220 15% 14% / 0.45)" }}
                >
                  SENDER ADDRESS
                </p>
                <p
                  className="font-mono text-[12px] sm:text-[13px] truncate"
                  style={{ color: "hsl(220 15% 14%)" }}
                >
                  {SENDER_EMAIL}
                </p>
              </div>
              <button
                onClick={handleCopySender}
                aria-label="Copy sender email address"
                className="shrink-0 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all duration-200 hover:opacity-85"
                style={{
                  backgroundColor: copied ? "hsl(140 40% 35%)" : "hsl(220 15% 14%)",
                  color: "hsl(30 25% 95%)",
                  minWidth: 130,
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> COPY EMAIL
                  </>
                )}
              </button>
            </div>

            <ul className="space-y-2.5">
              {[
                {
                  k: "01",
                  t: "Check Promotions, Updates & Spam tabs",
                  d: "Gmail and Outlook often filter first-time senders. Search for ‘moderntech’.",
                },
                {
                  k: "02",
                  t: "Add info@moderntech.store to your contacts",
                  d: "This whitelists us so future Sunday edits land in your primary inbox.",
                },
                {
                  k: "03",
                  t: "In Gmail: ‘Mark as not spam’ + drag to Primary",
                  d: "Open the email → tap the three dots → Move to Primary. Done forever.",
                },
                {
                  k: "04",
                  t: "In Outlook/Apple Mail: mark as ‘Not Junk’",
                  d: "Right-click the message → Junk → Not Junk, then add us as a safe sender.",
                },
              ].map((step) => (
                <li
                  key={step.k}
                  className="flex items-start gap-3 sm:gap-4 pb-2.5"
                  style={{ borderBottom: "0.5px solid hsl(220 15% 14% / 0.06)" }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] pt-0.5 shrink-0"
                    style={{ color: "hsl(220 15% 14% / 0.35)" }}
                  >
                    {step.k}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-mono text-[11px] sm:text-[12px] leading-snug"
                      style={{ color: "hsl(220 15% 14%)" }}
                    >
                      {step.t}
                    </p>
                    <p
                      className="font-mono text-[10px] sm:text-[11px] leading-relaxed mt-1"
                      style={{ color: "hsl(220 15% 14% / 0.55)" }}
                    >
                      {step.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Print-only footer */}
            <div className="print-only mt-6 pt-4" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.2)" }}>
              <p className="font-mono text-[10px] leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.65)" }}>
                Still stuck after these steps? Email <strong>info@moderntech.store</strong> and we'll deliver the guide manually within one business day. Visit <strong>https://moderntech.store/free-guide-tech-essentials</strong> to request a fresh copy.
              </p>
              <p className="font-mono text-[9px] mt-3 tracking-[0.2em] uppercase" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
                © Modern Tech LLC · moderntech.store
              </p>
            </div>
          </div>

          <p
            className="font-mono text-[10px] tracking-[0.15em] mt-5 pt-5"
            style={{
              color: "hsl(220 15% 14% / 0.4)",
              borderTop: "0.5px solid hsl(220 15% 14% / 0.1)",
            }}
          >
            STILL STUCK? EMAIL{" "}
            <a href="mailto:info@moderntech.store" className="underline">
              info@moderntech.store
            </a>{" "}
            AND WE'LL DELIVER IT MANUALLY.
          </p>
        </div>

      </section>

      {/* ── Creator Bundle Upsell — editorial card ── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <div
          className="pt-10 sm:pt-16"
          style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.12)" }}
        >
          <div className="grid md:grid-cols-12 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div className="md:col-span-5">
              <p
                className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 sm:mb-6"
                style={{ color: "hsl(220 15% 14% / 0.4)" }}
              >
                ONE-TIME OFFER
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight"
                style={{ fontWeight: 400, lineHeight: 1.05 }}
              >
                Build the Brand<br />Behind the Tech.
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <p
                className="font-mono text-[12px] leading-relaxed"
                style={{ color: "hsl(220 15% 14% / 0.6)" }}
              >
                The Complete Creator Bundle — Reels, Canva, and YouTube master classes — for
                everyone ready to monetize taste, not just consume it.
              </p>
            </div>
          </div>

          <div
            className="relative p-7 sm:p-10 md:p-12 rounded-sm"
            style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
          >
            <div className="absolute -top-3 left-5 sm:left-1/2 sm:-translate-x-1/2">
              <span
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}
              >
                BEST VALUE · SAVE $19
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <Gift className="w-5 h-5" style={{ color: "hsl(14 50% 88%)" }} />
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "hsl(30 25% 95% / 0.5)" }}
              >
                CREATOR BUNDLE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-7 sm:mb-8">
              <h3
                className="font-serif text-2xl sm:text-3xl md:text-4xl max-w-md"
                style={{ fontWeight: 400, lineHeight: 1.1 }}
              >
                The Complete Creator Bundle
              </h3>
              <div className="flex items-baseline gap-2 shrink-0">
                <span
                  className="font-mono text-[11px] line-through"
                  style={{ color: "hsl(30 25% 95% / 0.4)" }}
                >
                  $78
                </span>
                <span className="font-serif text-3xl sm:text-4xl" style={{ color: "hsl(14 50% 88%)" }}>
                  $59
                </span>
              </div>
            </div>

            <ul
              className="space-y-2.5 mb-7 sm:mb-8 pt-5 sm:pt-6"
              style={{ borderTop: "0.5px solid hsl(30 25% 95% / 0.12)" }}
            >
              {[
                "Reels Master Class — short-form that converts",
                "Canva Master Class — design like a brand",
                "YouTube Master Class — long-form growth system",
                "30-day money-back guarantee",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 font-mono text-[11px] sm:text-[12px] leading-relaxed"
                  style={{ color: "hsl(30 25% 95% / 0.85)" }}
                >
                  <Check
                    className="w-3 h-3 mt-1 shrink-0"
                    style={{ color: "hsl(14 50% 88%)" }}
                  />{" "}
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleBundleCheckout}
              disabled={checkoutLoading}
              className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-4 transition-all hover:opacity-90 disabled:opacity-50"
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

          <div className="mt-8 sm:mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: "hsl(220 15% 14% / 0.5)" }}
            >
              NO THANKS — BACK TO HOMEPAGE <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default TechEssentialsSuccess;
