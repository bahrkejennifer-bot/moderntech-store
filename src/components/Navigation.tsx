import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FreeGuideModal } from "@/components/FreeGuideModal";
import logo from "@/assets/modern-tech-logo.png";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const navLinks = [
    { to: "/health-wellness", label: "Health & Wellness" },
    { to: "/home-safety", label: "Home & Safety" },
    { to: "/creator-gear", label: "Content Creator Corner" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass-dark border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Modern Tech LLC" className="h-14 w-14 rounded-full object-contain bg-white p-0.5 shadow-md border-2 border-primary/20" />
            </Link>

            {/* Desktop center links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
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
