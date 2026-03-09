import { Helmet } from "react-helmet-lite";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Apple MacBook Air M4 13-inch — Student Laptop 2026",
    description: "Liquid Retina Display, 24GB RAM & 18-hour battery. The #1 laptop for students — fast, light & built to last.",
    rating: 4.9,
    imageUrl: "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0DZ6B7YYH?tag=moderntechs0c-20",
  },
  {
    title: "Apple iPad 10th Generation — Student Tablet",
    description: "10.9-inch Liquid Retina, A14 chip & Apple Pencil support. Notes, textbooks & entertainment in one device.",
    rating: 4.8,
    imageUrl: "https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0BHTY6LMY?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5 — Best Headphones for Studying",
    description: "Industry-leading noise cancellation for focus. 30-hour battery & multipoint — library essential.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
  {
    title: "Anker 737 Power Bank 24,000mAh — Campus Charger",
    description: "140W output charges laptops & phones. Smart display shows remaining power — never die between classes.",
    rating: 4.6,
    imageUrl: "https://m.media-amazon.com/images/I/71BCVXSFPGL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B09VPHQGZL?tag=moderntechs0c-20",
  },
  {
    title: "Logitech MX Keys S Combo — Keyboard & Mouse",
    description: "Smart illumination, quiet keys & ergonomic mouse. The ultimate dorm desk setup for productivity.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/71f1EfPL+OL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0C2TMFJJH?tag=moderntechs0c-20",
  },
  {
    title: "Kindle Paperwhite Signature Edition — E-Reader",
    description: "6.8-inch display, wireless charging & auto-adjusting light. Read textbooks & novels without eye strain.",
    rating: 4.7,
    imageUrl: "https://m.media-amazon.com/images/I/61d2sRJBPJL._AC_SX679_.jpg",
    affiliateLink: "https://www.amazon.com/dp/B0CFPJYX2T?tag=moderntechs0c-20",
  },
];

const College = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best College & Student Tech 2026 | Laptops, Tablets & Study Gear</title>
        <meta name="description" content="Shop the best student tech of 2026 — MacBook Air M4, iPad 10th Gen, noise-canceling headphones & portable chargers. Essential campus gear that's moving fast on Amazon." />
      </Helmet>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Student & College Tech 2026
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            MacBooks, tablets, chargers & study headphones — the campus essentials flying off Amazon shelves.
          </p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            As an Amazon Associate, I earn from qualifying purchases.
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
