// Fondo animado de partículas (misma configuración que el sitio original).
//
// La librería particles.js no funciona como módulo ES (usa `arguments.callee`,
// prohibido en modo estricto), así que BaseLayout carga src/vendor/particles.min.js
// como script clásico y aquí solo se usa la función global `window.particlesJS`.

declare global {
  interface Window {
    particlesJS: (tagId: string, params: object) => void;
  }
}

const config = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#a78bfa" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
    opacity: { value: 0.6, random: false, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: { enable: true, distance: 150, color: "#8b5cf6", opacity: 0.4, width: 1 },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
};

export function initParticles(containerId = "particles-js") {
  if (document.getElementById(containerId)) {
    window.particlesJS(containerId, config);
  }
}
