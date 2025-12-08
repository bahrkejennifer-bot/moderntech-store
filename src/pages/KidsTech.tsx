import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import fireHd10KidsPro from "@/assets/products/fire-hd-10-kids-pro.jpg";

const products = [
  {
    title: "Amazon Fire HD 10 Kids Pro",
    description: "10.1-inch tablet for kids with parental controls and kid-friendly content",
    price: "$149.99",
    rating: 4.6,
    imageUrl: fireHd10KidsPro,
    affiliateLink: "https://amzn.to/4gNz8mJ",
  },
  {
    title: "VTech KidiZoom Smartwatch DX3",
    description: "Kids smartwatch with dual cameras, games, and activity tracking",
    price: "$59.99",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B09NNBZB1V?tag=moderntechs0c-20",
  },
  {
    title: "Osmo Genius Starter Kit",
    description: "Educational learning games for iPad with hands-on play pieces",
    price: "$99.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B01MCSIPV9?tag=moderntechs0c-20",
  },
  {
    title: "LeapFrog Learning Friends Play & Learn",
    description: "Interactive 100-word book for early learning with sound effects",
    price: "$24.99",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07F93DJ3G?tag=moderntechs0c-20",
  },
  {
    title: "Sphero BOLT Robot",
    description: "App-enabled coding robot with LED matrix and advanced sensors",
    price: "$149.99",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07FYLW8MT?tag=moderntechs0c-20",
  },
  {
    title: "JBL JR310BT Kids Headphones",
    description: "Wireless Bluetooth headphones with volume limiting for safe listening",
    price: "$39.95",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B07W5BK1X3?tag=moderntechs0c-20",
  },
];

const KidsTech = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Kids Tech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Educational and entertaining technology designed specifically for children
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

export default KidsTech;
