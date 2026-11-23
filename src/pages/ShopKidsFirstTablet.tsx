import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { kidsTabletEpisodeProducts } from "@/lib/kidsTabletEpisode";
import styles from "./tabletEditorial.module.css";

const TITLE = "Shop this episode: Kid's First Tablet Setup | Modern Tech LLC";
const DESCRIPTION = "See the iPad, Samsung Kids Edition, Amazon Kids Tablet 8, and OtterBox EasyGrab case from The Art of Modern Tech, plus a free parental-controls handout.";

const ShopKidsFirstTablet = () => (
  <div className={`min-h-screen vogue-theme text-foreground ${styles.page}`}>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <link rel="canonical" href="https://moderntech.store/shop/kids-first-tablet" />
    </Helmet>
    <Navigation />
    <main className={`${styles.main} px-4 py-12 md:px-8 md:py-20`}>
      <div className="container mx-auto max-w-5xl">
        <header className="max-w-3xl mb-8">
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">Shop this episode: Kid's First Tablet Setup</h1>
          <p className="text-lg leading-relaxed mb-5">The tablets and case Jen and Anita mentioned on The Art of Modern Tech, so you can see them and open them on Amazon.</p>
          <p className="text-sm leading-relaxed text-muted-foreground">As an Amazon Associate, I earn from qualifying purchases.</p>
        </header>
        <Link to="/free-downloads/kids-tablet-handout" className="mb-10 flex items-start gap-3 border border-border border-l-4 bg-secondary px-5 py-5 text-secondary-foreground underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
          <FileText className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="leading-relaxed">Get the free step-by-step parental-controls handout (bedtime schedule, Ask to Buy, Contacts Only).</span>
        </Link>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {kidsTabletEpisodeProducts.map((product) => (
            <article key={product.url} className="flex min-w-0 flex-col border border-border bg-card text-card-foreground">
              <div className="aspect-square w-full bg-card p-6 md:p-8">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" width={768} height={768} />
              </div>
              <div className="flex flex-1 flex-col items-start border-t border-border p-6 md:p-8">
                <h2 className="font-serif text-2xl leading-snug mb-3">{product.name}</h2>
                <p className="text-base leading-relaxed mb-6">{product.note}</p>
                <Button asChild size="lg" className={`${styles.button} mt-auto rounded-none`}>
                  <a href={product.url} target="_blank" rel="nofollow sponsored noopener">View on Amazon <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
    <AffiliateFooter />
  </div>
);

export default ShopKidsFirstTablet;