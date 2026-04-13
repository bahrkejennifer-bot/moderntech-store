import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/fitness-trackers-guide-cover.jpg";
import { PinterestSaveButton } from "@/components/PinterestWidgets";
import pinImage from "@/assets/pins/pin-biometric-audit-guide.jpg";

const AFFILIATE_TAG = "moderntechs04-20";

const BiometricAuditGuide = () => {
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: "The-Biometric-Audit-Fitness-Trackers-Guide-ModernTech.pdf",
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
        <title>THE BIOMETRIC AUDIT: 2026 Fitness Tracker Analysis | Modern Tech</title>
        <meta name="description" content="A curated analysis of the fitness trackers that meet the Modern Tech standard — Apple Watch Series 10, Fitbit Charge 6 & WHOOP 4.0." />
        <meta property="og:title" content="THE BIOMETRIC AUDIT — 2026 Fitness Tracker Analysis" />
        <meta property="og:description" content="A study in the intersection of human performance data and wearable design. Three trackers. One standard." />
        <meta property="og:image" content="https://moderntech.store/images/products/oura-ring-4.jpg" />
        <meta property="og:url" content="https://moderntech.store/biometric-audit" />
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
            The Biometric Audit
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8578" }}
          >
            03 &nbsp;// &nbsp;PERFORMANCE DATA &nbsp;// &nbsp;S/S 2026
          </p>
          <p
            className="text-base md:text-lg italic max-w-xl mx-auto mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a5750" }}
          >
            "A study in the intersection of human performance data and the discipline of recovery."
          </p>

          <div className="max-w-[200px] mx-auto mb-10">
            <img
              src={coverImg}
              alt="The Biometric Audit guide cover"
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

          <div className="mt-6 flex justify-center">
            <PinterestSaveButton
              url="https://moderntech.store/biometric-audit"
              media={`https://moderntech.store${pinImage}`}
              description="THE BIOMETRIC AUDIT — 2026 Wearable Health Guide. A curated analysis of the fitness trackers that meet the Modern Tech standard. Apple Watch Series 10, Fitbit Charge 6 & WHOOP 4.0. #FitnessTracker #WearableTech #Biohacking2026"
            />
          </div>
        </div>
      </section>

      {/* ─── PDF Content (hidden, used by html2pdf) ─── */}
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
            The Biometric Audit
          </h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            03 &nbsp;// &nbsp;PERFORMANCE DATA &nbsp;// &nbsp;S/S 2026
          </p>
          <p style={{ fontSize: 18, fontStyle: "italic", color: "#5a5750", maxWidth: 420, margin: "0 auto" }}>
            "Your body is a dataset. These trackers are the analysts."
          </p>
        </div>

        {/* PAGE 1: MANIFESTO */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 24 }}>
            PAGE 01 &nbsp;// &nbsp;THE MANIFESTO
          </p>
          <h3 style={{ fontSize: 32, fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
            Beyond the Step Count
          </h3>
          <div style={{ width: 40, height: 0.5, backgroundColor: "#1a1a18", marginBottom: 24 }} />
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            The fitness tracker market is flooded with devices that count steps and flash notifications. We're not interested in those. We're interested in the ones that understand recovery science, HRV trends, and sleep architecture — the devices that make you a better human, not just a more informed one.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35" }}>
            We've audited the 2026 wearables market to find the only three trackers that meet the Modern Tech standard for data integrity, design, and actionable intelligence.
          </p>
        </div>

        {/* PAGE 2: THE CURATED SELECTION */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            PAGE 02 &nbsp;// &nbsp;THE CURATED SELECTION
          </p>

          {/* Tracker 1 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              01 &nbsp;// &nbsp;THE COMMAND CENTER
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Apple Watch Series 10
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Ecosystem Powerhouse
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> It's not a fitness tracker — it's a health platform on your wrist. Blood oxygen, ECG, temperature sensing, crash detection. It doesn't just track your workout; it might save your life.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> The new depth gauge and water temperature sensor aren't gimmicks — they're Apple's signal that this watch goes wherever you go. Mountain trail, ocean dive, or Monday morning commute.
            </p>
            <a
              href={`https://www.amazon.com/Apple-Watch-Smartwatch-Fitness-Tracker/dp/B0DGJ67YQ4?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW ON AMAZON →
            </a>
          </div>

          {/* Tracker 2 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              02 &nbsp;// &nbsp;THE ACCESSIBLE ANALYST
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Fitbit Charge 6
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Value Proposition
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Google's first real influence on Fitbit shows. YouTube Music controls, Google Maps navigation, and Google Wallet — all on a band-style tracker that lasts 7 days. It's the smartwatch disguised as a fitness band.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> The Daily Readiness Score tells you when to push and when to rest. It's like having a coach who actually understands periodization — at a fraction of the WHOOP price.
            </p>
            <a
              href={`https://www.amazon.com/Fitbit-Fitness-Tracker-Heart-Built/dp/B0CC62MKWF?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW ON AMAZON →
            </a>
          </div>

          {/* Tracker 3 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              03 &nbsp;// &nbsp;THE PERFORMANCE LAB
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              WHOOP 4.0
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Athlete's Edge
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> No screen. No notifications. Just data. WHOOP strips away every distraction and focuses on one thing: optimizing your strain-recovery balance. It's the anti-smartwatch for people who are serious about performance.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> Sleep Coach doesn't just track your sleep — it prescribes exactly how much you need based on your next-day goals. Tell it you're running a half-marathon tomorrow and it calculates your ideal bedtime to the minute.
            </p>
            <a
              href={`https://www.amazon.com/WHOOP-4-0-Month-Subscription-Optimization/dp/B0BXBFHWB6?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW ON AMAZON →
            </a>
          </div>
        </div>

        {/* PAGE 3: THE VERDICT */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 24 }}>
            PAGE 03 &nbsp;// &nbsp;THE VERDICT
          </p>
          <h3 style={{ fontSize: 32, fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
            Our Recommendation
          </h3>
          <div style={{ width: 40, height: 0.5, backgroundColor: "#1a1a18", marginBottom: 24 }} />
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            <strong>For the all-rounder:</strong> Apple Watch Series 10. If you want health tracking, smart features, and safety tools in one device, nothing competes.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            <strong>For the budget-conscious optimizer:</strong> Fitbit Charge 6. Seven-day battery, Google integration, and genuine health insights at under $160.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 24 }}>
            <strong>For the performance purist:</strong> WHOOP 4.0. If you train seriously and want data without distraction, this is the only answer. The subscription model isn't cheap, but the insights are unmatched.
          </p>
          <div style={{ borderTop: "0.5px solid #d4d0c8", paddingTop: 24 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#8a8578" }}>
              As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. #ad
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#8a8578", marginTop: 8 }}>
              © {new Date().getFullYear()} Modern Tech LLC · moderntech-store.lovable.app
            </p>
          </div>
        </div>
      </div>

      <AffiliateFooter />
    </div>
  );
};

export default BiometricAuditGuide;
