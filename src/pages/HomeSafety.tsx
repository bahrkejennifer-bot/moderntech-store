import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const HomeSafety = () => {
  const { data: products = [], isLoading } = useProductsByCategory("home-safety");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Smart Home Security Tech 2026 | Cameras, Locks & More</title>
        <meta name="description" content="Shop the hottest smart home security tech of 2026 — Ring doorbells, robot vacuums, fingerprint locks & wireless cameras." />
        <meta property="og:title" content="Best Smart Home Security Tech 2026 | Cameras, Locks & More" />
        <meta property="og:description" content="Shop the hottest smart home security tech of 2026 — Ring doorbells, robot vacuums, fingerprint locks & wireless cameras." />
        <meta property="og:image" content="https://moderntech.store/images/products/smart-home-safety-checklist-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/home-safety" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Home & Safety"
        subtitle="Smart doorbells, security cameras, fingerprint locks & robot vacuums — protect what matters most."
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

export default HomeSafety;
