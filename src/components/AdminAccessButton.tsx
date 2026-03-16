import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * A tiny, nearly-invisible settings icon in the footer.
 * Only renders if the current user is an authenticated admin.
 * Clicking navigates to /admin/emails.
 */
export default function AdminAccessButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (data) setIsAdmin(true);
    };
    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => navigate("/admin/emails")}
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm transition-all opacity-30 hover:opacity-100"
      title="Admin Dashboard"
      aria-label="Admin Dashboard"
    >
      <Settings className="h-4 w-4 text-foreground/40" />
    </button>
  );
}
