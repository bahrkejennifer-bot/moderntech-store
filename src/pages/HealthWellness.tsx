import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    title: "Apple Watch Series 9",
    description: "Advanced health monitoring with ECG, blood oxygen, and fitness tracking",
    price: "$399.00",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0CHX9CY7W?tag=moderntechs0c-20",
  },
  {
    title: "Fitbit Charge 6",
    description: "Health and fitness tracker with built-in GPS and heart rate monitoring",
    price: "$159.95",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1575390260582-cf5f64c2a6e4?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0CCQQ5M7V?tag=moderntechs0c-20",
  },
  {
    title: "Theragun Prime Massage Gun",
    description: "Percussive therapy device for deep muscle treatment and recovery",
    price: "$299.00",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B083JZWLYX?tag=moderntechs0c-20",
  },
  {
    title: "Withings Body+ Smart Scale",
    description: "WiFi body composition scale with multi-user recognition",
    price: "$99.95",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B071XHZQ7J?tag=moderntechs0c-20",
  },
  {
    title: "Philips SmartSleep Wake-Up Light",
    description: "Sunrise alarm clock with colored light simulation and FM radio",
    price: "$109.99",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1595232457020-d87c3efb0c13?w=500&auto=format",
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
