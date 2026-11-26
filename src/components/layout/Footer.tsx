import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AsciiBackground } from "@/components/graphics/AsciiBackground";

const YEAR = 2026;

const NAV_LINKS = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Sobre nós", href: "/#diferenciais" },
  { label: "Processo", href: "/#processo" },
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
        {/* Navigation column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            Navegação
          </span>
          <div className="flex flex-wrap gap-x-[14px] gap-y-[10px]">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[19px] text-[var(--color-brand-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            Contato
          </span>
          <Link
            href="/#contato"
            className="text-[19px] text-[var(--color-brand-text)] hover:text-[var(--color-accent)] transition-colors"
          >
            Vamos conversar ↗
          </Link>
        </div>

        {/* Location column */}
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[15px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]">
            Localização
          </span>
          {siteConfig.location && (
            <p className="text-[19px] text-[var(--color-brand-text)] mb-[10px]">
              {siteConfig.location}
            </p>
          )}
          <a
            href="#inicio"
            className="text-[19px] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Voltar ao topo ↑
          </a>
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
      <div className="relative z-[1] w-[min(1480px,calc(100%-100px))] mx-auto flex justify-between gap-[10px] border-t border-[var(--color-border)] pt-[18px] text-xs text-[var(--color-muted)]">
        <span>© {YEAR} {siteConfig.name}.</span>
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
