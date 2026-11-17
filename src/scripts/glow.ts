// Rebote del resplandor del fondo al hacer scroll.
//
// El resplandor (.bg-glow) está fijo a la pantalla. Al hacer scroll recibe un
// pequeño empujón en la dirección del contenido y vuelve a su lugar como un
// resorte: se pasa un poco, rebota y se detiene. Si el sistema pide reducir
// animaciones, el resplandor queda quieto.

// Valores ajustados para que un giro de rueda lo mueva ~15 px, rebote ~5 px
// hacia el otro lado y se asiente en ~1 s.

/** Cuánto empuja cada píxel de scroll. */
const KICK = 0.06;
/** Fuerza con que el resorte lo devuelve a su lugar (más alto = más rápido). */
const STIFFNESS = 0.06;
/** Cuánta velocidad conserva en cada cuadro (más bajo = menos rebotes). */
const DAMPING = 0.85;
/** Desplazamiento máximo en píxeles. */
const MAX_OFFSET = 24;
/** Tope del empujón por evento, para saltos grandes (p. ej. al hacer clic en el menú). */
const MAX_DELTA = 120;

export function initGlow() {
  const glow = document.querySelector<HTMLElement>("[data-glow]");
  if (!glow || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let lastScrollY = window.scrollY;
  let offset = 0;
  let velocity = 0;
  let frame = 0;

  const step = () => {
    velocity = (velocity - offset * STIFFNESS) * DAMPING;
    offset += velocity;
    if (Math.abs(offset) > MAX_OFFSET) {
      // Al llegar al tope se frena ahí y el resorte lo trae de vuelta.
      offset = Math.sign(offset) * MAX_OFFSET;
      velocity = 0;
    }

    const settled = Math.abs(offset) < 0.1 && Math.abs(velocity) < 0.1;
    if (settled) {
      offset = 0;
      velocity = 0;
      frame = 0;
    } else {
      frame = requestAnimationFrame(step);
    }
    glow.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  };

  window.addEventListener(
    "scroll",
    () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      // Al bajar, el contenido sube: el resplandor lo acompaña un poco hacia arriba.
      velocity -= Math.max(-MAX_DELTA, Math.min(MAX_DELTA, delta)) * KICK;
      if (!frame) frame = requestAnimationFrame(step);
    },
    { passive: true },
  );
}
