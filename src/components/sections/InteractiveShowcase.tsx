"use client";

import { useState } from "react";

interface PreviewMetric {
  label: string;
  value: string;
}

interface ServiceData {
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  windowLabel: string;
  previewTitle: string;
  metrics: PreviewMetric[];
  bars?: number[];
}

const SERVICES: ServiceData[] = [
  {
    num: "01",
    tabLabel: "Desenvolvimento web",
    title: "Sites que geram oportunidades.",
    description:
      "Presença digital profissional, rápida e preparada para transformar visitantes em clientes.",
    windowLabel: "WEB / DEMONSTRAÇÃO",
    previewTitle: "Landing page",
    metrics: [
      { label: "Visitantes", value: "1.420" },
      { label: "Conversões", value: "87" },
      { label: "Tempo médio", value: "3m 12s" },
      { label: "Taxa de saída", value: "34%" },
    ],
    bars: [40, 60, 35, 80, 55, 90, 45, 70],
  },
  {
    num: "02",
    tabLabel: "Sistemas personalizados",
    title: "Sistemas que eliminam trabalho manual.",
    description:
      "Plataformas sob medida que automatizam fluxos e centralizam a gestão do seu negócio.",
    windowLabel: "SISTEMA / DEMONSTRAÇÃO",
    previewTitle: "Gestão de operações",
    metrics: [
      { label: "Processos ativos", value: "24" },
      { label: "Concluídos", value: "412" },
      { label: "Usuários", value: "8" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    num: "03",
    tabLabel: "Automações",
    title: "Automações que trabalham por você.",
    description:
      "Integre plataformas, elimine tarefas repetitivas e ganhe escala sem aumentar sua equipe.",
    windowLabel: "AUTOMAÇÃO / DEMONSTRAÇÃO",
    previewTitle: "Pipeline ativo",
    metrics: [
      { label: "Execuções/dia", value: "340" },
      { label: "Economia/mês", value: "18h" },
      { label: "Integrações", value: "5" },
      { label: "Erros", value: "0" },
    ],
  },
  {
    num: "04",
    tabLabel: "Produtos SaaS",
    title: "Produtos SaaS prontos para crescer.",
    description:
      "Do MVP à plataforma robusta, construímos produtos digitais com arquitetura para evoluir.",
    windowLabel: "SAAS / DEMONSTRAÇÃO",
    previewTitle: "Produto digital",
    metrics: [
      { label: "Usuários ativos", value: "1.2k" },
      { label: "MRR", value: "R$42k" },
      { label: "NPS", value: "74" },
      { label: "Churn", value: "2.1%" },
    ],
  },
];

function ServicePreview({ service }: { service: ServiceData }) {
  return (
    <div aria-live="polite">
      <h3
        className="font-display font-medium tracking-[-0.04em] leading-[1.06] text-[var(--color-brand-text)] mt-0 mb-[22px]"
        style={{ fontSize: 32 }}
      >
        {service.previewTitle}
      </h3>
      <p className="font-mono text-[10px] text-[var(--color-muted)] tracking-[0.08em] mb-2">
        * Dados ilustrativos — não representam resultados de clientes.
      </p>
      <div className="grid grid-cols-2 gap-[10px]">
        {service.metrics.map((m) => (
          <div
            key={m.label}
            className="p-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[8px] text-xs text-[var(--color-muted)]"
          >
            <span className="block">{m.label}</span>
            <b className="block font-display font-medium text-[23px] text-[var(--color-brand-text)] mt-[5px]">
              {m.value}
            </b>
          </div>
        ))}
      </div>
      {service.bars && (
        <div
          className="flex items-end gap-[7px] mt-4"
          style={{ height: 65 }}
          aria-hidden="true"
        >
          {service.bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[3px]"
              style={{
                height: `${h}%`,
                background: "linear-gradient(#8B7CF6,#5046E533)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function InteractiveShowcase() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section
      id="explorar"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="explorar-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto">
        {/* Center heading */}
        <div className="text-center max-w-[950px] mx-auto mb-[65px]">
          <span
            className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] block mb-[30px] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
            aria-hidden="true"
          >
            03 / Soluções digitais
          </span>
          <h2
            id="explorar-heading"
            className="font-display font-medium tracking-[-0.065em] leading-[1.02] text-[var(--color-brand-text)]"
            style={{ fontSize: "clamp(38px,5.1vw,76px)" }}
          >
            Tudo que seu negócio precisa
            <br />
            para{" "}
            <span className="text-[var(--color-accent)]">ir mais longe.</span>
          </h2>
        </div>

        {/* Split: tabs + preview */}
        <div
          className="grid gap-[8%] items-center"
          style={{ gridTemplateColumns: "1fr 1.15fr" }}
        >
          {/* Left: title + tabs */}
          <div>
            <h3
              className="font-display font-medium tracking-[-0.04em] leading-[1.06] text-[var(--color-brand-text)]"
              style={{ fontSize: "clamp(24px,2.5vw,38px)" }}
              aria-live="polite"
            >
              {current.title}
            </h3>
            <p
              className="text-[var(--color-muted)] mt-4"
              aria-live="polite"
            >
              {current.description}
            </p>

            <div
              className="mt-8"
              role="group"
              aria-label="Soluções"
            >
              {SERVICES.map((svc, i) => (
                <button
                  key={svc.num}
                  type="button"
                  aria-pressed={i === active}
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-[15px] w-full text-left border-0 border-t border-[var(--color-border)] bg-transparent py-[18px] text-[19px] cursor-pointer transition-colors duration-150 last:border-b last:border-b-[var(--color-border)]"
                  style={{
                    color:
                      i === active
                        ? "var(--color-brand-text)"
                        : "var(--color-muted)",
                  }}
                >
                  <span
                    className="font-mono text-[12px]"
                    style={{
                      color:
                        i === active
                          ? "var(--color-accent)"
                          : "var(--color-muted)",
                    }}
                  >
                    {svc.num}
                  </span>
                  {svc.tabLabel}
                  <span className="ml-auto" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: preview window */}
          <div
            className="rounded-[15px] border border-[var(--color-border)] p-[35px] relative overflow-hidden grid place-items-center"
            style={{
              minHeight: 420,
              background:
                "radial-gradient(ellipse at 70% 20%,#1E1B4B,#121726)",
            }}
          >
            <div className="w-full bg-[var(--color-background)] border border-[#8B7CF666] rounded-[13px] overflow-hidden shadow-[0_20px_60px_#0B0F1A]">
              {/* Window bar */}
              <div className="flex justify-between px-[17px] py-3 border-b border-[var(--color-border)] font-mono text-[11px] text-[var(--color-muted)]">
                <span aria-hidden="true">● ● ●</span>
                <span>{current.windowLabel}</span>
              </div>
              {/* Window body */}
              <div className="p-[25px]" style={{ minHeight: 235 }}>
                <ServicePreview service={current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
