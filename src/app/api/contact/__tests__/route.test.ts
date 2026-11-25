import { describe, it, expect, vi, beforeEach } from "vitest";

const { sendMock, isConfiguredMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  isConfiguredMock: vi.fn(),
}));

vi.mock("@/lib/resend", () => ({
  resend: {
    emails: {
      send: sendMock,
    },
  },
  getResendClient: () => ({
    emails: {
      send: sendMock,
    },
  }),
  isResendConfigured: isConfiguredMock,
}));

import { POST } from "@/app/api/contact/route";

const validBody = {
  name: "Maria Silva",
  company: "Acme",
  email: "maria@acme.com.br",
  phone: "(61) 99999-0000",
  projectType: "sistema-sob-medida",
  message: "Gostaria de desenvolver um sistema sob medida.",
  consent: true,
  honeypot: "",
};

function makeRequest(body: unknown, ip: string, headers: Record<string, string> = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("https://b2byte.com.br/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-real-ip": ip,
      ...headers,
    },
    body: raw,
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CONTACT_FROM_EMAIL = "noreply@b2byte.com.br";
    process.env.CONTACT_TO_EMAIL = "contato@b2byte.com.br";
    isConfiguredMock.mockReturnValue(true);
    sendMock.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  it("retorna 502 quando resend.emails.send retorna { data: null, error }", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    sendMock.mockResolvedValueOnce({
      data: null,
      error: { name: "validation_error", message: "Domain not verified" },
    });

    const response = await POST(makeRequest(validBody, "10.0.1.1"));
    const json = await response.json();

    expect(response.status).toBe(502);
    expect(json.success).toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("retorna 200 silenciosamente sem chamar resend quando honeypot está preenchido", async () => {
    const response = await POST(
      makeRequest({ ...validBody, honeypot: "http://bot.example" }, "10.0.1.2")
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("retorna 503 com mensagem genérica sem expor nomes de variáveis de ambiente", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    isConfiguredMock.mockReturnValueOnce(false);

    const response = await POST(makeRequest(validBody, "10.0.1.3"));
    const json = await response.json();

    expect(response.status).toBe(503);
    expect(json.message).not.toMatch(/RESEND_API_KEY|CONTACT_FROM_EMAIL|CONTACT_TO_EMAIL/);
    errorSpy.mockRestore();
  });

  it("retorna 413 quando payload excede 8000 bytes mesmo sem content-length", async () => {
    const hugeBody = JSON.stringify({ ...validBody, message: "a".repeat(9_000) });
    const req = new Request("https://b2byte.com.br/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-real-ip": "10.0.1.4",
      },
      body: hugeBody,
    });

    const response = await POST(req);
    expect(response.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sanitiza CRLF no assunto e preenche 'Não informado' quando company e phone são vazios", async () => {
    const response = await POST(
      makeRequest(
        {
          ...validBody,
          name: "Maria\r\nBcc: evil@example.com",
          company: "",
          phone: "",
        },
        "10.0.1.5"
      )
    );

    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.subject).not.toMatch(/[\r\n]/);
    expect(payload.text).toContain("Empresa: Não informado");
    expect(payload.text).toContain("Telefone: Não informado");
  });

  it("retorna 422 com fieldErrors quando name tem apenas espaços", async () => {
    const response = await POST(
      makeRequest({ ...validBody, name: "   " }, "10.0.1.6")
    );
    const json = await response.json();

    expect(response.status).toBe(422);
    expect(json.errors?.name).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("retorna 400 para JSON malformado e 429 após exceder 5 requisições por minuto do mesmo IP", async () => {
    const badJsonRes = await POST(makeRequest("{invalid-json", "10.0.1.7"));
    expect(badJsonRes.status).toBe(400);

    for (let i = 0; i < 5; i++) {
      const okRes = await POST(makeRequest(validBody, "10.0.1.8"));
      expect(okRes.status).toBe(200);
    }
    const limitedRes = await POST(makeRequest(validBody, "10.0.1.8"));
    expect(limitedRes.status).toBe(429);
  });
});
