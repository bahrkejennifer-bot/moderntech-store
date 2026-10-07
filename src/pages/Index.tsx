import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowDown, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePinterestEvent } from "@/hooks/usePinterestTracking";
import { Button } from "@/components/ui/button";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import coverCanva from "@/assets/cover-canva.jpg";
import coverYoutube from "@/assets/cover-youtube.jpg";
import coverReels from "@/assets/cover-reels.jpg";
import GiftFinder from "@/components/home/GiftFinder";
import heroImg from "@/assets/hero-duality-editorial.jpg";
import SignalSignup from "@/components/home/SignalSignup";

import { selections, isEligible, type CatalogProduct, type Selection } from "@/lib/curatedSelections";

type Pick = { selection: Selection; product: CatalogProduct };

// Existing offer routes only. No homepage prices until the catalog/checkout price audit is complete.
const digitalOffers = [
  { slug: "creator-bundle", route: "/creator-bundle", cover: coverReels, included: "Reels, Canva, and YouTube creator guides together.", label: "THE COMPLETE SET" },
  { slug: "canva-masterclass", route: "/canva-masterclass", cover: coverCanva, included: "Branding guidance, layout ideas, and practical Canva design tips.", label: "DESIGN WITH INTENTION" },
  { slug: "faceless-youtube-automation", route: "/faceless-youtube", cover: coverYoutube, included: "Planning, video structure, branding, and channel growth guidance.", label: "MAKE YOUR NEXT MOVE" },
] as const;

const useSelections = () => useQuery({
  queryKey: ["homepage-curated-selections"],
  queryFn: async () => {
    const { data, error } = await supabase.from("scraped_products")
      .select("id,title,image_url,affiliate_link,is_active").in("id", selections.map((item) => item.id));
    if (error) throw error;
    const byId = new Map((data as CatalogProduct[]).filter(isEligible).map((item) => [item.id, item]));
    return selections.flatMap((selection) => {
      const product = byId.get(selection.id);
      return product ? [{ selection, product }] : [];
    });
  },
  staleTime: 5 * 60 * 1000,
});

const affiliateDisclosure = "As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. Amazon links may earn us a commission at no additional cost to you.";

const Index = () => {
  const { data: products = [], isLoading, isError } = useSelections();
  const { data: digitalProducts = [], isLoading: digitalLoading, isError: digitalError } = useQuery({
    queryKey: ["homepage-digital-offers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products_public").select("slug,title")
        .in("slug", digitalOffers.map((offer) => offer.slug));
      if (error) throw error;
      return digitalOffers.flatMap((offer) => {
        const product = data?.find((item) => item.slug === offer.slug);
        return product ? [{ offer, product }] : [];
      });
    },
    staleTime: 5 * 60 * 1000,
  });
  const { data: latestPost } = useQuery({
    queryKey: ["homepage-latest-signal-post"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("title,slug,excerpt,created_at")
        .eq("is_published", true).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
  const { trackEvent } = usePinterestEvent();
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const targetId = hash === "shop-downloads" ? "digital-products" : hash === "shop-tech" ? "selections" : hash;
    if (targetId && !isLoading && !digitalLoading) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
    }
  }, [isLoading, digitalLoading, location.hash, products]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    const nodes = document.querySelectorAll(".launch-reveal:not(.is-visible)");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isLoading, digitalLoading]);

  const trackClick = (selection: Selection, product: CatalogProduct) => {
    const params = new URLSearchParams(location.search);
    const campaign = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .filter((key) => params.has(key)).map((key) => [key, params.get(key)?.slice(0, 150) || ""]));
    trackEvent("custom", { event_type: "amazon_product_click", product_id: product.id, product_name: product.title, product_anchor: `product-${selection.slug}`, ...campaign });
  };

  const amazonButton = ({ selection, product }: Pick) => (
    <Button asChild size="lg" className="min-h-12 rounded-none px-7 text-xs font-medium uppercase tracking-[0.2em]">
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow sponsored" onClick={() => trackClick(selection, product)}>
        View on Amazon <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );

  const eyebrow = "text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground";
  const serif = { fontFamily: "var(--font-serif)" } as const;

  return (
    <div className="vogue-theme min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Modern Tech | The Art of Modern Tech</title>
        <meta name="description" content="Curated everyday tech and practical creator guides from Modern Tech LLC. Shop tech finds on Amazon and read The Signal, our weekly tech newsletter." />
        <meta property="og:title" content="Modern Tech | The Art of Modern Tech" />
        <meta property="og:description" content="Curated everyday tech and practical creator guides from Modern Tech LLC." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderntech.store/" />
      </Helmet>
      <StructuredData title="Modern Tech | The Art of Modern Tech" description="Curated everyday tech and practical creator guides from Modern Tech LLC." path="/" includeWebSite />
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 md:px-10">
          <Link to="/" className="shrink-0 text-xl text-foreground md:text-2xl" style={{ ...serif, fontStyle: "italic" }}>Modern Tech</Link>
          <nav aria-label="Main navigation" className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] sm:gap-5 md:gap-8">
            <a href="#gift-picks" className="hidden text-foreground/75 hover:text-foreground md:inline">Gifts</a>
            <a href="#digital-products" className="hidden text-foreground/75 hover:text-foreground sm:inline">Digital Products</a>
            <Link to="/the-signal" className="whitespace-nowrap text-foreground/75 hover:text-foreground">The Signal</Link>
            <Button asChild size="lg" className="min-h-11 rounded-none px-3 text-[11px] uppercase tracking-[0.18em] sm:px-5"><a href="#selections">Shop Tech Finds</a></Button>
          </nav>
        </div>
      </header>
      <main>
        <section className="relative py-10 md:py-16" aria-labelledby="hero-heading">
          <div className="grid grid-cols-1 items-center md:grid-cols-2">
            <div className="overflow-hidden"><img src={heroImg} alt="Editorial lifestyle photo: a woman descending a spiral staircase carrying tulips" className="h-auto max-h-[70vh] w-full object-cover" /></div>
            <div className="px-6 py-10 sm:px-12 md:px-16 md:py-0 lg:px-24">
              <h1 id="hero-heading" className="text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl" style={{ fontWeight: 400 }}><em>The Art of</em><br />Modern Tech</h1>
              <p className="mt-7 max-w-[420px] text-base leading-relaxed text-foreground/70 md:text-lg" style={{ ...serif, fontStyle: "italic" }}>A short, curated list of everyday tech — each with one clear benefit and one honest limitation.</p>
              <Button asChild size="lg" className="mt-8 min-h-12 rounded-none px-8 text-xs uppercase tracking-[0.2em]"><a href="#selections">Shop Tech Finds <ArrowDown aria-hidden="true" className="ml-2 h-4 w-4" /></a></Button>
              <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tech Today. Trend Tomorrow.</p>
            </div>
          </div>
        </section>

        <section id="selections" className="scroll-mt-20 border-t border-border px-5 py-16 md:px-10 md:py-24" aria-labelledby="selections-heading">
          <div className="mx-auto max-w-6xl">
            <div className="launch-reveal mb-8 text-center"><p className={eyebrow}>01 · Tech Finds</p><h2 id="selections-heading" className="mt-3 text-4xl md:text-5xl" style={{ fontStyle: "italic", fontWeight: 400 }}>The Shortlist</h2></div>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">{affiliateDisclosure}</p>
            {isLoading ? <p role="status" className="flex items-center justify-center gap-3 py-16"><Loader2 className="h-5 w-5 animate-spin" /> Loading selections…</p>
              : isError ? <p role="alert" className="py-16 text-center">The product selection is unavailable right now. Please try again later.</p>
              : products.length === 0 ? <p className="py-16 text-center">No eligible selections are available right now.</p>
              : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(({ selection, product }) => <article id={`product-${selection.slug}`} key={selection.id} className="launch-reveal flex scroll-mt-24 flex-col bg-card p-5 md:p-6">
                  <div className="flex aspect-square items-center justify-center overflow-hidden bg-background p-6"><img src={product.image_url || ""} alt={product.title} loading="lazy" className="h-full w-full object-contain" /></div>
                  <p className={`${eyebrow} mt-5`}>{selection.audience}</p>
                  <h3 className="mt-2 text-xl leading-snug" style={{ fontStyle: "italic" }}>{product.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed">{selection.benefit}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="font-medium text-foreground">Good to know:</strong> {selection.limitation}</p>
                  <div className="mt-5">{amazonButton({ selection, product })}</div>
                </article>)}
              </div>}
          </div>
        </section>

        {products.length > 0 && <section id="gift-picks" className="scroll-mt-20 border-t border-border bg-secondary/60 px-5 py-16 md:px-10 md:py-24" aria-labelledby="gift-heading">
          <div className="mx-auto max-w-6xl">
            <div className="launch-reveal mb-8 max-w-3xl"><p className={eyebrow}>02 · Gift Finder</p><h2 id="gift-heading" className="mt-3 text-4xl md:text-5xl" style={{ fontStyle: "italic", fontWeight: 400 }}>Easy to give. Useful every day.</h2></div>
            <GiftFinder disclosure={affiliateDisclosure}
              picks={products.map(({ selection, product }) => ({ slug: selection.slug, title: product.title, imageUrl: product.image_url, audience: selection.audience, benefit: selection.benefit, limitation: selection.limitation }))}
              renderCta={(slug) => { const pick = products.find((p) => p.selection.slug === slug); return pick ? amazonButton(pick) : null; }} />
          </div>
        </section>}

        <section id="digital-products" className="scroll-mt-20 border-t border-border px-5 py-16 md:px-10 md:py-24" aria-labelledby="digital-heading">
          <div className="mx-auto max-w-6xl">
            <div className="launch-reveal mb-10 text-center"><p className={eyebrow}>03 · Digital Products</p><h2 id="digital-heading" className="mt-3 text-3xl md:text-4xl" style={{ fontStyle: "italic", fontWeight: 400 }}>Ideas, ready to use.</h2></div>
            {digitalLoading ? <p role="status" className="flex items-center justify-center gap-3 py-12"><Loader2 className="h-5 w-5 animate-spin" /> Loading digital products…</p>
              : digitalError ? <p role="alert" className="py-12 text-center">Digital products are unavailable right now. Please try again later.</p>
              : digitalProducts.length === 0 ? <p className="py-12 text-center">No digital products are available right now.</p>
              : <div className="grid gap-6 md:grid-cols-3">
                {digitalProducts.map(({ offer, product }) => <article key={offer.slug} id={`digital-${offer.slug}`} className="launch-reveal flex scroll-mt-24 flex-col border border-border">
                  <div className="flex h-52 items-center justify-center overflow-hidden bg-card p-6">
                    {offer.slug === "creator-bundle" ? <div className="grid h-full max-w-full grid-cols-3 gap-1" aria-label="Reels, Canva and YouTube guide covers">{[coverReels, coverCanva, coverYoutube].map((cover, index) => <img key={cover} src={cover} alt={["Reels guide cover", "Canva guide cover", "YouTube guide cover"][index]} loading="lazy" className="h-full min-w-0 object-contain" />)}</div>
                      : <img src={offer.cover} alt={`${product.title} cover`} loading="lazy" className="h-full max-w-full object-contain" />}
                  </div>
                  <div className="flex flex-1 flex-col p-6"><p className={eyebrow}>{offer.label}</p><h3 className="mt-3 text-2xl leading-tight" style={{ fontStyle: "italic" }}>{product.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.included}</p><Button asChild variant="outline" size="lg" className="mt-6 min-h-12 rounded-none text-xs uppercase tracking-[0.2em]"><Link to={`${offer.route}${location.search}`}>View digital guide <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link></Button></div>
                </article>)}
              </div>}
            <p className="mt-8 text-center text-sm text-muted-foreground">Looking for a starting point? <Link to="/creator-funnel" className="font-medium text-foreground underline underline-offset-4">Explore the free Reels guide.</Link></p>
          </div>
        </section>

        <section id="the-signal" className="scroll-mt-20 border-t border-border bg-card px-5 py-14 md:px-10 md:py-20" aria-labelledby="signal-heading">
          <div className="launch-reveal mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-2 md:gap-14">
            <div><p className={eyebrow}>04 · The Signal · Weekly Newsletter</p><h2 id="signal-heading" className="mt-3 text-3xl md:text-4xl" style={{ fontStyle: "italic", fontWeight: 400 }}>Read this week's Signal.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">Our weekly newsletter: a few useful tech picks and plain-language notes. Free to read online.</p>
              {latestPost && <p className="mt-4 text-sm text-muted-foreground">Latest article: <Link to={`/the-signal/${latestPost.slug}`} className="text-foreground underline underline-offset-4">{latestPost.title}</Link></p>}
              <Button asChild size="lg" className="mt-6 min-h-12 rounded-none px-6 text-xs uppercase tracking-[0.2em]"><Link to="/the-signal">Read The Signal <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <div><h3 className="mb-4 text-lg" style={{ fontStyle: "italic" }}>Get The Signal by email</h3><SignalSignup /></div>
          </div>
        </section>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default Index;
