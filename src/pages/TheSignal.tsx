import { Helmet } from "react-helmet-async";
import { Youtube, Music, Podcast, Moon, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { socialLinks } from "@/config/socialLinks";
import signalHeroBanner from "@/assets/signal-hero-banner.jpg.asset.json";
import afterDarkIntro from "@/assets/after-dark-series-intro.png.asset.json";
import podcastVideo from "@/assets/podcast-ai-employment-deep-dive.mp4.asset.json";

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

const TheSignal = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
      <Helmet>
        <title>The Art of Modern Tech — Weekly Podcast & Sleep Series</title>
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

      {/* After Dark Sleep Series Intro */}
      <section className="w-full px-4 md:px-8 py-12">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.35)" }}>
            AFTER DARK SLEEP SERIES
          </p>
          <img
            src={afterDarkIntro.url}
            alt="After Dark Sleep Series intro"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>
      </section>

      {/* Weekly Podcast */}
      <section className="max-w-[900px] mx-auto px-4 md:px-8 py-16 text-center">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.4)" }}>
          EVERY MONDAY NIGHT AT 8 PM
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-4" style={{ fontWeight: 400, letterSpacing: "-0.04em", color: "hsl(var(--primary-foreground))" }}>
          The Art of Modern Tech
        </h1>
        <p className="font-serif text-lg md:text-xl mb-8" style={{ fontWeight: 300, fontStyle: "italic", color: "hsl(var(--primary-foreground) / 0.6)" }}>
          A weekly conversation about technology, work, and the future.
        </p>
        <p className="font-mono text-[11px] leading-relaxed max-w-[540px] mx-auto" style={{ color: "hsl(var(--primary-foreground) / 0.55)" }}>
          Join Jennifer live every Monday night at 8 PM for honest tech talk, AI deep dives, and the stories that matter. Watch on YouTube or listen on Apple Podcasts and Spotify.
        </p>

        {/* Featured Podcast Episode — placed under the podcast heading */}
        <div className="mt-16 text-left">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.35)" }}>
            FEATURED EPISODE
          </p>
          <div className="w-full overflow-hidden" style={{ border: "0.5px solid hsl(var(--primary-foreground) / 0.12)" }}>
            <video
              src={podcastVideo.url}
              controls
              preload="metadata"
              className="w-full h-auto block"
              poster={afterDarkIntro.url}
            />
          </div>
          <div className="mt-6 text-center">
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-2" style={{ fontWeight: 400, color: "hsl(var(--primary-foreground))" }}>
              Is AI Coming For Your Job? A Deep Dive Into AI Employment
            </h2>
            <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}>
              The Art of Modern Tech · Monday Night Episode
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px" style={{ backgroundColor: "hsl(var(--primary-foreground) / 0.15)" }} />

      {/* Watch & Listen */}
      <section className="max-w-[700px] mx-auto px-4 md:px-8 pb-16">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.35)" }}>
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
              style={{ border: "0.5px solid hsl(var(--primary-foreground) / 0.12)", backgroundColor: "hsl(var(--primary-foreground) / 0.05)" }}
            >
              <div className="shrink-0 p-3 rounded-full" style={{ backgroundColor: "hsl(var(--destructive) / 0.1)" }}>
                <platform.icon className="w-5 h-5" style={{ color: "hsl(var(--destructive) / 0.8)" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl tracking-tight" style={{ fontWeight: 400, color: "hsl(var(--primary-foreground))" }}>
                    {platform.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "hsl(var(--primary-foreground) / 0.4)" }} />
                </div>
                <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}>
                  {platform.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px" style={{ backgroundColor: "hsl(var(--primary-foreground) / 0.15)" }} />

      {/* Deep Sleep */}
      <section className="max-w-[900px] mx-auto px-4 md:px-8 py-16">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.35)" }}>
          DEEP SLEEP VIDEOS
        </p>
        <div className="p-8" style={{ border: "0.5px solid hsl(var(--primary-foreground) / 0.12)", backgroundColor: "hsl(var(--primary-foreground) / 0.05)" }}>
          <div className="flex items-start gap-4 mb-4">
            <Moon className="w-5 h-5 shrink-0 mt-1" style={{ color: "hsl(var(--destructive) / 0.6)" }} />
            <div>
              <h3 className="font-serif text-xl tracking-tight mb-2" style={{ fontWeight: 400, color: "hsl(var(--primary-foreground))" }}>
                For Restless Minds
              </h3>
              <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "hsl(var(--primary-foreground) / 0.45)" }}>
                New videos every Tuesday & Saturday night
              </p>
            </div>
          </div>
          <p className="font-serif text-sm leading-relaxed" style={{ color: "hsl(var(--primary-foreground) / 0.6)", fontWeight: 300 }}>
            Wind down with calm, immersive sleep content designed to help you drift off. Twice a week — Tuesday and Saturday nights — we release gentle deep-sleep videos made for restless minds who need a little help unplugging.
          </p>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default TheSignal;