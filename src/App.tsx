import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Index from "./pages/Index";
import FreeGuide from "./pages/FreeGuide";
import ConfirmEmail from "./pages/ConfirmEmail";
import TechEssentialsGuide from "./pages/TechEssentialsGuide";
import TechEssentialsSuccess from "./pages/TechEssentialsSuccess";
import TheSignal from "./pages/TheSignal";
import ContactPage from "./pages/ContactPage";
import PromoBanner from "./components/PromoBanner";
import SmartHomeSecurity from "./pages/SmartHomeSecurity";
import WellnessTech from "./pages/WellnessTech";
import DigitalLifestyle from "./pages/DigitalLifestyle";
import ProductivityFamily from "./pages/ProductivityFamily";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import DigitalProducts from "./pages/DigitalProducts";
import TechGiftCheatsheet from "./pages/TechGiftCheatsheet";
import AdminUpload from "./pages/AdminUpload";
import AdminAuth from "./pages/AdminAuth";
import AdminScraper from "./pages/AdminScraper";
import ScrapedProducts from "./pages/ScrapedProducts";
import MyDownloads from "./pages/MyDownloads";
import LeadMagnet from "./pages/LeadMagnet";
import SmartHomeSafetyChecklist from "./pages/SmartHomeSafetyChecklist";
import SmartRingGuide from "./pages/SmartRingGuide";
import CreatorGearGuide from "./pages/CreatorGearGuide";
import DormRoomTechGuide from "./pages/DormRoomTechGuide";
import ScreenFreeKidsGuide from "./pages/ScreenFreeKidsGuide";
import AmazonAssociateGuide from "./pages/AmazonAssociateGuide";
import WellnessSmartRingAnalysis from "./pages/WellnessSmartRingAnalysis";
import SonicEditGuide from "./pages/SonicEditGuide";
import BiometricAuditGuide from "./pages/BiometricAuditGuide";
import NotFound from "./pages/NotFound";
import Signal from "./pages/Signal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import ReturnPolicy from "./pages/ReturnPolicy";
import Contact from "./pages/Contact";
import PinterestCallback from "./pages/PinterestCallback";
import AdminPinterest from "./pages/AdminPinterest";
import AdminTechSpec from "./pages/AdminTechSpec";
import AdminEmails from "./pages/AdminEmails";
import AdminCommandCenter from "./pages/AdminCommandCenter";
import AdminEpisodes from "./pages/AdminEpisodes";
import MediaHub from "./pages/MediaHub";
import ArtOfModernTech from "./pages/ArtOfModernTech";
import EpisodeDetail from "./pages/EpisodeDetail";
import FoundersTechStack from "./pages/FoundersTechStack";
import LinksPage from "./pages/LinksPage";
import CreatorFunnel from "./pages/CreatorFunnel";
import CreatorFunnelSuccess from "./pages/CreatorFunnelSuccess";
import CanvaMasterclass from "./pages/CanvaMasterclass";
import FacelessYoutube from "./pages/FacelessYoutube";
import CreatorBundle from "./pages/CreatorBundle";
import FacelessCreatorBundle from "./pages/FacelessCreatorBundle";
import TechOfTheMonth from "./pages/TechOfTheMonth";
import ProductRedirect from "./pages/ProductRedirect";
import AdminLayout from "./components/AdminLayout";
import AdminAccessButton from "./components/AdminAccessButton";
import { NewsletterPopup } from "./components/NewsletterPopup";
import { usePinterestPageTracking } from "./hooks/usePinterestTracking";
const queryClient = new QueryClient();

const BlogPostRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/weekly-edit/${slug}`} replace />;
};

const PinterestTracker = () => {
  usePinterestPageTracking();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NewsletterPopup />
        <PromoBanner />
        <PinterestTracker />
        <AdminAccessButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/free-guide" element={<FreeGuide />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/free-guide-tech-essentials" element={<TechEssentialsGuide />} />
          <Route path="/free-guide-tech-essentials/success" element={<TechEssentialsSuccess />} />
          <Route path="/the-signal" element={<TheSignal />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* ── Master Category Pages ── */}
          <Route path="/smart-home-security" element={<SmartHomeSecurity />} />
          <Route path="/health-wellness-tech" element={<WellnessTech />} />
          <Route path="/office-essentials" element={<DigitalLifestyle />} />
          <Route path="/kids-stem" element={<ProductivityFamily />} />

          {/* ── Redirects from old category URLs ── */}
          <Route path="/home-safety" element={<Navigate to="/smart-home-security" replace />} />
          <Route path="/connectivity" element={<Navigate to="/smart-home-security" replace />} />
          <Route path="/health-wellness" element={<Navigate to="/health-wellness-tech" replace />} />
          <Route path="/wellness-tech" element={<Navigate to="/health-wellness-tech" replace />} />
          <Route path="/creator-gear" element={<Navigate to="/office-essentials" replace />} />
          <Route path="/gaming" element={<Navigate to="/office-essentials" replace />} />
          <Route path="/digital-lifestyle" element={<Navigate to="/office-essentials" replace />} />
          <Route path="/kids-tech" element={<Navigate to="/kids-stem" replace />} />
          <Route path="/college" element={<Navigate to="/kids-stem" replace />} />
          <Route path="/productivity-family" element={<Navigate to="/kids-stem" replace />} />

          <Route path="/weekly-edit" element={<Blog />} />
          <Route path="/weekly-edit/:slug" element={<BlogPost />} />
          <Route path="/tech-of-the-month" element={<Navigate to="/weekly-edit" replace />} />
          <Route path="/tech-of-the-month/:month" element={<TechOfTheMonth />} />
          <Route path="/blog" element={<Navigate to="/weekly-edit" replace />} />
          <Route path="/blog/:slug" element={<BlogPostRedirect />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
          <Route path="/tech-gift-cheatsheet" element={<TechGiftCheatsheet />} />
          <Route path="/my-downloads" element={<MyDownloads />} />
          <Route path="/free-roadmap" element={<LeadMagnet />} />
          <Route path="/free-smart-home-checklist" element={<SmartHomeSafetyChecklist />} />
          <Route path="/free-smart-ring-guide" element={<SmartRingGuide />} />
          <Route path="/free-creator-gear-guide" element={<CreatorGearGuide />} />
          <Route path="/free-dorm-room-guide" element={<DormRoomTechGuide />} />
          <Route path="/free-screen-free-kids-guide" element={<ScreenFreeKidsGuide />} />
          <Route path="/amazon-associate-guide" element={<AmazonAssociateGuide />} />
          <Route path="/wellness-smart-ring-analysis" element={<WellnessSmartRingAnalysis />} />
          <Route path="/sonic-edit" element={<SonicEditGuide />} />
          <Route path="/biometric-audit" element={<BiometricAuditGuide />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/upload" element={<AdminLayout><AdminUpload /></AdminLayout>} />
          <Route path="/admin/scraper" element={<AdminLayout><AdminScraper /></AdminLayout>} />
          <Route path="/trending-products" element={<ScrapedProducts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/signal" element={<Signal />} />
          <Route path="/pinterest-callback" element={<PinterestCallback />} />
          <Route path="/admin/pinterest" element={<AdminLayout><AdminPinterest /></AdminLayout>} />
          <Route path="/admin/tech-spec" element={<AdminLayout><AdminTechSpec /></AdminLayout>} />
          <Route path="/admin/emails" element={<AdminLayout><AdminEmails /></AdminLayout>} />
          <Route path="/admin/command-center" element={<AdminLayout><AdminCommandCenter /></AdminLayout>} />
          <Route path="/admin/episodes" element={<AdminLayout><AdminEpisodes /></AdminLayout>} />
          <Route path="/the-art-of-modern-tech" element={<ArtOfModernTech />} />
          <Route path="/media" element={<Navigate to="/the-art-of-modern-tech" replace />} />
          <Route path="/media/:id" element={<EpisodeDetail />} />
          <Route path="/founders-tech-stack" element={<FoundersTechStack />} />
          <Route path="/creator-funnel" element={<CreatorFunnel />} />
          <Route path="/creator-funnel/success" element={<CreatorFunnelSuccess />} />
          <Route path="/canva-masterclass" element={<CanvaMasterclass />} />
          <Route path="/faceless-youtube" element={<FacelessYoutube />} />
          <Route path="/creator-bundle" element={<CreatorBundle />} />
          <Route path="/faceless-creator-bundle" element={<FacelessCreatorBundle />} />
          <Route path="/free-amazon-associate-guide" element={<AmazonAssociateGuide />} />
          <Route path="/go/:slug" element={<ProductRedirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
