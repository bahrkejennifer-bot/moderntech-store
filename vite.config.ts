import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        digitalProducts: path.resolve(__dirname, "digital-products/index.html"),
        techGiftCheatsheet: path.resolve(__dirname, "tech-gift-cheatsheet/index.html"),
        freeSmartHomeChecklist: path.resolve(__dirname, "free-smart-home-checklist/index.html"),
        freeSmartRingGuide: path.resolve(__dirname, "free-smart-ring-guide/index.html"),
        freeCreatorGearGuide: path.resolve(__dirname, "free-creator-gear-guide/index.html"),
        freeDormRoomGuide: path.resolve(__dirname, "free-dorm-room-guide/index.html"),
        freeScreenFreeKidsGuide: path.resolve(__dirname, "free-screen-free-kids-guide/index.html"),
        amazonAssociateGuide: path.resolve(__dirname, "amazon-associate-guide/index.html"),
        wellnessSmartRingAnalysis: path.resolve(__dirname, "wellness-smart-ring-analysis/index.html"),
        sonicEdit: path.resolve(__dirname, "sonic-edit/index.html"),
        biometricAudit: path.resolve(__dirname, "biometric-audit/index.html"),
        trendingProducts: path.resolve(__dirname, "trending-products/index.html"),
        signal: path.resolve(__dirname, "signal/index.html"),
      },
    },
  },
}));
