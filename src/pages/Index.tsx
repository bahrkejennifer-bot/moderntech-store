import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePinterestEvent } from "@/hooks/usePinterestTracking";
import { Button } from "@/components/ui/button";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import coverCanva from "@/assets/cover-canva.jpg";
import coverYoutube from "@/assets/cover-youtube.jpg";
import coverReels from "@/assets/cover-reels.jpg";

interface CatalogProduct {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  affiliate_link: string;
  is_active: boolean;
}

// These IDs select existing catalog records; the name, image and outbound URL always come from the live record.
// Keeping this list separate from the catalog makes a selection change reversible without changing old destinations.
const selections = [
  {
    id: "b68d4132-35fd-48a6-afe1-a23c27d97ef9",
    slug: "rocketbook-core",
    audience: "For the note-taker who still likes a pen",
    benefit: "Write by hand, scan your notes to the cloud, then wipe the pages clean for reuse.",
    limitation: "Pages are reusable, not a permanent paper archive.",
  },
  {
    id: "12f82e99-c9b9-4a08-ba6a-af18ec1abca6",
    slug: "soundcore-space-one",
    audience: "For focus in shared spaces",
    benefit: "Adaptive noise cancellation and a listed 40-hour battery make it a practical workday companion.",
    limitation: "These are battery-powered headphones, so they still need charging.",
  },
  {
    id: "c54218bd-8361-40d4-ac72-f4027d508a5b",
    slug: "benq-screenbar-halo-2",
    audience: "For a monitor-based desk setup",
    benefit: "A monitor light with glare-free desk lighting and a soft rear halo.",
    limitation: "Designed for a monitor, not for lighting an entire room.",
  },
  {
    id: "f4828b84-e0c2-4b70-869f-a3bed7fb37c8",
    slug: "renpho-elis-1",
    audience: "For tracking wellness trends at home",
    benefit: "Tracks 13 body-composition metrics in one scale.",
    limitation: "A home scale is a trend tool, not a medical assessment.",
  },
  {
    id: "961410f4-1bbe-4dec-8148-9741e236cdf4",
    slug: "snap-circuits-jr-sc-100",
    audience: "For hands-on circuit discovery",
    benefit: "28 snap-together pieces can make more than 100 circuits.",
    limitation: "A physical kit, not a screen-based course.",
  },
  {
    id: "450e46a0-1080-4f7d-89ab-f97f3cce0ff5",
    slug: "jbl-flip-6",
    audience: "For music beyond the desk",
    benefit: "A waterproof portable speaker with a listed 12-hour battery.",
    limitation: "Portable battery power means it needs recharging.",
  },
  {
    id: "e0aa4d9a-7a15-4c10-9dcb-b48999bdbd48",
    slug: "anker-solix-c300-dc",
    audience: "For portable power away from an outlet",
    benefit: "A 288Wh portable power station with solar-ready charging.",
    limitation: "The DC model is for compatible DC-powered devices; check ports before buying.",
  },
] as const;

type Selection = (typeof selections)[number];

// Only offers with an existing purchase page and working fulfillment route are listed here.
// Titles and public descriptions come from safe metadata; pricing belongs to checkout, not this preview.
const digitalOffers = [
  { slug: "creator-bundle", route: "/creator-bundle", cover: coverReels, included: "Reels, Canva, and YouTube creator guides together." },
  { slug: "canva-masterclass", route: "/canva-masterclass", cover: coverCanva, included: "Branding guidance, layout ideas, and practical Canva design tips." },
  { slug: "faceless-youtube-automation", route: "/faceless-youtube", cover: coverYoutube, included: "Planning, video structure, branding, and channel growth guidance." },
] as const;

const digitalHash = (hash: string) => hash === "#shop-downloads" || hash.startsWith("#digital-");

const isEligible = (product: CatalogProduct) => {
  try {
    const url = new URL(product.affiliate_link);
    return product.is_active && Boolean(product.image_url) &&
      /(^|\.)amazon\.com$/.test(url.hostname) &&
      /\/dp\/[A-Z0-9]{10}(?:\/|$)/i.test(url.pathname) &&
      url.searchParams.get("tag") === "moderntechs04-20";
  } catch {
    return false;
  }
};

const useSelections = () => useQuery({
  queryKey: ["homepage-curated-selections"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("scraped_products")
      .select("id,title,description,image_url,affiliate_link,is_active")
      .in("id", selections.map((item) => item.id));
    if (error) throw error;
    const byId = new Map((data as CatalogProduct[]).filter(isEligible).map((item) => [item.id, item]));
    return selections.flatMap((selection) => {
      const product = byId.get(selection.id);
      return product ? [{ selection, product }] : [];
    });
  },
  staleTime: 5 * 60 * 1000,
});

const ProductTile = ({ selection, product, featured, onOpen }: {
  selection: Selection;
  product: CatalogProduct;
  featured: boolean;
  onOpen: (selection: Selection, product: CatalogProduct) => void;
}) => (
  <article id={`product-${selection.slug}`} className="scroll-mt-8 border-t border-border py-7 md:py-8">
    <div className={`grid grid-cols-[104px_minmax(0,1fr)] gap-4 sm:grid-cols-[148px_minmax(0,1fr)] md:gap-7 ${featured ? "lg:block" : "lg:grid-cols-[136px_minmax(0,1fr)]"}`}>
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-muted">
        <img src={product.image_url || ""} alt={product.title} loading={featured ? "eager" : "lazy"} className="h-full w-full object-contain p-2 md:p-4" />
      </div>
      <div className={`flex min-w-0 flex-col items-start justify-center ${featured ? "lg:pt-5" : ""}`}>
        <p className="text-xs font-semibold uppercase text-muted-foreground">{selection.audience}</p>
        <h3 className={`mt-2 font-serif leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>{product.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-foreground">{selection.benefit}</p>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Good to know:</span> {selection.limitation}</p>
        <Button asChild size="lg" className="mt-5 h-auto min-h-11 whitespace-normal rounded-sm px-5 py-3 text-sm">
          <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow sponsored" onClick={() => onOpen(selection, product)}>
            View on Amazon <ExternalLink aria-hidden="true" />
          </a>
        </Button>
        <Link to={`/product/${product.id}${window.location.search}`} className="mt-3 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">Product details</Link>
      </div>
    </div>
  </article>
);

const Index = () => {
  const { data: products = [], isLoading, isError } = useSelections();
  const { data: digitalProducts = [], isLoading: digitalLoading, isError: digitalError } = useQuery({
    queryKey: ["homepage-digital-offers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products_public")
        .select("slug,title,description")
        .in("slug", digitalOffers.map((offer) => offer.slug));
      if (error) throw error;
      return digitalOffers.flatMap((offer) => {
        const product = data?.find((item) => item.slug === offer.slug);
        return product ? [{ offer, product }] : [];
      });
    },
    staleTime: 5 * 60 * 1000,
  });
  const [path, setPath] = useState<"tech" | "downloads">(() => digitalHash(window.location.hash) ? "downloads" : "tech");
  const { trackEvent } = usePinterestEvent();
  const location = useLocation();

  useEffect(() => {
    const syncHash = () => setPath(digitalHash(window.location.hash) ? "downloads" : "tech");
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && ((path === "downloads" && !digitalLoading) || (path === "tech" && !isLoading))) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, [path, digitalLoading, isLoading]);

  const trackClick = (selection: Selection, product: CatalogProduct) => {
    const params = new URLSearchParams(location.search);
    const campaign = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .filter((key) => params.has(key))
        .map((key) => [key, params.get(key)?.slice(0, 150) || ""]),
    );
    trackEvent("custom", {
      event_type: "amazon_product_click",
      product_id: product.id,
      product_name: product.title,
      product_anchor: `product-${selection.slug}`,
      ...campaign,
    });
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground [&_footer_p]:!text-base [&_footer_a]:!text-base [&_footer_h3]:!text-base [&_footer_span]:!text-base">
      <Helmet>
        <title>Modern Tech | Useful tech. Clear choices.</title>
        <meta name="description" content="Shop considered tech picks and practical digital creator guides from Modern Tech LLC." />
        <meta property="og:title" content="Modern Tech | Useful tech. Clear choices." />
        <meta property="og:description" content="Shop useful tech and practical digital creator guides in one place." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moderntech.store/" />
      </Helmet>
      <StructuredData title="Modern Tech | Useful tech. Clear choices." description="Shop useful tech and practical digital creator guides in one place." path="/" includeWebSite />
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 md:px-8">
          <Link to="/" className="font-serif text-xl font-semibold text-foreground md:text-2xl">MODERN TECH</Link>
          <nav aria-label="Main navigation" className="flex items-center gap-4 text-base font-medium md:gap-7">
            <a href="#shop-tech" className="text-foreground hover:underline">Shop</a>
            <Link to="/weekly-edit" className="text-foreground hover:underline">Weekly Edit</Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="border-b border-border bg-secondary/50">
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-9 md:px-8 md:pb-12 md:pt-14">
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">The Modern Tech selection</p>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Useful tech. Clear choices.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">Considered tech for everyday life. Practical downloads for making what comes next.</p>
            <p className="mt-5 max-w-2xl border-l-2 border-primary pl-4 text-base leading-relaxed">
              <strong>Affiliate disclosure:</strong> As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. Our Amazon links may earn us a commission at no additional cost to you.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 pt-7 md:px-8 md:pt-9" aria-label="Choose what to shop">
          <div className="grid grid-cols-2 border-b border-border" role="group" aria-label="Shopping paths">
            <Button id="shop-tech" type="button" variant="ghost" aria-pressed={path === "tech"} onClick={() => { setPath("tech"); window.location.hash = "shop-tech"; }} className={`h-auto min-h-14 rounded-none border-b-2 px-2 py-3 text-center text-base whitespace-normal sm:text-lg ${path === "tech" ? "border-primary bg-secondary/50 text-foreground" : "border-transparent text-muted-foreground"}`}>Shop useful tech</Button>
            <Button id="shop-downloads" type="button" variant="ghost" aria-pressed={path === "downloads"} onClick={() => { setPath("downloads"); window.location.hash = "shop-downloads"; }} className={`h-auto min-h-14 rounded-none border-b-2 px-2 py-3 text-center text-base whitespace-normal sm:text-lg ${path === "downloads" ? "border-primary bg-secondary/50 text-foreground" : "border-transparent text-muted-foreground"}`}>Shop digital downloads</Button>
          </div>
        </section>
        {path === "tech" ? <section id="selections" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Start here</p>
              <h2 className="mt-1 font-serif text-3xl md:text-4xl">Three for the everyday desk</h2>
            </div>
            <p className="text-sm text-muted-foreground">Details and availability on Amazon</p>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-3 py-16 text-muted-foreground" role="status"><Loader2 className="h-5 w-5 animate-spin" /> Loading selections…</div>
          ) : isError ? (
            <p className="py-12 text-base" role="alert">The product selection is unavailable right now. Please try again later.</p>
          ) : products.length === 0 ? (
            <p className="py-12 text-base">No eligible selections are available right now.</p>
          ) : (
            <>
              <div className="grid gap-x-9 lg:grid-cols-3">
                {products.slice(0, 3).map(({ selection, product }) => <ProductTile key={selection.id} selection={selection} product={product} featured onOpen={trackClick} />)}
              </div>
              {products.length > 3 && (
                <div className="mt-12 border-t border-border pt-10 md:mt-16">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">More considered picks</p>
                  <h2 className="mt-1 font-serif text-3xl md:text-4xl">For the rest of the day</h2>
                  <div className="mt-5 grid gap-x-10 md:grid-cols-2">
                    {products.slice(3).map(({ selection, product }) => <ProductTile key={selection.id} selection={selection} product={product} featured={false} onOpen={trackClick} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </section> : <section id="digital-selections" className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase text-muted-foreground">For the things you make</p>
          <h2 className="mt-1 font-serif text-3xl md:text-4xl">Digital downloads</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed">Choose a guide that fits your next project. Review the details, then purchase through the existing secure checkout.</p>
          {digitalLoading ? <div role="status" className="flex items-center gap-3 py-16 text-base"><Loader2 className="h-5 w-5 animate-spin" /> Loading downloads…</div>
            : digitalError ? <p role="alert" className="py-12 text-base">Downloads are unavailable right now. Please try again later.</p>
            : digitalProducts.length === 0 ? <p className="py-12 text-base">No downloads are available right now.</p>
            : <div className="mt-7 grid gap-x-9 md:grid-cols-3">
              {digitalProducts.map(({ offer, product }) => <article key={offer.slug} id={`digital-${offer.slug}`} className="scroll-mt-6 border-t border-border py-6">
                <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-5 md:block">
                  {offer.slug === "creator-bundle" ? <div className="grid aspect-[3/4] max-h-64 grid-cols-3 gap-0.5 overflow-hidden bg-muted md:w-40" aria-label="Reels, Canva, and YouTube guide covers">
                    {[coverReels, coverCanva, coverYoutube].map((cover, index) => <img key={cover} src={cover} alt={["Reels guide cover", "Canva guide cover", "YouTube guide cover"][index]} className="h-full w-full object-cover" loading="lazy" />)}
                  </div> : <div className="aspect-[3/4] max-h-64 overflow-hidden bg-muted md:w-40"><img src={offer.cover} alt={`${product.title} cover`} className="h-full w-full object-cover" loading="lazy" /></div>}
                  <div className="min-w-0 md:pt-5">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Digital guide</p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">{product.title}</h3>
                    <p className="mt-3 text-base leading-relaxed">{product.description}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Inside:</span> {offer.included}</p>
                    <p className="mt-4 text-base text-muted-foreground">See offer details</p>
                    <Button asChild size="lg" className="mt-4 min-h-11 rounded-sm text-base"><Link to={`${offer.route}${location.search}`}>View digital guide <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></Button>
                  </div>
                </div>
              </article>)}
            </div>}
          <p className="mt-8 border-t border-border pt-6 text-base">Just looking? <Link to="/creator-funnel" className="underline underline-offset-4">Explore the free Reels guide</Link> — no free guide is required to buy.</p>
        </section>}
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default Index;
