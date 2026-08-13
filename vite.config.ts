// @lovable.dev/vite-tanstack-config already includes the required TanStack, React,
// Tailwind, path alias, diagnostics, and Nitro build integrations.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ["scarf-anime-throat.ngrok-free.dev"],
    },
  },
  nitro: {
    preset: "vercel",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts.
    server: { entry: "server" },
  },
});
