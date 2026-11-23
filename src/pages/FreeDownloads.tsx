import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

/** Add new free downloads here; each card links to its own page. */
const DOWNLOADS = [
  {
    title: "Kid's First Tablet Setup: Free Step-by-Step Handout",
    subtitle: "Bedtime schedule, Ask to Buy, and Contacts Only, step by step for iPad and Amazon Fire Kids tablets. Large print, 4 pages, easy to print.",
    to: "/free-downloads/kids-tablet-handout",
  },
  { title: "Screen-Free Kids Tech Guide", subtitle: "A free guide for families.", to: "/free-screen-free-kids-guide" },
  { title: "Smart Home Safety Checklist", subtitle: "A free checklist for parents.", to: "/free-smart-home-checklist" },
  { title: "Smart Ring Buyer's Guide", subtitle: "A free buyer's guide.", to: "/free-smart-ring-guide" },
  { title: "Creator Gear Starter Kit", subtitle: "A free starter guide.", to: "/free-creator-gear-guide" },
  { title: "Dorm Room Tech Setup", subtitle: "A free setup guide.", to: "/free-dorm-room-guide" },
];

const FreeDownloads = () => (
  <div className="min-h-screen vogue-theme bg-background text-foreground">
    <Helmet>
      <title>Free Downloads | Modern Tech LLC</title>
      <meta name="description" content="Free, printable, large-print guides from The Art of Modern Tech podcast." />
      <link rel="canonical" href="https://moderntech.store/free-downloads" />
    </Helmet>
    <Navigation />
    <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="font-serif text-4xl md:text-5xl mb-4">Free Downloads</h1>
      <p className="text-lg text-muted-foreground mb-12">Free, printable, large-print guides from The Art of Modern Tech podcast</p>
      <ul className="grid gap-6 md:grid-cols-2">
        {DOWNLOADS.map((d) => (
          <li key={d.to}>
            <Link to={d.to} className="block h-full border border-border p-6 transition-colors hover:bg-secondary/40">
              <h2 className="font-serif text-2xl mb-2">{d.title}</h2>
              <p className="text-base text-muted-foreground">{d.subtitle}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
    <AffiliateFooter />
  </div>
);

export default FreeDownloads;
