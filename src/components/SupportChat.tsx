import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const TOKEN_KEY = "mt_support_token";

const getVisitorToken = (): string => {
  const existing = window.localStorage.getItem(TOKEN_KEY);
  if (existing && existing.length >= 20) return existing;
  const token = crypto.randomUUID() + crypto.randomUUID().slice(0, 8);
  window.localStorage.setItem(TOKEN_KEY, token);
  return token;
};

const SUPPRESSED_PREFIXES = ["/links", "/free-guide", "/admin", "/the-edit", "/blog"];

const SupportChat = () => {
  const location = useLocation();
  const suppressed = SUPPRESSED_PREFIXES.some((p) => location.pathname.startsWith(p));

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [escalating, setEscalating] = useState(false);
  const [escalationEmail, setEscalationEmail] = useState("");
  const [escalated, setEscalated] = useState(false);

  const tokenRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  const GREETING: ChatMessage = {
    role: "assistant",
    content: "Hi! I'm the Modern Tech support assistant. Ask me about our guides, downloads, returns, or anything else - and if I can't help, I'll hand you over to a real person.",
  };

  const openChat = () => {
    tokenRef.current = getVisitorToken();
    setIsOpen(true);
  };

  // Load history once per open session; greet optimistically so the panel never looks broken
  useEffect(() => {
    if (!isOpen || loadedRef.current || !tokenRef.current) return;
    loadedRef.current = true;
    setMessages((prev) => (prev.length ? prev : [GREETING]));
    supabase.functions
      .invoke("support-chat", { body: { action: "history", visitorToken: tokenRef.current } })
      .then(({ data, error: err }) => {
        if (err) return;
        const history = (data?.messages ?? []) as ChatMessage[];
        if (history.length) setMessages(history);
        if (data?.status === "escalated") setEscalated(true);
      });
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, sending]);

  if (suppressed) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || sending || !tokenRef.current) return;
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const { data, error: err } = await supabase.functions.invoke("support-chat", {
        body: { action: "message", visitorToken: tokenRef.current, message: text },
      });
      if (err) throw err;
      if (data?.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
      if (data?.status === "escalated") setEscalated(true);
    } catch {
      setError("Sorry, something went wrong. Please try again in a moment.");
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const escalate = async () => {
    const email = escalationEmail.trim();
    if (!email || sending || !tokenRef.current) return;
    setSending(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.functions.invoke("support-chat", {
        body: { action: "escalate", visitorToken: tokenRef.current, email },
      });
      if (err) throw err;
      if (data?.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
      setEscalated(true);
      setEscalating(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the team. Please email info@moderntech.store directly.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={openChat}
        aria-label="Open support chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 print:hidden"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[32rem] max-h-[80vh] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl print:hidden">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div>
          <p className="font-serif text-base font-semibold">Modern Tech Support</p>
          <p className="text-xs text-muted-foreground">Answers from our help docs</p>
        </div>
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Close support chat" className="rounded-full p-1.5 hover:bg-background">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={m.role === "user"
              ? "max-w-[85%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2.5 text-sm text-background"
              : "max-w-[85%] rounded-2xl rounded-bl-sm bg-card px-3.5 py-2.5 text-sm text-foreground"}>
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-card px-3.5 py-2.5 text-sm text-muted-foreground">Typing…</div>
          </div>
        )}
        {error && <p className="text-center text-xs text-destructive">{error}</p>}
      </div>

      {!escalated && !escalating && (
        <div className="border-t border-border px-3 pt-2">
          <button
            type="button"
            onClick={() => setEscalating(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <Headset className="h-3.5 w-3.5" aria-hidden="true" /> Talk to a person
          </button>
        </div>
      )}

      {escalating && !escalated && (
        <div className="space-y-2 border-t border-border px-3 pt-2">
          <p className="text-xs text-muted-foreground">Leave your email and we'll send this conversation to the team. They reply from info@moderntech.store.</p>
          <div className="flex gap-2">
            <Input
              type="email"
              value={escalationEmail}
              onChange={(e) => setEscalationEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Your email address"
              className="h-9 text-sm"
            />
            <Button type="button" size="sm" onClick={escalate} disabled={sending || !escalationEmail.trim()} className="h-9">
              Send
            </Button>
          </div>
        </div>
      )}

      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => { e.preventDefault(); send(); }}
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          aria-label="Type your question"
          maxLength={1000}
          className="h-10 text-sm"
        />
        <Button type="submit" size="icon" disabled={sending || !input.trim()} aria-label="Send message" className="h-10 w-10 shrink-0">
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
};

export default SupportChat;
