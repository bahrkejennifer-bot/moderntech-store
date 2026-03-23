import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Baby, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import coverImg from "@/assets/pdf-covers/screen-free-kids-cover.jpg";

const benefits = [
  "10 parent-tested tech toys ranked by age group (3-5, 6-8, 9-12)",
  "Screen time alternatives that kids actually want to use",
  "STEM learning toys that build real coding & engineering skills",
  "Audio players, smartwatches & safe headphones compared",
  "Bonus: daily screen-free activity schedule template",
];

const ScreenFreeKidsGuide = () => {
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
        filename: "Screen-Free-Kids-Tech-Toys-Guide-ModernTech.pdf",
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
        lead_magnet: "screen-free-kids-tech-toys",
      } as any);
      if (error && error.code !== "23505") throw error;
      setIsSuccess(true);
      toast({ title: "You're in! 🧸", description: "Your Screen-Free Kids Guide is ready." });
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
        <title>Free Screen-Free Kids Guide 2026 | Modern Tech LLC</title>
        <meta name="description" content="Download the free Screen-Free Kids Guide — 10 parent-approved tech toys that teach coding, STEM & creativity. By Modern Tech LLC." />
        <meta property="og:title" content="Free Screen-Free Kids Guide 2026 — by Modern Tech LLC" />
        <meta property="og:description" content="10 parent-approved tech toys that teach coding, STEM & creativity without screens." />
        <link rel="canonical" href="https://moderntech.store/free-screen-free-kids-guide" />
        <meta name="author" content="Modern Tech LLC" />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(45_95%_55%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(35_90%_50%/0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Baby className="h-4 w-4" />
                  Free Download — Family Tech
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  Screen-Free Kids:{" "}
                  <span className="text-yellow-500">10 Tech Toys</span>{" "}
                  That Actually Teach
                </h1>
                <p className="text-sm text-muted-foreground mb-4 font-medium">by Modern Tech LLC</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Parent-approved educational tech for ages 3–12. Coding robots, audio players, STEM kits & more — no screens required. Written by parents, for parents.
                </p>
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img src={coverImg} alt="Screen-Free Kids 10 Tech Toys That Actually Teach guide cover" className="w-full h-auto" />
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-yellow-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">Your guide is ready. Click below to download.</p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        {downloading ? "Generating PDF..." : "Download Guide"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to shop?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/kids-tech">Shop Kids Tech <ArrowRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        <h3 className="text-xl font-bold text-foreground">Get Your Free Guide</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Enter your details for instant access to the Screen-Free Kids guide.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" maxLength={100} />
                        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" maxLength={255} />
                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base font-semibold bg-yellow-500 hover:bg-yellow-600 text-black">
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
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #eab308" }}>
          <h1 style={{ fontSize: "26pt", fontWeight: "bold", marginBottom: 8, color: "#eab308" }}>Screen-Free Kids: 10 Tech Toys That Actually Teach</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>
        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#eab308", marginBottom: 16 }}>Ages 3–5: Early Learners</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>1. Botley 2.0 Coding Robot — $45</h3>
          <p>Screen-free coding for preschoolers. Kids press buttons on the remote to program Botley's movements, teaching sequencing and logic through play.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>2. Toniebox Audio Player — $100</h3>
          <p>A squeezable, screen-free speaker. Kids place figurines ("Tonies") on top to play stories, songs, and educational content. Perfect for bedtime and car rides.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>3. LeapFrog Learning Drum — $25</h3>
          <p>Musical toy that teaches numbers, letters, and rhythm. Durable, battery-powered, and engaging for toddlers who love to bang on things.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#eab308", marginTop: 32, marginBottom: 16 }}>Ages 6–8: Curious Builders</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>4. LEGO Spike Essential — $280</h3>
          <p>Combines LEGO building with basic coding. Kids build robots and program them with a simple drag-and-drop app. STEM learning that feels like play.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>5. VTech KidiZoom Smartwatch DX3 — $45</h3>
          <p>Dual cameras, games, fitness tracking, and a monster detector. No internet, no social media — just kid-friendly fun on their wrist.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>6. Osmo Genius Starter Kit — $80</h3>
          <p>Turns an iPad into a hands-on learning station. Physical tiles interact with the screen for math, spelling, and drawing — the best of both worlds.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>7. Snap Circuits Jr. — $30</h3>
          <p>Build 100+ electronic projects with snap-together components. Kids learn about circuits, switches, and motors without soldering or screens.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#eab308", marginTop: 32, marginBottom: 16 }}>Ages 9–12: Future Engineers</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>8. Raspberry Pi 400 Kit — $100</h3>
          <p>A full computer built into a keyboard. Kids learn real Python programming, build games, and explore electronics. The ultimate gateway to computer science.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>9. littleBits Rule Your Room Kit — $60</h3>
          <p>Electronic building blocks that snap together magnetically. Kids create inventions like automatic door openers, room alarms, and party machines.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>10. National Geographic Mega Science Kit — $35</h3>
          <p>15 hands-on science experiments including crystal growing, volcanoes, and slime. Real lab equipment and a learning guide included.</p>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#eab308", marginTop: 32, marginBottom: 16 }}>Safe Audio: Headphones for Kids</h2>
          <p><strong>Puro BT2200 ($50):</strong> Volume-limited to 85dB. Bluetooth with 22-hour battery. Our #1 pick for kids' hearing protection.</p>
          <p><strong>JBL Jr310BT ($30):</strong> Comfortable, colorful, and volume-capped at 85dB. Great for younger kids.</p>

          <h2 style={{ fontSize: "18pt", color: "#eab308", marginTop: 32, marginBottom: 16 }}>Daily Screen-Free Activity Schedule</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fef9c3" }}>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left" }}>Time</th>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left" }}>Activity</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["7:00 AM", "Toniebox stories during breakfast"],
                ["9:00 AM", "STEM building time (LEGO Spike or Snap Circuits)"],
                ["11:00 AM", "Outdoor play + nature journal"],
                ["1:00 PM", "Coding with Botley or Raspberry Pi"],
                ["3:00 PM", "Art & craft time"],
                ["5:00 PM", "Audiobook or podcast (with volume-limited headphones)"],
                ["7:00 PM", "Board games or puzzles as a family"],
              ].map(([time, activity], i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: 8, fontWeight: "bold" }}>{time}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{activity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 40, padding: 20, background: "#fef9c3", borderRadius: 8 }}>
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

export default ScreenFreeKidsGuide;
