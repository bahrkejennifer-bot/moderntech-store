import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, RefreshCw, Eye, ArrowLeft, CheckCircle2 } from "lucide-react";

interface TechSpec {
  id: string;
  subject: string;
  html_content: string;
  status: string;
  generated_at: string;
  sent_at: string | null;
  recipients_count: number;
}

const AdminTechSpec = () => {
  const navigate = useNavigate();
  const [specs, setSpecs] = useState<TechSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/auth");
      return;
    }
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!data) {
      navigate("/admin/auth");
      return;
    }
    setIsAdmin(true);
    fetchSpecs();
  };

  const fetchSpecs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("weekly_tech_specs")
      .select("id, subject, html_content, status, generated_at, sent_at, recipients_count")
      .order("generated_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Failed to fetch specs:", error);
      toast({ title: "Error", description: "Failed to load newsletters", variant: "destructive" });
    } else {
      setSpecs((data as TechSpec[]) || []);
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-weekly-tech-spec");
      if (error) throw error;
      toast({ title: "✨ Draft Generated", description: `Subject: ${data.spec?.subject || "New draft ready"}` });
      fetchSpecs();
    } catch (err) {
      console.error(err);
      toast({ title: "Generation Failed", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = async (specId: string) => {
    setSending(specId);
    try {
      const { data, error } = await supabase.functions.invoke("send-weekly-tech-spec", {
        body: { spec_id: specId },
      });
      if (error) throw error;
      toast({
        title: "📧 Newsletter Sent!",
        description: `Delivered to ${data.cloud_recipients} subscribers${data.getresponse_sent ? " + GetResponse list" : ""}`,
      });
      fetchSpecs();
    } catch (err) {
      console.error(err);
      toast({ title: "Send Failed", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setSending(null);
    }
  };

  const previewSpec = specs.find((s) => s.id === previewId);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate("/admin/upload")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </button>
            <h1 className="font-serif text-3xl text-foreground">The Art of Modern Tech — Weekly Edit</h1>
            <p className="text-muted-foreground mt-1">AI-generated weekly report drafts · Review & send</p>
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="bg-primary hover:bg-primary/90">
            {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Generate Draft
          </Button>
        </div>

        {/* Preview Modal */}
        {previewSpec && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">{previewSpec.subject}</h2>
                <div className="flex gap-2">
                  {previewSpec.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => { setPreviewId(null); handleSend(previewSpec.id); }}
                      disabled={sending === previewSpec.id}
                    >
                      <Send className="w-3 h-3 mr-1" /> Approve & Send
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setPreviewId(null)}>Close</Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <iframe
                  srcDoc={previewSpec.html_content}
                  title="Email Preview"
                  className="w-full h-full min-h-[600px] border-0"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}

        {/* Specs List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : specs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No newsletter drafts yet.</p>
            <Button onClick={handleGenerate} disabled={generating}>
              Generate Your First Draft
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {specs.map((spec) => (
              <div key={spec.id} className="border border-border rounded-lg p-4 bg-card flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      spec.status === "sent"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : spec.status === "approved"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {spec.status === "sent" && <CheckCircle2 className="w-3 h-3" />}
                      {spec.status === "sent" ? "Sent" : spec.status === "approved" ? "Approved · Mon 7AM" : "Draft"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(spec.generated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {spec.sent_at && (
                      <span className="text-xs text-muted-foreground">
                        · Sent to {spec.recipients_count} subscribers
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{spec.subject}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => setPreviewId(spec.id)}>
                    <Eye className="w-3 h-3 mr-1" /> Preview
                  </Button>
                  {(spec.status === "draft" || spec.status === "approved") && (
                    <Button
                      size="sm"
                      onClick={() => handleSend(spec.id)}
                      disabled={sending === spec.id}
                    >
                      {sending === spec.id ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Send className="w-3 h-3 mr-1" />}
                      Send
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTechSpec;
