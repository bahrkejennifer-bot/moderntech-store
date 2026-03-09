import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import heroBackground from "@/assets/hero-background.png";
import ouraRingImage from "@/assets/heroes/oura-ring-hero.jpg";
import eeroMeshImage from "@/assets/heroes/eero-mesh-hero.jpg";
import streamDeckImage from "@/assets/heroes/streamdeck-hero.jpg";
import ouraRing4Image from "@/assets/products/oura-ring-4.jpg";
import ouraChargingDockImage from "@/assets/products/oura-charging-dock.jpg";
import ouraSizingKitImage from "@/assets/products/oura-sizing-kit.jpg";

const heroSections = [
  {
    heading: "Health. Redefined.",
    caption: "Your health, at a glance.",
    image: ouraRingImage,
    alt: "Oura Ring 4 — smart health tracking ring",
    link: "/health-wellness",
  },
  {
    heading: "Fast. Secure. Invisible.",
    caption: "Whole-home mesh WiFi that disappears into your life.",
    image: eeroMeshImage,
    alt: "Eero Max 7 mesh WiFi router",
    link: "/home-safety",
  },
  {
    heading: "Power your creativity.",
    caption: "The ultimate command center for creators.",
    image: streamDeckImage,
    alt: "Elgato Stream Deck MK.2 in white",
    link: "/creator-gear",
  },
];

const featuredProducts = [
  {
    title: "Oura Ring 4",
    caption: "Premium Health Tracking",
    image: ouraRing4Image,
    alt: "Oura Ring 4 smart health ring",
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
  },
  {
    title: "Oura Charging Dock",
    caption: "Stay Powered Anywhere",
    image: ouraChargingDockImage,
    alt: "Oura Ring charging dock",
    affiliateLink: "https://www.amazon.com/dp/B0DHXXKQ8G?tag=moderntechs0c-20",
  },
  {
    title: "Oura Sizing Kit",
    caption: "Start Here for the Perfect Fit",
    image: ouraSizingKitImage,
    alt: "Oura Ring sizing kit with multiple ring sizes",
    affiliateLink: "https://www.amazon.com/dp/B0C7JHBJQT?tag=moderntechs0c-20",
    highlight: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main hero — large statement */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroBackground} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <h1 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground text-center leading-[0.95] max-w-4xl">
          The tech that{" "}
          <span className="gradient-text">changes everything.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-xl">
          Curated products for health, home, and creativity — handpicked by real people, not algorithms.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            to="/health-wellness"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-border text-foreground text-sm font-medium hover:bg-card transition-all duration-200"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* Category hero sections */}
      {heroSections.map((section, i) => (
        <section
          key={i}
          className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative"
        >
          {/* Subtle divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 glow-line" />

          <div className="w-full max-w-md mb-12 rounded-3xl overflow-hidden">
            <img
              src={section.image}
              alt={section.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground text-center leading-tight">
            {section.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-md">
            {section.caption}
          </p>

          <Link
            to={section.link}
            className="mt-6 inline-flex items-center text-primary text-base font-medium hover:underline underline-offset-4 transition-colors"
          >
            Learn more <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>
      ))}

      {/* Featured Tech Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 glow-line" />

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground text-center mb-4">
            Featured Tech
          </h2>
          <p className="text-muted-foreground text-center mb-4 max-w-md mx-auto text-lg">
            Find your perfect fit before you buy.
          </p>
          <p className="text-xs text-muted-foreground/50 text-center mb-20">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.title}
                className="flex flex-col items-center text-center group rounded-2xl bg-card p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                {/* Product image */}
                <div className="w-full aspect-square mb-6 overflow-hidden rounded-xl bg-muted/20">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {product.caption}
                </p>

                {/* Highlight */}
                {product.highlight && (
                  <p className="text-xs text-primary font-semibold mb-4 tracking-wide uppercase">
                    ★ Most buyers start here
                  </p>
                )}

                {/* CTA */}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-elegant transition-all duration-300"
                >
                  View on Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
