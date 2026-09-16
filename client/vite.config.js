import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves project sites from /<repository-name>/ in production.
  // Keep the local development site at the root URL.
  base: mode === "production" ? "/job-application-tracker/" : "/",
  plugins: [react()],
}));
