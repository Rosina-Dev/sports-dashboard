import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/sports-dashboard/",
  plugins: [react()],
});
