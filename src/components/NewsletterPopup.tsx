import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Sparkles, Loader2, X } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  name: z.string().trim().max(100).optional(),
});

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const hasInteracted = localStorage.getItem("newsletter_popup_interacted");
    if (hasInteracted) return;

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter_popup_interacted", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse({ email, name: name || undefined });
    if (!validation.success) {
      toast({
        title: "Invalid input",
        description: validation.error.errors[0]?.message || "Please check your input.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email: validation.data.email, name: validation.data.name },
      });

      if (error) throw error;

      toast({
        title: "🎉 You're on the list!",
        description: data.message || "Check your inbox for exclusive tech guides!",
      });

      localStorage.setItem("newsletter_popup_interacted", "true");
      setIsOpen(false);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-vibrant-green/15 rounded-full w-fit">
            <Sparkles className="w-8 h-8 text-vibrant-green" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Get Weekly Tech Picks!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Join 50,000+ readers getting the best tech deals and guides every week.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-border"
            maxLength={100}
          />
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-background border-border"
              required
              maxLength={255}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-vibrant-green hover:bg-vibrant-green/90 text-white font-semibold py-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Subscribe Now
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No spam ever. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};