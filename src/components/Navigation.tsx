import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { FreeGuideModal } from "@/components/FreeGuideModal";
import logo from "@/assets/modern-tech-logo.png";

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
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Modern Tech LLC" className="h-14 w-14 rounded-full object-contain bg-white p-0.5 shadow-md border-2 border-primary/20" />
              <span className="text-lg font-bold tracking-tight text-foreground hidden sm:inline">Modern Tech LLC</span>
            </Link>

            {/* Desktop center links */}
            <div className="hidden md:flex items-center gap-8">
              {/* Shop Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Shop
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-border/60 bg-card shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.to}
                        to={cat.to}
                        onClick={() => setShopOpen(false)}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Blog
              </Link>
            </div>

            {/* Free Guide CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => setGuideOpen(true)}
                className="h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-elegant"
              >
                Free Guide
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/40 bg-card">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4">
              {/* Mobile Shop Accordion */}
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileShopOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.to}
                      to={cat.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>

              <button
                onClick={() => { setGuideOpen(true); setMobileOpen(false); }}
                className="h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium w-fit"
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
