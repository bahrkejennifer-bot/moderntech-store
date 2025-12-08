import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    title: "Apple MacBook Air M2",
    description: "Lightweight laptop with M2 chip, all-day battery, and stunning Retina display",
    price: "$1,099.00",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0B3C2R8MP?tag=moderntechs0c-20",
  },
  {
    title: "iPad (10th Generation)",
    description: "Versatile tablet perfect for notes, studying, and creative projects",
    price: "$349.00",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0BJLXMVMV?tag=moderntechs0c-20",
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
    </div>
  );
};

export default College;
