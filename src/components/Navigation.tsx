import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { FreeGuideModal } from "@/components/FreeGuideModal";

const shopCategories = [
  { to: "/health-wellness", label: "Health & Wellness" },
  { to: "/home-safety", label: "Home & Safety" },
  { to: "/creator-gear", label: "Creator Studio" },
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
      <nav className="sticky top-0 z-50 glass-dark border-b border-border/50" style={{ color: 'hsl(40 18% 91%)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex h-16 items-center">
            {/* Left — hamburger + shop dropdown */}
            <div className="hidden md:flex items-center gap-8 w-1/3">
              <Link
                to="/"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors duration-200"
              >
                Home
              </Link>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors duration-200"
                >
                  Shop
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-4 w-60 border border-border bg-background py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.to}
                        to={cat.to}
                        onClick={() => setShopOpen(false)}
                        className="block px-6 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors duration-200"
              >
                Journal
              </Link>
            </div>

            {/* Center — logo */}
            <div className="flex-1 md:w-1/3 flex justify-center">
              <Link to="/" className="flex flex-col items-center">
                <span className="font-serif text-2xl md:text-3xl tracking-tight text-[hsl(40_18%_91%)]" style={{ fontWeight: 500 }}>
                  MODERN TECH
                </span>
              </Link>
            </div>

            {/* Right — CTA */}
            <div className="hidden md:flex items-center justify-end w-1/3">
              <button
                onClick={() => setGuideOpen(true)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors"
              >
                Free Guide
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[hsl(40_18%_91%)] ml-auto"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[hsl(40_18%_91%/0.15)]" style={{ backgroundColor: 'hsl(40 10% 12%)' }}>
            <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-6">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-[hsl(40_18%_91%/0.6)] hover:text-[hsl(40_18%_91%)] transition-colors"
              >
                Shop
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileShopOpen && (
                <div className="flex flex-col gap-4 pl-4 border-l border-border">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.to}
                      to={cat.to}
                      onClick={() => setMobileOpen(false)}
                      className="font-mono text-[10px] tracking-[0.15em] uppercase text-[hsl(40_18%_91%/0.4)] hover:text-[hsl(40_18%_91%)] transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Journal
              </Link>

              <button
                onClick={() => { setGuideOpen(true); setMobileOpen(false); }}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground w-fit"
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
