import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // host: true also shows a "Network" link, so you can open the site on your phone
  server: { host: true },
});
