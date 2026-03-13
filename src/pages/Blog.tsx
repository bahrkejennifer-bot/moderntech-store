import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles, Clock, Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    readTime: "8 min read",
  },
  {
    title: "The Ultimate Smart Ring Guide for St. Patrick's Day 2026",
    excerpt: "Oura, Samsung Galaxy Ring, or Ultrahuman? We compare the top smart rings, breaking down sleep tracking accuracy, heart rate monitoring, sizing, and whether they're worth the investment.",
    date: "2026-02-02",
    category: "Health & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1573405963648-854c31a4db30?w=800&auto=format",
    slug: "smart-ring-guide-valentines-2026",
    isGenerated: false,
    readTime: "12 min read",
  },
  {
    title: "2026 St. Patrick's Day Gift Guide: Tech for Family Edition",
    excerpt: "Strike gold with the luckiest family tech picks! Curated gifts that bring the whole family together this St. Patrick's Day.",
    date: "2026-02-02",
    category: "Gift Guides",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format",
    slug: "valentine-gift-guide-family-tech-2026",
    isGenerated: false,
    readTime: "10 min read",
  },
  {
    title: "Top 10 Smart Home Devices for 2025",
    excerpt: "Discover the latest smart home technology that will transform your living space into a connected, efficient haven. From security cameras to smart thermostats, we've tested the best devices.",
    date: "2025-01-14",
    category: "Home & Safety",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format",
    slug: "top-10-smart-home-devices-2025",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Best Gaming Monitors Under $500",
    excerpt: "We've tested dozens of gaming monitors to find the best value options for competitive and casual gamers alike. Get high refresh rates and stunning visuals without breaking the bank.",
    date: "2025-01-09",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&auto=format",
    slug: "best-gaming-monitors-under-500",
    isGenerated: false,
    readTime: "11 min read",
  },
  {
    title: "Wireless Earbuds Comparison Guide",
    excerpt: "AirPods vs Galaxy Buds vs Nothing Ear—which wireless earbuds are right for you? We break down the pros, cons, sound quality, battery life, and value proposition.",
    date: "2025-01-04",
    category: "Connectivity",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format",
    slug: "wireless-earbuds-comparison-2025",
    isGenerated: false,
    readTime: "10 min read",
  },
  {
    title: "Tech Essentials for College Students",
    excerpt: "Starting college? Here's our comprehensive guide to the tech gear every student needs to succeed—from laptops and tablets to accessories that make campus life easier.",
    date: "2024-12-27",
    category: "College & School",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format",
    slug: "tech-essentials-college-students",
    isGenerated: false,
    readTime: "8 min read",
  },
  {
    title: "Best Fitness Trackers for Every Budget",
    excerpt: "From budget-friendly options to premium smartwatches, find the perfect fitness tracker for your health goals. We compare features, accuracy, battery life, and overall value.",
    date: "2024-12-19",
    category: "Health & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1575390260582-cf5f64c2a6e4?w=800&auto=format",
    slug: "best-fitness-trackers-every-budget",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Educational Tech for Kids: Parent's Guide",
    excerpt: "Navigate the world of educational technology with our guide to age-appropriate learning devices and apps. Make informed choices that support your child's development.",
    date: "2024-12-14",
    category: "Kids Tech",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format",
    slug: "educational-tech-kids-parents-guide",
    isGenerated: false,
    readTime: "7 min read",
  },
];

const categories = ["All", "Deals", "Health & Wellness", "Gift Guides", "Home & Safety", "Gaming", "Connectivity", "College & School", "Kids Tech"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  const dynamicMapped = (dynamicPosts || []).map((p) => ({
    title: p.title,
    excerpt: p.excerpt || "",
    date: p.created_at,
    category: p.category || "Tech Roundup",
    imageUrl: p.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format",
    slug: p.slug,
    isGenerated: true,
    readTime: "5 min read",
  }));

  const allPosts = [...dynamicMapped, ...staticBlogPosts];

  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [allPosts, activeCategory, searchQuery]);

  const isFiltering = activeCategory !== "All" || searchQuery.trim().length > 0;
  const featuredPost = isFiltering ? null : allPosts[0];
  const gridPosts = isFiltering ? filteredPosts : filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Modern Tech Blog | Reviews, Deals & Buying Guides</title>
        <meta name="description" content="Expert tech reviews, buying guides and deals on smart home, gaming, wellness gear and more. Updated weekly." />
        <meta property="og:title" content="Modern Tech Blog | Reviews, Deals & Buying Guides" />
        <meta property="og:description" content="Expert tech reviews, buying guides and deals on smart home, gaming, wellness gear and more." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format" />
        <meta property="og:url" content="https://moderntech.store/blog" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      {/* ── Hero Section ── */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 pt-24 pb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Modern Tech Blog</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl">
            Insights, Reviews &<br />
            <span className="gradient-text">Buying Guides</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">
            Expert-tested tech recommendations to help you spend smarter and live better.
          </p>
        </div>

        {/* Search bar + Category pills */}
        <div className="container mx-auto px-4 pb-5 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 h-10 bg-card border-border/60 rounded-full text-sm placeholder:text-muted-foreground/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* ── Featured Post (large hero card) ── */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/40 bg-card hover:shadow-card transition-all duration-500">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {featuredPost.isGenerated && (
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" /> AI Roundup
                  </Badge>
                )}
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="text-primary font-semibold uppercase tracking-wide">{featuredPost.category}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(featuredPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold leading-tight tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* ── AI Roundup Section ── */}
        {!isFiltering && dynamicMapped.length > 1 && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-primary flex items-center gap-2 whitespace-nowrap">
                <Sparkles className="h-4 w-4" />
                Weekly Deep-Dive
              </h2>
              <div className="glow-line flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dynamicMapped.slice(1, 4).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter CTA ── */}
        {!isFiltering && (
          <section className="mb-16 rounded-2xl border border-border/40 bg-card overflow-hidden">
            <div className="relative py-14 px-8 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Free Resource</p>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">90-Day Amazon Associate Roadmap</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm leading-relaxed">
                  Go from zero to your first affiliate commission — step-by-step checklist included.
                </p>
                <Button asChild variant="cta" className="rounded-full px-8">
                  <Link to="/free-roadmap">Download Free Roadmap <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ── All Articles Grid ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground whitespace-nowrap">
              {isFiltering
                ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""}`
                : "All Articles"}
            </h2>
            <div className="h-px flex-1 bg-border/60" />
            {isFiltering && (
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-xs text-primary font-medium hover:underline whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>

          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-lg font-semibold text-foreground/70 mb-2">No articles found</p>
              <p className="text-sm text-muted-foreground mb-6">Try a different search term or category.</p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>
      </div>

      <AffiliateFooter />
    </div>
  );
};

/* ── Reusable Blog Card Component ── */
interface BlogPostItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
  isGenerated: boolean;
  readTime: string;
}

const BlogCard = ({ post }: { post: BlogPostItem }) => (
  <Link to={`/blog/${post.slug}`} className="group block h-full">
    <article className="rounded-xl border border-border/40 bg-card overflow-hidden h-full flex flex-col hover:border-primary/30 hover:shadow-card transition-all duration-300">
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        {post.isGenerated && (
          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground gap-1 text-[10px]">
            <Sparkles className="h-3 w-3" /> AI Roundup
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
          <span className="text-primary font-semibold uppercase tracking-wide">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="ml-auto flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
        </div>
        <h3 className="text-base font-bold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors tracking-tight">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mt-4 group-hover:gap-2.5 transition-all">
          Read more <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  </Link>
);

export default Blog;
