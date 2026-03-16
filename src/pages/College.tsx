import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const College = () => {
  const { data: products = [], isLoading } = useProductsByCategory("college");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best College & Student Tech 2026 | Laptops, Tablets & Study Gear</title>
        <meta name="description" content="Shop the best college tech of 2026 — MacBook Air M4, iPad, noise-canceling headphones & study essentials." />
        <meta property="og:title" content="Best College & Student Tech 2026 | Laptops, Tablets & Study Gear" />
        <meta property="og:description" content="Shop the best college tech of 2026 — MacBook Air M4, iPad, noise-canceling headphones & study essentials." />
        <meta property="og:image" content="https://moderntech.store/images/products/dorm-room-tech-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/college" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="College Essentials"
        subtitle="Laptops, tablets, noise-canceling headphones & study gear — everything for the modern student."
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

export default College;
