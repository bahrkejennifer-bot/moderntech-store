import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignalHeader from "@/components/SignalHeader";
import AffiliateFooter from "@/components/AffiliateFooter";
import { november18Edition as edition, november18Products, november18Sections } from "@/lib/november18Edition";

export default function November18Article() {
  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>{edition.title} | Modern Tech LLC</title>
        <meta name="description" content={edition.excerpt} />
        <meta property="og:title" content={edition.title} />
        <meta property="og:description" content={edition.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={edition.date} />
        <link rel="canonical" href={`https://moderntech.store/the-edit/${edition.slug}`} />
      </Helmet>
      <SignalHeader />
      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <Button asChild variant="link" className="px-0 mb-8"><Link to="/the-edit"><ArrowLeft />The Edit</Link></Button>
        <article data-november18-article>
          <p className="text-sm leading-relaxed text-muted-foreground">{edition.disclosure}</p>
          <header className="border-b border-border pb-10 mt-6">
            <time dateTime={edition.date} className="text-sm text-muted-foreground">November 18, 2026</time>
            <h1 className="font-serif italic font-normal text-3xl md:text-5xl leading-tight mt-4 break-words">{edition.title}</h1>
            <p className="mt-6 text-lg leading-relaxed">{edition.excerpt}</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Prices, ratings and review counts below were supplied for this November 18 edition and are not live quotes. They can change on Amazon. Check current details, compatibility and manufacturer guidance before buying.</p>
          </header>
          {november18Sections.map(section => (
            <section key={section.id} aria-labelledby={`theme-${section.id}`} className="pt-12">
              <h2 id={`theme-${section.id}`} className="font-serif italic text-3xl leading-tight">{section.title}</h2>
              <div className="mt-8 space-y-10">
                {november18Products.filter(product => product.group === section.id).map(product => (
                  <section key={product.asin} data-edition-product={product.asin} className="border-b border-border pb-10 sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                    <img src={product.imageUrl} alt={product.name} loading="lazy" className="aspect-square w-40 object-contain bg-card" />
                    <div className="min-w-0 mt-4 sm:mt-0">
                      <h3 className="text-2xl font-serif leading-snug">{product.name}</h3>
                      <p className="mt-3 text-base">${product.price} · {product.rating.toFixed(1)} stars · {product.reviews.toLocaleString("en-US")} reviews</p>
                      <p className="mt-3 leading-relaxed text-foreground/85"><span className="font-medium">Reason to buy:</span> {product.reason}</p>
                      <Button asChild className="mt-5" variant="default"><a href={product.affiliateUrl} target="_blank" rel="sponsored noopener">See it on Amazon <ExternalLink aria-hidden="true" /></a></Button>
                    </div>
                  </section>
                ))}
              </div>
              <Button asChild variant="link" className="px-0 mt-4"><Link to={section.collection}>{section.collectionLabel} <ExternalLink aria-hidden="true" /></Link></Button>
            </section>
          ))}
          <p className="mt-12 text-sm text-muted-foreground">{edition.disclosure}</p>
        </article>
      </main>
      <AffiliateFooter />
    </div>
  );
}
