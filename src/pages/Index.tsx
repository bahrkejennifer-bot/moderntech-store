import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
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
import GiftRail from "@/components/home/GiftRail";
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
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { trackEvent } = usePinterestEvent();
  const location = useLocation();
  const featured = products.slice(0, 3);
  const active = featured[featuredIndex] ?? featured[0];

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const targetId = hash === "shop-downloads" ? "digital-products" : hash === "shop-tech" ? "selections" : hash;
    const featuredTarget = featured.findIndex(({ selection }) => targetId === `product-${selection.slug}`);
    if (featuredTarget !== -1 && featuredTarget !== featuredIndex) {
      setFeaturedIndex(featuredTarget);
      return;
    }
    if (targetId && !isLoading && !digitalLoading) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
    }
  }, [isLoading, digitalLoading, location.hash, featuredIndex, products]);

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
    <Button asChild size="lg" className="min-h-12 rounded-full px-7 text-base">
      <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow sponsored" onClick={() => trackClick(selection, product)}>
        View on Amazon <ExternalLink aria-hidden="true" className="ml-1 h-4 w-4" />
      </a>
    </Button>
  );

  return (
    <div className="launch-theme min-h-screen bg-background text-foreground [&_footer_p]:!text-base [&_footer_a]:!text-base">
      <Helmet>
        <title>Modern Tech | Everyday tech. Beautifully simple.</title>
        <meta name="description" content="Considered everyday tech and practical creator guides from Modern Tech LLC." />
        <meta property="og:title" content="Modern Tech | Everyday tech. Beautifully simple." />
        <meta property="og:description" content="Explore useful tech and practical digital guides from Modern Tech LLC." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderntech.store/" />
      </Helmet>
      <StructuredData title="Modern Tech | Everyday tech. Beautifully simple." description="Explore useful tech and practical digital guides from Modern Tech LLC." path="/" includeWebSite />
      <header className="launch-nav sticky top-0 z-50 border-b border-border/30 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-5 md:h-20 md:px-9">
          <Link to="/" className="shrink-0 text-base font-semibold text-foreground sm:text-lg md:text-xl">MODERN TECH<span className="ml-1 text-accent">.</span></Link>
          <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium sm:gap-3 md:gap-8 md:text-base">
            <a href="#gift-picks" className="hidden text-foreground/80 hover:text-foreground md:inline">Gifts</a>
            <a href="#digital-products" className="hidden text-foreground/80 hover:text-foreground sm:inline">Digital Products</a>
            <Link to="/the-signal" className="whitespace-nowrap text-foreground/80 hover:text-foreground">The Signal</Link>
            <Button asChild size="lg" className="min-h-11 rounded-full px-3 text-sm sm:px-5 md:text-base"><a href="#selections">Shop Tech Finds</a></Button>
          </nav>
        </div>
      </header>
      <main>
        <section className="launch-hero relative isolate overflow-hidden bg-background" aria-labelledby="launch-heading">
          <div className="launch-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-between px-5 pb-10 pt-14 md:min-h-[710px] md:px-9 md:pb-14 md:pt-20">
            <div className="relative z-10 max-w-4xl">
              <p className="text-xs font-semibold uppercase text-muted-foreground md:text-sm">MODERN TECH</p>
              <h1 id="launch-heading" className="mt-6 max-w-[850px] text-5xl font-semibold leading-[1.04] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">Everyday tech.<br /><span className="text-ring">Beautifully simple.</span></h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">A short, curated list of useful things — each with one clear benefit and one honest limitation.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="min-h-12 rounded-full px-7 text-base"><a href="#selections">Shop Tech Finds <ArrowDown aria-hidden="true" className="ml-1 h-4 w-4" /></a></Button>
                <a href="#digital-products" className="inline-flex min-h-12 items-center px-2 text-base font-medium underline-offset-4 hover:underline">Digital Products <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4" /></a>
              </div>
            </div>
            {active?.product.image_url && <div className="launch-hero-product pointer-events-none relative mx-auto mt-7 flex h-56 w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-card p-4 md:absolute md:bottom-12 md:right-9 md:mt-0 md:h-[420px] md:w-[40%] md:p-8">
              <img src={active.product.image_url} alt={active.product.title} className="h-full w-full object-contain" />
            </div>}
            <div className="relative z-10 mt-6 flex items-center justify-between gap-4 border-t border-border pt-5 text-xs font-medium uppercase text-muted-foreground md:mt-16 md:max-w-[46%]">
              <span>CURATED FOR REAL LIFE</span><span>{products.length} PICKS</span>
            </div>
          </div>
        </section>

        <section id="selections" className="scroll-mt-20 bg-background px-5 py-20 md:px-9 md:py-28" aria-labelledby="spotlight-heading">
          <div className="mx-auto max-w-7xl">
            <div className="launch-reveal mb-10 flex flex-wrap items-end justify-between gap-5">
              <div><p className="text-xs font-semibold uppercase text-muted-foreground">01 / THE SHORTLIST</p><h2 id="spotlight-heading" className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Made for the everyday.</h2></div>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">Three starting points for a more considered setup.</p>
            </div>
            {isLoading ? <p role="status" className="flex items-center gap-3 py-16"><Loader2 className="h-5 w-5 animate-spin" /> Loading selections…</p>
              : isError ? <p role="alert" className="py-16">The product selection is unavailable right now. Please try again later.</p>
              : featured.length === 0 ? <p className="py-16">No eligible selections are available right now.</p>
              : <>
                <div className="launch-reveal flex flex-wrap gap-2" role="group" aria-label="Featured products">
                  {featured.map(({ selection, product }, index) => <Button key={selection.id} variant={active?.selection.id === selection.id ? "default" : "outline"} size="lg" className="min-h-12 rounded-full px-5 text-sm md:text-base" aria-pressed={active?.selection.id === selection.id} onClick={() => setFeaturedIndex(index)}>{product.title}</Button>)}
                </div>
                {active && <div id={`product-${active.selection.slug}`} className="launch-reveal mt-8 grid scroll-mt-24 items-center gap-8 overflow-hidden rounded-md bg-secondary/50 p-5 md:grid-cols-2 md:gap-14 md:p-12">
                  <div className="launch-spotlight-image flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-card p-6 md:p-12" key={active.product.id}>
                    <img src={active.product.image_url || ""} alt={active.product.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 py-2" aria-live="polite">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{active.selection.audience}</p>
                    <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{active.product.title}</h3>
                    <p className="mt-5 text-base leading-relaxed md:text-lg">{active.selection.benefit}</p>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground"><strong className="text-foreground">Good to know:</strong> {active.selection.limitation}</p>
                    <p className="mt-7 max-w-lg border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">{affiliateDisclosure}</p>
                    <div className="mt-6">{amazonButton(active)}</div>
                    <div className="mt-10 flex items-center gap-4" aria-label="Feature carousel controls">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Previous featured product" onClick={() => setFeaturedIndex((featuredIndex + featured.length - 1) % featured.length)}><ArrowLeft className="h-5 w-5" /></Button>
                      <span className="text-sm tabular-nums text-muted-foreground">0{featuredIndex + 1} / 0{featured.length}</span>
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Next featured product" onClick={() => setFeaturedIndex((featuredIndex + 1) % featured.length)}><ArrowRight className="h-5 w-5" /></Button>
                    </div>
                  </div>
                </div>}
              </>}
          </div>
        </section>

        <section className="launch-dark px-5 py-20 md:px-9 md:py-28" aria-labelledby="more-heading">
          <div className="mx-auto max-w-7xl">
            <div className="launch-reveal mb-9"><p className="text-xs font-semibold uppercase text-accent">02 / BEYOND THE DESK</p><h2 id="more-heading" className="mt-4 text-4xl font-semibold md:text-6xl">A little more to explore.</h2></div>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">{affiliateDisclosure}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {products.slice(3).map(({ selection, product }) => <article id={`product-${selection.slug}`} key={selection.id} className="launch-reveal scroll-mt-24 overflow-hidden rounded-2xl bg-card p-5 text-card-foreground md:p-7">
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background p-4 sm:w-40"><img src={product.image_url || ""} alt={product.title} loading="lazy" className="h-full w-full object-contain" /></div>
                  <div className="min-w-0"><p className="text-xs font-semibold uppercase text-muted-foreground">{selection.audience}</p><h3 className="mt-2 text-xl font-semibold leading-tight md:text-2xl">{product.title}</h3><p className="mt-3 text-base leading-relaxed">{selection.benefit}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Good to know:</strong> {selection.limitation}</p></div>
                </div>
                <div className="mt-6">{amazonButton({ selection, product })}</div>
              </article>)}
            </div>
          </div>
        </section>

        {products.length > 0 && <section id="gift-picks" className="scroll-mt-20 bg-secondary/60 px-5 py-20 md:px-9 md:py-28" aria-labelledby="gift-heading">
          <div className="mx-auto max-w-7xl">
            <div className="launch-reveal mb-8 max-w-3xl"><p className="text-xs font-semibold uppercase text-muted-foreground">03 / GIFT-WORTHY PICKS</p><h2 id="gift-heading" className="mt-4 text-4xl font-semibold md:text-6xl">Easy to give. Useful every day.</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">The same curated shortlist, gathered for gifting. Check current price and delivery on Amazon.</p></div>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{affiliateDisclosure}</p>
            <GiftFinder disclosure={affiliateDisclosure}
              picks={products.map(({ selection, product }) => ({ slug: selection.slug, title: product.title, imageUrl: product.image_url, audience: selection.audience, benefit: selection.benefit, limitation: selection.limitation }))}
              renderCta={(slug) => { const pick = products.find((p) => p.selection.slug === slug); return pick ? amazonButton(pick) : null; }} />
            <GiftRail label="Gift-worthy picks">
              {products.map(({ selection, product }) => <article key={selection.id} data-rail-card className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl bg-card p-5 sm:w-[46%] lg:w-[31%]">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-background p-5"><img src={product.image_url || ""} alt={product.title} loading="lazy" className="h-full w-full object-contain" /></div>
                <p className="mt-5 text-xs font-semibold uppercase text-muted-foreground">{selection.audience}</p>
                <h3 className="mt-2 flex-1 text-lg font-semibold leading-snug">{product.title}</h3>
                <div className="mt-5">{amazonButton({ selection, product })}</div>
              </article>)}
            </GiftRail>
          </div>
        </section>}

        <section id="digital-products" className="scroll-mt-20 bg-background px-5 py-20 md:px-9 md:py-28" aria-labelledby="digital-heading">
          <div className="mx-auto max-w-7xl">
            <div className="launch-reveal mb-12 max-w-3xl"><p className="text-xs font-semibold uppercase text-muted-foreground">04 / DIGITAL PRODUCTS</p><h2 id="digital-heading" className="mt-4 text-4xl font-semibold md:text-6xl">Ideas, ready to use.</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">Practical guides for the work you want to put into the world.</p></div>
            {digitalLoading ? <p role="status" className="flex items-center gap-3 py-16"><Loader2 className="h-5 w-5 animate-spin" /> Loading digital products…</p>
              : digitalError ? <p role="alert" className="py-12">Digital products are unavailable right now. Please try again later.</p>
              : digitalProducts.length === 0 ? <p className="py-12">No digital products are available right now.</p>
              : <div className="grid gap-5 md:grid-cols-3">
                {digitalProducts.map(({ offer, product }) => <article key={offer.slug} id={`digital-${offer.slug}`} className="launch-reveal flex scroll-mt-24 flex-col overflow-hidden rounded-md bg-secondary/50">
                  <div className="flex h-64 items-center justify-center overflow-hidden bg-secondary p-8 md:h-72">
                    {offer.slug === "creator-bundle" ? <div className="grid h-full max-w-full grid-cols-3 gap-1" aria-label="Reels, Canva and YouTube guide covers">{[coverReels, coverCanva, coverYoutube].map((cover, index) => <img key={cover} src={cover} alt={["Reels guide cover", "Canva guide cover", "YouTube guide cover"][index]} loading="lazy" className="h-full min-w-0 object-contain" />)}</div>
                      : <img src={offer.cover} alt={`${product.title} cover`} loading="lazy" className="h-full max-w-full object-contain" />}
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8"><p className="text-xs font-semibold uppercase text-muted-foreground">{offer.label}</p><h3 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">{product.title}</h3><p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{offer.included}</p><p className="mt-7 text-sm text-muted-foreground">See offer details</p><Button asChild variant="outline" size="lg" className="mt-4 min-h-12 rounded-full px-6 text-base"><Link to={`${offer.route}${location.search}`}>View digital guide <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4" /></Link></Button></div>
                </article>)}
              </div>}
            <p className="mt-10 border-t border-border pt-7 text-base">Looking for a starting point? <Link to="/creator-funnel" className="font-medium underline underline-offset-4">Explore the free Reels guide.</Link> No free guide is required to buy.</p>
          </div>
        </section>

        <section id="the-signal" className="scroll-mt-20 bg-secondary/60 px-5 py-20 md:px-9 md:py-24" aria-labelledby="signal-heading">
          <div className="launch-reveal mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-14">
            <div><p className="text-xs font-semibold uppercase text-muted-foreground">05 / THE SIGNAL · WEEKLY NEWSLETTER</p><h2 id="signal-heading" className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Read this week's Signal.</h2>
              {latestPost ? <Link to={`/the-signal/${latestPost.slug}`} className="mt-6 block rounded-2xl bg-card p-6 transition-shadow hover:shadow-md">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Latest article · {new Date(latestPost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{latestPost.title}</h3>
                {latestPost.excerpt && <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">{latestPost.excerpt}</p>}
              </Link> : <p className="mt-4 text-base leading-relaxed text-muted-foreground">Our weekly newsletter: useful tech, buying guides and ideas worth keeping. Free to read online.</p>}
              <Button asChild size="lg" className="mt-6 min-h-12 rounded-full px-6 text-base"><Link to="/the-signal">Read The Signal <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4" /></Link></Button>
            </div>
            <div><h3 className="mb-4 text-lg font-semibold">Get The Signal by email</h3><SignalSignup /></div>
          </div>
        </section>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default Index;
