import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { useToast } from "@/hooks/use-toast";
import { requestLeadConfirmation } from "@/lib/leadConfirmation";
import coverImg from "@/assets/pdf-covers/smart-home-safety-checklist-cover.jpg";

const benefits = [
  "Room-by-room smart security checklist for your entire home",
  "Best cameras, locks & sensors ranked by family safety experts",
  "Setup guides even non-tech parents can follow in 15 minutes",
  "Budget breakdown: protect your home for under $500",
  "Bonus: emergency contact template & family safety plan",
];

const SmartHomeSafetyChecklist = () => {
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
        filename: "Smart-Home-Safety-Checklist-2026-ModernTech.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], before: ".pdf-page-break" },
      };
      await html2pdf().set(opt).from(contentRef.current).save();
      toast({ title: "Download complete", description: "Your checklist has been saved as a PDF." });
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
        lead_magnet: "parents-smart-home-safety-checklist",
      });
      if (!result.success) {
        toast({ title: "Something went wrong", description: result.error || "Please try again in a moment.", variant: "destructive" });
        return;
      }
      setIsSuccess(true);
      toast({
        title: result.alreadyConfirmed ? "Welcome back 🛡️" : "Check your inbox 🛡️",
        description: result.alreadyConfirmed
          ? "We've resent your checklist — also ready to download below."
          : "Click the confirmation link in your email to unlock your checklist.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Free Parent's Smart Home Safety Checklist 2026 | Modern Tech LLC</title>
        <meta name="description" content="Download your free Smart Home Safety Checklist — a room-by-room guide to protecting your family with smart cameras, locks, sensors & more. By Modern Tech LLC." />
        <meta property="og:title" content="Free Parent's Smart Home Safety Checklist 2026 — by Modern Tech LLC" />
        <meta property="og:description" content="Room-by-room guide to protecting your family with smart cameras, locks, sensors & more." />
        <link rel="canonical" href="https://moderntech.store/free-smart-home-checklist" />
        <meta name="author" content="Modern Tech LLC" />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(210_90%_50%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(220_85%_60%/0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Shield className="h-4 w-4" />
                  Free Download — Family Safety
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  The Parent's{" "}
                  <span className="text-blue-400">Smart Home Safety</span>{" "}
                  Checklist
                </h1>
                <p className="text-sm text-muted-foreground mb-4 font-medium">by Modern Tech LLC</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A room-by-room guide to protecting your family with smart tech — cameras, locks, sensors & more. Written by parents, for parents. No jargon, no overwhelm.
                </p>
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img src={coverImg} alt="The Parent's Smart Home Safety Checklist PDF guide cover" className="w-full h-auto" />
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-blue-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">Your checklist is ready. Click below to download.</p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-blue-500 hover:bg-blue-600">
                        {downloading ? "Generating PDF..." : "Download Checklist"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to start protecting your home?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/smart-home-security">Shop Smart Home Tech <ArrowRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-foreground">Get Your Free Checklist</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">Enter your details below and we'll send you the complete room-by-room safety checklist instantly.</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" maxLength={100} />
                        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" maxLength={255} />
                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base font-semibold bg-blue-500 hover:bg-blue-600">
                          {isSubmitting ? "Processing..." : "Download Free Checklist"}
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
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #3b82f6" }}>
          <h1 style={{ fontSize: "26pt", fontWeight: "bold", marginBottom: 8, color: "#3b82f6" }}>The Parent's Smart Home Safety Checklist 2026</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>
        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginBottom: 16 }}>🚪 Front Door & Entry</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Video doorbell installed (Ring, Blink, or eufy) — see who's at the door from anywhere</li>
            <li>☐ Smart lock with auto-lock enabled — no more "did I lock the door?" anxiety</li>
            <li>☐ Motion-activated porch light — deters package theft and nighttime visitors</li>
            <li>☐ Door/window sensor on front door — instant alerts when opened</li>
          </ul>

          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>🏠 Living Room & Common Areas</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Indoor security camera in main living area (with privacy mode for home time)</li>
            <li>☐ Smart smoke/CO detector — sends phone alerts, not just alarms</li>
            <li>☐ Smart plug on space heaters and irons — auto-off after 30 minutes</li>
            <li>☐ Voice assistant for quick emergency calls ("Alexa, call 911")</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>🛏️ Kids' Bedrooms</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Smart night light with motion sensor — safe path to bathroom</li>
            <li>☐ Window sensors on all accessible windows</li>
            <li>☐ Smart speaker for white noise and wake-up alarms</li>
            <li>☐ Baby monitor with room temperature alerts (for infants)</li>
          </ul>

          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>🍳 Kitchen</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Smart smoke detector near stove</li>
            <li>☐ Water leak sensor under sink and near dishwasher</li>
            <li>☐ Smart plug on coffee maker and toaster oven (auto-off)</li>
            <li>☐ Cabinet locks with smart alerts for cleaning supply cabinets</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>🏡 Backyard & Garage</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Outdoor security camera covering backyard and driveway</li>
            <li>☐ Smart garage door controller — close it from anywhere</li>
            <li>☐ Motion-sensor floodlights on all exterior corners</li>
            <li>☐ Pool alarm or gate sensor (if applicable)</li>
          </ul>

          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>💰 Budget Breakdown: Under $500</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#eff6ff" }}>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left" }}>Item</th>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "right" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ring Battery Doorbell Plus", "$120"],
                ["eufy Smart Lock C220", "$100"],
                ["Blink Outdoor 4 Camera (2-pack)", "$120"],
                ["Smart Smoke Detector", "$40"],
                ["Water Leak Sensors (3-pack)", "$30"],
                ["Smart Plugs (4-pack)", "$25"],
                ["Window/Door Sensors (4-pack)", "$40"],
              ].map(([item, price], i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "right" }}>{price}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: "bold", background: "#eff6ff" }}>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>Total</td>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "right" }}>$475</td>
              </tr>
            </tbody>
          </table>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#3b82f6", marginTop: 32, marginBottom: 16 }}>📞 Emergency Contact Template</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["Emergency Services", "911"],
                ["Poison Control", "1-800-222-1222"],
                ["Pediatrician", "_______________"],
                ["Neighbor #1", "_______________"],
                ["Neighbor #2", "_______________"],
                ["Family Contact", "_______________"],
                ["Home Security Provider", "_______________"],
              ].map(([label, value], i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: 10, fontWeight: "bold" }}>{label}</td>
                  <td style={{ border: "1px solid #ddd", padding: 10 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 40, padding: 20, background: "#eff6ff", borderRadius: 8 }}>
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

export default SmartHomeSafetyChecklist;
