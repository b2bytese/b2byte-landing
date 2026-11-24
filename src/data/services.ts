export type ServiceId = "web" | "systems" | "automation" | "saas";

export interface Service {
  id: ServiceId;
  num: string;
  label: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "web",
    num: "01 / WEB",
    label: "Websites profissionais",
    title: "Sites que geram oportunidades.",
    description:
      "Presença digital profissional, rápida e preparada para transformar visitantes em clientes.",
  },
  {
    id: "systems",
    num: "02 / SYSTEMS",
    label: "Sistemas sob medida",
    title: "Sistemas que simplificam.",
    description:
      "Centralize informações, organize sua operação e substitua planilhas por ferramentas feitas para você.",
  },
  {
    id: "automation",
    num: "03 / AUTOMATION",
    label: "Automação de processos",
    title: "Menos tarefas. Mais tempo.",
    description:
      "Automatize atividades repetitivas e conecte ferramentas para reduzir retrabalho e erros manuais.",
  },
  {
    id: "saas",
    num: "04 / SAAS",
    label: "Produtos SaaS",
    title: "Produtos digitais que evoluem.",
    description:
      "Da validação de uma ideia ao desenvolvimento de plataformas escaláveis e novas funcionalidades.",
  },
];
