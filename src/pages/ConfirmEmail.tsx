import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "loading" | "success" | "expired" | "invalid" | "error";

const ConfirmEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [redirect, setRedirect] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("confirm-lead", {
          body: { token },
        });
        if (cancelled) return;
        if (error || !data?.success) {
          const msg = (data?.error || error?.message || "").toString();
          if (msg.toLowerCase().includes("expired")) setStatus("expired");
          else if (msg.toLowerCase().includes("invalid")) setStatus("invalid");
          else { setStatus("error"); setErrorMsg(msg || "Something went wrong."); }
          return;
        }
        setRedirect(typeof data.redirect === "string" ? data.redirect : "/digital-products");
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  // Auto-redirect on success after 3s
  useEffect(() => {
    if (status === "success" && redirect) {
      const t = setTimeout(() => navigate(redirect), 3000);
      return () => clearTimeout(t);
    }
  }, [status, redirect, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <Helmet>
        <title>Confirm your email · Modern Tech LLC</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="w-full max-w-md text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Modern Tech LLC
        </p>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h1 className="font-serif text-2xl text-foreground">Confirming your email…</h1>
            <p className="text-sm text-muted-foreground">One moment while we verify your link.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <h1 className="font-serif text-3xl text-foreground">You're confirmed</h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your guide is on its way to your inbox. We're also taking you straight to it now.
            </p>
            {redirect && (
              <Link
                to={redirect}
                className="mt-4 inline-block px-8 py-3 bg-primary text-primary-foreground font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-primary/90 transition"
              >
                Open my guide
              </Link>
            )}
          </div>
        )}

        {status === "expired" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
            <h1 className="font-serif text-2xl text-foreground">This link expired</h1>
            <p className="text-sm text-muted-foreground">Confirmation links are valid for 24 hours. Sign up again to get a new one.</p>
            <Link to="/free-guide" className="mt-2 underline text-sm text-primary">Request a new guide</Link>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h1 className="font-serif text-2xl text-foreground">Link not valid</h1>
            <p className="text-sm text-muted-foreground">This confirmation link is missing or has already been used.</p>
            <Link to="/free-guide" className="mt-2 underline text-sm text-primary">Browse free guides</Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h1 className="font-serif text-2xl text-foreground">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">{errorMsg || "Please try the link again in a moment."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
