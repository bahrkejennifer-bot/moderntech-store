import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";
import macbookImg from "@/assets/products/macbook-air-m4.jpg";
import ipadImg from "@/assets/products/ipad-10th-gen.jpg";
import sonyImg from "@/assets/products/sony-wh-1000xm5.jpg";
import ankerImg from "@/assets/products/anker-power-bank.jpg";
import logitechImg from "@/assets/products/logitech-mx-keys-combo.jpg";
import kindleImg from "@/assets/products/kindle-paperwhite-signature.jpg";

const products = [
  {
    title: "Apple MacBook Air M4 13-inch",
    description: "Liquid Retina Display, 24GB RAM & 18-hour battery. The #1 laptop for students.",
    rating: 4.9,
    imageUrl: macbookImg,
    affiliateLink: "https://www.amazon.com/dp/B0DZ6B7YYH?tag=moderntechs0c-20",
  },
  {
    title: "Apple iPad 10th Generation",
    description: "10.9-inch Liquid Retina, A14 chip & Apple Pencil support. Notes, textbooks & entertainment.",
    rating: 4.8,
    imageUrl: ipadImg,
    affiliateLink: "https://www.amazon.com/dp/B0BHTY6LMY?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5 — Study Headphones",
    description: "Industry-leading noise cancellation for focus. 30-hour battery & multipoint — library essential.",
    rating: 4.7,
    imageUrl: sonyImg,
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
  {
    title: "Anker 737 Power Bank 24,000mAh",
    description: "140W output charges laptops & phones. Smart display shows remaining power.",
    rating: 4.6,
    imageUrl: ankerImg,
    affiliateLink: "https://www.amazon.com/dp/B09VPHQGZL?tag=moderntechs0c-20",
  },
  {
    title: "Logitech MX Keys S Combo",
    description: "Smart illumination, quiet keys & ergonomic mouse. The ultimate dorm desk setup.",
    rating: 4.7,
    imageUrl: logitechImg,
    affiliateLink: "https://www.amazon.com/dp/B0C2TMFJJH?tag=moderntechs0c-20",
  },
  {
    title: "Kindle Paperwhite Signature Edition",
    description: "6.8-inch display, wireless charging & auto-adjusting light. Read without eye strain.",
    rating: 4.7,
    imageUrl: kindleImg,
    affiliateLink: "https://www.amazon.com/dp/B0CFPJYX2T?tag=moderntechs0c-20",
  },
];

const College = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best College & Student Tech 2026 | Laptops, Tablets & Study Gear</title>
        <meta name="description" content="Shop the best student tech of 2026 — MacBook Air M4, iPad 10th Gen & essential campus gear." />
        <meta property="og:title" content="Best College & Student Tech 2026 | Laptops, Tablets & Study Gear" />
        <meta property="og:description" content="Shop the best student tech of 2026 — MacBook Air M4, iPad 10th Gen & essential campus gear." />
        <meta property="og:image" content="https://moderntech.store/images/products/dorm-room-tech-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/college" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="College Essentials"
        subtitle="Laptops, tablets, headphones & chargers — the campus gear every student needs."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default College;
