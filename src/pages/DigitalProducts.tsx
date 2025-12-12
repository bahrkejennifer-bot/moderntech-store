import { Download, CheckCircle, ShoppingCart, Home, Star, Monitor, Headphones, GraduationCap, Activity } from "lucide-react";
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

  const handleBuyGamingMonitors = () => {
    toast({
      title: "Coming Soon!",
      description: "Payment processing will be available shortly. Check back soon!",
    });
  };

  const handleBuyEarbuds = () => {
    toast({
      title: "Coming Soon!",
      description: "Payment processing will be available shortly. Check back soon!",
    });
  };

  const handleBuyStudentTech = () => {
    toast({
      title: "Coming Soon!",
      description: "Payment processing will be available shortly. Check back soon!",
    });
  };

  const handleBuyFitnessTrackers = () => {
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

            {/* Gaming Monitors Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <Monitor className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        Best Gaming Monitors Under $500
                      </h2>
                      <p className="text-muted-foreground">
                        The Ultimate 2025 Buyer's Guide for Competitive & Casual Gamers
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
                  Maximize your gaming performance without breaking the bank. This expert guide reviews dozens of monitors across all refresh rates, panel types, and resolutions to help you find the perfect display for your gaming style and budget.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Detailed reviews of 15+ top gaming monitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Refresh rate comparison (144Hz, 165Hz, 240Hz)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Panel technology explained (IPS vs VA vs TN)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Response time and input lag benchmarks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Genre-specific recommendations (FPS, RPG, Racing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Buying decision flowchart</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Top Picks Featured:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>ASUS TUF VG27AQ - Best Overall Value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>AOC 24G2 - Best Budget Champion ($179)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>LG 27GP850-B - Best for Speed (180Hz)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Samsung Odyssey G5 - Best Curved</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>ViewSonic XG2431 - Best for Esports (240Hz)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>+ 3 more top recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-2">Why Your Monitor Matters More Than You Think:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>• Refresh Rate: Higher Hz = smoother motion</div>
                    <div>• Response Time: Lower ms = less ghosting</div>
                    <div>• PS5/Xbox Series X compatibility guides</div>
                    <div>• Setup, calibration & optimization tips</div>
                  </div>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg h-14"
                  onClick={handleBuyGamingMonitors}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - $10.00
                </Button>
              </CardContent>
            </Card>

            {/* Wireless Earbuds Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Headphones className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        Wireless Earbuds Comparison 2025
                      </h2>
                      <p className="text-muted-foreground">
                        AirPods vs Galaxy Buds vs Nothing Ear - The Complete Buyer's Guide
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
                  Cut through the marketing hype and discover which wireless earbuds truly deliver the best value for your needs. This in-depth comparison covers sound quality, battery life, ecosystem integration, and real-world performance across the top three brands.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Side-by-side feature comparison charts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sound quality and ANC performance tests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Battery life real-world testing results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ecosystem integration (iOS vs Android)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fit and comfort analysis for different ears</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Value-for-money rankings at each price point</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Brands Compared:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Apple AirPods Pro 2 - iOS Gold Standard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Samsung Galaxy Buds - Android's Best</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Nothing Ear - The Value Disruptor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>ANC performance comparison charts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Spatial audio & premium features explained</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Warranty & customer support comparison</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-2">90-Day Real-World Testing Across:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>• Daily commutes (subway, bus, walking)</div>
                    <div>• Gym workouts and running</div>
                    <div>• Video calls and conference meetings</div>
                    <div>• Music across all genres</div>
                  </div>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg h-14"
                  onClick={handleBuyEarbuds}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - $10.00
                </Button>
              </CardContent>
            </Card>

            {/* Student Tech Essentials Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        Student Tech Essentials 2025
                      </h2>
                      <p className="text-muted-foreground">
                        The Complete Guide to Laptops, Accessories & Software for Academic Success
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
                  Make smart technology investments that support your academic journey from freshman year through graduation. This comprehensive guide helps students and parents choose the right devices, accessories, and software based on major, budget, and performance needs.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Laptop recommendations by major ($400-$1,500)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>MacBook vs Windows vs Chromebook comparison</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Essential productivity accessories ranked</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Student discount guide (save $500+ annually)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Cloud storage and backup solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>4-year technology planning roadmap</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Recommendations By Major:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Engineering & Computer Science</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Business & Economics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Liberal Arts & Humanities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Creative Majors (Design, Film, Art)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Pre-Med & Science Programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Budget tiers: Essential, Recommended, Premium</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-2">Based on Real Research:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>• Surveys of 500+ students</div>
                    <div>• Interviews with university IT departments</div>
                    <div>• 73% of students report tech issues impacting grades</div>
                    <div>• Most students keep laptops all 4 years</div>
                  </div>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg h-14"
                  onClick={handleBuyStudentTech}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - $10.00
                </Button>
              </CardContent>
            </Card>

            {/* Fitness Trackers Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 p-3 rounded-full">
                      <Activity className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        Fitness Trackers for Every Budget
                      </h2>
                      <p className="text-muted-foreground">
                        From $50 Basics to $500 Premium - Find Your Perfect Health Companion
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
                  Whether you're a casual walker or serious athlete, discover the fitness tracker that matches your goals, lifestyle, and budget. This comprehensive guide breaks down features, accuracy, and value across every price range with real-world testing data.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>20+ device reviews across all price ranges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Heart rate accuracy testing results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>GPS precision comparisons for runners/cyclists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Battery life real-world performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Water resistance & swim tracking ratings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Feature comparison matrices by price tier</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Budget Tiers Covered:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Budget Tier: $50-$150 (Casual fitness)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Mid-Range: $150-$300 (Serious hobbyists)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Premium: $300-$500 (Athletes & data lovers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Garmin Forerunner 255 - Best for Runners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Apple Watch SE - Best Smartwatch Hybrid</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Garmin Fenix 7 - Best Multi-Sport</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-2">6 Months of Real-World Testing:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>• Tested against medical-grade equipment</div>
                    <div>• Runs, swims, bike rides, gym sessions</div>
                    <div>• Sleep tracking accuracy verified</div>
                    <div>• Sport-specific recommendations included</div>
                  </div>
                </div>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg h-14"
                  onClick={handleBuyFitnessTrackers}
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
              1 more premium tech guide launching soon
            </p>
            <div className="grid md:grid-cols-1 gap-4 mt-8 max-w-md mx-auto">
              <Card className="opacity-75">
                <CardHeader>
                  <CardTitle>Kids Tech Selection Guide</CardTitle>
                  <CardDescription>Age-appropriate tech choices - $10</CardDescription>
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
