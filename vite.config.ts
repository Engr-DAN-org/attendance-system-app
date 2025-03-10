import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 👈 Enables polling to detect file changes inside Docker
    },
    host: "0.0.0.0", // 👈 Allows access from Docker container
    port: 5173, // 👈 Default Vite dev server port (change if needed)
    strictPort: true, // Ensures the port doesn't switch randomly
    hmr: {
      clientPort: 24678, // Ensure HMR works with the exposed port
    },
  },
});
