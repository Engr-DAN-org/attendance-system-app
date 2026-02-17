import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Attendance System",
        short_name: "SAS",
        description: "Attendance System for managing attendance records",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        categories: ["productivity", "utilities"],
        icons: [
          {
            src: "/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true, // 👈 Enables polling to detect file changes inside Docker
    },
    host: "0.0.0.0", // 👈 Allows access from Docker container
    port: 5173, // 👈 Default Vite dev server port (change if needed)
    strictPort: true, // Ensures the port doesn't switch randomly
    // hmr: {
    //   clientPort: 24678, // Ensure HMR works with the exposed port
    // },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
