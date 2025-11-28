import { ecsstatic } from "@acab/ecsstatic/vite";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid(), tailwind(), ecsstatic()],
  resolve: {
    alias: { "~": "/app" },
  },
});
