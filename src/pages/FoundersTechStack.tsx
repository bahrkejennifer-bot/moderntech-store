import { useState } from "react";
import { CheckCircle, ArrowRight, Cpu, Briefcase, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const benefits = [
  "The exact hardware stack I use daily as a solopreneur",
  "Budget-friendly alternatives for every tier",
  "Software + SaaS tools that replaced my entire team",
  "AI workflow automations saving 10+ hours/week",
  "Affiliate-ready links you can model for your own stack",
];

const pillars = [
  { icon: Cpu, label: "Hardware", desc: "Laptop, monitor, peripherals — the physical foundation" },
  { icon: Briefcase, label: "Software", desc: "SaaS, AI tools, and automations that run the business" },
  { icon: Zap, label: "Workflows", desc: "Step-by-step systems connecting every tool" },
  { icon: Shield, label: "Security", desc: "VPN, password manager, backup strategy" },
];

const FoundersTechStack = () => {
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
        lead_magnet: "founders-tech-stack",
      } as any);

      if (error && error.code !== "23505") throw error;

      // Trigger welcome email via edge function
      try {
        await supabase.functions.invoke("send-welcome-email", {
          body: { name: name.trim(), email: email.trim().toLowerCase(), lead_magnet: "founders-tech-stack" },
        });
      } catch {}

      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll email you the moment the Founder's Tech Stack drops.",
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
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Founder's Tech Stack — The Tools Behind Modern Tech | Free Guide</title>
        <meta name="description" content="Get the exact hardware, software, and AI workflows powering a modern solopreneur business. Free guide coming soon — join the waitlist." />
        <meta property="og:title" content="Founder's Tech Stack — Free Guide" />
        <meta property="og:description" content="The exact tools, hardware, and AI workflows behind a profitable solo tech business." />
        <meta property="og:url" content="https://moderntech.store/founders-tech-stack" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      <section className="relative overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(220_60%_50%/0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(40_70%_50%/0.06),transparent_50%)]" />

        <div className="relative max-w-3xl mx-auto px-8 pt-28 pb-24">
          {/* Pre-heading */}
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-8 text-center">
            Coming Soon — Join the Waitlist
          </p>

          {/* Headline */}
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-center mb-6"
            style={{ fontWeight: 400, color: '#000000' }}
          >
            The Founder's<br />
            <em>Tech Stack</em>
          </h1>

          <p className="font-mono text-xs text-muted-foreground text-center max-w-lg mx-auto leading-relaxed mb-16">
            Every tool, app, and piece of hardware I use to run Modern Tech LLC as a one-person operation — from the $12/mo AI tool that replaced three freelancers to the exact monitor-keyboard-mouse setup on my desk right now.
          </p>

          {/* Pillars grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border mb-16">
            {pillars.map((p) => (
              <div key={p.label} className="border-r last:border-r-0 border-border p-6 text-center">
                <p.icon className="h-5 w-5 mx-auto mb-3 text-foreground/60" />
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{p.label}</p>
                <p className="font-mono text-[9px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="max-w-md mx-auto mb-16">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-6">What's Inside</p>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-foreground/40 mt-0.5 shrink-0" />
                  <span className="font-mono text-xs text-foreground/80 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form or Success */}
          <div className="max-w-md mx-auto">
            {isSuccess ? (
              <div className="border border-border p-10 text-center">
                <CheckCircle className="h-10 w-10 mx-auto mb-4 text-foreground/60" />
                <h3 className="font-serif text-2xl mb-2" style={{ fontStyle: "italic", fontWeight: 400 }}>You're In</h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                  We'll notify you the moment the Founder's Tech Stack is ready for download. Keep an eye on your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-border p-8">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-6 text-center">
                  Get Early Access
                </p>
                <div className="space-y-3 mb-6">
                  <Input
                    placeholder="First name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 bg-transparent border-border font-mono text-xs placeholder:text-muted-foreground/50 rounded-none focus-visible:ring-foreground/10"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-transparent border-border font-mono text-xs placeholder:text-muted-foreground/50 rounded-none focus-visible:ring-foreground/10"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-mono text-[10px] tracking-[0.2em] uppercase rounded-none"
                >
                  {isSubmitting ? "Joining..." : "Join the Waitlist"}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
                <p className="font-mono text-[9px] text-muted-foreground text-center mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default FoundersTechStack;
