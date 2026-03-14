import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";

import ringDoorbellImg from "@/assets/products/ring-doorbell-plus.jpg";
import blinkOutdoorImg from "@/assets/products/blink-outdoor-4.jpg";
import eufySmartLockImg from "@/assets/products/eufy-smart-lock.jpg";
import roborockImg from "@/assets/products/roborock-s8-maxv.jpg";
import echoShow8Img from "@/assets/products/echo-show-8.jpg";
import simplisafeImg from "@/assets/products/simplisafe-8piece.jpg";

const products = [
  {
    title: "Ring Battery Doorbell Plus — Smart Video Doorbell",
    description: "1536p HD video, Head-to-Toe view & advanced motion detection. Smart home security you can install in minutes.",
    rating: 4.5,
    imageUrl: ringDoorbellImg,
    affiliateLink: "https://www.amazon.com/dp/B09WZBPX7K?tag=moderntechs0c-20",
  },
  {
    title: "Blink Outdoor 4 — Wireless Security Camera",
    description: "Wire-free HD camera with 2-year battery, person detection & Alexa integration. Smart home wellness starts here.",
    rating: 4.3,
    imageUrl: blinkOutdoorImg,
    affiliateLink: "https://www.amazon.com/dp/B0B1N5HW22?tag=moderntechs0c-20",
  },
  {
    title: "eufy Security Smart Lock C220",
    description: "Keyless entry with fingerprint unlock in 0.3s. BHMA Grade 2 certified — minimalist tech meets maximum security.",
    rating: 4.5,
    imageUrl: eufySmartLockImg,
    affiliateLink: "https://www.amazon.com/dp/B0CXKPTDRR?tag=moderntechs0c-20",
  },
  {
    title: "Roborock S8 MaxV Ultra — Robot Vacuum & Mop",
    description: "LiDAR navigation, 10,000Pa suction & auto-mop washing. The hottest smart home gadget of 2026.",
    rating: 4.7,
    imageUrl: roborockImg,
    affiliateLink: "https://www.amazon.com/dp/B0DBC8138W?tag=moderntechs0c-20",
  },
  {
    title: "Echo Show 8 (3rd Gen) — Smart Display",
    description: "8-inch HD smart display with spatial audio & smart home hub. Control your entire connected home from one screen.",
    rating: 4.6,
    imageUrl: echoShow8Img,
    affiliateLink: "https://www.amazon.com/dp/B0BLS3Y632?tag=moderntechs0c-20",
  },
  {
    title: "SimpliSafe 8-Piece Wireless Security System",
    description: "No-contract 24/7 monitoring with HD camera, sensors & keypad. Peace of mind, simplified.",
    rating: 4.4,
    imageUrl: simplisafeImg,
    affiliateLink: "https://www.amazon.com/dp/B0D4126GYJ?tag=moderntechs0c-20",
  },
];

const HomeSafety = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Smart Home Security Tech 2026 | Cameras, Locks & More</title>
        <meta name="description" content="Shop the hottest smart home security tech of 2026 — Ring doorbells, robot vacuums, fingerprint locks & wireless cameras." />
        <meta property="og:title" content="Best Smart Home Security Tech 2026 | Cameras, Locks & More" />
        <meta property="og:description" content="Shop the hottest smart home security tech of 2026 — Ring doorbells, robot vacuums, fingerprint locks & wireless cameras." />
        <meta property="og:image" content="https://moderntech.store/images/products/smart-home-safety-checklist-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/home-safety" />
        <meta property="og:type" content="website" />
      </Helmet>
      <VogueCategoryLayout
        title="Home & Safety"
        subtitle="Smart locks, security cameras, robot vacuums & connected displays — curated for the modern home."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default HomeSafety;
