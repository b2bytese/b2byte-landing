import { faqItems } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="faq-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        <div className="text-center max-w-[950px] mx-auto mb-[65px]">
          <span
            className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
            aria-hidden="true"
          >
            05 / Perguntas frequentes
          </span>
          <h2
            id="faq-heading"
            className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
            style={{ fontSize: "clamp(38px,5.1vw,76px)" }}
          >
            Antes de começarmos.
          </h2>
        </div>

        <div className="max-w-[900px] mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
