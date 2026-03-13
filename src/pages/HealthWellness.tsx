import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import ouraRing4Img from "@/assets/products/oura-ring-4.jpg";

const products = [
  {
    title: "Oura Ring 4 — Smart Ring Fitness Tracker",
    description: "Titanium wearable tech for sleep quality tracking, HRV monitoring & longevity insights. The biohacking essential of 2026.",
    rating: 4.8,
    imageUrl: ouraRing4Img,
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
  },
  {
    title: "Apple Watch Series 10 — Health & Wellness Wearable",
    description: "ECG, blood oxygen, sleep tracking & crash detection. The most advanced smartwatch for holistic health monitoring.",
    rating: 4.9,
    imageUrl: "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DGJ7QCS2?tag=moderntechs0c-20",
  },
  {
    title: "WHOOP 4.0 — Biohacking Fitness Tracker",
    description: "24/7 health monitoring with strain, recovery & sleep coaching. No screen, no distractions — pure performance data.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/51cxMll4NHL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0BFCYB2SJ?tag=moderntechs0c-20",
  },
  {
    title: "Theragun Mini 2.0 — Portable Percussion Massager",
    description: "Deep tissue muscle recovery in your pocket. Whisper-quiet motor with 3 speeds for daily wellness rituals.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/61Ie1DNWKWL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CX48M92W?tag=moderntechs0c-20",
  },
  {
    title: "Withings Body Smart Scale — WiFi Smart Scale",
    description: "Body composition analysis with Eyes Closed Mode. Syncs with Apple Health — neurowellness meets precision tracking.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/61Bvs3AS3TL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CG1VLXQF?tag=moderntechs0c-20",
  },
  {
    title: "Philips SmartSleep Wake-Up Light",
    description: "Sunrise simulation alarm for stress management & better mornings. Clinically proven to improve sleep quality.",
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/71sGBFbNLzL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0093162RM?tag=moderntechs0c-20",
  },
];

const HealthWellness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Smart Ring & Wellness Tech 2026 | Biohacking Essentials</title>
        <meta name="description" content="Discover the hottest wellness tech of 2026 — Oura Ring 4, Apple Watch Series 10, WHOOP 4.0 & more. Smart ring fitness trackers, biohacking tools & longevity tech." />
        <meta property="og:title" content="Best Smart Ring & Wellness Tech 2026 | Biohacking Essentials" />
        <meta property="og:description" content="Discover the hottest wellness tech of 2026 — Oura Ring 4, Apple Watch Series 10, WHOOP 4.0 & more." />
        <meta property="og:image" content="https://moderntech.store/images/products/oura-ring-4.jpg" />
        <meta property="og:url" content="https://moderntech.store/health-wellness" />
        <meta property="og:type" content="website" />
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
            Health & Wellness Tech 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart ring fitness trackers, biohacking essentials & longevity tech — curated for a high-performance lifestyle.
          </p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default HealthWellness;
