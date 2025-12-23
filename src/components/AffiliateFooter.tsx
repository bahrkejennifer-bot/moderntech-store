import SocialLinks from "./SocialLinks";

const AffiliateFooter = () => {
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-sm text-muted-foreground">
            <p className="font-medium">
              As an Amazon Associate, I earn from qualifying purchases.
            </p>
            <p className="mt-2">&copy; 2025 Modern Tech LLC. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-sm text-muted-foreground">Follow us</span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AffiliateFooter;
