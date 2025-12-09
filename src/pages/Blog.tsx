import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Top 10 Smart Home Devices for 2025",
    excerpt: "Discover the latest smart home technology that will transform your living space into a connected, efficient haven.",
    date: "2025-01-15",
    category: "Home & Safety",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format",
    slug: "top-10-smart-home-devices-2025",
  },
  {
    title: "Best Gaming Monitors Under $500",
    excerpt: "We've tested dozens of gaming monitors to find the best value options for competitive and casual gamers alike.",
    date: "2025-01-10",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format",
    slug: "best-gaming-monitors-under-500",
  },
  {
    title: "Wireless Earbuds Comparison Guide",
    excerpt: "AirPods vs Galaxy Buds vs Nothing Ear - which wireless earbuds are right for you? We break down the pros and cons.",
    date: "2025-01-05",
    category: "Connectivity",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format",
    slug: "wireless-earbuds-comparison-2025",
  },
  {
    title: "Tech Essentials for College Students",
    excerpt: "Starting college? Here's our comprehensive guide to the tech gear every student needs to succeed.",
    date: "2024-12-28",
    category: "College & School",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format",
    slug: "tech-essentials-college-students",
  },
  {
    title: "Best Fitness Trackers for Every Budget",
    excerpt: "From budget-friendly options to premium smartwatches, find the perfect fitness tracker for your health goals.",
    date: "2024-12-20",
    category: "Health & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1575390260582-cf5f64c2a6e4?w=800&auto=format",
    slug: "best-fitness-trackers-every-budget",
  },
  {
    title: "Educational Tech for Kids: Parent's Guide",
    excerpt: "Navigate the world of educational technology with our guide to age-appropriate learning devices and apps.",
    date: "2024-12-15",
    category: "Kids Tech",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format",
    slug: "educational-tech-kids-parents-guide",
  },
];

const Blog = () => {
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
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden hover:shadow-card transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
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
