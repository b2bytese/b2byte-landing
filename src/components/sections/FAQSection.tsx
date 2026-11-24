import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-[100px] border-b border-white/[0.07]"
      aria-labelledby="faq-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <SectionHeading
          id="faq-heading"
          eyebrow="05 / Perguntas frequentes"
          title="Antes de começarmos."
          center
        />
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
