import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import macbookAirImage from "@/assets/products/macbook-air-m4.jpg";
import ipadImage from "@/assets/products/ipad-10th-gen.jpg";

const products = [
  {
    title: "Apple 2025 MacBook Air 13-inch M4",
    description: "Built for Apple Intelligence with 13.6-inch Liquid Retina Display, 24GB RAM, 512GB SSD",
    price: "$1,299.00",
    rating: 4.9,
    imageUrl: macbookAirImage,
    affiliateLink: "https://amzn.to/4iMb7JO",
  },
  {
    title: "Apple iPad (10th Generation)",
    description: "A14 Bionic chip, 10.9-inch Liquid Retina Display, 256GB, Wi-Fi 6, Touch ID",
    price: "$349.00",
    rating: 4.8,
    imageUrl: ipadImage,
    affiliateLink: "https://amzn.to/494ltBE",
  },
  {
    title: "Logitech MX Keys Wireless Keyboard",
    description: "Illuminated wireless keyboard with smart typing experience",
    price: "$119.99",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07S92QBCJ?tag=moderntechs0c-20",
  },
  {
    title: "Rocketbook Smart Reusable Notebook",
    description: "Digitize handwritten notes to the cloud and reuse pages endlessly",
    price: "$34.99",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B071Y3MSRK?tag=moderntechs0c-20",
  },
  {
    title: "Anker PowerCore Portable Charger",
    description: "High-capacity 20,000mAh power bank for all-day charging on the go",
    price: "$49.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07SQ5MQ6K?tag=moderntechs0c-20",
  },
  {
    title: "Bose QuietComfort 45 Headphones",
    description: "Noise-canceling wireless headphones perfect for studying",
    price: "$329.00",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B098FKXT8L?tag=moderntechs0c-20",
  },
];

const College = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            College & School Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Essential technology to help students succeed in their academic journey
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

export default College;
