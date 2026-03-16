import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const CreatorGear = () => {
  const { data: products = [], isLoading } = useProductsByCategory("creator-gear");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Creator Gear & Streaming Tech 2026 | Mics, Cameras & More</title>
        <meta name="description" content="Shop the hottest creator gear of 2026 — Shure MV7+, Elgato Stream Deck, Sony ZV-1 II & more." />
        <meta property="og:title" content="Best Creator Gear & Streaming Tech 2026 | Mics, Cameras & More" />
        <meta property="og:description" content="Shop the hottest creator gear of 2026 — Shure MV7+, Elgato Stream Deck, Sony ZV-1 II & more." />
        <meta property="og:image" content="https://moderntech.store/images/products/creator-gear-starter-kit-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/creator-gear" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Creator Studio"
        subtitle="Microphones, cameras, lighting & editing tools — everything to launch and grow your creative brand."
      >
        {isLoading ? (
          <p className="col-span-full text-center text-muted-foreground font-mono text-sm py-12">Loading products…</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description || ""}
              rating={product.rating || 0}
              imageUrl={product.image_url || ""}
              affiliateLink={product.affiliate_link}
            />
          ))
        )}
      </VogueCategoryLayout>
    </div>
  );
};

export default CreatorGear;
