import { useState, useRef } from "react";
import { Download, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { useToast } from "@/hooks/use-toast";
import { requestLeadConfirmation } from "@/lib/leadConfirmation";

const benefits = [
  "Week-by-week action plan from Day 1 to Day 90",
  "Niche selection framework for maximum commissions",
  "Content templates that convert clicks to sales",
  "SEO checklist for ranking product reviews",
  "Email funnel blueprint for passive income",
];

const LeadMagnet = () => {
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
        filename: "90-Day-Amazon-Associate-Roadmap-ModernTech.pdf",
        image: { type: "jpeg" as const, quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], before: ".pdf-page-break" },
      };
      await html2pdf().set(opt).from(contentRef.current).save();
      toast({ title: "Download complete", description: "Your roadmap has been saved as a PDF." });
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
        lead_magnet: "90-day-amazon-associate-roadmap",
      });
      if (!result.success) {
        toast({ title: "Something went wrong", description: result.error || "Please try again.", variant: "destructive" });
        return;
      }
      setIsSuccess(true);
      toast({
        title: result.alreadyConfirmed ? "Welcome back" : "Check your inbox",
        description: result.alreadyConfirmed
          ? "We've resent your roadmap — also ready to download below."
          : "Click the confirmation link in your email to unlock your roadmap.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Navigation />

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(160_85%_40%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(195_95%_50%/0.08),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="h-4 w-4" />
                  Free Download
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                  90-Day Amazon Associate{" "}
                  <span className="text-primary">Roadmap</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Go from zero to your first affiliate commission in 90 days. This step-by-step checklist covers niche selection, content strategy, SEO, and email funnels.
                </p>

                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your roadmap is ready. Click below to download.
                      </p>
                      <Button onClick={handleDownload} disabled={downloading} className="rounded-full">
                        {downloading ? "Generating PDF..." : "Download Roadmap"} <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        Get Your Free Roadmap
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Enter your details below and start building your affiliate income today.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
                        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full text-base font-semibold">
                          {isSubmitting ? "Processing..." : "Download Free Roadmap"}
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
        <div style={{ padding: "60px 50px", textAlign: "center", borderBottom: "2px solid #10b981" }}>
          <h1 style={{ fontSize: "28pt", fontWeight: "bold", marginBottom: 8, color: "#10b981" }}>90-Day Amazon Associate Roadmap</h1>
          <p style={{ fontSize: "11pt", color: "#666" }}>by Modern Tech LLC — moderntech.store</p>
        </div>
        <div style={{ padding: "40px 50px" }}>
          <h2 style={{ fontSize: "18pt", color: "#10b981", marginBottom: 16 }}>Days 1–30: The Foundation</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Week 1: Niche Selection</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Brainstorm 10 niches you're passionate about (tech, fitness, home, cooking, etc.)</li>
            <li>☐ Research competition on Amazon — look for categories with $50–$500 products</li>
            <li>☐ Validate with Google Trends — is interest growing or declining?</li>
            <li>☐ Pick ONE niche. Commit for 90 days. You can always expand later.</li>
          </ul>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Week 2: Sign Up & Setup</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Apply for Amazon Associates (affiliate.amazon.com)</li>
            <li>☐ Set up a website or blog (WordPress, Squarespace, or even a free Blogger site)</li>
            <li>☐ Create your "About" page explaining your expertise in your niche</li>
            <li>☐ Install Google Analytics to track your traffic from day one</li>
          </ul>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Weeks 3–4: First Content</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Write 5 product review articles (1,500–2,000 words each)</li>
            <li>☐ Create 1 "Best of" roundup post (e.g., "Best Wireless Earbuds Under $100")</li>
            <li>☐ Add affiliate links naturally within your content</li>
            <li>☐ Include comparison tables and pros/cons lists</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#10b981", marginTop: 32, marginBottom: 16 }}>Days 31–60: Traffic & SEO</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>SEO Checklist for Every Article</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Target keyword in title, first paragraph, and 2–3 subheadings</li>
            <li>☐ Write a meta description under 160 characters with your target keyword</li>
            <li>☐ Add alt text to all images with descriptive, keyword-rich descriptions</li>
            <li>☐ Internal link to at least 2 other articles on your site</li>
            <li>☐ Aim for 1,500+ words per article — longer content ranks better</li>
          </ul>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Traffic Sources to Build</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>☐ Pinterest — create pins for every article (use Canva for free templates)</li>
            <li>☐ YouTube — film simple product demos with your phone</li>
            <li>☐ Reddit — share genuine recommendations in relevant subreddits</li>
            <li>☐ Email list — start collecting emails with a free guide (like this one!)</li>
          </ul>

          <div className="pdf-page-break" />
          <h2 style={{ fontSize: "18pt", color: "#10b981", marginTop: 32, marginBottom: 16 }}>Days 61–90: Scale & Monetize</h2>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Content Templates That Convert</h3>
          <p><strong>"Best X for Y" posts:</strong> "Best Laptops for College Students 2026" — these rank well and convert at 3–5%.</p>
          <p><strong>"X vs. Y" comparisons:</strong> "AirPods Pro 2 vs. Sony WF-1000XM5" — high purchase intent keywords.</p>
          <p><strong>"How to" guides:</strong> "How to Set Up a Smart Home Under $500" — builds trust, then converts via product links.</p>

          <h3 style={{ fontSize: "14pt", marginTop: 16, marginBottom: 8 }}>Email Funnel Blueprint</h3>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>Create a free lead magnet related to your niche (PDF guide, checklist, or cheat sheet)</li>
            <li style={{ marginBottom: 8 }}>Set up an email capture form on every article page</li>
            <li style={{ marginBottom: 8 }}>Welcome email with your guide + your top 3 product recommendations</li>
            <li style={{ marginBottom: 8 }}>Weekly email with new reviews, deals, and seasonal roundups</li>
            <li style={{ marginBottom: 8 }}>Track which emails drive the most clicks — double down on winners</li>
          </ol>

          <h2 style={{ fontSize: "18pt", color: "#10b981", marginTop: 32, marginBottom: 16 }}>Your 90-Day Milestones</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#ecfdf5" }}>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left" }}>Day</th>
                <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left" }}>Goal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Day 7", "Niche selected, Amazon Associates application submitted"],
                ["Day 14", "Website live with About page and first article"],
                ["Day 30", "6 articles published, Google Analytics tracking"],
                ["Day 45", "10+ articles, Pinterest account with 20 pins"],
                ["Day 60", "Email list started, 50+ subscribers"],
                ["Day 75", "First organic traffic from Google, first affiliate clicks"],
                ["Day 90", "First commission earned! 🎉"],
              ].map(([day, goal], i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: 8, fontWeight: "bold" }}>{day}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{goal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 40, padding: 20, background: "#ecfdf5", borderRadius: 8 }}>
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

export default LeadMagnet;
