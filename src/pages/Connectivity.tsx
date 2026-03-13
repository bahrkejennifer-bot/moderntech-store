import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "AirPods Pro 2 (USB-C) — Active Noise Cancellation",
    description: "Adaptive Audio, conversation awareness & personalized spatial audio. The #1 selling earbuds on Amazon in 2026.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CHWRXH8B?tag=moderntechs0c-20",
  },
  {
    title: "Anker MagGo 3-in-1 Wireless Charging Station",
    description: "Qi2 15W MagSafe charger for iPhone, Apple Watch & AirPods. Foldable travel design — everyday carry essential.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/61VcGMYnEQL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CF54MFPB?tag=moderntechs0c-20",
  },
  {
    title: "Apple AirTag 4-Pack — Bluetooth Tracker",
    description: "Precision Finding with Ultra Wideband. Never lose your keys, wallet or bags — the everyday carry must-have.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/71gY9E+cTaS._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0D54JZTHY?tag=moderntechs0c-20",
  },
  {
    title: "Anker 737 Power Bank 24,000mAh — Portable Charger",
    description: "140W fast charging with smart display. Charge a MacBook Pro in 30 min — the ultimate portable power solution.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/71BCVXSFPGL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09VPHQGZL?tag=moderntechs0c-20",
  },
  {
    title: "eero Pro 6E Mesh WiFi — 3-Pack",
    description: "Tri-band WiFi 6E with 160MHz channels. Covers 6,000+ sq ft — fast, reliable whole-home coverage.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/31VtlEpSKLL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B091G64GVK?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5 — Noise Canceling Headphones",
    description: "Industry-leading ANC with 30-hour battery & multipoint connection. The gold standard for wireless audio.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
];

const Connectivity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Wireless Audio, Chargers & Connectivity Tech 2026</title>
        <meta name="description" content="Shop the fastest-moving connectivity tech of 2026 — AirPods Pro 2, Anker wireless chargers, AirTags, mesh WiFi & noise-canceling headphones. Stay connected everywhere." />
        <meta property="og:title" content="Best Wireless Audio, Chargers & Connectivity Tech 2026" />
        <meta property="og:description" content="Shop the fastest-moving connectivity tech of 2026 — AirPods Pro 2, Anker chargers, AirTags & more." />
        <meta property="og:image" content="https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX679_.jpg" />
        <meta property="og:url" content="https://moderntech.store/connectivity" />
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
            Connectivity & Audio Tech 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wireless earbuds, portable chargers, mesh WiFi & trackers — the everyday carry tech selling fast right now.
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

export default Connectivity;
