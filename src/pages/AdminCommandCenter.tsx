import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import PreviewModal from "@/components/PreviewModal";
import {
  Zap, ShieldCheck, Play, Calendar, CheckCircle2, Loader2,
  ArrowLeft, Eye, Youtube, Scissors, Share2, Pin,
  Instagram, Facebook, Music2, Send, Rocket, Brain,
  Clock, Star, Heart, Dumbbell, ShoppingBag, Sparkles
} from "lucide-react";

interface ScrapedProduct {
  id: string;
  title: string;
  price: string | null;
  image_url: string | null;
  affiliate_link: string;
  category: string | null;
  created_at: string;
}

interface ContentDay {
  day: string;
  theme: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const CONTENT_CALENDAR: ContentDay[] = [
  { day: "Monday", theme: "Motivational Monday", icon: <Heart className="h-5 w-5" />, color: "bg-rose-500/20 text-rose-400 border-rose-500/30", description: "Personal Growth · Nurse Stories" },
  { day: "Tuesday", theme: "Tech Tuesday", icon: <Zap className="h-5 w-5" />, color: "bg-blue-500/20 text-blue-400 border-blue-500/30", description: "Gadget Reviews · Deep Dives" },
  { day: "Wednesday", theme: "Wellness Wednesday", icon: <Dumbbell className="h-5 w-5" />, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", description: "Wearables · Clinical Tech" },
  { day: "Thursday", theme: "Gadget Thursday", icon: <ShoppingBag className="h-5 w-5" />, color: "bg-amber-500/20 text-amber-400 border-amber-500/30", description: "Amazon Picks · Hot Deals" },
  { day: "Friday", theme: "Friday Roundup", icon: <Star className="h-5 w-5" />, color: "bg-purple-500/20 text-purple-400 border-purple-500/30", description: "Weekly Recap · Top 5" },
];

const AdminCommandCenter = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [humanReview, setHumanReview] = useState(true);
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [approving, setApproving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "calendar" | "podcast">("queue");
  const [checklists, setChecklists] = useState<Record<string, [boolean, boolean, boolean]>>({});

  const getChecklist = (id: string): [boolean, boolean, boolean] => checklists[id] || [false, false, false];
  const toggleCheck = (id: string, idx: number) => {
    const current = getChecklist(id);
    const updated = [...current] as [boolean, boolean, boolean];
    updated[idx] = !updated[idx];
    setChecklists((prev) => ({ ...prev, [id]: updated }));
  };
  const allChecked = (id: string) => getChecklist(id).every(Boolean);

  const checkAdmin = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/auth"); return; }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!data) { navigate("/"); return; }
    setIsAdmin(true);
    setLoading(false);
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("scraped_products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setProducts(data);
  }, []);

  useEffect(() => { checkAdmin(); }, [checkAdmin]);
  useEffect(() => { if (isAdmin) fetchProducts(); }, [isAdmin, fetchProducts]);

  const handleApprove = async (product: ScrapedProduct) => {
    if (humanReview) {
      toast({ title: "🩺 Human Review Mode", description: "Preparing draft for your review before posting..." });
    }
    setApproving(product.id);
    try {
      const { error } = await supabase.functions.invoke("approve-and-blast", {
        body: {
          productId: product.id,
          productTitle: product.title,
          productPrice: product.price,
          productImage: product.image_url,
          affiliateLink: product.affiliate_link,
          category: product.category,
          humanReview,
        },
      });
      if (error) throw error;
      toast({ title: "✅ Blast Approved!", description: humanReview ? "Newsletter draft created. Social posts queued for review." : "Content sent to all channels!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to approve", variant: "destructive" });
    } finally {
      setApproving(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/emails")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-foreground">
                Media Command Center
              </h1>
              <p className="text-sm text-muted-foreground font-['Inter']">
                Your autonomous content factory — powered by human judgment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Episode Manager Link */}
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/episodes")} className="gap-2 font-['Inter']">
              <Play className="h-4 w-4" />
              Episode Manager
            </Button>

            {/* Human-First Toggle */}
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3">
              <Brain className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground font-['Inter']">
                {humanReview ? "Human Review" : "Autonomous"}
              </span>
              <Switch checked={humanReview} onCheckedChange={setHumanReview} />
              <ShieldCheck className={`h-5 w-5 transition-colors ${humanReview ? "text-emerald-400" : "text-muted-foreground"}`} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {[
            { id: "queue" as const, label: "Approval Queue", icon: <Rocket className="h-4 w-4" /> },
            { id: "calendar" as const, label: "Content Calendar", icon: <Calendar className="h-4 w-4" /> },
            { id: "podcast" as const, label: "Podcast Studio", icon: <Youtube className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium font-['Inter'] border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* APPROVAL QUEUE */}
        {activeTab === "queue" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
                  Hottest Tech — Weekly Picks
                </h2>
                <p className="text-sm text-muted-foreground font-['Inter'] mt-1">
                  Top 5 trending products awaiting your Nurse-Verified approval
                </p>
              </div>
              <Button variant="outline" onClick={fetchProducts} className="font-['Inter']">
                <Sparkles className="h-4 w-4 mr-2" /> Refresh Picks
              </Button>
            </div>

            {products.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground font-['Playfair_Display']">No products to review</h3>
                <p className="text-sm text-muted-foreground font-['Inter'] mt-2">
                  Products from the Amazon scraper will appear here for approval.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-2xl p-6 flex gap-6 items-center hover:border-primary/30 transition-all group"
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary font-['Inter']">#{index + 1}</span>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-muted overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground font-['Inter'] text-sm leading-tight line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        {product.price && (
                          <span className="text-lg font-bold text-emerald-400 font-['Inter']">{product.price}</span>
                        )}
                        {product.category && (
                          <Badge variant="secondary" className="text-xs font-['Inter']">{product.category}</Badge>
                        )}
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-['Inter']">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Nurse-Verified
                        </Badge>
                      </div>
                    </div>

                    {/* Distribution Preview */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Pin className="h-4 w-4" />
                      <Instagram className="h-4 w-4" />
                      <Facebook className="h-4 w-4" />
                      <Music2 className="h-4 w-4" />
                      <Send className="h-4 w-4" />
                    </div>

                    {/* Preview + Checklist + Approve */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <PreviewModal
                          productTitle={product.title}
                          productImage={product.image_url || undefined}
                          productPrice={product.price || undefined}
                        />
                        <Button
                          onClick={() => handleApprove(product)}
                          disabled={approving === product.id || !allChecked(product.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-['Inter'] font-semibold px-6 py-3 rounded-xl disabled:opacity-40"
                        >
                          {approving === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          Approve & Blast
                        </Button>
                      </div>
                      {/* Final Approval Checklist */}
                      <div className="flex flex-col gap-1.5 text-xs font-['Inter']">
                        {[
                          "Content is accurate & nurse-verified",
                          "Image & pricing are correct",
                          "Ready for patient-facing distribution",
                        ].map((label, idx) => {
                          const checks = getChecklist(product.id);
                          return (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
                              <input
                                type="checkbox"
                                checked={checks[idx]}
                                onChange={() => toggleCheck(product.id, idx)}
                                className="rounded border-border accent-emerald-600 h-3.5 w-3.5"
                              />
                              {label}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pipeline Status */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-4">Automation Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { icon: <Send className="h-5 w-5" />, label: "Resend Newsletter", status: "Ready", color: "text-emerald-400" },
                  { icon: <Pin className="h-5 w-5" />, label: "Pinterest Pin", status: "Connected", color: "text-emerald-400" },
                  { icon: <Share2 className="h-5 w-5" />, label: "Social Distribution", status: "API Pending", color: "text-amber-400" },
                  { icon: <Scissors className="h-5 w-5" />, label: "Video Clipping", status: "Setup Required", color: "text-muted-foreground" },
                ].map((pipe) => (
                  <div key={pipe.label} className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                    <div className="text-muted-foreground">{pipe.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-foreground font-['Inter']">{pipe.label}</p>
                      <p className={`text-xs font-['Inter'] ${pipe.color}`}>{pipe.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT CALENDAR */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
                The Daily Pillars
              </h2>
              <p className="text-sm text-muted-foreground font-['Inter'] mt-1">
                Your weekly content rhythm — each day has a purpose
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {CONTENT_CALENDAR.map((day) => {
                const isToday = new Date().toLocaleDateString("en-US", { weekday: "long" }) === day.day;
                return (
                  <div
                    key={day.day}
                    className={`bg-card border rounded-2xl p-5 transition-all ${
                      isToday ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-border/80"
                    }`}
                  >
                    {isToday && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-3 font-['Inter']">
                        TODAY
                      </Badge>
                    )}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium font-['Inter'] mb-3 ${day.color}`}>
                      {day.icon}
                      {day.day}
                    </div>
                    <h3 className="font-['Playfair_Display'] text-base font-bold text-foreground mb-1">
                      {day.theme}
                    </h3>
                    <p className="text-xs text-muted-foreground font-['Inter']">
                      {day.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-['Inter']">
                        <Clock className="h-3 w-3" />
                        <span>{humanReview ? "Awaiting review" : "Auto-scheduled"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Weekly Overview */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-4">This Week's Pipeline</h3>
              <div className="space-y-3">
                {CONTENT_CALENDAR.map((day) => (
                  <div key={day.day} className="flex items-center gap-4 py-3 border-b border-border/30 last:border-0">
                    <div className="w-24 text-sm font-medium text-muted-foreground font-['Inter']">{day.day}</div>
                    <div className="flex-1">
                      <span className="text-sm text-foreground font-['Inter']">{day.theme}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-['Inter']">
                        <Eye className="h-3 w-3 mr-1" />
                        {humanReview ? "Draft" : "Scheduled"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PODCAST STUDIO */}
        {activeTab === "podcast" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-foreground">
                Podcast Studio Hub
              </h2>
              <p className="text-sm text-muted-foreground font-['Inter'] mt-1">
                Upload once — multiply across all platforms
              </p>
            </div>

            {/* Upload Area */}
            <div className="bg-card border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/30 transition-all cursor-pointer">
              <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-2">
                Drop Your Weekly Podcast
              </h3>
              <p className="text-sm text-muted-foreground font-['Inter'] max-w-md mx-auto">
                Upload your 30-minute video with Anita. The AI clipper will automatically find
                viral moments and create TikToks, Reels, and YouTube Shorts.
              </p>
              <Button className="mt-6 font-['Inter']" variant="outline">
                <Play className="h-4 w-4 mr-2" /> Connect YouTube URL
              </Button>
            </div>

            {/* Clipping Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Youtube className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-['Inter'] text-sm font-semibold text-foreground">Full Episode</h4>
                    <p className="text-xs text-muted-foreground font-['Inter']">YouTube Long-form</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-['Inter']">Source</Badge>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Scissors className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-['Inter'] text-sm font-semibold text-foreground">AI Clipper</h4>
                    <p className="text-xs text-muted-foreground font-['Inter']">Vizard.ai / OpusClip</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-['Inter']">Connect API</Badge>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-['Inter'] text-sm font-semibold text-foreground">Distribute</h4>
                    <p className="text-xs text-muted-foreground font-['Inter']">TikTok · Reels · Shorts</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-['Inter']">Auto-Post</Badge>
              </div>
            </div>

            {/* Clips Status */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-foreground mb-4">Content Clips Status</h3>
              <div className="text-center py-8">
                <Scissors className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-['Inter']">
                  No clips yet. Upload your first podcast episode to get started.
                </p>
                <p className="text-xs text-muted-foreground font-['Inter'] mt-2">
                  Connect Vizard.ai or OpusClip API to enable automatic clipping.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCommandCenter;
