import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import PinterestWidgets from "@/components/PinterestWidgets";
import heroBackground from "@/assets/hero-background.png";
import ouraRingImg from "@/assets/products/oura-ring-sizing-combo.jpg";
import ringDoorbellImg from "@/assets/products/ring-doorbell-pro2.jpg";
import streamDeckImg from "@/assets/products/elgato-stream-deck-mk2.jpg";

const PINTEREST_PROFILE = "https://www.pinterest.com/moderntechllc";

const categoryProducts = [
  {
    heading: "Health & Wellness",
    product: "Oura Ring 4 — Smart Ring Fitness Tracker",
    caption: "Titanium smart ring for sleep, HRV & longevity tracking. Pro tip: grab the Sizing Kit first to find your perfect fit.",
    image: ouraRingImg,
    alt: "Oura Ring 4 smart ring fitness tracker for biohacking and sleep quality tracking 2026",
    affiliateLink: "https://www.amazon.com/dp/B0DHY5C1X1?tag=moderntechs0c-20",
    pinterestBoard: `${PINTEREST_PROFILE}/health-wellness/`,
    accentColor: "from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/30",
    categoryLink: "/health-wellness",
  },
  {
    heading: "Home & Safety",
    product: "Ring Battery Doorbell Plus — Smart Security",
    caption: "1536p HD video with Head-to-Toe view & motion detection. Smart home wellness simplified.",
    image: ringDoorbellImg,
    alt: "Ring Battery Doorbell Plus smart video doorbell for home security 2026",
    affiliateLink: "https://www.amazon.com/dp/B09WZBPX7K?tag=moderntechs0c-20",
    pinterestBoard: `${PINTEREST_PROFILE}/home-safety/`,
    accentColor: "from-amber-500 to-orange-600",
    glowColor: "shadow-amber-500/30",
    categoryLink: "/home-safety",
  },
  {
    heading: "Creator Studio",
    product: "Elgato Stream Deck MK.2 — Creator Command Center",
    caption: "15 programmable LCD keys for streaming, editing & workflow automation. The essential creator tool of 2026.",
    image: streamDeckImg,
    alt: "Elgato Stream Deck MK.2 creator command center for streaming and content creation 2026",
    affiliateLink: "https://www.amazon.com/dp/B09738CV2Q?tag=moderntechs0c-20",
    pinterestBoard: `${PINTEREST_PROFILE}/creator-gear/`,
    accentColor: "from-purple-500 to-fuchsia-600",
    glowColor: "shadow-purple-500/30",
    categoryLink: "/creator-gear",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Modern Tech 2026 — Hot-Moving Smart Tech, Wellness & Creator Gear</title>
        <meta name="description" content="Curated hot-selling Amazon tech for 2026 — smart rings, biohacking wearables, home security, creator gear & more. Handpicked by real people, not algorithms." />
      </Helmet>
      <Navigation />

      {/* TOP HALF — Hero with background image */}
      <section className="relative h-[40vh] min-h-[320px] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="Modern Tech 2026 curated technology store" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <h1 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground text-center leading-[0.95] max-w-4xl">
          The tech that{" "}
          <span className="gradient-text">changes everything.</span>
        </h1>
        <p className="relative z-10 mt-4 text-base md:text-lg text-muted-foreground text-center max-w-xl">
          Hot-moving smart tech for health, home & creativity — curated for a high-performance lifestyle in 2026.
        </p>
        <div className="relative z-10 mt-6 flex items-center gap-4">
          <Link
            to="/health-wellness"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-border text-foreground text-sm font-medium hover:bg-card transition-all duration-200"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* BOTTOM HALF — Three colorful product cards */}
      <section className="px-4 md:px-6 py-8 md:py-12">
        <p className="text-sm text-white font-medium text-center mb-8">
          As an Amazon Associate, I earn from qualifying purchases.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categoryProducts.map((item) => (
            <div
              key={item.heading}
              className={`group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover-lift hover:${item.glowColor} hover:shadow-2xl`}
            >
              {/* Category heading bar */}
              <div className={`bg-gradient-to-r ${item.accentColor} px-5 py-3 flex items-center justify-between`}>
                <Link to={item.categoryLink} className="text-white font-bold text-sm tracking-wide uppercase hover:underline underline-offset-2">
                  {item.heading}
                </Link>
                <a
                  href={item.pinterestBoard}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-white/80 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  📌 Pinterest
                </a>
              </div>

              {/* Product image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Product info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {item.product}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {item.caption}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r ${item.accentColor} text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.03]`}
                  >
                    Shop on Amazon
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={item.pinterestBoard}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:bg-card transition-all duration-200"
                  >
                    📌 Pin it
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Index;
