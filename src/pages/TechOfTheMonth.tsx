import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import StructuredData from "@/components/StructuredData";
import {
  getTechOfTheMonth,
  canonicalTechOfTheMonthUrl,
  techOfTheMonthEntries,
} from "@/data/techOfTheMonth";

export default function TechOfTheMonth() {
  const { month } = useParams<{ month: string }>();
  const entry = useMemo(() => (month ? getTechOfTheMonth(month) : undefined), [month]);

  if (!entry) return <Navigate to="/weekly-edit" replace />;

  const canonical = canonicalTechOfTheMonthUrl(entry.slug);
  const ogImage = `https://moderntech.store${entry.image.url}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{entry.title}</title>
        <meta name="description" content={entry.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={entry.ogTitle} />
        <meta property="og:description" content={entry.ogDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content={String(entry.image.width)} />
        <meta property="og:image:height" content={String(entry.image.height)} />
        <meta property="article:section" content="Tech of the Month" />
        <meta property="article:published_time" content={entry.publishedDate} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={entry.ogTitle} />
        <meta name="twitter:description" content={entry.ogDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <StructuredData
        title={entry.ogTitle}
        description={entry.metaDescription}
        path={`/tech-of-the-month/${entry.slug}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Modern Tech: Weekly Edit", path: "/weekly-edit" },
          { name: `Tech of the Month · ${entry.monthLabel}`, path: `/tech-of-the-month/${entry.slug}` },
        ]}
        extraGraph={[
          {
            "@type": "Article",
            "@id": `${canonical}#article`,
            headline: entry.title,
            description: entry.metaDescription,
            image: [ogImage],
            datePublished: entry.publishedDate,
            dateModified: entry.publishedDate,
            mainEntityOfPage: canonical,
            author: { "@id": "https://moderntech.store/#organization" },
            publisher: { "@id": "https://moderntech.store/#organization" },
          },
        ]}
      />

      <Navigation />

      <div className="w-full border-b border-border">
        <img
          src={entry.image.url}
          alt={entry.image.alt}
          className="w-full h-[42vh] md:h-[56vh] object-cover"
          loading="eager"
          width={entry.image.width}
          height={entry.image.height}
        />
      </div>

      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-8 pt-16 pb-10">
          <Link
            to="/weekly-edit"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> Modern Tech: Weekly Edit
          </Link>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
            Tech of the Month · {entry.monthLabel}
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl italic tracking-tight leading-[1.08] max-w-3xl"
            style={{ fontWeight: 700, color: "#000000" }}
          >
            {entry.tagline}
          </h1>
          <p className="mt-6 font-mono text-xs text-muted-foreground max-w-xl leading-relaxed flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {new Date(entry.publishedDate).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-8 py-16 lg:py-20">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground mb-14">
          {entry.intro}
        </p>

        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
            The Picks
          </h2>
          <ol className="space-y-10">
            {entry.picks.map((pick, i) => (
              <li key={pick.name} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    {pick.category}
                  </p>
                  <h3
                    className="font-serif text-2xl md:text-3xl italic tracking-tight mb-3"
                    style={{ fontWeight: 700, color: "#000000" }}
                  >
                    {pick.name}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {pick.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {techOfTheMonthEntries.length > 1 && (
          <section className="mt-20 pt-10 border-t border-border">
            <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Past Editions
            </h2>
            <ul className="space-y-3">
              {techOfTheMonthEntries
                .filter((e) => e.slug !== entry.slug)
                .map((e) => (
                  <li key={e.slug}>
                    <Link
                      to={`/tech-of-the-month/${e.slug}`}
                      className="font-mono text-xs text-foreground/80 hover:text-foreground underline underline-offset-4"
                    >
                      {e.monthLabel} — {e.tagline}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </article>

      <AffiliateFooter />
    </div>
  );
}
