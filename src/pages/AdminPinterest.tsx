import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, RefreshCw, ExternalLink, LogOut, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";

const PINTEREST_APP_ID = "1548747";
const REDIRECT_URI = "https://moderntech-store.lovable.app/pinterest-callback";
const SCOPES = "boards:read,boards:write,pins:read,pins:write";

const AdminPinterest = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) { navigate("/admin/auth"); return; }
      setTimeout(() => checkAdminRole(session.user.id), 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/auth"); return; }
      checkAdminRole(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
    setLoading(false);
    if (data) fetchTokenStatus();
  };

  const fetchTokenStatus = async () => {
    setTokenLoading(true);
    try {
      // We can't read pinterest_tokens directly from the client (RLS requires authenticated admin)
      // But since the admin IS authenticated, this should work
      const { data, error } = await supabase
        .from("pinterest_tokens" as any)
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Token fetch error:", error);
        setTokenInfo(null);
      } else {
        setTokenInfo(data);
      }
    } catch {
      setTokenInfo(null);
    }
    setTokenLoading(false);
  };

  const handleConnectPinterest = () => {
    const oauthUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${SCOPES}`;
    window.location.href = oauthUrl;
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("pin-to-pinterest", {
        body: {
          title: "Connection Test Pin",
          description: "This is a test pin to verify the Pinterest connection is working. As an Amazon Associate, I earn from qualifying purchases.",
          image_url: "https://moderntech-store.lovable.app/images/products/oura-ring-4.jpg",
          affiliate_link: "https://moderntech-store.lovable.app",
        },
      });

      if (error) throw error;

      if (data?.success) {
        setTestResult({ success: true, message: "Pinterest connection is working! Test pin created successfully." });
        toast({ title: "✅ Connection Working!", description: "Test pin posted to Pinterest successfully." });
      } else {
        setTestResult({ success: false, message: data?.error || "Unknown error" });
        toast({ title: "Connection Failed", description: data?.error || "Could not post test pin", variant: "destructive" });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Failed to test connection" });
      toast({ title: "Test Failed", description: err.message, variant: "destructive" });
    }
    setTesting(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const getTokenStatus = () => {
    if (!tokenInfo) return { status: "disconnected", label: "Not Connected", color: "text-destructive" };
    if (tokenInfo.expires_at) {
      const expiresAt = new Date(tokenInfo.expires_at);
      const now = new Date();
      if (expiresAt < now) return { status: "expired", label: "Expired", color: "text-destructive" };
      const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3) return { status: "expiring", label: `Expires in ${daysLeft} day(s)`, color: "text-yellow-600" };
      return { status: "connected", label: `Connected (${daysLeft} days left)`, color: "text-green-600" };
    }
    return { status: "connected", label: "Connected", color: "text-green-600" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
              <p className="text-muted-foreground mb-4">Admin privileges required.</p>
              <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const tokenStatus = getTokenStatus();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pinterest Connect</h1>
              <p className="text-muted-foreground mt-1">Manage your Pinterest automation connection</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>

          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">Checking connection...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {tokenStatus.status === "connected" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : tokenStatus.status === "expiring" ? (
                      <RefreshCw className="h-6 w-6 text-yellow-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive" />
                    )}
                    <div>
                      <p className={`font-semibold ${tokenStatus.color}`}>{tokenStatus.label}</p>
                      {tokenInfo?.scope && (
                        <p className="text-xs text-muted-foreground">Scopes: {tokenInfo.scope}</p>
                      )}
                      {tokenInfo?.updated_at && (
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(tokenInfo.updated_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    {tokenStatus.status === "disconnected" || tokenStatus.status === "expired" ? (
                      <Button onClick={handleConnectPinterest} className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Connect Pinterest Account
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={handleConnectPinterest} className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Reconnect
                        </Button>
                        <Button onClick={handleTestConnection} disabled={testing} className="gap-2">
                          {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                          {testing ? "Testing..." : "Test Connection"}
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Test Result */}
          {testResult && (
            <Card className={testResult.success ? "border-green-500/50" : "border-destructive/50"}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${testResult.success ? "text-green-600" : "text-destructive"}`}>
                      {testResult.success ? "Test Passed" : "Test Failed"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{testResult.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">1. Connect</strong> — Click the button above to authorize your Pinterest account. This grants your app permission to create pins automatically.
              </p>
              <p>
                <strong className="text-foreground">2. Auto-Save</strong> — Your access token is securely stored in the database and used by all Pinterest automation functions.
              </p>
              <p>
                <strong className="text-foreground">3. Auto-Refresh</strong> — When your token expires, the system automatically refreshes it using your refresh token. No manual intervention needed.
              </p>
              <p>
                <strong className="text-foreground">4. Automated Pinning</strong> — The content calendar and trending pins functions run on schedule, creating pins using your stored credentials.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <AffiliateFooter />
    </div>
  );
};

export default AdminPinterest;
