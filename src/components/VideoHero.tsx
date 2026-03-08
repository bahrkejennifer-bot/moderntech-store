import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";

const columns = [
  {
    label: "Health & Wellness",
    tagline: "Invisible tech. Peak performance.",
    videoUrl:
      "https://cdn.pixabay.com/video/2020/08/21/47799-451812887_large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    link: "/health-wellness",
  },
  {
    label: "Family & Safety",
    tagline: "Smart protection. Real connection.",
    videoUrl:
      "https://videos.pexels.com/video-files/5691571/5691571-sd_640_360_25fps.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    link: "/home-safety",
  },
  {
    label: "Creator Gear",
    tagline: "Sound like a pro. Look like one too.",
    videoUrl:
      "https://videos.pexels.com/video-files/4620563/4620563-sd_640_360_30fps.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    link: "/creator-gear",
  },
];

const VideoColumn = ({ col }: { col: typeof columns[0] }) => {
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
          animation: "glide 20s ease-in-out infinite alternate",
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
        {columns.map((col) => (
          <VideoColumn key={col.label} col={col} />
        ))}
      </div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default VideoHero;
