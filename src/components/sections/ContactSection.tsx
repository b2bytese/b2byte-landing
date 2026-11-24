import { Eyebrow } from "@/components/ui/Badge";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="py-[100px]"
      aria-labelledby="contato-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <div
          className="rounded-[22px] border border-[#8b7cf640] p-8 md:p-12 grid md:grid-cols-2 gap-8 md:gap-11"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%,#5046e52b,transparent 60%),#121726",
          }}
        >
          <div>
            <Eyebrow className="block mb-3">06 / Vamos construir</Eyebrow>
            <h2
              id="contato-heading"
              className="font-display text-[clamp(34px,4vw,52px)] font-semibold tracking-[-0.055em] leading-[1.06] mt-[15px] mb-5"
            >
              Seu próximo passo começa{" "}
              <span className="text-[var(--color-accent)]">aqui.</span>
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              Conte um pouco sobre seu negócio e o que você gostaria de
              transformar. Toda boa solução começa com uma conversa.
            </p>
            <Eyebrow>B2byte · Brasília, Brasil</Eyebrow>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
