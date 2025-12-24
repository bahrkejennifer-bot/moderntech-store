import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Sparkles, Star, ExternalLink, ArrowRight } from "lucide-react";
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
    title: "Meta Quest 3",
    subtitle: "512GB Bundle",
    description: "Next-gen VR with 24 months Meta Horizon+ subscription.",
    rating: 4.8,
    imageUrl: metaQuestImage,
    affiliateLink: "https://amzn.to/48oAttS",
  },
  {
    title: "DJI Mini 4 Pro",
    subtitle: "Fly More Combo",
    description: "4K HDR, Under 249g, Omnidirectional sensing.",
    rating: 4.7,
    imageUrl: djiDroneImage,
    affiliateLink: "https://amzn.to/44Oulc1",
  },
  {
    title: "Roborock Saros 10R",
    subtitle: "Robot Vacuum",
    description: "22,000 Pa suction, FlexiArm technology.",
    rating: 4.6,
    imageUrl: roborockImage,
    affiliateLink: "https://amzn.to/4oLq6Fk",
  },
  {
    title: "Samsung Odyssey",
    subtitle: "OLED G9",
    description: "49\" curved, 240Hz, 0.03ms response.",
    rating: 4.5,
    imageUrl: samsungMonitorImage,
    affiliateLink: "https://amzn.to/4iIOFS5",
  },
  {
    title: "Sony WH-1000XM5",
    subtitle: "Wireless",
    description: "Industry-leading noise cancellation.",
    rating: 4.7,
    imageUrl: sonyHeadphonesImage,
    affiliateLink: "https://amzn.to/4oIrN6r",
  },
];

const categories = [
  {
    title: "Home & Safety",
    description: "Smart protection for your space",
    icon: ShieldCheck,
    link: "/home-safety",
  },
  {
    title: "Health & Wellness",
    description: "Track and optimize your wellbeing",
    icon: HeartPulse,
    link: "/health-wellness",
  },
  {
    title: "Kids Tech",
    description: "Educational gadgets for children",
    icon: Baby,
    link: "/kids-tech",
  },
  {
    title: "Gaming",
    description: "Next-level gaming gear",
    icon: Gamepad2,
    link: "/gaming",
  },
  {
    title: "Connectivity",
    description: "Stay connected everywhere",
    icon: Wifi,
    link: "/connectivity",
  },
  {
    title: "College & School",
    description: "Essential tech for students",
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
      
      {/* Hero Section - Clean Modern */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Subtle geometric background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(220_90%_50%/0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(175_85%_40%/0.06),transparent_50%)]" />
        </div>
        
        {/* Floating decorative elements - blue/teal tones */}
        <div className="absolute top-20 right-[20%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 left-[15%] w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main headline - Bold modern style */}
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground animate-fade-in">
              Level Up Your Life
              <br />
              <span className="gradient-text">Create Your Future</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-10 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.15s' }}>
              Curated wellness tech and productivity essentials for your best year yet.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1" 
                size="lg" 
                onClick={scrollToFeatured}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold" 
                size="lg" 
                asChild
              >
                <Link to="/blog">Read Our Blog</Link>
              </Button>
            </div>
            
            {/* Feature cards row */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.45s' }}>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Curated Tech</h3>
                <p className="text-muted-foreground text-sm">Handpicked essentials for modern living.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Top Rated</h3>
                <p className="text-muted-foreground text-sm">Only the best reviewed products make our list.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Goal Focused</h3>
                <p className="text-muted-foreground text-sm">Tech to help you achieve your 2026 goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-28 relative overflow-hidden bg-muted/30">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Featured Products</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Start 2026 Strong
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our handpicked selection to power your New Year goals.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.title} 
                className="group overflow-hidden bg-background border-border hover:border-primary/40 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-vibrant-orange text-vibrant-orange" />
                    <span className="text-xs font-bold text-foreground">{product.rating}</span>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground font-medium">{product.subtitle}</span>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 rounded-full font-semibold"
                    asChild
                  >
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow">
                      View on Amazon
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Browse Categories</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Explore by Interest
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Find the perfect tech for your 2026 resolutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.link}
                  to={category.link}
                  className="group relative p-8 bg-card hover:bg-muted/50 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-5">
                      <Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">{category.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-5 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm font-semibold">Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-28 relative overflow-hidden bg-secondary">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(220_90%_50%/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(175_85%_40%/0.1),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/20 backdrop-blur-sm mb-8">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-secondary-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-secondary-foreground/70 mb-10 leading-relaxed">
              Get exclusive deals, tech insights, and productivity tips delivered to your inbox.
            </p>
            
            <NewsletterSignup className="max-w-md mx-auto" />
            
            <div className="mt-10">
              <Button 
                variant="ghost"
                size="lg" 
                asChild
                className="text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-primary/10 transition-colors"
              >
                <Link to="/blog" className="flex items-center gap-2">
                  Visit Our Blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
