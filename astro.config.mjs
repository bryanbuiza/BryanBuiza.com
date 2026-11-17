// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Dominio canónico: se usa para og:url, el sitemap y las URLs absolutas.
  site: "https://bryanbuiza.com",
  // Genera sitemap-index.xml (la 404 queda fuera automáticamente).
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          // Vite nombra el CSS según el primer componente que lo importa, lo que
          // da nombres confusos. Lo llamamos "styles" para que sea claro.
          assetFileNames: (asset) =>
            asset.names.some((name) => name.endsWith(".css"))
              ? "_astro/styles.[hash][extname]"
              : "_astro/[name].[hash][extname]",
        },
      },
    },
  },
});
