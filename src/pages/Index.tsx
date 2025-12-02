import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Baby, Gamepad2, Wifi, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-tech.jpg";

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
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold">
            Discover the Best
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Tech on Amazon
            </span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated collection of top-rated tech products for every aspect of your life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/home-safety">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/digital-products">Free Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.link}
                  to={category.link}
                  className="group p-6 bg-card rounded-lg border border-border hover:shadow-card transition-all duration-300"
                >
                  <Icon className={`h-12 w-12 mb-4 ${category.color}`} />
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated with Tech Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Read our blog for reviews, comparisons, and tech tips
          </p>
          <Button variant="cta" size="lg" asChild>
            <Link to="/blog">Visit Blog</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            TechFinds is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com
          </p>
          <p className="mt-4">&copy; 2025 TechFinds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
