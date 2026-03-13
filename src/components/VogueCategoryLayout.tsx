import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

interface VogueCategoryLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const VogueCategoryLayout = ({ title, subtitle, children }: VogueCategoryLayoutProps) => {
  return (
    <>
      <Navigation />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-8 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-8 pt-10 pb-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
          {title}
        </h1>
        <p className="mt-5 font-mono text-[10px] text-muted-foreground max-w-md mx-auto leading-[1.8]">
          {subtitle}
        </p>
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-8">
          As an Amazon Associate, I earn from qualifying purchases
        </p>
      </header>

      {/* Editorial divider */}
      <div className="max-w-5xl mx-auto px-8 pb-12">
        <div className="h-px bg-border" />
      </div>

      {/* Product grid */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {children}
        </div>
      </section>

      <AffiliateFooter />
    </>
  );
};

export default VogueCategoryLayout;
