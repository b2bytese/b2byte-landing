import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Fixed year keeps Footer prerender-compatible under Next.js `cacheComponents: true` (avoids dynamic Date() access).
const YEAR = 2026;

export function Footer() {
  const year = YEAR;

  return (
    <footer className="border-t border-white/[0.07] py-11">
      <div className="w-[min(1160px,calc(100%-48px))] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <Link
              href="/#inicio"
              aria-label="B2byte — início"
              className="inline-block mb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] rounded"
            >
              <Image
                src="/images/logo-mono-white.svg"
                alt="B2byte Software Engineering"
                width={110}
                height={47}
              />
            </Link>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Engenharia de software sob medida para empresas que querem crescer
              com tecnologia bem projetada.
            </p>
            {siteConfig.location && (
              <p className="text-xs text-[var(--color-muted)] mt-2">
                {siteConfig.location}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">
                Soluções
              </p>
              <ul className="flex flex-col gap-3">
                {siteConfig.footer.solutions.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">
                Empresa
              </p>
              <ul className="flex flex-col gap-3">
                {siteConfig.footer.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {siteConfig.contact.email && (
              <div>
                <p className="text-xs font-semibold text-white mb-4 uppercase tracking-widest">
                  Contato
                </p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  {siteConfig.contact.phone && (
                    <li>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            {Object.entries(siteConfig.social)
              .filter(([, url]) => url)
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--color-muted)] hover:text-white transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
