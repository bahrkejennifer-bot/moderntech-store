import { useState } from "react";
import { Download, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lead_captures").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        lead_magnet: "90-day-amazon-associate-roadmap",
      });

      if (error) {
        // If duplicate email, still allow download
        if (error.code !== "23505") {
          throw error;
        }
      }

      setIsSuccess(true);

      // Trigger PDF download
      const pdfUrl = "/pdfs/90-day-amazon-associate-roadmap.pdf";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "90-Day-Amazon-Associate-Roadmap.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started!",
        description: "Check your downloads folder for the roadmap.",
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
      <Navigation />

      <section className="py-20 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(160_85%_40%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(195_95%_50%/0.08),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Copy */}
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

              {/* Right: Form */}
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">You're in!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your download should start automatically. If not, click below.
                      </p>
                      <Button asChild className="rounded-full">
                        <a href="/pdfs/90-day-amazon-associate-roadmap.pdf" download>
                          Download Again <Download className="ml-2 h-4 w-4" />
                        </a>
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
                        <div>
                          <Input
                            placeholder="Your first name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 rounded-full text-base font-semibold"
                        >
                          {isSubmitting ? "Processing..." : "Download Free Roadmap"}
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

export default LeadMagnet;
