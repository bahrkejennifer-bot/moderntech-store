import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Tech Insights & Reviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert reviews, buying guides, and tech news to help you make informed decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden hover:shadow-card transition-all duration-300">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {post.isGenerated && (
                  <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" /> AI Roundup
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="ml-auto text-primary font-medium">{post.category}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link to={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default Blog;
