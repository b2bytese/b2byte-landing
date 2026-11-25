import Link from "next/link";
import { Eyebrow } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

const differentials = [
  {
    icon: "⌘",
    title: "Feito para sua realidade",
    description: "Sem encaixar seu negócio em soluções genéricas.",
  },
  {
    icon: "◇",
    title: "Qualidade desde a base",
    description: "Boas práticas, segurança e manutenção planejada.",
  },
  {
    icon: "↗",
    title: "Parceria de longo prazo",
    description: "Tecnologia preparada para acompanhar novos desafios.",
  },
];

const checks = [
  "Contato direto com quem desenvolve",
  "Arquitetura pensada para o crescimento",
  "Clareza sobre escopo e evolução",
];

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="py-[100px] border-b border-white/[0.07]"
      aria-labelledby="diferenciais-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto grid md:grid-cols-2 items-center gap-[60px]">
        <div>
          <Eyebrow className="block mb-3">02 / Por que B2byte</Eyebrow>
          <h2
            id="diferenciais-heading"
            className="font-display text-[clamp(34px,4.5vw,57px)] font-semibold tracking-[-0.055em] leading-[1.06] mt-[15px] mb-5"
          >
            Não apenas software.
            <br />
            <span className="text-[var(--color-accent)]">
              Engenharia de verdade.
            </span>
          </h2>
          <p className="text-[var(--color-muted)]">
            Somos três engenheiros de software que acreditam que a tecnologia
            deve resolver problemas reais. Entendemos sua operação antes de
            escrever a primeira linha de código.
          </p>

          <ul className="grid gap-3 my-6" aria-label="Nossos diferenciais">
            {checks.map((item) => (
              <li
                key={item}
                className="text-[var(--color-muted)] before:content-['✓'] before:text-[var(--color-accent)] before:mr-3"
              >
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="#contato"
            className={buttonVariants({ variant: "ghost" })}
          >
            Conheça nossa abordagem <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div
          className="rounded-[16px] border border-white/[0.09]"
          style={{ background: "linear-gradient(130deg,#121726,#1e1b4b)" }}
        >
          {differentials.map((item, i) => (
            <div
              key={item.title}
              className={`flex gap-[18px] items-center px-5 py-6 ${i < differentials.length - 1 ? "border-b border-white/[0.09]" : ""}`}
            >
              <span
                className="grid place-items-center w-10 h-10 flex-shrink-0 rounded-[10px] bg-[#8b7cf620] text-[var(--color-lavender)] text-xl"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span>
                <b className="block text-[15px] font-semibold text-white">
                  {item.title}
                </b>
                <small className="text-[var(--color-muted)]">
                  {item.description}
                </small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
