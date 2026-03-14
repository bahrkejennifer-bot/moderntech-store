import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/earbuds-guide-cover.jpg";
import { PinterestSaveButton } from "@/components/PinterestWidgets";
import pinImage from "@/assets/pins/pin-sonic-edit-guide.jpg";

const AFFILIATE_TAG = "moderntechs0c-20";

const SonicEditGuide = () => {
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: "The-Sonic-Edit-Wireless-Earbuds-Guide-ModernTech.pdf",
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
        <title>THE SONIC EDIT: 2026 Wireless Earbuds Analysis | Modern Tech</title>
        <meta name="description" content="A curated analysis of the wireless earbuds that meet the Modern Tech standard — AirPods Pro 2, Sony WH-1000XM5 & Samsung Galaxy Buds2 Pro." />
        <meta property="og:title" content="THE SONIC EDIT — 2026 Wireless Earbuds Analysis" />
        <meta property="og:description" content="A study in the intersection of acoustic engineering and daily ritual. Three picks. One standard." />
        <meta property="og:url" content="https://moderntech.store/sonic-edit" />
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
            The Sonic Edit
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8578" }}
          >
            02 &nbsp;// &nbsp;ACOUSTIC PRECISION &nbsp;// &nbsp;S/S 2026
          </p>
          <p
            className="text-base md:text-lg italic max-w-xl mx-auto mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a5750" }}
          >
            "A study in the intersection of acoustic engineering and the ritual of daily listening."
          </p>

          <div className="max-w-[200px] mx-auto mb-10">
            <img
              src={coverImg}
              alt="The Sonic Edit guide cover"
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
            The Sonic Edit
          </h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            02 &nbsp;// &nbsp;ACOUSTIC PRECISION &nbsp;// &nbsp;S/S 2026
          </p>
          <p style={{ fontSize: 18, fontStyle: "italic", color: "#5a5750", maxWidth: 420, margin: "0 auto" }}>
            "Sound is the invisible architecture of your day."
          </p>
        </div>

        {/* PAGE 1: MANIFESTO */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 24 }}>
            PAGE 01 &nbsp;// &nbsp;THE MANIFESTO
          </p>
          <h3 style={{ fontSize: 32, fontWeight: 300, fontStyle: "italic", marginBottom: 20 }}>
            Beyond the Noise
          </h3>
          <div style={{ width: 40, height: 0.5, backgroundColor: "#1a1a18", marginBottom: 24 }} />
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            The best earbuds don't just cancel noise — they curate silence. They transform your commute into a private studio, your morning run into a meditation, and your work session into a flow state.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35" }}>
            We've tested the 2026 wireless earbuds market to find the three that meet the Modern Tech standard for acoustic fidelity, comfort, and design that doesn't compromise your aesthetic.
          </p>
        </div>

        {/* PAGE 2: THE CURATED SELECTION */}
        <div className="pdf-page-break" />
        <div style={{ padding: "60px 0" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#8a8578", textTransform: "uppercase", marginBottom: 32 }}>
            PAGE 02 &nbsp;// &nbsp;THE CURATED SELECTION
          </p>

          {/* Pick 1 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              01 &nbsp;// &nbsp;THE BENCHMARK
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Apple AirPods Pro 2
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Ecosystem Standard
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Seamless integration. If you're in the Apple ecosystem, these aren't optional — they're infrastructure. Adaptive Audio blends transparency and noise cancellation in real-time, reading your environment so you don't have to.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> Conversation Awareness drops your music the moment you speak. No buttons. No gestures. Just human intuition, engineered.
            </p>
            <a
              href={`https://www.amazon.com/Apple-AirPods-Pro-2nd-Generation/dp/B0D1XD1ZV3?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW ON AMAZON →
            </a>
          </div>

          {/* Pick 2 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              02 &nbsp;// &nbsp;THE AUDIOPHILE'S CHOICE
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Sony WF-1000XM5
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Sound Purist
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> Studio-grade in your pocket. Sony's LDAC codec delivers Hi-Res Audio wirelessly — the kind of detail that makes you rediscover songs you've heard a thousand times.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> The V2 processor analyses ambient noise 700 times per second. It's not noise cancelling; it's acoustic architecture.
            </p>
            <a
              href={`https://www.amazon.com/Sony-WF-1000XM5-Bluetooth-Canceling-Headphones/dp/B0C33XXS56?tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: 4, color: "#1a1a18" }}
            >
              VIEW ON AMAZON →
            </a>
          </div>

          {/* Pick 3 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "#8a8578", textTransform: "uppercase", marginBottom: 8 }}>
              03 &nbsp;// &nbsp;THE SAMSUNG PLAY
            </p>
            <h4 style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              Samsung Galaxy Buds2 Pro
            </h4>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#8a8578", marginBottom: 12 }}>
              The Cross-Platform Contender
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 8 }}>
              <strong>The Vibe:</strong> The smallest premium buds on the market. 360 Audio with head tracking creates a spatial soundstage that makes podcasts feel like private conversations and albums feel like concerts.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a35", marginBottom: 16 }}>
              <strong>The Human Element:</strong> Voice Detect switches modes automatically — fitness mode during runs, conversation mode at the café. It reads your life, not just your playlist.
            </p>
            <a
              href={`https://www.amazon.com/SAMSUNG-Galaxy-Buds2-Pro-Bluetooth/dp/B0B3RMVNXB?tag=${AFFILIATE_TAG}`}
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
            <strong>For the Apple purist:</strong> AirPods Pro 2. The integration alone justifies the investment — Adaptive Audio is genuinely transformative.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 16 }}>
            <strong>For the sound obsessive:</strong> Sony WF-1000XM5. If you can hear the difference between 320kbps and LDAC, these are non-negotiable.
          </p>
          <p style={{ fontSize: 16, color: "#3a3a35", marginBottom: 24 }}>
            <strong>For the minimalist:</strong> Galaxy Buds2 Pro. The smallest footprint, the most intuitive auto-switching, and surprisingly powerful spatial audio.
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

export default SonicEditGuide;
