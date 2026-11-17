// Datos generales del sitio: textos del encabezado, metadatos y redes.

export const site = {
  name: "Bryan Buiza",
  description:
    "Bryan Buiza es ingeniero industrial y consultor TI. Ayuda a las empresas a mejorar sus procesos con tecnología.",
  /** Subtítulo bajo el nombre. */
  role: "Ingeniero industrial · Consultor TI",
  tagline: "Ayudo a las empresas a mejorar sus procesos con tecnología.",
  ogImage: "https://placehold.co/1200x630/0f172a/e2e8f0?text=Bryan+Buiza",
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
