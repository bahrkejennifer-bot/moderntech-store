import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/creator-gear-starter-kit-cover.jpg";

const benefits = [
  "Mic, camera & lighting picks at 3 budget levels ($200 / $500 / $1,000)",
  "Studio layout diagrams for small spaces & apartments",
  "OBS & Stream Deck setup walkthrough with screenshots",
  "Audio optimization checklist — sound pro on Day 1",
  "Bonus: 7-day content launch challenge to get your first video live",
];

const CreatorGearGuide = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.5, 0.6, 0.5, 0.6],
        filename: "Creator-Gear-Starter-Kit-2026-ModernTech.pdf",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_captures" as any).insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lead_magnet: "creator-gear-starter-kit",
      } as any);
      if (error && error.code !== "23505") throw error;
      setIsSuccess(true);
      toast({ title: "You're in! 🎬", description: "Your Creator Gear Starter Kit is ready to download." });
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Free Creator Gear Starter Kit 2026 | Modern Tech LLC</title>
        <meta name="description" content="Download the free Creator Gear Starter Kit — mic, camera & lighting picks at every budget. By Modern Tech LLC." />
        <meta property="og:title" content="Free Creator Gear Starter Kit 2026 — by Modern Tech LLC" />
        <meta property="og:description" content="Mic, camera & lighting picks at every budget, studio layout guides & OBS setup walkthrough." />
        <link rel="canonical" href="https://moderntech.store/free-creator-gear-guide" />
        <meta name="author" content="Modern Tech LLC" />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(25_95%_50%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(30_90%_45%/0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Video className="h-4 w-4" />
                  Free Download — Creator Tools
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  Creator Gear{" "}
                  <span className="text-orange-400">Starter Kit</span>{" "}
                  2026
                </h1>
                <p className="text-sm text-muted-foreground mb-4 font-medium">by Modern Tech LLC</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Everything you need to build a pro content creator setup — mic, camera, lighting & software picks at every budget. Start creating today, not someday.
                </p>
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img src={coverImg} alt="Creator Gear Starter Kit 2026 PDF guide cover" className="w-full h-auto" />
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-orange-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-orange-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">Your starter kit is ready. Click below to download.</p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-orange-500 hover:bg-orange-600">
                        {downloading ? "Generating PDF..." : "Download Kit"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to gear up?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/creator-gear">Shop Creator Gear <ArrowRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-orange-400" />
                        <h3 className="text-xl font-bold text-foreground">Get Your Free Starter Kit</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Enter your details below for instant access to the complete Creator Gear guide.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" maxLength={100} />
                        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" maxLength={255} />
                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base font-semibold bg-orange-500 hover:bg-orange-600">
                          {isSubmitting ? "Processing..." : "Download Free Kit"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">No spam. Unsubscribe anytime. We respect your privacy.</p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden PDF Content */}
      <div ref={contentRef} style={{ position: "absolute", left: "-9999px", top: 0, width: "8.5in", background: "#fff", color: "#1a1a1a", fontFamily: "Georgia, serif", fontSize: "12pt", lineHeight: "1.8" }}>
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #f97316" }}>
          <h1 style={{ fontSize: "28pt", fontWeight: "bold", marginBottom: 8, color: "#f97316" }}>Creator Gear Starter Kit 2026</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>
        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#f97316", marginBottom: 16 }}>Your Creator Setup at Every Budget</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>🎤 Microphones</h3>
          <p><strong>$50 — Fifine K669:</strong> USB plug-and-play. Great starter mic for podcasts and voiceovers.</p>
          <p><strong>$100 — Blue Yeti:</strong> Multi-pattern USB mic. The classic choice for beginners.</p>
          <p><strong>$270 — Shure MV7+:</strong> USB/XLR hybrid with auto-leveling. The 2026 gold standard.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 24, marginBottom: 8 }}>📷 Cameras</h3>
          <p><strong>$70 — Logitech C920:</strong> 1080p webcam. Reliable for Zoom calls and simple videos.</p>
          <p><strong>$200 — Elgato Facecam:</strong> Uncompressed 1080p60. Built for streamers.</p>
          <p><strong>$500+ — Sony ZV-1 II:</strong> Vlog camera with flip screen, autofocus, and cinematic quality.</p>

          <div className="pdf-page-break" />
          <h3 style={{ fontSize: "14pt", marginTop: 24, marginBottom: 8 }}>💡 Lighting</h3>
          <p><strong>$25 — Ring light (10"):</strong> Basic, effective. Clips to your desk or monitor.</p>
          <p><strong>$60 — Elgato Key Light Mini:</strong> App-controlled, color temperature adjustable.</p>
          <p><strong>$200 — Elgato Key Light (pair):</strong> Professional 2-light setup. Eliminates shadows.</p>

          <h2 style={{ fontSize: "18pt", color: "#f97316", marginTop: 32, marginBottom: 16 }}>Studio Layout for Small Spaces</h2>
          <p><strong>The Desktop Setup:</strong> Mic on a boom arm, camera on a mini tripod behind the monitor, ring light clamped to the desk edge. Total footprint: 3 sq ft.</p>
          <p><strong>The Corner Studio:</strong> Key light at 45° left, fill light at 45° right, camera centered on a tripod. Background: a bookshelf or fabric backdrop ($15).</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#f97316", marginTop: 32, marginBottom: 16 }}>OBS & Stream Deck Setup</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>Download OBS Studio (free) and create your first Scene</li>
            <li style={{ marginBottom: 8 }}>Add sources: Video Capture (camera), Audio Input (mic), Display Capture (screen)</li>
            <li style={{ marginBottom: 8 }}>Set output to 1080p, 30fps, with a bitrate of 4500 kbps for streaming</li>
            <li style={{ marginBottom: 8 }}>Map Stream Deck buttons to: Start/Stop Recording, Switch Scenes, Mute Mic</li>
            <li style={{ marginBottom: 8 }}>Add a noise suppression filter to your mic source (RNNoise works great)</li>
          </ol>

          <h2 style={{ fontSize: "18pt", color: "#f97316", marginTop: 32, marginBottom: 16 }}>Audio Optimization Checklist</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Position mic 4–6 inches from your mouth at a 45° angle</li>
            <li>☐ Add a pop filter or foam windscreen</li>
            <li>☐ Close windows and doors to reduce ambient noise</li>
            <li>☐ Enable noise suppression in OBS (or use Krisp for all apps)</li>
            <li>☐ Test audio levels — peaks should hit -6dB to -12dB</li>
            <li>☐ Record a 30-second test and listen back with headphones</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#f97316", marginTop: 32, marginBottom: 16 }}>7-Day Content Launch Challenge</h2>
          <p><strong>Day 1:</strong> Set up your gear and record a 60-second test video. Don't publish — just practice.</p>
          <p><strong>Day 2:</strong> Script a 3-minute "about me" or niche intro video.</p>
          <p><strong>Day 3:</strong> Record and edit your intro video. Use CapCut or DaVinci Resolve (both free).</p>
          <p><strong>Day 4:</strong> Create a YouTube channel or TikTok account. Upload your intro.</p>
          <p><strong>Day 5:</strong> Batch-script your next 3 videos. Keep each under 5 minutes.</p>
          <p><strong>Day 6:</strong> Record all 3 videos back-to-back (batch filming = efficiency).</p>
          <p><strong>Day 7:</strong> Edit, upload, and schedule. You now have a week of content in the bank!</p>

          <div style={{ marginTop: 40, padding: 20, background: "#fff7ed", borderRadius: 8 }}>
            <p style={{ textAlign: "center", fontSize: "10pt", color: "#666" }}>
              © 2026 Modern Tech LLC — moderntech.store<br />
              This guide contains affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      <AffiliateFooter />
    </div>
  );
};

export default CreatorGearGuide;
