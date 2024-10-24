import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";

export default defineConfig({
  plugins: [react(), magicalSvg({ target: "react" })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "test/setup/setup.ts")],
  },
});
