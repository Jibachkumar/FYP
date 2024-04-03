import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // url request origin comes from same url
      "/api": "http://localhost:7000",
      secure: false,
    },
  },

  plugins: [react()],
});
