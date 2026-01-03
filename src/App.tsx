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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import DigitalProducts from "./pages/DigitalProducts";
import TechGiftCheatsheet from "./pages/TechGiftCheatsheet";
import AdminUpload from "./pages/AdminUpload";
import AdminAuth from "./pages/AdminAuth";
import MyDownloads from "./pages/MyDownloads";
import NotFound from "./pages/NotFound";
import { NewsletterPopup } from "./components/NewsletterPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NewsletterPopup />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home-safety" element={<HomeSafety />} />
          <Route path="/health-wellness" element={<HealthWellness />} />
          <Route path="/kids-tech" element={<KidsTech />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/connectivity" element={<Connectivity />} />
          <Route path="/college" element={<College />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/digital-products" element={<DigitalProducts />} />
          <Route path="/tech-gift-cheatsheet" element={<TechGiftCheatsheet />} />
          <Route path="/my-downloads" element={<MyDownloads />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
