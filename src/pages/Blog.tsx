import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const staticBlogPosts = [
  {
    title: "☘️ Best St. Patrick's Day Tech Deals 2026",
    excerpt: "Lucky you! We've rounded up the best tech deals and discounts dropping this St. Patrick's Day — from smart home bundles to gaming gear, these prices are pure gold.",
    date: "2026-02-19",
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format",
    slug: "st-patricks-day-tech-deals-2026",
    isGenerated: false,
  },
  {
    title: "The Ultimate Smart Ring Guide for St. Patrick's Day 2026",
    excerpt: "Oura, Samsung Galaxy Ring, or Ultrahuman? We compare the top smart rings, breaking down sleep tracking accuracy, heart rate monitoring, sizing, and whether they're worth the investment.",
    date: "2026-02-02",
    category: "Health & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1573405963648-854c31a4db30?w=800&auto=format",
    slug: "smart-ring-guide-valentines-2026",
    isGenerated: false,
  },
  {
    title: "2026 St. Patrick's Day Gift Guide: Tech for Family Edition",
    excerpt: "Strike gold with the luckiest family tech picks! Curated gifts that bring the whole family together this St. Patrick's Day.",
    date: "2026-02-02",
    category: "Gift Guides",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format",
    slug: "valentine-gift-guide-family-tech-2026",
    isGenerated: false,
  },
  {
    title: "Top 10 Smart Home Devices for 2025",
    excerpt: "Discover the latest smart home technology that will transform your living space into a connected, efficient haven. From security cameras to smart thermostats, we've tested the best devices.",
    date: "2025-01-14",
    category: "Home & Safety",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format",
    slug: "top-10-smart-home-devices-2025",
    isGenerated: false,
  },
  {
    title: "Best Gaming Monitors Under $500",
    excerpt: "We've tested dozens of gaming monitors to find the best value options for competitive and casual gamers alike. Get high refresh rates and stunning visuals without breaking the bank.",
    date: "2025-01-09",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format",
    slug: "best-gaming-monitors-under-500",
    isGenerated: false,
  },
  {
    title: "Wireless Earbuds Comparison Guide",
    excerpt: "AirPods vs Galaxy Buds vs Nothing Ear—which wireless earbuds are right for you? We break down the pros, cons, sound quality, battery life, and value proposition.",
    date: "2025-01-04",
    category: "Connectivity",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format",
    slug: "wireless-earbuds-comparison-2025",
    isGenerated: false,
  },
  {
    title: "Tech Essentials for College Students",
    excerpt: "Starting college? Here's our comprehensive guide to the tech gear every student needs to succeed—from laptops and tablets to accessories that make campus life easier.",
    date: "2024-12-27",
    category: "College & School",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format",
    slug: "tech-essentials-college-students",
    isGenerated: false,
  },
  {
    title: "Best Fitness Trackers for Every Budget",
    excerpt: "From budget-friendly options to premium smartwatches, find the perfect fitness tracker for your health goals. We compare features, accuracy, battery life, and overall value.",
    date: "2024-12-19",
    category: "Health & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1575390260582-cf5f64c2a6e4?w=800&auto=format",
    slug: "best-fitness-trackers-every-budget",
    isGenerated: false,
  },
  {
    title: "Educational Tech for Kids: Parent's Guide",
    excerpt: "Navigate the world of educational technology with our guide to age-appropriate learning devices and apps. Make informed choices that support your child's development.",
    date: "2024-12-14",
    category: "Kids Tech",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format",
    slug: "educational-tech-kids-parents-guide",
    isGenerated: false,
  },
];

const Blog = () => {
  const { data: dynamicPosts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, image_url, created_at, is_published")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Merge dynamic posts (AI-generated) with static ones, dynamic first
  const dynamicMapped = (dynamicPosts || []).map((p) => ({
    title: p.title,
    excerpt: p.excerpt || "",
    date: p.created_at,
    category: p.category || "Tech Roundup",
    imageUrl: p.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format",
    slug: p.slug,
    isGenerated: true,
  }));

  const allPosts = [...dynamicMapped, ...staticBlogPosts];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero header with subtle spotlight */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(230_90%_58%/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4 text-center">Modern Tech Blog</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 text-center tracking-tight">
            Tech Insights & Reviews
          </h1>
          <div className="glow-line max-w-xs mx-auto mb-5" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-center leading-relaxed">
            Expert reviews, buying guides, and tech news to help you make informed decisions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Weekly Deep-Dive Section */}
        {dynamicMapped.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="glow-line flex-1" />
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 whitespace-nowrap tracking-tight">
                <Sparkles className="h-4 w-4 text-primary" />
                The Weekly Deep-Dive
              </h2>
              <div className="glow-line flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynamicMapped.slice(0, 3).map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                  <article className="rounded-xl border border-border/60 bg-card overflow-hidden hover-lift hover:shadow-card transition-all duration-300">
                    <div className="aspect-video overflow-hidden relative">
                      <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground gap-1 text-xs">
                        <Sparkles className="h-3 w-3" /> AI Roundup
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="ml-auto text-primary font-medium">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <span className="inline-flex items-center text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">
                        Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Lead magnet CTA — refined glass card */}
        <section className="mb-20">
          <div className="relative rounded-2xl border border-border/60 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(230_90%_58%/0.06),transparent_70%)]" />
            <div className="relative z-10 py-12 px-8 text-center">
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Free Resource</p>
              <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">90-Day Amazon Associate Roadmap</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm leading-relaxed">Go from zero to your first affiliate commission — step-by-step checklist included.</p>
              <Button asChild variant="cta" className="rounded-full px-8">
                <Link to="/free-roadmap">Download Free Roadmap <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* All Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8 tracking-tight">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                <article className="rounded-xl border border-border/60 bg-card overflow-hidden hover-lift hover:shadow-card transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                    {post.isGenerated && (
                      <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground gap-1 text-xs">
                        <Sparkles className="h-3 w-3" /> AI Roundup
                      </Badge>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="ml-auto text-primary font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default Blog;
