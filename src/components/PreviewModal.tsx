import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Smartphone, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PreviewModalProps {
  newsletterHtml?: string;
  productTitle?: string;
  productImage?: string;
  productPrice?: string;
  affiliateLink?: string;
  productId?: string;
  category?: string;
}

export default function PreviewModal({ newsletterHtml, productTitle, productImage, productPrice, affiliateLink, productId, category }: PreviewModalProps) {
  const [tab, setTab] = useState<"email" | "tiktok">("email");
  const [modalChecks, setModalChecks] = useState([false, false, false]);
  const [blasting, setBlasting] = useState(false);
  const allModalChecked = modalChecks.every(Boolean);

  const handleConfirmBlast = async () => {
    setBlasting(true);
    try {
      const { error } = await supabase.functions.invoke("approve-and-blast", {
        body: {
          productId,
          productTitle,
          productPrice,
          productImage,
          affiliateLink,
          category,
          humanReview: false,
        },
      });
      if (error) throw error;
      toast({ title: "🚀 Blast Sent!", description: "Content distributed to all channels." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Blast failed", variant: "destructive" });
    } finally {
      setBlasting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 font-['Inter'] text-sm border-white/20 text-white/80 hover:text-white hover:bg-white/10">
          <Eye className="h-4 w-4" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-[#1a1a1a] border-white/10">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-xl text-white">Pre-Blast Preview</DialogTitle>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setTab("email")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-['Inter'] rounded-lg transition-all ${
              tab === "email" ? "bg-emerald-400/10 text-emerald-400 font-medium" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Mail className="h-4 w-4" />
            Inbox Preview
          </button>
          <button
            onClick={() => setTab("tiktok")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-['Inter'] rounded-lg transition-all ${
              tab === "tiktok" ? "bg-emerald-400/10 text-emerald-400 font-medium" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            TikTok Preview
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto">
          {tab === "email" ? (
            <div className="bg-white/5 rounded-xl p-6">
              {/* Email Chrome */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-[600px] mx-auto overflow-hidden">
                {/* Email Header */}
                <div className="border-b border-gray-200 p-4 space-y-1 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-['Inter']">From:</span>
                    <span className="text-xs font-medium font-['Inter'] text-gray-900">Modern Tech LLC &lt;info@moderntech.store&gt;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-['Inter']">Subject:</span>
                    <span className="text-xs font-semibold font-['Inter'] text-gray-900">🔥 The Art of Modern Tech — {productTitle || "This Week's Top Pick"}</span>
                  </div>
                </div>

                {/* Email Body */}
                {newsletterHtml ? (
                  <div
                    className="p-6"
                    dangerouslySetInnerHTML={{ __html: newsletterHtml }}
                  />
                ) : (
                  <div className="p-8 space-y-4 text-center">
                    {productImage && (
                      <img src={productImage} alt={productTitle} className="w-48 h-48 object-cover rounded-xl mx-auto" />
                    )}
                    <h2 className="font-['Playfair_Display'] text-xl font-bold text-gray-900">{productTitle || "Product Name"}</h2>
                    {productPrice && (
                      <p className="text-2xl font-bold text-emerald-600 font-['Inter']">{productPrice}</p>
                    )}
                    <p className="text-sm text-gray-500 font-['Inter'] max-w-sm mx-auto">
                      Your Jen-Verified product pick of the week — curated for the Modern Tech community.
                    </p>
                    <Button className="bg-gray-900 text-white font-['Inter'] text-xs tracking-wider uppercase rounded-none px-8">
                      View on Amazon →
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl p-6 flex justify-center">
              {/* TikTok Phone Frame */}
              <div className="w-[280px] h-[500px] bg-black rounded-[2rem] border-4 border-white/20 overflow-hidden relative shadow-2xl">
                {/* Status bar */}
                <div className="h-8 bg-black flex items-center justify-center">
                  <div className="w-16 h-4 bg-white/20 rounded-full" />
                </div>

                {/* Content */}
                <div className="relative h-full">
                  {productImage ? (
                    <img src={productImage} alt={productTitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-white/10 to-white/30 flex items-center justify-center">
                      <Smartphone className="h-16 w-16 text-white/20" />
                    </div>
                  )}

                  {/* TikTok Overlay */}
                  <div className="absolute bottom-12 left-4 right-16 space-y-2">
                    <p className="text-white text-sm font-bold font-['Inter'] drop-shadow-lg">
                      @moderntechllc
                    </p>
                    <p className="text-white text-xs font-['Inter'] drop-shadow-lg leading-relaxed">
                      🔥 {productTitle || "Check this out!"} {productPrice ? `— Only ${productPrice}` : ""}
                      {"\n"}#tech #gadgets #amazonfinds #jenapproved
                    </p>
                  </div>

                  {/* TikTok Side Actions */}
                  <div className="absolute bottom-16 right-3 flex flex-col items-center gap-4">
                    {["♥", "💬", "↗", "🔖"].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
                          {icon}
                        </div>
                        <span className="text-white text-[9px] font-['Inter']">
                          {["24.5K", "312", "Share", "Save"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Final Approval Checklist */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <p className="text-xs font-semibold text-white/50 font-['Inter'] tracking-wider uppercase">
            Jen Approval Checklist
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              "Does this meet my standard of excellence?",
              "Would I recommend this to a friend?",
              "Is the copy accurate and link working?",
            ].map((q, i) => (
              <label key={i} className="flex items-start gap-2 text-xs text-white font-['Inter'] bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={modalChecks[i]}
                  onChange={() => {
                    const updated = [...modalChecks];
                    updated[i] = !updated[i];
                    setModalChecks(updated);
                  }}
                  className="mt-0.5 rounded border-white/20 accent-emerald-600"
                />
                <span>{q}</span>
              </label>
            ))}
          </div>
          <Button
            onClick={handleConfirmBlast}
            disabled={!allModalChecked || blasting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-['Inter'] font-semibold py-3 rounded-xl disabled:opacity-40 mt-2"
          >
            {blasting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            )}
            Confirm & Blast
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
