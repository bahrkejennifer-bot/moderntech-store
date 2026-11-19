import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { subscribersToCsv, type SubscriberRow } from "@/lib/subscribersCsv";

const AdminSubscribers = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/admin/auth");
      const { data: role } = await supabase
        .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      if (!role) return navigate("/admin/auth");
      const { data, error } = await supabase
        .from("subscribers")
        .select("email, name, signup_date, source_page, freebie, consent")
        .order("signup_date", { ascending: false })
        .limit(5000);
      if (error) setError("Could not load subscribers.");
      setRows((data as SubscriberRow[]) || []);
      setLoading(false);
    })();
  }, [navigate]);

  const exportCsv = () => {
    const blob = new Blob([subscribersToCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">The Signal</p>
          <h1 className="mt-2 font-serif text-3xl" style={{ fontStyle: "italic", fontWeight: 400 }}>Subscribers</h1>
          {!loading && <p className="mt-1 text-sm text-muted-foreground">{rows.length} total</p>}
        </div>
        <Button onClick={exportCsv} disabled={loading || rows.length === 0} className="rounded-none">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Loading" />
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Signed up</th>
                <th className="px-4 py-3">Source page</th>
                <th className="px-4 py-3">Freebie</th>
                <th className="px-4 py-3">Weekly consent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-t border-border">
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.name || ""}</td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(r.signup_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{r.source_page || ""}</td>
                  <td className="px-4 py-3">{r.freebie || ""}</td>
                  <td className="px-4 py-3">{r.consent ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
