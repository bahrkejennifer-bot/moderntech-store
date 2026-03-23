import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const BlueprintSuccess = () => {
  return (
    <div className="vogue-theme min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>You're In! — Amazon Affiliate Blueprint 2026</title>
        <meta name="description" content="Thank you for your purchase. Check your email for your download link." />
      </Helmet>
      <Navigation />

      <section className="max-w-[600px] mx-auto px-8 pt-28 pb-20 text-center">
        <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center" style={{ border: "0.5px solid hsl(40 10% 12% / 0.15)" }}>
          <Check className="w-8 h-8" style={{ color: "hsl(40 10% 12% / 0.6)" }} />
        </div>

        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 10% 12% / 0.45)" }}>
          PURCHASE CONFIRMED
        </p>

        <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6" style={{ fontWeight: 400 }}>
          You're in! 🎯
        </h1>

        <p className="font-serif text-lg leading-relaxed mb-4" style={{ fontWeight: 300, color: "hsl(40 10% 12% / 0.7)" }}>
          Check your email for your download link.
        </p>
        <p className="font-serif text-lg leading-relaxed mb-12" style={{ fontWeight: 300, color: "hsl(40 10% 12% / 0.7)" }}>
          Welcome to the Modern Tech family.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}
        >
          Back to Homepage <ArrowRight className="w-3 h-3" />
        </Link>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default BlueprintSuccess;
