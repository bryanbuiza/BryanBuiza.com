// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Dominio canónico: se usa para og:url y las URLs absolutas.
  site: "https://bryanbuiza.com",
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
