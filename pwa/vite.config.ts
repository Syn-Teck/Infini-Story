import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    // Set VITE_BASE_PATH (for example "/infini-story/") when the app is hosted
    // below a domain root. The default keeps the usual domain-root deployment.
    base: env.VITE_BASE_PATH || "/",
    plugins: [react()],
    build: {
      target: "es2022",
      sourcemap: true,
    },
  };
});
