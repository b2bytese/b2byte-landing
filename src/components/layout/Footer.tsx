import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AsciiBackground } from "@/components/graphics/AsciiBackground";

const YEAR = 2026;

const SOLUTIONS = [
  { label: "Desenvolvimento web", href: "/#solucoes" },
  { label: "Sistemas personalizados", href: "/#solucoes" },
  { label: "Automações", href: "/#solucoes" },
  { label: "Produtos SaaS", href: "/#solucoes" },
];

const COMPANY_LINKS = [
  { label: "Por que B2byte", href: "/#diferenciais" },
  { label: "Processo", href: "/#processo" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/#contato" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

export function Footer() {
  return (
    <footer
      className="m-3 border border-[var(--color-border)] rounded-[20px] relative isolate overflow-hidden pt-[48px] pb-[24px]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 75%,#1E1B4B,#0B0F1A 70%)",
      }}
    >
      <AsciiBackground opacity={0.15} />

      {/* Footer grid */}
      <div
        className="relative z-[1] w-[min(1480px,calc(100%-100px))] mx-auto grid gap-5"
        style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
      >
        {/* Brand column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            B2byte
          </span>
          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block text-[19px] mr-[14px] mb-[10px] text-[var(--color-brand-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              {siteConfig.contact.email} ↗
            </a>
          )}
          {siteConfig.location && (
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {siteConfig.location}
            </p>
          )}
        </div>

        {/* Solutions column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            Soluções
          </span>
          {SOLUTIONS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-block mr-[14px] mb-[10px] text-[19px] text-[var(--color-brand-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Company column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            Empresa
          </span>
          {COMPANY_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-block mr-[14px] mb-[10px] text-[19px] text-[var(--color-brand-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Big logo */}
      <div
        className="relative z-[1] mx-auto block my-[45px]"
        style={{ width: "min(100%,1050px)" }}
        aria-hidden="true"
      >
        <Image
          src="/images/logo-primary.svg"
          alt=""
          width={1050}
          height={445}
          className="w-full h-auto"
        />
      </div>

      {/* Copyright */}
      <div
        className="relative z-[1] w-[min(1480px,calc(100%-100px))] mx-auto flex justify-between gap-[10px] border-t border-[var(--color-border)] pt-[18px] text-xs text-[var(--color-muted)]"
      >
        <span>© {YEAR} {siteConfig.name}. Todos os direitos reservados.</span>
        <span>Desenvolvido pela equipe B2byte</span>
      </div>
    </footer>
  );
}
