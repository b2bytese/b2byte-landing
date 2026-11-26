import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="py-[110px]"
      aria-labelledby="contato-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        <div
          className="grid gap-[8%] items-start"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <span
              className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
              aria-hidden="true"
            >
              06 / Vamos construir
            </span>
            <h2
              id="contato-heading"
              className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
              style={{ fontSize: "clamp(38px,5.1vw,76px)", marginTop: 0 }}
            >
              Seu próximo passo começa{" "}
              <span className="text-[var(--color-accent)]">aqui.</span>
            </h2>
            <p className="text-[var(--color-muted)] mt-6">
              Conte um pouco sobre seu negócio e o que você gostaria de
              transformar. Toda boa solução começa com uma conversa.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
