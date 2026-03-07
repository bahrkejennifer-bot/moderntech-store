import { Link } from "react-router-dom";
import { Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/modern-tech-logo.png";

const Navigation = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/home-safety", label: "Home & Safety" },
    { to: "/health-wellness", label: "Health & Wellness" },
    { to: "/creator-gear", label: "Creator Gear" },
    { to: "/kids-tech", label: "Kids Tech" },
    { to: "/gaming", label: "Gaming" },
    { to: "/connectivity", label: "Connectivity" },
    { to: "/college", label: "College & School" },
    { to: "/trending-products", label: "Trending Products" },
    { to: "/blog", label: "Blog" },
    { to: "/digital-products", label: "Digital Products" },
    { to: "/my-downloads", label: "My Downloads" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Modern Tech LLC" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold font-display text-foreground">
              Modern Tech LLC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2">
              <Link to="/free-roadmap">
                <Download className="h-4 w-4" />
                Free Roadmap
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="rounded-full mt-4 gap-2">
                  <Link to="/free-roadmap">
                    <Download className="h-4 w-4" />
                    Free 90-Day Roadmap
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
