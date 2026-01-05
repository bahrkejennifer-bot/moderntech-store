import { Facebook, Youtube, Instagram } from "lucide-react";
import { socialLinks } from "@/config/socialLinks";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors"
        aria-label="YouTube"
      >
        <Youtube className="h-5 w-5" />
      </a>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={socialLinks.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-foreground/80 transition-colors"
        aria-label="TikTok"
      >
        <TikTokIcon />
      </a>
    </div>
  );
};

export default SocialLinks;
