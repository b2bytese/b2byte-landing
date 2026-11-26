import { AsciiBackground } from "@/components/graphics/AsciiBackground";

function StackedCard() {
  return (
    <div
      className="relative z-[1] isolate"
      style={{ width: "min(460px,75%)", padding: 26 }}
    >
      {/* Back layers (decorative) */}
      <div
        aria-hidden="true"
        className="absolute rounded-[14px] border border-[#8B7CF655] bg-[var(--color-deep)]"
        style={{ inset: "-20px 18px 20px", zIndex: -1, transform: "rotate(6deg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-[14px] border border-[#8B7CF655] bg-[var(--color-deep)]"
        style={{ inset: "-37px 36px 40px", zIndex: -2, transform: "rotate(12deg)" }}
      />

      {/* Card face */}
      <div
        className="rounded-[14px] border border-[#8B7CF688] shadow-[0_20px_70px_#0B0F1A]"
        style={{
          padding: 26,
          background: "linear-gradient(145deg,#34394F,#121726)",
          transform: "rotate(-3deg)",
        }}
      >
        <small className="font-mono text-[11px] text-[var(--color-lavender)] tracking-[0.1em]">
          B2BYTE / DIGITAL WORKSPACE
        </small>
        <strong
          className="block font-display font-medium text-[var(--color-brand-text)] my-[22px]"
          style={{ fontSize: "clamp(25px,4vw,50px)" }}
        >
          Seu negócio,
          <br />
          conectado.
        </strong>
        <div className="flex justify-between border-t border-[#8B7CF655] pt-[14px] text-[var(--color-muted)] text-xs">
          <span>Web · Systems · Automation</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </div>
  );
}

export function SolutionsSection() {
  return (
    <section
      id="solucoes"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="solucoes-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        <span
          className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
          aria-hidden="true"
        >
          01 / O que fazemos
        </span>

        {/* Editorial header */}
        <div
          className="grid gap-[9%] items-end mb-[54px]"
          style={{ gridTemplateColumns: "1.8fr 1fr" }}
        >
          <h2
            id="solucoes-heading"
            className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
            style={{ fontSize: "clamp(38px,5.1vw,76px)" }}
          >
            Construímos tecnologia
            <br />
            para transformar{" "}
            <span className="text-[var(--color-accent)]">sua operação.</span>
          </h2>
          <p className="text-[var(--color-muted)]" style={{ fontSize: 18 }}>
            Da presença digital à automação de operações, criamos tecnologia que
            se encaixa no seu dia a dia.
          </p>
        </div>

        {/* Feature art */}
        <div
          className="relative isolate overflow-hidden rounded-[18px] border border-[var(--color-border)] grid place-items-center"
          style={{
            minHeight: 390,
            background:
              "radial-gradient(ellipse at 50% 60%,#1E1B4B,#121726 75%)",
          }}
        >
          <AsciiBackground opacity={0.25} />
          <StackedCard />
        </div>
      </div>
    </section>
  );
}
