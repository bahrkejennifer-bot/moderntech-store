import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Return & Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">About Our Website</h2>
            <p className="text-muted-foreground">
              Modern Tech LLC operates moderntech.store as an affiliate marketing website. We provide product reviews, recommendations, and links to purchase products from third-party retailers, primarily Amazon.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Product Purchases</h2>
            <p className="text-muted-foreground">
              <strong>Important:</strong> Modern Tech LLC does not sell physical products directly. All product purchases are made through third-party retailers (such as Amazon.com) when you click on our affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Returns for Products Purchased Through Amazon</h2>
            <p className="text-muted-foreground mb-4">
              If you purchased a product through one of our Amazon affiliate links and wish to return it, the return must be handled directly through Amazon according to their standard return policy.
            </p>
            <p className="text-muted-foreground mb-4">To return an Amazon purchase:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Log in to your Amazon account</li>
              <li>Go to "Your Orders"</li>
              <li>Find the item you want to return</li>
              <li>Select "Return or Replace Items"</li>
              <li>Follow Amazon's return instructions</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              For more information, visit{" "}
              <a 
                href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Amazon's Return Policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Digital Products</h2>
            <p className="text-muted-foreground mb-4">
              For digital products (such as PDF guides) purchased directly from Modern Tech LLC:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Due to the nature of digital products, all sales are final</li>
              <li>If you experience technical issues downloading your purchase, please contact us for assistance</li>
              <li>We will work with you to resolve any delivery or access issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Other Retailers</h2>
            <p className="text-muted-foreground">
              If you purchased a product through a link to a retailer other than Amazon, please refer to that retailer's return policy. Modern Tech LLC is not responsible for returns or refunds for products purchased from any third-party retailer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Return Policy or need assistance, please contact us at{" "}
              <a href="mailto:support@moderntech.store" className="text-primary hover:underline">
                support@moderntech.store
              </a>
            </p>
          </section>
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default ReturnPolicy;
