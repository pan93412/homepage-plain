import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        mainLocalized: resolve(__dirname, "index.zh-TW.html"),
      },
    },
  },
});
