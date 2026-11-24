"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-[#0b0f1aed] backdrop-blur-[16px] border-b border-white/[0.07]">
      <nav
        className="h-[78px] flex items-center justify-between gap-6 w-[min(1160px,calc(100%-48px))] mx-auto"
        aria-label="Navegação principal"
      >
        <Link
          href="#inicio"
          aria-label="B2byte — início"
          className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] rounded"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo-primary.svg"
            alt="B2byte Software Engineering"
            width={126}
            height={54}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-[30px] text-[var(--color-muted)] text-[13px]">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] rounded"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contato"
          className="hidden md:inline-flex items-center justify-center gap-3 rounded-[9px] px-5 py-[13px] text-sm font-semibold bg-[var(--color-primary)] border border-transparent text-white hover:bg-[#6358f0] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        >
          Vamos conversar ↗
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--color-muted)] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-[var(--color-surface)] border-t border-white/[0.07] px-6 py-6 flex flex-col gap-5"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                "text-[var(--color-muted)] hover:text-white transition-colors duration-150 font-medium",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contato"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-3 rounded-[9px] px-5 py-[13px] text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[#6358f0] transition-colors"
          >
            Vamos conversar ↗
          </Link>
        </div>
      )}
    </header>
  );
}
