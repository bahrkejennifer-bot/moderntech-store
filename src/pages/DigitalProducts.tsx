import { Download, CheckCircle, ShoppingCart, Home, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const DigitalProducts = () => {
  const handleBuySmartHome = () => {
    toast({
      title: "Coming Soon!",
      description: "Payment processing will be available shortly. Check back soon!",
    });
  };
  const handleDownload = () => {
    // Create the SEO checklist content
    const checklistContent = `
AMAZON AFFILIATE SEO FUNNEL CHECKLIST
=====================================

Your Complete Guide to Building a Profitable Affiliate Marketing Site

PHASE 1: FOUNDATION & RESEARCH
-------------------------------
☐ Choose a profitable niche with strong Amazon product availability
☐ Research keywords with buying intent (e.g., "best [product]", "[product] review")
☐ Analyze competitor affiliate sites in your niche
☐ Set up Google Analytics and Search Console
☐ Create Amazon Associates account and get your affiliate ID

PHASE 2: ON-PAGE SEO OPTIMIZATION
----------------------------------
☐ Write compelling title tags under 60 characters with target keywords
☐ Create meta descriptions under 160 characters that drive clicks
☐ Use single H1 tag with primary keyword on each page
☐ Structure content with H2/H3 headings for easy scanning
☐ Add descriptive alt text to all product images
☐ Include internal links to related product pages
☐ Optimize page load speed (compress images, minimize CSS/JS)
☐ Ensure mobile-responsive design

PHASE 3: CONTENT CREATION
--------------------------
☐ Write detailed product reviews (1,500+ words)
☐ Create comparison articles ("X vs Y")
☐ Develop buying guides and "best of" listicles
☐ Include pros/cons lists for each product
☐ Add real user experience insights
☐ Use tables for feature comparisons
☐ Include clear Amazon affiliate disclosure
☐ Update content regularly with current prices and availability

PHASE 4: LINK BUILDING
----------------------
☐ Create shareable infographics related to your niche
☐ Guest post on relevant blogs with backlinks
☐ Build relationships with other affiliate marketers
☐ Submit to relevant online directories
☐ Create social media profiles and share content
☐ Participate in niche forums and communities
☐ Reach out for product review opportunities

PHASE 5: CONVERSION OPTIMIZATION
---------------------------------
☐ Use clear, prominent Amazon CTA buttons
☐ Create comparison tables with affiliate links
☐ Add "Check Price on Amazon" buttons throughout content
☐ Include product images that link to Amazon
☐ Use urgent language ("Limited Time Deal", "In Stock Now")
☐ Highlight discounts and savings
☐ Add trust signals (ratings, reviews, badges)
☐ Test different button colors and placements

PHASE 6: TECHNICAL SEO
----------------------
☐ Create and submit XML sitemap
☐ Implement schema markup (Product, Review, FAQ)
☐ Use canonical tags to avoid duplicate content
☐ Set up 301 redirects for any moved pages
☐ Optimize URL structure (short, descriptive)
☐ Ensure HTTPS security
☐ Fix broken links and 404 errors
☐ Improve Core Web Vitals scores

PHASE 7: CONTENT DISTRIBUTION
------------------------------
☐ Share new posts on social media platforms
☐ Build an email list for product recommendations
☐ Create Pinterest pins for visual products
☐ Post YouTube review videos
☐ Engage in Reddit communities (carefully)
☐ Answer questions on Quora with helpful links
☐ Create TikTok short-form product reviews

PHASE 8: MONITORING & SCALING
------------------------------
☐ Track Amazon affiliate earnings weekly
☐ Monitor keyword rankings in Search Console
☐ Analyze top-performing content
☐ Identify low-hanging keyword opportunities
☐ Update old posts with new products
☐ Scale winning content types
☐ Test seasonal product promotions
☐ Diversify into related product categories

BONUS TIPS FOR SUCCESS
----------------------
• Focus on products with 20%+ commission rates
• Target products in the $50-$300 price range
• Write about products you've actually used
• Build topical authority in specific product categories
• Create content for all stages of buyer journey
• Use Amazon's Native Shopping Ads strategically
• Comply with FTC affiliate disclosure requirements
• Track which products convert best and double down

TOOLS RECOMMENDED
-----------------
• Keyword Research: Ahrefs, SEMrush, or Ubersuggest
• Analytics: Google Analytics 4, Search Console
• SEO: Yoast SEO, Rank Math (for WordPress)
• Link Tracking: ThirstyAffiliates, Pretty Links
• Images: Canva, TinyPNG for compression
• Speed: GTmetrix, PageSpeed Insights

Remember: Consistency and quality content are key to long-term affiliate success!

=====================================
© 2025 TechFinds - Your Affiliate Marketing Partner
Visit us at [your-domain.com] for more resources
`;

    // Create a Blob with the content
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Amazon-Affiliate-SEO-Funnel-Checklist.txt';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Digital Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free resources to help you succeed in affiliate marketing and tech entrepreneurship
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Free Product */}
          <Card className="mb-8 overflow-hidden border-2 border-primary">
            <div className="bg-gradient-hero p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Amazon Affiliate SEO Funnel Checklist
                  </h2>
                  <p className="text-white/90 text-lg">
                    Complete guide to building a profitable affiliate site
                  </p>
                </div>
                <div className="text-4xl font-bold text-white">
                  FREE
                </div>
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">What's Included:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>8-phase implementation roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>70+ actionable SEO checklist items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Keyword research strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Content creation templates</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Perfect For:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>New affiliate marketers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Tech bloggers & reviewers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Content creators scaling their income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Anyone building niche authority sites</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold mb-2">What You'll Learn:</h3>
                <p className="text-muted-foreground">
                  This comprehensive checklist walks you through every stage of building a successful Amazon affiliate site - from initial research and keyword targeting to conversion optimization and scaling. Follow this proven framework to create content that ranks in Google, attracts buyers, and generates consistent affiliate commissions.
                </p>
              </div>
              
              <Button 
                variant="cta" 
                size="lg" 
                className="w-full text-lg h-14"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Free Checklist
              </Button>
            </CardContent>
          </Card>

          {/* Premium PDF Products */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Premium Tech Guides</h2>
            
            {/* Smart Home Guide - $10 */}
            <Card className="overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Home className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        Top 10 Smart Home Devices for 2025
                      </h2>
                      <p className="text-muted-foreground">
                        Your Complete Guide to Building an Intelligent, Secure Home
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">$10.00</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Transform your house into an intelligent home with our expertly curated selection of the best smart home devices for 2025. This comprehensive guide includes detailed product reviews, compatibility charts, installation tips, and budget breakdowns to help you make confident purchasing decisions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Top 10 device reviews with pros, cons, and pricing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ecosystem compatibility guide (Alexa, Google, HomeKit)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Room-by-room setup recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Security and privacy best practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Installation and troubleshooting tips</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Budget planning worksheets</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Featured Devices:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Amazon Echo (4th Gen) - Best Voice Hub</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Google Nest Learning Thermostat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Ring Video Doorbell Pro 2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Philips Hue Starter Kit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Arlo Pro 4 Wireless Camera</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>+ 5 more essential devices</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-2">Why Smart Home Technology Matters in 2025:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>• Energy savings of 20-30% through automation</div>
                    <div>• Enhanced security with real-time monitoring</div>
                    <div>• Smart homes sell 5% faster on average</div>
                    <div>• Accessibility features for aging in place</div>
                  </div>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg h-14"
                  onClick={handleBuySmartHome}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - $10.00
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">More Guides Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-6">
              5 more premium tech guides launching soon
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Card className="opacity-75">
                <CardHeader>
                  <CardTitle>Gaming Setup Guide</CardTitle>
                  <CardDescription>Optimize your gaming experience - $10</CardDescription>
                </CardHeader>
              </Card>
              <Card className="opacity-75">
                <CardHeader>
                  <CardTitle>Earbuds Selection Guide</CardTitle>
                  <CardDescription>Find your perfect wireless earbuds - $10</CardDescription>
                </CardHeader>
              </Card>
              <Card className="opacity-75">
                <CardHeader>
                  <CardTitle>College Tech Essentials</CardTitle>
                  <CardDescription>Everything for academic success - $10</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default DigitalProducts;
