// Punto de entrada del Worker.
//
// Cloudflare solo ejecuta este código para /api/* (ver "run_worker_first" en
// wrangler.jsonc); el resto del sitio se sirve como archivos estáticos.

import { handleContact } from "./contact";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Cualquier otra ruta de /api/* no existe: devuelve la 404 del sitio.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
