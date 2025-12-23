import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Sparkles, Star, ExternalLink, ArrowRight, ChevronRight } from "lucide-react";
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
      
      {/* Hero Section - Bold & Clean */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
        <div className="absolute inset-0 spotlight" />
        
        {/* Background image with light overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Small tag */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-3 text-primary text-sm font-semibold tracking-widest uppercase">
                <span className="w-10 h-px bg-primary" />
                New Year 2026
                <span className="w-10 h-px bg-primary" />
              </span>
            </div>
            
            {/* Main headline - Bold Apple style */}
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Level Up</span>
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Your Life.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-10 text-xl md:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Nurse-curated wellness tech and productivity essentials for your best year yet.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 text-lg px-10 py-7 rounded-full font-medium group shadow-lg hover:shadow-xl" 
                size="lg" 
                onClick={scrollToFeatured}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-border text-foreground hover:bg-muted transition-all duration-300 text-lg px-10 py-7 rounded-full font-medium"
                asChild
              >
                <Link to="/digital-products">Free Guides</Link>
              </Button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button 
              onClick={scrollToFeatured}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs tracking-widest uppercase font-medium">Explore</span>
                <ChevronRight className="h-5 w-5 rotate-90" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">Featured</span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
              Start 2026 Strong
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our handpicked selection to power your New Year goals.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.title} 
                className="group overflow-hidden bg-card border-border hover:border-primary/40 transition-all duration-500 hover:shadow-elegant"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
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
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 rounded-full font-medium"
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
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Categories</span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
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
                  className="group relative p-8 bg-card hover:bg-muted/50 rounded-2xl border border-border hover:border-primary/40 transition-all duration-400 overflow-hidden hover:shadow-lg"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
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
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-8">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
              Stay Ahead
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Get exclusive deals, wellness tech insights, and productivity tips delivered to your inbox.
            </p>
            
            <NewsletterSignup className="max-w-md mx-auto" />
            
            <div className="mt-10">
              <Button 
                variant="ghost"
                size="lg" 
                asChild
                className="text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors"
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
