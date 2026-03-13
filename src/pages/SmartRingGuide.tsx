import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Gem, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_captures" as any).insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lead_magnet: "smart-ring-buyers-guide",
      } as any);

      if (error && error.code !== "23505") {
        throw error;
      }

      setIsSuccess(true);

      toast({
        title: "You're in! 💍",
        description: "Your Smart Ring Buyer's Guide is ready to download.",
      });
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free Smart Ring Buyer's Guide 2026 | Oura Ring 4 & More</title>
        <meta name="description" content="Download the free Smart Ring Buyer's Guide — compare Oura Ring 4, sizing tips, sleep tracking explained & a 30-day biohacking challenge. Everything you need before buying." />
        <meta property="og:title" content="Free Smart Ring Buyer's Guide 2026 | Oura Ring 4 & More" />
        <meta property="og:description" content="Compare Oura Ring 4, sizing tips, sleep tracking explained & a 30-day biohacking challenge." />
        <meta property="og:image" content="https://moderntech.store/images/products/smart-ring-guide-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/smart-ring-guide" />
        <meta property="og:type" content="article" />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(280_80%_50%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(160_85%_40%/0.06),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Cover + copy */}
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

              {/* Right: Form */}
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
                      <Button asChild className="rounded-full bg-purple-500 hover:bg-purple-600">
                        <a href="/pdfs/smart-ring-buyers-guide.pdf" download>
                          Download Guide <Download className="ml-2 h-4 w-4" />
                        </a>
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

      <AffiliateFooter />
    </div>
  );
};

export default SmartRingGuide;
