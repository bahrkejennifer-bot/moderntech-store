import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/dorm-room-tech-cover.jpg";

const benefits = [
  "Complete dorm tech checklist — laptop, headphones, charger & more",
  "Best picks at 3 budgets: $300 / $600 / $1,000 total setup",
  "WiFi optimization tips for shared dorm networks",
  "Desk layout diagrams for tiny dorm spaces",
  "Bonus: semester survival apps & productivity stack",
];

const DormRoomTechGuide = () => {
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
        filename: "Dorm-Room-Tech-Setup-Guide-2026-ModernTech.pdf",
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
        lead_magnet: "dorm-room-tech-setup",
      } as any);
      if (error && error.code !== "23505") throw error;
      setIsSuccess(true);
      toast({ title: "You're in! 🎓", description: "Your Dorm Room Tech Guide is ready." });
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Free Dorm Room Tech Setup Guide 2026 | Modern Tech LLC</title>
        <meta name="description" content="Download the free Dorm Room Tech Setup Guide — complete checklist for college students. By Modern Tech LLC." />
        <meta property="og:title" content="Free Dorm Room Tech Setup Guide 2026 — by Modern Tech LLC" />
        <meta property="og:description" content="Complete checklist for college students with laptop, headphones, charger picks at every budget." />
        <meta property="og:image" content="https://moderntech.store/images/products/dorm-room-tech-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/free-dorm-room-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://moderntech.store/free-dorm-room-guide" />
        <meta name="author" content="Modern Tech LLC" />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(180_70%_40%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(200_80%_50%/0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <GraduationCap className="h-4 w-4" />
                  Free Download — College Tech
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  Ultimate Dorm Room{" "}
                  <span className="text-teal-400">Tech Setup</span>
                </h1>
                <p className="text-sm text-muted-foreground mb-4 font-medium">by Modern Tech LLC</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The complete tech checklist for college students — every gadget, app, and desk hack you need to crush your semester. Built for small spaces and tight budgets.
                </p>
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img src={coverImg} alt="Ultimate Dorm Room Tech Setup Guide 2026 cover" className="w-full h-auto" />
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-teal-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-teal-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">Your guide is ready. Click below to download.</p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-teal-500 hover:bg-teal-600">
                        {downloading ? "Generating PDF..." : "Download Guide"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to gear up for campus?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/college">Shop College Tech <ArrowRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-teal-400" />
                        <h3 className="text-xl font-bold text-foreground">Get Your Free Guide</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Enter your details for instant access to the complete dorm tech checklist.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" maxLength={100} />
                        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" maxLength={255} />
                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base font-semibold bg-teal-500 hover:bg-teal-600">
                          {isSubmitting ? "Processing..." : "Download Free Guide"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
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
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #14b8a6" }}>
          <h1 style={{ fontSize: "28pt", fontWeight: "bold", marginBottom: 8, color: "#14b8a6" }}>Ultimate Dorm Room Tech Setup Guide 2026</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>
        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#14b8a6", marginBottom: 16 }}>The Essential Dorm Tech Checklist</h2>
          <p>Moving into your dorm? Here's every piece of tech you need — organized by priority so you can build your setup at any budget.</p>

          <h3 style={{ fontSize: "14pt", color: "#14b8a6", marginTop: 24, marginBottom: 12 }}>Must-Have Tier (Start Here)</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>✅ Laptop — MacBook Air M4 or Dell XPS 14 (our top picks)</li>
            <li>✅ Noise-cancelling headphones — Sony WH-1000XM5 or AirPods Pro 2</li>
            <li>✅ USB-C hub — at least 3 ports + HDMI for presentations</li>
            <li>✅ Surge protector with USB-C PD — protect your gear & charge everything</li>
            <li>✅ Portable charger — 10,000mAh minimum for all-day classes</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#14b8a6", marginTop: 32, marginBottom: 16 }}>Budget Builds</h2>
          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>$300 Budget — The Essentials</h3>
          <p>Chromebook ($200) + wired earbuds ($30) + USB-C hub ($25) + surge protector ($20) + phone stand ($15) + cable organizer ($10)</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>$600 Budget — The Sweet Spot</h3>
          <p>Refurbished MacBook Air ($450) + AirPods ($80) + USB-C hub ($35) + LED desk lamp ($25) + portable charger ($20)</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>$1,000 Budget — The Full Setup</h3>
          <p>MacBook Air M4 ($700) + Sony WH-1000XM5 ($180) + 27" monitor ($120) + webcam ($40) + mechanical keyboard ($60)</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#14b8a6", marginTop: 32, marginBottom: 16 }}>WiFi Optimization for Dorm Networks</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>Use 5GHz band over 2.4GHz whenever possible (faster, less crowded)</li>
            <li style={{ marginBottom: 8 }}>Position your desk near the WiFi access point for best signal</li>
            <li style={{ marginBottom: 8 }}>Use an Ethernet adapter for important tasks (exams, video calls)</li>
            <li style={{ marginBottom: 8 }}>Install a WiFi analyzer app to find the least congested channel</li>
            <li style={{ marginBottom: 8 }}>Set up a VPN for security on shared networks</li>
          </ol>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#14b8a6", marginTop: 32, marginBottom: 16 }}>Desk Layout for Tiny Spaces</h2>
          <p><strong>The L-Shape:</strong> Laptop on main desk, monitor on a riser to the side. Keeps notebook space free.</p>
          <p><strong>The Minimalist:</strong> Laptop on a stand at eye level, wireless keyboard below. Everything in a 2-foot footprint.</p>
          <p><strong>The Vertical:</strong> Monitor mounted on a clamp arm, desk surface 100% clear for books and notes.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#14b8a6", marginTop: 32, marginBottom: 16 }}>Semester Survival Apps</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Notion</strong> — Notes, calendar, and project tracking in one app (free for students)</li>
            <li><strong>Forest</strong> — Focus timer that gamifies studying (plant trees while you work)</li>
            <li><strong>Quizlet</strong> — Flashcard system with AI-powered study modes</li>
            <li><strong>Grammarly</strong> — Essay writing assistant (free tier is solid)</li>
            <li><strong>Todoist</strong> — Task management that syncs across all devices</li>
            <li><strong>Canva</strong> — Presentations that don't look like everyone else's (free for students)</li>
          </ul>

          <div style={{ marginTop: 40, padding: 20, background: "#f0fdfa", borderRadius: 8 }}>
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

export default DormRoomTechGuide;
