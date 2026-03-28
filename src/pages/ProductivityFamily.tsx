import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategories } from "@/hooks/useProductsByCategories";

const ProductivityFamily = () => {
  const { data: products = [], isLoading } = useProductsByCategories([
    "kids-tech", "college", "AI Tech",
  ]);

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Productivity & Family Tech 2026 | Kids, College & Office Essentials</title>
        <meta name="description" content="Shop the best productivity and family tech of 2026 — kids tablets, college laptops, AI gadgets & study gear." />
        <meta property="og:title" content="Productivity & Family Tech 2026 | Kids, College & Office Essentials" />
        <meta property="og:description" content="Shop the best productivity and family tech of 2026 — kids tablets, college laptops, AI gadgets & study gear." />
        <meta property="og:url" content="https://moderntech-store.lovable.app/productivity-family" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Productivity & Family"
        subtitle="Kids tablets, college laptops, AI gadgets & study gear — tech for every age and stage."
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

export default ProductivityFamily;
