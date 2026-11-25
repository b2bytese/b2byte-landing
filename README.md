# B2byte Software Engineering — Landing Page

Landing page institucional da **B2byte Software Engineering** construída com Next.js App Router, Tailwind CSS v4, validação ponta a ponta com Zod v4 e envio transacional de contatos via Resend.

## Stack

- **Framework:** Next.js 16 (App Router, `cacheComponents`, `partialPrefetching`, Turbopack)
- **UI & Estilo:** React 19, Tailwind CSS v4, Lucide React
- **Formulários & Validação:** React Hook Form, Zod v4 (`@hookform/resolvers`)
- **E-mail:** Resend (`POST /api/contact`)
- **Qualidade & Testes:** TypeScript (`strict`), ESLint (`eslint-config-next`), Vitest + Testing Library

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores:

```bash
cp .env.example .env.local
```

| Variável | Descrição | Obrigatória |
| --- | --- | --- |
| `RESEND_API_KEY` | Chave da API do Resend para disparo de e-mails | Sim (envio de contato) |
| `CONTACT_FROM_EMAIL` | Remetente verificado no Resend (ex.: `contato@b2byte.com.br`) | Sim (envio de contato) |
| `CONTACT_TO_EMAIL` | Destinatário que receberá os leads do formulário | Sim (envio de contato) |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (padrão: `https://b2byte.com.br`) | Não |

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento (http://localhost:3000)
npm test         # Executa a suíte de testes unitários e de componentes (Vitest)
npm run lint     # Verificação ESLint
npx tsc --noEmit # Checagem estática de tipos TypeScript
npm run build    # Build de produção
npm run start    # Inicia o servidor de produção
```

## Estrutura principal

```text
src/
├── app/
│   ├── api/contact/route.ts         # Endpoint POST com validação Zod, rate limit e Resend
│   ├── politica-de-privacidade/     # Página de Política de Privacidade (LGPD)
│   ├── icon.svg                     # Favicon da marca
│   ├── opengraph-image.tsx          # Imagem OpenGraph 1200x630 gerada via next/og
│   ├── twitter-image.tsx            # Imagem Twitter Card 1200x630
│   ├── robots.ts                    # Regras de indexação (disallow /api/)
│   ├── sitemap.ts                   # Sitemap estático
│   ├── globals.css                  # Tokens @theme e estilos @layer base (Tailwind v4)
│   ├── layout.tsx                   # Fontes (next/font) e metadados globais
│   └── page.tsx                     # Landing page principal
├── components/
│   ├── illustrations/               # DashboardMockup ilustrativo
│   ├── layout/                      # Navbar e Footer
│   ├── sections/                    # Hero, Solutions, Differentials, Process, Segments, FAQ, Contact
│   └── ui/                          # Accordion, Badge, Button, FormFields, SectionHeading
├── config/site.ts                   # Configuração institucional e links
├── data/                            # Conteúdo estruturado (services, process, faq)
└── lib/                             # Validação Zod, rate-limit, cliente Resend e utilitários
```
