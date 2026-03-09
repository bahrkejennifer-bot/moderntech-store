import { useState } from "react";
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
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free Screen-Free Kids Guide 2026 | 10 Tech Toys That Actually Teach</title>
        <meta name="description" content="Download the free Screen-Free Kids Guide — 10 parent-approved tech toys that teach coding, STEM & creativity without screens. Ranked by age group for ages 3-12." />
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
                      <Button asChild className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        <a href="/pdfs/screen-free-kids-tech-toys.pdf" download>
                          Download Guide <Download className="ml-2 h-4 w-4" />
                        </a>
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

      <AffiliateFooter />
    </div>
  );
};

export default ScreenFreeKidsGuide;
