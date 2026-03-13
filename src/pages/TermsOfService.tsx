import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const TermsOfService = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using moderntech.store, operated by Modern Tech LLC, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Our Website</h2>
            <p className="text-muted-foreground mb-4">You agree to use our website only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Infringe the rights of others</li>
              <li>Restrict or inhibit anyone else's use of the website</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit any harmful code or malware</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, and images, is the property of Modern Tech LLC or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Affiliate Links & Purchases</h2>
            <p className="text-muted-foreground">
              Our website contains affiliate links to products on Amazon.com and other retailers. When you click these links and make a purchase, we may earn a commission at no additional cost to you. All purchases are made directly through the third-party retailer, and their terms of service apply to those transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Product Reviews & Recommendations</h2>
            <p className="text-muted-foreground">
              Our product reviews and recommendations are based on our research and opinions. We strive to provide accurate and helpful information, but we make no guarantees about the accuracy, completeness, or reliability of any product information. Always verify product details with the manufacturer or retailer before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Modern Tech LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or any products purchased through our affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@moderntech.store" className="text-primary hover:underline">
                legal@moderntech.store
              </a>
            </p>
          </section>
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default TermsOfService;
