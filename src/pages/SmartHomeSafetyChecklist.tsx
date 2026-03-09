import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, CheckCircle, ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_captures" as any).insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lead_magnet: "parents-smart-home-safety-checklist",
      } as any);

      if (error && error.code !== "23505") {
        throw error;
      }

      setIsSuccess(true);

      toast({
        title: "You're in! 🛡️",
        description: "Your Smart Home Safety Checklist is ready to download.",
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
        <title>Free Parent's Smart Home Safety Checklist 2026 | Modern Tech</title>
        <meta name="description" content="Download your free Smart Home Safety Checklist — a room-by-room guide to protecting your family with smart cameras, locks, sensors & more. Rated by parents, for parents." />
      </Helmet>
      <Navigation />

      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(210_90%_50%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(220_85%_60%/0.06),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Cover image + copy */}
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
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A room-by-room guide to protecting your family with smart tech — cameras, locks, sensors & more. Written by parents, for parents. No jargon, no overwhelm.
                </p>

                {/* Cover image */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/50 max-w-xs">
                  <img
                    src={coverImg}
                    alt="The Parent's Smart Home Safety Checklist PDF guide cover"
                    className="w-full h-auto"
                  />
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

              {/* Right: Form */}
              <Card className="border-blue-500/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your checklist is ready. Click below to download.
                      </p>
                      <Button asChild className="rounded-full bg-blue-500 hover:bg-blue-600">
                        <a href="/pdfs/parents-smart-home-safety-checklist.pdf" download>
                          Download Checklist <Download className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Ready to start protecting your home?</p>
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href="/home-safety">
                            Shop Home Safety Tech <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-foreground">
                          Get Your Free Checklist
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">
                        Enter your details below and we'll send you the complete room-by-room safety checklist instantly.
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
                          className="w-full h-12 rounded-full text-base font-semibold bg-blue-500 hover:bg-blue-600"
                        >
                          {isSubmitting ? "Processing..." : "Download Free Checklist"}
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

export default SmartHomeSafetyChecklist;
