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

interface Product {
  title: string;
  category: string;
  image: string;
  alt: string;
  specs: { label: string; value: string }[];
  affiliateLink: string;
}

const products: Product[] = [
  {
    title: "Oura Ring Gen 4",
    category: "Wellness",
    image: ouraRingImg,
    alt: "Oura Ring 4 titanium smart ring",
    specs: [{ label: "Battery", value: "7 days" }, { label: "Material", value: "Titanium" }, { label: "Sensors", value: "SpO2 + HRV" }],
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
  },
  {
    title: "Sony WH-1000XM5",
    category: "Office",
    image: sonyHeadphonesImg,
    alt: "Sony WH-1000XM5 noise cancelling headphones",
    specs: [{ label: "ANC", value: "8 Mics" }, { label: "Battery", value: "30 hrs" }, { label: "Weight", value: "250g" }],
    affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=moderntechs0c-20",
  },
  {
    title: "Elgato Stream Deck MK.2",
    category: "Creator",
    image: streamDeckImg,
    alt: "Elgato Stream Deck MK.2 for creators",
    specs: [{ label: "Keys", value: "15 LCD" }, { label: "Interface", value: "USB-C" }, { label: "Profiles", value: "Unlimited" }],
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
  },
  {
    title: "Røde PodMic USB",
    category: "Creator",
    image: rodeMicImg,
    alt: "Rode PodMic USB broadcast microphone",
    specs: [{ label: "Type", value: "Dynamic" }, { label: "Output", value: "USB-C + XLR" }, { label: "Pattern", value: "Cardioid" }],
    affiliateLink: "https://www.amazon.com/dp/B0BG7KM78N?tag=moderntechs0c-20",
  },
  {
    title: "ASUS ROG Swift OLED",
    category: "Office",
    image: roboswiftImg,
    alt: "ASUS ROG Swift OLED gaming monitor",
    specs: [{ label: "Panel", value: "OLED 27″" }, { label: "Refresh", value: "240 Hz" }, { label: "Response", value: "0.03ms" }],
    affiliateLink: "https://www.amazon.com/dp/B0BVMRHZ6J?tag=moderntechs0c-20",
  },
  {
    title: "MacBook Air M4",
    category: "Office",
    image: macbookImg,
    alt: "MacBook Air M4 ultralight laptop",
    specs: [{ label: "Chip", value: "Apple M4" }, { label: "Battery", value: "18 hrs" }, { label: "Weight", value: "1.24 kg" }],
    affiliateLink: "https://www.amazon.com/dp/B0DG2R2YYJ?tag=moderntechs0c-20",
  },
];

const featuredProducts: Product[] = [
  {
    title: "Sony ZV-1 II",
    category: "Creator",
    image: sonyZvImg,
    alt: "Sony ZV-1 II vlogging camera",
    specs: [{ label: "Sensor", value: "1″ CMOS" }, { label: "Video", value: "4K 30fps" }, { label: "Lens", value: "18-50mm" }],
    affiliateLink: "https://www.amazon.com/dp/B0C5DHGQHH?tag=moderntechs0c-20",
  },
  {
    title: "WHOOP 4.0",
    category: "Wellness",
    image: whoop4Img,
    alt: "WHOOP 4.0 fitness tracker",
    specs: [{ label: "Tracking", value: "24/7 HRV" }, { label: "Battery", value: "5 days" }, { label: "Size", value: "36mm" }],
    affiliateLink: "https://www.amazon.com/dp/B0BXHF23Y5?tag=moderntechs0c-20",
  },
  {
    title: "Philips Hue Starter",
    category: "Smart Home",
    image: philipsHueImg,
    alt: "Philips Hue smart lighting starter kit",
    specs: [{ label: "Bulbs", value: "4 × E26" }, { label: "Colors", value: "16M RGB" }, { label: "Protocol", value: "Zigbee" }],
    affiliateLink: "https://www.amazon.com/dp/B096YFWLHW?tag=moderntechs0c-20",
  },
];

const categories = [
  { label: "Health & Wellness", to: "/health-wellness", desc: "Smart rings · Sleep trackers · Biohacking" },
  { label: "Creator Studio", to: "/creator-gear", desc: "Microphones · Cameras · Lighting" },
  { label: "Home & Safety", to: "/home-safety", desc: "Smart locks · Cameras · Displays" },
  { label: "Gaming", to: "/gaming", desc: "Consoles · Monitors · Peripherals" },
  { label: "College Essentials", to: "/college", desc: "Laptops · Headphones · Chargers" },
  { label: "Connectivity", to: "/connectivity", desc: "WiFi · Earbuds · Trackers" },
];

const Index = () => {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Modern Tech — Curated Premium Technology for 2026</title>
        <meta name="description" content="A curated gallery of premium tech — wellness wearables, creator tools, and office essentials. Handpicked with editorial precision." />
      </Helmet>
      <Navigation />

      {/* ── HERO — asymmetric editorial layout ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[75vh]">
        {/* Left — image */}
        <div className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Premium tech lifestyle editorial"
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>
        {/* Right — text content */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16 lg:py-24">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
            Issue 03 · Spring / Summer 2026
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-8" style={{ fontWeight: 400 }}>
            <em>The Art of</em>
            <br />
            Modern Tech
          </h1>
          <p className="font-mono text-[11px] text-muted-foreground max-w-sm leading-[1.8] mb-10">
            A curated collection of premium technology for health, creativity, and the modern workspace — selected with editorial precision.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/health-wellness"
              className="inline-flex items-center gap-3 h-12 px-8 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/blog"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
            >
              Read Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE DIVIDER — dark olive banner like Noé ── */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: 'hsl(40 10% 12%)' }}>
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-center" style={{ color: 'hsl(40 18% 91%)' }}>
          Fresh Off The Press · Curated Selection · Spring 2026 · Fresh Off The Press · Curated Selection
        </p>
      </div>

      {/* ── FEATURED 3 — asymmetric grid ── */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {featuredProducts.map((product) => (
            <a
              key={product.title}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group border-r last:border-r-0 border-border"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Spec overlay */}
                <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8">
                  <div className="space-y-3 mb-8">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between gap-10">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-background/50">{spec.label}</span>
                        <span className="font-mono text-sm font-medium text-background">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 h-10 px-6 border border-background/30 text-background font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300">
                    View Details <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="p-6 border-t border-border">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{product.category}</span>
                <h3 className="font-serif text-xl mt-1" style={{ fontStyle: "italic" }}>{product.title}</h3>
              </div>
            </a>
          ))}
        </div>

        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground text-center mt-6">
          As an Amazon Associate, I earn from qualifying purchases
        </p>
      </section>

      {/* ── FULL-WIDTH STATEMENT ── */}
      <section className="border-y border-border py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-6">You Know You're Meant For More</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
            Ready to Upgrade<br />
            to <em>Premium Tech?</em>
          </h2>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="flex items-center gap-6 mb-14">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
            The Collection
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {products.map((product) => (
            <a
              key={product.title}
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group border-b border-r border-border last:border-r-0 [&:nth-child(3n)]:border-r-0"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-5">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground bg-background/80 px-2.5 py-1">
                    {product.category}
                  </span>
                </div>
                {/* Spec overlay */}
                <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                  <div className="space-y-3 mb-8">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between gap-8">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-background/50">{spec.label}</span>
                        <span className="font-mono text-sm font-medium text-background">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 h-10 px-6 border border-background/30 text-background font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-background hover:text-foreground transition-all duration-300">
                    View Details <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg" style={{ fontStyle: "italic" }}>{product.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES — editorial grid ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-4" style={{ fontStyle: "italic", fontWeight: 400 }}>
            Explore by Category
          </h2>
          <p className="font-mono text-[9px] text-muted-foreground text-center tracking-[0.3em] uppercase mb-16">
            Curated collections for every facet of modern life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group border-b border-r border-border p-10 hover:bg-card transition-colors duration-300 [&:nth-child(3n)]:border-r-0"
              >
                <h3 className="font-serif text-2xl mb-3 group-hover:translate-x-1 transition-transform duration-300" style={{ fontStyle: "italic" }}>
                  {cat.label}
                </h3>
                <p className="font-mono text-[10px] text-muted-foreground tracking-wide leading-relaxed">
                  {cat.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground mt-6 transition-colors">
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
