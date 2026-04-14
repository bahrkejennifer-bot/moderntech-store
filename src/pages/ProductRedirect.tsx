import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProductRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) { setError(true); return; }

    const doRedirect = async () => {
      // Look up the redirect
      const { data, error: dbError } = await supabase
        .from("product_redirects")
        .select("amazon_url, search_fallback_url, product_name")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (dbError || !data) {
        // Fallback: generate an Amazon search URL from the slug
        const searchTerm = slug.replace(/-/g, " ");
        window.location.href = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=moderntechs0c-20`;
        return;
      }

      // Increment click count (fire-and-forget)
      supabase.rpc("increment_redirect_clicks" as any, { redirect_slug: slug }).then(() => {});

      // Use amazon_url if available, otherwise fallback to search
      const targetUrl = data.amazon_url || data.search_fallback_url || 
        `https://www.amazon.com/s?k=${encodeURIComponent(data.product_name)}&tag=moderntechs0c-20`;
      
      window.location.href = targetUrl;
    };

    doRedirect();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-2xl">Product Not Found</h1>
          <p className="text-muted-foreground font-mono text-sm">Redirecting to Amazon search…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-2 border-foreground border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
          Redirecting to Amazon…
        </p>
      </div>
    </div>
  );
};

export default ProductRedirect;
