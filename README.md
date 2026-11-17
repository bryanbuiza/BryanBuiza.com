# bryanbuiza.com

Sitio personal de Bryan Buiza. Hecho con [Astro](https://astro.build) y
[Tailwind CSS](https://tailwindcss.com), publicado en Cloudflare Workers.

## Comandos

| Comando                    | Qué hace                                                       |
| -------------------------- | -------------------------------------------------------------- |
| `npm install`              | Instala las dependencias                                       |
| `npm run dev`              | Servidor local con recarga en `localhost:4321`                 |
| `npm run build`            | Revisa tipos (sitio y Worker) y genera el sitio en `dist/`     |
| `npm run preview`          | Sirve `dist/` localmente para revisarlo                        |
| `npm run preview:worker`   | Compila y lo sirve con el emulador de Cloudflare en `:8787`    |
| `npm run cf-typegen`       | Regenera los tipos del Worker tras cambiar `wrangler.jsonc`    |
| `npm run format`           | Formatea el código con Prettier                                |
| `npm run deploy`           | Compila y publica a mano (requiere `npx wrangler login`)       |
| `npm run vendor:particles` | Regenera `src/vendor/particles.min.js` (casi nunca hace falta) |

## Estructura

```
public/                  Archivos que se copian tal cual (favicons, CV en PDF, robots.txt)
  _headers               Cabeceras HTTP de Cloudflare (caché de _astro/)
src/
  data/                  Contenido editable: textos, redes, experiencia
    site.ts              Nombre, descripción, subtítulo, redes, enlace al CV
    about.ts             Párrafos de "Acerca de"
    experience.ts        Lista de trabajos
  layouts/
    BaseLayout.astro     <head>, metadatos, fondo de partículas y resplandor
  components/
    Header.astro         Columna izquierda: nombre, subtítulo, navegación, redes
    Section.astro        Sección con título sticky en móvil
    ContactForm.astro    Formulario de contacto (envía a /api/contact)
    ExperienceItem.astro Tarjeta de un trabajo
    TechTag.astro        Etiqueta de tecnología
    GlitchText.astro     Texto con efecto glitch (autocontenido; hoy solo en la 404)
    icons/               Íconos SVG
  scripts/
    particles.ts         Configuración del fondo de partículas
  styles/global.css      Tailwind + estilos propios (partículas)
  vendor/
    particles.min.js     Librería de terceros ya minificada (generada, no editar)
  pages/
    index.astro          Página principal
    404.astro            Página de error
worker/                  Código que corre en Cloudflare (solo para /api/*)
  index.ts               Punto de entrada: /api/contact o 404
  contact.ts             Valida el formulario, verifica Turnstile y envía el correo
  worker-configuration.d.ts  Tipos generados por `npm run cf-typegen` (no editar)
tools/
  minify-particles.mjs   Genera src/vendor/particles.min.js desde node_modules
wrangler.jsonc           Configuración de Cloudflare Workers
.node-version            Versión de Node que usa el build de Cloudflare
```

## Publicación

Cada push a `main` dispara un build en Cloudflare (Workers Builds) que corre
`npm run build` y `npx wrangler deploy`. Cloudflare sirve `dist/` como archivos
estáticos; solo `/api/*` ejecuta el Worker de `worker/`.

Configuración en el panel de Cloudflare (no está en el repo):

- **Worker `bryanbuiza` → Domains & Routes:** `bryanbuiza.com` y `www.bryanbuiza.com`
  como Custom Domains.
- **Zona → Rules → Redirect Rules:** `*://www.bryanbuiza.com/*` →
  `https://bryanbuiza.com/${2}` (301, conserva la query string).
- **Zona → SSL/TLS → Edge Certificates:** Always Use HTTPS activado.
- **Zona → Email → Email Routing:** activado, con el correo de destino verificado
  (necesario para que el Worker pueda enviar los mensajes del formulario).
- **Turnstile:** widget para `bryanbuiza.com`. Su clave pública va en
  `src/data/site.ts`; la secreta, como secreto del Worker.
- **Worker → Settings → Variables and Secrets:** `TURNSTILE_SECRET_KEY` y
  `CONTACT_TO_EMAIL` (a dónde llegan los mensajes).

El dominio canónico es `bryanbuiza.com` (sin www), definido en `astro.config.mjs`.

Para actualizar contenido (un trabajo nuevo, otro párrafo, cambiar el CV), en
general basta con editar los archivos de `src/data/` o reemplazar el PDF en
`public/resources/`.

## Desarrollo local del formulario

```bash
cp .env.example .env            # clave pública de prueba de Turnstile
cp .dev.vars.example .dev.vars  # clave secreta de prueba y destinatario
npm run preview:worker          # http://127.0.0.1:8787
```

Con las claves de prueba Turnstile siempre aprueba, y el correo no se envía: se
guarda en `.wrangler/tmp/email/` (la ruta aparece en la consola).

## Notas

- Los colores, la fuente y la sombra de las tarjetas están fijados a los valores
  de Tailwind v3 en `src/styles/global.css`, para que el diseño sea idéntico al
  sitio original.
- `particles.js` se carga como script clásico porque no funciona como módulo ES
  (ver `src/scripts/particles.ts`). La librería está abandonada y su paquete no
  trae versión minificada, así que la minificamos una vez con
  `npm run vendor:particles` y guardamos el resultado en `src/vendor/`.
