import { Eyebrow } from "@/components/ui/Badge";

const segments = [
  "Comércio e varejo",
  "Clínicas e saúde",
  "Prestadores de serviços",
  "Pequenas e médias empresas",
  "Startups",
  "Operações administrativas",
];

export function SegmentsSection() {
  return (
    <section
      className="py-[100px] border-b border-white/[0.07]"
      aria-labelledby="segmentos-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto grid md:grid-cols-2 items-center gap-[60px]">
        <div>
          <Eyebrow className="block mb-3">04 / Para quem</Eyebrow>
          <h2
            id="segmentos-heading"
            className="font-display text-[clamp(34px,4.5vw,57px)] font-semibold tracking-[-0.055em] leading-[1.06] mt-[15px] mb-5"
          >
            Negócios reais.
            <br />
            Desafios{" "}
            <span className="text-[var(--color-accent)]">reais.</span>
          </h2>
          <p className="text-[var(--color-muted)]">
            De Brasília para empresas que querem modernizar sua operação,
            independentemente do segmento.
          </p>
        </div>

        <ul
          className="flex flex-wrap gap-2.5 list-none p-0 m-0"
          aria-label="Segmentos atendidos"
        >
          {segments.map((segment) => (
            <li
              key={segment}
              className="px-[18px] py-3 border border-white/[0.1] rounded-[8px] text-[var(--color-muted)] bg-[var(--color-surface)] text-sm"
            >
              {segment}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
