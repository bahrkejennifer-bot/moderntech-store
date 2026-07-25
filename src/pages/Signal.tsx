import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const formatLogDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}.${dd}.${yy}`;
};

const Signal = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["signal-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, excerpt, category, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  const entries = (posts ?? []).map((post, i) => ({
    log: `LOG ${String((posts?.length ?? 0) - i).padStart(3, "0")}`,
    date: formatLogDate(post.created_at),
    title: post.title,
    excerpt: post.excerpt ?? "",
    category: (post.category ?? "TECH").toUpperCase(),
    slug: `/weekly-edit/${post.slug}`,
  }));

  return (
    <div className="vogue-theme min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="max-w-[800px] mx-auto px-8 pt-24 pb-16">
        <div className="border-t border-b border-foreground/20" style={{ borderWidth: "0.5px" }}>
          <div className="py-12 text-center">
            <h1
              className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
              style={{ fontWeight: 400 }}
            >
              The Art of Modern Tech Weekly Review
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
        {isLoading ? (
          <div className="flex flex-col gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse border-b border-foreground/10 pb-12" style={{ borderWidth: "0.5px" }}>
                <div className="h-3 w-32 bg-muted rounded mb-6" />
                <div className="h-3 w-20 bg-muted rounded mb-3" />
                <div className="h-6 w-3/4 bg-muted rounded mb-4" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <p className="font-mono text-muted-foreground text-center" style={{ fontSize: "11px", letterSpacing: "0.15em" }}>
            NO SIGNALS YET — CHECK BACK SOON
          </p>
        ) : (
          <div className="flex flex-col">
            {entries.map((entry, i) => (
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
                    style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
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
                    style={{ fontSize: "9px", letterSpacing: "0.15em" }}
                  >
                    {entry.date}
                  </span>
                </div>

                {/* Category */}
                <span
                  className="font-mono text-primary/70 mb-3 block"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
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
        )}
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default Signal;
