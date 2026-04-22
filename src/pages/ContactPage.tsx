import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const subjectOptions = ["General Inquiry", "Business Partnership", "Podcast Guest", "Press"];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    try {
      await supabase.functions.invoke("send-welcome-email", {
        body: {
          name: form.name.trim(),
          email: "bahrkejennifer@gmail.com",
          lead_magnet: "contact-form",
          subject: form.subject,
          message: form.message.trim(),
          sender_email: form.email.trim(),
        },
      });
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vogue-theme min-h-screen" style={{ backgroundColor: "hsl(30 25% 95%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Contact — ModernTech</title>
        <meta name="description" content="Get in touch with the Modern Tech team. General inquiries, business partnerships, podcast guest requests, and press." />
      </Helmet>
      <Navigation />

      <section className="max-w-[600px] mx-auto px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
            GET IN TOUCH
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
            Contact Us
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none"
            style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
          />
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none appearance-none cursor-pointer"
            style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
          >
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt} style={{ backgroundColor: "hsl(30 25% 95%)" }}>{opt}</option>
            ))}
          </select>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your message..."
            rows={6}
            required
            className="w-full px-4 py-3 font-mono text-[12px] tracking-[0.05em] bg-transparent outline-none resize-none"
            style={{ border: "0.5px solid hsl(220 15% 14% / 0.2)", color: "hsl(220 15% 14%)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
          >
            {loading ? "Sending..." : "Send Message"} <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        {/* Business Email */}
        <div className="text-center pt-8" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
          <Mail className="w-5 h-5 mx-auto mb-3" style={{ color: "hsl(220 15% 14% / 0.3)" }} />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
            BUSINESS EMAIL
          </p>
          <a href="mailto:info@moderntech.store" className="font-mono text-[12px] tracking-[0.05em] hover:opacity-60 transition-opacity">
            info@moderntech.store
          </a>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default ContactPage;
