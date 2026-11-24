import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade da ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="w-[min(760px,calc(100%-48px))] mx-auto py-20">
      <Link
        href="/"
        className="text-sm text-[var(--color-muted)] hover:text-white transition-colors mb-8 inline-block"
      >
        ← Voltar ao início
      </Link>

      <h1 className="font-display text-3xl font-semibold tracking-tight mb-8">
        Política de Privacidade
      </h1>

      <div className="prose prose-invert prose-sm max-w-none text-[var(--color-muted)] space-y-6 leading-relaxed">
        <p>
          A <strong className="text-white">{siteConfig.name}</strong> respeita
          sua privacidade. Esta política descreve como tratamos os dados pessoais
          coletados por meio do formulário de contato deste website.
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
          Finalidade do uso
        </h2>
        <p>
          Os dados são utilizados exclusivamente para retorno comercial da
          solicitação enviada. Não compartilhamos suas informações com terceiros
          sem o seu consentimento.
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">
          Retenção de dados
        </h2>
        <p>
          Os dados são mantidos pelo período necessário para o atendimento da
          solicitação. Você pode solicitar a exclusão dos seus dados a qualquer
          momento.
        </p>

        <h2 className="text-white font-semibold text-lg mt-8">Contato</h2>
        <p>
          Para dúvidas sobre esta política ou solicitações relacionadas aos seus
          dados, entre em contato conosco por meio do formulário no site.
        </p>

        <p className="text-xs text-[var(--color-border)] mt-10">
          Última atualização: novembro de 2026.
        </p>
      </div>
    </main>
  );
}
