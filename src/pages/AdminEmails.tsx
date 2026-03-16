import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Mail, Users, Send, BarChart3, MousePointerClick,
  ArrowLeft, RefreshCw, Loader2, Search, ChevronLeft, ChevronRight,
  Inbox, AlertTriangle, CheckCircle2, Clock
} from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  created_at: string;
  lead_magnet: string;
}

interface EmailLog {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

interface Stats {
  totalSubscribers: number;
  totalSent: number;
  totalFailed: number;
  totalPending: number;
}

const PAGE_SIZE = 20;

const AdminEmails = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState<Stats>({ totalSubscribers: 0, totalSent: 0, totalFailed: 0, totalPending: 0 });

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subSearch, setSubSearch] = useState("");
  const [subPage, setSubPage] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // Email logs
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [logFilter, setLogFilter] = useState<string>("all");
  const [logPage, setLogPage] = useState(0);
  const [logTotal, setLogTotal] = useState(0);
  const [timeRange, setTimeRange] = useState<string>("7d");

  // Broadcast
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<"overview" | "subscribers" | "logs" | "broadcast">("overview");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/auth"); return; }
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!data) { navigate("/admin/auth"); return; }
    setIsAdmin(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchStats();
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    if (activeTab === "subscribers") fetchSubscribers();
    if (activeTab === "logs") fetchLogs();
  }, [isAdmin, activeTab, subPage, subSearch, logPage, logFilter, timeRange]);

  const getTimeRangeDate = () => {
    const now = new Date();
    if (timeRange === "24h") now.setHours(now.getHours() - 24);
    else if (timeRange === "7d") now.setDate(now.getDate() - 7);
    else if (timeRange === "30d") now.setDate(now.getDate() - 30);
    else now.setFullYear(now.getFullYear() - 1);
    return now.toISOString();
  };

  const fetchStats = async () => {
    const [subRes, sentRes, failedRes, pendingRes] = await Promise.all([
      supabase.from("lead_captures").select("id", { count: "exact", head: true }),
      supabase.from("email_send_log").select("id", { count: "exact", head: true }).eq("status", "sent"),
      supabase.from("email_send_log").select("id", { count: "exact", head: true }).in("status", ["dlq", "failed"]),
      supabase.from("email_send_log").select("id", { count: "exact", head: true }).eq("status", "pending"),
    ]);
    setStats({
      totalSubscribers: subRes.count || 0,
      totalSent: sentRes.count || 0,
      totalFailed: failedRes.count || 0,
      totalPending: pendingRes.count || 0,
    });
  };

  const fetchSubscribers = async () => {
    let query = supabase
      .from("lead_captures")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(subPage * PAGE_SIZE, (subPage + 1) * PAGE_SIZE - 1);

    if (subSearch) {
      query = query.or(`email.ilike.%${subSearch}%,name.ilike.%${subSearch}%`);
    }

    const { data, count } = await query;
    setSubscribers(data || []);
    setSubTotal(count || 0);
  };

  const fetchLogs = async () => {
    const since = getTimeRangeDate();
    let query = supabase
      .from("email_send_log")
      .select("*", { count: "exact" })
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .range(logPage * PAGE_SIZE, (logPage + 1) * PAGE_SIZE - 1);

    if (logFilter !== "all") {
      query = query.eq("status", logFilter);
    }

    const { data, count } = await query;
    setLogs(data || []);
    setLogTotal(count || 0);
  };

  const handleBroadcast = async () => {
    if (!subject.trim() || !body.trim()) {
      toast({ title: "Missing fields", description: "Subject and body are required.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-broadcast", {
        body: { subject: subject.trim(), body: body.trim() },
      });
      if (error) throw error;
      toast({ title: "Broadcast queued!", description: `Sending to ${data?.recipientCount || 0} subscribers.` });
      setSubject("");
      setBody("");
      fetchStats();
    } catch (err: any) {
      toast({ title: "Broadcast failed", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { class: string; icon: any }> = {
      sent: { class: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
      pending: { class: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
      failed: { class: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
      dlq: { class: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
      suppressed: { class: "bg-gray-100 text-gray-600 border-gray-200", icon: AlertTriangle },
    };
    const s = map[status] || map.pending;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${s.class}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F9FAFB" }}>
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const sidebarItems = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "subscribers" as const, label: "Subscribers", icon: Users },
    { id: "logs" as const, label: "Email Logs", icon: Inbox },
    { id: "broadcast" as const, label: "Broadcast", icon: Send },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Email Dashboard
          </h2>
          <p className="text-xs text-gray-400 mt-1">moderntech.store</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => navigate("/admin/upload")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">

          {/* === OVERVIEW TAB === */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Email Overview
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Monitor your email performance at a glance.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchStats}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-white"
                >
                  <RefreshCw className="w-4 h-4 mr-1" /> Refresh
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Total Subscribers", value: stats.totalSubscribers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Emails Sent", value: stats.totalSent, icon: Mail, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Failed / DLQ", value: stats.totalFailed, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                  { label: "Pending", value: stats.totalPending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500">{card.label}</span>
                        <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${card.color}`} />
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("broadcast")}
                    className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Send className="w-4 h-4 mr-1" /> Compose Broadcast
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("subscribers")}
                    className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-4 h-4 mr-1" /> View Subscribers
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("logs")}
                    className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Inbox className="w-4 h-4 mr-1" /> Email Logs
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* === SUBSCRIBERS TAB === */}
          {activeTab === "subscribers" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Subscribers
                </h1>
                <p className="text-sm text-gray-500 mt-1">{subTotal.toLocaleString()} total subscribers from lead captures.</p>
              </div>

              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by email or name..."
                  value={subSearch}
                  onChange={(e) => { setSubSearch(e.target.value); setSubPage(0); }}
                  className="pl-10 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Signup Date</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-900">{sub.name}</td>
                        <td className="px-5 py-3 text-gray-600">{sub.email}</td>
                        <td className="px-5 py-3 text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {sub.lead_magnet}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-5 py-10 text-center text-gray-400">No subscribers found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {subTotal > PAGE_SIZE && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Showing {subPage * PAGE_SIZE + 1}–{Math.min((subPage + 1) * PAGE_SIZE, subTotal)} of {subTotal}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={subPage === 0} onClick={() => setSubPage(subPage - 1)} className="bg-white border-gray-200 text-gray-600">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={(subPage + 1) * PAGE_SIZE >= subTotal} onClick={() => setSubPage(subPage + 1)} className="bg-white border-gray-200 text-gray-600">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === EMAIL LOGS TAB === */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Email Logs
                </h1>
                <p className="text-sm text-gray-500 mt-1">Monitor delivery status across all email types.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Time range */}
                {["24h", "7d", "30d", "all"].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTimeRange(t); setLogPage(0); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      timeRange === t
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {t === "24h" ? "Last 24h" : t === "7d" ? "Last 7 days" : t === "30d" ? "Last 30 days" : "All time"}
                  </button>
                ))}
                <div className="w-px h-6 bg-gray-200 mx-1" />
                {/* Status filter */}
                {["all", "sent", "pending", "failed", "dlq"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setLogFilter(s); setLogPage(0); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      logFilter === s
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Template</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Recipient</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-900">{log.template_name}</td>
                        <td className="px-5 py-3 text-gray-600">{log.recipient_email}</td>
                        <td className="px-5 py-3">{statusBadge(log.status)}</td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{new Date(log.created_at).toLocaleString()}</td>
                        <td className="px-5 py-3 text-xs text-red-500 max-w-[200px] truncate">{log.error_message || "—"}</td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-gray-400">No email logs found for this period.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {logTotal > PAGE_SIZE && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Showing {logPage * PAGE_SIZE + 1}–{Math.min((logPage + 1) * PAGE_SIZE, logTotal)} of {logTotal}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={logPage === 0} onClick={() => setLogPage(logPage - 1)} className="bg-white border-gray-200 text-gray-600">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={(logPage + 1) * PAGE_SIZE >= logTotal} onClick={() => setLogPage(logPage + 1)} className="bg-white border-gray-200 text-gray-600">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === BROADCAST TAB === */}
          {activeTab === "broadcast" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Compose Broadcast
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Send from <span className="font-medium text-gray-700">info@moderntech.store</span> to all {stats.totalSubscribers} subscribers.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject Line</label>
                  <Input
                    placeholder="e.g. Your Weekly Tech Roundup is Here"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Body</label>
                  <Textarea
                    placeholder="Write your email content here... (plain text, will be sent as a clean HTML email)"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-base leading-relaxed resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-400">
                    Sending via Resend • {stats.totalSubscribers} recipients
                  </p>
                  <Button
                    onClick={handleBroadcast}
                    disabled={sending || !subject.trim() || !body.trim()}
                    className="bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    {sending ? "Sending..." : "Send Broadcast"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminEmails;
