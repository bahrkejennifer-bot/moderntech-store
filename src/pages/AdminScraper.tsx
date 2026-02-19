import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, ExternalLink, Trash2, LogOut, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

interface ScrapedProduct {
  id: string;
  title: string;
  price: string | null;
  image_url: string | null;
  affiliate_link: string;
  source_url: string | null;
  created_at: string;
}

const AdminScraper = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin/auth");
        return;
      }
      setTimeout(() => checkAdminRole(session.user.id), 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/auth");
        return;
      }
      checkAdminRole(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
    setLoading(false);
    if (data) fetchProducts();
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("scraped_products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
  };

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("scrape-amazon", {
        body: { url: url.trim() },
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "Scraping Complete",
          description: `Found and saved ${data.count} products. Webhook sent to Make.com.`,
        });
        setUrl("");
        fetchProducts();
      } else {
        toast({
          title: "Scraping Issue",
          description: data?.error || "No products found",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Scrape error:", error);
      toast({
        title: "Scraping Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("scraped_products").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Product Deleted" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground mb-4">Admin privileges required.</p>
              <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Amazon Product Scraper</h1>
              <p className="text-muted-foreground mt-1">
                Paste an Amazon Best Sellers URL to scrape the top 5 products
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleScrape} className="flex gap-3">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.amazon.com/Best-Sellers/..."
                  required
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Scraping...</>
                  ) : (
                    <><Search className="h-4 w-4 mr-2" /> Scrape Top 5</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {products.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Scraped Products ({products.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    {product.image_url && (
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm line-clamp-2">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {product.price && (
                        <p className="text-lg font-bold text-primary mb-3">{product.price}</p>
                      )}
                      <div className="flex gap-2">
                        <Button variant="cta" size="sm" className="flex-1" asChild>
                          <a
                            href={product.affiliate_link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default AdminScraper;
