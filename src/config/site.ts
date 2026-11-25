const DEFAULT_SITE_URL = "https://b2byte.com.br";

export function resolveSiteUrl(rawUrl?: string): string {
  const cleaned = rawUrl?.trim().replace(/\/+$/, "");
  if (!cleaned) return DEFAULT_SITE_URL;

  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return cleaned;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "B2byte Software Engineering",
  shortName: "B2byte",
  description:
    "Desenvolvemos sites, sistemas e automações sob medida para empresas que querem crescer, simplificar operações e transformar tecnologia em resultados.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "pt-BR",
  location: "Brasília, Brasil",

  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  social: {
    linkedin: null as string | null,
    github: null as string | null,
    instagram: null as string | null,
  },

  nav: [
    { label: "Soluções", href: "/#solucoes" },
    { label: "Diferenciais", href: "/#diferenciais" },
    { label: "Nosso processo", href: "/#processo" },
    { label: "Contato", href: "/#contato" },
  ],

  footer: {
    solutions: [
      { label: "Websites profissionais", href: "/#solucoes" },
      { label: "Sistemas sob medida", href: "/#solucoes" },
      { label: "Automação de processos", href: "/#solucoes" },
      { label: "Produtos SaaS", href: "/#solucoes" },
    ],
    links: [
      { label: "Diferenciais", href: "/#diferenciais" },
      { label: "Nosso processo", href: "/#processo" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contato", href: "/#contato" },
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    ],
  },
};
