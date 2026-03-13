import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { FreeGuideModal } from "@/components/FreeGuideModal";

const shopCategories = [
  { to: "/health-wellness", label: "Health & Wellness" },
  { to: "/home-safety", label: "Home & Safety" },
  { to: "/creator-gear", label: "Content Creator Corner" },
  { to: "/gaming", label: "Gaming" },
  { to: "/kids-tech", label: "Kids Tech" },
  { to: "/college", label: "College Essentials" },
  { to: "/connectivity", label: "Connectivity" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 glass-dark border-b border-border/40">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Left — nav links */}
            <div className="hidden md:flex items-center gap-8">
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Shop
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-3 w-56 border border-border bg-card shadow-elegant py-2">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.to}
                        to={cat.to}
                        onClick={() => setShopOpen(false)}
                        className="block px-5 py-2.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Journal
              </Link>
            </div>

            {/* Center — logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="font-serif text-xl md:text-2xl tracking-tight italic">
                Modern Tech
              </span>
            </Link>

            {/* Right — CTA */}
            <div className="hidden md:block ml-auto">
              <button
                onClick={() => setGuideOpen(true)}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Free Guide
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-foreground ml-auto"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-5">
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileShopOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l border-border">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.to}
                      to={cat.to}
                      onClick={() => setMobileOpen(false)}
                      className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Journal
              </Link>

              <button
                onClick={() => { setGuideOpen(true); setMobileOpen(false); }}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground underline underline-offset-4 w-fit"
              >
                Free Guide
              </button>
            </div>
          </div>
        )}
      </nav>

      <FreeGuideModal open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  );
};

export default Navigation;
