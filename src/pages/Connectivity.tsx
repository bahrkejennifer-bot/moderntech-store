import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import airpodsImg from "@/assets/products/airpods-pro-2.jpg";
import ankerMaggoImg from "@/assets/products/anker-maggo-charger.jpg";
import airtagImg from "@/assets/products/apple-airtag-4pack.jpg";
import ankerBankImg from "@/assets/products/anker-power-bank.jpg";
import eeroImg from "@/assets/products/eero-pro-6e.jpg";
import sonyImg from "@/assets/products/sony-wh-1000xm5.jpg";

const products = [
  {
    title: "AirPods Pro 2 (USB-C)",
    description: "Adaptive Audio, conversation awareness & personalized spatial audio. The #1 selling earbuds.",
    rating: 4.8,
    imageUrl: airpodsImg,
    affiliateLink: "https://www.amazon.com/dp/B0CHWRXH8B?tag=moderntechs0c-20",
  },
  {
    title: "Anker MagGo 3-in-1 Wireless Charger",
    description: "Qi2 15W MagSafe charger for iPhone, Apple Watch & AirPods. Foldable travel design.",
    rating: 4.6,
    imageUrl: ankerMaggoImg,
    affiliateLink: "https://www.amazon.com/dp/B0CF54MFPB?tag=moderntechs0c-20",
  },
  {
    title: "Apple AirTag 4-Pack",
    description: "Precision Finding with Ultra Wideband. Never lose your keys, wallet or bags.",
    rating: 4.7,
    imageUrl: airtagImg,
    affiliateLink: "https://www.amazon.com/dp/B0D54JZTHY?tag=moderntechs0c-20",
  },
  {
    title: "Anker 737 Power Bank 24,000mAh",
    description: "140W fast charging with smart display. Charge a MacBook Pro in 30 min.",
    rating: 4.6,
    imageUrl: ankerBankImg,
    affiliateLink: "https://www.amazon.com/dp/B09VPHQGZL?tag=moderntechs0c-20",
  },
  {
    title: "eero Pro 6E Mesh WiFi — 3-Pack",
    description: "Tri-band WiFi 6E with 160MHz channels. Covers 6,000+ sq ft of reliable whole-home coverage.",
    rating: 4.5,
    imageUrl: eeroImg,
    affiliateLink: "https://www.amazon.com/dp/B091G64GVK?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5 — Noise Canceling",
    description: "Industry-leading ANC with 30-hour battery & multipoint connection. The gold standard.",
    rating: 4.7,
    imageUrl: sonyImg,
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
];

const Connectivity = () => {
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
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default Connectivity;
