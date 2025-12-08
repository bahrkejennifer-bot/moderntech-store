import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import ekrinBantamImage from "@/assets/products/ekrin-bantam.jpg";
import withingsScaleImage from "@/assets/products/withings-scale.jpg";
import philipsWakeupImage from "@/assets/products/philips-wakeup-light.jpg";

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
    imageUrl: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&auto=format",
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
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B08G8XBGVK?tag=moderntechs0c-20",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthWellness;
