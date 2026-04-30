import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, MailCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { toast } from "sonner";
import { requestLeadConfirmation, CHECK_INBOX_MESSAGE, ALREADY_CONFIRMED_MESSAGE } from "@/lib/leadConfirmation";

const benefits = [
  "Learn the 5 essential steps to launch your first affiliate site — even with zero experience",
  "Get our plug-and-play niche validation template so you pick a winner on day one",
  "Discover the #1 traffic source most beginners ignore (hint: it's not SEO)",
];

const FreeGuide = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<null | "pending" | "already">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const result = await requestLeadConfirmation({
        name: name.trim(),
        email: email.trim(),
        lead_magnet: "free-affiliate-quick-start",
      });
      if (!result.success) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(result.alreadyConfirmed ? "already" : "pending");
      toast.success(result.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vogue-theme min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Free Amazon Affiliate Quick-Start Guide — ModernTech</title>
        <meta name="description" content="The 5-step checklist that shows you exactly how to set up your first affiliate site — completely free." />
      </Helmet>
      <Navigation />

      <section className="max-w-[600px] mx-auto px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
            FREE DOWNLOAD
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] mb-4" style={{ fontWeight: 400 }}>
            Get the Free Amazon Affiliate Quick-Start Guide
          </h1>
          <p className="font-serif text-lg leading-relaxed" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(220 15% 14% / 0.6)" }}>
            The 5-step checklist that shows you exactly how to set up your first affiliate site — free.
          </p>
        </div>

        {/* Form / Confirmation state */}
        {submitted ? (
          <div className="mb-14 p-8 text-center" style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)" }}>
            <MailCheck className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(220 15% 14%)" }} />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              {submitted === "already" ? "Welcome back" : "One last step"}
            </p>
            <h2 className="font-serif text-2xl mb-3" style={{ fontWeight: 400 }}>
              {submitted === "already" ? "We've resent your guide" : "Check your inbox"}
            </h2>
            <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
              {submitted === "already"
                ? `Your guide is on its way to ${email}.`
                : `We just sent a confirmation link to ${email}. Click it to receive your free guide.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mb-14">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              required
              maxLength={100}
              className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none transition-colors focus:border-current"
              style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              maxLength={255}
              className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none transition-colors focus:border-current"
              style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
            >
              {loading ? "Sending..." : "Send Confirmation Link"} <ArrowRight className="w-3 h-3" />
            </button>
            <p className="font-mono text-[10px] tracking-[0.1em] text-center" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
              We'll email you to confirm — your guide unlocks after one click.
            </p>
          </form>
        )}

        {/* Benefits */}
        <div className="space-y-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 w-5 h-5 flex items-center justify-center mt-0.5" style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)" }}>
                <Check className="w-3 h-3" style={{ color: "hsl(220 15% 14% / 0.5)" }} />
              </div>
              <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.65)", fontWeight: 300 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default FreeGuide;
