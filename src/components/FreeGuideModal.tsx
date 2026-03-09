import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FreeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FreeGuideModal = ({ open, onOpenChange }: FreeGuideModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("lead_captures").insert({
        email,
        name: email.split("@")[0],
        lead_magnet: "amazon-associate-guide",
      });

      if (error) throw error;

      toast.success("Check your inbox for the guide!");
      setEmail("");
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-none shadow-none bg-background p-10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-center text-foreground">
            Get the Amazon Associate Guide
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            A free 5-page guide to launching your first affiliate products.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-11 px-4 rounded-lg bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending…" : "Get the Amazon Associate Guide"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
