import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Play, Headphones, Youtube, Clock, Subtitles, FileText, Instagram, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

const thumbMap: Record<string, string> = {
  "/thumbnails/mtl-v001-thumbnail.jpg": thumbV001,
  "/thumbnails/mtl-v002-thumbnail.jpg": thumbV002,
  "/thumbnails/mtl-v003-thumbnail.jpg": thumbV003,
  "/thumbnails/mtl-v004-thumbnail.jpg": thumbV004,
  "/thumbnails/mtl-v005-thumbnail.jpg": thumbV005,
  "/thumbnails/mtl-v006-thumbnail.jpg": thumbV006,
  "/thumbnails/mtl-v007-thumbnail.jpg": thumbV007,
  "/thumbnails/mtl-v008-thumbnail.jpg": thumbV008,
};

const resolveThumb = (url: string | null) => {
  if (!url) return thumbV001;
  return thumbMap[url] || url;
};

const weeklySchedule = [
  { day: "Monday", name: "Motivational Monday", icon: "💪", desc: "Empowerment, stories & courage to start", thumb: thumbV001 },
  { day: "Tuesday", name: "Tech Tuesday", icon: "💻", desc: "Latest tech reviews, tools & gadgets", thumb: thumbV002 },
  { day: "Wednesday", name: "Workflow Wednesday", icon: "🤖", desc: "AI workflows & why humans still matter", thumb: thumbV003 },
  { day: "Thursday", name: "Health Tech Thursday", icon: "❤️‍🔬", desc: "Newest health tech & future wellness gadgets", thumb: thumbV005 },
  { day: "Friday", name: "Fun Tech Friday", icon: "🎉", desc: "Wacky, cool gadgets we actually use", thumb: thumbV006 },
  { day: "Saturday", name: "Strategy Saturday", icon: "♟️", desc: "Business strategies, tips & interviews", thumb: thumbV007 },
  { day: "Sunday", name: "Solace Sunday", icon: "🌿", desc: "Unplug, reflect & reconnect with loved ones", thumb: thumbV008 },
];

const ArtOfModernTech = () => {
  const { data: videos = [] } = useQuery({
    queryKey: ["media-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("type", "video")
        .eq("is_published", true)
        .order("publish_date", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const { data: podcasts = [] } = useQuery({
    queryKey: ["media-podcasts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("type", "podcast")
        .eq("is_published", true)
        .order("publish_date", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ["hub-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, category, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const makeEpisodeLink = (ep: any) =>
    `/media/${ep.episode_code.toLowerCase()}`;

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>The Art of Modern Tech — Videos, Podcast & Blog</title>
        <meta name="description" content="Watch, listen, and read — weekly tech videos, podcast, and editorial blog posts from Modern Tech LLC." />
        <meta property="og:title" content="The Art of Modern Tech — Videos, Podcast & Blog" />
        <meta property="og:description" content="Weekly tech videos, podcast, and editorial blog posts for women ready to lead the future." />
        <meta property="og:url" content="https://moderntech.store/the-art-of-modern-tech" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${mediaHubHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative max-w-4xl mx-auto px-8 py-24 md:py-32 text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">The Art of Modern Tech</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Watch. Listen.<br />Read. Be Empowered.
          </h1>
          <p className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted-foreground max-w-lg mx-auto leading-[2]">
            Weekly tech videos, podcast episodes & editorial blog posts for women ready to lead the future
          </p>
        </div>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Your Weekly Lineup</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>The Art of Tech</h2>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground max-w-md mx-auto leading-[1.8]">
            Seven days. Seven themes. One mission: empowering you with tech that matters.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {weeklySchedule.map((item) => (
            <div key={item.day} className="group relative overflow-hidden border border-border bg-card hover:bg-accent/5 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.thumb} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>Videos</h2>
          </div>
          <a href="https://youtube.com/@ModernTechLLC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <Youtube className="h-4 w-4" /> Subscribe
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: any) => (
            <Link key={video.id} to={makeEpisodeLink(video)} className="group block border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img src={resolveThumb(video.thumbnail_url)} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[9px] tracking-[0.15em] px-2 py-1">{video.episode_code}</span>
                  {video.day_theme && (
                    <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground font-mono text-[9px] tracking-[0.15em] px-2 py-1">{video.day_theme}</span>
                  )}
                </div>
                {video.has_cc && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[8px] tracking-[0.15em] px-2 py-1 flex items-center gap-1">
                      <Subtitles className="h-3 w-3" /> CC
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg leading-snug tracking-tight" style={{ fontWeight: 500 }}>{video.title}</h3>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-[1.8] line-clamp-2">{video.description}</p>
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
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>The Art of Modern Tech Podcast</h2>
          </div>
          <Link to="/the-signal" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <Headphones className="h-4 w-4" /> Full Page
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts.map((pod: any) => (
            <Link key={pod.id} to={makeEpisodeLink(pod)} className="group flex border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="w-40 md:w-48 shrink-0 overflow-hidden">
                <img src={resolveThumb(pod.thumbnail_url)} alt={pod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{pod.episode_code}</span>
                <h3 className="font-serif text-lg leading-snug tracking-tight mt-1" style={{ fontWeight: 500 }}>{pod.title}</h3>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-[1.8] line-clamp-2">{pod.description}</p>
                {pod.has_transcript && (
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

      {/* BLOG HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">From the Blog</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>The Blueprint</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" /> Read All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post: any) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
              {post.image_url && (
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              )}
              <div className="p-5">
                {post.category && (
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground">{post.category}</span>
                )}
                <h3 className="font-serif text-base leading-snug tracking-tight mt-1" style={{ fontWeight: 500 }}>{post.title}</h3>
                {post.excerpt && (
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-[1.8] line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* SUBSCRIBE */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Never Miss an Episode</p>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>Subscribe & Stay Connected</h2>
        <p className="mt-4 font-mono text-[10px] text-muted-foreground max-w-md mx-auto leading-[1.8]">
          Join thousands of women leveling up with tech. New episodes every week across all platforms.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="https://youtube.com/@ModernTechLLC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Youtube className="h-4 w-4" /> YouTube
          </a>
          <a href="#" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Headphones className="h-4 w-4" /> Spotify
          </a>
          <a href="#" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Headphones className="h-4 w-4" /> Apple Podcasts
          </a>
          <a href="https://instagram.com/ModernTechLLC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default ArtOfModernTech;
