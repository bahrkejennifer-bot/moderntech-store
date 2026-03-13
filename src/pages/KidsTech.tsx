import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import fireHdImg from "@/assets/products/fire-hd-10-kids-pro.jpg";
import vtechImg from "@/assets/products/vtech-kidizoom-dx3.jpg";
import osmoImg from "@/assets/products/osmo-genius-kit.jpg";
import legoSpikeImg from "@/assets/products/lego-spike-essential.jpg";
import jblImg from "@/assets/products/jbl-jr310bt-headphones.jpg";
import tonieboxImg from "@/assets/products/tonies-toniebox.jpg";

const products = [
  {
    title: "Amazon Fire HD 10 Kids Pro",
    description: "10.1-inch with kid-proof case, parental controls & 1-year Amazon Kids+ subscription.",
    rating: 4.6,
    imageUrl: fireHdImg,
    affiliateLink: "https://www.amazon.com/dp/B0BL5SY2S6?tag=moderntechs0c-20",
  },
  {
    title: "VTech KidiZoom Smartwatch DX3",
    description: "Dual cameras, games, fitness tracking & monster detector. The best-selling kids smartwatch.",
    rating: 4.5,
    imageUrl: vtechImg,
    affiliateLink: "https://www.amazon.com/dp/B0CFR91BBG?tag=moderntechs0c-20",
  },
  {
    title: "Osmo Genius Starter Kit — STEM Learning",
    description: "Hands-on STEM learning with 5 award-winning games. Develops math, spelling & creativity ages 6-10.",
    rating: 4.8,
    imageUrl: osmoImg,
    affiliateLink: "https://www.amazon.com/dp/B07STM4Y8G?tag=moderntechs0c-20",
  },
  {
    title: "LEGO SPIKE Essential — Coding Robot",
    description: "Build & code robots with drag-and-drop programming. STEM education meets play — ages 6+.",
    rating: 4.7,
    imageUrl: legoSpikeImg,
    affiliateLink: "https://www.amazon.com/dp/B08QGR2TF5?tag=moderntechs0c-20",
  },
  {
    title: "JBL JR310BT — Wireless Kids Headphones",
    description: "Volume-limited to 85dB for safe listening. 30-hour battery, foldable & lightweight.",
    rating: 4.5,
    imageUrl: jblImg,
    affiliateLink: "https://www.amazon.com/dp/B08X1SN9QW?tag=moderntechs0c-20",
  },
  {
    title: "Tonies Toniebox — Screen-Free Audio Player",
    description: "Squeeze to play stories, songs & podcasts. No screen time — the parent-approved device of 2026.",
    rating: 4.8,
    imageUrl: tonieboxImg,
    affiliateLink: "https://www.amazon.com/dp/B0B1CDCTSC?tag=moderntechs0c-20",
  },
];

const KidsTech = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Kids Tech & STEM Toys 2026 | Tablets, Smartwatches & Learning</title>
        <meta name="description" content="Shop the best kids tech of 2026 — Fire HD tablets, coding robots, STEM kits & kids smartwatches." />
      </Helmet>
      <VogueCategoryLayout
        title="Kids Tech"
        subtitle="Kid-safe tablets, coding robots, STEM kits & audio players — parent-approved technology."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default KidsTech;
