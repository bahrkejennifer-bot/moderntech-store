import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "PlayStation 5 Slim — Digital Edition",
    description: "Next-gen gaming with 4K graphics, ray tracing & ultra-fast SSD. The hottest console of 2026.",
    rating: 4.9,
    imageUrl: "https://m.media-amazon.com/images/I/51051FiD9UL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CL61F39H?tag=moderntechs0c-20",
  },
  {
    title: "Steam Deck OLED — Portable Gaming PC",
    description: "7.4-inch HDR OLED display with 90Hz refresh. Play your entire Steam library anywhere — the PC gamer's dream.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/51VTuODLLWL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DFDJSM46?tag=moderntechs0c-20",
  },
  {
    title: "SteelSeries Arctis Nova Pro Wireless — Gaming Headset",
    description: "Hi-Fi audio with Active Noise Cancellation & Infinity Power System. Multi-system support for PC, PS5 & Switch.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/61emijLBsnL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09ZWMHSD8?tag=moderntechs0c-20",
  },
  {
    title: "Razer DeathAdder V3 — Ergonomic Gaming Mouse",
    description: "63g ultralight with Focus Pro 35K sensor & 90-hour battery. The esports standard for competitive gaming.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/61Iy3ySuMPL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CQR2WLRM?tag=moderntechs0c-20",
  },
  {
    title: "ASUS ROG Swift OLED PG27AQDP — 27\" Gaming Monitor",
    description: "1440p OLED with 240Hz refresh & 0.03ms response. Esports-grade visuals for competitive and AAA gaming.",
    rating: 4.9,
    imageUrl: "https://m.media-amazon.com/images/I/81uFpNyjMcL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0D5DTCKJ3?tag=moderntechs0c-20",
  },
  {
    title: "Xbox Elite Wireless Controller Series 2 Core",
    description: "Adjustable-tension thumbsticks, shorter hair trigger locks & rechargeable battery. Pro-level control.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/71kZVwl0NHL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0B6JM5DSK?tag=moderntechs0c-20",
  },
];

const Gaming = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Gaming Tech 2026 | PS5, Steam Deck OLED, Monitors & More</title>
        <meta name="description" content="Shop the hottest gaming tech of 2026 — PS5 Slim, Steam Deck OLED, ASUS ROG OLED monitors, pro gaming mice & headsets. Level up your setup." />
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
            Gaming Tech 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The hottest consoles, OLED monitors & pro peripherals flying off shelves right now.
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

export default Gaming;
