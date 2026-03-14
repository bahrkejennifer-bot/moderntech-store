import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Download, CheckCircle, ArrowRight, Home, Monitor, Headphones, GraduationCap, Activity, Baby, BookOpen, Loader2, Briefcase, DollarSign } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Import cover images
import kidsTechCover from "@/assets/pdf-covers/kids-tech-guide-cover.jpg";
import smartHomeCover from "@/assets/pdf-covers/smart-home-guide-cover.jpg";
import gamingMonitorsCover from "@/assets/pdf-covers/gaming-monitors-guide-cover.jpg";
import earbudsCover from "@/assets/pdf-covers/earbuds-guide-cover.jpg";
import studentTechCover from "@/assets/pdf-covers/student-tech-guide-cover.jpg";
import fitnessTrackersCover from "@/assets/pdf-covers/fitness-trackers-guide-cover.jpg";
import remoteWorkspaceCover from "@/assets/pdf-covers/remote-workspace-guide-cover.jpg";
import valentineFamilyCover from "@/assets/pdf-covers/valentine-family-tech-guide-cover.jpg";
import smartRingCover from "@/assets/pdf-covers/smart-ring-guide-cover.jpg";

interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number | null;
  is_free: boolean | null;
  pdf_path: string | null;
}

// Map slugs to cover images
const productMeta: Record<string, { cover: string; icon: React.ReactNode }> = {
  "valentine-family-tech-guide": { cover: smartRingCover, icon: <BookOpen className="h-4 w-4" /> },
  "kids-tech-guide": { cover: kidsTechCover, icon: <Baby className="h-4 w-4" /> },
  "smart-home-guide": { cover: smartHomeCover, icon: <Home className="h-4 w-4" /> },
  "gaming-monitors-guide": { cover: gamingMonitorsCover, icon: <Monitor className="h-4 w-4" /> },
  "earbuds-guide": { cover: earbudsCover, icon: <Headphones className="h-4 w-4" /> },
  "student-tech-guide": { cover: studentTechCover, icon: <GraduationCap className="h-4 w-4" /> },
  "fitness-trackers-guide": { cover: fitnessTrackersCover, icon: <Activity className="h-4 w-4" /> },
  "remote-workspace-guide": { cover: remoteWorkspaceCover, icon: <Briefcase className="h-4 w-4" /> },
  "smart-ring-guide": { cover: smartRingCover, icon: <BookOpen className="h-4 w-4" /> },
};

// Editorial rename map
const editorialNames: Record<string, string> = {
  "earbuds-guide": "THE SONIC EDIT",
  "fitness-trackers-guide": "THE BIOMETRIC AUDIT",
  "valentine-family-tech-guide": "The Architecture of Wellness: A 2026 Smart Ring Analysis",
  "smart-ring-guide": "The Architecture of Wellness: Smart Ring Buyer's Guide",
};

// Slugs that have dedicated pages instead of PDF downloads
const dedicatedPageSlugs: Record<string, string> = {
  "valentine-family-tech-guide": "/wellness-smart-ring-analysis",
  "smart-ring-guide": "/wellness-smart-ring-analysis",
};

const DigitalProducts = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [emailGateId, setEmailGateId] = useState<string | null>(null);
  const [gateEmail, setGateEmail] = useState("");
  const [gateName, setGateName] = useState("");
  const [submittingGate, setSubmittingGate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const productSlug = searchParams.get("product");

    if (success === "true") {
      toast({
        title: "Download Ready",
        description: `Your ${productSlug?.replace(/-/g, " ") || "guide"} is available now.`,
      });
      setSearchParams({});
    } else if (canceled === "true") {
      toast({
        title: "Canceled",
        description: "No worries — come back anytime.",
        variant: "destructive",
      });
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products_public")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching products:", error);
      toast({ title: "Error", description: "Failed to load products", variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleDownload = async (product: DigitalProduct) => {
    // Navigate to dedicated page if one exists
    const dedicatedPage = dedicatedPageSlugs[product.slug];
    if (dedicatedPage) {
      navigate(dedicatedPage);
      return;
    }

    if (!product.pdf_path) {
      toast({ title: "Not Yet Available", description: "This edit is coming soon.", variant: "destructive" });
      return;
    }

    // Show email gate instead of direct download
    setEmailGateId(product.id);
    setGateEmail("");
    setGateName("");
  };

  const handleEmailGateSubmit = async (product: DigitalProduct) => {
    if (!gateEmail.trim() || !gateName.trim()) {
      toast({ title: "Required", description: "Please enter your name and email.", variant: "destructive" });
      return;
    }

    setSubmittingGate(true);
    try {
      // Capture lead
      await supabase.from("lead_captures").insert({
        name: gateName.trim(),
        email: gateEmail.trim(),
        lead_magnet: product.slug,
      });

      // Generate download link
      const { data, error } = await supabase.functions.invoke("generate-download-link", {
        body: { productId: product.id },
      });
      if (error) throw error;
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
        toast({ title: "Download Started", description: `Opening ${product.title} now.` });
      } else {
        throw new Error(data?.error || "Failed to generate download URL");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({ title: "Download Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmittingGate(false);
      setEmailGateId(null);
    }
  };

  const getDisplayTitle = (product: DigitalProduct) => {
    return editorialNames[product.slug] || product.title;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const freeProduct = products.find((p) => p.is_free);
  const paidProducts = products.filter((p) => !p.is_free);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F7F2", color: "#1a1a18" }}>
      <Helmet>
        <title>The Edit — Curated Tech Guides | Modern Tech</title>
        <meta name="description" content="Curated digital guides for the discerning tech enthusiast — smart home, wellness, gaming, and beyond." />
        <meta property="og:title" content="The Edit — Curated Tech Guides | Modern Tech" />
        <meta property="og:description" content="Curated digital guides for the discerning tech enthusiast." />
        <meta property="og:url" content="https://moderntech.store/digital-products" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      {/* Editorial Header */}
      <header className="max-w-5xl mx-auto px-8 pt-16 pb-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "#6b6860" }}>
          The Modern Tech Library
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400, color: "#1a1a18" }}>
          The Edit
        </h1>
        <p className="mt-6 font-mono text-[11px] tracking-[0.15em] uppercase max-w-lg mx-auto leading-[2]" style={{ color: "#6b6860" }}>
          Expert-curated guides designed to cut through the noise. Every recommendation is tested, every word intentional.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-8 pb-4">
        <div className="h-px" style={{ backgroundColor: "#d4d0c8" }} />
      </div>

      {/* Free Product — Lead Magnet */}
      {freeProduct && (
        <section className="max-w-5xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: "0.5px solid #d4d0c8" }}>
            <div className="aspect-square md:aspect-auto overflow-hidden" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}>
              <img
                src={productMeta[freeProduct.slug]?.cover || smartRingCover}
                alt={getDisplayTitle(freeProduct)}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block" style={{ color: "#6b6860" }}>
                Complimentary Download
              </span>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-4" style={{ fontStyle: "italic", fontWeight: 400, color: "#1a1a18" }}>
                {getDisplayTitle(freeProduct)}
              </h2>
              <p className="font-mono text-[11px] leading-[1.8] mb-6" style={{ color: "#6b6860" }}>
                {freeProduct.description || "A comprehensive analysis of the smart ring landscape — health tracking, design, and the technology shaping how we live."}
              </p>
              <div className="space-y-2 mb-8">
                {["The Science of Wearable Wellness", "Smart ring comparisons across every price point", "Sleep, recovery & readiness — decoded"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[10px] mt-0.5" style={{ color: "#9a958c" }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[11px]" style={{ color: "#3a3a35" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6" style={{ borderTop: "0.5px solid #d4d0c8" }}>
                {dedicatedPageSlugs[freeProduct.slug] ? (
                  <Link to={dedicatedPageSlugs[freeProduct.slug]}>
                    <button
                      className="inline-flex items-center gap-2 h-10 px-6 bg-transparent font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
                      style={{ border: "0.5px solid #3a3a35", color: "#1a1a18" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a18"; e.currentTarget.style.color = "#F9F7F2"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a18"; }}
                    >
                      <Download className="h-3 w-3" />
                      Download the Edit
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </Link>
                ) : (
                  <>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "#6b6860" }}>
                      Enter your email for instant access
                    </p>
                    <NewsletterSignup campaignId="CiFHU" className="max-w-sm" />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px" style={{ backgroundColor: "#d4d0c8" }} />
      </div>

      {/* All Guides Grid */}
      {paidProducts.length > 0 && (
        <section className="max-w-5xl mx-auto px-8 py-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-10 text-center" style={{ color: "#6b6860" }}>
            The Complete Collection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" style={{ borderTop: "0.5px solid #d4d0c8", borderLeft: "0.5px solid #d4d0c8" }}>
            {paidProducts.map((product) => (
              <div key={product.id} className="group" style={{ borderRight: "0.5px solid #d4d0c8", borderBottom: "0.5px solid #d4d0c8" }}>
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden" style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.12))" }}>
                  <img
                    src={productMeta[product.slug]?.cover || smartHomeCover}
                    alt={getDisplayTitle(product)}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-[50%]"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-2" style={{ color: "#9a958c" }}>
                    Expert Curated
                  </span>
                  <h3 className="font-serif text-lg leading-snug mb-2" style={{ fontStyle: "italic", color: "#1a1a18" }}>
                    {getDisplayTitle(product)}
                  </h3>
                  <p className="font-mono text-[10px] leading-[1.7] mb-4 line-clamp-2" style={{ color: "#6b6860" }}>
                    {product.description || "Your comprehensive buying guide"}
                  </p>

                  {emailGateId === product.id ? (
                    /* Email capture gate */
                    <div className="space-y-3 pt-2" style={{ borderTop: "0.5px solid #d4d0c8" }}>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase pt-3" style={{ color: "#6b6860" }}>
                        Enter your details for instant access
                      </p>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={gateName}
                        onChange={(e) => setGateName(e.target.value)}
                        className="w-full h-9 px-3 font-mono text-[11px] bg-transparent outline-none"
                        style={{ border: "0.5px solid #d4d0c8", color: "#1a1a18" }}
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={gateEmail}
                        onChange={(e) => setGateEmail(e.target.value)}
                        className="w-full h-9 px-3 font-mono text-[11px] bg-transparent outline-none"
                        style={{ border: "0.5px solid #d4d0c8", color: "#1a1a18" }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEmailGateSubmit(product)}
                          disabled={submittingGate}
                          className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-50"
                          style={{ backgroundColor: "#1a1a18", color: "#F9F7F2" }}
                        >
                          {submittingGate ? <Loader2 className="h-3 w-3 animate-spin" /> : <>Get the Edit <ArrowRight className="h-3 w-3" /></>}
                        </button>
                        <button
                          onClick={() => setEmailGateId(null)}
                          className="h-9 px-3 font-mono text-[10px] uppercase"
                          style={{ color: "#9a958c" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] tracking-[0.1em] uppercase font-medium" style={{ color: "#c9a0a0" }}>
                        FREE
                      </span>
                      <button
                        onClick={() => handleDownload(product)}
                        className="inline-flex items-center gap-2 h-9 px-5 bg-transparent font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
                        style={{ border: "0.5px solid #3a3a35", color: "#1a1a18" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a18"; e.currentTarget.style.color = "#F9F7F2"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a18"; }}
                      >
                        Download the Edit
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Amazon Associate Guide Banner */}
      <section className="max-w-5xl mx-auto px-8 pb-16">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8" style={{ border: "0.5px solid #d4d0c8" }}>
          <div className="flex-1">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: "#6b6860" }}>
              Complimentary Resource
            </span>
            <h3 className="font-serif text-2xl leading-tight mb-3" style={{ fontStyle: "italic", fontWeight: 400, color: "#1a1a18" }}>
              Amazon Associate Quick-Start Guide
            </h3>
            <p className="font-mono text-[11px] leading-[1.8]" style={{ color: "#6b6860" }}>
              Learn how to sign up, create links, and earn your first commissions — 5 actionable pages, instant PDF download.
            </p>
          </div>
          <Link to="/amazon-associate-guide">
            <button
              className="inline-flex items-center gap-2 h-10 px-6 bg-transparent font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap"
              style={{ border: "0.5px solid #3a3a35", color: "#1a1a18" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a1a18"; e.currentTarget.style.color = "#F9F7F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a1a18"; }}
            >
              <Download className="h-3 w-3" />
              Get Free Guide
            </button>
          </Link>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default DigitalProducts;
