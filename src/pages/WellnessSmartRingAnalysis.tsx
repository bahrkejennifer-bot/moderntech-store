import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Loader2, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/smart-ring-guide-cover.jpg";

const AFFILIATE_TAG = "moderntechs04-20";

const WellnessSmartRingAnalysis = () => {
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: "Architecture-of-Wellness-Smart-Ring-Analysis-ModernTech.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], before: ".pdf-page-break" },
      };
      await html2pdf().set(opt).from(contentRef.current).save();
      toast({ title: "Download complete", description: "Your guide has been saved as a PDF." });
    } catch {
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>The Architecture of Wellness: 2026 Smart Ring Analysis | Modern Tech</title>
        <meta name="description" content="A curated analysis of the three smart rings that meet the Modern Tech standard — Oura Ring 4, Ultrahuman Ring Air & Samsung Galaxy Ring." />
        <meta property="og:title" content="The Architecture of Wellness — 2026 Smart Ring Analysis" />
        <meta property="og:description" content="A study in the intersection of biological data and high-end jewelry. Three rings. One standard." />
        <meta property="og:image" content="https://moderntech.store/images/products/smart-ring-guide-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/wellness-smart-ring-analysis" />
        <meta property="og:type" content="article" />
        <meta name="author" content="Modern Tech LLC" />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p
            className="text-[9px] tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8578" }}
          >
            THE SIGNAL &nbsp;// &nbsp;SPECIAL EDIT
          </p>
          <h1
            className="text-4xl md:text-6xl font-light italic mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a1a18" }}
          >
            The Architecture of Wellness
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8578" }}
          >
            01 &nbsp;// &nbsp;AMBIENT BIOMETRICS &nbsp;// &nbsp;S/S 2026
          </p>
          <p
            className="text-base md:text-lg italic max-w-xl mx-auto mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a5750" }}
          >
            "A study in the intersection of biological data and high-end jewelry."
          </p>

          <div className="max-w-[200px] mx-auto mb-10">
            <img
              src={coverImg}
              alt="Architecture of Wellness guide cover"
              className="w-full grayscale"
              style={{ filter: "grayscale(100%) contrast(1.05)", boxShadow: "0 20px 60px -15px rgba(0,0,0,0.2)" }}
            />
          </div>

          <Button
            size="lg"
            onClick={handleDownload}
            disabled={downloading}
            className="bg-transparent border border-foreground/30 text-foreground hover:bg-foreground hover:text-background rounded-none px-10 py-5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {downloading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF…</>
            ) : (
              <><Download className="mr-2 h-4 w-4" /> Download the Edit</>
            )}
          </Button>
        </div>
      </section>

      {/* ─── PDF Content (hidden-like, used by html2pdf) ─── */}
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto px-6"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#1a1a18",
          backgroundColor: "#F9F7F2",
          lineHeight: 1.7,
        }}
      >
        {/* COVER */}
        <div style={{ textAlign: "center", padding: "80px 20px 60px" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: "#8a8578", marginBottom: 32, textTransform: "uppercase" }}>
            THE SIGNAL &nbsp;// &nbsp;SPECIAL EDIT
          </p>
          <h2 style={{ fontSize: 42, fontWeight: 300, fontStyle: "italic", marginBottom: 16 }}>
            The Architecture of Wellness
          </h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            01 &nbsp;// &nbsp;AMBIENT BIOMETRICS &nbsp;// &nbsp;S/S 2026
          </p>
          <p style={{ fontSize: 18, fontStyle: "italic", color: "#5a5750", maxWidth: 420, margin: "0 auto" }}>
            "A study in the intersection of biological data and high-end jewelry."
          </p>
        </div>

        {/* PAGE 1: MANIFESTO */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 24 }}>
            PAGE 01 &nbsp;// &nbsp;THE MANIFESTO
          </p>
          <h3 style={{ fontSize: 32, fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
            Beyond the Screen
          </h3>
          <div style={{ width: 40, height: 0.5, backgroundColor: "#1a1a18", marginBottom: 24 }} />
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            We believe that the most powerful technology is the kind you forget you're wearing. Wellness isn't a "clunky" dashboard; it's a quiet rhythm.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35" }}>
            We've audited the 2026 wearables market to find the only three rings that meet the Modern Tech standard for aesthetic precision and human-centric data.
          </p>
        </div>

        {/* PAGE 2: THE CURATED SELECTION */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            PAGE 02 &nbsp;// &nbsp;THE CURATED SELECTION
          </p>

          {/* Ring 1 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              01 &nbsp;// &nbsp;THE GOLD STANDARD
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              The Oura Ring 4
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Essential Heritage Piece
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Understated luxury. It's the original for a reason. The Horizon finish in Brushed Silver or Rose Gold doesn't just track your sleep; it complements your wardrobe.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> It knows when you're stressed before you do, whispering data through your phone without ever needing a screen.
            </p>
            <a
              href={`https://www.amazon.com/Oura-Ring-Gen-3-Horizon/dp/B0CSQFRKPC?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW THE CURRENT FINISHES ON AMAZON →
            </a>
          </div>

          {/* Ring 2 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              02 &nbsp;// &nbsp;THE MINIMALIST
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Ultrahuman Ring Air
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Engineering Feat
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Impossible lightness. Crafted from fighter-jet grade titanium, this is for the creator who wants zero friction.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> Focuses on your "Metabolic Map." It helps you time your caffeine and your rest so your creative output remains peaked.
            </p>
            <a
              href={`https://www.amazon.com/Ultrahuman-Ring-AIR-Comfortable-Titanium/dp/B0CYD62LP6?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              EXPLORE THE ULTRAHUMAN COLLECTION →
            </a>
          </div>

          {/* Ring 3 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              03 &nbsp;// &nbsp;THE NEW FRONTIER
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Samsung Galaxy Ring
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Ecosystem Master
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Seamless integration. If your home and life are already connected, this is the final piece of the puzzle.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> Uses AI to predict your energy levels for the day, ensuring your appointments and your recovery are always in sync.
            </p>
            <a
              href={`https://www.amazon.com/SAMSUNG-Galaxy-Titanium-Tracking-Improved/dp/B0D7DMP2V9?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              SHOP THE GALAXY RING ON AMAZON →
            </a>
          </div>
        </div>

        {/* PAGE 3: THE FINISHES */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 24 }}>
            PAGE 03 &nbsp;// &nbsp;THE FINISHES
          </p>
          <h3 style={{ fontSize: 28, fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
            A Note on Aesthetics
          </h3>
          <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 24 }}>
            When choosing your finish, consider your daily "Uniform."
          </p>

          {[
            { finish: "Matte Black", desc: "For the architectural, stealth look." },
            { finish: "Brushed Silver", desc: "The timeless choice for the silver laptop aesthetic." },
            { finish: "Rose Gold / Gold", desc: "To pair with high-end jewelry and warm-toned workspace accents." },
          ].map((item) => (
            <div key={item.finish} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: "0.5px solid #d4d0c8" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.1em", marginBottom: 4, fontWeight: 600 }}>
                {item.finish}
              </p>
              <p style={{ fontSize: 15, color: "#5a5750" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* BACK COVER */}
        <div className="pdf-page-break" />
        <div style={{ textAlign: "center", padding: "100px 20px 80px" }}>
          <h3 style={{ fontSize: 36, fontWeight: 300, fontStyle: "italic", marginBottom: 24 }}>
            THE SIGNAL
          </h3>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: "#8a8578", textTransform: "uppercase", lineHeight: 2, maxWidth: 400, margin: "0 auto 40px" }}>
            TECH TODAY. TREND TOMORROW.<br />
            CREATING A LIFE WE HAVE YET TO IMAGINE.
          </p>
          <div style={{ width: 40, height: 0.5, backgroundColor: "#d4d0c8", margin: "0 auto 32px" }} />
          <p style={{ fontSize: 14, fontStyle: "italic", color: "#8a8578" }}>
            Coming Next Tuesday: <em>The Architecture of Recovery</em> — Is the High Peak Massage Chair worth the investment?
          </p>
        </div>
      </div>

      {/* CTA after PDF content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div style={{ width: 40, height: 0.5, backgroundColor: "#d4d0c8", margin: "0 auto 24px" }} />
          <p
            className="text-sm mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8578", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Ready to find your ring?
          </p>
          <Button
            variant="outline"
            className="rounded-none border-foreground/30 hover:bg-foreground hover:text-background px-8 py-5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            asChild
          >
            <a href="/health-wellness">
              Shop Smart Rings <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default WellnessSmartRingAnalysis;
