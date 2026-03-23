import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const benefits = [
  "Learn the 5 essential steps to launch your first affiliate site — even with zero experience",
  "Get our plug-and-play niche validation template so you pick a winner on day one",
  "Discover the #1 traffic source most beginners ignore (hint: it's not SEO)",
];

const FreeGuide = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      // Save to lead_captures
      await supabase.from("lead_captures").insert({
        name: name.trim(),
        email: email.trim(),
        lead_magnet: "free-affiliate-quick-start",
      });

      // Trigger email notification
      await supabase.functions.invoke("send-welcome-email", {
        body: { name: name.trim(), email: email.trim(), lead_magnet: "amazon-associate-guide" },
      });

      toast.success("Check your inbox! Your free guide is on the way.");
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vogue-theme min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>Free Amazon Affiliate Quick-Start Guide — ModernTech</title>
        <meta name="description" content="The 5-step checklist that shows you exactly how to set up your first affiliate site — completely free." />
      </Helmet>
      <Navigation />

      <section className="max-w-[600px] mx-auto px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
            FREE DOWNLOAD
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] mb-4" style={{ fontWeight: 400 }}>
            Get the Free Amazon Affiliate Quick-Start Guide
          </h1>
          <p className="font-serif text-lg leading-relaxed" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(40 10% 12% / 0.6)" }}>
            The 5-step checklist that shows you exactly how to set up your first affiliate site — free.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-14">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none transition-colors focus:border-current"
            style={{ border: "0.5px solid hsl(40 10% 12% / 0.2)", color: "hsl(40 10% 12%)" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none transition-colors focus:border-current"
            style={{ border: "0.5px solid hsl(40 10% 12% / 0.2)", color: "hsl(40 10% 12%)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}
          >
            {loading ? "Sending..." : "Send My Free Guide"} <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        {/* Benefits */}
        <div className="space-y-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 w-5 h-5 flex items-center justify-center mt-0.5" style={{ border: "0.5px solid hsl(40 10% 12% / 0.2)" }}>
                <Check className="w-3 h-3" style={{ color: "hsl(40 10% 12% / 0.5)" }} />
              </div>
              <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(40 10% 12% / 0.65)", fontWeight: 300 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default FreeGuide;
