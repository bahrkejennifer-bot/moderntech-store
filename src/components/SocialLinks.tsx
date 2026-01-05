import { Facebook, Youtube, Instagram } from "lucide-react";
import { socialLinks } from "@/config/socialLinks";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.41.16-1.54-.72-2.5-2.96-2.5-4.77 0-3.88 2.82-7.44 8.14-7.44 4.27 0 7.59 3.04 7.59 7.11 0 4.24-2.67 7.66-6.39 7.66-1.25 0-2.42-.65-2.82-1.42l-.77 2.93c-.28 1.08-1.04 2.43-1.55 3.26A12 12 0 1 0 12 0z"/>
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
      <a
        href={socialLinks.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E60023] hover:text-[#E60023]/80 transition-colors"
        aria-label="Pinterest"
      >
        <PinterestIcon />
      </a>
    </div>
  );
};

export default SocialLinks;
