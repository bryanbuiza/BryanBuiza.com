// Experiencia laboral, de la más reciente a la más antigua.

export interface Experience {
  /** Texto visible, p. ej. "Febrero 2021 — Presente". */
  period: string;
  /** Versión para lectores de pantalla, p. ej. "Febrero 2021 a Presente". */
  periodLabel: string;
  role: string;
  company: string;
  url: string;
  description: string;
  technologies: string[];
}

export const experience: Experience[] = [
  {
    period: "Febrero 2021 — Presente",
    periodLabel: "Febrero 2021 a Presente",
    role: "Software Engineer",
    company: "BW2 Technologies AG",
    url: "https://bw2.com/",
    description:
      "En BW2, he evolucionado de rol junior a ingeniero senior, trabajando en el desarrollo de proyectos robustos para nuestros clientes. Mi trabajo en el producto ERP se centró en integrar nuevas funcionalidades, específicamente en el módulo del CRM. Para ello, implementé la integración de APIs de servicios base como Google y Microsoft, así como la conexión con APIs de servicios de nicho específicas para las necesidades de nuestros clientes.",
    technologies: ["VB.Net", ".NET Framework", "SQL Server", "Javascript"],
  },
  {
    period: "Octubre 2020 — Enero 2021",
    periodLabel: "Octubre 2020 a Enero 2021",
    role: "Practicante de Business Intelligence",
    company: "COOPAC Kori",
    url: "https://kori.pe/",
    description:
      "Durante mi tiempo como practicante, utilicé herramientas como Excel y Power BI para transformar datos en insights. Desarrollé y entregué proyectos clave, como un reporte de mora automatizado con un proceso ETL en Power BI y un mapa interactivo que visualizaba el Nivel Socioeconómico (NSE) por distrito. Estos proyectos me enseñaron el poder de los datos para informar decisiones de negocio y la importancia de la visualización clara.",
    technologies: ["Microsoft Excel", "Power BI"],
  },
];
