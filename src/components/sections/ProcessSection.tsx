import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section
      id="processo"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="processo-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        {/* Center heading */}
        <div className="text-center max-w-[950px] mx-auto mb-[65px]">
          <span
            className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
            aria-hidden="true"
          >
            04 / Nosso processo
          </span>
          <h2
            id="processo-heading"
            className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
            style={{ fontSize: "clamp(38px,5.1vw,76px)" }}
          >
            Da primeira conversa
            <br />à{" "}
            <span className="text-[var(--color-accent)]">
              solução em produção.
            </span>
          </h2>
          <p className="text-[var(--color-muted)] mx-auto mt-4 max-w-[580px]">
            Um processo transparente, com etapas claras e colaboração do início
            ao fim.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <article
              key={step.num}
              className="border-t border-[var(--color-accent)] pt-6"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-5">
                {step.num} — {step.phase}
              </span>
              <h3
                className="font-display font-medium tracking-[-0.04em] leading-[1.06] text-[var(--color-brand-text)] mb-3"
                style={{ fontSize: 27 }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
