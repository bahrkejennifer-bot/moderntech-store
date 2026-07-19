import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Gem, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { useToast } from "@/hooks/use-toast";
import { requestLeadConfirmation } from "@/lib/leadConfirmation";
import coverImg from "@/assets/pdf-covers/smart-ring-guide-cover.jpg";

const benefits = [
  "Oura Ring 4 vs. competitors — honest comparison chart",
  "How to find your perfect ring size (before you spend $300+)",
  "Sleep, HRV & readiness scores explained in plain English",
  "Setup guide: get accurate data from Day 1",
  "Bonus: 30-day biohacking challenge using your smart ring",
];

const SmartRingGuide = () => {
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
        margin: [0.5, 0.6, 0.5, 0.6] as [number, number, number, number],
        filename: "Smart-Ring-Buyers-Guide-2026-ModernTech.pdf",
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
      const result = await requestLeadConfirmation({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lead_magnet: "smart-ring-buyers-guide",
      });

      if (!result.success) {
        toast({
          title: "Something went wrong",
          description: result.error || "Please try again in a moment.",
          variant: "destructive",
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: result.alreadyConfirmed ? "Welcome back 💍" : "Check your inbox 💍",
        description: result.alreadyConfirmed
          ? "We've resent your guide — and it's also ready to download below."
          : "Click the confirmation link in your email to unlock your guide.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Free Smart Ring Buyer's Guide 2026 | Modern Tech LLC</title>
        <meta name="description" content="Download the free Smart Ring Buyer's Guide — compare Oura Ring 4, sizing tips & biohacking challenge. By Modern Tech LLC." />
        <meta property="og:title" content="Free Smart Ring Buyer's Guide 2026 — by Modern Tech LLC" />
        <meta property="og:description" content="Compare Oura Ring 4, sizing tips, sleep tracking explained & a 30-day biohacking challenge." />
        <meta property="og:image" content="https://moderntech.store/images/products/smart-ring-guide-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/free-smart-ring-guide" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Smart Ring Buyer's Guide 2026 — by Modern Tech LLC" />
        <meta name="twitter:image" content="https://moderntech.store/images/products/smart-ring-guide-cover.jpg" />
        <meta property="pin:media" content="https://moderntech.store/images/products/smart-ring-guide-cover.jpg" />
        <meta property="pin:description" content="Compare Oura Ring 4, sizing tips, sleep tracking explained & a 30-day biohacking challenge." />
        <link rel="canonical" href="https://moderntech.store/free-smart-ring-guide" />
        <meta name="author" content="Modern Tech LLC" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Free Smart Ring Buyer's Guide 2026", "description": "Compare Oura Ring 4, sizing tips, sleep tracking explained & a 30-day biohacking challenge.", "image": "https://moderntech.store/images/products/smart-ring-guide-cover.jpg", "author": { "@type": "Organization", "name": "Modern Tech LLC" }, "publisher": { "@type": "Organization", "name": "Modern Tech LLC", "url": "https://moderntech.store" }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://moderntech.store/free-smart-ring-guide" } })}</script>
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(280_80%_50%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(160_85%_40%/0.06),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Gem className="h-4 w-4" />
                  Free Download — Wellness Tech
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  The Smart Ring{" "}
                  <span className="text-purple-400">Buyer's Guide</span>{" "}
                  2026
                </h1>
                <p className="text-sm text-muted-foreground mb-4 font-medium">by Modern Tech LLC</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Everything you need to know before buying a smart ring — sizing, features, sleep tracking & biohacking tips. No jargon, just answers.
                </p>

                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img
                    src={coverImg}
                    alt="Smart Ring Buyer's Guide 2026 PDF cover"
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-purple-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your guide is ready. Click below to download.
                      </p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-purple-500 hover:bg-purple-600">
                        {downloading ? "Generating PDF..." : "Download Guide"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to find your ring?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/health-wellness">
                            Shop Smart Rings <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <h3 className="text-xl font-bold text-foreground">
                          Get Your Free Guide
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">
                        Enter your details below for instant access to the complete Smart Ring Buyer's Guide.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          placeholder="Your first name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-12"
                          maxLength={100}
                        />
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12"
                          maxLength={255}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 rounded-full text-base font-semibold bg-purple-500 hover:bg-purple-600"
                        >
                          {isSubmitting ? "Processing..." : "Download Free Guide"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          No spam. Unsubscribe anytime. We respect your privacy.
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden PDF Content for html2pdf */}
      <div ref={contentRef} style={{ position: "absolute", left: "-9999px", top: 0, width: "8.5in", background: "#fff", color: "#1a1a1a", fontFamily: "Georgia, serif", fontSize: "12pt", lineHeight: "1.8" }}>
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #7c3aed" }}>
          <h1 style={{ fontSize: "28pt", fontWeight: "bold", marginBottom: 8, color: "#7c3aed" }}>The Smart Ring Buyer's Guide 2026</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>

        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginBottom: 16 }}>Why Smart Rings?</h2>
          <p>Smart rings are the fastest-growing wearable category in 2026. Unlike bulky watches, they track your health 24/7 without demanding your attention. From sleep quality to heart rate variability (HRV), smart rings deliver actionable health insights from your finger.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginTop: 32, marginBottom: 16 }}>Oura Ring 4 vs. Competitors</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ background: "#f3f0ff" }}>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>Feature</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "center" }}>Oura Ring 4</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "center" }}>RingConn</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "center" }}>Samsung Galaxy Ring</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sleep Tracking", "★★★★★", "★★★★", "★★★★"],
                ["HRV Monitoring", "★★★★★", "★★★★", "★★★★"],
                ["Battery Life", "5–7 days", "7–10 days", "5–7 days"],
                ["Sizing Kit", "Free included", "Free included", "Sold separately"],
                ["App Quality", "Excellent", "Good", "Good (Samsung only)"],
                ["Price Range", "$299–$449", "$199–$299", "$399"],
              ].map(([feature, oura, ringconn, samsung], i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: 8, fontWeight: "bold" }}>{feature}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{oura}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{ringconn}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{samsung}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginTop: 32, marginBottom: 16 }}>Finding Your Perfect Ring Size</h2>
          <p><strong>Step 1:</strong> Order a free sizing kit from the manufacturer (Oura and RingConn both include one).</p>
          <p><strong>Step 2:</strong> Wear the test ring on your index finger for at least 24 hours — your finger size fluctuates throughout the day.</p>
          <p><strong>Step 3:</strong> Try it on the finger you plan to wear it on. Most people choose their index or middle finger for best sensor contact.</p>
          <p><strong>Pro Tip:</strong> Measure when your hands are warm (not cold) for the most accurate fit. A snug fit = better data accuracy.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginTop: 32, marginBottom: 16 }}>Sleep, HRV & Readiness Scores Explained</h2>
          <p><strong>Sleep Score (0–100):</strong> Combines total sleep time, sleep efficiency, REM/deep sleep ratios, and restlessness. Aim for 85+.</p>
          <p><strong>HRV (Heart Rate Variability):</strong> The variation in time between heartbeats. Higher = better recovery. Track your personal baseline over 2 weeks.</p>
          <p><strong>Readiness Score:</strong> A composite of HRV, resting heart rate, body temperature, and sleep quality. Green (85+) means go hard. Yellow (70–84) means moderate. Red (&lt;70) means rest.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginTop: 32, marginBottom: 16 }}>Setup Guide: Accurate Data from Day 1</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>Charge your ring fully before first use (takes ~60 minutes)</li>
            <li style={{ marginBottom: 8 }}>Download the companion app and create your profile</li>
            <li style={{ marginBottom: 8 }}>Wear the ring 24/7 for the first 2 weeks to establish your baseline</li>
            <li style={{ marginBottom: 8 }}>Enable all sensors: SpO2, temperature, HRV, and activity</li>
            <li style={{ marginBottom: 8 }}>Set consistent sleep/wake reminders for better trend data</li>
            <li style={{ marginBottom: 8 }}>Sync daily — your trends become meaningful after 7 days</li>
          </ol>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#7c3aed", marginTop: 32, marginBottom: 16 }}>30-Day Biohacking Challenge</h2>
          <p><strong>Week 1 — Baseline:</strong> Wear your ring 24/7. No changes to routine. Just observe your sleep scores, HRV trends, and activity patterns.</p>
          <p><strong>Week 2 — Sleep Optimization:</strong> Set a consistent bedtime. No screens 1 hour before bed. Track the impact on your sleep score.</p>
          <p><strong>Week 3 — Movement:</strong> Add a 20-minute walk daily. Compare your HRV and readiness scores to Week 1.</p>
          <p><strong>Week 4 — Recovery:</strong> Add cold showers, meditation, or breathwork. Watch your recovery metrics improve. Compare Day 28 data to Day 1.</p>

          <div style={{ marginTop: 40, padding: 20, background: "#f3f0ff", borderRadius: 8 }}>
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

export default SmartRingGuide;
