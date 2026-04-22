import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const productLabels: Record<string, string> = {
  "canva-masterclass": "Canva Masterclass",
  "faceless-youtube-automation": "Faceless YouTube Automation",
  "creator-bundle": "The Complete Creator Bundle",
};

const CreatorFunnelSuccess = () => {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "";
  const label = productLabels[product] || "your guide";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(30 25% 95%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Thank You — ModernTech</title>
      </Helmet>
      <Navigation />

      <section className="max-w-lg mx-auto px-8 pt-32 pb-20 text-center">
        <CheckCircle className="w-12 h-12 mx-auto mb-6" style={{ color: "hsl(140 40% 40%)" }} />
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
          You're In! 🎉
        </h1>
        <p className="font-mono text-[12px] leading-relaxed mb-8" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
          Your purchase of <strong>{label}</strong> is confirmed. Check your email for your download link — it should arrive within a few minutes.
        </p>

        <div className="p-6 rounded-sm mb-8" style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
          <Mail className="w-5 h-5 mx-auto mb-3" style={{ color: "hsl(220 15% 14% / 0.3)" }} />
          <p className="font-mono text-[11px]" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
            Didn't get the email? Check your spam folder or contact us at <a href="mailto:info@moderntech.store" className="underline">info@moderntech.store</a>
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
        >
          Back to Home <ArrowRight className="w-3 h-3" />
        </Link>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default CreatorFunnelSuccess;
