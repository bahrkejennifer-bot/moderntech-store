import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import wellnessPoster from "@/assets/heroes/wellness-yoga-poster.jpg";
import safetyPoster from "@/assets/heroes/safety-home-poster.jpg";
import creatorPoster from "@/assets/heroes/creator-studio-poster.jpg";

const columns = [
  {
    label: "Wellness Tech",
    tagline: "Invisible tech. Peak performance.",
    videoUrl: "/videos/wellness-yoga.mp4",
    posterUrl: wellnessPoster,
    link: "/wellness-tech",
  },
  {
    label: "Smart Home & Security",
    tagline: "Smart protection. Real connection.",
    videoUrl: "/videos/safety-home.mp4",
    posterUrl: safetyPoster,
    link: "/smart-home-security",
  },
  {
    label: "Digital Lifestyle",
    tagline: "Sound like a pro. Look like one too.",
    videoUrl: "/videos/creator-studio.mp4",
    posterUrl: creatorPoster,
    link: "/digital-lifestyle",
  },
];

const VideoColumn = ({ col, index }: { col: typeof columns[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — poster will show as fallback
      });
    }
  }, []);

  return (
    <div className="relative group overflow-hidden h-full">
      {/* Background Video with Ken Burns glide */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={col.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          animation: `glide 20s ease-in-out infinite alternate`,
          animationDelay: `${index * -7}s`,
        }}
      >
        <source src={col.videoUrl} type="video/mp4" />
      </video>

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />

      {/* Glassmorphism card overlay */}
      <div className="absolute inset-0 flex items-end justify-center p-6 md:p-8">
        <div className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 md:p-6 text-center shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/70 mb-2">
            {col.label}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {col.tagline}
          </h2>
          <Button
            asChild
            size="sm"
            className="bg-white/90 text-black hover:bg-white font-semibold rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to={col.link}>
              Shop the Look <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const VideoHero = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[800px]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {columns.map((col, index) => (
          <VideoColumn key={col.label} col={col} index={index} />
        ))}
      </div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default VideoHero;
