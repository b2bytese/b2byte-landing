import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

function WebMockup() {
  return (
    <div className="h-[190px] border border-white/[0.08] rounded-xl bg-[var(--color-background)] overflow-hidden flex items-center justify-center p-[18px]">
      <div className="w-[90%] border border-white/[0.13] rounded-lg bg-[var(--color-deep)] p-3 text-center shadow-[0_12px_30px_#0005]">
        <small className="text-[var(--color-muted)] text-[11px]">
          ◈ &nbsp; Sua marca &nbsp;·&nbsp; Sobre &nbsp;·&nbsp; Contato
        </small>
        <strong className="block font-display text-2xl font-semibold mt-5 mb-2">
          Seu negócio.
          <br />
          Em destaque.
        </strong>
        <div className="h-1 bg-[#8b7cf650] rounded w-[60%] mx-auto my-2.5" />
        <span className="inline-block bg-[var(--color-primary)] rounded w-[70px] h-4 mt-1.5" />
      </div>
    </div>
  );
}

function SystemsMockup() {
  const heights = ["35%", "65%", "50%", "85%", "100%"];
  return (
    <div className="h-[190px] border border-white/[0.08] rounded-xl bg-[var(--color-background)] overflow-hidden p-[18px]">
      <div className="grid grid-cols-2 gap-2.5 h-full">
        <div className="border border-white/[0.09] bg-[var(--color-surface)] rounded-lg p-3 text-[11px] text-[var(--color-muted)]">
          <span className="block mb-1">Visão de operação</span>
          <b className="text-white text-xl">24 atividades</b>
          <div className="flex items-end gap-2 h-[60px] mt-2">
            {heights.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: h,
                  background: "linear-gradient(#8b7cf6,#5046e533)",
                }}
              />
            ))}
          </div>
        </div>
        <div className="border border-white/[0.09] bg-[var(--color-surface)] rounded-lg p-3 text-[11px] text-[var(--color-muted)]">
          <span className="block mb-1">Controle de tarefas</span>
          <b className="text-white block mb-3">Em andamento</b>
          <p className="mb-2 text-[var(--color-success)]">✓ Cadastro atualizado</p>
          <p className="mb-2 text-[var(--color-success)]">✓ Estoque integrado</p>
          <p className="text-[var(--color-muted)]">○ Revisão pendente</p>
        </div>
      </div>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="h-[190px] border border-white/[0.08] rounded-xl bg-[var(--color-background)] overflow-hidden flex items-center justify-center p-[18px]">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {[
          { icon: "↳", label: "Entrada" },
          { icon: "→", arrow: true },
          { icon: "⌘", label: "Processar" },
          { icon: "→", arrow: true },
          { icon: "✓", label: "Entregar" },
        ].map((node, i) =>
          node.arrow ? (
            <span key={i} className="text-[var(--color-accent)]">
              →
            </span>
          ) : (
            <div
              key={i}
              className="border border-[#8b7cf655] bg-[var(--color-deep)] px-3 py-3 rounded-lg text-xs text-[var(--color-lavender)]"
            >
              {node.icon} {node.label}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function SaaSMockup() {
  return (
    <div className="h-[190px] border border-white/[0.08] rounded-xl bg-[var(--color-background)] overflow-hidden flex items-center p-[18px]">
      <pre className="font-mono text-xs leading-[1.9] text-[var(--color-lavender)]">
        <span className="text-[var(--color-muted)]">{"// Da ideia à produção"}</span>
        {"\n"}{"const produto = {"}
        {"\n"}{"  arquitetura: "}
        <span className="text-white">{'"escalável"'}</span>
        {",\n  experiência: "}
        <span className="text-white">{'"intuitiva"'}</span>
        {",\n  evolução: "}
        <span className="text-white">{'"contínua"'}</span>
        {"\n"}{"};"}</pre>
    </div>
  );
}

const mockups: Record<string, React.ReactNode> = {
  web: <WebMockup />,
  systems: <SystemsMockup />,
  automation: <AutomationMockup />,
  saas: <SaaSMockup />,
};

export function SolutionsSection() {
  return (
    <section
      id="solucoes"
      className="py-[100px] border-b border-white/[0.07]"
      aria-labelledby="solucoes-heading"
    >
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <SectionHeading
          id="solucoes-heading"
          eyebrow="01 / O que fazemos"
          title={
            <>
              Uma solução para cada
              <br />
              <span className="text-[var(--color-accent)]">
                desafio do seu negócio.
              </span>
            </>
          }
          description="Da presença digital à automação de operações, criamos tecnologia que se encaixa no seu dia a dia."
          center
        />

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-[var(--color-surface)] border border-white/[0.07] rounded-[17px] p-7 overflow-hidden relative"
            >
              <span className="font-mono text-[11px] text-[var(--color-accent)] block mb-[17px]">
                {service.num}
              </span>
              <h3 className="font-display text-[25px] font-semibold tracking-[-0.035em] leading-[1.06]">
                {service.title}
              </h3>
              <p className="text-[var(--color-muted)] max-w-[420px] mt-3 mb-6">
                {service.description}
              </p>
              {mockups[service.id]}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
