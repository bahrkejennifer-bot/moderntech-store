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
import ouraRingHeroImg from "@/assets/heroes/oura-ring-hero.jpg";
import fitnessTrackersHeroImg from "@/assets/blog/fitness-trackers-hero.jpg";
import springDealsHeroImg from "@/assets/blog/st-patricks-gift-guide-hero.jpg";
import wirelessEarbudsHeroImg from "@/assets/blog/wireless-earbuds-hero.jpg";
import smartHomeHeroImg from "@/assets/blog/smart-home-devices-hero.jpg";
import gamingMonitorsHeroImg from "@/assets/blog/gaming-monitors-hero.jpg";
import collegeTechHeroImg from "@/assets/blog/college-tech-hero.jpg";
import kidsTechHeroImg from "@/assets/blog/kids-tech-hero.jpg";
import techDefaultHeroImg from "@/assets/blog/tech-default-hero.jpg";

const staticBlogPosts = [
  {
    title: "🔥 Best Spring Tech Deals 2026",
    excerpt: "We've rounded up the best tech deals and discounts this spring — from smart home bundles to gaming gear, these prices can't be beat.",
    date: "2026-02-19",
    category: "Deals",
    imageUrl: springDealsHeroImg,
    slug: "st-patricks-day-tech-deals-2026",
    isGenerated: false,
    readTime: "8 min read",
  },
  {
    title: "The Ultimate Smart Ring Guide for 2026",
    excerpt: "Oura, Samsung Galaxy Ring, or Ultrahuman? We compare the top smart rings, breaking down sleep tracking accuracy, heart rate monitoring, sizing, and whether they're worth the investment.",
    date: "2026-02-02",
    category: "Health & Wellness",
    imageUrl: ouraRingHeroImg,
    slug: "smart-ring-guide-valentines-2026",
    isGenerated: false,
    readTime: "12 min read",
  },
  {
    title: "2026 Spring Gift Guide: Tech for Family Edition",
    excerpt: "Curated family tech picks that bring everyone together — devices that build connection, not clutter.",
    date: "2026-02-02",
    category: "Gift Guides",
    imageUrl: springDealsHeroImg,
    slug: "valentine-gift-guide-family-tech-2026",
    isGenerated: false,
    readTime: "10 min read",
  },
  {
    title: "Top 10 Smart Home Devices for 2025",
    excerpt: "Discover the latest smart home technology that will transform your living space into a connected, efficient haven. From security cameras to smart thermostats, we've tested the best devices.",
    date: "2025-01-14",
    category: "Home & Safety",
    imageUrl: smartHomeHeroImg,
    slug: "top-10-smart-home-devices-2025",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Best Gaming Monitors Under $500",
    excerpt: "We've tested dozens of gaming monitors to find the best value options for competitive and casual gamers alike. Get high refresh rates and stunning visuals without breaking the bank.",
    date: "2025-01-09",
    category: "Gaming",
    imageUrl: gamingMonitorsHeroImg,
    slug: "best-gaming-monitors-under-500",
    isGenerated: false,
    readTime: "11 min read",
  },
  {
    title: "Wireless Earbuds Comparison Guide",
    excerpt: "AirPods vs Galaxy Buds vs Nothing Ear—which wireless earbuds are right for you? We break down the pros, cons, sound quality, battery life, and value proposition.",
    date: "2025-01-04",
    category: "Connectivity",
    imageUrl: wirelessEarbudsHeroImg,
    slug: "wireless-earbuds-comparison-2025",
    isGenerated: false,
    readTime: "10 min read",
  },
  {
    title: "Tech Essentials for College Students",
    excerpt: "Starting college? Here's our comprehensive guide to the tech gear every student needs to succeed—from laptops and tablets to accessories that make campus life easier.",
    date: "2024-12-27",
    category: "College & School",
    imageUrl: collegeTechHeroImg,
    slug: "tech-essentials-college-students",
    isGenerated: false,
    readTime: "8 min read",
  },
  {
    title: "Best Fitness Trackers for Every Budget",
    excerpt: "From budget-friendly options to premium smartwatches, find the perfect fitness tracker for your health goals. We compare features, accuracy, battery life, and overall value.",
    date: "2024-12-19",
    category: "Health & Wellness",
    imageUrl: fitnessTrackersHeroImg,
    slug: "best-fitness-trackers-every-budget",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Educational Tech for Kids: Parent's Guide",
    excerpt: "Navigate the world of educational technology with our guide to age-appropriate learning devices and apps. Make informed choices that support your child's development.",
    date: "2024-12-14",
    category: "Kids Tech",
    imageUrl: kidsTechHeroImg,
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
    imageUrl: p.image_url || techDefaultHeroImg,
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
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Modern Tech Blog | Reviews, Deals & Buying Guides</title>
        <meta name="description" content="Expert tech reviews, buying guides and deals on smart home, gaming, wellness gear and more. Updated weekly." />
        <meta property="og:title" content="Modern Tech Blog | Reviews, Deals & Buying Guides" />
        <meta property="og:description" content="Expert tech reviews, buying guides and deals on smart home, gaming, wellness gear and more." />
        <meta property="og:image" content={springDealsHeroImg} />
        <meta property="og:url" content="https://moderntech.store/blog" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      {/* ── Hero Section ── */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-8 pt-28 pb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">Modern Tech Journal</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic tracking-tight leading-[1.08] max-w-3xl" style={{ fontWeight: 700, color: '#000000' }}>
            Insights, Reviews &<br />
            Buying Guides
          </h1>
          <p className="mt-6 font-mono text-xs text-muted-foreground max-w-lg leading-relaxed">
            Expert-tested tech recommendations to help you spend smarter and live better.
          </p>
        </div>

        {/* Search bar + Category pills */}
        <div className="max-w-5xl mx-auto px-8 pb-8 space-y-5">
          <div className="relative max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 h-11 bg-transparent border-border font-mono text-xs placeholder:text-muted-foreground/50 focus-visible:ring-foreground/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-mono text-[10px] tracking-[0.1em] uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-16 lg:py-20">
        {/* ── Featured Post (large hero card) ── */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-20">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-border hover:shadow-elegant transition-all duration-500">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {featuredPost.isGenerated && (
                  <Badge className="absolute top-4 left-4 bg-foreground text-background gap-1 text-[10px]">
                    <Sparkles className="h-3 w-3" /> AI Roundup
                  </Badge>
                )}
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground mb-5">
                  <span className="tracking-[0.2em] uppercase text-foreground/60">{featuredPost.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(featuredPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl lg:text-4xl italic leading-tight tracking-tight mb-5 group-hover:text-foreground/70 transition-colors" style={{ fontWeight: 700, color: '#000000' }}>
                  {featuredPost.title}
                </h2>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 self-start group-hover:border-foreground transition-colors">
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* ── AI Roundup Section ── */}
        {!isFiltering && dynamicMapped.length > 1 && (
          <section className="mb-20">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground flex items-center gap-2 whitespace-nowrap">
                <Sparkles className="h-3.5 w-3.5" />
                Weekly Deep-Dive
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
              {dynamicMapped.slice(1, 4).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter CTA ── */}
        {!isFiltering && (
          <section className="mb-20 border border-border bg-card">
            <div className="relative py-20 px-8 text-center">
              <div className="relative z-10">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6">Free Resource</p>
                <h3 className="font-serif text-3xl md:text-4xl mb-4" style={{ fontStyle: "italic", fontWeight: 400 }}>90-Day Amazon Associate Roadmap</h3>
                <p className="font-mono text-[11px] text-muted-foreground mb-10 max-w-md mx-auto leading-[1.8]">
                  Go from zero to your first affiliate commission — step-by-step checklist included.
                </p>
                <Button asChild className="px-10 h-12 bg-foreground text-background hover:bg-foreground/90 font-mono text-[10px] tracking-[0.2em] uppercase rounded-none">
                  <Link to="/free-roadmap">Download Free Roadmap <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ── All Articles Grid ── */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
              {isFiltering
                ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""}`
                : "All Articles"}
            </h2>
            <div className="h-px flex-1 bg-border" />
            {isFiltering && (
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground hover:underline whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>

          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
              <p className="font-serif text-xl italic text-foreground/70 mb-2">No articles found</p>
              <p className="font-mono text-[11px] text-muted-foreground mb-8">Try a different search term or category.</p>
              <Button
                variant="outline"
                className="rounded-none border-foreground/20 text-foreground hover:bg-foreground/5 font-mono text-[10px] tracking-[0.15em] uppercase"
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
  <Link to={`/blog/${post.slug}`} className="group block h-full border-r border-b border-border">
    <article className="overflow-hidden h-full flex flex-col hover:bg-card transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {post.isGenerated && (
          <Badge className="absolute top-3 right-3 bg-foreground text-background gap-1 text-[9px] font-mono rounded-none px-2">
            <Sparkles className="h-3 w-3" /> AI
          </Badge>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
          <span>{post.category}</span>
          <span className="ml-auto flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
        </div>
        <h3 className="font-serif text-xl leading-snug line-clamp-2 mb-3 group-hover:text-foreground/70 transition-colors" style={{ fontStyle: "italic", fontWeight: 700, color: '#000000' }}>
          {post.title}
        </h3>
        <p className="font-mono text-[10px] text-muted-foreground line-clamp-2 leading-[1.7] flex-1">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-5 group-hover:text-foreground transition-colors">
          Read more <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  </Link>
);

export default Blog;
