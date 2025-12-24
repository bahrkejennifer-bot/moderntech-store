import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Sparkles, Star, ExternalLink, ArrowRight, Check } from "lucide-react";
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
    color: "bg-vibrant-purple",
  },
  {
    title: "Health & Wellness",
    description: "Track and optimize your wellbeing",
    icon: HeartPulse,
    link: "/health-wellness",
    color: "bg-vibrant-pink",
  },
  {
    title: "Kids Tech",
    description: "Educational gadgets for children",
    icon: Baby,
    link: "/kids-tech",
    color: "bg-vibrant-orange",
  },
  {
    title: "Gaming",
    description: "Next-level gaming gear",
    icon: Gamepad2,
    link: "/gaming",
    color: "bg-vibrant-green",
  },
  {
    title: "Connectivity",
    description: "Stay connected everywhere",
    icon: Wifi,
    link: "/connectivity",
    color: "bg-vibrant-blue",
  },
  {
    title: "College & School",
    description: "Essential tech for students",
    icon: GraduationCap,
    link: "/college",
    color: "bg-vibrant-coral",
  },
];

const Index = () => {
  const scrollToFeatured = () => {
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Elementor Inspired with Vibrant Colors */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-[10%] w-80 h-80 bg-vibrant-pink/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-vibrant-orange/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vibrant-blue/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">New Year, New Tech</span>
            </div>
            
            {/* Main headline - Bold style */}
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white animate-fade-in">
              Level Up Your Life
              <br />
              <span className="text-vibrant-orange">Create Your Future</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-10 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.15s' }}>
              Curated wellness tech and productivity essentials for your best year yet.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-vibrant-pink hover:bg-vibrant-pink/90 text-white transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold shadow-pink hover:shadow-2xl hover:-translate-y-1" 
                size="lg" 
                onClick={scrollToFeatured}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-10 py-7 rounded-full font-semibold backdrop-blur-sm" 
                size="lg" 
                asChild
              >
                <Link to="/blog">Read Our Blog</Link>
              </Button>
            </div>
            
            {/* Stats row */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.45s' }}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
                <p className="text-white/70">Curated Products</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-vibrant-orange mb-2">4.8★</div>
                <p className="text-white/70">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-vibrant-green mb-2">50K+</div>
                <p className="text-white/70">Happy Readers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-28 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-vibrant-pink font-semibold text-sm tracking-widest uppercase mb-4">Featured Products</span>
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
                className="group overflow-hidden bg-card border-border hover:border-vibrant-purple/40 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2"
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
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-vibrant-purple transition-colors">
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
                    className="w-full bg-vibrant-purple hover:bg-vibrant-purple/90 text-white transition-all duration-300 rounded-full font-semibold"
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
      <section className="py-28 relative overflow-hidden bg-muted/30">
        <div className="absolute top-0 left-0 right-0 h-px glow-line-pink" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-vibrant-orange font-semibold text-sm tracking-widest uppercase mb-4">Browse Categories</span>
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
                  className="group relative p-8 bg-card hover:bg-card/80 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl ${category.color} mb-5`}>
                      <Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">{category.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-5 flex items-center text-vibrant-purple opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
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

      {/* Features Section */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-vibrant-green font-semibold text-sm tracking-widest uppercase mb-4">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                Tech That Transforms Your Life
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We spend hours researching and testing products so you don't have to. Every recommendation is backed by real-world experience.
              </p>
              
              <div className="space-y-4">
                {[
                  "Expert reviews from tech enthusiasts",
                  "Honest pros and cons for every product",
                  "Best prices from trusted retailers",
                  "Regular updates with new releases"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-vibrant-green flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-hero p-6 rounded-2xl text-white">
                <div className="text-3xl font-bold mb-2">100+</div>
                <p className="text-white/80">Products Reviewed</p>
              </div>
              <div className="bg-vibrant-pink p-6 rounded-2xl text-white">
                <div className="text-3xl font-bold mb-2">6</div>
                <p className="text-white/80">Categories</p>
              </div>
              <div className="bg-vibrant-orange p-6 rounded-2xl text-white">
                <div className="text-3xl font-bold mb-2">Weekly</div>
                <p className="text-white/80">New Updates</p>
              </div>
              <div className="bg-vibrant-green p-6 rounded-2xl text-white">
                <div className="text-3xl font-bold mb-2">Free</div>
                <p className="text-white/80">Expert Guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-28 relative overflow-hidden bg-foreground">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(250_85%_55%/0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(330_90%_55%/0.15),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-vibrant-pink/20 backdrop-blur-sm mb-8">
              <Sparkles className="h-10 w-10 text-vibrant-pink" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-background">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-background/70 mb-10 leading-relaxed">
              Get exclusive deals, tech insights, and productivity tips delivered to your inbox.
            </p>
            
            <NewsletterSignup className="max-w-md mx-auto" />
            
            <div className="mt-10">
              <Button 
                variant="ghost"
                size="lg" 
                asChild
                className="text-background/70 hover:text-background hover:bg-white/10 transition-colors"
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
