import { DiscoverySculpture } from "@/components/graphics/DiscoverySculpture";
import { EngineeringSculpture } from "@/components/graphics/EngineeringSculpture";
import { GrowthSculpture } from "@/components/graphics/GrowthSculpture";
import { SecuritySculpture } from "@/components/graphics/SecuritySculpture";

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="py-[110px] border-b border-[var(--color-border)]"
      aria-labelledby="diferenciais-heading"
    >
      <div className="w-[min(1480px,calc(100%-100px))] mx-auto solace-layout">

        {/* Coluna institucional */}
        <div className="solace-intro">
          <span
            className="font-mono text-[12px] uppercase tracking-[0.13em] text-[var(--color-lavender)] before:content-['●'] before:text-[var(--color-accent)] before:mr-[10px] before:text-[9px]"
            aria-hidden="true"
          >
            02 / Engenharia de verdade
          </span>

          <div>
            <h2 id="diferenciais-heading">
              Mais que software.
              <br />
              Uma base para{" "}
              <span className="text-[var(--color-accent)]">evoluir.</span>
            </h2>
            <p>
              Somos três engenheiros de software. Entendemos sua operação antes de
              escrever a primeira linha de código.
            </p>
          </div>

          <a className="solace-link" href="#processo">
            Conheça nossa abordagem ↗
          </a>
        </div>

        {/* Bento grid */}
        <div className="solace-grid">

          {/* 01 — Discovery: vertical, spans 2 rows */}
          <article className="solace-card sc-1">
            <div className="sc-copy">
              <span className="sc-label">01 / DISCOVERY</span>
              <h3>
                Feito para sua{" "}
                <span>realidade.</span>
              </h3>
              <p>Soluções que se adaptam à sua operação, e não o contrário.</p>
            </div>
            <DiscoverySculpture className="sc-sculpture" />
          </article>

          {/* 02 — Engineering: horizontal, spans 2 columns */}
          <article className="solace-card sc-2">
            <div className="sc-copy">
              <span className="sc-label">02 / ENGINEERING</span>
              <h3>
                Qualidade desde{" "}
                <span>a base.</span>
              </h3>
              <p>Arquitetura sólida, boas práticas e tecnologia preparada para evoluir.</p>
            </div>
            <EngineeringSculpture className="sc-sculpture" />
          </article>

          {/* 03 — Growth: compact */}
          <article className="solace-card sc-3">
            <div className="sc-copy">
              <span className="sc-label">03 / GROWTH</span>
              <h3>
                Parceria de{" "}
                <span>longo prazo.</span>
              </h3>
              <p>Tecnologia que acompanha o crescimento do seu negócio.</p>
            </div>
            <GrowthSculpture className="sc-sculpture" />
          </article>

          {/* 04 — Security: compact */}
          <article className="solace-card sc-4">
            <div className="sc-copy">
              <span className="sc-label">04 / SECURITY</span>
              <h3>
                Segurança{" "}
                <span>por design.</span>
              </h3>
              <p>Proteção de dados considerada desde as decisões de arquitetura.</p>
            </div>
            <SecuritySculpture className="sc-sculpture" />
          </article>

        </div>
      </div>
    </section>
  );
}
