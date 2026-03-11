import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { PinterestFollowButton } from "./PinterestWidgets";
const AffiliateFooter = () => {
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Modern Tech LLC</h3>
            <p className="text-sm text-muted-foreground">
              Honest tech reviews to help families make informed purchasing decisions.
            </p>
            <div className="mt-4">
              <span className="text-sm text-muted-foreground">Follow us</span>
              <div className="mt-2">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Affiliate Disclosure */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Affiliate Disclosure</h3>
            <p className="text-sm text-muted-foreground">
              Modern Tech LLC is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Modern Tech LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AffiliateFooter;
