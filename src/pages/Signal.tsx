import Navigation from "@/components/Navigation";
import { AffiliateFooter } from "@/components/AffiliateFooter";
import { Link } from "react-router-dom";

const signalEntries = [
  {
    log: "LOG 003",
    date: "03.13.26",
    title: "The Smart Ring Wars Are Just Getting Started",
    excerpt:
      "Samsung, Oura, and Ultrahuman are locked in a three-way battle for your finger. Here's what actually matters — and what's just marketing.",
    category: "WEARABLES",
    slug: "/blog",
  },
  {
    log: "LOG 002",
    date: "03.06.26",
    title: "Why Every Creator Needs a Secondary Audio Source",
    excerpt:
      "Rode's new PodMic USB just changed the game for backup recording. We break down why redundancy is the most underrated creator skill.",
    category: "CREATOR TOOLS",
    slug: "/blog",
  },
  {
    log: "LOG 001",
    date: "02.27.26",
    title: "Mesh Wi-Fi in 2026: The Only Three Systems Worth Buying",
    excerpt:
      "We tested 14 mesh systems over 90 days. The results were decisive — and surprising. Spoiler: the most expensive option didn't win.",
    category: "CONNECTIVITY",
    slug: "/blog",
  },
];

const Signal = () => {
  return (
    <div className="vogue-theme min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-8 pt-24 pb-16">
        <div className="border-t border-b border-foreground/20" style={{ borderWidth: "0.5px" }}>
          <div className="py-12 text-center">
            <h1
              className="font-serif text-6xl md:text-8xl tracking-tight"
              style={{ fontWeight: 400 }}
            >
              SIGNAL
            </h1>
            <p
              className="font-mono mt-4 text-muted-foreground"
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              the essential tech updates you actually need
            </p>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="max-w-[800px] mx-auto px-8 pb-32">
        <div className="flex flex-col">
          {signalEntries.map((entry, i) => (
            <Link
              key={i}
              to={entry.slug}
              className="group block border-b border-foreground/10 py-12 first:pt-0 transition-colors hover:bg-accent/20"
              style={{ borderWidth: "0.5px" }}
            >
              {/* Log line */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-mono text-muted-foreground"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {entry.log}
                </span>
                <span
                  className="font-mono text-muted-foreground/50"
                  style={{ fontSize: "9px", letterSpacing: "0.15em" }}
                >
                  //
                </span>
                <span
                  className="font-mono text-muted-foreground"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                  }}
                >
                  {entry.date}
                </span>
              </div>

              {/* Category */}
              <span
                className="font-mono text-primary/70 mb-3 block"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {entry.category}
              </span>

              {/* Title */}
              <h2
                className="font-serif text-2xl md:text-3xl tracking-tight mb-4 group-hover:text-primary transition-colors"
                style={{ fontWeight: 400, lineHeight: 1.2 }}
              >
                {entry.title}
              </h2>

              {/* Excerpt */}
              <p
                className="text-muted-foreground max-w-[600px] leading-relaxed"
                style={{ fontSize: "14px" }}
              >
                {entry.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Signal;
