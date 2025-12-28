import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, CheckCircle, ShoppingCart, Home, Star, Monitor, Headphones, GraduationCap, Activity, Baby, BookOpen, Loader2, Briefcase } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Import cover images
import kidsTechCover from "@/assets/pdf-covers/kids-tech-guide-cover.jpg";
import smartHomeCover from "@/assets/pdf-covers/smart-home-guide-cover.jpg";
import gamingMonitorsCover from "@/assets/pdf-covers/gaming-monitors-guide-cover.jpg";
import earbudsCover from "@/assets/pdf-covers/earbuds-guide-cover.jpg";
import studentTechCover from "@/assets/pdf-covers/student-tech-guide-cover.jpg";
import fitnessTrackersCover from "@/assets/pdf-covers/fitness-trackers-guide-cover.jpg";
import remoteWorkspaceCover from "@/assets/pdf-covers/remote-workspace-guide-cover.jpg";

interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number | null;
  is_free: boolean | null;
  pdf_path: string | null;
}

// Map slugs to cover images and icons
const productMeta: Record<string, { cover: string; icon: React.ReactNode; gradient: string }> = {
  "kids-tech-guide": { cover: kidsTechCover, icon: <Baby className="h-8 w-8 text-white" />, gradient: "bg-gradient-gold" },
  "smart-home-guide": { cover: smartHomeCover, icon: <Home className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "gaming-monitors-guide": { cover: gamingMonitorsCover, icon: <Monitor className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
  "earbuds-guide": { cover: earbudsCover, icon: <Headphones className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "student-tech-guide": { cover: studentTechCover, icon: <GraduationCap className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
  "fitness-trackers-guide": { cover: fitnessTrackersCover, icon: <Activity className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "remote-workspace-guide": { cover: remoteWorkspaceCover, icon: <Briefcase className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
};

const DigitalProducts = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle success/cancel from Stripe checkout
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const productSlug = searchParams.get("product");

    if (success === "true") {
      toast({
        title: "Purchase Successful!",
        description: `Thank you for your purchase! You will receive an email with your ${productSlug?.replace(/-/g, " ") || "guide"} shortly.`,
      });
      // Clear the URL params
      setSearchParams({});
    } else if (canceled === "true") {
      toast({
        title: "Purchase Canceled",
        description: "Your purchase was canceled. Feel free to try again when you're ready.",
        variant: "destructive",
      });
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("digital_products")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleDownload = async (product: DigitalProduct) => {
    if (!product.pdf_path) {
      toast({
        title: "PDF Not Available",
        description: "This guide is not yet available for download.",
        variant: "destructive",
      });
      return;
    }

    setDownloadingId(product.id);

    try {
      const { data, error } = await supabase.storage
        .from("digital-products")
        .download(product.pdf_path);

      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${product.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started!",
        description: `Your ${product.title} guide is downloading now.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleBuy = async (product: DigitalProduct) => {
    setCheckoutLoading(product.id);
    
    try {
      const response = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: product.title,
          productSlug: product.slug,
          amount: Math.round((product.price || 10) * 100), // Convert to cents
          successUrl: `${window.location.origin}/digital-products?success=true&product=${product.slug}`,
          cancelUrl: `${window.location.origin}/digital-products?canceled=true`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { url } = response.data;
      if (url) {
        // Open in new tab to avoid iframe redirect issues
        window.open(url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: "There was an error starting checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const freeProduct = products.find((p) => p.is_free);
  const paidProducts = products.filter((p) => !p.is_free);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your Tech Buying Guide Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Navigate your next tech purchase with confidence using our curated digital guides
          </p>
        </div>

        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to Modern Tech LLC</h2>
                  <p className="text-muted-foreground mb-4">
                    Hello and welcome to Modern Tech LLC, an Amazon affiliate store. We'd like to wish all our customers a happy holiday! Our mission is simple: to build a collection of in-depth tech buying guides and blogs that help families make affordable, informed decisions. Each guide is carefully researched and designed to cut through the marketing noise, giving you and your loved ones the connection and safety you deserve. If you have any suggestions, please email us at <a href="mailto:info@moderntech.store" className="text-primary hover:underline">info@moderntech.store</a>, and we'll look into it.
                  </p>
                  <p className="text-sm text-muted-foreground/80 italic">
                    As an Amazon Associate, we earn from qualifying purchases. This means we may receive a small commission at no extra cost to you when you purchase through our affiliate links.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Free Guide Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start with our free <strong>Kids & Parents Tech Guide</strong> – perfect for parents navigating age-appropriate technology decisions.
                  </p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                    Premium Guides for Sale
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our premium guides are available for <strong>$10 each</strong> – packed with detailed reviews, comparison charts, and expert buying recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Free Product */}
          {freeProduct && (
            <Card className="mb-8 overflow-hidden border-2 border-accent">
              {/* Ribbon Header with Image and Title */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gold opacity-90" />
                <div className="relative flex items-center gap-6 p-4">
                  <img 
                    src={productMeta[freeProduct.slug]?.cover || kidsTechCover} 
                    alt={`${freeProduct.title} Cover`} 
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-lg border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-white/20 p-2 rounded-full">
                        {productMeta[freeProduct.slug]?.icon || <Baby className="h-6 w-6 text-white" />}
                      </div>
                      <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                        Free Guide
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {freeProduct.title}
                    </h2>
                    <p className="text-white/90 text-lg">
                      {freeProduct.description || "Your comprehensive guide"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content Below Ribbon */}
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Navigate the complex world of kids' technology with confidence. This comprehensive guide helps parents choose devices, apps, and services that balance education, entertainment, and safety at every developmental stage.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Age-by-age device recommendations (3-6, 7-10, 11-14, 15-18)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Parental control setup guides for all platforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Screen time management strategies that work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Educational app reviews by subject and age</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Age Groups Covered:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Ages 3-6: Tablets, educational apps, screen limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Ages 7-10: First devices, learning tools, gaming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Ages 11-14: Smartphone readiness, social media</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>Ages 15-18: Independence, college prep, career skills</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* GetResponse Email Capture Form */}
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-xl font-bold mb-2 text-center">Get Your Free Guide Instantly</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Enter your email below and we'll send the guide straight to your inbox!
                  </p>
                  <NewsletterSignup campaignId="CiFHU" className="max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Premium Products */}
          {paidProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Premium Tech Guides</h2>
              
              <div className="space-y-6">
                {paidProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-2 border-accent/50 hover:border-accent transition-colors">
                    <div className="grid md:grid-cols-4 gap-0">
                      <div className="md:col-span-1">
                        <img 
                          src={productMeta[product.slug]?.cover || smartHomeCover} 
                          alt={`${product.title} Cover`} 
                          className="w-full h-full object-cover min-h-[150px]"
                        />
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className={`${productMeta[product.slug]?.gradient || "bg-gradient-to-r from-accent/20 to-primary/20"} p-6`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-accent/20 p-3 rounded-full">
                                {productMeta[product.slug]?.icon || <BookOpen className="h-8 w-8 text-accent" />}
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold mb-1">
                                  {product.title}
                                </h2>
                                <p className="text-muted-foreground">
                                  {product.description || "Your comprehensive buying guide"}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-primary">
                                ${(product.price || 10).toFixed(2)}
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                              </div>
                            </div>
                          </div>
                        </div>
                    
                        <CardContent className="p-6">
                          <Button 
                            variant="cta" 
                            size="lg" 
                            className="w-full text-lg h-12"
                            onClick={() => handleBuy(product)}
                            disabled={checkoutLoading === product.id}
                          >
                            {checkoutLoading === product.id ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Buy Now - ${(product.price || 10).toFixed(2)}
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <AffiliateFooter />
    </div>
  );
};

export default DigitalProducts;