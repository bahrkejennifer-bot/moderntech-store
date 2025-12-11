import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import airpodsProImage from "@/assets/products/airpods-pro-2.jpg";
import samsungBudsImage from "@/assets/products/samsung-galaxy-buds2-pro.jpg";
import tplinkRouterImage from "@/assets/products/tplink-ax3000-router.jpg";
import acerChargingImage from "@/assets/products/acer-s2-charging-station.jpg";
import googleNestWifiImage from "@/assets/products/google-nest-wifi-pro.jpg";

const products = [
  {
    title: "Apple AirPods Pro (2nd Gen)",
    description: "Active noise cancellation with adaptive transparency and spatial audio",
    price: "$249.00",
    rating: 4.8,
    imageUrl: airpodsProImage,
    affiliateLink: "https://amzn.to/4aF9xY9",
  },
  {
    title: "Samsung Galaxy Buds2 Pro",
    description: "Premium wireless earbuds with intelligent ANC and Hi-Fi sound",
    price: "$229.99",
    rating: 4.6,
    imageUrl: samsungBudsImage,
    affiliateLink: "https://amzn.to/44eXP2B",
  },
  {
    title: "TP-Link WiFi 6 Router AX3000",
    description: "Fast wireless router with dual-band and advanced security features",
    price: "$89.99",
    rating: 4.7,
    imageUrl: tplinkRouterImage,
    affiliateLink: "https://amzn.to/4iLc1Gp",
  },
  {
    title: "Acer S2 3-in-1 Charging Station",
    description: "Qi2 15W MagSafe charger stand for iPhone, Apple Watch & AirPods",
    price: "$49.99",
    rating: 4.6,
    imageUrl: acerChargingImage,
    affiliateLink: "https://amzn.to/3Y2jhVb",
  },
  {
    title: "Google Nest WiFi Pro 6E - 3 Pack",
    description: "Reliable mesh WiFi system with fast speed and whole home coverage",
    price: "$399.99",
    rating: 4.6,
    imageUrl: googleNestWifiImage,
    affiliateLink: "https://amzn.to/48J9F6y",
  },
  {
    title: "Tile Pro Bluetooth Tracker",
    description: "Item finder with replaceable battery and 400ft range",
    price: "$34.99",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B09B2WPZP7?tag=moderntechs0c-20",
  },
];

const Connectivity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Staying Connected Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected anywhere with wireless audio, networking, and tracking devices
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

export default Connectivity;
