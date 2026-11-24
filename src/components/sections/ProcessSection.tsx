import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection() {
  return (
    <section
      id="processo"
      className="py-[100px] border-b border-white/[0.07]"
      aria-labelledby="processo-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <SectionHeading
          id="processo-heading"
          eyebrow="03 / Nosso processo"
          title={
            <>
              Da primeira conversa
              <br />à{" "}
              <span className="text-[var(--color-accent)]">
                solução em produção.
              </span>
            </>
          }
          description="Um processo transparente, com etapas claras e colaboração do início ao fim."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {processSteps.map((step) => (
            <article
              key={step.num}
              className="border-t border-[#8b7cf660] pt-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-lavender)] block mb-5">
                {step.num} — {step.phase}
              </span>
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.035em] leading-[1.06] mb-3">
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
