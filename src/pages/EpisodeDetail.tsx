import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play, Headphones, Youtube, Share2, Subtitles, FileText, ChevronDown, ChevronUp, Instagram, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import thumbV001 from "@/assets/thumbnails/mtl-v001-thumbnail.jpg";
import thumbV002 from "@/assets/thumbnails/mtl-v002-thumbnail.jpg";
import thumbV003 from "@/assets/thumbnails/mtl-v003-thumbnail.jpg";
import thumbV004 from "@/assets/thumbnails/mtl-v004-thumbnail.jpg";
import thumbV005 from "@/assets/thumbnails/mtl-v005-thumbnail.jpg";

const thumbMap: Record<string, string> = {
  "/thumbnails/mtl-v001-thumbnail.jpg": thumbV001,
  "/thumbnails/mtl-v002-thumbnail.jpg": thumbV002,
  "/thumbnails/mtl-v003-thumbnail.jpg": thumbV003,
  "/thumbnails/mtl-v004-thumbnail.jpg": thumbV004,
  "/thumbnails/mtl-v005-thumbnail.jpg": thumbV005,
};

const resolveThumb = (url: string | null) => {
  if (!url) return thumbV004;
  return thumbMap[url] || url;
};

const EpisodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showTranscript, setShowTranscript] = useState(false);

  // Fetch all episodes matching this code (video + podcast pair)
  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["episode-detail", id],
    queryFn: async () => {
      // id is like "mtl-v004" — find matching video & podcast
      const code = (id || "").toUpperCase();
      const baseNum = code.replace(/^MTL-[VP]/, "");
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("is_published", true)
        .or(`episode_code.eq.MTL-V${baseNum},episode_code.eq.MTL-P${baseNum}`)
        .order("type", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const videoEp = episodes.find((e: any) => e.type === "video") || episodes[0];
  const podcastEp = episodes.find((e: any) => e.type === "podcast");
  const ep = videoEp;

  useEffect(() => {
    if (!ep) return;
    document.title = `${ep.episode_code}: ${ep.title} | Modern Tech LLC`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") || name.startsWith("twitter:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", ep.description || "");
    setMeta("og:title", `${ep.title} — by Modern Tech LLC`);
    setMeta("og:description", ep.description || "");
    setMeta("og:type", "video.episode");
    setMeta("twitter:card", "summary_large_image");
  }, [ep]);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="max-w-4xl mx-auto px-8 py-32 text-center">
          <p className="font-mono text-sm text-muted-foreground">Loading episode…</p>
        </div>
      </>
    );
  }

  if (!ep) {
    return (
      <>
        <Navigation />
        <div className="max-w-4xl mx-auto px-8 py-32 text-center">
          <p className="font-serif text-2xl">Episode not found</p>
          <Link to="/media" className="mt-4 inline-block font-mono text-[10px] text-muted-foreground hover:text-foreground">← Back to Media Hub</Link>
        </div>
      </>
    );
  }

  const takeaways: string[] = Array.isArray(ep.takeaways) ? ep.takeaways as string[] : [];

  return (
    <>
      <Navigation />

      <div className="max-w-6xl mx-auto px-8 pt-10">
        <Link to="/media" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to Media Hub
        </Link>
      </div>

      {/* Episode Header */}
      <header className="max-w-4xl mx-auto px-8 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-primary text-primary-foreground font-mono text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">{ep.episode_code}</span>
          {podcastEp && (
            <span className="bg-accent text-accent-foreground font-mono text-[9px] tracking-[0.2em] px-3 py-1.5 uppercase">{podcastEp.episode_code}</span>
          )}
          {ep.day_theme && (
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{ep.day_theme}</span>
          )}
        </div>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
          {ep.title}
        </h1>
        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">by Modern Tech LLC</p>
      </header>

      <div className="max-w-4xl mx-auto px-8 pb-8"><div className="h-px bg-border" /></div>

      {/* Video Embed */}
      <section className="max-w-4xl mx-auto px-8 pb-12">
        <div className="relative aspect-video bg-card border border-border overflow-hidden group">
          <img src={resolveThumb(ep.thumbnail_url)} alt={ep.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <a href={ep.youtube_url || "https://youtube.com/@ModernTechLLC"} target="_blank" rel="noopener noreferrer" className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-foreground ml-1" fill="currentColor" />
            </a>
          </div>
          {ep.has_cc && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-black/70 backdrop-blur-sm text-white font-mono text-[9px] tracking-[0.15em] px-2 py-1 flex items-center gap-1">
                <Subtitles className="h-3 w-3" /> CC Available
              </span>
            </div>
          )}
          <div className="absolute bottom-4 right-4">
            <a href={ep.youtube_url || "https://youtube.com/@ModernTechLLC"} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white font-mono text-[9px] tracking-[0.15em] px-3 py-1.5 flex items-center gap-1.5 hover:bg-red-700 transition-colors">
              <Youtube className="h-3.5 w-3.5" /> Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Podcast Embed */}
      {podcastEp && (
        <section className="max-w-4xl mx-auto px-8 pb-12">
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="h-5 w-5 text-muted-foreground" />
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Listen to the Podcast</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {podcastEp.spotify_url && (
                <a href={podcastEp.spotify_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
                  <Headphones className="h-3.5 w-3.5" /> Spotify
                </a>
              )}
              {podcastEp.apple_url && (
                <a href={podcastEp.apple_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
                  <Headphones className="h-3.5 w-3.5" /> Apple Podcasts
                </a>
              )}
              {!podcastEp.spotify_url && !podcastEp.apple_url && (
                <>
                  <a href="#" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
                    <Headphones className="h-3.5 w-3.5" /> Spotify
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
                    <Headphones className="h-3.5 w-3.5" /> Apple Podcasts
                  </a>
                </>
              )}
              <a href={ep.youtube_url || "https://youtube.com/@ModernTechLLC"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
                <Youtube className="h-3.5 w-3.5" /> YouTube
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Empowerment Quote */}
      {ep.quote_text && (
        <section className="max-w-3xl mx-auto px-8 pb-12">
          <div className="border-l-2 border-primary pl-8 py-6">
            <blockquote className="font-serif text-2xl md:text-3xl leading-snug tracking-tight" style={{ fontStyle: "italic", fontWeight: 400 }}>
              "{ep.quote_text}"
            </blockquote>
            {ep.quote_author && <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">— {ep.quote_author}</p>}
          </div>
        </section>
      )}

      {/* Story */}
      {ep.story_html && (
        <section className="max-w-3xl mx-auto px-8 pb-12">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6" style={{ fontStyle: "italic", fontWeight: 400 }}>The Story Behind This Episode</h2>
          <div className="space-y-4 font-mono text-[11px] text-muted-foreground leading-[2]" dangerouslySetInnerHTML={{ __html: ep.story_html }} />
        </section>
      )}
      {!ep.story_html && podcastEp?.story_html && (
        <section className="max-w-3xl mx-auto px-8 pb-12">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6" style={{ fontStyle: "italic", fontWeight: 400 }}>The Story Behind This Episode</h2>
          <div className="space-y-4 font-mono text-[11px] text-muted-foreground leading-[2]" dangerouslySetInnerHTML={{ __html: podcastEp.story_html }} />
        </section>
      )}

      {takeaways.length > 0 && (
        <>
          <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>
          <section className="max-w-3xl mx-auto px-8 py-12">
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-8" style={{ fontStyle: "italic", fontWeight: 400 }}>Key Takeaways</h2>
            <div className="space-y-4">
              {takeaways.map((point, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-primary mt-0.5 shrink-0">0{i + 1}</span>
                  <p className="font-mono text-[11px] text-foreground leading-[1.8]">{point}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Transcript */}
      {(ep.transcript_html || podcastEp?.transcript_html) && (
        <>
          <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>
          <section className="max-w-3xl mx-auto px-8 py-12">
            <button onClick={() => setShowTranscript(!showTranscript)} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="h-4 w-4" />
              {showTranscript ? "Hide Transcript" : "View Full Transcript"}
              {showTranscript ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {showTranscript && (
              <div className="mt-6 border border-border bg-card p-6 font-mono text-[10px] text-muted-foreground leading-[2]" dangerouslySetInnerHTML={{ __html: ep.transcript_html || podcastEp?.transcript_html || "" }} />
            )}
          </section>
        </>
      )}

      <div className="max-w-3xl mx-auto px-8"><div className="h-px bg-border" /></div>

      {/* Share */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Share This Episode</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://instagram.com/ModernTechLLC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
          <a href="#" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> TikTok
          </a>
          <a href="https://youtube.com/@ModernTechLLC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-accent/10 transition-colors">
            <Youtube className="h-3.5 w-3.5" /> YouTube
          </a>
        </div>
      </section>

      <AffiliateFooter />
    </>
  );
};

export default EpisodeDetail;
