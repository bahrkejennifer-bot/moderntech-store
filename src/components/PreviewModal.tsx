import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Smartphone } from "lucide-react";

interface PreviewModalProps {
  newsletterHtml?: string;
  productTitle?: string;
  productImage?: string;
  productPrice?: string;
}

export default function PreviewModal({ newsletterHtml, productTitle, productImage, productPrice }: PreviewModalProps) {
  const [tab, setTab] = useState<"email" | "tiktok">("email");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 font-['Inter'] text-sm">
          <Eye className="h-4 w-4" />
          Preview Mode
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-xl">Pre-Blast Preview</DialogTitle>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-border pb-3">
          <button
            onClick={() => setTab("email")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-['Inter'] rounded-lg transition-all ${
              tab === "email" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="h-4 w-4" />
            Inbox Preview
          </button>
          <button
            onClick={() => setTab("tiktok")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-['Inter'] rounded-lg transition-all ${
              tab === "tiktok" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            TikTok Preview
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto">
          {tab === "email" ? (
            <div className="bg-muted/30 rounded-xl p-6">
              {/* Email Chrome */}
              <div className="bg-card rounded-xl border border-border shadow-lg max-w-[600px] mx-auto overflow-hidden">
                {/* Email Header */}
                <div className="border-b border-border p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-['Inter']">From:</span>
                    <span className="text-xs font-medium font-['Inter']">Modern Tech LLC &lt;info@moderntech.store&gt;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-['Inter']">Subject:</span>
                    <span className="text-xs font-semibold font-['Inter']">🔥 The Art of Modern Tech — {productTitle || "This Week's Top Pick"}</span>
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
                    <h2 className="font-['Playfair_Display'] text-xl font-bold">{productTitle || "Product Name"}</h2>
                    {productPrice && (
                      <p className="text-2xl font-bold text-emerald-600 font-['Inter']">{productPrice}</p>
                    )}
                    <p className="text-sm text-muted-foreground font-['Inter'] max-w-sm mx-auto">
                      Your nurse-verified product pick of the week — curated for the Modern Tech community.
                    </p>
                    <Button className="bg-foreground text-background font-['Inter'] text-xs tracking-wider uppercase rounded-none px-8">
                      View on Amazon →
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-6 flex justify-center">
              {/* TikTok Phone Frame */}
              <div className="w-[280px] h-[500px] bg-black rounded-[2rem] border-4 border-foreground/20 overflow-hidden relative shadow-2xl">
                {/* Status bar */}
                <div className="h-8 bg-black flex items-center justify-center">
                  <div className="w-16 h-4 bg-foreground/20 rounded-full" />
                </div>

                {/* Content */}
                <div className="relative h-full">
                  {productImage ? (
                    <img src={productImage} alt={productTitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-foreground/10 to-foreground/30 flex items-center justify-center">
                      <Smartphone className="h-16 w-16 text-foreground/20" />
                    </div>
                  )}

                  {/* TikTok Overlay */}
                  <div className="absolute bottom-12 left-4 right-16 space-y-2">
                    <p className="text-white text-sm font-bold font-['Inter'] drop-shadow-lg">
                      @moderntechllc
                    </p>
                    <p className="text-white text-xs font-['Inter'] drop-shadow-lg leading-relaxed">
                      🔥 {productTitle || "Check this out!"} {productPrice ? `— Only ${productPrice}` : ""}
                      {"\n"}#tech #gadgets #amazonfinds #nurseapproved
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
        <div className="border-t border-border pt-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground font-['Inter'] tracking-wider uppercase">
            Final Approval Checklist
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              "Does this meet my standard of excellence?",
              "Would I recommend this to a patient/friend?",
              "Is the copy accurate and link working?",
            ].map((q, i) => (
              <label key={i} className="flex items-start gap-2 text-xs text-foreground font-['Inter'] bg-muted/50 rounded-lg p-3 cursor-pointer hover:bg-muted transition-colors">
                <input type="checkbox" className="mt-0.5 rounded border-border" />
                <span>{q}</span>
              </label>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
