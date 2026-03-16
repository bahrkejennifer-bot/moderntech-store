import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HomeSafety from "./pages/HomeSafety";
import HealthWellness from "./pages/HealthWellness";
import KidsTech from "./pages/KidsTech";
import Gaming from "./pages/Gaming";
import Connectivity from "./pages/Connectivity";
import College from "./pages/College";
import CreatorGear from "./pages/CreatorGear";
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
import EpisodeDetail from "./pages/EpisodeDetail";
import FoundersTechStack from "./pages/FoundersTechStack";
import LinksPage from "./pages/LinksPage";
import AdminLayout from "./components/AdminLayout";
import AdminAccessButton from "./components/AdminAccessButton";
import { NewsletterPopup } from "./components/NewsletterPopup";
import { usePinterestPageTracking } from "./hooks/usePinterestTracking";
const queryClient = new QueryClient();

const PinterestTracker = () => {
  usePinterestPageTracking();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NewsletterPopup />
      <BrowserRouter>
        <PinterestTracker />
        <AdminAccessButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home-safety" element={<HomeSafety />} />
          <Route path="/health-wellness" element={<HealthWellness />} />
          <Route path="/kids-tech" element={<KidsTech />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/connectivity" element={<Connectivity />} />
          <Route path="/college" element={<College />} />
          <Route path="/creator-gear" element={<CreatorGear />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/pinterest-callback" element={<PinterestCallback />} />
          <Route path="/admin/pinterest" element={<AdminLayout><AdminPinterest /></AdminLayout>} />
          <Route path="/admin/tech-spec" element={<AdminLayout><AdminTechSpec /></AdminLayout>} />
          <Route path="/admin/emails" element={<AdminLayout><AdminEmails /></AdminLayout>} />
          <Route path="/admin/command-center" element={<AdminLayout><AdminCommandCenter /></AdminLayout>} />
          <Route path="/admin/episodes" element={<AdminLayout><AdminEpisodes /></AdminLayout>} />
          <Route path="/media" element={<MediaHub />} />
          <Route path="/media/:id" element={<EpisodeDetail />} />
          <Route path="/founders-tech-stack" element={<FoundersTechStack />} />
          <Route path="/links" element={<LinksPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
