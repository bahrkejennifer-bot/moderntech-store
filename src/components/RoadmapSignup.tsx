import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, Download, ArrowRight } from "lucide-react";
import { requestLeadConfirmation, CHECK_INBOX_MESSAGE, ALREADY_CONFIRMED_MESSAGE } from "@/lib/leadConfirmation";

export const RoadmapSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const result = await requestLeadConfirmation({
        name: name.trim(),
        email: email.trim(),
        lead_magnet: "90-day-amazon-associate-roadmap",
      });
      if (!result.success) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }
      toast.success(result.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE);
      setName("");
      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(160_85%_40%/0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Glassmorphism card */}
          <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-10 md:p-14">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-6">
                <Download className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground">
                Free 90-Day Amazon Associate Roadmap
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                The exact step-by-step checklist to launch, grow, and monetize your Amazon affiliate business in 90 days.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
                <Input
                  type="email"
                  placeholder="Your best email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Join the Group
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-5">
                No spam. Unsubscribe anytime. Your data stays private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
