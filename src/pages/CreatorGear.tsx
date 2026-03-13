import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShoppingCart, Bookmark } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Shure MV7+ Podcast Microphone",
    description: "USB/XLR dynamic mic with auto-leveling & noise reduction. The 2026 upgrade to the podcaster's gold standard.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/51h3FjKygML._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DJY8R8ZP?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Stream Deck MK.2 — Creator Command Center",
    description: "15 programmable LCD keys for streaming, editing & workflow automation. The essential creator tool of 2026.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/61dnrBMaYZL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Ring Light — Pro Studio Lighting",
    description: "Edge-lit LED ring with app control & camera mount. Perfect glow for content creators, streamers & video calls.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/51GXosfRdKL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CLDD14VG?tag=moderntechs0c-20",
  },
  {
    title: "Sony ZV-1 II — Vlog Camera for Creators",
    description: "Ultra-wide 18mm lens, cinematic bokeh & directional 3-capsule mic. Built for YouTube, TikTok & live streaming.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/61V+x6UClZL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0C5CCJNT3?tag=moderntechs0c-20",
  },
  {
    title: "DJI OM 7 — Smartphone Gimbal Stabilizer",
    description: "3-axis stabilization with ActiveTrack 6.0 & gesture control. Cinematic solo shoots from your phone.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/51d4YKfKY1L._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DNNKMJ3V?tag=moderntechs0c-20",
  },
  {
    title: "Rode PodMic USB — Dynamic Broadcast Microphone",
    description: "Broadcast-quality USB/XLR mic with built-in pop filter. Plug and play for podcasts, streams & voiceovers.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/71FYaOwWJGL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0BX2SZ1SM?tag=moderntechs0c-20",
  },
];

const pinterestPins = [
  {
    title: "Shure MV7+",
    subtitle: "The 2026 Podcaster's Mic",
    rating: "4.8",
    imageUrl: "https://m.media-amazon.com/images/I/51h3FjKygML._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DJY8R8ZP?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&description=Shure%20MV7%2B%20-%20Best%20Podcast%20Microphone%202026",
    saves: "3.2k",
  },
  {
    title: "Elgato Stream Deck MK.2",
    subtitle: "Creator Command Center",
    rating: "4.8",
    imageUrl: "https://m.media-amazon.com/images/I/61dnrBMaYZL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&description=Elgato%20Stream%20Deck%20MK.2%20-%20Essential%20Creator%20Tool%202026",
    saves: "4.1k",
  },
  {
    title: "Sony ZV-1 II",
    subtitle: "Vlog Camera for 2026",
    rating: "4.6",
    imageUrl: "https://m.media-amazon.com/images/I/61V+x6UClZL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0C5CCJNT3?tag=moderntechs0c-20",
    pinterestShareUrl: "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fmoderntech-store.lovable.app%2Fcreator-gear&description=Sony%20ZV-1%20II%20-%20Best%20Vlog%20Camera%202026",
    saves: "2.9k",
  },
];

const CreatorGear = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Creator Gear & Streaming Tech 2026 | Mics, Cameras & More</title>
        <meta name="description" content="Shop the hottest creator gear of 2026 — Shure MV7+, Elgato Stream Deck, Sony ZV-1 II & more. Professional podcast mics, vlog cameras & streaming essentials." />
        <meta property="og:title" content="Best Creator Gear & Streaming Tech 2026 | Mics, Cameras & More" />
        <meta property="og:description" content="Shop the hottest creator gear of 2026 — Shure MV7+, Elgato Stream Deck, Sony ZV-1 II & more." />
        <meta property="og:image" content="https://m.media-amazon.com/images/I/51h3FjKygML._AC_SX679_.jpg" />
        <meta property="og:url" content="https://moderntech.store/creator-gear" />
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
          <h1 className="text-5xl font-bold mb-4">Creator Gear 2026</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade mics, cameras & streaming tools for podcasters, YouTubers & content creators.
          </p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            As an Amazon Associate, I earn from qualifying purchases.
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
              rel="noopener noreferrer nofollow"
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
                <div className="aspect-[4/5] overflow-hidden relative">
                  <a
                    href={pin.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block w-full h-full"
                  >
                    <img
                      src={pin.imageUrl}
                      alt={`${pin.title} — best creator tech 2026 for podcasting and streaming`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </a>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3 pointer-events-none">
                    <a
                      href={pin.pinterestShareUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="pointer-events-auto flex items-center gap-1.5 bg-destructive hover:bg-destructive/90 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-200"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      Save
                    </a>
                  </div>
                  <div className="absolute bottom-3 left-3 backdrop-blur-md bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
                    ❤️ {pin.saves} saves
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-lg leading-tight">{pin.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pin.subtitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">⭐ {pin.rating}</span>
                    <a
                      href={pin.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
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

export default CreatorGear;
