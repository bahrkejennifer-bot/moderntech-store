import { Link } from "react-router-dom";
import { ArrowLeft, Play, Headphones, Youtube, Share2, Subtitles, FileText, ChevronDown, ChevronUp, Instagram, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import thumbV004 from "@/assets/thumbnails/mtl-v004-thumbnail.jpg";
import thumbV005 from "@/assets/thumbnails/mtl-v005-thumbnail.jpg";

const EpisodeDetail = () => {
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    // Set document title for SEO
    document.title = "MTL-V004: We Almost Didn't Start — Ageism, AI & Why Women Need to Just Dive In | Modern Tech LLC";
    
    // Set meta tags
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', 'Jennifer and Anita share their powerful story about ageism in the workplace, discovering AI, and empowering women of all ages to embrace technology.');
    setMeta('og:title', 'We Almost Didn\'t Start — Ageism, AI & Why Women Need to Just Dive In — by Modern Tech LLC');
    setMeta('og:description', 'Jennifer + Anita\'s real story: from fear to courage to empowerment. A conversation every woman needs to hear.');
    setMeta('og:image', 'https://moderntech.store/thumbnails/mtl-v004-thumbnail.jpg');
    setMeta('og:type', 'video.episode');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'We Almost Didn\'t Start — Modern Tech LLC');
    setMeta('twitter:image', 'https://moderntech.store/thumbnails/mtl-v004-thumbnail.jpg');
    setMeta('keywords', 'women in tech podcast, AI for women, ageism workplace, women empowerment tech, modern tech llc, tech podcast 2026, women and AI, jennifer modern tech, tech for women over 40');
  }, []);

  const takeaways = [
    "Ageism in the workplace is real — but it doesn't define your future",
    "AI is a tool for empowerment, not replacement. Learn it, use it, own it.",
    "You don't have to be a 'tech person' to leverage technology for your business",
    "Starting late is still starting. There's no expiration date on ambition.",
    "Community and support systems matter — find your people and build together",
  ];

  return (
    <>
      <Navigation />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-8 pt-10">
        <Link
          to="/media"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Media Hub
        </Link>
      </div>

      {/* Episode Header */}
      <header className="max-w-4xl mx-auto px-8 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-primary text-primary-foreground font-mono text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">
            MTL-V004
          </span>
          <span className="bg-accent text-accent-foreground font-mono text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">
            MTL-P004
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
            Motivational Monday
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
          We Almost Didn't Start — Ageism, AI & Why Women Need to Just Dive In
        </h1>
        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
          by Modern Tech LLC · March 2026
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-8 pb-8"><div className="h-px bg-border" /></div>

      {/* Video Embed */}
      <section className="max-w-4xl mx-auto px-8 pb-12">
        <div className="relative aspect-video bg-card border border-border overflow-hidden group">
          <img
            src={thumbV004}
            alt="MTL-V004 Episode Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <a
              href="https://youtube.com/@ModernTechLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Play className="h-8 w-8 text-foreground ml-1" fill="currentColor" />
            </a>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[9px] tracking-[0.15em] px-2 py-1 flex items-center gap-1">
              <Subtitles className="h-3 w-3" /> CC Available
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <a
              href="https://youtube.com/@ModernTechLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-mono text-[9px] tracking-[0.15em] px-3 py-1.5 flex items-center gap-1.5 hover:bg-red-700 transition-colors"
            >
              <Youtube className="h-3.5 w-3.5" /> Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Podcast Embed */}
      <section className="max-w-4xl mx-auto px-8 pb-12">
        <div className="border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Headphones className="h-5 w-5 text-muted-foreground" />
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Listen to the Podcast</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
              <Headphones className="h-3.5 w-3.5" /> Spotify
            </a>
            <a href="#" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
              <Headphones className="h-3.5 w-3.5" /> Apple Podcasts
            </a>
            <a
              href="https://youtube.com/@ModernTechLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
            >
              <Youtube className="h-3.5 w-3.5" /> YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Empowerment Quote */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <div className="border-l-2 border-primary pl-8 py-6">
          <blockquote className="font-serif text-2xl md:text-3xl leading-snug tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            "You don't need permission. You just need to start."
          </blockquote>
          <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">— Jennifer</p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6" style={{ fontStyle: "italic", fontWeight: 400 }}>
          The Story Behind This Episode
        </h2>
        <div className="space-y-4 font-mono text-[11px] text-muted-foreground leading-[2]">
          <p>
            Jennifer and her friend Anita wanted to start their own business. What began as a casual conversation turned into something much deeper — a powerful discussion about ageism in the workplace and how women, especially those over 40, are made to feel irrelevant.
          </p>
          <p>
            Then they discovered AI. Instead of fearing it, they leaned in. They learned it. They embraced it. And now they want to empower every woman — young and older — to do the same.
          </p>
          <p>
            "You have to start somewhere." That simple truth became the foundation of Modern Tech LLC and the driving force behind everything they build and share.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* Key Takeaways */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-8" style={{ fontStyle: "italic", fontWeight: 400 }}>
          Key Takeaways
        </h2>
        <div className="space-y-4">
          {takeaways.map((point, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="font-mono text-[10px] tracking-[0.15em] text-primary mt-0.5 shrink-0">0{i + 1}</span>
              <p className="font-mono text-[11px] text-foreground leading-[1.8]">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* Transcript Toggle */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="h-4 w-4" />
          {showTranscript ? "Hide Transcript" : "View Full Transcript"}
          {showTranscript ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
        {showTranscript && (
          <div className="mt-6 border border-border bg-card p-6 font-mono text-[10px] text-muted-foreground leading-[2]">
            <p className="mb-4"><strong className="text-foreground">Jennifer:</strong> So Anita and I were sitting there, literally at my kitchen table, and we said — "What if we just... started?"</p>
            <p className="mb-4"><strong className="text-foreground">Anita:</strong> And I remember thinking, "But we're too old for this." That's actually what went through my mind. How sad is that?</p>
            <p className="mb-4"><strong className="text-foreground">Jennifer:</strong> And that's exactly the problem. That voice in your head? It's not yours. It's what the workplace told you. It's what society told you.</p>
            <p className="mb-4"><strong className="text-foreground">Anita:</strong> Once we started learning AI tools, everything changed. It wasn't scary anymore. It was like — oh, this is actually FOR us.</p>
            <p><strong className="text-foreground">Jennifer:</strong> You don't need permission. You just need to start. And that's what we did.</p>
            <p className="mt-4 text-muted-foreground/50 text-[9px]">Full transcript available upon request. Contact us at @ModernTechLLC.</p>
          </div>
        )}
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* Share Buttons */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Share This Episode</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://instagram.com/ModernTechLLC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> TikTok
          </a>
          <a
            href="https://youtube.com/@ModernTechLLC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Youtube className="h-3.5 w-3.5" /> YouTube
          </a>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* Next Episode Teaser */}
      <section className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Up Next</p>
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Next Episode
          </h2>
        </div>
        <div className="border border-border bg-card overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={thumbV005}
              alt="Upcoming episode"
              className="w-full h-full object-cover blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
              <p className="font-serif text-xl md:text-2xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
                Health Tech Thursday
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                MTL-V005 · March 20, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </>
  );
};

export default EpisodeDetail;
