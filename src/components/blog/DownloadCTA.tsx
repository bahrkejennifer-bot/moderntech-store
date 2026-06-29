import React from 'react';
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DownloadCTA = () => (
  <div className="mt-16 rounded-2xl border border-border bg-card overflow-hidden">
    <div className="relative py-14 px-8 text-center">
      <div className="relative z-10">
        <Download className="h-6 w-6 mx-auto mb-4 text-foreground/30" />
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">Free Download</p>
        <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">Get This Guide as a PDF</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Beautifully formatted for offline reading, sharing, or taking with you while shopping.
        </p>
        <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
          <Link to="/digital-products">Download Free PDF</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default DownloadCTA;
