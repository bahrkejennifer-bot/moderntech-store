import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  {
    label: "Health & Wellness",
    tagline: "Invisible tech. Peak performance.",
    videoUrl:
      "https://cdn.pixabay.com/video/2020/07/30/45349-445871082_large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    link: "/health-wellness",
  },
  {
    label: "Family & Safety",
    tagline: "Smart protection. Real connection.",
    videoUrl:
      "https://cdn.pixabay.com/video/2021/02/12/64534-512131764_large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    link: "/home-safety",
  },
  {
    label: "Creator Gear",
    tagline: "Sound like a pro. Look like one too.",
    videoUrl:
      "https://cdn.pixabay.com/video/2019/09/02/26891-358839498_large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    link: "/trending-products",
  },
];

const VideoHero = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[800px]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {columns.map((col) => (
          <div key={col.label} className="relative group overflow-hidden h-full">
            {/* Background Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              src={col.videoUrl}
              poster={col.posterUrl}
              autoPlay
              muted
              loop
              playsInline
            />

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
        ))}
      </div>

      {/* Bottom gradient fade into page content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default VideoHero;
