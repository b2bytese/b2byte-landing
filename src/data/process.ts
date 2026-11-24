export interface ProcessStep {
  num: string;
  phase: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    phase: "Descoberta",
    title: "Entender",
    description: "Conhecemos o negócio, os desafios e as prioridades.",
  },
  {
    num: "02",
    phase: "Planejamento",
    title: "Projetar",
    description: "Definimos escopo, experiência, arquitetura e entregas.",
  },
  {
    num: "03",
    phase: "Construção",
    title: "Desenvolver",
    description: "Implementamos e validamos a solução em ciclos.",
  },
  {
    num: "04",
    phase: "Entrega",
    title: "Evoluir",
    description: "Colocamos em produção e alinhamos próximos passos.",
  },
];
