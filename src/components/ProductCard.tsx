import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePinterestEvent } from "@/hooks/usePinterestTracking";

interface ProductCardProps {
  title: string;
  description: string;
  price?: string;
  rating: number;
  imageUrl: string;
  affiliateLink: string;
}

const ProductCard = ({ title, description, rating, imageUrl, affiliateLink }: ProductCardProps) => {
  const { toast } = useToast();
  const { trackEvent } = usePinterestEvent();
  const [pinning, setPinning] = useState(false);

  const handlePinToPinterest = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPinning(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "hvjhtfyxecnuehndnyrd";
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/pin-to-pinterest`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "pin_product",
            title,
            image_url: imageUrl,
            affiliate_link: affiliateLink,
            pinned_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      toast({ title: "Pinned! 📌", description: `"${title}" was sent to Pinterest via Make.com.` });
    } catch {
      toast({ title: "Failed to pin", description: "Could not reach the webhook. Please try again.", variant: "destructive" });
    } finally {
      setPinning(false);
    }
  };

  return (
    <div className="group relative border-r border-b border-border">
      {/* Image with hover overlay */}
      <div className="relative aspect-square overflow-hidden">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={() => trackEvent("checkout", { product_name: title, value: 0, currency: "USD" })}
          className="block w-full h-full"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </a>

        {/* Spec overlay on hover */}
        <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 pointer-events-none group-hover:pointer-events-auto">
          <p className="font-mono text-[11px] text-background/70 text-center leading-relaxed mb-6 max-w-[220px]">
            {description}
          </p>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-background/50">Rating</span>
            <span className="font-mono text-sm font-medium text-background">{rating}/5</span>
          </div>
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => trackEvent("checkout", { product_name: title, value: 0, currency: "USD" })}
            className="inline-flex items-center gap-2 h-10 px-6 border border-background/40 text-background font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Product title & actions */}
      <div className="p-5">
        <h3 className="font-serif text-lg italic leading-snug mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            Shop on Amazon <ExternalLink className="h-2.5 w-2.5" />
          </a>
          <button
            onClick={handlePinToPinterest}
            disabled={pinning}
            className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {pinning ? "Pinning…" : "📌 Pin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
