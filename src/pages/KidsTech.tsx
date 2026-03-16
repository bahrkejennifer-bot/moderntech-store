import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const KidsTech = () => {
  const { data: products = [], isLoading } = useProductsByCategory("kids-tech");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Kids Tech & STEM Toys 2026 | Tablets, Smartwatches & Learning</title>
        <meta name="description" content="Shop the best kids tech of 2026 — Fire HD tablets, coding robots, STEM kits & kids smartwatches." />
        <meta property="og:title" content="Best Kids Tech & STEM Toys 2026 | Tablets, Smartwatches & Learning" />
        <meta property="og:description" content="Shop the best kids tech of 2026 — Fire HD tablets, coding robots, STEM kits & kids smartwatches." />
        <meta property="og:image" content="https://moderntech.store/images/products/screen-free-kids-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/kids-tech" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Kids Tech"
        subtitle="Kid-safe tablets, coding robots, STEM kits & audio players — parent-approved technology."
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

export default KidsTech;
