import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Radio, ArrowRight, Headphones, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TheSignal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      await supabase.from("lead_captures").insert({
        name: name.trim(),
        email: email.trim(),
        lead_magnet: "the-signal-podcast",
      });
      toast.success("You're in. Welcome to the investigation.");
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(30 8% 8%)", color: "hsl(40 18% 91%)" }}>
      <Helmet>
        <title>The Signal — Where Mystery Meets Reality</title>
        <meta name="description" content="Hosted by Jennifer & Anita. Unexplained phenomena. Hidden truths. Real conversations. Every Wednesday night." />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-8 pt-24 pb-16 text-center">
        <div className="mb-8">
          <Radio className="w-6 h-6 mx-auto mb-6" style={{ color: "hsl(0 70% 45%)" }} />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: "hsl(40 18% 91% / 0.3)" }}>
            A MODERN TECH PRODUCTION
          </p>
        </div>

        <h1 className="font-serif text-7xl md:text-9xl tracking-tighter mb-4" style={{ fontWeight: 400, letterSpacing: "-0.04em" }}>
          THE SIGNAL
        </h1>
        <p className="font-serif text-lg md:text-xl mb-6" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(40 18% 91% / 0.5)" }}>
          Where Mystery Meets Reality — Every Wednesday Night
        </p>

        <div className="max-w-[500px] mx-auto mt-10">
          <p className="font-mono text-[11px] leading-relaxed" style={{ color: "hsl(40 18% 91% / 0.45)" }}>
            Hosted by Jennifer & Anita, live from Washington State. Unexplained phenomena. Hidden truths. Real conversations.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px" style={{ backgroundColor: "hsl(0 70% 45% / 0.3)" }} />

      {/* Episode 1 */}
      <section className="max-w-[700px] mx-auto px-8 py-16">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 18% 91% / 0.25)" }}>
          EPISODE 01
        </p>
        <div className="p-8" style={{ border: "0.5px solid hsl(40 18% 91% / 0.08)", backgroundColor: "hsl(30 8% 10%)" }}>
          <div className="flex items-start gap-4 mb-4">
            <Eye className="w-5 h-5 shrink-0 mt-1" style={{ color: "hsl(0 70% 45% / 0.6)" }} />
            <div>
              <h3 className="font-serif text-xl tracking-tight mb-2" style={{ fontWeight: 400 }}>
                ARE WE ALONE? The Evidence for Alien Life in 2026
              </h3>
              <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(40 18% 91% / 0.35)" }}>
                Season 1 · Coming Soon
              </p>
            </div>
          </div>
          <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(40 18% 91% / 0.5)", fontWeight: 300 }}>
            From Pentagon UAP reports to deep-ocean anomalies — Jennifer & Anita examine the evidence that 2026 might be the year everything changes.
          </p>
        </div>
      </section>

      {/* Join Section */}
      <section className="max-w-[500px] mx-auto px-8 py-16 text-center">
        <Headphones className="w-6 h-6 mx-auto mb-4" style={{ color: "hsl(0 70% 45% / 0.5)" }} />
        <h2 className="font-serif text-3xl tracking-tight mb-2" style={{ fontWeight: 400 }}>
          Join the Investigation
        </h2>
        <p className="font-mono text-[10px] tracking-[0.15em] mb-8" style={{ color: "hsl(40 18% 91% / 0.35)" }}>
          Get notified when new episodes drop. No spam. Just signals.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(40 18% 91% / 0.12)", color: "hsl(40 18% 91%)" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(40 18% 91% / 0.12)", color: "hsl(40 18% 91%)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "hsl(0 70% 45%)", color: "hsl(40 18% 91%)" }}
          >
            {loading ? "Joining..." : "Join the Investigation"} <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      </section>

      {/* Social */}
      <section className="max-w-[500px] mx-auto px-8 pb-20 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(40 18% 91% / 0.2)" }}>
          FOLLOW THE SIGNAL
        </p>
        <div className="flex justify-center gap-6">
          {["YouTube", "Spotify", "Apple Podcasts"].map((platform) => (
            <span key={platform} className="font-mono text-[10px] tracking-[0.1em] cursor-pointer hover:opacity-60 transition-opacity" style={{ color: "hsl(40 18% 91% / 0.4)" }}>
              {platform}
            </span>
          ))}
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default TheSignal;
