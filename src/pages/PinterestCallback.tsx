import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PinterestCallback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Connecting your Pinterest account...");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorParam = params.get("error");

    if (errorParam) {
      setStatus("error");
      setMessage(`Pinterest denied access: ${errorParam}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("No authorization code found. Please try connecting again from the admin panel.");
      return;
    }

    const exchangeCode = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("pinterest-token-exchange", {
          body: { code },
        });

        if (error) throw error;

        if (data?.access_token && data?.saved_to_db) {
          setStatus("success");
          setMessage("Pinterest connected successfully! Your token has been saved and will auto-refresh.");
        } else if (data?.access_token) {
          setStatus("success");
          setMessage("Token obtained but could not save to database. Please try again.");
        } else {
          setStatus("error");
          setMessage(`Pinterest returned an unexpected response: ${JSON.stringify(data)}`);
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Failed to exchange authorization code");
      }
    };

    exchangeCode();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 shadow-lg space-y-6 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <h1 className="text-xl font-bold text-foreground">Connecting Pinterest...</h1>
            <p className="text-muted-foreground text-sm">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <h1 className="text-xl font-bold text-foreground">Pinterest Connected!</h1>
            <p className="text-muted-foreground text-sm">{message}</p>
            <Button onClick={() => navigate("/admin/pinterest")} className="w-full">
              Go to Pinterest Settings
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-xl font-bold text-foreground">Connection Failed</h1>
            <p className="text-destructive/80 text-sm">{message}</p>
            <Button onClick={() => navigate("/admin/pinterest")} variant="outline" className="w-full">
              Back to Pinterest Settings
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PinterestCallback;
