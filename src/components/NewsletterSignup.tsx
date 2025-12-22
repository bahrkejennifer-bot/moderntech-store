import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Gift, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  campaignId?: string;
  className?: string;
}

export const NewsletterSignup = ({ campaignId, className }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email, name, campaignId },
      });

      if (error) throw error;

      toast({
        title: "🎄 You're on the list!",
        description: data.message || "Check your inbox for exclusive tech gift guides!",
      });

      setEmail("");
      setName("");
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
    <div className={`bg-gradient-to-r from-christmas-red/10 to-christmas-green/10 border border-christmas-gold/20 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-christmas-red/20 rounded-full">
          <Gift className="w-6 h-6 text-christmas-red" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Get Exclusive Tech Deals</h3>
          <p className="text-sm text-muted-foreground">Join our newsletter for the best Christmas tech picks!</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background/50"
        />
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-background/50"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-christmas-red hover:bg-christmas-red/90 text-white"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          No spam, just the best tech gift ideas. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};
