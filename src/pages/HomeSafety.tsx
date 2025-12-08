import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import ringDoorbellImage from "@/assets/products/ring-doorbell-pro2.jpg";
import wyzeCamImage from "@/assets/products/wyze-cam-v3.jpg";
import echoShow8Image from "@/assets/products/echo-show-8.jpg";
import arloPro4Image from "@/assets/products/arlo-pro-4.jpg";
import augustLockImage from "@/assets/products/august-smart-lock.jpg";

const products = [
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
    title: "Amazon Echo Show 8 (2nd Gen)",
    description: "Smart display with Alexa for video calls, home control, and entertainment",
    price: "$99.99",
    rating: 4.7,
    imageUrl: echoShow8Image,
    affiliateLink: "https://www.amazon.com/dp/B0CDJFCVDD?tag=moderntechs0c-20",
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
    title: "August Smart Lock Pro",
    description: "Smart lock with built-in WiFi, auto-lock and unlock capabilities",
    price: "$229.99",
    rating: 4.3,
    imageUrl: augustLockImage,
    affiliateLink: "https://www.amazon.com/dp/B0752V8D8D?tag=moderntechs0c-20",
  },
  {
    title: "Nest Protect Smoke Detector",
    description: "Smart smoke and carbon monoxide alarm with app notifications",
    price: "$119.00",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B00XV1RCRY?tag=moderntechs0c-20",
  },
];

const HomeSafety = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Home & Safety Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect your home with the latest smart security devices and monitoring systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSafety;
