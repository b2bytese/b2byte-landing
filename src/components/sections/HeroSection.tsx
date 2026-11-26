"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/Button";
import { AsciiBackground } from "@/components/graphics/AsciiBackground";
import { GeometricSculpture } from "@/components/graphics/GeometricSculpture";

const NAV_LINKS = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Por que B2byte", href: "/#diferenciais" },
  { label: "Processo", href: "/#processo" },
];

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <header
      id="inicio"
      className="m-3 border border-[var(--color-border)] rounded-[24px] overflow-hidden relative isolate"
      style={{
        background:
          "radial-gradient(ellipse at 50% 85%,#1E1B4B 0%,#0B0F1A 62%)",
      }}
      aria-label="B2byte Software Engineering"
    >
      <AsciiBackground />

      {/* Nav */}
      <nav
        className="h-[88px] flex items-center justify-between gap-6 relative z-[3] w-[min(1480px,calc(100%-100px))] mx-auto"
        aria-label="Navegação principal"
      >
        <Link
          href="/#inicio"
          aria-label="B2byte — início"
          className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] rounded"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo-primary.svg"
            alt="B2byte Software Engineering"
            width={135}
            height={57}
            priority
          />
        </Link>

        <div className="hidden md:flex gap-[30px] text-sm text-[var(--color-muted)]">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contato"
          className={buttonVariants({
            variant: "ghost",
            className: "hidden md:inline-flex",
          })}
        >
          Vamos conversar <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-[var(--color-muted)] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="hero-mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="hero-mobile-nav"
          className="md:hidden absolute top-[65px] left-3 right-3 z-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] px-5 py-5 flex flex-col gap-4"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="text-[var(--color-muted)] hover:text-white transition-colors duration-150 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contato"
            onClick={closeMenu}
            className={buttonVariants({ variant: "primary", className: "mt-1" })}
          >
            Vamos conversar <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}

      {/* Hero content */}
      <div className="text-center pt-[65px] relative z-[1] w-[min(1480px,calc(100%-100px))] mx-auto">
        <span
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.13em] text-[var(--color-lavender)] border border-[var(--color-border)] px-[18px] py-[9px] rounded-[50px] mb-[26px]"
          style={{ background: "#121726cc" }}
        >
          <span
            className="text-[9px] text-[var(--color-accent)]"
            aria-hidden="true"
          >
            ●
          </span>
          {siteConfig.description.includes("sob medida")
            ? "Software sob medida para empresas"
            : siteConfig.shortName}
        </span>

        <h1 className="font-display font-medium tracking-[-0.065em] leading-[1.02] max-w-[970px] mx-auto mb-[25px]" style={{ fontSize: "clamp(48px,7.2vw,106px)" }}>
          Tecnologia que faz seu <br className="hidden sm:block" /> negócio{" "}
          <span className="text-[var(--color-accent)]">ir mais longe.</span>
        </h1>

        <p className="text-[var(--color-muted)] max-w-[580px] mx-auto mb-[28px]" style={{ fontSize: 18 }}>
          Transformamos processos complexos em experiências digitais simples.
          Sites, sistemas e automações construídos para a realidade da sua
          empresa.
        </p>

        <div className="flex justify-center gap-[15px] flex-wrap">
          <Link
            href="/#contato"
            className={buttonVariants({ variant: "primary" })}
            style={{ outline: "1px solid #8B7CF666", outlineOffset: 4 }}
          >
            Começar meu projeto <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/#solucoes" className={buttonVariants({ variant: "ghost" })}>
            Explorar soluções <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>

      {/* Geometric sculpture */}
      <div
        className="relative max-w-[1100px] mx-auto pointer-events-none"
        style={{ marginTop: -5, marginBottom: -32 }}
        aria-hidden="true"
      >
        <GeometricSculpture id="hero" className="block w-full h-auto" />
        <span
          className="absolute bottom-[45px] left-[4%] font-mono text-[10px] text-[var(--color-muted)] tracking-[0.1em]"
          aria-hidden="true"
        >
          FIG 01 — DIGITAL ARCHITECTURE
        </span>
        <span
          className="absolute bottom-[45px] right-[4%] font-mono text-[10px] text-[var(--color-muted)] tracking-[0.1em]"
          aria-hidden="true"
        >
          B2BYTE / ENGINEERING
        </span>
      </div>
    </header>
  );
}
