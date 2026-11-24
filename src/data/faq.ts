export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Quanto custa desenvolver um projeto?",
    answer:
      "O investimento depende do escopo, das integrações e da complexidade de cada solução. Após entender sua necessidade, elaboramos uma proposta personalizada e transparente.",
  },
  {
    question: "Preciso ter uma ideia completamente definida?",
    answer:
      "Não. A etapa de descoberta existe justamente para organizar suas necessidades e identificar a solução mais adequada para o seu contexto.",
  },
  {
    question: "Vocês desenvolvem projetos do zero?",
    answer:
      "Sim. Desenvolvemos desde a concepção — incluindo arquitetura, design e implementação — até a entrega em produção.",
  },
  {
    question: "É possível automatizar processos existentes?",
    answer:
      "Sim. Avaliamos seus processos atuais e identificamos onde a automação pode reduzir esforço manual, eliminar retrabalho e conectar ferramentas.",
  },
  {
    question: "Vocês integram sistemas diferentes?",
    answer:
      "Podemos avaliar integrações com as ferramentas que você já utiliza, considerando as APIs e recursos disponíveis em cada plataforma.",
  },
  {
    question: "Oferecem manutenção após a entrega?",
    answer:
      "Sim. Podemos planejar manutenção e novas funcionalidades conforme as necessidades do negócio, mediante acordo de escopo.",
  },
  {
    question: "Como funciona a contratação?",
    answer:
      "Começamos com uma conversa para entender seu projeto. Em seguida, apresentamos uma proposta com escopo, prazo estimado e condições. Depois da aprovação, iniciamos o desenvolvimento.",
  },
];
