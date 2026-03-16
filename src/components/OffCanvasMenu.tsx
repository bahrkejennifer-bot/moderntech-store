import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "#", label: "Shop", hasSubmenu: true },
  { to: "/media", label: "Watch & Listen" },
  { to: "/blog", label: "The Blueprint" },
  { to: "/signal", label: "Signal" },
  { to: "/digital-products", label: "Downloads" },
];

const shopCategories = [
  { to: "/health-wellness", label: "Health & Wellness" },
  { to: "/home-safety", label: "Home & Safety" },
  { to: "/creator-gear", label: "Creator Studio" },
  { to: "/gaming", label: "Gaming" },
  { to: "/kids-tech", label: "Kids Tech" },
  { to: "/college", label: "College Essentials" },
  { to: "/connectivity", label: "Connectivity" },
];

interface OffCanvasMenuProps {
  open: boolean;
  onClose: () => void;
}

const OffCanvasMenu = ({ open, onClose }: OffCanvasMenuProps) => {
  const [shopExpanded, setShopExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-[380px] max-w-[85vw] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "hsl(40 18% 91%)" }}
      >
        {/* Close button */}
        <div className="flex justify-end p-8">
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-60 transition-opacity"
            style={{ color: "hsl(40 10% 12%)" }}
          >
            Close
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-10 pb-12 flex flex-col justify-center -mt-16">
          {menuItems.map((item, i) => (
            <div key={item.label}>
              {/* Divider */}
              {i > 0 && (
                <div className="h-px w-full" style={{ backgroundColor: "hsl(40 10% 12% / 0.12)" }} />
              )}

              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setShopExpanded(!shopExpanded)}
                    className="w-full text-left py-6 font-serif text-3xl md:text-4xl tracking-tight transition-opacity hover:opacity-50"
                    style={{ color: "hsl(40 10% 12%)", fontWeight: 400, fontStyle: "italic" }}
                  >
                    {item.label}
                  </button>
                  {shopExpanded && (
                    <div className="pb-4 pl-2 flex flex-col gap-3">
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.to}
                          to={cat.to}
                          onClick={onClose}
                          className="font-mono text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-50"
                          style={{ color: "hsl(40 10% 12% / 0.55)" }}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="block py-6 font-serif text-3xl md:text-4xl tracking-tight transition-opacity hover:opacity-50"
                  style={{ color: "hsl(40 10% 12%)", fontWeight: 400, fontStyle: "italic" }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          {/* Final divider */}
          <div className="h-px w-full" style={{ backgroundColor: "hsl(40 10% 12% / 0.12)" }} />
        </nav>

        {/* Bottom branding */}
        <div className="px-10 pb-10">
          <p
            className="font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(40 10% 12% / 0.35)" }}
          >
            Modern Tech © 2026
          </p>
        </div>
      </div>
    </>
  );
};

export default OffCanvasMenu;
