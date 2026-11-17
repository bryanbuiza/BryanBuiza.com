// Genera public/og-image.png: la imagen de las vistas previas al compartir el sitio
// (LinkedIn, WhatsApp, X…). Toma los textos de src/data/site.ts.
//
//   npm run og-image
//
// Volver a correrlo si cambian el nombre, el subtítulo o la frase del sitio.
// Usa la fuente Segoe UI de Windows (la misma con la que se ve el sitio en Windows);
// en otro sistema, cambiar FONT_FILES por fuentes .ttf disponibles.

import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { site } from "../src/data/site.ts";

const OUTPUT = "public/og-image.png";
const { width: W, height: H } = site.ogImage;

const FONT_FILES = [
  "C:/Windows/Fonts/segoeui.ttf",
  "C:/Windows/Fonts/seguisb.ttf",
  "C:/Windows/Fonts/segoeuib.ttf",
];

// Colores del sitio (Tailwind v3).
const color = {
  bg: "#0f172a", // slate-900
  title: "#e2e8f0", // slate-200
  text: "#94a3b8", // slate-400
  muted: "#64748b", // slate-500
  accent: "#c4b5fd", // violet-300
  dot: "#a78bfa", // violet-400
  line: "#8b5cf6", // violet-500
};

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Red de partículas fija (mismo dibujo en cada ejecución): generador pseudoaleatorio con semilla.
function particles(count, seed) {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const points = Array.from({ length: count }, () => ({
    x: random() * W,
    y: random() * H,
    r: 1.5 + random() * 2.5,
  }));

  const lines = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < 170) {
        const opacity = (0.45 * (1 - distance / 170)).toFixed(2);
        lines.push(
          `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${color.line}" stroke-opacity="${opacity}" stroke-width="1.2"/>`,
        );
      }
    }
  }
  const dots = points.map(
    (p) =>
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}" fill="${color.dot}" fill-opacity="0.7"/>`,
  );
  return [...lines, ...dots].join("\n");
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="20%" r="65%">
      <stop offset="0" stop-color="#6342ad" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#6342ad" stop-opacity="0"/>
    </radialGradient>
    <!-- Oscurece la izquierda para que el texto se lea sobre las partículas. -->
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${color.bg}" stop-opacity="0.95"/>
      <stop offset="0.55" stop-color="${color.bg}" stop-opacity="0.75"/>
      <stop offset="1" stop-color="${color.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${color.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${particles(70, 20261117)}
  <rect width="${W}" height="${H}" fill="url(#fade)"/>

  <g font-family="Segoe UI">
    <text x="80" y="275" font-size="92" font-weight="700" fill="${color.title}" letter-spacing="-1.5">${escape(site.name)}</text>
    <text x="84" y="345" font-size="40" font-weight="600" fill="${color.accent}">${escape(site.role)}</text>
    <text x="84" y="420" font-size="30" fill="${color.text}">${escape(site.tagline)}</text>
    <line x1="84" y1="551" x2="132" y2="551" stroke="${color.accent}" stroke-width="2"/>
    <text x="148" y="560" font-size="26" font-weight="600" fill="${color.muted}" letter-spacing="2">BRYANBUIZA.COM</text>
  </g>
</svg>`;

const rendered = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: "Segoe UI" },
})
  .render()
  .asPng();

// Comprime con paleta de colores: de ~330 KB a ~60 KB sin perder nitidez en el texto.
// WhatsApp no muestra la imagen de la vista previa si pesa más de ~300 KB.
const png = await sharp(rendered)
  .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
  .toBuffer();

writeFileSync(OUTPUT, png);
console.log(`${OUTPUT} (${W}x${H}, ${(png.length / 1024).toFixed(1)} KB)`);
