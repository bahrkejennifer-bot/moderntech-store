import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { PinterestFollowButton } from "./PinterestWidgets";

const AffiliateFooter = () => {
  return (
    <footer
      className="border-t mt-0"
      style={{
        backgroundColor: "hsl(40 10% 12%)",
        borderColor: "hsl(40 18% 91% / 0.15)",
        color: "hsl(40 18% 91%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl mb-4" style={{ fontStyle: "italic", color: "hsl(40 18% 91%)" }}>Modern Tech</h3>
            <p className="font-mono text-[10px] leading-[1.8]" style={{ color: "hsl(40 18% 91% / 0.5)" }}>
              A curated study in high-performance hardware and the quiet aesthetics of a well-lived life.
            </p>
            <div className="mt-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "hsl(40 18% 91% / 0.4)" }}>Follow</span>
              <div className="mt-3">
                <SocialLinks />
              </div>
              <div className="mt-3">
                <PinterestFollowButton />
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 18% 91% / 0.4)" }}>Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-of-service", label: "Terms of Service" },
                { to: "/disclaimer", label: "Disclaimer" },
                { to: "/return-policy", label: "Return & Refund Policy" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-mono text-[10px] transition-colors"
                    style={{ color: "hsl(40 18% 91% / 0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 18% 91%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(40 18% 91% / 0.6)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliate Disclosure */}
          <div>
            <h3 className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 18% 91% / 0.4)" }}>Affiliate Disclosure</h3>
            <p className="font-mono text-[10px] leading-[1.8]" style={{ color: "hsl(40 18% 91% / 0.5)" }}>
              Modern Tech LLC is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: "0.5px solid hsl(40 18% 91% / 0.15)" }}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "hsl(40 18% 91% / 0.4)" }}>
            &copy; 2025 Modern Tech LLC — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AffiliateFooter;
