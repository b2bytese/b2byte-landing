import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { DashboardMockup } from "@/components/illustrations/DashboardMockup";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="text-center pt-[83px] pb-0 overflow-hidden relative"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%,#1e1b4b 0%,transparent 65%)",
      }}
      aria-label="Hero — B2byte Software Engineering"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <Badge withDot className="mb-0">
          Software sob medida para empresas
        </Badge>

        <h1 className="font-display text-[clamp(46px,6.4vw,88px)] font-semibold tracking-[-0.055em] leading-[1.06] max-w-[970px] mx-auto mt-6 mb-6">
          Tecnologia que faz seu <br className="hidden sm:block" /> negócio{" "}
          <span className="text-[var(--color-accent)]">ir mais longe.</span>
        </h1>

        <p className="text-lg text-[var(--color-muted)] max-w-[650px] mx-auto mb-7">
          Transformamos processos complexos em experiências digitais simples.
          Sites, sistemas e automações construídos para a realidade da sua
          empresa.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="#contato"
            className={buttonVariants({ variant: "primary" })}
          >
            Começar meu projeto <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="#solucoes"
            className={buttonVariants({ variant: "ghost" })}
          >
            Explorar soluções <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
