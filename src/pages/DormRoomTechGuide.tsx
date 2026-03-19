import { useState } from "react";
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
  const { toast } = useToast();

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Dorm Room Tech Setup Guide 2026" />
        <meta name="twitter:image" content="https://moderntech.store/images/products/dorm-room-tech-cover.jpg" />
        <meta property="pin:media" content="https://moderntech.store/images/products/dorm-room-tech-cover.jpg" />
        <meta property="pin:description" content="Complete checklist for college students with laptop, headphones, charger picks at every budget." />
        <link rel="canonical" href="https://moderntech.store/free-dorm-room-guide" />
        <meta name="author" content="Modern Tech LLC" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Free Dorm Room Tech Setup Guide 2026", "description": "Complete checklist for college students with laptop, headphones, charger picks at every budget.", "image": "https://moderntech.store/images/products/dorm-room-tech-cover.jpg", "author": { "@type": "Organization", "name": "Modern Tech LLC" }, "publisher": { "@type": "Organization", "name": "Modern Tech LLC", "url": "https://moderntech.store" }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://moderntech.store/free-dorm-room-guide" } })}</script>
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
                      <Button asChild className="rounded-full bg-teal-500 hover:bg-teal-600">
                        <a href="/pdfs/dorm-room-tech-setup.pdf" download>
                          Download Guide <Download className="ml-2 h-4 w-4" />
                        </a>
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

      <AffiliateFooter />
    </div>
  );
};

export default DormRoomTechGuide;
