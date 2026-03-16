import { Link } from "react-router-dom";
import { ArrowLeft, Play, Headphones, Youtube, Clock, Subtitles, FileText, Instagram, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import mediaHubHero from "@/assets/media-hub-hero.jpg";
import thumbV001 from "@/assets/thumbnails/mtl-v001-thumbnail.jpg";
import thumbV002 from "@/assets/thumbnails/mtl-v002-thumbnail.jpg";
import thumbV003 from "@/assets/thumbnails/mtl-v003-thumbnail.jpg";
import thumbV004 from "@/assets/thumbnails/mtl-v004-thumbnail.jpg";
import thumbV005 from "@/assets/thumbnails/mtl-v005-thumbnail.jpg";
import thumbV006 from "@/assets/thumbnails/mtl-v006-thumbnail.jpg";
import thumbV007 from "@/assets/thumbnails/mtl-v007-thumbnail.jpg";
import thumbV008 from "@/assets/thumbnails/mtl-v008-thumbnail.jpg";

const videos = [
  {
    id: "mtl-v004",
    code: "MTL-V004",
    title: "We Almost Didn't Start — Ageism, AI & Why Women Need to Just Dive In",
    description: "Jennifer + Anita's real story: from fear → courage → empowerment. A conversation about ageism, AI, and why you just need to start.",
    thumbnail: thumbV004,
    day: "Motivational Monday",
    hasCC: true,
    featured: true,
    link: "/media/mtl-v004",
  },
  {
    id: "mtl-v002",
    code: "MTL-V002",
    title: "5 AI Tools Every Woman Entrepreneur Should Know in 2026",
    description: "The exact tools we use daily to run Modern Tech LLC — no fluff, just results.",
    thumbnail: thumbV002,
    day: "Tech Tuesday",
    hasCC: true,
    link: "#",
  },
  {
    id: "mtl-v003",
    code: "MTL-V003",
    title: "Our Complete AI Workflow: From Idea to Published in 2 Hours",
    description: "Behind the scenes of how we create content, manage products, and automate — with AI doing the heavy lifting.",
    thumbnail: thumbV003,
    day: "Workflow Wednesday",
    hasCC: true,
    link: "#",
  },
];

const podcasts = [
  {
    id: "mtl-p004",
    code: "MTL-P004",
    title: "We Almost Didn't Start — Ageism, AI & Why Women Need to Just Dive In",
    description: "The full uncut conversation. Jennifer and Anita go deep on workplace ageism, discovering AI, and empowering women of all ages.",
    thumbnail: thumbV004,
    hasTranscript: true,
    link: "/media/mtl-v004",
  },
  {
    id: "mtl-p001",
    code: "MTL-P001",
    title: "Why We Started Modern Tech LLC — The Origin Story",
    description: "From kitchen table conversations to a full tech brand. The real story behind Modern Tech.",
    thumbnail: thumbV001,
    hasTranscript: true,
    link: "#",
  },
];

const weeklySchedule = [
  { day: "Monday", name: "Motivational Monday", color: "from-green-400 to-pink-500", icon: "💪", desc: "Empowerment, stories & courage to start", thumb: thumbV001 },
  { day: "Tuesday", name: "Tech Tuesday", color: "from-purple-500 to-cyan-400", icon: "💻", desc: "Latest tech reviews, tools & gadgets", thumb: thumbV002 },
  { day: "Wednesday", name: "Workflow Wednesday", color: "from-orange-400 to-blue-500", icon: "🤖", desc: "AI workflows & why humans still matter", thumb: thumbV003 },
  { day: "Thursday", name: "Health Tech Thursday", color: "from-teal-400 to-pink-500", icon: "❤️‍🔬", desc: "Newest health tech & future wellness gadgets", thumb: thumbV005 },
  { day: "Friday", name: "Fun Tech Friday", color: "from-yellow-400 to-pink-500", icon: "🎉", desc: "Wacky, cool gadgets we actually use", thumb: thumbV006 },
  { day: "Saturday", name: "Strategy Saturday", color: "from-amber-400 to-blue-600", icon: "♟️", desc: "Business strategies, tips & interviews", thumb: thumbV007 },
  { day: "Sunday", name: "Solace Sunday", color: "from-lavender to-orange-300", icon: "🌿", desc: "Unplug, reflect & reconnect with loved ones", thumb: thumbV008 },
];

const MediaHub = () => {
  return (
    <>
      <Navigation />

      {/* SEO meta */}
      <title>Watch & Listen | Modern Tech LLC Videos & Podcast</title>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-8 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden mt-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${mediaHubHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative max-w-4xl mx-auto px-8 py-24 md:py-32 text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            The Art of Modern Tech
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Watch. Listen. Be Empowered.
          </h1>
          <p className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted-foreground max-w-lg mx-auto leading-[2]">
            Weekly tech videos & podcast episodes for women ready to lead the future
          </p>
          <p className="mt-4 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60">
            @ModernTechLLC — YouTube · Instagram · TikTok
          </p>
        </div>
      </section>

      {/* WEEKLY SCHEDULE — "The Art of Tech" */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Your Weekly Lineup</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            The Art of Tech
          </h2>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground max-w-md mx-auto leading-[1.8]">
            Seven days. Seven themes. One mission: empowering you with tech that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {weeklySchedule.map((item) => (
            <div key={item.day} className="group relative overflow-hidden border border-border bg-card hover:bg-accent/5 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.thumb}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground">{item.day}</p>
                <p className="font-serif text-sm mt-1" style={{ fontWeight: 500 }}>{item.name}</p>
                <p className="font-mono text-[9px] text-muted-foreground mt-1 leading-[1.6]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* LATEST VIDEOS */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Latest Episodes</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
              Videos
            </h2>
          </div>
          <a
            href="https://youtube.com/@ModernTechLLC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Youtube className="h-4 w-4" />
            Subscribe
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video.id}
              to={video.link}
              className="group block border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Vibrant thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[9px] tracking-[0.15em] px-2 py-1">
                    {video.code}
                  </span>
                  <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground font-mono text-[9px] tracking-[0.15em] px-2 py-1">
                    {video.day}
                  </span>
                </div>
                {video.hasCC && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[8px] tracking-[0.15em] px-2 py-1 flex items-center gap-1">
                      <Subtitles className="h-3 w-3" /> CC
                    </span>
                  </div>
                )}
                {video.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground font-mono text-[8px] tracking-[0.15em] px-2 py-1 uppercase">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              {/* Card body */}
              <div className="p-5">
                <h3 className="font-serif text-lg leading-snug tracking-tight" style={{ fontWeight: 500 }}>
                  {video.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-[1.8] line-clamp-2">
                  {video.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* LATEST PODCASTS */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Latest Episodes</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
              Podcast
            </h2>
          </div>
          <div className="flex gap-4">
            <a href="#" className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" /> Spotify
            </a>
            <a href="#" className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" /> Apple
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts.map((pod) => (
            <Link
              key={pod.id}
              to={pod.link}
              className="group flex border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="w-40 md:w-48 shrink-0 overflow-hidden">
                <img
                  src={pod.thumbnail}
                  alt={pod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{pod.code}</span>
                <h3 className="font-serif text-lg leading-snug tracking-tight mt-1" style={{ fontWeight: 500 }}>
                  {pod.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-[1.8] line-clamp-2">
                  {pod.description}
                </p>
                {pod.hasTranscript && (
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[8px] tracking-[0.15em] uppercase text-muted-foreground">
                    <FileText className="h-3 w-3" /> Transcript Available
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* UPCOMING */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Coming Soon</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Next Episode
          </h2>
        </div>

        <div className="max-w-2xl mx-auto border border-border bg-card overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={thumbV005}
              alt="Upcoming episode"
              className="w-full h-full object-cover blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
              <Clock className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="font-serif text-2xl md:text-3xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
                March 20, 2026
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                Health Tech Thursday — MTL-V005
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-4 max-w-sm text-center leading-[1.8]">
                The smartwatch features doctors wish you knew about — and the ones that could save your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* SUBSCRIBE BANNER */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Never Miss an Episode</p>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
          Subscribe & Stay Connected
        </h2>
        <p className="mt-4 font-mono text-[10px] text-muted-foreground max-w-md mx-auto leading-[1.8]">
          Join thousands of women leveling up with tech. New episodes every week across all platforms.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://youtube.com/@ModernTechLLC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Youtube className="h-4 w-4" /> YouTube
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Headphones className="h-4 w-4" /> Spotify
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Headphones className="h-4 w-4" /> Apple Podcasts
          </a>
          <a
            href="https://instagram.com/ModernTechLLC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
        <p className="mt-6 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">
          @ModernTechLLC everywhere
        </p>
      </section>

      <AffiliateFooter />
    </>
  );
};

export default MediaHub;
