import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ChristmasCountdown from "@/components/ChristmasCountdown";
import FallingSnow from "@/components/FallingSnow";
import ChristmasMusic from "@/components/ChristmasMusic";
import AffiliateFooter from "@/components/AffiliateFooter";
import heroImage from "@/assets/christmas-hero.jpg";

const categories = [
  {
    title: "Home & Safety",
    description: "Smart devices to protect and secure your home",
    icon: ShieldCheck,
    link: "/home-safety",
    color: "text-primary",
  },
  {
    title: "Health & Wellness",
    description: "Tech to track and improve your wellbeing",
    icon: HeartPulse,
    link: "/health-wellness",
    color: "text-accent",
  },
  {
    title: "Kids Tech",
    description: "Educational and fun gadgets for children",
    icon: Baby,
    link: "/kids-tech",
    color: "text-primary",
  },
  {
    title: "Gaming",
    description: "Latest gaming gear and accessories",
    icon: Gamepad2,
    link: "/gaming",
    color: "text-accent",
  },
  {
    title: "Connectivity",
    description: "Stay connected with cutting-edge devices",
    icon: Wifi,
    link: "/connectivity",
    color: "text-primary",
  },
  {
    title: "College & School",
    description: "Essential tech for students and educators",
    icon: GraduationCap,
    link: "/college",
    color: "text-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FallingSnow />
      <ChristmasMusic />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-start pt-24 justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            filter: "saturate(1.5) contrast(1.15) brightness(1.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <Snowflake
                key={i}
                className="absolute text-white/30 animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-6 inline-block">
            <span className="text-christmas-snow text-sm font-semibold uppercase tracking-wider bg-christmas-red/90 px-4 py-2 rounded-full border border-christmas-gold/50 shadow-lg">
              🎄 Holiday Tech Gifts 2025
            </span>
          </div>
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold font-display animate-fade-in">
            Discover the Best
            <span className="block bg-gradient-christmas bg-clip-text text-transparent mt-2">
              Tech for Christmas
            </span>
          </h1>
          <p className="mb-10 text-xl text-foreground font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Curated collection of top-rated tech products to make this holiday season magical
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              className="bg-gradient-christmas hover:shadow-elegant transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold" 
              size="lg" 
              asChild
            >
              <Link to="/home-safety">Shop Holiday Deals</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
              asChild
            >
              <Link to="/digital-products">Free Gift Guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Christmas Countdown */}
      <ChristmasCountdown />

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-christmas-snow/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
            Shop by Category
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Find the perfect tech gifts for everyone on your list
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.link}
                  to={category.link}
                  className="group relative p-8 bg-card rounded-2xl border-2 border-border hover:border-christmas-gold hover:shadow-gold transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-300" />
                  <Icon className={`h-14 w-14 mb-4 ${category.color} transition-transform duration-300 group-hover:scale-110`} />
                  <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-christmas-red transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-christmas-red/5 via-christmas-green/5 to-christmas-gold/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Snowflake className="h-16 w-16 mx-auto mb-6 text-christmas-gold animate-sparkle" />
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Stay Updated with Tech Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Read our blog for holiday gift guides, reviews, comparisons, and tech tips
          </p>
          <Button 
            className="bg-gradient-to-r from-christmas-green to-secondary hover:shadow-elegant transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold"
            size="lg" 
            asChild
          >
            <Link to="/blog">Visit Our Blog</Link>
          </Button>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
