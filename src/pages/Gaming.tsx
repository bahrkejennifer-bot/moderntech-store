import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

const Gaming = () => {
  const { data: products = [], isLoading } = useProductsByCategory("gaming");

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Gaming Tech 2026 | PS5, Steam Deck OLED, Monitors & More</title>
        <meta name="description" content="Shop the hottest gaming tech of 2026 — PS5 Slim, Steam Deck OLED, ASUS ROG monitors & esports peripherals." />
        <meta property="og:title" content="Best Gaming Tech 2026 | PS5, Steam Deck OLED, Monitors & More" />
        <meta property="og:description" content="Shop the hottest gaming tech of 2026 — PS5 Slim, Steam Deck OLED, ASUS ROG monitors & esports peripherals." />
        <meta property="og:image" content="https://moderntech.store/images/products/xbox-series-x.jpg" />
        <meta property="og:url" content="https://moderntech.store/gaming" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Gaming"
        subtitle="Consoles, gaming monitors, headsets & peripherals — the definitive collection for serious gamers."
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

export default Gaming;
