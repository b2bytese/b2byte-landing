import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/sections/ContactForm";

afterEach(() => {
  vi.restoreAllMocks();
});

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/Seu nome/i), {
    target: { value: "Maria Silva" },
  });
  fireEvent.change(screen.getByLabelText(/E-mail/i), {
    target: { value: "maria@acme.com.br" },
  });
  fireEvent.change(screen.getByLabelText(/Tipo de projeto/i), {
    target: { value: "sistema-sob-medida" },
  });
  fireEvent.change(screen.getByLabelText(/Sobre seu projeto/i), {
    target: { value: "Precisamos de um sistema sob medida para nossa operação." },
  });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("ContactForm", () => {
  it("não renderiza elemento <label> aninhado dentro de outro <label>", () => {
    const { container } = render(<ContactForm />);
    expect(container.querySelector("label label")).toBeNull();
  });

  it("associa campos aos seus labels via htmlFor/id e aplica aria-invalid e aria-describedby em erro", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Seu nome/i);
    expect(nameInput.id).toBeTruthy();

    fireEvent.submit(screen.getByRole("form", { name: /Formulário de contato/i }));

    await waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe("true");
    });

    const describedBy = nameInput.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl?.getAttribute("role")).toBe("alert");
    expect(errorEl?.textContent).toMatch(/Nome deve ter pelo menos 2 caracteres/i);
  });

  it("possui link para /politica-de-privacidade no consentimento e autoComplete='off' no honeypot", () => {
    const { container } = render(<ContactForm />);

    const privacyLink = screen.getByRole("link", {
      name: /Política de Privacidade/i,
    });
    expect(privacyLink.getAttribute("href")).toBe("/politica-de-privacidade");

    const honeypot = container.querySelector('input[name="honeypot"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot?.getAttribute("autocomplete")).toBe("off");
  });

  it("exibe mensagem amigável em pt-BR quando o servidor retorna 502 HTML não-JSON", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("<html><body>502 Bad Gateway</body></html>", {
        status: 502,
        headers: { "content-type": "text/html" },
      })
    );

    render(<ContactForm />);
    fillValidForm();

    fireEvent.submit(screen.getByRole("form", { name: /Formulário de contato/i }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).not.toMatch(/SyntaxError|Unexpected token/i);
    expect(alert.textContent).toMatch(/Erro ao enviar mensagem/i);
  });

  it("botão 'Enviar outra mensagem' após envio bem-sucedido possui type='button'", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );

    render(<ContactForm />);
    fillValidForm();

    fireEvent.submit(screen.getByRole("form", { name: /Formulário de contato/i }));

    const resetBtn = await screen.findByRole("button", {
      name: /Enviar outra mensagem/i,
    });
    expect(resetBtn.getAttribute("type")).toBe("button");
  });
});
