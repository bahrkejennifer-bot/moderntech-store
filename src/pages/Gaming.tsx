import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";

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
    title: "Razer DeathAdder V3 Gaming Mouse",
    description: "Ergonomic wired gaming mouse with 30,000 DPI optical sensor",
    price: "$69.99",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0B5Q5Q7PX?tag=moderntechs0c-20",
  },
  {
    title: "SteelSeries Arctis Nova Pro Wireless",
    description: "Premium wireless gaming headset with active noise cancellation",
    price: "$349.99",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B09ZV77TYN?tag=moderntechs0c-20",
  },
  {
    title: "Logitech G Pro X Superlight 2",
    description: "Ultra-lightweight wireless gaming mouse with HERO 2 sensor",
    price: "$159.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0CL5FB87M?tag=moderntechs0c-20",
  },
  {
    title: "ASUS ROG Swift OLED Gaming Monitor",
    description: "27-inch 1440p OLED gaming monitor with 240Hz refresh rate",
    price: "$899.99",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B0BXCFWKS7?tag=moderntechs0c-20",
  },
  {
    title: "Xbox Series X",
    description: "Most powerful Xbox console with 4K gaming at 60-120 FPS",
    price: "$499.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&auto=format",
    affiliateLink: "https://www.amazon.com/dp/B08H75RTZ8?tag=moderntechs0c-20",
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
