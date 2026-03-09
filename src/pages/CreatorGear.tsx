import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShoppingCart, Bookmark } from "lucide-react";

const products = [
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

const pinterestPins = [
  {
    title: "Shure SM7B",
    subtitle: "The Podcaster's Gold Standard",
    price: "$439.00",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0002E4Z8M?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&media=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598488035139-bdbb2231ce04%3Fw%3D600&description=Shure%20SM7B%20-%20The%20Gold%20Standard%20for%20Podcasting",
    saves: "2.4k",
  },
  {
    title: "Elgato Key Light Air",
    subtitle: "Pro Glow for Every Creator",
    price: "$176.00",
    rating: "4.6",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B082QHRZFW?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&media=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1516035069371-29a1b244cc32%3Fw%3D600&description=Elgato%20Key%20Light%20Air%20-%20Professional%20Creator%20Lighting",
    saves: "1.8k",
  },
  {
    title: "DJI Osmo Mobile 6",
    subtitle: "Cinematic Solo Shoots",
    price: "$139.00",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=600&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0BDKL2KST?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&media=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626379953822-baec19c3accd%3Fw%3D600&description=DJI%20Osmo%20Mobile%206%20-%20Essential%20Creator%20Gimbal",
    saves: "3.1k",
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
          <h1 className="text-5xl font-bold mb-4">Creator Gear</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sound like a pro. Look like one too. Professional-grade tools for podcasters, streamers, and content creators.
          </p>
        </div>

        {/* Pinterest-Style Board Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <h2 className="text-2xl font-bold">Creator Essentials Board</h2>
            </div>
            <a
              href="https://www.pinterest.com/moderntechllc/creator-gear/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              Follow on Pinterest <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pinterestPins.map((pin) => (
              <div
                key={pin.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                {/* Pin Image */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={pin.imageUrl}
                    alt={pin.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay with Save button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3">
                    <a
                      href={pin.pinterestShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-destructive hover:bg-destructive/90 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      Save
                    </a>
                  </div>
                  {/* Saves count badge */}
                  <div className="absolute bottom-3 left-3 backdrop-blur-md bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    ❤️ {pin.saves} saves
                  </div>
                </div>

                {/* Pin Info */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-lg leading-tight">{pin.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pin.subtitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-foreground">{pin.price}</span>
                      <span className="text-xs text-muted-foreground ml-2">⭐ {pin.rating}</span>
                    </div>
                    <a
                      href={pin.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
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

export default CreatorGear;
