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
    <a
      href={affiliateLink}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() => trackEvent("checkout", { product_name: title, value: 0, currency: "USD" })}
      className="group block"
    >
      <article className="rounded-xl border border-border/60 bg-card overflow-hidden hover-lift hover:shadow-card transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">{description}</p>

          {/* Pinterest action */}
          <div className="flex items-center gap-2 mt-4" onClick={(e) => e.preventDefault()}>
            <button
              onClick={handlePinToPinterest}
              disabled={pinning}
              title="Post to Pinterest"
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-[#E60023] text-white hover:bg-[#ad081b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              {pinning ? "Pinning…" : "Pin it"}
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{rating}/5</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              View on Amazon <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </a>
  );
};

export default ProductCard;
