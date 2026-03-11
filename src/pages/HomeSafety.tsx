import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Ring Battery Doorbell Plus — Smart Video Doorbell",
    description: "1536p HD video, Head-to-Toe view & advanced motion detection. Smart home security you can install in minutes.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/51BoGN7mP3L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09WZBPX7K?tag=moderntechs0c-20",
  },
  {
    title: "Blink Outdoor 4 — Wireless Security Camera",
    description: "Wire-free HD camera with 2-year battery, person detection & Alexa integration. Smart home wellness starts here.",
    rating: 4.3,
    imageUrl: "https://m.media-amazon.com/images/I/51AdvJCGpcL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0B1N5HW22?tag=moderntechs0c-20",
  },
  {
    title: "eufy Security Smart Lock C220 — Fingerprint Door Lock",
    description: "Keyless entry with fingerprint unlock in 0.3s. BHMA Grade 2 certified — minimalist tech meets maximum security.",
    rating: 4.5,
    imageUrl: "https://m.media-amazon.com/images/I/61m0T0pZP7L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CXKPTDRR?tag=moderntechs0c-20",
  },
  {
    title: "Roborock S8 MaxV Ultra — Robot Vacuum & Mop",
    description: "LiDAR navigation, 10,000Pa suction & auto-mop washing. The hottest smart home gadget of 2026.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/61OxqI1bVwL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DBC8138W?tag=moderntechs0c-20",
  },
  {
    title: "Echo Show 8 (3rd Gen) — Smart Display",
    description: "8-inch HD smart display with spatial audio & smart home hub. Control your entire connected home from one screen.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/71tL7OmhUvL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0BLS3Y632?tag=moderntechs0c-20",
  },
  {
    title: "SimpliSafe 8-Piece Wireless Security System",
    description: "No-contract 24/7 monitoring with HD camera, sensors & keypad. Peace of mind, simplified.",
    rating: 4.4,
    imageUrl: "https://m.media-amazon.com/images/I/71X6iaGSx+L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0D4126GYJ?tag=moderntechs0c-20",
  },
];

const HomeSafety = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Smart Home Security Tech 2026 | Cameras, Locks & More</title>
        <meta name="description" content="Shop the hottest smart home security tech of 2026 — Ring doorbells, robot vacuums, fingerprint locks & wireless cameras. Protect your home with minimalist tech." />
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
            Smart Home & Safety Tech 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart home wellness starts here — robot vacuums, fingerprint locks & wireless cameras that move fast on Amazon.
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

export default HomeSafety;
