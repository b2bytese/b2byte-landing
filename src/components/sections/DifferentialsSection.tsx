import { GeometricSculpture } from "@/components/graphics/GeometricSculpture";

interface CardOverlayProps {
  children: React.ReactNode;
}

function CardOverlay({ children }: CardOverlayProps) {
  return (
    <div
      className="relative z-[1] rounded-[10px] border border-[#8B7CF677] shadow-[0_14px_40px_#0B0F1A] p-[18px] w-[76%]"
      style={{ background: "#0B0F1AEF" }}
    >
      {children}
    </div>
  );
}

function DiscoveryOverlay() {
  return (
    <CardOverlay>
      <small className="font-mono text-[11px] text-[var(--color-lavender)] tracking-[0.1em]">
        01 / DISCOVERY
      </small>
      <b className="block font-display font-medium text-[25px] text-[var(--color-brand-text)] my-2">
        Feito para você.
      </b>
      <span className="text-[12px] text-[var(--color-muted)]">
        Escopo alinhado ao negócio
      </span>
      <div className="h-[5px] bg-[var(--color-border)] rounded-[10px] mt-4">
        <div
          className="h-full bg-[var(--color-accent)] rounded-[10px]"
          style={{ width: "78%" }}
        />
      </div>
    </CardOverlay>
  );
}

function EngineeringOverlay() {
  return (
    <div
      className="relative border-[10px] border-[var(--color-accent)] rounded-full grid place-content-center text-center"
      style={{
        borderBottomColor: "var(--color-border)",
        width: 164,
        height: 164,
        background: "#0B0F1Acc",
      }}
      aria-hidden="true"
    >
      <small className="font-mono text-[10px] text-[var(--color-lavender)] tracking-[0.08em] block">
        ENGINEERING
      </small>
      <b className="font-display font-medium text-[34px] text-[var(--color-brand-text)]">
        ◈
      </b>
      <small className="font-mono text-[10px] text-[var(--color-lavender)] tracking-[0.08em] block">
        QUALIDADE
      </small>
    </div>
  );
}

function NodesOverlay() {
  return (
    <div className="relative flex items-center gap-[9px]" aria-hidden="true">
      {["IDEIA", "→", "BUILD", "→", "↗"].map((node, i) =>
        node === "→" ? (
          <span
            key={i}
            className="text-[var(--color-accent)] font-mono text-sm"
          >
            →
          </span>
        ) : (
          <span
            key={i}
            className="border border-[#8B7CF688] bg-[var(--color-surface)] rounded-[10px] p-[13px] font-mono text-xs text-[var(--color-lavender)]"
          >
            {node}
          </span>
        )
      )}
    </div>
  );
}

const cards = [
  {
    id: "realidade",
    sculptureId: "diff-1",
    overlay: <DiscoveryOverlay />,
    title: "Feito para sua realidade",
    description: "Sem encaixar seu negócio em soluções genéricas.",
  },
  {
    id: "qualidade",
    sculptureId: "diff-2",
    overlay: <EngineeringOverlay />,
    title: "Qualidade desde a base",
    description: "Boas práticas, segurança e manutenção planejada.",
  },
  {
    id: "parceria",
    sculptureId: "diff-3",
    overlay: <NodesOverlay />,
    title: "Parceria de longo prazo",
    description: "Tecnologia preparada para acompanhar novos desafios.",
  },
];

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="diferenciais-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        <span
          className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
          aria-hidden="true"
        >
          02 / Engenharia de verdade
        </span>

        {/* Editorial header */}
        <div
          className="grid gap-[9%] items-end mb-[54px]"
          style={{ gridTemplateColumns: "1.8fr 1fr" }}
        >
          <h2
            id="diferenciais-heading"
            className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
            style={{ fontSize: "clamp(38px,5.1vw,76px)" }}
          >
            Mais que software.
            <br />
            Uma base para{" "}
            <span className="text-[var(--color-accent)]">evoluir.</span>
          </h2>
          <p className="text-[var(--color-muted)]" style={{ fontSize: 18 }}>
            Somos três engenheiros de software. Entendemos sua operação antes de
            escrever a primeira linha de código.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {cards.map((card) => (
            <article
              key={card.id}
              className="border border-[var(--color-border)] p-[13px] bg-[var(--color-surface)] rounded-[13px]"
            >
              {/* Visual area */}
              <div
                className="relative overflow-hidden grid place-items-center rounded-[8px]"
                style={{
                  height: 250,
                  background:
                    "radial-gradient(ellipse at 50% 60%,#1E1B4B,#0B0F1A)",
                }}
              >
                <GeometricSculpture
                  id={card.sculptureId}
                  className="absolute inset-0 w-full h-full opacity-55"
                />
                {card.overlay}
              </div>

              {/* Content */}
              <div className="px-3 pt-[22px] pb-4">
                <h3
                  className="font-display font-medium tracking-[-0.04em] leading-[1.06] text-[var(--color-brand-text)] mb-[10px]"
                  style={{ fontSize: 26 }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
