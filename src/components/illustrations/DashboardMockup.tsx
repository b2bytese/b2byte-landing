export function DashboardMockup() {
  return (
    <div
      className="mt-14 mx-auto max-w-[1020px] relative text-left px-3 pt-3 border border-[#8b7cf650] border-b-0 rounded-[22px_22px_0_0]"
      style={{
        background: "linear-gradient(140deg,#8b7cf629,#121726)",
        boxShadow: "0 0 100px #5046e52b",
      }}
      aria-label="Interface ilustrativa de dashboard"
    >
      <div className="border border-white/10 rounded-[12px_12px_0_0] bg-[#101522] overflow-hidden">
        {/* Window bar */}
        <div className="h-[42px] flex items-center justify-between px-4 border-b border-white/[0.07] text-[11px] text-[var(--color-muted)]">
          <span className="tracking-[4px] text-[#626780]">●●●</span>
          <span>workspace / visão geral</span>
          <span className="text-[var(--color-lavender)] bg-[#8b7cf619] border border-[#8b7cf633] px-2 py-1 rounded-[20px] text-[10px]">
            ● Demonstração
          </span>
        </div>

        {/* Dashboard layout */}
        <div className="grid md:grid-cols-[180px_1fr] min-h-[360px]">
          {/* Sidebar */}
          <aside className="hidden md:block border-r border-white/[0.07] p-5 text-xs text-[var(--color-muted)]">
            <b className="text-white block mb-6">◈ &nbsp; Workspace</b>
            <div className="bg-[#8b7cf61c] text-[var(--color-lavender)] rounded-[7px] px-2.5 py-2.5 mb-1">
              ▦ &nbsp; Visão geral
            </div>
            <div className="px-2.5 py-2.5 mb-1">▤ &nbsp; Operações</div>
            <div className="px-2.5 py-2.5 mb-1">◇ &nbsp; Clientes</div>
            <div className="px-2.5 py-2.5 mb-1">↗ &nbsp; Automações</div>
            <div className="px-2.5 py-2.5">⚙ &nbsp; Configurações</div>
          </aside>

          {/* Main panel */}
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-5">
              <b className="text-base md:text-lg">Seu negócio, conectado.</b>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {[
                { label: "Operações", value: "128", sub: "Visão unificada" },
                { label: "Fluxos ativos", value: "12", sub: "Automatizados" },
                { label: "Integrações", value: "08", sub: "Conectadas" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="border border-white/[0.07] bg-[var(--color-surface)] rounded-[10px] p-3 md:p-4"
                >
                  <small className="text-[var(--color-muted)] text-[9px] md:text-[11px]">
                    {m.label}
                  </small>
                  <strong className="block font-display text-lg md:text-[27px] font-semibold mt-1.5 mb-1">
                    {m.value}
                  </strong>
                  <em className="not-italic text-[10px] text-[var(--color-lavender)]">
                    {m.sub}
                  </em>
                </div>
              ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid md:grid-cols-[1.7fr_1fr] gap-3 mt-3">
              <div className="border border-white/[0.07] bg-[var(--color-surface)] rounded-[10px] p-4">
                <small className="text-[var(--color-muted)] text-[11px]">
                  Atividade operacional
                </small>
                <svg
                  viewBox="0 0 360 120"
                  preserveAspectRatio="none"
                  className="w-full h-[120px] mt-2 block"
                  aria-label="Gráfico ilustrativo de atividade"
                >
                  <defs>
                    <linearGradient id="chartGrad" x2="0" y2="1">
                      <stop stopColor="#8B7CF6" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#8B7CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 30H360M0 65H360M0 100H360"
                    stroke="#34394F"
                    strokeDasharray="3 5"
                  />
                  <path
                    d="M0 102L35 90 70 95 105 64 140 72 175 45 210 55 245 26 280 38 320 12 360 18V120H0Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0 102L35 90 70 95 105 64 140 72 175 45 210 55 245 26 280 38 320 12 360 18"
                    fill="none"
                    stroke="#8B7CF6"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              <div className="hidden md:block border border-white/[0.07] bg-[var(--color-surface)] rounded-[10px] p-4">
                <small className="text-[var(--color-muted)] text-[11px]">
                  Atividades recentes
                </small>
                {["Pedido recebido", "Dados sincronizados", "Relatório gerado"].map(
                  (item) => (
                    <div
                      key={item}
                      className="border-b border-white/[0.06] py-2.5 text-[11px] flex justify-between gap-2"
                    >
                      {item}{" "}
                      <span className="text-[var(--color-accent)]">✓</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
