import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategories } from "@/hooks/useProductsByCategories";

const DigitalLifestyle = () => {
  const { data: products = [], isLoading } = useProductsByCategories([
    "creator-gear", "Creator Gear", "gaming",
  ]);

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Digital Lifestyle 2026 | Creator Gear, Gaming & Performance Tech</title>
        <meta name="description" content="Shop the best creator gear and gaming tech of 2026 — mics, cameras, monitors, headsets & peripherals." />
        <meta property="og:title" content="Digital Lifestyle 2026 | Creator Gear, Gaming & Performance Tech" />
        <meta property="og:description" content="Shop the best creator gear and gaming tech of 2026 — mics, cameras, monitors, headsets & peripherals." />
        <meta property="og:url" content="https://moderntech-store.lovable.app/digital-lifestyle" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Digital Lifestyle"
        subtitle="Creator mics, cameras, gaming monitors, headsets & streaming gear — your performance command center."
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

export default DigitalLifestyle;
