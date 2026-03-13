import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import ps5Img from "@/assets/products/ps5-slim-digital.jpg";
import steamDeckImg from "@/assets/products/steam-deck-oled.jpg";
import steelseriesImg from "@/assets/products/steelseries-arctis-nova-pro.jpg";
import razerMouseImg from "@/assets/products/razer-deathadder-v3.jpg";
import asusMonitorImg from "@/assets/products/asus-rog-swift-oled.jpg";
import xboxControllerImg from "@/assets/products/xbox-elite-controller.jpg";

const products = [
  {
    title: "PlayStation 5 Slim — Digital Edition",
    description: "Next-gen gaming with 4K graphics, ray tracing & ultra-fast SSD. The hottest console of 2026.",
    rating: 4.9,
    imageUrl: ps5Img,
    affiliateLink: "https://www.amazon.com/dp/B0CL61F39H?tag=moderntechs0c-20",
  },
  {
    title: "Steam Deck OLED — Portable Gaming PC",
    description: "7.4-inch HDR OLED display with 90Hz refresh. Play your entire Steam library anywhere.",
    rating: 4.8,
    imageUrl: steamDeckImg,
    affiliateLink: "https://www.amazon.com/dp/B0DFDJSM46?tag=moderntechs0c-20",
  },
  {
    title: "SteelSeries Arctis Nova Pro Wireless",
    description: "Hi-Fi audio with Active Noise Cancellation & Infinity Power System. Multi-system support.",
    rating: 4.6,
    imageUrl: steelseriesImg,
    affiliateLink: "https://www.amazon.com/dp/B09ZWMHSD8?tag=moderntechs0c-20",
  },
  {
    title: "Razer DeathAdder V3 — Gaming Mouse",
    description: "63g ultralight with Focus Pro 35K sensor & 90-hour battery. The esports standard.",
    rating: 4.7,
    imageUrl: razerMouseImg,
    affiliateLink: "https://www.amazon.com/dp/B0CQR2WLRM?tag=moderntechs0c-20",
  },
  {
    title: "ASUS ROG Swift OLED PG27AQDP",
    description: "1440p OLED with 240Hz refresh & 0.03ms response. Esports-grade visuals.",
    rating: 4.9,
    imageUrl: asusMonitorImg,
    affiliateLink: "https://www.amazon.com/dp/B0D5DTCKJ3?tag=moderntechs0c-20",
  },
  {
    title: "Xbox Elite Controller Series 2 Core",
    description: "Adjustable-tension thumbsticks, shorter hair trigger locks & rechargeable battery.",
    rating: 4.6,
    imageUrl: xboxControllerImg,
    affiliateLink: "https://www.amazon.com/dp/B0B6JM5DSK?tag=moderntechs0c-20",
  },
];

const Gaming = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Gaming Tech 2026 | PS5, Steam Deck OLED, Monitors & More</title>
        <meta name="description" content="Shop the hottest gaming tech of 2026 — PS5 Slim, Steam Deck OLED, ASUS ROG OLED monitors & pro peripherals." />
      </Helmet>
      <VogueCategoryLayout
        title="Gaming"
        subtitle="Consoles, OLED monitors, pro peripherals & controllers — the competitive edge, curated."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default Gaming;
