import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const Connectivity = () => {
  const { data: products = [], isLoading } = useProductsByCategory("connectivity");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Wireless Audio, Chargers & Connectivity Tech 2026</title>
        <meta name="description" content="Shop the fastest-moving connectivity tech of 2026 — AirPods Pro 2, Anker chargers, AirTags & more." />
        <meta property="og:title" content="Best Wireless Audio, Chargers & Connectivity Tech 2026" />
        <meta property="og:description" content="Shop the fastest-moving connectivity tech of 2026 — AirPods Pro 2, Anker chargers, AirTags & more." />
        <meta property="og:image" content="https://moderntech.store/images/products/airpods-pro-2.jpg" />
        <meta property="og:url" content="https://moderntech.store/connectivity" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Connectivity"
        subtitle="Wireless earbuds, portable chargers, mesh WiFi & trackers — stay connected everywhere."
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

export default Connectivity;
