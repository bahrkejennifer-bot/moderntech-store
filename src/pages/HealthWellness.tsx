import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import ouraRing4Img from "@/assets/products/oura-ring-4.jpg";
import appleWatchImg from "@/assets/products/apple-watch-series-10.jpg";
import whoopImg from "@/assets/products/whoop-4.jpg";
import theragunMiniImg from "@/assets/products/theragun-mini-2.jpg";
import withingsScaleImg from "@/assets/products/withings-body-smart.jpg";
import philipsSleepImg from "@/assets/products/philips-smartsleep.jpg";

const products = [
  {
    title: "Oura Ring 4 — Smart Ring Fitness Tracker",
    description: "Titanium wearable for sleep quality, HRV monitoring & longevity insights. The biohacking essential of 2026.",
    rating: 4.8,
    imageUrl: ouraRing4Img,
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
  },
  {
    title: "Apple Watch Series 10",
    description: "ECG, blood oxygen, sleep tracking & crash detection. The most advanced smartwatch for holistic health monitoring.",
    rating: 4.9,
    imageUrl: appleWatchImg,
    affiliateLink: "https://www.amazon.com/dp/B0DGJ7QCS2?tag=moderntechs0c-20",
  },
  {
    title: "WHOOP 4.0 — Biohacking Fitness Tracker",
    description: "24/7 health monitoring with strain, recovery & sleep coaching. No screen, no distractions — pure performance data.",
    rating: 4.5,
    imageUrl: whoopImg,
    affiliateLink: "https://www.amazon.com/dp/B0BFCYB2SJ?tag=moderntechs0c-20",
  },
  {
    title: "Theragun Mini 2.0 — Percussion Massager",
    description: "Deep tissue muscle recovery in your pocket. Whisper-quiet motor with 3 speeds for daily wellness rituals.",
    rating: 4.7,
    imageUrl: theragunMiniImg,
    affiliateLink: "https://www.amazon.com/dp/B0CX48M92W?tag=moderntechs0c-20",
  },
  {
    title: "Withings Body Smart Scale",
    description: "Body composition analysis with Eyes Closed Mode. Syncs with Apple Health — precision tracking redefined.",
    rating: 4.5,
    imageUrl: withingsScaleImg,
    affiliateLink: "https://www.amazon.com/dp/B0CG1VLXQF?tag=moderntechs0c-20",
  },
  {
    title: "Philips SmartSleep Wake-Up Light",
    description: "Sunrise simulation alarm for stress management & better mornings. Clinically proven to improve sleep quality.",
    rating: 4.4,
    imageUrl: philipsSleepImg,
    affiliateLink: "https://www.amazon.com/dp/B0093162RM?tag=moderntechs0c-20",
  },
];

const HealthWellness = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Smart Ring & Wellness Tech 2026 | Biohacking Essentials</title>
        <meta name="description" content="Discover the hottest wellness tech of 2026 — Oura Ring 4, Apple Watch Series 10, WHOOP 4.0 & more." />
      </Helmet>
      <VogueCategoryLayout
        title="Health & Wellness"
        subtitle="Smart rings, biohacking wearables, sleep trackers & recovery tools — curated for a high-performance lifestyle."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default HealthWellness;
