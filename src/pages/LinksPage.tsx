import { Link } from "react-router-dom";
import { ExternalLink, Youtube, Instagram, Mail, ShoppingBag, BookOpen, Headphones, Zap, Heart } from "lucide-react";
import mtLogo from "@/assets/mt-monogram-logo.png";

const LINKS = [
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    label: "Shop Our Top Tech Picks",
    url: "https://moderntech.store/trending-products",
    highlight: true,
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Free Guides & Digital Products",
    url: "https://moderntech.store/digital-products",
    highlight: true,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "The Art of Modern Tech — Blog",
    url: "https://moderntech.store/signal",
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    label: "Watch & Listen — Media Hub",
    url: "https://moderntech.store/media",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    label: "Free Amazon Associate Roadmap",
    url: "https://moderntech.store/free-roadmap",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    label: "Smart Home Safety Checklist",
    url: "https://moderntech.store/free-smart-home-checklist",
  },
];

const SOCIALS = [
  { icon: <Youtube className="h-5 w-5" />, label: "YouTube", url: "https://youtube.com/@ModernTechLLC" },
  { icon: <Instagram className="h-5 w-5" />, label: "Instagram", url: "https://instagram.com/ModernTechLLC" },
  { icon: <Mail className="h-5 w-5" />, label: "Contact", url: "https://moderntech.store/contact" },
];

const LinksPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center px-4 py-12">
      {/* Profile */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4 bg-white/5">
          <img src={mtLogo} alt="Modern Tech LLC" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-['Playfair_Display'] text-2xl font-bold text-white tracking-tight">
          Modern Tech LLC
        </h1>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mt-2">
          Tech Today · Trend Tomorrow
        </p>
        <p className="text-sm text-white/50 font-['Inter'] mt-3 max-w-xs mx-auto leading-relaxed">
          Empowering women with tech that matters. Jen-Verified picks, guides & more.
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-md space-y-3 mb-10">
        {LINKS.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl border transition-all duration-200 group ${
              link.highlight
                ? "bg-white text-[#0f0f0f] border-white hover:bg-white/90 hover:scale-[1.02]"
                : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]"
            }`}
          >
            <span className={link.highlight ? "text-[#0f0f0f]" : "text-white/60"}>{link.icon}</span>
            <span className="flex-1 font-['Inter'] text-sm font-medium">{link.label}</span>
            <ExternalLink className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${link.highlight ? "text-[#0f0f0f]/40" : "text-white/30"}`} />
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 mb-10">
        {SOCIALS.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
        © {new Date().getFullYear()} Modern Tech LLC
      </p>
    </div>
  );
};

export default LinksPage;
