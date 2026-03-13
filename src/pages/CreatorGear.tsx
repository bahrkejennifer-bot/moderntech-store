import { Helmet } from "react-helmet-async";
import ProductCard from "@/components/ProductCard";
import VogueCategoryLayout from "@/components/VogueCategoryLayout";

import shureMv7Img from "@/assets/products/shure-mv7-plus.jpg";
import elgatoStreamDeckImg from "@/assets/products/elgato-stream-deck-mk2.jpg";
import elgatoRingLightImg from "@/assets/products/elgato-ring-light.jpg";
import sonyZv1Img from "@/assets/products/sony-zv1-ii.jpg";
import djiOm7Img from "@/assets/products/dji-om7-gimbal.jpg";
import rodePodmicImg from "@/assets/products/rode-podmic-usb.jpg";

const products = [
  {
    title: "Shure MV7+ Podcast Microphone",
    description: "USB/XLR dynamic mic with auto-leveling & noise reduction. The 2026 upgrade to the podcaster's gold standard.",
    rating: 4.8,
    imageUrl: shureMv7Img,
    affiliateLink: "https://www.amazon.com/dp/B0DJY8R8ZP?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Stream Deck MK.2",
    description: "15 programmable LCD keys for streaming, editing & workflow automation. The essential creator tool.",
    rating: 4.8,
    imageUrl: elgatoStreamDeckImg,
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Ring Light — Pro Studio Lighting",
    description: "Edge-lit LED ring with app control & camera mount. Perfect glow for creators, streamers & video calls.",
    rating: 4.6,
    imageUrl: elgatoRingLightImg,
    affiliateLink: "https://www.amazon.com/dp/B0CLDD14VG?tag=moderntechs0c-20",
  },
  {
    title: "Sony ZV-1 II — Vlog Camera",
    description: "Ultra-wide 18mm lens, cinematic bokeh & directional 3-capsule mic. Built for YouTube, TikTok & live streaming.",
    rating: 4.6,
    imageUrl: sonyZv1Img,
    affiliateLink: "https://www.amazon.com/dp/B0C5CCJNT3?tag=moderntechs0c-20",
  },
  {
    title: "DJI OM 7 — Smartphone Gimbal",
    description: "3-axis stabilization with ActiveTrack 6.0 & gesture control. Cinematic solo shoots from your phone.",
    rating: 4.7,
    imageUrl: djiOm7Img,
    affiliateLink: "https://www.amazon.com/dp/B0DNNKMJ3V?tag=moderntechs0c-20",
  },
  {
    title: "Røde PodMic USB — Broadcast Microphone",
    description: "Broadcast-quality USB/XLR mic with built-in pop filter. Plug and play for podcasts & voiceovers.",
    rating: 4.7,
    imageUrl: rodePodmicImg,
    affiliateLink: "https://www.amazon.com/dp/B0BX2SZ1SM?tag=moderntechs0c-20",
  },
];

const CreatorGear = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Best Creator Gear & Streaming Tech 2026 | Mics, Cameras & More</title>
        <meta name="description" content="Shop the hottest creator gear of 2026 — Shure MV7+, Elgato Stream Deck, Sony ZV-1 II & more." />
      </Helmet>
      <VogueCategoryLayout
        title="Creator Studio"
        subtitle="Professional microphones, cameras, stream decks & lighting — the tools behind great content."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </VogueCategoryLayout>
    </div>
  );
};

export default CreatorGear;
