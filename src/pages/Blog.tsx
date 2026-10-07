import { Helmet } from "react-helmet-async";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SignalHeader from "@/components/SignalHeader";
import AffiliateFooter from "@/components/AffiliateFooter";
import SignalSignup from "@/components/home/SignalSignup";
import { supabase } from "@/integrations/supabase/client";
import ouraRingHeroImg from "@/assets/heroes/oura-ring-hero.jpg";
import fitnessTrackersHeroImg from "@/assets/blog/fitness-trackers-hero.jpg";
import springDealsHeroImg from "@/assets/blog/spring-deals-hero.jpg";
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
    category: "Health & Wellness Tech",
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
    category: "Smart Home & Security",
    imageUrl: smartHomeHeroImg,
    slug: "top-10-smart-home-devices-2025",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Best Gaming Monitors Under $500",
    excerpt: "We've tested dozens of gaming monitors to find the best value options for competitive and casual gamers alike. Get high refresh rates and stunning visuals without breaking the bank.",
    date: "2025-01-09",
    category: "Office Essentials",
    imageUrl: gamingMonitorsHeroImg,
    slug: "best-gaming-monitors-under-500",
    isGenerated: false,
    readTime: "11 min read",
  },
  {
    title: "Wireless Earbuds Comparison Guide",
    excerpt: "AirPods vs Galaxy Buds vs Nothing Ear—which wireless earbuds are right for you? We break down the pros, cons, sound quality, battery life, and value proposition.",
    date: "2025-01-04",
    category: "Office Essentials",
    imageUrl: wirelessEarbudsHeroImg,
    slug: "wireless-earbuds-comparison-2025",
    isGenerated: false,
    readTime: "10 min read",
  },
  {
    title: "Tech Essentials for College Students",
    excerpt: "Starting college? Here's our comprehensive guide to the tech gear every student needs to succeed—from laptops and tablets to accessories that make campus life easier.",
    date: "2024-12-27",
    category: "Kids & STEM",
    imageUrl: collegeTechHeroImg,
    slug: "tech-essentials-college-students",
    isGenerated: false,
    readTime: "8 min read",
  },
  {
    title: "Best Fitness Trackers for Every Budget",
    excerpt: "From budget-friendly options to premium smartwatches, find the perfect fitness tracker for your health goals. We compare features, accuracy, battery life, and overall value.",
    date: "2024-12-19",
    category: "Health & Wellness Tech",
    imageUrl: fitnessTrackersHeroImg,
    slug: "best-fitness-trackers-every-budget",
    isGenerated: false,
    readTime: "9 min read",
  },
  {
    title: "Educational Tech for Kids: Parent's Guide",
    excerpt: "Navigate the world of educational technology with our guide to age-appropriate learning devices and apps. Make informed choices that support your child's development.",
    date: "2024-12-14",
    category: "Kids & STEM",
    imageUrl: kidsTechHeroImg,
    slug: "educational-tech-kids-parents-guide",
    isGenerated: false,
    readTime: "7 min read",
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

  const dynamicMapped = (dynamicPosts || []).map((p) => ({
    title: p.title,
    excerpt: p.excerpt || "",
    date: p.created_at,
    category: !p.category || /weekly edit/i.test(p.category) ? "THE SIGNAL" : p.category,
    imageUrl: p.image_url && !/images\.unsplash\.com/i.test(p.image_url) ? p.image_url : "",
    slug: p.slug,
    isGenerated: true,
    readTime: "5 min read",
  }));

  const allPosts = [...dynamicMapped, ...staticBlogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const latest = allPosts[0];
  const previous = allPosts.slice(1);
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  // Label honestly: a monthly roundup is not called a weekly issue.
  const latestKind = latest && /month|roundup/i.test(latest.title) ? "Monthly roundup" : "Latest edition";

  return (
    <div className="launch-theme min-h-screen bg-background text-foreground">
      <Helmet>
        <title>The Signal — Weekly tech, explained simply | Modern Tech</title>
        <meta name="description" content="The Signal is Modern Tech's weekly blog: honest, plain-language notes on everyday tech worth knowing about. Free to read — email is optional." />
        <meta property="og:title" content="The Signal — Weekly tech, explained simply" />
        <meta property="og:description" content="Modern Tech's weekly blog on everyday tech. Free to read; get it by email if you like." />
        <meta property="og:url" content="https://moderntech.store/the-signal" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://moderntech.store/the-signal" />
      </Helmet>
      <StructuredData
        title="The Signal — Weekly tech, explained simply"
        description="Modern Tech's weekly blog on everyday tech."
        path="/the-signal"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "The Signal", path: "/the-signal" },
        ]}
        extraGraph={[
          {
            "@type": "Blog",
            "@id": "https://moderntech.store/the-signal#blog",
            name: "The Signal",
            url: "https://moderntech.store/the-signal",
            publisher: { "@id": "https://moderntech.store/#organization" },
          },
        ]}
      />
      <SignalHeader />

      <main className="mx-auto max-w-3xl px-5 pb-24">
        <header className="pt-14 pb-10 md:pt-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Modern Tech's weekly blog</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">The Signal</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Each week, a short, honest read on everyday tech worth knowing about — what's new, what's useful, and what to skip. Free to read here.
          </p>
        </header>

        {latest && (
          <section aria-labelledby="latest-heading" className="border-t border-border pt-10">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{latestKind}</span> · <time dateTime={latest.date}>{fmt(latest.date)}</time>
            </p>
            <h2 id="latest-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              <Link to={`/the-signal/${latest.slug}`} className="hover:underline underline-offset-4">{latest.title}</Link>
            </h2>
            {latest.imageUrl && (
              <img src={latest.imageUrl} alt="" className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" loading="eager" />
            )}
            {latest.excerpt && <p className="mt-6 text-lg leading-relaxed text-foreground/85">{latest.excerpt}</p>}
            <Link
              to={`/the-signal/${latest.slug}`}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 text-base font-medium text-background hover:opacity-90"
            >
              Read the full edition <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        )}

        {previous.length > 0 && (
          <section aria-labelledby="previous-heading" className="mt-16 border-t border-border pt-10">
            <h2 id="previous-heading" className="text-xl font-semibold tracking-tight">Previous editions</h2>
            <ul className="mt-4 divide-y divide-border">
              {previous.map((post) => (
                <li key={post.slug}>
                  <Link to={`/the-signal/${post.slug}`} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                    <time dateTime={post.date} className="shrink-0 text-sm text-muted-foreground sm:w-36">{fmt(post.date)}</time>
                    <span className="text-base font-medium leading-snug group-hover:underline underline-offset-4">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="email-heading" className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 id="email-heading" className="text-xl font-semibold tracking-tight">Get The Signal by email</h2>
          <p className="mt-2 mb-5 text-base text-muted-foreground">Optional. Everything above stays free to read here. Unsubscribe anytime.</p>
          <SignalSignup />
        </section>
      </main>

      <AffiliateFooter />
    </div>
  );
};

export default Blog;
