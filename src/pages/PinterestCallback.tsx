import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const PinterestCallback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Exchanging Pinterest authorization code for access token...");
  const [tokenData, setTokenData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      setStatus("error");
      setMessage("No authorization code found in URL. Please start the OAuth flow again.");
      return;
    }

    const exchangeCode = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("pinterest-token-exchange", {
          body: { code },
        });

        if (error) throw error;

        if (data?.access_token) {
          setStatus("success");
          setTokenData(data);
          setMessage("Token obtained successfully! Copy the access token below and provide it to Lovable to update your secret.");
        } else {
          setStatus("error");
          setMessage(`Pinterest returned: ${JSON.stringify(data)}`);
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Failed to exchange code");
      }
    };

    exchangeCode();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-lg w-full bg-card border border-border rounded-xl p-8 shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Pinterest OAuth Bridge</h1>
        
        {status === "loading" && (
          <div className="flex items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            <p className="text-muted-foreground">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-destructive font-medium">Error</p>
            <p className="text-sm text-destructive/80 mt-1 break-all">{message}</p>
          </div>
        )}

        {status === "success" && tokenData && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-600 font-medium">✅ Success!</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Access Token:</label>
              <textarea
                readOnly
                value={tokenData.access_token}
                className="w-full mt-1 p-3 bg-muted rounded-lg text-xs font-mono break-all h-24 resize-none"
              />
            </div>
            {tokenData.refresh_token && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Refresh Token:</label>
                <textarea
                  readOnly
                  value={tokenData.refresh_token}
                  className="w-full mt-1 p-3 bg-muted rounded-lg text-xs font-mono break-all h-24 resize-none"
                />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Scopes: {tokenData.scope || "N/A"} • Expires in: {tokenData.expires_in ? `${Math.round(tokenData.expires_in / 86400)} days` : "N/A"}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Start the flow by visiting:<br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block break-all">
              https://www.pinterest.com/oauth/?client_id=1548747&redirect_uri=https://moderntech-store.lovable.app/pinterest-callback&response_type=code&scope=boards:read,boards:write,pins:read,pins:write
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PinterestCallback;
