import { Download, CheckCircle, ShoppingCart, Home, Star, Monitor, Headphones, GraduationCap, Activity, Baby, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Import cover images
import kidsTechCover from "@/assets/pdf-covers/kids-tech-guide-cover.jpg";
import smartHomeCover from "@/assets/pdf-covers/smart-home-guide-cover.jpg";
import gamingMonitorsCover from "@/assets/pdf-covers/gaming-monitors-guide-cover.jpg";
import earbudsCover from "@/assets/pdf-covers/earbuds-guide-cover.jpg";
import studentTechCover from "@/assets/pdf-covers/student-tech-guide-cover.jpg";
import fitnessTrackersCover from "@/assets/pdf-covers/fitness-trackers-guide-cover.jpg";

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
  const handleDownloadKidsTech = () => {
    toast({
      title: "Download Starting!",
      description: "Your free Kids Tech Guide is downloading now.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your Tech Buying Guide Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Navigate your next tech purchase with confidence using our curated digital guides
          </p>
        </div>

        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">My Vision for These Guides</h2>
                  <p className="text-muted-foreground">
                    I'm building a collection of in-depth tech buying guides to help you make informed purchasing decisions. Each guide is carefully researched and designed to cut through the marketing noise, giving you the real information you need.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Free Guide Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start with our free <strong>Kids & Parents Tech Guide</strong> – perfect for parents navigating age-appropriate technology decisions.
                  </p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                    Premium Guides Coming Soon
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    I'm planning to sell the remaining 5 premium guides at <strong>$10 each</strong> – packed with detailed reviews, comparison charts, and buying recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Free Product - Kids Tech Guide */}
          <Card className="mb-8 overflow-hidden border-2 border-primary">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Cover Image */}
              <div className="md:col-span-1">
                <img 
                  src={kidsTechCover} 
                  alt="Kids Tech Guide Cover" 
                  className="w-full h-full object-cover min-h-[200px]"
                />
              </div>
              
              {/* Content */}
              <div className="md:col-span-2">
                <div className="bg-gradient-hero p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Baby className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          Age-Appropriate Technology for Kids & Teens
                        </h2>
                        <p className="text-white/90 text-lg">
                          The Parent's Guide to Safe, Educational Tech from Ages 3-18
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white">
                      FREE
                    </div>
                  </div>
                </div>
            
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground mb-6">
                Navigate the complex world of kids' technology with confidence. This comprehensive guide helps parents choose devices, apps, and services that balance education, entertainment, and safety at every developmental stage from preschool through high school.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Age-by-age device recommendations (3-6, 7-10, 11-14, 15-18)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Parental control setup guides for all platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Screen time management strategies that work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Educational app reviews by subject and age</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Cybersecurity and online safety education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Budget planning for growing tech needs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Age Groups Covered:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Ages 3-6: Tablets, educational apps, screen limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Ages 7-10: First devices, learning tools, gaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Ages 11-14: Smartphone readiness, social media</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Ages 15-18: Independence, college prep, career skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>STEM learning kits and coding tools comparison</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Transitioning to adult-level responsibility</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold mb-2">The Technology Parenting Challenge:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>• 95% of teens have access to a smartphone</div>
                  <div>• 70% of parents feel overwhelmed by kids' tech</div>
                  <div>• 89% of teachers say tech improves learning</div>
                  <div>• Research from 200+ parent interviews</div>
                </div>
              </div>
              
              <Button 
                variant="cta" 
                size="lg" 
                className="w-full text-lg h-14"
                onClick={handleDownloadKidsTech}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Free Guide for Parents
              </Button>
            </CardContent>
              </div>
            </div>
          </Card>

          {/* Premium PDF Products */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Premium Tech Guides</h2>
            
            {/* Smart Home Guide - $10 */}
            <Card className="overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-4 gap-0">
                {/* Cover Image */}
                <div className="md:col-span-1">
                  <img 
                    src={smartHomeCover} 
                    alt="Smart Home Guide Cover" 
                    className="w-full h-full object-cover min-h-[150px]"
                  />
                </div>
                
                {/* Content */}
                <div className="md:col-span-3">
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
                </div>
              </div>
            </Card>

            {/* Gaming Monitors Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-4 gap-0">
                {/* Cover Image */}
                <div className="md:col-span-1">
                  <img 
                    src={gamingMonitorsCover} 
                    alt="Gaming Monitors Guide Cover" 
                    className="w-full h-full object-cover min-h-[150px]"
                  />
                </div>
                
                {/* Content */}
                <div className="md:col-span-3">
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
                </div>
              </div>
            </Card>

            {/* Wireless Earbuds Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-4 gap-0">
                {/* Cover Image */}
                <div className="md:col-span-1">
                  <img 
                    src={earbudsCover} 
                    alt="Wireless Earbuds Guide Cover" 
                    className="w-full h-full object-cover min-h-[150px]"
                  />
                </div>
                
                {/* Content */}
                <div className="md:col-span-3">
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
                </div>
              </div>
            </Card>

            {/* Student Tech Essentials Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-4 gap-0">
                {/* Cover Image */}
                <div className="md:col-span-1">
                  <img 
                    src={studentTechCover} 
                    alt="Student Tech Guide Cover" 
                    className="w-full h-full object-cover min-h-[150px]"
                  />
                </div>
                
                {/* Content */}
                <div className="md:col-span-3">
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
                </div>
              </div>
            </Card>

            {/* Fitness Trackers Guide - $10 */}
            <Card className="mt-6 overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
              <div className="grid md:grid-cols-4 gap-0">
                {/* Cover Image */}
                <div className="md:col-span-1">
                  <img 
                    src={fitnessTrackersCover} 
                    alt="Fitness Trackers Guide Cover" 
                    className="w-full h-full object-cover min-h-[150px]"
                  />
                </div>
                
                {/* Content */}
                <div className="md:col-span-3">
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
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default DigitalProducts;
