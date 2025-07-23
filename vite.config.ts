import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This allows SCSS @use/@import from src/
        additionalData: `@use "@/scss/abstracts/colors" as *;
                         @use "@/scss/abstracts/fonts" as *;
                         @use "@/scss/abstracts/mixins" as *;
                         @use "@/scss/abstracts/spacings" as *;`,
      },
    },
  },
});
