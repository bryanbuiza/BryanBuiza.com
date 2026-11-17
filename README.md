# bryanbuiza.com

Sitio personal de Bryan Buiza. Hecho con [Astro](https://astro.build) y
[Tailwind CSS](https://tailwindcss.com), publicado en Cloudflare Workers.

## Comandos

| Comando                    | Qué hace                                                       |
| -------------------------- | -------------------------------------------------------------- |
| `npm install`              | Instala las dependencias                                       |
| `npm run dev`              | Servidor local con recarga en `localhost:4321`                 |
| `npm run build`            | Revisa tipos y genera el sitio estático en `dist/`             |
| `npm run preview`          | Sirve `dist/` localmente para revisarlo                        |
| `npm run preview:worker`   | Compila y lo sirve con el emulador de Cloudflare en `:8787`    |
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
tools/
  minify-particles.mjs   Genera src/vendor/particles.min.js desde node_modules
wrangler.jsonc           Configuración de Cloudflare Workers
.node-version            Versión de Node que usa el build de Cloudflare
```

## Publicación

Cada push a `main` dispara un build en Cloudflare (Workers Builds) que corre
`npm run build` y `npx wrangler deploy`. Cloudflare sirve `dist/` como archivos
estáticos, sin ejecutar código propio.

Para actualizar contenido (un trabajo nuevo, otro párrafo, cambiar el CV), en
general basta con editar los archivos de `src/data/` o reemplazar el PDF en
`public/resources/`.

## Notas

- Los colores, la fuente y la sombra de las tarjetas están fijados a los valores
  de Tailwind v3 en `src/styles/global.css`, para que el diseño sea idéntico al
  sitio original.
- `particles.js` se carga como script clásico porque no funciona como módulo ES
  (ver `src/scripts/particles.ts`). La librería está abandonada y su paquete no
  trae versión minificada, así que la minificamos una vez con
  `npm run vendor:particles` y guardamos el resultado en `src/vendor/`.
