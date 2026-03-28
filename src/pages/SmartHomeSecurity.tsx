import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategories } from "@/hooks/useProductsByCategories";

const SmartHomeSecurity = () => {
  const { data: products = [], isLoading } = useProductsByCategories([
    "home-safety", "Home Safety", "connectivity",
  ]);

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Smart Home & Security Tech 2026 | Cameras, Locks, WiFi & More</title>
        <meta name="description" content="Shop the best smart home security tech of 2026 — Ring doorbells, smart locks, mesh WiFi, AirTags & wireless cameras." />
        <meta property="og:title" content="Smart Home & Security Tech 2026 | Cameras, Locks, WiFi & More" />
        <meta property="og:description" content="Shop the best smart home security tech of 2026 — Ring doorbells, smart locks, mesh WiFi, AirTags & wireless cameras." />
        <meta property="og:url" content="https://moderntech-store.lovable.app/smart-home-security" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Smart Home & Security"
        subtitle="Doorbells, cameras, smart locks, mesh WiFi & trackers — protect and connect what matters most."
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

export default SmartHomeSecurity;
