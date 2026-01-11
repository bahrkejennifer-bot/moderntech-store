import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Loader2, LogIn, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface Purchase {
  id: string;
  purchased_at: string;
  product: {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    pdf_path: string | null;
  };
}

const MyDownloads = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPurchases(session.user.email);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPurchases = async (email: string | undefined) => {
    if (!email) {
      setLoading(false);
      return;
    }

    try {
      // Use secure view that excludes customer_email
      const { data, error } = await supabase
        .from("my_purchases")
        .select(`
          id,
          purchased_at,
          product_id
        `)
        .order("purchased_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error);
        toast({
          title: "Error",
          description: "Failed to load your purchases.",
          variant: "destructive",
        });
        return;
      }

      // Fetch product details separately
      const productIds = (data || []).map((p: any) => p.product_id);
      if (productIds.length === 0) {
        setPurchases([]);
        return;
      }

      const { data: products, error: productsError } = await supabase
        .from("digital_products")
        .select("id, title, description, slug, pdf_path")
        .in("id", productIds);

      if (productsError) {
        console.error("Error fetching products:", productsError);
        toast({
          title: "Error",
          description: "Failed to load your purchases.",
          variant: "destructive",
        });
        return;
      }

      // Map products to purchases
      const productMap = new Map((products || []).map((p: any) => [p.id, p]));
      const validPurchases = (data || [])
        .map((p: any) => ({
          id: p.id,
          purchased_at: p.purchased_at,
          product: productMap.get(p.product_id),
        }))
        .filter((p: any) => p.product !== undefined);
      
      setPurchases(validPurchases);
    } catch (err) {
      console.error("Error fetching purchases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (purchase: Purchase) => {
    if (!purchase.product.pdf_path) {
      toast({
        title: "Download Unavailable",
        description: "This product doesn't have a downloadable file yet.",
        variant: "destructive",
      });
      return;
    }

    setDownloadingId(purchase.id);

    try {
      // Use secure edge function that verifies purchase ownership
      const { data, error } = await supabase.functions.invoke("generate-download-link", {
        body: { productId: purchase.product.id },
      });

      if (error) {
        throw error;
      }

      if (data?.signedUrl) {
        const link = document.createElement("a");
        link.href = data.signedUrl;
        link.download = purchase.product.title + ".pdf";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: "Your file is downloading.",
        });
      } else {
        throw new Error(data?.error || "Failed to generate download URL");
      }
    } catch (err) {
      console.error("Error generating download URL:", err);
      toast({
        title: "Download Failed",
        description: "Unable to generate download link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <LogIn className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold font-display mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to view your purchased downloads.
            </p>
            <Button asChild size="lg">
              <Link to="/admin/auth">Sign In</Link>
            </Button>
          </div>
        </div>
        <AffiliateFooter />
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
              <h1 className="text-3xl font-bold font-display mb-2">My Downloads</h1>
              <p className="text-muted-foreground">
                Access your purchased digital products
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => fetchPurchases(user.email)}
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {purchases.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                <h2 className="text-xl font-semibold mb-2">No Purchases Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't purchased any digital products yet.
                </p>
                <Button asChild>
                  <Link to="/digital-products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <Card key={purchase.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-1 p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg">
                          {purchase.product.title}
                        </CardTitle>
                        {purchase.product.description && (
                          <CardDescription className="line-clamp-2">
                            {purchase.product.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <p className="text-sm text-muted-foreground">
                        Purchased on{" "}
                        {new Date(purchase.purchased_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6 bg-muted/30 sm:w-48">
                      <Button
                        onClick={() => handleDownload(purchase)}
                        disabled={downloadingId === purchase.id || !purchase.product.pdf_path}
                        className="w-full sm:w-auto"
                      >
                        {downloadingId === purchase.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        Download
                      </Button>
                    </div>
                  </div>
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

export default MyDownloads;
