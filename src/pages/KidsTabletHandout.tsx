import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveSubscriber } from "@/lib/subscribers";
import { supabase } from "@/integrations/supabase/client";
import styles from "./tabletEditorial.module.css";

const SLUG = "kids-tablet-handout";
const CONSENT_LINE = "Get the free handout plus weekly finds from The Edit. Unsubscribe anytime.";
const URL_CANONICAL = "https://moderntech.store/free-downloads/kids-tablet-handout";

const bullets = [
  "Set a bedtime schedule (Downtime / Fire Kids time limits)",
  "Turn on Ask to Buy so no surprise purchases",
  "Set Contacts Only so only family can call or message",
];

const KidsTabletHandout = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await saveSubscriber({ email, name, freebie: SLUG, consent: true, consentText: CONSENT_LINE, sourcePage: "/free-downloads/kids-tablet-handout" });
      if (!res.ok) return setError(res.error || "Please try again.");
      const { data, error: linkError } = await supabase.functions.invoke("get-kids-tablet-handout", {
        body: { email: email.trim().toLowerCase(), name: name.trim() },
      });
      if (linkError || typeof data?.downloadUrl !== "string") {
        return setError("Your email is saved, but the handout link is temporarily unavailable. Please try again.");
      }
      setDownloadUrl(data.downloadUrl);
    } catch {
      setError("Your handout is temporarily unavailable. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`min-h-screen vogue-theme text-foreground text-lg ${styles.page}`}>
      <Helmet>
        <title>Kid's First Tablet Setup: Free Handout | Modern Tech LLC</title>
        <meta name="description" content="Free large-print handout: bedtime schedule, Ask to Buy, and Contacts Only for iPad and Amazon Fire Kids tablets." />
        <meta property="og:title" content="Kid's First Tablet Setup: Free Step-by-Step Handout" />
        <meta property="og:description" content="Large print, 4 pages, easy to print. From The Art of Modern Tech podcast." />
        <link rel="canonical" href={URL_CANONICAL} />
      </Helmet>
      <Navigation />
      <main className={`container mx-auto px-4 py-16 md:py-24 max-w-5xl grid gap-12 lg:grid-cols-2 ${styles.main}`}>
        <section>
          <h1 className="font-serif text-4xl md:text-6xl mb-3">Kid's First Tablet Setup</h1>
          <p className="text-2xl mb-6">Free Step-by-Step Handout</p>
          <ul className="space-y-4 mb-8">
            {bullets.map((b) => (
              <li key={b} className="border-l-2 border-border pl-4 leading-relaxed">{b}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">From the episode of The Art of Modern Tech podcast.</p>
        </section>
        <section className="border border-border bg-card p-6 md:p-8">
          {downloadUrl ? (
            <div className="space-y-5">
              <h2 className="font-serif text-3xl">Your handout is ready</h2>
              <Button asChild size="lg" className={`w-full min-h-14 text-lg rounded-none ${styles.button}`}>
                <a href={downloadUrl} download="kids-first-tablet-handout.pdf">Download the PDF</a>
              </Button>
              <Button asChild size="lg" variant="outline" className={`w-full min-h-14 text-lg rounded-none ${styles.button}`}>
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Open &amp; Print</a>
              </Button>
              <p className="text-sm text-muted-foreground">This link expires in one hour. Enter your email again for a fresh link.</p>
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
                <Input id="th-name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className="h-14 text-lg" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{CONSENT_LINE}</p>
              {error && <p role="alert" className="text-destructive">{error}</p>}
              <Button type="submit" size="lg" disabled={busy} className={`w-full min-h-14 text-lg rounded-none ${styles.button}`}>
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
