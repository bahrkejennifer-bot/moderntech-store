import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Radio, ArrowRight, Headphones, Moon, Youtube, Music, Podcast } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { toast } from "sonner";
import { requestLeadConfirmation, CHECK_INBOX_MESSAGE, ALREADY_CONFIRMED_MESSAGE } from "@/lib/leadConfirmation";
import { socialLinks } from "@/config/socialLinks";
import signalHeroBanner from "@/assets/signal-hero-banner.jpg.asset.json";
import afterDarkHero from "@/assets/after-dark-series.png.asset.json";

const TheSignal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const result = await requestLeadConfirmation({
        name: name.trim(),
        email: email.trim(),
        lead_magnet: "the-signal-podcast",
      });
      if (!result.success) {
        toast.error(result.error || "Something went wrong. Try again.");
        return;
      }
      toast.success(result.alreadyConfirmed ? ALREADY_CONFIRMED_MESSAGE : CHECK_INBOX_MESSAGE);
      setName("");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  const platformLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      description: "Watch every episode live and on demand.",
      href: socialLinks.youtube,
    },
    {
      name: "Apple Podcasts",
      icon: Podcast,
      description: "Subscribe and listen on the go.",
      href: "#",
    },
    {
      name: "Spotify",
      icon: Music,
      description: "Stream the full catalog in your feed.",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(30 8% 8%)", color: "hsl(30 25% 95%)" }}>
      <Helmet>
        <title>The Signal — The Art of Modern Tech Weekly Podcast</title>
        <meta name="description" content="Follow The Art of Modern Tech weekly podcast every Monday night at 8 PM on YouTube, Apple Podcasts, and Spotify. Deep sleep videos every Tuesday and Saturday night." />
      </Helmet>
      <Navigation />

      {/* Hero Banner */}
      <div className="w-full pt-24">
        <img
          src={signalHeroBanner.url}
          alt="The Art of Modern Tech podcast and After Dark Sleep Series"
          className="w-full h-auto block"
          loading="eager"
        />
      </div>

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-8 pt-16 pb-16 text-center">
        <div className="mb-8">
          <Radio className="w-6 h-6 mx-auto mb-6" style={{ color: "hsl(0 70% 45%)" }} />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: "hsl(30 25% 95% / 0.3)" }}>
            A MODERN TECH PRODUCTION
          </p>
        </div>

        <h1 className="font-serif text-7xl md:text-9xl tracking-tighter mb-4" style={{ fontWeight: 400, letterSpacing: "-0.04em" }}>
          THE SIGNAL
        </h1>
        <p className="font-serif text-lg md:text-xl mb-6" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(30 25% 95% / 0.5)" }}>
          The Art of Modern Tech — Live Every Monday Night at 8 PM
        </p>

        <div className="max-w-[500px] mx-auto mt-10">
          <p className="font-mono text-[11px] leading-relaxed" style={{ color: "hsl(30 25% 95% / 0.45)" }}>
            Hosted by Jennifer & Anita, live from Washington State. Join the conversation on YouTube, Apple Podcasts, and Spotify for tech, mystery, and the stories that matter.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px" style={{ backgroundColor: "hsl(0 70% 45% / 0.3)" }} />

      {/* Watch & Listen */}
      <section className="max-w-[700px] mx-auto px-8 py-16">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(30 25% 95% / 0.25)" }}>
          FOLLOW THE PODCAST
        </p>
        <div className="grid gap-4">
          {platformLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target={platform.href === "#" ? undefined : "_blank"}
              rel={platform.href === "#" ? undefined : "noopener noreferrer"}
              className="group flex items-start gap-5 p-6 transition-all hover:opacity-90"
              style={{ border: "0.5px solid hsl(30 25% 95% / 0.08)", backgroundColor: "hsl(30 8% 10%)" }}
            >
              <div className="shrink-0 p-3 rounded-full" style={{ backgroundColor: "hsl(0 70% 45% / 0.1)" }}>
                <platform.icon className="w-5 h-5" style={{ color: "hsl(0 70% 45% / 0.8)" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl tracking-tight" style={{ fontWeight: 400 }}>
                    {platform.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "hsl(30 25% 95% / 0.3)" }} />
                </div>
                <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(30 25% 95% / 0.35)" }}>
                  {platform.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px" style={{ backgroundColor: "hsl(0 70% 45% / 0.3)" }} />

      {/* Deep Sleep */}
      <section className="max-w-[700px] mx-auto px-8 py-16">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(30 25% 95% / 0.25)" }}>
          DEEP SLEEP VIDEOS
        </p>
        <div className="p-8" style={{ border: "0.5px solid hsl(30 25% 95% / 0.08)", backgroundColor: "hsl(30 8% 10%)" }}>
          <div className="flex items-start gap-4 mb-4">
            <Moon className="w-5 h-5 shrink-0 mt-1" style={{ color: "hsl(0 70% 45% / 0.6)" }} />
            <div>
              <h3 className="font-serif text-xl tracking-tight mb-2" style={{ fontWeight: 400 }}>
                For Restless Minds
              </h3>
              <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(30 25% 95% / 0.35)" }}>
                New videos every Tuesday & Saturday night
              </p>
            </div>
          </div>
          <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(30 25% 95% / 0.5)", fontWeight: 300 }}>
            Wind down with calm, immersive sleep content designed to help you drift off. Twice a week — Tuesday and Saturday nights — we release gentle deep-sleep videos made for restless minds who need a little help unplugging.
          </p>
        </div>
      </section>

      {/* Join Section */}
      <section className="max-w-[500px] mx-auto px-8 py-16 text-center">
        <Headphones className="w-6 h-6 mx-auto mb-4" style={{ color: "hsl(0 70% 45% / 0.5)" }} />
        <h2 className="font-serif text-3xl tracking-tight mb-2" style={{ fontWeight: 400 }}>
          Join the Signal
        </h2>
        <p className="font-mono text-[10px] tracking-[0.15em] mb-8" style={{ color: "hsl(30 25% 95% / 0.35)" }}>
          Get episode reminders and deep sleep drops. No spam. Just signals.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(30 25% 95% / 0.12)", color: "hsl(30 25% 95%)" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(30 25% 95% / 0.12)", color: "hsl(30 25% 95%)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "hsl(0 70% 45%)", color: "hsl(30 25% 95%)" }}
          >
            {loading ? "Joining..." : "Join the Investigation"} <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      </section>

      {/* Social */}
      <section className="max-w-[500px] mx-auto px-8 pb-20 text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(30 25% 95% / 0.2)" }}>
          FOLLOW THE SIGNAL
        </p>
        <div className="flex justify-center gap-6">
          {["YouTube", "Spotify", "Apple Podcasts"].map((platform) => (
            <span key={platform} className="font-mono text-[10px] tracking-[0.1em] cursor-pointer hover:opacity-60 transition-opacity" style={{ color: "hsl(30 25% 95% / 0.4)" }}>
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
