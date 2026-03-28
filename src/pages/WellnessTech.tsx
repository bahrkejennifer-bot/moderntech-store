import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategories } from "@/hooks/useProductsByCategories";

const WellnessTech = () => {
  const { data: products = [], isLoading } = useProductsByCategories([
    "health-wellness", "Health & Wellness", "Health Tech",
  ]);

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Wellness Tech 2026 | Smart Rings, Fitness Trackers & Recovery</title>
        <meta name="description" content="Shop the best wellness tech of 2026 — Oura Ring, Fitbit, smart scales, massage guns & sleep gadgets." />
        <meta property="og:title" content="Wellness Tech 2026 | Smart Rings, Fitness Trackers & Recovery" />
        <meta property="og:description" content="Shop the best wellness tech of 2026 — Oura Ring, Fitbit, smart scales, massage guns & sleep gadgets." />
        <meta property="og:url" content="https://moderntech-store.lovable.app/wellness-tech" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Wellness Tech"
        subtitle="Smart rings, fitness trackers, recovery tools & sleep tech — invest in your body's operating system."
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

export default WellnessTech;
