import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade da ${siteConfig.name}.`,
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    url: "/politica-de-privacidade",
    title: `Política de Privacidade | ${siteConfig.name}`,
    description: `Política de privacidade da ${siteConfig.name}.`,
  },
};

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="w-[min(760px,calc(100%-48px))] mx-auto py-20"
    >
      <Link
        href="/"
        className="text-sm text-[var(--color-muted)] hover:text-white transition-colors mb-8 inline-block"
      >
        <span aria-hidden="true">←</span> Voltar ao início
      </Link>

      <h1 className="font-display text-3xl font-semibold tracking-tight mb-8">
        Política de Privacidade
      </h1>

      <div className="max-w-none text-sm text-[var(--color-muted)] space-y-6 leading-relaxed">
        <p>
          A <strong className="text-white">{siteConfig.name}</strong>,
          localizada em {siteConfig.location}, atua como{" "}
          <strong className="text-white">controladora</strong> dos dados
          pessoais coletados por meio deste website, em conformidade com a Lei
          Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Dados coletados
        </h2>
        <p>
          Coletamos apenas os dados que você fornece voluntariamente ao preencher
          o formulário de contato: nome, empresa, e-mail, telefone, tipo de
          projeto e descrição da necessidade.
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Finalidade e base legal
        </h2>
        <p>
          Os dados são tratados exclusivamente para responder à sua solicitação
          de contato comercial, elaborar propostas e conduzir eventuais
          tratativas pré-contratuais, com base no seu consentimento (Art. 7º, I
          da LGPD) e em procedimentos preliminares relacionados a contrato (Art.
          7º, V da LGPD).
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Compartilhamento com operadores e transferência internacional
        </h2>
        <p>
          Não vendemos nem compartilhamos seus dados pessoais com terceiros para
          fins publicitários. Para viabilizar o recebimento das mensagens enviadas
          pelo formulário, utilizamos o serviço de infraestrutura de e-mails{" "}
          <strong className="text-white">Resend</strong> como operador de
          tratamento. Esse processamento pode envolver{" "}
          <strong className="text-white">
            transferência internacional de dados
          </strong>{" "}
          para servidores localizados fora do Brasil, adotando salvaguardas
          compatíveis com o Art. 33 da LGPD.
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Retenção e direitos do titular
        </h2>
        <p>
          Os dados são mantidos apenas pelo período necessário para o atendimento
          da solicitação ou cumprimento de obrigações legais. Nos termos do Art.
          18 da LGPD, você pode solicitar a confirmação da existência de
          tratamento, acesso, correção, anonimização, eliminação ou revogação do
          consentimento a qualquer momento.
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Canal de atendimento ao titular
        </h2>
        <p>
          Para exercer seus direitos ou tirar dúvidas sobre esta política, entre
          em contato com o controlador ({siteConfig.name}) indicando o assunto
          &ldquo;Privacidade / LGPD&rdquo; por meio do{" "}
          <Link
            href="/#contato"
            className="underline underline-offset-2 text-[var(--color-brand-text)] hover:text-white"
          >
            formulário de contato do site
          </Link>
          {siteConfig.contact.email && (
            <>
              {" "}
              ou diretamente pelo e-mail{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline underline-offset-2 text-[var(--color-brand-text)] hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </>
          )}
          .
        </p>

        <p className="text-xs text-[var(--color-muted)] mt-10">
          Última atualização: novembro de 2026.
        </p>
      </div>
    </main>
  );
}
