import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

describe("globals.css (Tailwind CSS v4 cascade)", () => {
  const css = readFileSync(
    path.resolve(process.cwd(), "src/app/globals.css"),
    "utf8"
  );

  it("declara html, body e :focus-visible dentro de @layer base", () => {
    const layerBaseMatch = css.match(/@layer\s+base\s*\{([\s\S]*?)\n\}/);
    expect(layerBaseMatch).not.toBeNull();
    const layerBaseContent = layerBaseMatch?.[1] ?? "";

    expect(layerBaseContent).toMatch(/html\s*\{/);
    expect(layerBaseContent).toMatch(/body\s*\{/);
    expect(layerBaseContent).toMatch(/:focus-visible\s*\{/);
  });

  it("não declara regras globais unlayered sobrescrevendo a, button/input ou *", () => {
    const withoutLayers = css
      .replace(/@layer\s+base\s*\{[\s\S]*?\n\}/g, "")
      .replace(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\n\}/g, "");

    expect(withoutLayers).not.toMatch(/^\s*\*\s*\{/m);
    expect(withoutLayers).not.toMatch(/^\s*a\s*\{/m);
    expect(withoutLayers).not.toMatch(/^\s*button\s*,/m);
  });
});
