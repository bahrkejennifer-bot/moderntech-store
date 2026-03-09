import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import ouraRingImage from "@/assets/heroes/oura-ring-hero.jpg";
import eeroMeshImage from "@/assets/heroes/eero-mesh-hero.jpg";
import streamDeckImage from "@/assets/heroes/streamdeck-hero.jpg";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {heroSections.map((section, i) => (
        <section
          key={i}
          className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
        >
          {/* Product image */}
          <div className="w-full max-w-lg mb-12">
            <img
              src={section.image}
              alt={section.alt}
              className="w-full h-auto object-contain"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>

          {/* Text */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-center leading-tight">
            {section.heading}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground text-center max-w-md">
            {section.caption}
          </p>

          {/* Learn More link */}
          <Link
            to={section.link}
            className="mt-5 inline-flex items-center text-primary text-base font-normal hover:underline underline-offset-4 transition-colors"
          >
            Learn more <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>
      ))}

      <AffiliateFooter />
    </div>
  );
};

export default Index;
