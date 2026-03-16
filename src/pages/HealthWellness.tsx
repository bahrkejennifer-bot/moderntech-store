import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const HealthWellness = () => {
  const { data: products = [], isLoading } = useProductsByCategory("health-wellness");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Smart Ring & Wellness Tech 2026 | Biohacking Essentials</title>
        <meta name="description" content="Discover the hottest wellness tech of 2026 — Oura Ring 4, Apple Watch Series 10, WHOOP 4.0 & more." />
        <meta property="og:title" content="Best Smart Ring & Wellness Tech 2026 | Biohacking Essentials" />
        <meta property="og:description" content="Discover the hottest wellness tech of 2026 — Oura Ring 4, Apple Watch Series 10, WHOOP 4.0 & more." />
        <meta property="og:image" content="https://moderntech.store/images/products/oura-ring-4.jpg" />
        <meta property="og:url" content="https://moderntech.store/health-wellness" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Health & Wellness"
        subtitle="Smart rings, biohacking wearables, sleep trackers & recovery tools — curated for a high-performance lifestyle."
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

export default HealthWellness;
