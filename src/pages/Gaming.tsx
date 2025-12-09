import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import razerBasiliskImage from "@/assets/products/razer-basilisk-v3.jpg";
import steelseriesImage from "@/assets/products/steelseries-arctis-nova-pro.jpg";
import logitechMouseImage from "@/assets/products/logitech-g-pro-x-superlight.jpg";
import asusMonitorImage from "@/assets/products/asus-rog-swift-oled.jpg";
import xboxImage from "@/assets/products/xbox-series-x.jpg";

const products = [
  {
    title: "Sony PlayStation 5",
    description: "Next-gen gaming console with 4K graphics and ultra-high speed SSD",
    price: "$499.99",
    rating: 4.9,
    imageUrl: "https://m.media-amazon.com/images/I/51051FiD9UL._AC_SX679_.jpg",
    affiliateLink: "https://amzn.to/3Mnd7MI",
  },
  {
    title: "Razer Basilisk V3 35K Wired Ergonomic Gaming Mouse",
    description: "HyperScroll Tilt Wheel, 35K DPI Optical Sensor Gen 2, 13 Customizable Controls, Chroma RGB",
    price: "$89.99",
    rating: 4.7,
    imageUrl: razerBasiliskImage,
    affiliateLink: "https://amzn.to/3Yh5JoC",
  },
  {
    title: "SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
    description: "Premium Hi-Fi Drivers, Active Noise Cancellation, Infinity Power System, ClearCast Gen 2 Mic",
    price: "$349.99",
    rating: 4.6,
    imageUrl: steelseriesImage,
    affiliateLink: "https://amzn.to/3XL3ppN",
  },
  {
    title: "Logitech G Pro X Superlight Wireless Gaming Mouse",
    description: "Ultra-lightweight wireless gaming mouse with HERO 25K sensor, 70hr battery life",
    price: "$159.99",
    rating: 4.8,
    imageUrl: logitechMouseImage,
    affiliateLink: "https://amzn.to/4pqjhtU",
  },
  {
    title: "ASUS ROG Swift OLED Gaming Monitor",
    description: "27-inch 1440p OLED gaming monitor with 240Hz refresh rate",
    price: "$899.99",
    rating: 4.9,
    imageUrl: asusMonitorImage,
    affiliateLink: "https://amzn.to/3KKueHL",
  },
  {
    title: "Xbox Series X Gaming Console Bundle - 1TB SSD",
    description: "Black Xbox Console with Two Wireless Controllers (Black & White) and HDMI Cable",
    price: "$499.99",
    rating: 4.8,
    imageUrl: xboxImage,
    affiliateLink: "https://amzn.to/4rQkaOi",
  },
];

const Gaming = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Gaming Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Level up your gaming experience with the latest consoles, peripherals, and accessories
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

export default Gaming;
