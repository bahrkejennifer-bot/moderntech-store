import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Sparkles, Star, ExternalLink, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { TechChatbot } from "@/components/TechChatbot";
import heroImage from "@/assets/hero-family-tech.jpg";
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
    color: "bg-vibrant-green",
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
    color: "bg-vibrant-teal",
  },
  {
    title: "Connectivity",
    description: "Stay connected everywhere",
    icon: Wifi,
    link: "/connectivity",
    color: "bg-vibrant-sky",
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
      
      {/* Hero Section - Dark Luxurious Tech */}
      <section className="relative min-h-[90vh] flex items-start justify-center overflow-hidden pt-20">
        {/* Premium tech background image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Family of four driving down coastal mountain road towards ocean" 
            className="w-full h-full object-cover"
          />
          {/* Soft overlay for text readability - stronger at top */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
          {/* Tropical blue accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-sky-600/10" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full mb-2 animate-fade-in border border-white/30">
              <Sparkles className="h-2.5 w-2.5 text-cyan-300" />
              <span className="text-[10px] font-medium">Tech Today, Trend Tomorrow</span>
            </div>
            
            {/* Main headline - Compact */}
            <h1 className="mb-2 text-2xl md:text-3xl font-bold tracking-tight text-white animate-fade-in drop-shadow-lg">
              Live Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400">Best Life</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-4 text-sm md:text-base text-white/95 max-w-md mx-auto leading-relaxed animate-fade-in drop-shadow-md" style={{ animationDelay: '0.15s' }}>
              Premium tech and lifestyle essentials curated for the modern family.
            </p>
          </div>
          
          {/* CTA Buttons - positioned lower */}
          <div className="absolute bottom-12 left-0 right-0 px-4">
            <div className="flex flex-row gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-cyan-500 hover:bg-cyan-400 text-white transition-all duration-300 text-xs px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5" 
                size="sm" 
                onClick={scrollToFeatured}
              >
                Explore Now
              </Button>
              <Button 
                className="bg-white/90 text-slate-900 hover:bg-white transition-all duration-300 text-xs px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5" 
                size="sm" 
                asChild
              >
              <Link to="/blog">Read Our Blog</Link>
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
              <p className="text-white/60 text-sm">Curated Products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">4.8★</div>
              <p className="text-white/60 text-sm">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sky-300 mb-1">50K+</div>
              <p className="text-white/60 text-sm">Happy Readers</p>
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
              Top Picks for You
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our handpicked selection of premium tech essentials.
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.title} 
                className="group overflow-hidden bg-card border-border hover:border-vibrant-green/40 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2"
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
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-vibrant-green transition-colors">
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
                    className="w-full bg-vibrant-green hover:bg-vibrant-green/90 text-white transition-all duration-300 rounded-full font-semibold"
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
              Find the perfect tech for every lifestyle
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
                    
                    <div className="mt-5 flex items-center text-vibrant-blue opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm font-semibold">Explore</span>
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
      <section className="py-28 relative overflow-hidden bg-muted">
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(160_85%_40%/0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(195_95%_50%/0.1),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-vibrant-green/10 mb-8">
              <Sparkles className="h-10 w-10 text-vibrant-green" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Get exclusive deals, tech insights, and productivity tips delivered to your inbox.
            </p>
            
            <NewsletterSignup className="max-w-md mx-auto" />
            
            <div className="mt-10">
              <Button 
                variant="ghost"
                size="lg" 
                asChild
                className="text-muted-foreground hover:text-foreground hover:bg-vibrant-green/10 transition-colors"
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
      
      {/* Newsletter Popup */}
      <NewsletterPopup />
      
      {/* Tech Finder Chatbot */}
      <TechChatbot />
    </div>
  );
};

export default Index;
