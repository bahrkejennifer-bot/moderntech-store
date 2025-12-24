import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Sparkles, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  name: z.string().trim().max(100).optional(),
});

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
    
    // Validate input
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
        body: { email: validation.data.email, name: validation.data.name, campaignId },
      });

      if (error) throw error;

      toast({
        title: "🎉 You're on the list!",
        description: data.message || "Check your inbox for exclusive tech guides!",
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
    <div className={`bg-card border border-border rounded-2xl p-6 shadow-card ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-vibrant-green/15 rounded-full">
          <Sparkles className="w-6 h-6 text-vibrant-green" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Weekly Tech Newsletter</h3>
          <p className="text-sm text-muted-foreground">Get the best tech deals & guides every week!</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background border-border"
          maxLength={100}
        />
        <div className="flex gap-2">
          <div className="relative flex-1">
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
            className="bg-vibrant-green hover:bg-vibrant-green/90 text-white font-semibold"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          No spam, just the best tech picks. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};
