import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Rocket, ArrowLeft, Gem, Video, GraduationCap, Baby } from "lucide-react";

interface FreeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const guides = [
  {
    id: "amazon-associate-guide",
    title: "90-Day Amazon Associate Roadmap",
    description: "Step-by-step plan to launch your first affiliate income stream.",
    icon: Rocket,
    accentClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    id: "parents-smart-home-safety-checklist",
    title: "Parent's Smart Home Safety Checklist",
    description: "Room-by-room guide to protecting your family with smart tech.",
    icon: Shield,
    accentClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
  },
  {
    id: "smart-ring-buyers-guide",
    title: "Smart Ring Buyer's Guide 2026",
    description: "Oura Ring 4 comparison, sizing tips & a 30-day biohacking challenge.",
    icon: Gem,
    accentClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
  },
  {
    id: "creator-gear-starter-kit",
    title: "Creator Gear Starter Kit 2026",
    description: "Mic, camera & lighting picks at every budget + a 7-day launch challenge.",
    icon: Video,
    accentClass: "text-orange-400",
    bgClass: "bg-orange-500/10",
  },
  {
    id: "dorm-room-tech-setup",
    title: "Ultimate Dorm Room Tech Setup",
    description: "Complete college tech checklist at 3 budgets + desk layout diagrams.",
    icon: GraduationCap,
    accentClass: "text-teal-400",
    bgClass: "bg-teal-500/10",
  },
  {
    id: "screen-free-kids-tech-toys",
    title: "Screen-Free Kids: 10 Toys That Teach",
    description: "Parent-approved STEM toys, coding robots & audio players for ages 3–12.",
    icon: Baby,
    accentClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
  },
];

export const FreeGuideModal = ({ open, onOpenChange }: FreeGuideModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedGuide) return;

    setLoading(true);
    try {
      // Capture lead
      const { error } = await supabase.from("lead_captures").insert({
        email,
        name: email.split("@")[0],
        lead_magnet: selectedGuide,
      });

      if (error && error.code !== "23505") throw error;

      // Trigger welcome email (fire-and-forget, don't block on failure)
      supabase.functions.invoke("send-welcome-email", {
        body: { name: email.split("@")[0], email },
      }).catch(() => {});

      // Navigate to the appropriate guide page
      const guideRoutes: Record<string, string> = {
        "amazon-associate-guide": "/amazon-associate-guide",
        "parents-smart-home-safety-checklist": "/smart-home-safety-checklist",
        "smart-ring-buyers-guide": "/smart-ring-guide",
        "creator-gear-starter-kit": "/creator-gear-guide",
        "dorm-room-tech-setup": "/dorm-room-tech-guide",
        "screen-free-kids-tech-toys": "/screen-free-kids-guide",
      };

      const route = guideRoutes[selectedGuide];
      if (route) {
        window.location.href = route;
      }

      toast.success("Your guide is ready! 🎉");
      setEmail("");
      setSelectedGuide(null);
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activeGuide = guides.find((g) => g.id === selectedGuide);

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setSelectedGuide(null); }}>
      <DialogContent className="sm:max-w-md border border-border bg-card p-10">
        {!selectedGuide ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight text-center text-foreground">
                Choose Your Free Guide
              </DialogTitle>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Pick a guide and we'll send it straight to your inbox.
              </p>
            </DialogHeader>

            <div className="mt-6 space-y-3">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide.id)}
                    className="w-full flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent/30 transition-all text-left group"
                  >
                    <div className={`${guide.bgClass} p-2.5 rounded-lg shrink-0`}>
                      <Icon className={`h-5 w-5 ${guide.accentClass}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {guide.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {guide.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <button
                onClick={() => setSelectedGuide(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 w-fit"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </button>
              <DialogTitle className="text-2xl font-bold tracking-tight text-center text-foreground">
                {activeGuide?.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Enter your email to get instant access.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="w-full h-11 px-4 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 hover:shadow-elegant"
              >
                {loading ? "Sending…" : "Get Free Guide"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
