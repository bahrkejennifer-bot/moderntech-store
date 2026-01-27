import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Heart } from "lucide-react";
import ekrinBantamImage from "@/assets/products/ekrin-bantam.jpg";
import withingsScaleImage from "@/assets/products/withings-scale.jpg";
import philipsWakeupImage from "@/assets/products/philips-wakeup-light.jpg";
import fitbitCharge6Image from "@/assets/products/fitbit-charge-6.jpg";
import boseSleepbudsImage from "@/assets/products/bose-sleepbuds.jpg";
import ouraRingImage from "@/assets/products/oura-ring-gen3.jpg";

// Valentine's Day Featured Product
const featuredProduct = {
  title: "Oura Ring Gen 3",
  description: "The ultimate health tracking ring - monitors sleep, heart rate, temperature & activity. Perfect Valentine's gift for wellness lovers!",
  price: "$299.00",
  rating: 4.7,
  imageUrl: ouraRingImage,
  affiliateLink: "https://amzn.to/4bm3o3z",
};

const products = [
  {
    title: "Apple Watch Series 9",
    description: "Advanced health monitoring with ECG, blood oxygen, and fitness tracking",
    price: "$399.00",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0CHX9CY7W?tag=moderntechs0c-20",
  },
  {
    title: "Fitbit Charge 6",
    description: "Health and fitness tracker with built-in GPS and heart rate monitoring",
    price: "$159.95",
    rating: 4.6,
    imageUrl: fitbitCharge6Image,
    affiliateLink: "https://www.amazon.com/dp/B0CC62ZG1M?tag=moderntechs0c-20",
  },
  {
    title: "Ekrin Bantam Mini Massage Gun",
    description: "Compact deep tissue percussion massager with long battery life and 4 attachments",
    price: "$79.99",
    rating: 4.6,
    imageUrl: ekrinBantamImage,
    affiliateLink: "https://www.amazon.com/dp/B08M8P7ZVD?tag=moderntechs0c-20",
  },
  {
    title: "Withings Body+ Smart Scale",
    description: "WiFi body composition scale with multi-user recognition",
    price: "$99.95",
    rating: 4.5,
    imageUrl: withingsScaleImage,
    affiliateLink: "https://www.amazon.com/dp/B071XW4C5Q?tag=moderntechs0c-20",
  },
  {
    title: "Philips SmartSleep Wake-Up Light",
    description: "Sunrise alarm clock with colored light simulation and FM radio",
    price: "$109.99",
    rating: 4.4,
    imageUrl: philipsWakeupImage,
    affiliateLink: "https://www.amazon.com/dp/B0093162RM?tag=moderntechs0c-20",
  },
  {
    title: "Bose Sleepbuds II",
    description: "Sleep technology with noise-masking and relaxation sounds",
    price: "$249.95",
    rating: 4.3,
    imageUrl: boseSleepbudsImage,
    affiliateLink: "https://www.amazon.com/dp/B08FRR6Z1N?tag=moderntechs0c-20",
  },
];

const HealthWellness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Health & Wellness Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your health and improve your wellbeing with cutting-edge technology
          </p>
        </div>

        {/* Valentine's Day Featured Product */}
        <div className="mb-12 p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-2xl border border-pink-200 dark:border-pink-800">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
            <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400">Valentine's Day Special</h2>
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
          </div>
          <div className="max-w-md mx-auto">
            <ProductCard {...featuredProduct} />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            💝 Show your love with the gift of health tracking
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2 italic">
            As an Amazon Associate, I earn from qualifying purchases
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

export default HealthWellness;
