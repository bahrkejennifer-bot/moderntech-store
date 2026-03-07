import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import ringDoorbellImage from "@/assets/products/ring-doorbell-pro2.jpg";
import wyzeCamImage from "@/assets/products/wyze-cam-v3.jpg";
import echoShow8Image from "@/assets/products/echo-show-8.jpg";
import arloPro4Image from "@/assets/products/arlo-pro-4.jpg";
import augustLockImage from "@/assets/products/august-smart-lock.jpg";
import kiddeDetectorImage from "@/assets/products/kidde-smoke-detector.jpg";

const products = [
  {
    title: "eufy FamiLock S3 Max Smart Lock",
    description: "Palm vein recognition that unlocks in 0.1s with built-in 2K HD video doorbell — forgery-proof family security.",
    price: "$549.98",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0DK1NQX9S?tag=moderntechs0c-20",
  },
  {
    title: "SimpliSafe Smart Home Security System",
    description: "Wireless, no-contract system with 24/7 protection — covers every door and window, installs in under 15 minutes.",
    price: "$229.99",
    rating: 3.7,
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07V4FKHPN?tag=moderntechs0c-20",
  },
  {
    title: "Ring Video Doorbell Pro 2",
    description: "1536p HD video with 3D motion detection and radar-powered advanced alerts",
    price: "$129.99",
    rating: 4.5,
    imageUrl: ringDoorbellImage,
    affiliateLink: "https://www.amazon.com/dp/B086Q54K53?tag=moderntechs0c-20",
  },
  {
    title: "Wyze Cam v3 Security Camera",
    description: "1080p HD indoor/outdoor camera with color night vision and two-way audio",
    price: "$35.99",
    rating: 4.6,
    imageUrl: wyzeCamImage,
    affiliateLink: "https://www.amazon.com/dp/B0F8QLK5BH?tag=moderntechs0c-20",
  },
  {
    title: "Arlo Pro 4 Spotlight Camera",
    description: "Wire-free security camera with 2K video, color night vision, and integrated spotlight",
    price: "$199.99",
    rating: 4.4,
    imageUrl: arloPro4Image,
    affiliateLink: "https://www.amazon.com/dp/B09G6211RW?tag=moderntechs0c-20",
  },
  {
    title: "August WiFi Smart Lock (4th Gen)",
    description: "Smart lock with built-in WiFi, auto-lock and unlock capabilities",
    price: "$229.99",
    rating: 4.3,
    imageUrl: augustLockImage,
    affiliateLink: "https://amzn.to/48Y3n44",
  },
];

const HomeSafety = () => {
  return (
    <div className="min-h-screen bg-background">
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
            Home & Safety Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart protection for your family — from palm vein smart locks to wireless security systems
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

export default HomeSafety;
