import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

// Product images
import ouraRingImg from "@/assets/products/oura-ring-4.jpg";
import sonyHeadphonesImg from "@/assets/products/sony-wh-1000xm5.jpg";
import streamDeckImg from "@/assets/products/elgato-stream-deck-mk2.jpg";
import rodeMicImg from "@/assets/products/rode-podmic-usb.jpg";
import roboswiftImg from "@/assets/products/asus-rog-swift-oled.jpg";
import macbookImg from "@/assets/products/macbook-air-m4.jpg";
import sonyZvImg from "@/assets/products/sony-zv1-ii.jpg";
import whoop4Img from "@/assets/products/whoop-4.jpg";
import philipsHueImg from "@/assets/products/philips-hue-starter-kit.jpg";
import heroImg from "@/assets/hero-tech-luxury.jpg";

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  title: string;
  category: string;
  image: string;
  alt: string;
  specs: ProductSpec[];
  affiliateLink: string;
}

const products: Product[] = [
  {
    title: "Oura Ring Gen 4",
    category: "Wellness",
    image: ouraRingImg,
    alt: "Oura Ring 4 titanium smart ring for sleep and health tracking",
    specs: [
      { label: "Battery", value: "7 days" },
      { label: "Material", value: "Titanium" },
      { label: "Sensors", value: "SpO2 + HRV" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5",
    category: "Office",
    image: sonyHeadphonesImg,
    alt: "Sony WH-1000XM5 wireless noise cancelling headphones",
    specs: [
      { label: "ANC", value: "8 Mics" },
      { label: "Battery", value: "30 hrs" },
      { label: "Weight", value: "250g" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Stream Deck MK.2",
    category: "Creator",
    image: streamDeckImg,
    alt: "Elgato Stream Deck MK.2 programmable LCD keys for creators",
    specs: [
      { label: "Keys", value: "15 LCD" },
      { label: "Interface", value: "USB-C" },
      { label: "Profiles", value: "Unlimited" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
  },
  {
    title: "Røde PodMic USB",
    category: "Creator",
    image: rodeMicImg,
    alt: "Rode PodMic USB professional broadcast microphone",
    specs: [
      { label: "Type", value: "Dynamic" },
      { label: "Output", value: "USB-C + XLR" },
      { label: "Pattern", value: "Cardioid" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0BG7KM78N?tag=moderntechs0c-20",
  },
  {
    title: "ASUS ROG Swift OLED",
    category: "Office",
    image: roboswiftImg,
    alt: "ASUS ROG Swift OLED premium gaming monitor",
    specs: [
      { label: "Panel", value: "OLED 27″" },
      { label: "Refresh", value: "240 Hz" },
      { label: "Response", value: "0.03ms" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0BVMRHZ6J?tag=moderntechs0c-20",
  },
  {
    title: "MacBook Air M4",
    category: "Office",
    image: macbookImg,
    alt: "MacBook Air M4 ultralight laptop",
    specs: [
      { label: "Chip", value: "Apple M4" },
      { label: "Battery", value: "18 hrs" },
      { label: "Weight", value: "1.24 kg" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0DG2R2YYJ?tag=moderntechs0c-20",
  },
  {
    title: "Sony ZV-1 II",
    category: "Creator",
    image: sonyZvImg,
    alt: "Sony ZV-1 II vlogging camera for content creators",
    specs: [
      { label: "Sensor", value: "1″ CMOS" },
      { label: "Video", value: "4K 30fps" },
      { label: "Lens", value: "18-50mm" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0C5DHGQHH?tag=moderntechs0c-20",
  },
  {
    title: "WHOOP 4.0",
    category: "Wellness",
    image: whoop4Img,
    alt: "WHOOP 4.0 advanced health and fitness tracker",
    specs: [
      { label: "Tracking", value: "24/7 HRV" },
      { label: "Battery", value: "5 days" },
      { label: "Size", value: "36mm" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B0BXHF23Y5?tag=moderntechs0c-20",
  },
  {
    title: "Philips Hue Starter Kit",
    category: "Smart Home",
    image: philipsHueImg,
    alt: "Philips Hue smart lighting starter kit",
    specs: [
      { label: "Bulbs", value: "4 × E26" },
      { label: "Colors", value: "16M RGB" },
      { label: "Protocol", value: "Zigbee" },
    ],
    affiliateLink: "https://www.amazon.com/dp/B096YFWLHW?tag=moderntechs0c-20",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Modern Tech — Curated Premium Technology for 2026</title>
        <meta name="description" content="A curated gallery of premium tech — wellness wearables, creator tools, and office essentials. Handpicked with editorial precision." />
      </Helmet>
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative h-[65vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Premium tech lifestyle editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Issue 03 — Spring / Summer 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light italic leading-[0.95] tracking-tight max-w-3xl">
            The Art of
            <br />
            <span className="not-italic font-medium">Modern Tech</span>
          </h1>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-lg leading-relaxed">
            A curated collection of premium technology for health, creativity, and the modern workspace — selected with editorial precision.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link
              to="/health-wellness"
              className="inline-flex items-center gap-2 h-12 px-8 border border-foreground text-foreground font-mono text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/blog"
              className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Read the Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-8 py-16 flex items-center gap-6">
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          Curated Selection
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── PRODUCT GRID ── */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-center mb-12">
          As an Amazon Associate, I earn from qualifying purchases
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border">
          {products.map((product) => (
            <div key={product.title} className="group relative border-r border-b border-border">
              {/* Category label */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {product.category}
                </span>
              </div>

              {/* Image with hover overlay */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Spec overlay on hover */}
                <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                  <div className="space-y-3 mb-8">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between gap-8">
                        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-background/60">
                          {spec.label}
                        </span>
                        <span className="font-mono text-sm font-medium text-background">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 h-10 px-6 border border-background/40 text-background font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300"
                  >
                    View Details
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Product title */}
              <div className="p-5">
                <h3 className="font-serif text-lg italic">{product.title}</h3>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-1 inline-flex items-center gap-1.5"
                >
                  Shop on Amazon <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES SECTION ── */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-8 py-20">
          <h2 className="font-serif text-4xl md:text-5xl italic text-center mb-4">
            Explore by Category
          </h2>
          <p className="font-mono text-xs text-muted-foreground text-center tracking-[0.2em] uppercase mb-14">
            Curated collections for every facet of modern life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border">
            {[
              { label: "Health & Wellness", to: "/health-wellness", desc: "Smart rings, sleep trackers, biohacking wearables" },
              { label: "Creator Studio", to: "/creator-gear", desc: "Microphones, cameras, stream decks, lighting" },
              { label: "Home & Safety", to: "/home-safety", desc: "Smart locks, cameras, lighting systems" },
              { label: "Gaming", to: "/gaming", desc: "Monitors, peripherals, consoles" },
              { label: "College Essentials", to: "/college", desc: "Laptops, headphones, study tools" },
              { label: "Connectivity", to: "/connectivity", desc: "Mesh routers, range extenders, networking" },
            ].map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group border-r border-b border-border p-8 hover:bg-accent/30 transition-colors duration-300"
              >
                <h3 className="font-serif text-xl italic mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {cat.label}
                </h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                  {cat.desc}
                </p>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground mt-4 transition-colors">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
