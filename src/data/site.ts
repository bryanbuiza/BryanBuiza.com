// Datos generales del sitio: textos del encabezado, metadatos y redes.

export const site = {
  name: "Bryan Buiza",
  /** Título de la pestaña y de los resultados de Google (idealmente < 60 caracteres). */
  title: "Bryan Buiza · Ingeniero industrial y consultor TI",
  /** Texto bajo el título en Google y en las vistas previas (idealmente < 160 caracteres). */
  description:
    "Bryan Buiza es ingeniero industrial y consultor TI. Ayuda a las empresas a mejorar sus procesos con tecnología.",
  /** Subtítulo bajo el nombre. */
  role: "Ingeniero industrial · Consultor TI",
  tagline: "Ayudo a las empresas a mejorar sus procesos con tecnología.",
  /** Imagen de las vistas previas en redes. Se genera con `npm run og-image`. */
  ogImage: {
    path: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Bryan Buiza — Ingeniero industrial y consultor TI",
  },
  themeColor: "#0f172a",
  cvUrl: "/resources/cv_bryan_buiza_2025_aug_esp.pdf",
  /**
   * Clave pública (site key) del widget de Turnstile del formulario de contacto.
   * Es pública: va en el HTML. En local, .env la reemplaza por la clave de prueba.
   */
  turnstileSiteKey: "0x4AAAAAAGFkqhJiRqvyGmZS",
} as const;

export const navLinks = [
  { href: "#about", label: "Acerca de" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
] as const;

export type SocialIcon = "linkedin";

export const socialLinks: { label: string; href: string; icon: SocialIcon; external: boolean }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bryanbuiza/",
    icon: "linkedin",
    external: true,
  },
];
