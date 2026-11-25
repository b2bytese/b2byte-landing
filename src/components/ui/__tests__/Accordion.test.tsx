import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "@/components/ui/Accordion";

const sampleItems = [
  {
    question: "Como funciona o processo?",
    answer: "Trabalhamos em etapas claras do diagnóstico à entrega.",
  },
];

describe("Accordion", () => {
  it("renderiza pergunta dentro de <h3> com button[type='button'], aria-expanded e aria-controls válidos", () => {
    render(<Accordion items={sampleItems} />);

    const heading = screen.getByRole("heading", {
      level: 3,
      name: /Como funciona o processo\?/i,
    });
    const button = screen.getByRole("button", {
      name: /Como funciona o processo\?/i,
    });

    expect(heading.contains(button)).toBe(true);
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.getAttribute("aria-controls")).toBeTruthy();
    expect(button.id).toBeTruthy();
  });

  it("ao abrir, renderiza painel com role='region' e aria-labelledby apontando para o botão", () => {
    render(<Accordion items={sampleItems} />);

    const button = screen.getByRole("button", {
      name: /Como funciona o processo\?/i,
    });
    fireEvent.click(button);

    expect(button.getAttribute("aria-expanded")).toBe("true");
    const panelId = button.getAttribute("aria-controls");
    const region = screen.getByRole("region", {
      name: /Como funciona o processo\?/i,
    });

    expect(region.id).toBe(panelId);
    expect(region.getAttribute("aria-labelledby")).toBe(button.id);
    expect(region.textContent).toContain(
      "Trabalhamos em etapas claras do diagnóstico à entrega."
    );
  });
});
