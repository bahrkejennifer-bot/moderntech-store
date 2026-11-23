import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterConsent } from "@/components/NewsletterConsent";
import { saveSubscriber } from "@/lib/subscribers";
import { isFreebieUnlocked, markFreebieUnlocked } from "@/lib/freebies";

const SLUG = "tablet-handout";
const PDF = "/downloads/kids-first-tablet-handout.pdf";
const URL_CANONICAL = "https://moderntech.store/free-downloads/kids-tablet-handout";

const bullets = [
  "Set a bedtime schedule (Downtime / Fire Kids time limits)",
  "Turn on Ask to Buy so no surprise purchases",
  "Set Contacts Only so only family can call or message",
];

const KidsTabletHandout = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(() => isFreebieUnlocked(SLUG));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await saveSubscriber({ email, name, freebie: SLUG, consent, sourcePage: "/free-downloads/kids-tablet-handout" });
    setBusy(false);
    if (!res.ok) return setError(res.error || "Please try again.");
    markFreebieUnlocked(SLUG);
    setUnlocked(true);
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground text-lg">
      <Helmet>
        <title>Kid's First Tablet Setup: Free Handout | Modern Tech LLC</title>
        <meta name="description" content="Free large-print handout: bedtime schedule, Ask to Buy, and Contacts Only for iPad and Amazon Fire Kids tablets." />
        <meta property="og:title" content="Kid's First Tablet Setup: Free Step-by-Step Handout" />
        <meta property="og:description" content="Large print, 4 pages, easy to print. From The Art of Modern Tech podcast." />
        <link rel="canonical" href={URL_CANONICAL} />
      </Helmet>
      <Navigation />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl grid gap-12 lg:grid-cols-2">
        <section>
          <h1 className="font-serif text-4xl md:text-6xl mb-3">Kid's First Tablet Setup</h1>
          <p className="text-2xl mb-6">Free Step-by-Step Handout</p>
          <ul className="space-y-4 mb-8">
            {bullets.map((b) => (
              <li key={b} className="border-l-2 border-foreground pl-4 leading-relaxed">{b}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">From the episode of The Art of Modern Tech podcast.</p>
        </section>
        <section className="border border-border p-6 md:p-8">
          {unlocked ? (
            <div className="space-y-5">
              <h2 className="font-serif text-3xl">Your handout is ready</h2>
              <Button asChild size="lg" className="w-full min-h-14 text-lg rounded-none">
                <a href={PDF} download="kids-first-tablet-handout.pdf">Download the PDF</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full min-h-14 text-lg rounded-none">
                <a href={PDF} target="_blank" rel="noopener noreferrer">Open &amp; Print</a>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h2 className="font-serif text-3xl">Get the free handout</h2>
              <div>
                <label htmlFor="th-email" className="block mb-2">Email</label>
                <Input id="th-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 text-lg" />
              </div>
              <div>
                <label htmlFor="th-name" className="block mb-2">First name (optional)</label>
                <Input id="th-name" value={name} onChange={(e) => setName(e.target.value)} className="h-14 text-lg" />
              </div>
              <NewsletterConsent checked={consent} onChange={setConsent} />
              {error && <p role="alert" className="text-destructive">{error}</p>}
              <Button type="submit" size="lg" disabled={busy} className="w-full min-h-14 text-lg rounded-none">
                {busy ? "Saving..." : "Get the handout"}
              </Button>
            </form>
          )}
        </section>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default KidsTabletHandout;
