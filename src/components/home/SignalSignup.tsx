import { useState } from "react";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestLeadConfirmation, CHECK_INBOX_MESSAGE, ALREADY_CONFIRMED_MESSAGE } from "@/lib/leadConfirmation";

// Reuses the existing weekly newsletter list (same lead magnet as the The Signal signup) with double opt-in.
const LEAD_MAGNET = "modern-tech-edit";
const schema = z.object({ email: z.string().trim().email("Enter a valid email address.").max(255) });

const SignalSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const parsed = schema.safeParse({ email });
    if (!parsed.success) { setStatus({ ok: false, msg: parsed.error.errors[0]?.message || "Check your email." }); return; }
    setLoading(true);
    const res = await requestLeadConfirmation({ email: parsed.data.email, lead_magnet: LEAD_MAGNET });
    setLoading(false);
    if (!res.success) { setStatus({ ok: false, msg: res.error || "Something went wrong. Please try again." }); return; }
    setStatus({ ok: true, msg: res.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE });
    setEmail("");
  };

  if (status?.ok) return <p role="status" className="flex items-start gap-3 rounded-2xl bg-card p-5 text-base"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />{status.msg}</p>;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Join The Signal newsletter" className="w-full">
      <label htmlFor="signal-email" className="mb-2 block text-sm font-medium">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input id="signal-email" type="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} disabled={loading}
          aria-invalid={status && !status.ok ? true : undefined} aria-describedby="signal-help" className="h-12 rounded-full bg-card px-5 text-base" />
        <Button type="submit" variant="outline" size="lg" disabled={loading} className="min-h-12 rounded-full px-6 text-base">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Sending" /> : "Join The Signal"}
        </Button>
      </div>
      <p id="signal-help" role={status && !status.ok ? "alert" : undefined} className={`mt-3 text-sm ${status && !status.ok ? "text-destructive" : "text-muted-foreground"}`}>
        {status && !status.ok ? status.msg : "The Signal, our weekly tech newsletter: one email a week. Confirm by email to join. Unsubscribe anytime."}
      </p>
    </form>
  );
};

export default SignalSignup;
