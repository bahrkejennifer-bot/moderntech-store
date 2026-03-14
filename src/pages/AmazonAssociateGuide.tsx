import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import AffiliateFooter from "@/components/AffiliateFooter";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/heroes/workspace-minimalist-bw.jpg";
import { FreeGuideModal } from "@/components/FreeGuideModal";

const AmazonAssociateGuide = () => {
  const [downloading, setDownloading] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setDownloading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [0.5, 0.6, 0.5, 0.6],
        filename: "Amazon-Associate-Quick-Start-Guide-ModernTech.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], before: ".pdf-page-break" },
      };
      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setDownloading(false);
    }
  };

  const steps = [
    { number: "01", title: "The Foundation", desc: "Setting up your luxury affiliate portal — domain, branding & the architecture of trust." },
    { number: "02", title: "Curation Over Quantity", desc: "How to select high-ticket items that fit the brand — the editorial eye for premium products." },
    { number: "03", title: "The Editorial Hook", desc: "Writing reviews that feel like magazine features — storytelling that converts discerning readers." },
    { number: "04", title: "The Pinterest Pipeline", desc: "Driving high-intent traffic through aesthetic pins — from board strategy to viral reach." },
    { number: "05", title: "Scaling to $500+", desc: "The roadmap to your first high-ticket commissions — compounding authority into revenue." },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(40 18% 91%)", color: "hsl(40 10% 12%)" }}>
      <Helmet>
        <title>Free Amazon Associate Quick-Start Guide 2026 | Modern Tech</title>
        <meta name="description" content="Everything you need to launch your Amazon affiliate journey — from signup to your first commission, in 5 actionable pages." />
        <meta property="og:title" content="Free Amazon Associate Quick-Start Guide 2026" />
        <meta property="og:description" content="Launch your Amazon affiliate journey — from signup to your first commission in 5 pages." />
        <meta property="og:image" content="https://moderntech.store/images/products/amazon-associate-guide-cover.jpg" />
        <meta property="og:url" content="https://moderntech.store/amazon-associate-guide" />
        <meta property="og:type" content="article" />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
              The Modern Tech Blueprint — Free 5-Page Guide
            </p>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-6" style={{ fontStyle: "italic" }}>
              Amazon Associate<br />Quick-Start Guide
            </h1>
            <p className="font-mono text-[11px] leading-[2] max-w-md mb-10" style={{ color: "hsl(40 10% 12% / 0.6)" }}>
              From application to first commission — the definitive playbook for building an affiliate platform with editorial integrity.
            </p>
            <Button
              onClick={() => setGuideModalOpen(true)}
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-10 py-5 transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "transparent",
                color: "hsl(40 10% 12%)",
                border: "1px solid hsl(40 10% 12%)",
                borderRadius: "0",
              }}
            >
              ACCESS THE BLUEPRINT <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Minimalist workspace with laptop and natural light"
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: "contrast(1.05)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-center px-8 py-8"
                style={{ backgroundColor: "rgba(26, 26, 24, 0.55)" }}
              >
                <p
                  className="font-mono text-[11px] tracking-[0.4em] uppercase"
                  style={{ color: "#ffffff" }}
                >
                  Curated Precision
                </p>
                <p
                  className="font-serif text-lg md:text-xl mt-2"
                  style={{ fontStyle: "italic", color: "#ffffff", fontWeight: 400 }}
                >
                  For the Modern Professional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Intelligence */}
      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="mb-16" style={{ borderTop: "0.5px solid hsl(40 10% 12% / 0.15)" }}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase pt-8 mb-12" style={{ color: "hsl(40 10% 12% / 0.4)" }}>
            Industry Intelligence — What's Inside
          </p>
          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[60px_1fr] gap-8">
                <span className="font-serif text-3xl" style={{ fontStyle: "italic", color: "hsl(40 10% 12% / 0.25)" }}>
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                  <p className="font-mono text-[10px] leading-[2]" style={{ color: "hsl(40 10% 12% / 0.6)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PDF CONTENT (hidden visually, used for PDF generation) ===================== */}
      <div
        ref={contentRef}
        className="fixed left-[-9999px] top-0 w-[8.5in] bg-white text-black"
        style={{ fontFamily: "Inter, Arial, sans-serif", fontSize: "12pt", lineHeight: "1.6" }}
      >
        {/* PAGE 1 */}
        <div style={{ padding: "0.5in 0.6in" }}>
          <div style={{ textAlign: "center", marginBottom: "24px", borderBottom: "3px solid #2563eb", paddingBottom: "16px" }}>
            <h1 style={{ fontSize: "26pt", fontWeight: 900, color: "#1e3a5f", margin: 0 }}>Amazon Associate</h1>
            <h2 style={{ fontSize: "18pt", fontWeight: 700, color: "#2563eb", margin: "4px 0 8px" }}>Quick-Start Guide</h2>
            <p style={{ fontSize: "10pt", color: "#6b7280" }}>By Modern Tech LLC • moderntech-store.lovable.app</p>
          </div>

          <h2 style={{ fontSize: "18pt", color: "#1e3a5f", marginBottom: "12px" }}>1. What Is Amazon Associates?</h2>
          <p>Amazon Associates is Amazon's official affiliate marketing program. When you recommend a product and someone purchases through your unique link, you earn a commission — typically 1% to 10% depending on the product category.</p>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Why It Works</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Trust:</strong> Amazon is the world's most trusted online retailer. People already have accounts and Prime memberships.</li>
            <li><strong>24-hour cookie:</strong> You earn a commission on <em>everything</em> the customer buys within 24 hours of clicking your link — not just the product you recommended.</li>
            <li><strong>Massive catalog:</strong> Over 350 million products means you can find affiliate opportunities in virtually any niche.</li>
            <li><strong>Zero inventory:</strong> No shipping, returns, or customer service — Amazon handles it all.</li>
          </ul>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Commission Rate Highlights (2026)</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", fontSize: "10pt" }}>
            <thead>
              <tr style={{ background: "#2563eb", color: "white" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Category</th>
                <th style={{ padding: "8px", textAlign: "center" }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Luxury Beauty & Fashion", "10%"],
                ["Digital Music & Video", "5%"],
                ["Home, Kitchen, Garden", "3%"],
                ["Electronics, Computers", "2.5%"],
                ["Video Games, Toys", "2%"],
                ["Health & Personal Care", "1–4.5%"],
              ].map(([cat, rate], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f3f4f6" : "white" }}>
                  <td style={{ padding: "6px 8px" }}>{cat}</td>
                  <td style={{ padding: "6px 8px", textAlign: "center" }}>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: "9pt", color: "#6b7280", marginTop: "6px" }}>
            Tip: High-ticket items like smart TVs or laptops yield bigger payouts even at lower rates.
          </p>
        </div>

        {/* PAGE 2 */}
        <div className="pdf-page-break" style={{ padding: "0.5in 0.6in" }}>
          <h2 style={{ fontSize: "18pt", color: "#1e3a5f", marginBottom: "12px" }}>2. How to Sign Up & Get Approved</h2>

          <h3 style={{ fontSize: "14pt", color: "#2563eb" }}>Step-by-Step Signup</h3>
          <ol style={{ paddingLeft: "20px" }}>
            <li>Go to <strong>affiliate-program.amazon.com</strong> and click "Sign Up."</li>
            <li>Log in with your existing Amazon account (or create one).</li>
            <li>Enter your website, blog, or social media URL where you'll promote products.</li>
            <li>Fill in your profile: preferred store ID, what your site is about, and how you drive traffic.</li>
            <li>Enter your payment and tax information.</li>
            <li>You'll receive your Associate ID immediately and can start creating links.</li>
          </ol>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>The 180-Day Qualification Window</h3>
          <p>After signing up, you have <strong>180 days to generate at least 3 qualifying sales</strong>. If you don't hit this target, your account is closed (but you can re-apply). Here's how to ensure you qualify:</p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Have at least 10–15 pieces of original content on your site before applying.</li>
            <li>Focus on products you've actually used or thoroughly researched.</li>
            <li>Share your content with friends and family to generate those first 3 sales.</li>
            <li>Avoid "thin" content — Amazon reviews applications manually.</li>
          </ul>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Common Rejection Reasons (and Fixes)</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Not enough content:</strong> Publish at least 10 original articles before applying.</li>
            <li><strong>No privacy policy or disclosure:</strong> Add both to your website footer.</li>
            <li><strong>Site looks incomplete:</strong> Use a professional theme with clear navigation.</li>
            <li><strong>Misleading claims:</strong> Never promise discounts or cashback through your affiliate links.</li>
          </ul>
        </div>

        {/* PAGE 3 */}
        <div className="pdf-page-break" style={{ padding: "0.5in 0.6in" }}>
          <h2 style={{ fontSize: "18pt", color: "#1e3a5f", marginBottom: "12px" }}>3. Creating Affiliate Links That Convert</h2>

          <h3 style={{ fontSize: "14pt", color: "#2563eb" }}>Types of Affiliate Links</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Text links:</strong> Simple hyperlinks embedded in your content. Highest conversion when placed naturally within helpful context.</li>
            <li><strong>Image links:</strong> Product images that link to Amazon. Great for visual content.</li>
            <li><strong>Native Shopping Ads:</strong> Dynamic ad units that display relevant products automatically.</li>
            <li><strong>SiteStripe:</strong> Amazon's toolbar that lets you generate links while browsing Amazon.com.</li>
          </ul>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Link Best Practices</h3>
          <ol style={{ paddingLeft: "20px" }}>
            <li><strong>Always disclose:</strong> FTC requires clear disclosure. Use: "As an Amazon Associate, I earn from qualifying purchases."</li>
            <li><strong>Use short links:</strong> Amazon's "amzn.to" short links are cleaner and more clickable.</li>
            <li><strong>Link contextually:</strong> Place links where someone has just been convinced — after a benefit, not before.</li>
            <li><strong>Don't cloak links:</strong> Amazon prohibits link cloaking. Use their provided link formats only.</li>
            <li><strong>Test your links:</strong> Click each link to make sure it contains your Associate tag.</li>
          </ol>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Pro Tip: The "Comparison" Strategy</h3>
          <p>Create comparison posts like "AirPods Pro 2 vs. Sony WH-1000XM5" — these attract high-intent buyers who are ready to purchase. Include affiliate links for ALL compared products. If a reader clicks any of them, you win.</p>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: "8px", padding: "12px", marginTop: "12px" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#1e3a5f" }}>⚡ Quick Win:</p>
            <p style={{ margin: 0 }}>Add a "Check Price on Amazon" button to every product mention. Buttons convert 2–3× better than plain text links.</p>
          </div>
        </div>

        {/* PAGE 4 */}
        <div className="pdf-page-break" style={{ padding: "0.5in 0.6in" }}>
          <h2 style={{ fontSize: "18pt", color: "#1e3a5f", marginBottom: "12px" }}>4. Content Strategies That Drive Clicks</h2>

          <h3 style={{ fontSize: "14pt", color: "#2563eb" }}>The 5 Highest-Converting Content Types</h3>
          <ol style={{ paddingLeft: "20px" }}>
            <li><strong>Product Reviews:</strong> In-depth, honest reviews with pros, cons, and a clear verdict. Include personal photos when possible.</li>
            <li><strong>"Best Of" Roundups:</strong> "Best Budget Headphones Under $50" — these rank well in search and attract comparison shoppers.</li>
            <li><strong>How-To Guides:</strong> Tutorials that naturally recommend products. "How to Set Up a Home Office" → link to desks, monitors, webcams.</li>
            <li><strong>Gift Guides:</strong> Seasonal guides ("Best Tech Gifts for Dad") spike during holidays and drive massive traffic.</li>
            <li><strong>Problem-Solution Posts:</strong> "My WiFi Keeps Dropping — Here's What Fixed It" → link to the router you recommend.</li>
          </ol>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>SEO Basics for Affiliate Content</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Target buyer keywords:</strong> "best," "review," "vs," "for [use case]" signal purchase intent.</li>
            <li><strong>Write 1,500+ words:</strong> Longer, comprehensive content tends to rank higher and convert better.</li>
            <li><strong>Use headers (H2, H3):</strong> Structure your content so it's scannable.</li>
            <li><strong>Add alt text to images:</strong> Helps with Google Image search traffic.</li>
            <li><strong>Internal linking:</strong> Link between your own posts to keep readers on your site longer.</li>
          </ul>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Traffic Sources Beyond SEO</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Pinterest:</strong> Create product pins that link to your blog posts. Pinterest users are active shoppers.</li>
            <li><strong>YouTube:</strong> Video reviews with affiliate links in the description.</li>
            <li><strong>Email newsletter:</strong> Build a list and send product recommendations weekly.</li>
            <li><strong>Social media:</strong> Share content on relevant Facebook groups, Reddit communities, and Twitter.</li>
          </ul>
        </div>

        {/* PAGE 5 */}
        <div className="pdf-page-break" style={{ padding: "0.5in 0.6in" }}>
          <h2 style={{ fontSize: "18pt", color: "#1e3a5f", marginBottom: "12px" }}>5. Scaling to Your First $500/Month</h2>

          <h3 style={{ fontSize: "14pt", color: "#2563eb" }}>The Math Behind $500/Month</h3>
          <p>Assuming a 3% commission rate and $50 average order value, you earn ~$1.50 per sale. To hit $500/month, you need roughly <strong>333 qualifying sales</strong>, or about <strong>11 sales per day</strong>.</p>
          <p>With a typical 2% click-to-sale conversion rate, you need ~550 affiliate link clicks per day, which translates to roughly <strong>2,000–3,000 daily page views</strong>.</p>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Your 90-Day Action Plan</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
            <thead>
              <tr style={{ background: "#2563eb", color: "white" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Phase</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Timeline</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#f3f4f6" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>Foundation</td>
                <td style={{ padding: "6px 8px" }}>Days 1–30</td>
                <td style={{ padding: "6px 8px" }}>Pick a niche, set up your site, publish 10 posts, apply to Associates</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>Growth</td>
                <td style={{ padding: "6px 8px" }}>Days 31–60</td>
                <td style={{ padding: "6px 8px" }}>Publish 2 posts/week, set up Pinterest, start email list, get 3 qualifying sales</td>
              </tr>
              <tr style={{ background: "#f3f4f6" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>Scale</td>
                <td style={{ padding: "6px 8px" }}>Days 61–90</td>
                <td style={{ padding: "6px 8px" }}>Optimize top posts, add video content, pitch guest posts, analyze & double down on winners</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontSize: "14pt", color: "#2563eb", marginTop: "16px" }}>Key Mistakes to Avoid</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li><strong>Don't spread too thin:</strong> Pick 1–2 niches and go deep rather than covering everything.</li>
            <li><strong>Don't ignore compliance:</strong> Always include your affiliate disclosure and privacy policy.</li>
            <li><strong>Don't buy fake traffic:</strong> Amazon will terminate your account if they detect artificial clicks.</li>
            <li><strong>Don't copy content:</strong> Original, authentic content always outperforms copied reviews.</li>
          </ul>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#166534", fontSize: "13pt" }}>🚀 Ready to Start?</p>
            <p style={{ margin: "6px 0 0" }}>Visit <strong>moderntech-store.lovable.app</strong> for curated product picks, free guides, and ongoing affiliate tips. Join our newsletter for monthly tech roundups!</p>
          </div>

          <div style={{ borderTop: "2px solid #e5e7eb", marginTop: "20px", paddingTop: "10px", fontSize: "9pt", color: "#6b7280", textAlign: "center" }}>
            <p>© {new Date().getFullYear()} Modern Tech LLC • moderntech-store.lovable.app</p>
            <p>As an Amazon Associate, we earn from qualifying purchases. #ad</p>
          </div>
        </div>
      </div>

      <AffiliateFooter />
    </div>
  );
};

export default AmazonAssociateGuide;
