import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

interface ScrapedProduct {
  id: string;
  title: string;
  price: string | null;
  image_url: string | null;
  affiliate_link: string;
  created_at: string;
}

const ScrapedProducts = () => {
  const [products, setProducts] = useState<ScrapedProduct[]>([]);

  useEffect(() => {
    supabase
      .from("scraped_products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trending Products</h1>
          <p className="text-muted-foreground mb-8">
            Top picks from Amazon's best sellers
          </p>

          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden group transition-all hover:shadow-card">
                  {product.image_url && (
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.price && (
                      <p className="text-xl font-bold text-primary mb-4">{product.price}</p>
                    )}
                    <Button variant="cta" className="w-full" asChild>
                      <a
                        href={product.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        View on Amazon <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default ScrapedProducts;
