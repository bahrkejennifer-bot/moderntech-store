import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const Disclaimer = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">General Information</h2>
            <p className="text-muted-foreground">
              The information provided on moderntech.store by Modern Tech LLC is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Product Reviews Disclaimer</h2>
            <p className="text-muted-foreground">
              The product reviews and recommendations on this website are based on our research, experience, and opinions. They are intended to help you make informed purchasing decisions. However, individual experiences may vary, and we encourage you to conduct your own research before making any purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Affiliate Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              Modern Tech LLC is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <p className="text-muted-foreground">
              <strong>What this means for you:</strong> When you click on product links on our site and make a purchase, we may earn a small commission at no additional cost to you. This helps support our website and allows us to continue providing helpful content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">No Professional Advice</h2>
            <p className="text-muted-foreground">
              The content on this website does not constitute professional advice. For specific advice related to technology purchases, safety, or any other matters, please consult with appropriate professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">External Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to external websites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Errors and Omissions</h2>
            <p className="text-muted-foreground">
              While we strive to keep our content accurate and up-to-date, errors or omissions may occur. Product prices, availability, and specifications are subject to change without notice. We recommend verifying all information with the retailer before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Under no circumstances shall Modern Tech LLC be held liable for any loss or damage, including without limitation, indirect or consequential loss or damage, arising from the use of this website or reliance on any information provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Disclaimer, please contact us at{" "}
              <a href="mailto:info@moderntech.store" className="text-primary hover:underline">
                info@moderntech.store
              </a>
            </p>
          </section>
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default Disclaimer;
