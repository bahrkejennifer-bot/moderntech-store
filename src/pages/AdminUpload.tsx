import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, FileText, LogOut, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  is_free: boolean;
  pdf_path: string | null;
}

const AdminUpload = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
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
      // Defer role check to avoid deadlock
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
    
    if (data) {
      fetchProducts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("digital_products")
      .select("*")
      .order("is_free", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProducts(data || []);
  };

  const handleFileUpload = async (productId: string, slug: string, file: File) => {
    if (!file.type.includes("pdf")) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setUploading(productId);

    try {
      const filePath = `${slug}.pdf`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("digital-products")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Update product with pdf path
      const { error: updateError } = await supabase
        .from("digital_products")
        .update({ pdf_path: filePath })
        .eq("id", productId);

      if (updateError) throw updateError;

      toast({
        title: "Upload Successful",
        description: `PDF uploaded for ${slug}`,
      });

      fetchProducts();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin: Upload PDFs</h1>
          <p className="text-muted-foreground mb-8">
            Upload your PDF guides for each digital product
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : !isAdmin ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have admin privileges to access this page.
                </p>
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${product.is_free ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                            <FileText className={`h-6 w-6 ${product.is_free ? 'text-green-500' : 'text-primary'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{product.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.is_free ? "Free Download" : `$${product.price}`}
                            </p>
                            {product.pdf_path && (
                              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                <Check className="h-3 w-3" />
                                PDF uploaded: {product.pdf_path}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept=".pdf"
                            id={`file-${product.id}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(product.id, product.slug, file);
                              }
                              e.target.value = '';
                            }}
                            disabled={uploading === product.id}
                          />
                          <Button
                            variant={product.pdf_path ? "outline" : "default"}
                            disabled={uploading === product.id}
                            onClick={() => document.getElementById(`file-${product.id}`)?.click()}
                          >
                            {uploading === product.id ? (
                              <>Uploading...</>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                {product.pdf_path ? "Replace PDF" : "Upload PDF"}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <AffiliateFooter />
    </div>
  );
};

export default AdminUpload;
