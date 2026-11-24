import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), {
    name: "removed-tablet-handout",
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        // Do not let Vite's SPA fallback turn the removed public PDF into HTTP 200.
        if (req.url?.split("?")[0] === "/downloads/kids-first-tablet-handout.pdf") {
          res.statusCode = 404;
          res.end("Not found");
          return;
        }
        next();
      });
    },
  }].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
