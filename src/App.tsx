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
import NotFound from "./pages/NotFound";
import Signal from "./pages/Signal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import ReturnPolicy from "./pages/ReturnPolicy";
import Contact from "./pages/Contact";
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
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/scraper" element={<AdminScraper />} />
          <Route path="/trending-products" element={<ScrapedProducts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
