import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FreeGuideModal } from "@/components/FreeGuideModal";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const navLinks = [
    { to: "/health-wellness", label: "Health & Wellness" },
    { to: "/home-safety", label: "Home & Safety" },
    { to: "/creator-gear", label: "Creator Corner" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-base font-semibold text-foreground tracking-tight">
              Modern Tech
            </Link>

            {/* Desktop center links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Free Guide button */}
            <div className="hidden md:block">
              <button
                onClick={() => setGuideOpen(true)}
                className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors"
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
          <div className="md:hidden bg-background border-t border-border/40">
            <div className="max-w-[980px] mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setGuideOpen(true); setMobileOpen(false); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
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
