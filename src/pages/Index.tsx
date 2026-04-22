import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-duality-editorial.jpg";
import essentialsImg from "@/assets/hero-workspace-essentials.jpg";

interface DBProduct {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  rating: number | null;
  badge: string | null;
  image_url: string | null;
  affiliate_link: string;
  category: string | null;
  display_order: number | null;
}

const categories = [
  { label: "Smart Home & Security", to: "/smart-home-security", desc: "Smart locks · Cameras · WiFi · Trackers" },
  { label: "Health & Wellness Tech", to: "/health-wellness-tech", desc: "Smart rings · Sleep trackers · Recovery" },
  { label: "Office Essentials", to: "/office-essentials", desc: "Creator gear · Gaming · Streaming" },
  { label: "Kids & STEM", to: "/kids-stem", desc: "Kids tech · College · AI gadgets" },
];

// Ebook cover images from Supabase Storage
const COVER_REELS = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-reels.jpg";
const COVER_CANVA = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-canva.jpg";
const COVER_YOUTUBE = "https://hvjhtfyxecnuehndnyrd.supabase.co/storage/v1/object/public/product-images/cover-youtube.jpg";

const useHomepageProducts = () => {
  return useQuery({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scraped_products")
        .select("*")
        .in("category", ["homepage-featured", "homepage-collection", "health-wellness", "creator-gear", "gaming", "connectivity", "college", "kids-tech", "home-safety"])
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as unknown as DBProduct[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

const Index = () => {
  const { data: allProducts, isLoading } = useHomepageProducts();

  const featuredProducts = (allProducts || []).filter(p => p.category === "homepage-featured").slice(0, 3);
  const collectionProducts = (allProducts || []).filter(p => p.category === "homepage-collection").slice(0, 6);

  // Fallback: if no homepage-specific categories, show a mix from all categories
  const fallbackFeatured = featuredProducts.length > 0 ? featuredProducts : (allProducts || []).slice(0, 3);
  const fallbackCollection = collectionProducts.length > 0 ? collectionProducts : (allProducts || []).slice(3, 9);

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Modern Tech — Curated Premium Technology for 2026</title>
        <meta name="description" content="A curated gallery of premium tech — wellness wearables, creator tools, and office essentials. Handpicked with editorial precision." />
        <meta property="og:title" content="Modern Tech — Curated Premium Technology for 2026" />
        <meta property="og:description" content="A curated gallery of premium tech — wellness wearables, creator tools, and office essentials. Handpicked with editorial precision." />
        <meta property="og:image" content="https://moderntech.store/images/products/oura-ring-4.jpg" />
        <meta property="og:url" content="https://moderntech.store/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />

      {/* ── HERO — asymmetric editorial layout ── */}
      <section className="relative py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="overflow-hidden">
            <img
              src={heroImg}
              alt="Editorial lifestyle — woman descending spiral staircase with tulips"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '70vh' }}
            />
          </div>
          <div className="px-12 md:px-16 lg:px-24 xl:px-32 py-12 md:py-0">
            <h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-foreground"
              style={{ fontWeight: 400 }}
            >
              <em>The Art of</em>
              <br />
              Modern Tech
            </h1>
            <h2
              className="font-serif text-base md:text-lg leading-relaxed mt-8 max-w-[420px] text-foreground/70"
              style={{ fontStyle: 'italic', fontWeight: 400 }}
            >
              Beyond the screen lies the human experience. We curate beautiful, reliable technology designed for the way you actually live—from securing your home to the seamless flow of a day well-lived.
            </h2>
            <p
              className="font-mono text-[10px] mt-8 text-muted-foreground"
              style={{ letterSpacing: '0.25em', textTransform: 'uppercase' }}
            >
              Tech Today. Trend Tomorrow.<br />
              Creating a Life We Have Yet to Imagine.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE ESSENTIALS — zigzag section ── */}
      <section className="relative py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="px-12 md:px-16 lg:px-24 xl:px-32 py-12 md:py-0 order-2 md:order-1">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-10">
              The Essentials
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-serif text-lg tracking-tight hover:opacity-60 transition-opacity duration-300"
              style={{ fontStyle: "italic" }}
            >
              View Latest Weekly Report <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden order-1 md:order-2">
            <img
              src={essentialsImg}
              alt="Top-down workspace with smart ring, laptop, headphones, and tulips"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '65vh' }}
            />
          </div>
        </div>
      </section>

      {/* ── MARQUEE DIVIDER ── */}
      <div className="overflow-hidden py-4 bg-foreground">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-center text-background">
          Fresh Off The Press · Curated Selection · Spring 2026 · Fresh Off The Press · Curated Selection
        </p>
      </div>

      {/* ── FEATURED 3 — database-driven ── */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
            {fallbackFeatured.map((product) => (
              <a
                key={product.id}
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group border-r last:border-r-0 border-border"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8">
                    {product.description && (
                      <p className="font-mono text-xs text-background/80 text-center mb-6 line-clamp-3">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="font-mono text-lg font-medium text-background mb-6">{product.price}</p>
                    )}
                    <span className="inline-flex items-center gap-2 h-10 px-6 border border-background/30 text-background font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300">
                      View Details <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{product.badge || product.category}</span>
                  <h3 className="font-serif text-xl mt-1" style={{ fontStyle: "italic" }}>{product.title}</h3>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground text-center mt-6">
          As an Amazon Associate, I earn from qualifying purchases
        </p>
      </section>

      {/* ── FULL-WIDTH STATEMENT ── */}
      <section className="border-y border-border py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6">You Know You're Meant For More</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
            Ready to Upgrade<br />
            to <em>Premium Tech?</em>
          </h2>
        </div>
      </section>

      {/* ── PRODUCT GRID — database-driven ── */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="flex items-center gap-6 mb-14">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
            The Collection
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {fallbackCollection.map((product) => (
              <a
                key={product.id}
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group border-b border-r border-border last:border-r-0 [&:nth-child(3n)]:border-r-0"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-5">
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground bg-background/80 px-2.5 py-1">
                      {product.badge || product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                    {product.description && (
                      <p className="font-mono text-xs text-background/80 text-center mb-4 line-clamp-3">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="font-mono text-lg font-medium text-background mb-6">{product.price}</p>
                    )}
                    <span className="inline-flex items-center gap-2 h-10 px-6 border border-background/30 text-background font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300">
                      View Details <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg" style={{ fontStyle: "italic" }}>{product.title}</h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── DIGITAL PRODUCTS ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <p className="font-mono text-[9px] text-muted-foreground text-center tracking-[0.4em] uppercase mb-4">
            Digital Products
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-3" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Learn the Skills to Grow Online
          </h2>
          <p className="font-mono text-[10px] text-muted-foreground text-center tracking-wide mb-12 max-w-lg mx-auto">
            Practical digital guides to help you create better content, build your brand, and grow with confidence.
          </p>

          {/* Featured Bundle */}
          <div className="p-8 md:p-10 mb-12 text-center bg-foreground text-background">
            <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 mb-4 bg-accent text-accent-foreground">
              Best Value
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mb-2" style={{ fontWeight: 400 }}>
              Get All 3 Master Classes for Just $59
            </h3>
            <p className="font-mono text-[11px] mb-6 max-w-md mx-auto text-background/60">
              Save $19 when you bundle all three and get the full content creator toolkit.
            </p>
            <Link
              to="/creator-bundle"
              className="inline-flex items-center gap-2 h-12 px-10 font-mono text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-90 bg-accent text-accent-foreground"
            >
              Get the Bundle <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Individual Guides */}
          <p className="font-mono text-[9px] text-muted-foreground text-center tracking-[0.3em] uppercase mb-8">
            Choose Your Master Class
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { cover: COVER_REELS, title: "Reels Master Class", desc: "Learn how to create attention-grabbing reels that stop the scroll and help people notice your brand.", price: "FREE", to: "/creator-funnel", cta: "Get the Free Guide" },
              { cover: COVER_CANVA, title: "Canva Master Class", desc: "Create polished graphics, digital products, and branded content in Canva without feeling overwhelmed.", price: "$29", to: "/canva-masterclass", cta: "Buy for $29" },
              { cover: COVER_YOUTUBE, title: "YouTube Master Class", desc: "Build smarter YouTube content with practical strategies for video structure, branding, and audience growth.", price: "$49", to: "/faceless-youtube", cta: "Buy for $49" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="group flex flex-col overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={item.cover} alt={`${item.title} cover`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-8 text-center flex flex-col items-center">
                  <h3 className="font-serif text-xl mb-2" style={{ fontStyle: "italic" }}>{item.title}</h3>
                  <p className="font-mono text-[10px] text-muted-foreground tracking-wide leading-relaxed mb-6 max-w-[240px]">
                    {item.desc}
                  </p>
                  <span className="font-mono text-lg font-medium mb-4">{item.price}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.cta} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/digital-products"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Shop Digital Products <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES — editorial grid ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-4" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Explore by Category
          </h2>
          <p className="font-mono text-[9px] text-muted-foreground text-center tracking-[0.3em] uppercase mb-16">
            Curated collections for every facet of modern life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group border-b border-r border-border p-10 hover:bg-card transition-colors duration-300 [&:nth-child(3n)]:border-r-0"
              >
                <h3 className="font-serif text-2xl mb-3 group-hover:translate-x-1 transition-transform duration-300" style={{ fontStyle: "italic" }}>
                  {cat.label}
                </h3>
                <p className="font-mono text-[10px] text-muted-foreground tracking-wide leading-relaxed">
                  {cat.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground mt-6 transition-colors">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
