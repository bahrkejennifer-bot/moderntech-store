import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Sparkles, Video, Palette, Youtube, Gift, Loader2 } from "lucide-react";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { requestLeadConfirmation, CHECK_INBOX_MESSAGE, ALREADY_CONFIRMED_MESSAGE } from "@/lib/leadConfirmation";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your first name").max(100, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(255, "Email is too long"),
});

const tiers = [
  {
    slug: "faceless-reels-guide",
    name: "Reels Master Class",
    tagline: "Learn to create attention-grabbing reels",
    price: "FREE",
    priceNum: 0,
    icon: Video,
    features: [
      "Hooks and content ideas that grab attention",
      "Structure tips for better short-form videos",
      "Practical strategies to grow your brand",
      "Easy-to-follow format for beginners",
    ],
    isFree: true,
  },
  {
    slug: "canva-masterclass",
    name: "Canva Master Class",
    tagline: "Design polished content without feeling overwhelmed",
    price: "$29",
    priceNum: 2900,
    icon: Palette,
    features: [
      "Design tips for polished, professional content",
      "Branding guidance to build a consistent look",
      "Layout ideas for social media & digital products",
      "Practical ways to create beautiful content faster",
    ],
    isFree: false,
  },
  {
    slug: "faceless-youtube-automation",
    name: "YouTube Master Class",
    tagline: "Build smarter YouTube content with practical strategies",
    price: "$49",
    priceNum: 4900,
    icon: Youtube,
    features: [
      "Planning tips to structure your content strategy",
      "Video flow guidance for engaging videos",
      "Channel growth ideas to build your audience",
      "Guidance for creating useful, engaging content",
      "Bonus: 30-day launch plan",
    ],
    isFree: false,
  },
];

const CreatorFunnel = () => {
  const [step, setStep] = useState<"gate" | "upsell">("gate");
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleFreeDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({ name: fieldErrors.name?.[0], email: fieldErrors.email?.[0] });
      toast.error(fieldErrors.email?.[0] || fieldErrors.name?.[0] || "Please check the form");
      return;
    }
    setLoading(true);
    const { name, email } = parsed.data;
    try {
      const result = await requestLeadConfirmation({
        name, email, lead_magnet: "faceless-reels-guide",
      });
      if (!result.success) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }
      setForm({ name, email });
      toast.success(result.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE);
      setStep("upsell");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (slug: string, name: string, amount: number) => {
    setCheckoutLoading(slug);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: name,
          productSlug: slug,
          amount,
          successUrl: `https://moderntech.store/creator-funnel/success?product=${slug}`,
          cancelUrl: "https://moderntech.store/creator-funnel",
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Creator Content Bundle — ModernTech</title>
        <meta name="description" content="Get the complete faceless content creation system. Free Reels guide, Canva Masterclass, and Faceless YouTube Automation — or grab the bundle and save." />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
          MODERN TECH DIGITAL GUIDES
        </p>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-6" style={{ fontWeight: 400 }}>
          Start Building Better<br />Content Today
        </h1>
        <p className="font-mono text-[12px] tracking-[0.05em] max-w-xl mx-auto leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
          Get the Reels Master Class free — then unlock the full system to design, create, and grow your content with confidence.
        </p>
      </section>

      {step === "gate" ? (
        /* ── FREE EMAIL GATE ── */
        <section className="max-w-md mx-auto px-6 pb-20">
          <div className="p-8 rounded-sm" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Video className="w-5 h-5" style={{ color: "hsl(220 15% 14% / 0.4)" }} />
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
                FREE DOWNLOAD
              </p>
            </div>
            <h2 className="font-serif text-2xl text-center mb-2" style={{ fontWeight: 400 }}>
              Reels Master Class
            </h2>
            <p className="font-mono text-[11px] text-center mb-6 leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              The Reels Master Class helps you create stronger short-form videos with better hooks, clearer structure, and more engaging content ideas so you can show up with confidence.
            </p>

            <form onSubmit={handleFreeDownload} className="space-y-3" noValidate>
              <div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                  placeholder="Your first name"
                  maxLength={100}
                  autoComplete="given-name"
                  aria-invalid={!!errors.name}
                  className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
                  style={{ border: `0.5px solid ${errors.name ? "hsl(0 65% 50%)" : "hsl(220 15% 14% / 0.2)"}`, color: "hsl(220 15% 14%)" }}
                />
                {errors.name && (
                  <p className="font-mono text-[10px] mt-1" style={{ color: "hsl(0 65% 45%)" }}>{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  placeholder="Your email"
                  maxLength={255}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!errors.email}
                  className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
                  style={{ border: `0.5px solid ${errors.email ? "hsl(0 65% 50%)" : "hsl(220 15% 14% / 0.2)"}`, color: "hsl(220 15% 14%)" }}
                />
                {errors.email && (
                  <p className="font-mono text-[10px] mt-1" style={{ color: "hsl(0 65% 45%)" }}>{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get Your Free Guide <ArrowRight className="w-3 h-3" /></>}
              </button>
              <p className="font-mono text-[9px] text-center" style={{ color: "hsl(220 15% 14% / 0.35)" }}>
                We'll never share your email. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Preview of what's coming */}
          <div className="mt-12 text-center">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(220 15% 14% / 0.3)" }}>
              WANT MORE? UNLOCK THE FULL SYSTEM ↓
            </p>
            <div className="flex items-center justify-center gap-6">
              {[Palette, Youtube, Gift].map((Icon, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <Icon className="w-5 h-5" style={{ color: "hsl(220 15% 14% / 0.25)" }} />
                  <span className="font-mono text-[9px]" style={{ color: "hsl(220 15% 14% / 0.3)" }}>
                    {["$29", "$49", "$59"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* ── UPSELL SECTION ── */
        <section className="max-w-5xl mx-auto px-6 pb-20">
          {/* Success banner */}
          <div className="text-center mb-12 p-6 rounded-sm" style={{ backgroundColor: "hsl(140 30% 92%)", border: "0.5px solid hsl(140 30% 70% / 0.3)" }}>
            <Check className="w-6 h-6 mx-auto mb-2" style={{ color: "hsl(140 40% 40%)" }} />
            <p className="font-serif text-lg mb-1">Your Reels Guide is on its way!</p>
            <p className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              Check your inbox at <strong>{form.email}</strong>
            </p>
          </div>

          <div className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
              LEVEL UP YOUR CREATOR GAME
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-3" style={{ fontWeight: 400 }}>
              Go Further, Faster
            </h2>
            <p className="font-mono text-[11px] max-w-lg mx-auto" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              You've got the Reels guide — now unlock the full system.
            </p>
          </div>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* $29 Canva */}
            <TierCard
              tier={tiers[1]}
              onCheckout={() => handleCheckout("canva-masterclass", "Canva Masterclass", 2900)}
              loading={checkoutLoading === "canva-masterclass"}
            />
            {/* $49 YouTube */}
            <TierCard
              tier={tiers[2]}
              onCheckout={() => handleCheckout("faceless-youtube-automation", "Faceless YouTube Automation", 4900)}
              loading={checkoutLoading === "faceless-youtube-automation"}
            />
            {/* $59 Bundle */}
            <div className="relative p-6 rounded-sm" style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)", border: "0.5px solid hsl(220 15% 14%)" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}>
                  BEST VALUE
                </span>
              </div>
              <Gift className="w-6 h-6 mx-auto mb-3" style={{ color: "hsl(14 50% 88%)" }} />
              <h3 className="font-serif text-xl text-center mb-1">The Complete Bundle</h3>
              <p className="font-mono text-[10px] text-center mb-4" style={{ color: "hsl(30 25% 95% / 0.5)" }}>
                All three guides — one price
              </p>
              <div className="text-center mb-4">
                <span className="font-mono text-[11px] line-through mr-2" style={{ color: "hsl(30 25% 95% / 0.4)" }}>$78</span>
                <span className="font-serif text-3xl" style={{ color: "hsl(14 50% 88%)" }}>$59</span>
              </div>
              <ul className="space-y-2 mb-6">
                {["Everything in Faceless Reels Guide", "Everything in Canva Masterclass", "Everything in YouTube Automation", "Save $19 vs buying separately"].map((f) => (
                  <li key={f} className="flex items-start gap-2 font-mono text-[11px]" style={{ color: "hsl(30 25% 95% / 0.8)" }}>
                    <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "hsl(14 50% 88%)" }} /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout("creator-bundle", "The Complete Creator Bundle", 5900)}
                disabled={checkoutLoading === "creator-bundle"}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-4 transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}
              >
                {checkoutLoading === "creator-bundle" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get the Bundle <Sparkles className="w-3 h-3" /></>}
              </button>
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center pt-8" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
              30-DAY MONEY-BACK GUARANTEE
            </p>
            <p className="font-mono text-[11px] max-w-md mx-auto" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              Not satisfied? We'll refund every penny — no questions asked.
            </p>
          </div>
        </section>
      )}

      <AffiliateFooter />
    </div>
  );
};

/* ── Tier Card Component ── */
interface TierCardProps {
  tier: typeof tiers[0];
  onCheckout: () => void;
  loading: boolean;
}

const TierCard = ({ tier, onCheckout, loading }: TierCardProps) => {
  const Icon = tier.icon;
  return (
    <div className="p-6 rounded-sm flex flex-col" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
      <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: "hsl(220 15% 14% / 0.4)" }} />
      <h3 className="font-serif text-xl text-center mb-1">{tier.name}</h3>
      <p className="font-mono text-[10px] text-center mb-4" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
        {tier.tagline}
      </p>
      <div className="text-center mb-4">
        <span className="font-serif text-3xl">{tier.price}</span>
      </div>
      <ul className="space-y-2 mb-6 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.7)" }}>
            <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "hsl(220 15% 14% / 0.4)" }} /> {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onCheckout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-6 py-4 transition-all hover:opacity-80 disabled:opacity-50"
        style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get {tier.name} <ArrowRight className="w-3 h-3" /></>}
      </button>
    </div>
  );
};

export default CreatorFunnel;
