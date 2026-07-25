import { Helmet } from "react-helmet-async";
import mtLogo from "@/assets/mt-monogram-logo.png";

const LINKS = [
  {
    emoji: "🌐",
    label: "Visit ModernTech.store — Smart Tech Curated for You",
    url: "https://moderntech.store",
  },
  {
    emoji: "💰",
    label: "Get The $27 Blueprint — Build Affiliate Income",
    url: "https://moderntech.store/blueprint",
    badge: "HOT",
    badgeColor: "bg-amber-500/90 text-black",
  },
  {
    emoji: "📥",
    label: "FREE Guide — Amazon Affiliate Quick-Start",
    url: "https://moderntech.store/free-guide",
    badge: "FREE",
    badgeColor: "bg-emerald-500/90 text-black",
  },
  {
    emoji: "🎙️",
    label: "The Art of Modern Tech Podcast — Monday Nights",
    url: "https://moderntech.store/the-signal",
  },
  {
    emoji: "📺",
    label: "YouTube — @ModernTech944 (528 Videos)",
    url: "https://www.youtube.com/@ModernTech944",
  },
  {
    emoji: "📌",
    label: "Pinterest — Daily Tech Inspiration",
    url: "https://www.pinterest.com/moderntechllc",
  },
  {
    emoji: "📱",
    label: "Instagram — @modtechworld",
    url: "https://www.instagram.com/modtechworld",
  },
  {
    emoji: "🎵",
    label: "TikTok — @moderntech.store",
    url: "https://www.tiktok.com/@moderntech.store",
  },
  {
    emoji: "📘",
    label: "Facebook — Modern Tech Community",
    url: "https://www.facebook.com/ModernTech",
  },
  {
    emoji: "🛒",
    label: "Shop Amazon Favorites — Affiliate Picks",
    url: "https://www.amazon.com/shop/moderntechllc?tag=moderntechs04-20",
  },
];

const LinksPage = () => {
  return (
    <div className="links-page min-h-screen flex flex-col items-center relative overflow-hidden">
      <Helmet>
        <title>Links — Modern Tech LLC | Jennifer Bahrke</title>
        <meta name="description" content="All links in one place. Smart tech picks, free guides, The Signal podcast, and more from Modern Tech LLC." />
      </Helmet>

      {/* Background */}
      <div className="fixed inset-0 z-0" style={{
        background: "linear-gradient(165deg, #0a0a0f 0%, #0d0d1a 40%, #0f0a14 70%, #0a0a0f 100%)",
      }} />

      {/* Gold shimmer overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse 600px 400px at 50% 20%, rgba(212,175,55,0.4), transparent),
                          radial-gradient(ellipse 400px 300px at 30% 80%, rgba(212,175,55,0.2), transparent),
                          radial-gradient(ellipse 500px 350px at 70% 60%, rgba(212,175,55,0.15), transparent)`,
        animation: "shimmer 8s ease-in-out infinite alternate",
      }} />

      {/* Grain texture */}
      <div className="fixed inset-0 z-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.02; transform: scale(1); }
          50% { opacity: 0.05; transform: scale(1.02); }
          100% { opacity: 0.02; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .link-btn {
          animation: fadeUp 0.5s ease-out both;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[480px] mx-auto px-5 py-14">

        {/* Profile */}
        <div className="text-center mb-8" style={{ animation: "fadeUp 0.4s ease-out both" }}>
          <div className="w-[88px] h-[88px] mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-amber-400/20 ring-offset-2 ring-offset-[#0a0a0f]">
            <img src={mtLogo} alt="Jennifer Bahrke — Modern Tech LLC" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif text-[22px] font-semibold text-white tracking-tight leading-tight">
            Jennifer Bahrke
          </h1>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mt-1.5">
            Founder, Modern Tech LLC
          </p>
          <p className="font-serif text-[13px] text-amber-300/50 italic mt-2.5 tracking-wide">
            Tech Today. Trend Tomorrow.
          </p>
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 mb-8" style={{ animation: "fadeUp 0.45s ease-out both" }}>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3))" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "rgba(212,175,55,0.4)" }} />
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3), transparent)" }} />
        </div>

        {/* Links */}
        <div className="space-y-3">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn group relative flex items-center gap-3.5 w-full px-5 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${0.1 + i * 0.06}s`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(212,175,55,0.06), inset 0 0 20px rgba(212,175,55,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span className="text-lg flex-shrink-0 w-7 text-center">{link.emoji}</span>
              <span className="flex-1 text-white/90 text-[13px] font-medium leading-snug font-['Inter']">
                {link.label}
              </span>
              {link.badge && (
                <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${link.badgeColor}`}>
                  {link.badge}
                </span>
              )}
              <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-amber-400/50 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-1.5" style={{ animation: "fadeUp 0.5s ease-out 0.8s both" }}>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/15">
            © {new Date().getFullYear()} Modern Tech LLC
          </p>
          <p className="font-serif text-[10px] italic tracking-wide text-amber-400/20">
            The Art of Modern Tech
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
