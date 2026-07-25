import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { z } from "zod";
import {
  requestLeadConfirmation,
  CHECK_INBOX_MESSAGE,
  ALREADY_CONFIRMED_MESSAGE,
} from "@/lib/leadConfirmation";

const schema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Enter a valid email").max(255),
});

const LEAD_MAGNET = "modern-tech-edit";

export const ModernTechEditSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const parsed = schema.safeParse({ name: name || undefined, email });
    if (!parsed.success) {
      setStatus({ ok: false, msg: parsed.error.errors[0]?.message || "Check your input." });
      return;
    }
    setLoading(true);
    const res = await requestLeadConfirmation({
      name: parsed.data.name,
      email: parsed.data.email,
      lead_magnet: LEAD_MAGNET,
    });
    setLoading(false);
    if (!res.success) {
      setStatus({ ok: false, msg: res.error || "Something went wrong. Try again." });
      return;
    }
    setStatus({
      ok: true,
      msg: res.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE,
    });
    setName("");
    setEmail("");
  };

  return (
    <section className="mb-20 border border-border bg-card">
      <div className="relative py-16 px-8 md:px-14 text-center max-w-2xl mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          The Newsletter
        </p>
        <h3
          className="font-serif text-3xl md:text-4xl mb-4"
          style={{ fontStyle: "italic", fontWeight: 500, color: "#000000" }}
        >
          The Modern Tech Edit
        </h3>
        <p className="font-mono text-[11px] text-muted-foreground mb-10 max-w-md mx-auto leading-[1.8]">
          A weekly, curated edit of the tech worth owning — reviews, buying guides,
          and the deals we actually recommend. Confirm your email to join.
        </p>

        {status?.ok ? (
          <div className="flex items-start gap-3 justify-center text-left max-w-md mx-auto border border-foreground/20 p-5 bg-background">
            <Check className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="font-mono text-[11px] leading-relaxed text-foreground">{status.msg}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="First name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="h-12 rounded-none bg-background border-border font-mono text-xs"
              disabled={loading}
            />
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="h-12 rounded-none bg-background border-border font-mono text-xs"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-mono text-[10px] tracking-[0.2em] uppercase rounded-none"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe to The Edit <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </>
              )}
            </Button>
            {status && !status.ok && (
              <p className="font-mono text-[10px] text-destructive text-left">{status.msg}</p>
            )}
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground pt-2">
              Double opt-in · Unsubscribe anytime
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default ModernTechEditSignup;
