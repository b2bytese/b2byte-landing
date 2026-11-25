import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations";

const validPayload = {
  name: "Maria Silva",
  company: "Acme Ltda",
  email: "maria@acme.com.br",
  phone: "(61) 99999-0000",
  projectType: "sistema-sob-medida" as const,
  message: "Precisamos de um sistema sob medida para gestão.",
  consent: true as const,
  honeypot: "",
};

describe("contactSchema", () => {
  it("rejeita name composto apenas por espaços em branco", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejeita message composta apenas por espaços em branco", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: "            ",
    });
    expect(result.success).toBe(false);
  });

  it("apara espaços e normaliza email para minúsculas antes de validar", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      email: "  Maria@ACME.com.br  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("maria@acme.com.br");
    }
  });

  it("permite honeypot preenchido no schema para silenciamento na rota", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      honeypot: "http://spam.example",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.honeypot).toBe("http://spam.example");
    }
  });

  it("aceita company e phone vazios ou omitidos", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      company: "",
      phone: "",
    });
    expect(result.success).toBe(true);
  });
});
