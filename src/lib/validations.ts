import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  company: z.string().max(100, "Nome da empresa muito longo").trim().optional(),
  email: z
    .string()
    .email("E-mail inválido")
    .max(254, "E-mail muito longo")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(20, "Telefone inválido")
    .trim()
    .optional()
    .or(z.literal("")),
  projectType: z.enum([
    "site-institucional",
    "sistema-sob-medida",
    "automacao",
    "produto-saas",
    "outro",
  ], "Selecione um tipo de projeto"),
  message: z
    .string()
    .min(10, "Descreva um pouco mais o seu projeto")
    .max(2000, "Mensagem muito longa")
    .trim(),
  consent: z.literal(true, "Você precisa aceitar para enviar o contato"),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectTypeLabels: Record<
  ContactFormData["projectType"],
  string
> = {
  "site-institucional": "Site institucional",
  "sistema-sob-medida": "Sistema sob medida",
  automacao: "Automação de processos",
  "produto-saas": "Produto SaaS",
  outro: "Outro projeto",
};
