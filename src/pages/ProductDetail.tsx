import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { usePinterestEvent } from "@/hooks/usePinterestTracking";
import AffiliateFooter from "@/components/AffiliateFooter";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { trackEvent } = usePinterestEvent();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product-detail", id],
    enabled: Boolean(id && /^[0-9a-f-]{36}$/i.test(id)),
    queryFn: async () => {
      const { data, error } = await supabase.from("scraped_products")
        .select("id,title,description,image_url,affiliate_link,is_active")
        .eq("id", id || "")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const valid = (() => {
    if (!product?.is_active || !product.image_url) return false;
    try {
      const url = new URL(product.affiliate_link);
      return /(^|\.)amazon\.com$/.test(url.hostname) &&
        /\/dp\/[A-Z0-9]{10}(?:\/|$)/i.test(url.pathname) &&
        url.searchParams.get("tag") === "moderntechs04-20";
    } catch { return false; }
  })();

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>{valid ? `${product?.title} | Modern Tech` : "Product | Modern Tech"}</title>
        <meta name="description" content={valid ? `See ${product?.title} and its details on Amazon via Modern Tech.` : "Modern Tech product selection."} />
      </Helmet>
      <header className="border-b border-border px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="font-serif text-xl font-semibold">MODERN TECH</Link>
          <Link to="/#selections" className="inline-flex items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> All picks</Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        {isLoading ? <p className="text-base">Loading product…</p> : valid && product ? (
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className="aspect-square bg-muted p-6"><img className="h-full w-full object-contain" src={product.image_url || ""} alt={product.title} /></div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Modern Tech selection</p>
              <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{product.title}</h1>
              {product.description && <p className="mt-6 text-base leading-relaxed">{product.description}</p>}
              <p className="mt-6 border-l-2 border-primary pl-4 text-base leading-relaxed">As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. This link may earn us a commission at no additional cost to you.</p>
              <Button asChild size="lg" className="mt-7 h-auto min-h-11 whitespace-normal rounded-sm py-3">
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer nofollow sponsored" onClick={() => {
                  const params = new URLSearchParams(location.search);
                  const campaign = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
                    .filter((key) => params.has(key)).map((key) => [key, params.get(key)?.slice(0, 150) || ""]));
                  trackEvent("custom", { event_type: "amazon_product_click", product_id: product.id, product_name: product.title, ...campaign });
                }}>View on Amazon <ExternalLink aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-16">
            <h1 className="font-serif text-3xl">This product is unavailable</h1>
            <p className="mt-4 text-base">It is not in our current eligible catalog. Browse the latest selection instead.</p>
            <Link to="/" className="mt-6 inline-block text-base underline underline-offset-4">Return to Modern Tech</Link>
          </div>
        )}
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default ProductDetail;
