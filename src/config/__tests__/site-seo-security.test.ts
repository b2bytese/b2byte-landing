import { createElement } from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as siteModule from "@/config/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "../../../next.config";
import PrivacyPage, {
  metadata as privacyMetadata,
} from "@/app/politica-de-privacidade/page";

describe("SEO, siteConfig, LGPD e headers de segurança", () => {
  it("resolveSiteUrl sanitiza string vazia, espaços e barras finais", () => {
    const resolveSiteUrl = (
      siteModule as { resolveSiteUrl?: (raw?: string) => string }
    ).resolveSiteUrl;

    expect(typeof resolveSiteUrl).toBe("function");
    expect(resolveSiteUrl!("")).toBe("https://b2byte.com.br");
    expect(resolveSiteUrl!("   ")).toBe("https://b2byte.com.br");
    expect(resolveSiteUrl!(undefined)).toBe("https://b2byte.com.br");
    expect(resolveSiteUrl!(" https://example.com/// ")).toBe(
      "https://example.com"
    );
  });

  it("siteConfig.nav e siteConfig.footer prefixam todas as âncoras com /#", () => {
    const allLinks = [
      ...siteModule.siteConfig.nav,
      ...siteModule.siteConfig.footer.solutions,
      ...siteModule.siteConfig.footer.links,
    ];

    for (const item of allLinks) {
      expect(item.href.startsWith("#")).toBe(false);
    }
  });

  it("robots() inclui disallow '/api/' e sitemap válido", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;

    expect(rules.disallow).toBe("/api/");
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("sitemap() retorna lastModified determinístico entre chamadas", async () => {
    const first = sitemap();
    await new Promise((r) => setTimeout(r, 15));
    const second = sitemap();

    expect(first[0].lastModified).toEqual(second[0].lastModified);
    expect(first[1].lastModified).toEqual(second[1].lastModified);
  });

  it("nextConfig define poweredByHeader: false, HSTS e CSP, e remove X-XSS-Protection", async () => {
    expect(nextConfig.poweredByHeader).toBe(false);

    const headerGroups = await nextConfig.headers!();
    const allHeaders = headerGroups.flatMap((g) => g.headers);
    const headerKeys = allHeaders.map((h) => h.key.toLowerCase());

    expect(headerKeys).not.toContain("x-xss-protection");
    expect(headerKeys).toContain("strict-transport-security");
    expect(headerKeys).toContain("content-security-policy");
  });

  it("PrivacyPage atende skip link, contraste, LGPD (Resend/controlador) e canonical", () => {
    const { container } = render(createElement(PrivacyPage));
    const main = container.querySelector("main");

    expect(main?.id).toBe("main-content");
    expect(container.innerHTML).not.toContain("prose-invert");
    expect(container.innerHTML).not.toContain("text-[var(--color-border)]");
    expect(container.textContent).toMatch(/Resend/i);
    expect(container.textContent).toMatch(/transferência internacional/i);
    expect(container.textContent).toMatch(/controlador/i);
    expect(privacyMetadata.alternates?.canonical).toBe(
      "/politica-de-privacidade"
    );
  });
});
