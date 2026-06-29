import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, ArrowLeft, Clock, ChevronUp, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import JsonLdValidator from "@/components/JsonLdValidator";
import { getBlogPostExtraSchemas, buildBlogProductSchemas, buildBlogProductCrossRefs } from "@/lib/blogPostSchemas";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

import { blogPostsData, techDefaultHeroImg, findProductImage, ContentSection, BlogProduct } from "@/data/blogPostsData";
import { rewriteAmazonLinks, parseMarkdownBold } from "@/lib/blogHelpers";
import ProductCard from "@/components/blog/ProductCard";
import DownloadCTA from "@/components/blog/DownloadCTA";
import AffiliateDisclosure from "@/components/blog/AffiliateDisclosure";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug && blogPostsData[slug] ? blogPostsData[slug] : null;

  const { data: dynamicPost, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !post && !!slug,
  });

  // Reading progress
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Build TOC from sections
  const tocEntries = useMemo(() => {
    if (!post) return [];
    return post.sections
      .map((s, i) => {
        if (s.type === 'heading' || s.type === 'subheading') {
          const id = `section-${i}`;
          return { id, title: s.content || '', level: s.type === 'heading' ? 2 : 3 };
        }
        return null;
      })
      .filter(Boolean) as { id: string; title: string; level: number }[];
  }, [post]);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      const winH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = winH > 0 ? (window.scrollY / winH) * 100 : 0;
      setProgress(Math.min(pct, 100));
      setShowScrollTop(window.scrollY > 600);

      // Find active section
      const headings = tocEntries.map(e => document.getElementById(e.id)).filter(Boolean) as HTMLElement[];
      let current = "";
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= 120) {
          current = el.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tocEntries]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const renderSection = (section: ContentSection, index: number) => {
    const sectionId = `section-${index}`;
    switch (section.type) {
      case 'heading':
        return (
          <div key={index} id={sectionId} className="mt-16 mb-6 scroll-mt-28">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-foreground/15 rounded-full" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">Section {Math.ceil((index + 1) / 3)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
              {section.content}
            </h2>
          </div>
        );
      case 'subheading':
        return (
          <h3 key={index} id={sectionId} className="text-xl font-semibold mt-10 mb-4 text-foreground tracking-tight border-l-2 border-foreground/15 pl-4 scroll-mt-28">
            {section.content}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={index} className="text-muted-foreground leading-[1.85] mb-6 text-[15px]">
            {parseMarkdownBold(section.content || '')}
          </p>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-3 mb-8 ml-1 pl-4 border-l border-border">
            {section.items?.map((item, i) => (
              <li key={i} className="text-muted-foreground leading-[1.8] flex gap-3 text-[15px]">
                <span className="text-foreground/30 mt-1 shrink-0 text-xs">▸</span>
                <span>{parseMarkdownBold(item)}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  // ── Dynamic (AI-generated) post ──
  if (!post && dynamicPost) {
    const ogImage = dynamicPost.image_url || techDefaultHeroImg;
    const ogTitle = dynamicPost.title;
    const ogDesc = dynamicPost.excerpt || `${dynamicPost.title} — Read on Modern Tech LLC`;
    // SEO: derive plain-text body, word count, and keyword list for richer BlogPosting schema
    const plainBody = (dynamicPost.content_html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = plainBody ? plainBody.split(" ").length : undefined;
    const articleBodyExcerpt = plainBody.slice(0, 500);
    const keywordList = [
      dynamicPost.category || "Tech",
      "Modern Tech LLC",
      ...dynamicPost.title.toLowerCase().split(/[^a-z0-9]+/i).filter((w: string) => w.length > 3).slice(0, 6),
    ].join(", ");
    return (
      <div className="min-h-screen vogue-theme bg-background text-foreground">
        <Helmet>
          <title>{ogTitle} | Modern Tech LLC</title>
          <meta name="description" content={ogDesc} />
          <meta property="og:title" content={ogTitle} />
          <meta property="og:description" content={ogDesc} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={`https://moderntech.store/blog/${slug}`} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={ogTitle} />
          <meta name="twitter:description" content={ogDesc} />
          <meta name="twitter:image" content={ogImage} />
          <meta property="pin:media" content={ogImage} />
          <meta property="pin:description" content={ogDesc} />
          <link rel="canonical" href={`https://moderntech.store/blog/${slug}`} />
        </Helmet>
        <StructuredData
          title={ogTitle}
          description={ogDesc}
          path={`/blog/${slug}`}
          includeWebSite
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: dynamicPost.title, path: `/blog/${slug}` },
          ]}
          extraGraph={[
            {
              "@type": "BlogPosting",
              "@id": `https://moderntech.store/blog/${slug}#blogposting`,
              headline: ogTitle,
              description: ogDesc,
              image: [ogImage],
              datePublished: dynamicPost.created_at,
              dateModified: dynamicPost.updated_at || dynamicPost.created_at,
              articleSection: dynamicPost.category || "Tech",
              articleBody: articleBodyExcerpt,
              ...(wordCount ? { wordCount } : {}),
              keywords: keywordList,
              inLanguage: "en-US",
              author: {
                "@type": "Organization",
                name: "Modern Tech LLC",
                url: "https://moderntech.store",
              },
              publisher: { "@id": "https://moderntech.store/#organization" },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://moderntech.store/blog/${slug}#webpage`,
              },
              url: `https://moderntech.store/blog/${slug}`,
              // Explicit @graph cross-references to each Product node below
              ...(buildBlogProductCrossRefs(slug || "", dynamicPost.products as any) || {}),
            },
            ...getBlogPostExtraSchemas(slug || ""),
            ...buildBlogProductSchemas(slug || "", dynamicPost.products as any),
          ]}
        />
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
          <div
           className="h-full bg-foreground transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Navigation />

        {/* Nav separator */}
        <div className="border-b border-border/40" />

        {/* Centered magazine column */}
        <div className="max-w-[800px] mx-auto px-6 pt-12 pb-20">
          {/* Featured Hero Image */}
          {dynamicPost.image_url && (
            <div className="rounded-lg overflow-hidden mb-10">
              <div className="aspect-[3/2] w-full">
                <img
                  src={dynamicPost.image_url}
                  alt={dynamicPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Category + Meta row */}
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-6 flex-wrap">
            <span className="font-semibold uppercase tracking-[0.15em] text-primary">{dynamicPost.category || "Tech Roundup"}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(dynamicPost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>

          {/* Centered Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.12] mb-6 text-foreground text-center">
            {dynamicPost.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center text-foreground text-[10px] font-bold">MT</div>
            <span className="text-sm text-muted-foreground">by <span className="text-foreground font-medium">Modern Tech LLC</span></span>
          </div>

          <article>
            {/* Product Cards Grid */}
            {dynamicPost.products && Array.isArray(dynamicPost.products) && (dynamicPost.products as any[]).length > 0 && (
              <section className="mb-14">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">Featured Products</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(dynamicPost.products as any[]).map((p: any, i: number) => (
                    <ProductCard key={i} product={{ title: p.title, description: p.niche || "Tech", badge: i === 0 ? "Top Pick" : undefined, rating: 4.7, imageUrl: findProductImage(p.title), affiliateLink: p.affiliate_link }} />
                  ))}
                </div>
              </section>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-p:text-muted-foreground prose-p:leading-[1.85] prose-img:hidden"
              dangerouslySetInnerHTML={{ __html: rewriteAmazonLinks(dynamicPost.content_html) }}
            />

            <DownloadCTA />
            <AffiliateDisclosure />

            {/* Back to Blog footer */}
            <div className="mt-16 pt-8 border-t border-border text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </div>
          </article>
        </div>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        )}

        <AffiliateFooter />
        <JsonLdValidator />
      </div>
    );
  }

  // ── Loading ──
  if (!post && isLoading) {
    return (
      <div className="min-h-screen vogue-theme bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded mx-auto" />
            <div className="h-4 w-72 bg-muted rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (!post && !dynamicPost) {
    return (
      <div className="min-h-screen vogue-theme bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Post Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild variant="cta" className="rounded-full px-8">
            <Link to="/blog">Browse All Articles</Link>
          </Button>
        </div>
        <AffiliateFooter />
      </div>
    );
  }

  // ── Static Post ──
  const SITE = "https://moderntech.store";
  const staticOgImage = post!.imageUrl.startsWith("http") ? post!.imageUrl : `${SITE}${post!.imageUrl}`;
  const staticOgDesc = post!.intro.slice(0, 155) + "…";
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>{post!.title} | Modern Tech LLC</title>
        <meta name="description" content={staticOgDesc} />
        <meta property="og:title" content={post!.title} />
        <meta property="og:description" content={staticOgDesc} />
        <meta property="og:image" content={staticOgImage} />
        <meta property="og:url" content={`${SITE}/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post!.title} />
        <meta name="twitter:description" content={staticOgDesc} />
        <meta name="twitter:image" content={staticOgImage} />
        <meta property="pin:media" content={staticOgImage} />
        <meta property="pin:description" content={staticOgDesc} />
        <link rel="canonical" href={`${SITE}/blog/${slug}`} />
      </Helmet>
      <StructuredData
        title={post!.title}
        description={staticOgDesc}
        path={`/blog/${slug}`}
        includeWebSite
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post!.title, path: `/blog/${slug}` },
        ]}
        extraGraph={[
          {
            "@type": "BlogPosting",
            "@id": `${SITE}/blog/${slug}#blogposting`,
            headline: post!.title,
            description: staticOgDesc,
            image: staticOgImage,
            datePublished: new Date(post!.date).toISOString(),
            dateModified: new Date(post!.date).toISOString(),
            articleSection: (post as any)!.category || "Tech",
            author: {
              "@type": "Organization",
              name: "Modern Tech LLC",
              url: SITE,
            },
            publisher: { "@id": `${SITE}/#organization` },
            mainEntityOfPage: { "@id": `${SITE}/blog/${slug}#webpage` },
            url: `${SITE}/blog/${slug}`,
          },
          ...getBlogPostExtraSchemas(slug || ""),
        ]}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full bg-foreground transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navigation />

      {/* Nav separator */}
      <div className="border-b border-border/40" />

      {/* Centered magazine column */}
      <div className="max-w-[800px] mx-auto px-6 pt-12 pb-20">
        {/* Featured Hero Image — above title, 3:2 aspect ratio */}
        <div className="rounded-lg overflow-hidden mb-10">
          <div className="aspect-[3/2] w-full">
            <img
              src={post!.imageUrl}
              alt={post!.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Category + Meta row */}
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-6 flex-wrap">
          <span className="font-semibold uppercase tracking-[0.15em] text-primary">{post!.category}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post!.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 8 min read</span>
        </div>

        {/* Centered Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.12] mb-6 text-foreground text-center">
          {post!.title}
        </h1>

        {/* Author */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center text-foreground text-[10px] font-bold">MT</div>
          <span className="text-sm text-muted-foreground">by <span className="text-foreground font-medium">Modern Tech LLC</span></span>
        </div>

        {/* Intro */}
        <p className="text-lg text-muted-foreground leading-[1.85] mb-12 border-l-2 border-primary/30 pl-6 italic">
          {post!.intro}
        </p>

        <article>
          {/* TOC inline (for smaller screens) */}
          {tocEntries.length > 0 && (
            <nav className="mb-14 p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <List className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">Table of Contents</span>
              </div>
              <ul className="space-y-1.5">
                {tocEntries.map((entry) => (
                  <li key={entry.id}>
                    <button
                      onClick={() => scrollToSection(entry.id)}
                      className={`w-full text-left text-sm leading-snug py-1 transition-colors ${
                        entry.level === 3 ? 'pl-5' : 'pl-0'
                      } ${
                        activeId === entry.id
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {entry.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Products Section */}
          {post!.products.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
                  Featured Products
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {post!.products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Article Body */}
          <div className="mb-14">
            {post!.sections.map((section, index) => renderSection(section, index))}
          </div>

          <DownloadCTA />
          <AffiliateDisclosure />

          {/* Back to Blog footer */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>
        </article>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <AffiliateFooter />
      <JsonLdValidator />
    </div>
  );
};

export default BlogPost;
