import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Amazon Fire HD 10 Kids Pro — Kid's Tablet 2026",
    description: "10.1-inch with kid-proof case, parental controls & 1-year Amazon Kids+ subscription. The #1 kids tablet on Amazon.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/61UeDMERyAL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0BL5SY2S6?tag=moderntechs0c-20",
  },
  {
    title: "VTech KidiZoom Smartwatch DX3 — Kids Smartwatch",
    description: "Dual cameras, games, fitness tracking & monster detector. The best-selling kids smartwatch of 2026.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/71fxqUKmFjL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CFR91BBG?tag=moderntechs0c-20",
  },
  {
    title: "Osmo Genius Starter Kit — STEM Learning for iPad",
    description: "Hands-on STEM learning with 5 award-winning games. Develops math, spelling & creativity skills ages 6-10.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/81xLSmkEl5L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B07STM4Y8G?tag=moderntechs0c-20",
  },
  {
    title: "LEGO SPIKE Essential — Coding Robot for Kids",
    description: "Build & code robots with drag-and-drop programming. STEM education meets play — for ages 6+.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/71rC0PIz01L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B08QGR2TF5?tag=moderntechs0c-20",
  },
  {
    title: "JBL JR310BT — Wireless Kids Headphones",
    description: "Volume-limited to 85dB for safe listening. 30-hour battery, foldable & lightweight — perfect for school & travel.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/61ZjaxK75HL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B08X1SN9QW?tag=moderntechs0c-20",
  },
  {
    title: "Tonies Toniebox — Screen-Free Audio Player for Kids",
    description: "Squeeze to play stories, songs & podcasts. No screen time — the parent-approved entertainment device of 2026.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/61eYFFyBGTL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0B1CDCTSC?tag=moderntechs0c-20",
  },
];

const KidsTech = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Kids Tech & STEM Toys 2026 | Tablets, Smartwatches & Learning</title>
        <meta name="description" content="Shop the best kids tech of 2026 — Fire HD tablets, coding robots, STEM kits, kids smartwatches & safe headphones. Educational tech that's moving fast on Amazon." />
      </Helmet>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Kids Tech & STEM Toys 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kid-safe tablets, coding robots, STEM kits & audio players — the parent-approved tech selling fast.
          </p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default KidsTech;
