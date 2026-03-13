import { Link } from "react-router-dom";
import { useState } from "react";
import { FreeGuideModal } from "@/components/FreeGuideModal";
import OffCanvasMenu from "@/components/OffCanvasMenu";

const Navigation = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 glass-dark border-b border-border/50" style={{ color: 'hsl(40 18% 91%)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left — MENU trigger */}
            <div className="w-1/3 flex items-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors duration-200"
              >
                {/* Thin two-line icon */}
                <div className="flex flex-col gap-[4px] w-4">
                  <div className="h-[1px] w-full bg-current" />
                  <div className="h-[1px] w-full bg-current" />
                </div>
                Menu
              </button>
            </div>

            {/* Center — logo */}
            <div className="w-1/3 flex justify-center">
              <Link to="/" className="flex flex-col items-center">
                <span className="font-serif text-2xl md:text-3xl tracking-tight text-[hsl(40_18%_91%)]" style={{ fontWeight: 500 }}>
                  MODERN TECH
                </span>
              </Link>
            </div>

            {/* Right — FREE GUIDE */}
            <div className="w-1/3 flex items-center justify-end">
              <button
                onClick={() => setGuideOpen(true)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors"
              >
                Free Guide
              </button>
            </div>
          </div>
        </div>
      </nav>

      <OffCanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <FreeGuideModal open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  );
};

export default Navigation;
