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
} as const;

export const navLinks = [
  { href: "#about", label: "Acerca de" },
  { href: "#experience", label: "Experiencia" },
] as const;

export type SocialIcon = "linkedin" | "email";

export const socialLinks: { label: string; href: string; icon: SocialIcon; external: boolean }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bryanbuiza/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "Correo electrónico",
    href: "mailto:hello@bryanbuiza.com",
    icon: "email",
    external: false,
  },
];
