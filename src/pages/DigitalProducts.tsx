import { useState } from "react";
import { Helmet } from "react-helmet-async";
import StructuredData from "@/components/StructuredData";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Video, Palette, Youtube, Sparkles, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import coverReels from "@/assets/cover-reels.jpg";
import coverCanva from "@/assets/cover-canva.jpg";
import coverYoutube from "@/assets/cover-youtube.jpg";
import AffiliateFooter from "@/components/AffiliateFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const products = [
  {
    icon: Video,
    title: "Reels Master Class",
    desc: "Learn how to create attention-grabbing reels that stop the scroll and help people notice your brand.",
    included: "Hooks, content ideas, structure tips, and practical strategies for better short-form videos.",
    price: "FREE",
    cta: "Get the Free Guide",
    to: "/creator-funnel",
    isFree: true,
    cover: coverReels,
  },
  {
    icon: Palette,
    title: "Canva Master Class",
    desc: "Create polished graphics, digital products, and branded content in Canva without feeling overwhelmed.",
    included: "Design tips, branding guidance, layout ideas, and practical ways to create beautiful content faster.",
    price: "$29",
    cta: "Buy for $29",
    to: "/canva-masterclass",
    isFree: false,
    cover: coverCanva,
  },
  {
    icon: Youtube,
    title: "YouTube Master Class",
    desc: "Build smarter YouTube content with practical strategies for video structure, branding, and audience growth.",
    included: "Planning tips, video flow, channel growth ideas, and guidance for creating useful, engaging content.",
    price: "$49",
    cta: "Buy for $49",
    to: "/faceless-youtube",
    isFree: false,
    cover: coverYoutube,
  },
];

const DigitalProducts = () => {
  const [bundleLoading, setBundleLoading] = useState(false);

  const handleBundleCheckout = async () => {
    setBundleLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: "The Complete Creator Bundle",
          productSlug: "creator-bundle",
          amount: 5900,
          successUrl: "https://moderntech.store/creator-funnel/success?product=creator-bundle",
          cancelUrl: "https://moderntech.store/digital-products",
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setBundleLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(220 15% 14%)" }}>
      <Helmet>
        <title>Digital Products — Modern Tech</title>
        <meta name="description" content="Explore Modern Tech's digital guides designed to help creators, entrepreneurs, and beginners make better content, build stronger branding, and grow online." />
      </Helmet>
      <StructuredData
        title="Digital Products — Modern Tech"
        description="Explore Modern Tech's digital guides designed to help creators, entrepreneurs, and beginners make better content, build stronger branding, and grow online."
        path="/digital-products"
      />
      <Navigation />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-8 pt-28 pb-10 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
          Modern Tech
        </p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 400 }}>
          Digital Products
        </h1>
        <p className="font-mono text-[12px] tracking-[0.05em] leading-relaxed max-w-xl mx-auto" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
          Explore Modern Tech's digital guides designed to help creators, entrepreneurs, and beginners make better content, build stronger branding, and grow online with practical tools and strategies.
        </p>
      </header>

      {/* Bundle Featured Section */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="p-8 md:p-12 text-center" style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}>
          <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 mb-4" style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}>
            Best Value
          </span>
          <h2 className="font-serif text-2xl md:text-3xl mb-2" style={{ fontWeight: 400 }}>
            Start with the Full Bundle
          </h2>
          <p className="font-mono text-[11px] leading-relaxed mb-6 max-w-lg mx-auto" style={{ color: "hsl(30 25% 95% / 0.6)" }}>
            Want the complete system? Get all three master classes together for just $59. This bundle is perfect for anyone who wants to improve short-form content, design better visuals, and grow on YouTube while saving money.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-mono text-[12px] line-through" style={{ color: "hsl(30 25% 95% / 0.4)" }}>$78</span>
            <span className="font-serif text-4xl" style={{ color: "hsl(14 50% 88%)" }}>$59</span>
          </div>
          <p className="font-mono text-[10px] mb-6" style={{ color: "hsl(30 25% 95% / 0.5)" }}>
            Buy all 3 for $59 and save $19
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBundleCheckout}
              disabled={bundleLoading}
              className="inline-flex items-center gap-2 h-12 px-10 font-mono text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "hsl(14 50% 88%)", color: "hsl(220 15% 14%)" }}
            >
              {bundleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Get the Bundle <Sparkles className="w-3 h-3" /></>}
            </button>
            <Link
              to="/creator-bundle"
              className="font-mono text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-70"
              style={{ color: "hsl(30 25% 95% / 0.5)" }}
            >
              See what's included →
            </Link>
          </div>
        </div>
      </section>

      {/* Individual Products */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-center mb-10" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
          Choose Your Master Class
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Link
                key={product.title}
                to={product.to}
                className="group flex flex-col transition-all duration-300 hover:shadow-lg overflow-hidden"
                style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.1)" }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.cover}
                    alt={`${product.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                </div>
                <div className="p-8">
                <h3 className="font-serif text-xl mb-3" style={{ fontWeight: 400 }}>{product.title}</h3>
                <p className="font-mono text-[11px] leading-relaxed mb-4 flex-1" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
                  {product.desc}
                </p>

                <div className="pt-4 mb-4" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(220 15% 14% / 0.4)" }}>
                    What's included
                  </p>
                  <p className="font-mono text-[10px] leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
                    {product.included}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="font-serif text-2xl">{product.price}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] uppercase group-hover:translate-x-1 transition-transform" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
                    {product.cta} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto text-center py-16" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
            Built for Real People Creating Real Content
          </h2>
          <p className="font-mono text-[11px] leading-relaxed max-w-lg mx-auto" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
            These guides are designed to be practical, easy to follow, and useful whether you're just starting out or ready to level up your content and brand.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4" style={{ fontWeight: 400 }}>
            Start Building Better Content Today
          </h2>
          <p className="font-mono text-[11px] leading-relaxed mb-8" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
            Choose the guide that fits your next step, or get the full bundle and save.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/creator-bundle"
              className="inline-flex items-center gap-2 h-12 px-10 font-mono text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
              style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
            >
              Get the Bundle <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-mono text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "hsl(220 15% 14% / 0.5)" }}
            >
              Shop Digital Products ↑
            </a>
          </div>
        </div>
      </section>

      <AffiliateFooter />
    </div>
  );
};

export default DigitalProducts;