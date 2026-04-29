import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const TermsOfService = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              Welcome to moderntech.store, operated by Modern Tech LLC ("Modern Tech," "we," "our," or "us"). By accessing
              or using this website, our newsletters, downloads, or any related services (collectively, the "Services"),
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground">
              You must be at least 16 years old (or the age of digital consent in your jurisdiction) to use the Services.
              By using the Services, you represent that you meet this requirement and that any information you provide is
              accurate and current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Use</h2>
            <p className="text-muted-foreground mb-4">
              Some features (such as digital downloads, purchase history, or admin tools) require an account. When you
              create or use an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate, complete information and keep it updated.</li>
              <li>Keep your login credentials confidential and secure.</li>
              <li>Be responsible for all activity that occurs under your account.</li>
              <li>Notify us immediately at <a href="mailto:support@moderntech.store" className="text-primary hover:underline">support@moderntech.store</a> of any unauthorized access.</li>
              <li>Not share, sell, or transfer your account or any digital downloads to others.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We may suspend or terminate accounts that violate these Terms, abuse the Services, or engage in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Use the Services for any unlawful purpose or in violation of any regulations.</li>
              <li>Scrape, copy, or republish our content, guides, or PDFs without written permission.</li>
              <li>Reverse engineer, probe, or interfere with the Services or their security.</li>
              <li>Upload or transmit malware, spam, or harmful code.</li>
              <li>Impersonate Modern Tech LLC or any other person or entity.</li>
              <li>Use automated systems (bots, crawlers) in ways that burden our infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on the Services — including text, graphics, logos, the "MT" monogram, photography, videos,
              guides, PDFs, and code — is the property of Modern Tech LLC or its licensors and is protected by U.S. and
              international copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative
              works without our express written permission. Personal, non-commercial use of freely published articles is permitted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Digital Products & Purchases</h2>
            <p className="text-muted-foreground">
              Paid digital products (guides, bundles, templates) are licensed for individual use only and are non-transferable.
              Due to the nature of digital goods, all sales are final unless otherwise stated in our{" "}
              <a href="/return-policy" className="text-primary hover:underline">Return Policy</a>. Payments are processed
              by third-party providers (e.g., Stripe), and their terms apply to the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Affiliate Disclosures</h2>
            <p className="text-muted-foreground mb-4">
              Modern Tech LLC is a participant in the Amazon Services LLC Associates Program, an affiliate advertising
              program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
              Our Amazon Associates tag is <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">moderntechs0c-20</code>.
            </p>
            <p className="text-muted-foreground mb-4">
              We may also participate in other affiliate programs and earn commissions when you click certain links and
              make a qualifying purchase. <strong>This comes at no additional cost to you.</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>We only recommend products we have researched, tested, or believe provide genuine value ("Jen-Verified").</li>
              <li>Affiliate relationships do not influence our editorial opinions or product rankings.</li>
              <li>Prices, availability, and product details on third-party retailers may change at any time.</li>
              <li>Final purchases are made through the third-party retailer, and their terms, shipping, and returns apply.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              As an Amazon Associate, we earn from qualifying purchases. See our{" "}
              <a href="/disclaimer" className="text-primary hover:underline">Affiliate Disclaimer</a> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="text-muted-foreground mb-4">
              The Services and all content are provided <strong>"AS IS" and "AS AVAILABLE"</strong> without warranties of
              any kind, whether express or implied, including but not limited to merchantability, fitness for a particular
              purpose, accuracy, or non-infringement.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Product reviews, recommendations, and "best of" lists reflect our opinions and research only.</li>
              <li>We do not guarantee the accuracy, completeness, or timeliness of any information.</li>
              <li>Content related to wellness, biometrics, smart rings, or health devices is for informational purposes only and is <strong>not medical advice</strong>. Consult a qualified professional before making health decisions.</li>
              <li>We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or harmful components.</li>
              <li>Always verify product specifications, pricing, and safety information directly with the manufacturer or retailer before purchasing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, Modern Tech LLC and its officers, employees, and affiliates shall
              <strong> not be liable</strong> for any indirect, incidental, special, consequential, exemplary, or punitive
              damages — including loss of profits, data, goodwill, or other intangible losses — arising out of or related to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your use of, or inability to use, the Services.</li>
              <li>Any products purchased through affiliate links or third-party retailers.</li>
              <li>Unauthorized access to your account or data.</li>
              <li>Errors, inaccuracies, or omissions in any content.</li>
              <li>Any interruption, bug, or failure of the Services.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our total aggregate liability for any claim arising out of these Terms or the Services shall not exceed
              the greater of (a) the amount you paid us in the twelve (12) months preceding the claim, or (b) one hundred
              U.S. dollars ($100). Some jurisdictions do not allow certain liability limitations; in those cases, our
              liability is limited to the maximum extent permitted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold Modern Tech LLC harmless from any claims, losses, liabilities, damages,
              and expenses (including reasonable attorneys' fees) arising from your use of the Services, your violation
              of these Terms, or your infringement of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Third-Party Links & Services</h2>
            <p className="text-muted-foreground">
              The Services contain links to third-party websites, retailers, and tools (e.g., Amazon, Pinterest, Stripe,
              Resend, GetResponse). We do not control and are not responsible for the content, policies, or practices of
              any third parties. Your interactions with them are governed by their own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <p className="text-muted-foreground">
              We may suspend or terminate your access to the Services at any time, with or without notice, for any reason,
              including breach of these Terms. Sections that by their nature should survive termination (intellectual
              property, disclaimers, limitation of liability, indemnification, governing law) will continue to apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of the United States and the state in which Modern Tech LLC is
              registered, without regard to conflict-of-law principles. Any disputes shall be resolved in the state or
              federal courts located in that jurisdiction, and you consent to personal jurisdiction there.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Changes to These Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Changes are effective immediately upon posting to
              this page, and we will update the "Last updated" date above. Your continued use of the Services after
              changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Contact Us</h2>
            <p className="text-muted-foreground">
              Questions about these Terms? Reach us at{" "}
              <a href="mailto:legal@moderntech.store" className="text-primary hover:underline">
                legal@moderntech.store
              </a>{" "}
              or via our{" "}
              <a href="/contact" className="text-primary hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default TermsOfService;
