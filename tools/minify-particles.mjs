// Genera src/vendor/particles.min.js a partir del paquete npm `particles.js`.
//
// La librería está abandonada (v2.0.0 es la última) y el paquete no trae una
// versión minificada, así que la minificamos una vez y guardamos el resultado
// en el repo. Solo hay que volver a correr esto si cambia la versión instalada:
//
//   npm run vendor:particles
//
// Se mantiene como script clásico (sin convertirlo a módulo ES) porque la
// librería usa `arguments.callee`, que no funciona en modo estricto.

import { build } from "esbuild";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("node_modules/particles.js/package.json", "utf8"));

await build({
  entryPoints: ["node_modules/particles.js/particles.js"],
  outfile: "src/vendor/particles.min.js",
  minify: true,
  legalComments: "none",
  banner: {
    js: `/*! particles.js v${pkg.version} - Vincent Garreau - MIT License - https://github.com/VincentGarreau/particles.js */`,
  },
  logLevel: "info",
});
