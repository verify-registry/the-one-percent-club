import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadPublicAuthConfig() {
  const configPath = path.resolve(__dirname, "firebase-applet-config.json");
  const raw = JSON.parse(fs.readFileSync(configPath, "utf8"));
  return {
    apiKey: String(raw.apiKey || ""),
    authDomain: String(raw.authDomain || ""),
    projectId: String(raw.projectId || ""),
    appId: String(raw.appId || ""),
  };
}

export default defineConfig({
  plugins: [react()],
  define: {
    __FIREBASE_AUTH_CONFIG__: JSON.stringify(loadPublicAuthConfig()),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    lib: {
      entry: path.resolve(__dirname, "src/auth/firebaseAuthBridge.ts"),
      name: "SovereignAuth",
      formats: ["iife"],
      fileName: () => "firebase-auth-bridge.js",
    },
    rollupOptions: {
      output: {
        exports: "default",
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
});
