import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const capturedImageProps: Record<string, unknown>[] = [];

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    capturedImageProps.push(props);
    const { src, alt, width, height } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={String(src)} alt={String(alt)} width={Number(width)} height={Number(height)} />;
  },
}));

import { Navbar } from "@/components/layout/Navbar";

describe("Navbar", () => {
  it("botão mobile possui type='button' e tecla Escape fecha o menu mobile aberto", () => {
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /Abrir menu/i });
    expect(toggle.getAttribute("type")).toBe("button");

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById("mobile-nav")).not.toBeNull();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById("mobile-nav")).toBeNull();
  });

  it("logo usa href='/#inicio' e <Image> usa preload em vez de priority depreciado", () => {
    capturedImageProps.length = 0;
    render(<Navbar />);

    const logoLink = screen.getByRole("link", { name: /B2byte — início/i });
    expect(logoLink.getAttribute("href")).toBe("/#inicio");

    expect(capturedImageProps.length).toBeGreaterThan(0);
    expect(capturedImageProps[0].preload).toBe(true);
    expect(capturedImageProps[0].priority).toBeUndefined();
  });
});
