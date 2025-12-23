import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Sparkles, Star, ExternalLink, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import heroImage from "@/assets/new-year-hero.jpg";
import metaQuestImage from "@/assets/products/meta-quest-3.jpg";
import djiDroneImage from "@/assets/products/dji-mini-4-pro.jpg";
import roborockImage from "@/assets/products/roborock-saros-10r.jpg";
import samsungMonitorImage from "@/assets/products/samsung-odyssey-g9.jpg";
import sonyHeadphonesImage from "@/assets/products/sony-wh-1000xm5.jpg";

const featuredProducts = [
  {
    title: "Meta Quest 3 512GB Bundle",
    description: "Virtual Reality Headset with 24 Months Meta Horizon+ Games Subscription & Enhanced Protection.",
    rating: 4.8,
    imageUrl: metaQuestImage,
    affiliateLink: "https://amzn.to/48oAttS",
  },
  {
    title: "DJI Mini 4 Pro Folding Drone with RC 2 Remote Fly More Combo",
    description: "4K HDR Video Camera, Under 249g, Omnidirectional Sensing, 3 Batteries Bundle with 128GB SD Card & Strobe Lights.",
    rating: 4.7,
    imageUrl: djiDroneImage,
    affiliateLink: "https://amzn.to/44Oulc1",
  },
  {
    title: "Roborock Saros 10R Robot Vacuum and Mop",
    description: "22,000 Pa Suction, Zero-Tangling, FlexiArm Riser Technology, Self-Emptying, Hot Air Drying.",
    rating: 4.6,
    imageUrl: roborockImage,
    affiliateLink: "https://amzn.to/4oLq6Fk",
  },
  {
    title: "Samsung Odyssey OLED G9",
    description: "49-inch curved smart gaming monitor with 240Hz refresh rate and 0.03ms response.",
    rating: 4.5,
    imageUrl: samsungMonitorImage,
    affiliateLink: "https://amzn.to/4iIOFS5",
  },
  {
    title: "Sony WH-1000XM5 Premium Noise Canceling Headphones",
    description: "Auto NC Optimizer, 30-Hour Battery, Alexa Voice Control, Silver.",
    rating: 4.7,
    imageUrl: sonyHeadphonesImage,
    affiliateLink: "https://amzn.to/4oIrN6r",
  },
];

const categories = [
  {
    title: "Home & Safety",
    description: "Smart devices to protect and secure your home",
    icon: ShieldCheck,
    link: "/home-safety",
  },
  {
    title: "Health & Wellness",
    description: "Tech to track and improve your wellbeing",
    icon: HeartPulse,
    link: "/health-wellness",
  },
  {
    title: "Kids Tech",
    description: "Educational and fun gadgets for children",
    icon: Baby,
    link: "/kids-tech",
  },
  {
    title: "Gaming",
    description: "Latest gaming gear and accessories",
    icon: Gamepad2,
    link: "/gaming",
  },
  {
    title: "Connectivity",
    description: "Stay connected with cutting-edge devices",
    icon: Wifi,
    link: "/connectivity",
  },
  {
    title: "College & School",
    description: "Essential tech for students and educators",
    icon: GraduationCap,
    link: "/college",
  },
];

const Index = () => {
  const scrollToFeatured = () => {
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-start pt-8 justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          {/* Decorative gradient orbs */}
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-vibrant-purple/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-vibrant-teal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pt-12">
          <div className="max-w-2xl">
            <div className="mb-4 inline-block">
              <span className="text-primary-foreground text-sm font-semibold uppercase tracking-wider bg-gradient-hero px-5 py-2.5 rounded-full shadow-glow flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                New Year, New Tech 2026
              </span>
            </div>
            <h1 className="mb-4 text-5xl md:text-6xl lg:text-7xl font-bold font-display animate-fade-in">
              Level Up Your Life
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2 drop-shadow-sm">
                Tech for a Smarter 2026
              </span>
            </h1>
            <p className="mb-6 text-xl text-foreground/90 font-medium max-w-xl leading-relaxed">
              The future of you starts here. Nurse-curated wellness tech and productivity essentials for your best year yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold hover:scale-105" 
                size="lg" 
                onClick={scrollToFeatured}
              >
                <Zap className="mr-2 h-5 w-5" />
                Shop 2026 Picks
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-vibrant-teal text-vibrant-teal hover:bg-vibrant-teal hover:text-white transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold backdrop-blur-sm"
                asChild
              >
                <Link to="/digital-products">Free Tech Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-vibrant-purple/5 to-vibrant-teal/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-vibrant-coral font-semibold text-sm uppercase tracking-wider mb-2">Top Picks</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Start 2026 with the <span className="bg-gradient-hero bg-clip-text text-transparent">Best Tech</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Got a gift card? Invest it in yourself. Our handpicked selection to power your New Year goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={product.title} className="overflow-hidden transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 group bg-card border-border/50 hover:border-primary/30">
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center space-x-1 bg-vibrant-coral/10 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-vibrant-coral text-vibrant-coral" />
                      <span className="text-sm font-semibold text-vibrant-coral">{product.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-cool hover:shadow-glow transition-all duration-300 text-white"
                    asChild
                  >
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow">
                      View on Amazon <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vibrant-teal/5 via-background to-vibrant-purple/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-vibrant-teal font-semibold text-sm uppercase tracking-wider mb-2">Browse</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Explore by <span className="bg-gradient-accent bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find the perfect tech to power your 2026 resolutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const colors = ['vibrant-blue', 'vibrant-teal', 'vibrant-coral', 'vibrant-purple', 'vibrant-mint', 'vibrant-blue'];
              return (
                <Link
                  key={category.link}
                  to={category.link}
                  className="group relative p-8 bg-card rounded-2xl border-2 border-border/50 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-hero opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500" />
                  <div className={`inline-flex p-3 rounded-xl bg-primary/10 mb-4`}>
                    <Icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-vibrant-purple/10 via-vibrant-blue/5 to-vibrant-teal/10" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-vibrant-coral/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-vibrant-teal/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-hero mb-6 shadow-glow">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Stay Ahead of the <span className="bg-gradient-hero bg-clip-text text-transparent">Curve</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get exclusive deals, wellness tech insights, and productivity tips delivered to your inbox
            </p>
          </div>
          <NewsletterSignup className="max-w-xl mx-auto" />
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              size="lg" 
              asChild
              className="border-2 border-vibrant-purple text-vibrant-purple hover:bg-vibrant-purple hover:text-white transition-all duration-300"
            >
              <Link to="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
