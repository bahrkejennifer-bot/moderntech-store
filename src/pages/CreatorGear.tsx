import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const products = [
  {
    title: "Shure SM7B Dynamic Vocal Microphone",
    description: "The gold standard for podcasting and streaming — natural, smooth sound with legendary durability and electromagnetic shielding.",
    price: "$439.00",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0002E4Z8M?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Key Light Air",
    description: "Professional-grade LED panel with app-controlled brightness and color temperature — soft, even lighting for creators.",
    price: "$176.00",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B082QHRZFW?tag=moderntechs0c-20",
  },
  {
    title: "DJI Osmo Mobile 6",
    description: "3-axis smartphone stabilizer with intelligent tracking, gesture control, and built-in extension rod for cinematic content.",
    price: "$139.00",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0BDKL2KST?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Stream Deck MK.2",
    description: "15 customizable LCD keys to control apps, platforms, and workflows — the creator's command center.",
    price: "$149.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
  },
  {
    title: "Sony ZV-1 II Vlog Camera",
    description: "Wide-angle lens, cinematic bokeh, and directional 3-capsule mic — built for content creators who demand quality.",
    price: "$898.00",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0C5CCJNT3?tag=moderntechs0c-20",
  },
  {
    title: "Rode PSA1+ Professional Studio Arm",
    description: "Precision-engineered boom arm with internal cable management and smooth, silent operation for any microphone setup.",
    price: "$119.00",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0BG2LN57Y?tag=moderntechs0c-20",
  },
];

const CreatorGear = () => {
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
            Creator Gear
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sound like a pro. Look like one too. Professional-grade tools for podcasters, streamers, and content creators.
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

export default CreatorGear;
