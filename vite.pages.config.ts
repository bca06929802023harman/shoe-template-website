import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/shoe-template-website/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist-pages",
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
  },
});
