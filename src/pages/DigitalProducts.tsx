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
import valentineFamilyCover from "@/assets/pdf-covers/valentine-family-tech-guide-cover.jpg";
import smartRingCover from "@/assets/pdf-covers/smart-ring-guide-cover.jpg";

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
const productMeta: Record<string, { cover: string; icon: React.ReactNode; gradient: string; isPremium?: boolean }> = {
  "valentine-family-tech-guide": { cover: valentineFamilyCover, icon: <Star className="h-8 w-8 text-white" />, gradient: "bg-gradient-to-r from-pink-500 to-red-500" },
  "kids-tech-guide": { cover: kidsTechCover, icon: <Baby className="h-8 w-8 text-white" />, gradient: "bg-gradient-gold" },
  "smart-home-guide": { cover: smartHomeCover, icon: <Home className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "gaming-monitors-guide": { cover: gamingMonitorsCover, icon: <Monitor className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
  "earbuds-guide": { cover: earbudsCover, icon: <Headphones className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "student-tech-guide": { cover: studentTechCover, icon: <GraduationCap className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
  "fitness-trackers-guide": { cover: fitnessTrackersCover, icon: <Activity className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-accent/20 to-primary/20" },
  "remote-workspace-guide": { cover: remoteWorkspaceCover, icon: <Briefcase className="h-8 w-8 text-primary" />, gradient: "bg-gradient-to-r from-primary/20 to-accent/20" },
  "smart-ring-guide": { cover: smartRingCover, icon: <Star className="h-8 w-8 text-accent" />, gradient: "bg-gradient-to-r from-purple-500/30 to-pink-500/30", isPremium: true },
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
      .from("products_public")
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
      // Use secure edge function that verifies purchase/free status
      const { data, error } = await supabase.functions.invoke("generate-download-link", {
        body: { productId: product.id },
      });

      if (error) {
        throw error;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
        toast({
          title: "Download Started!",
          description: `Your ${product.title} guide is opening now.`,
        });
      } else {
        throw new Error(data?.error || "Failed to generate download URL");
      }
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
          {/* Free Product - Valentine Family Tech Guide */}
          {freeProduct && (
            <Card className="mb-8 overflow-hidden border-4 border-pink-400 shadow-2xl">
              {/* Ribbon Header with Image and Title */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-95" />
                <div className="relative flex items-center gap-6 p-6">
                  <img 
                    src={productMeta[freeProduct.slug]?.cover || kidsTechCover} 
                    alt={`${freeProduct.title} Cover`} 
                    className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-xl shadow-xl border-4 border-white/40"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/20 p-2 rounded-full animate-pulse">
                        {productMeta[freeProduct.slug]?.icon || <Star className="h-7 w-7 text-white" />}
                      </div>
                      <span className="bg-white text-pink-600 px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-lg">
                        ✨ 100% FREE ✨
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
                      {freeProduct.title}
                    </h2>
                    <p className="text-white/95 text-lg font-medium">
                      {freeProduct.description || "Your comprehensive guide to connection-building tech"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content Below Ribbon */}
              <CardContent className="p-8 bg-gradient-to-b from-pink-50 to-white">
                <p className="text-lg text-muted-foreground mb-6 text-center">
                  This Valentine's Day, give the gift of connection. Our curated guide helps families choose tech that brings people together, not apart.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-xl shadow-md border border-pink-100">
                    <h3 className="text-xl font-bold mb-4 text-pink-600">What's Inside:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>The 4 Pillars of Connection-Building Tech</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>Curated products that foster family moments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>Gifts for every family member</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>Budget-friendly options included</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-md border border-pink-100">
                    <h3 className="text-xl font-bold mb-4 text-pink-600">Perfect For:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Parents looking for meaningful gifts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Couples who want to disconnect to reconnect</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Families prioritizing quality time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Anyone tired of thoughtless tech gifts</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* GetResponse Email Capture Form */}
                <div className="bg-gradient-to-r from-pink-500 to-red-500 p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-black mb-2 text-center text-white">🎁 Get Your FREE Download Now!</h3>
                  <p className="text-white/90 text-center mb-4 text-lg">
                    Enter your email and receive instant access to your Valentine's Gift Guide!
                  </p>
                  <NewsletterSignup campaignId="CiFHU" className="max-w-md mx-auto" />
                  <p className="text-white/70 text-center mt-3 text-sm">No spam, ever. Unsubscribe anytime.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Premium Products */}
          {paidProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Premium Tech Guides</h2>
              
              <div className="space-y-6">
                {paidProducts.map((product) => {
                  const isSmartRing = product.slug === "smart-ring-guide";
                  
                  if (isSmartRing) {
                    // Premium Smart Ring Guide - Special Display
                    return (
                      <Card key={product.id} className="overflow-hidden border-4 border-purple-400 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                        <div className="relative">
                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-black uppercase tracking-wide shadow-lg">
                              ⭐ Premium Deep-Dive
                            </span>
                          </div>
                          <div className="grid md:grid-cols-3 gap-0">
                            <div className="md:col-span-1 p-6 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                              <img 
                                src={productMeta[product.slug]?.cover || fitnessTrackersCover} 
                                alt={`${product.title} Cover`} 
                                className="w-48 h-48 object-cover rounded-2xl shadow-2xl border-4 border-white"
                              />
                            </div>
                            
                            <div className="md:col-span-2 p-8">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                                  <Star className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-current" />
                                  ))}
                                  <span className="text-muted-foreground ml-2 text-sm">Expert Reviewed</span>
                                </div>
                              </div>
                              
                              <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {product.title}
                              </h2>
                              <p className="text-lg text-muted-foreground mb-4">
                                {product.description}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-500" />
                                  <span className="text-sm">Complete brand comparisons</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-500" />
                                  <span className="text-sm">Sizing & fit guide</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-500" />
                                  <span className="text-sm">Feature-by-feature breakdown</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-500" />
                                  <span className="text-sm">Expert recommendations</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-6">
                                <div>
                                  <div className="text-4xl font-black text-purple-600">
                                    ${(product.price || 10).toFixed(2)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                                </div>
                                <Button
                                  size="lg"
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                                  onClick={() => handleBuy(product)}
                                  disabled={checkoutLoading === product.id}
                                >
                                  {checkoutLoading === product.id ? (
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                  ) : (
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                  )}
                                  Get the Ultimate Guide
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  }
                  
                  // Regular Premium Products
                  return (
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
                  );
                })}
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