import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardMockup } from "@/components/illustrations/DashboardMockup";
import { SegmentsSection } from "@/components/sections/SegmentsSection";

describe("DashboardMockup a11y", () => {
  it("marca container decorativo com aria-hidden='true' e não renderiza <aside>", () => {
    const { container } = render(<DashboardMockup />);
    const root = container.firstElementChild;

    expect(root?.getAttribute("aria-hidden")).toBe("true");
    expect(root?.getAttribute("aria-label")).toBeNull();
    expect(container.querySelector("aside")).toBeNull();
  });
});

describe("SegmentsSection a11y", () => {
  it("renderiza <ul aria-label='Segmentos atendidos'> com 6 itens <li>", () => {
    render(<SegmentsSection />);

    const list = screen.getByRole("list", { name: /Segmentos atendidos/i });
    expect(list.tagName).toBe("UL");
    expect(list.querySelectorAll("li")).toHaveLength(6);
  });
});
