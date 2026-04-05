import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem("promo-banner-dismissed") === "true"; } catch { return false; }
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem("promo-banner-dismissed", "true"); } catch {}
  };

  return (
    <div
      className="relative z-[51] flex items-center justify-center px-4 py-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase"
      style={{ backgroundColor: "hsl(40 10% 12%)", color: "hsl(40 18% 91%)" }}
    >
      <Link to="/creator-bundle" className="hover:opacity-80 transition-opacity">
        ✨ New: The Faceless Creator Bundle — Get all 3 guides for $59 →
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default PromoBanner;
