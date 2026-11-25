# B2byte Landing — Code Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir todos os achados Critical (4), Important (8) e Minor (4) do code review do `b2byte-landing`, estabelecendo cobertura de testes automatizados via TDD e deixando a aplicação pronta para produção no Next.js 16.4.6.

**Architecture:** As correções se organizam em 6 tarefas independentes e incrementais: (1) infraestrutura de testes com Vitest + correção da validação Zod v4; (2) hardening do endpoint `/api/contact` com módulo dedicado de rate limit e checagem explícita de `{ error }` do Resend v6; (3) correção do cascade Tailwind v4 em `globals.css` + refatoração acessível de `Button`, `FormFields` e `ContactForm`; (4) acessibilidade WAI-ARIA e limpeza de APIs depreciadas nos componentes de layout/seções; (5) SEO/metadata/OG/favicon nativos do Next.js 16, adequação LGPD e headers de segurança; (6) remoção de código/assets mortos, documentação (`README.md`, `.gitignore`) e verificação completa (`test`, `tsc`, `lint`, `build`).

**Tech Stack:** Next.js 16.4.6 (App Router, `cacheComponents: true`), React 19.3.0, Tailwind CSS 4.3.3, TypeScript 5 (`strict: true`), Zod 4.6.7, React Hook Form 7.92.0, Resend 6.39.0, Vitest, `@testing-library/react`, `jsdom`.

**Spec:** `/home/lab/.gemini/antigravity-cli/brain/e1326d16-3623-421c-8442-2273ca0fc911/code-review-b2byte-landing.md`

## Global Constraints

- Next.js `16.4.6` com `cacheComponents: true` e `partialPrefetching: true` em `next.config.ts`; respeitar APIs do Next.js 16 (`node_modules/next/dist/docs/`): usar `<Image preload />` (não `priority`), `src/app/icon.svg`, `src/app/opengraph-image.tsx` e `src/app/twitter-image.tsx`.
- Zod `4.6.7`: usar `z.email()` (não `z.string().email()`) e `z.flattenError(error)` (não `error.flatten()`).
- Tailwind CSS `4.3.3`: nenhuma regra global de reset/elemento pode ficar fora de `@layer base` em `src/app/globals.css`.
- Resend `6.39.0`: `resend.emails.send()` retorna `{ data, error }` sem lançar exceções; sempre checar `error` explicitamente.
- Idioma da UI, mensagens de erro, validação, e-mail e Política de Privacidade: português do Brasil (`pt-BR`).
- Todo bugfix ou mudança de comportamento segue TDD estrito (RED → GREEN → REFACTOR) e `npx tsc --noEmit`, `npm run lint` e `npm test` devem permanecer verdes.

## Review Focus

1. `NEXT_PUBLIC_SITE_URL` vazio (`""`) ou com espaços/barra final (`" https://b2byte.com.br/ "`) não pode derrubar `new URL(siteConfig.url)` no build ou runtime — deve cair para `"https://b2byte.com.br"` sem barra final (coberto na Task 5).
2. Requisição `POST /api/contact` sem cabeçalho `content-length` (`Transfer-Encoding: chunked`) com corpo acima de `8_000` bytes deve retornar HTTP `413` antes de `JSON.parse` (coberto na Task 2).
3. `POST /api/contact` recebendo `name: "   "` ou `message: "          "` deve retornar `422`, enquanto `email: "  Cliente@Empresa.COM  "` deve ser aceito e normalizado para `"cliente@empresa.com"` (coberto nas Tasks 1 e 2).
4. Resposta de erro não-JSON (ex.: página HTML `502 Bad Gateway` de proxy/CDN) em `ContactForm` não pode vazar `SyntaxError` bruto na interface — deve exibir mensagem amigável em `pt-BR` (coberto na Task 3).
5. `npm run build` com `cacheComponents: true` deve compilar e pré-renderizar `sitemap.ts`, `robots.ts`, `icon.svg`, `opengraph-image.tsx`, `twitter-image.tsx`, `/` e `/politica-de-privacidade` sem erros dinâmicos (coberto na Task 6).

---

### Task 1: Configurar Vitest + Testing Library, remover `motion` não usada e corrigir `contactSchema` (Zod v4)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `src/lib/validations.ts`
- Test: `src/lib/__tests__/validations.test.ts`

**Interfaces:**
- Consumes: nenhum
- Produces:
  - `npm test` (`vitest run`)
  - `contactSchema` em `src/lib/validations.ts` (aceita `honeypot?: string` arbitrário sem rejeitar no schema; aplica `.trim()` antes de `.min()`/`.max()`/`z.email()`; normaliza `email` com `.toLowerCase()`)
  - `ContactFormData`, `projectTypeLabels` em `src/lib/validations.ts`

- [ ] **Step 1: Instalar dependências de teste e remover `motion` não utilizada**

Run:
```bash
npm uninstall motion && npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```
Expected: exit 0; `motion` removida de `package.json` e `vitest` + Testing Library em `devDependencies`.

- [ ] **Step 2: Adicionar script `"test": "vitest run"` em `package.json` e criar `vitest.config.ts` e `vitest.setup.ts`**

Em `package.json`, adicionar `"test": "vitest run"` em `scripts`.
Criar `vitest.config.ts` usando `@vitejs/plugin-react`, `environment: "jsdom"`, `setupFiles: ["./vitest.setup.ts"]`, e alias `"@": path.resolve(__dirname, "./src")`.
Criar `vitest.setup.ts` limpando o DOM (`afterEach(cleanup)` de `@testing-library/react`).

- [ ] **Step 3: Escrever os testes que falham em `src/lib/__tests__/validations.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations";

const validPayload = {
  name: "Maria Silva",
  company: "Acme Ltda",
  email: "maria@acme.com.br",
  phone: "(61) 99999-0000",
  projectType: "sistema-sob-medida" as const,
  message: "Precisamos de um sistema sob medida para gestão.",
  consent: true as const,
  honeypot: "",
};

describe("contactSchema", () => {
  it("rejeita name composto apenas por espaços em branco", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejeita message composta apenas por espaços em branco", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: "            ",
    });
    expect(result.success).toBe(false);
  });

  it("apara espaços e normaliza email para minúsculas antes de validar", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      email: "  Maria@ACME.com.br  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("maria@acme.com.br");
    }
  });

  it("permite honeypot preenchido no schema para silenciamento na rota", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      honeypot: "http://spam.example",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.honeypot).toBe("http://spam.example");
    }
  });

  it("aceita company e phone vazios ou omitidos", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      company: "",
      phone: "",
    });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 4: Rodar o teste e verificar que falha (RED)**

Run: `npx vitest run src/lib/__tests__/validations.test.ts`
Expected: FAIL — 4 testes falham (`name: "   "`, `message: "            "`, `email` com espaços, e `honeypot` preenchido).

- [ ] **Step 5: Corrigir `contactSchema` em `src/lib/validations.ts`**

- Mover `.trim()` para **antes** de `.min()`/`.max()` em `name`, `company`, `phone` e `message`.
- Em `email`, usar `z.string().trim().toLowerCase().pipe(z.email("E-mail inválido")).pipe(z.string().max(254, "E-mail muito longo"))` (ou `.max(254)` antes do `.pipe(z.email(...))` para manter erro de tamanho e compatibilidade com `zod@4.6.7`).
- Alterar `honeypot` para `z.string().optional()` (removendo `.max(0)`).

- [ ] **Step 6: Rodar testes e checagens (GREEN)**

Run: `npx vitest run src/lib/__tests__/validations.test.ts && npx tsc --noEmit`
Expected: PASS (5/5 tests) e `tsc` exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts src/lib/validations.ts src/lib/__tests__/validations.test.ts
git commit -m "fix(validation): configurar Vitest, corrigir ordem de trim/honeypot no Zod v4 e remover motion"
```

---

### Task 2: Endurecer `POST /api/contact` (erros do Resend v6, rate limit, payload chunked, CRLF, 503 seguro)

**Files:**
- Create: `src/lib/rate-limit.ts`
- Modify: `src/lib/resend.ts`
- Modify: `src/app/api/contact/route.ts`
- Test: `src/lib/__tests__/rate-limit.test.ts`
- Test: `src/app/api/contact/__tests__/route.test.ts`

**Interfaces:**
- Consumes: `contactSchema`, `projectTypeLabels` de `src/lib/validations.ts`
- Produces:
  - `createRateLimiter(options: { windowMs: number; limit: number; maxEntries: number })` → `{ check(key: string, now?: number): boolean; clear(): void; size(): number }` em `src/lib/rate-limit.ts`
  - `extractClientIp(headers: Headers): string` em `src/lib/rate-limit.ts` (prioriza `x-real-ip` / `cf-connecting-ip`, depois último/confiável fallback ou `x-forwarded-for`, caindo para `"unknown"`)
  - `getResendClient(): Resend | null` e `isResendConfigured(): boolean` em `src/lib/resend.ts` (lendo `process.env.RESEND_API_KEY` de forma segura)
  - `POST(request: Request)` em `src/app/api/contact/route.ts` retornando: `200`, `400`, `413`, `422` (usando `z.flattenError`), `429`, `502` (erro Resend), `503` (genérico sem vazar env vars)

- [ ] **Step 1: Escrever testes que falham para `rate-limit.ts` em `src/lib/__tests__/rate-limit.test.ts`**

Testar:
- `permite até N requisições dentro da janela e bloqueia a (N+1)-ésima`
- `remove entradas expiradas para evitar vazamento de memória` (avança `now` além de `windowMs` e verifica `size()`)
- `respeita maxEntries removendo entradas antigas quando o limite é atingido`
- `extractClientIp prioriza x-real-ip sobre x-forwarded-for e retorna unknown quando ausente`

- [ ] **Step 2: Rodar teste de `rate-limit` e verificar falha (RED)**

Run: `npx vitest run src/lib/__tests__/rate-limit.test.ts`
Expected: FAIL — módulo `@/lib/rate-limit` não encontrado.

- [ ] **Step 3: Implementar `src/lib/rate-limit.ts` e rodar teste (GREEN)**

Implementar `createRateLimiter` com limpeza de entradas expiradas + evicção FIFO quando `map.size >= maxEntries`, e `extractClientIp(headers)` verificando `x-real-ip`, `cf-connecting-ip`, depois `x-forwarded-for` (trimmed), senão `"unknown"`.
Run: `npx vitest run src/lib/__tests__/rate-limit.test.ts`
Expected: PASS.

- [ ] **Step 4: Escrever testes que falham para `POST /api/contact` em `src/app/api/contact/__tests__/route.test.ts`**

Mockar `@/lib/resend` com `vi.mock` para controlar `send` e `isResendConfigured` e testar todos os comportamentos reais do handler `POST`:
1. `retorna 502 quando resend.emails.send retorna { data: null, error }` (reproduz Critical #1)
2. `retorna 200 silenciosamente sem chamar resend quando honeypot está preenchido` (reproduz Critical #3)
3. `retorna 503 com mensagem genérica sem expor nomes de variáveis de ambiente quando não configurado` (`expect(json.message).not.toMatch(/RESEND_API_KEY|CONTACT_FROM_EMAIL|CONTACT_TO_EMAIL/)`)
4. `retorna 413 quando payload excede 8000 bytes mesmo sem cabeçalho content-length` (reproduz Important #1 / Review Focus #2)
5. `sanitiza CRLF no assunto e preenche "Não informado" quando company e phone são strings vazias` (reproduz Important #2)
6. `retorna 422 com fieldErrors quando name tem apenas espaços` (Review Focus #3)
7. `retorna 400 para JSON malformado e 429 após exceder 5 requisições por minuto do mesmo IP`

- [ ] **Step 5: Rodar teste da rota e verificar que falha (RED)**

Run: `npx vitest run src/app/api/contact/__tests__/route.test.ts`
Expected: FAIL nos cenários 1, 2, 3, 4 e 5.

- [ ] **Step 6: Corrigir `src/lib/resend.ts` e `src/app/api/contact/route.ts`**

- Em `src/lib/resend.ts`, garantir criação segura do cliente (`getResendClient()` ou manter `resend` + `isResendConfigured()`).
- Em `src/app/api/contact/route.ts`:
  - Usar `createRateLimiter({ windowMs: 60_000, limit: 5, maxEntries: 1_000 })` e `extractClientIp(request.headers)`.
  - Checar `content-length` com `Number.parseInt(contentLength, 10)` (`!Number.isNaN(...)`) e ler `const rawBody = await request.text()`, verificando `Buffer.byteLength(rawBody, "utf8") > MAX_PAYLOAD_BYTES` antes de `JSON.parse(rawBody)`.
  - Substituir `parsed.error.flatten().fieldErrors` por `z.flattenError(parsed.error).fieldErrors`.
  - No `if (!resend || !isResendConfigured())`, logar no servidor e retornar `503` com `"Serviço temporariamente indisponível. Tente novamente mais tarde."`.
  - Sanitizar `const safeName = name.replace(/[\r\n]+/g, " ").trim()` para `subject`.
  - Usar `company || "Não informado"` e `phone || "Não informado"` em `emailBody`.
  - Desestruturar `const { error } = await resend.emails.send(...)`; se `error`, logar e retornar `502`.

- [ ] **Step 7: Rodar testes completos e `tsc` (GREEN)**

Run: `npm test && npx tsc --noEmit`
Expected: PASS em todas as suítes (`validations`, `rate-limit`, `route`) e `tsc` exit 0.

- [ ] **Step 8: Commit**

```bash
git add src/lib/rate-limit.ts src/lib/resend.ts src/app/api/contact/route.ts src/lib/__tests__/rate-limit.test.ts src/app/api/contact/__tests__/route.test.ts
git commit -m "fix(api): tratar erros do Resend v6, endurecer rate-limit/payload e corrigir honeypot/CRLF"
```

---

### Task 3: Corrigir CSS Cascade do Tailwind v4 (`globals.css`), extrair `buttonVariants` e refatorar `FormFields` + `ContactForm`

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/FormFields.tsx`
- Modify: `src/components/sections/ContactForm.tsx`
- Test: `src/app/__tests__/globals.test.ts`
- Test: `src/components/sections/__tests__/ContactForm.test.tsx`

**Interfaces:**
- Consumes: `contactSchema`, `ContactFormData`, `projectTypeLabels` de `src/lib/validations.ts`; `cn` de `src/lib/utils.ts`
- Produces:
  - `buttonVariants(options?: { variant?: "primary" | "ghost"; size?: "default" | "sm"; className?: string }): string` e `Button` (com `loadingText?: string`, `ref` prop React 19) em `src/components/ui/Button.tsx`
  - `Field` (`{ label: string; htmlFor: string; error?: string; errorId?: string; children: React.ReactNode; className?: string }`) renderizando `<div>` + `<label htmlFor>` + `<span id={errorId} role="alert">` irmão em `src/components/ui/FormFields.tsx`
  - `Input`, `Textarea`, `Select` (com wrapper + ícone chevron `aria-hidden="true"` `pointer-events-none`) usando `ref` prop React 19 em `src/components/ui/FormFields.tsx`
  - `ContactForm` acessível sem `<label>` aninhado, com link para `/politica-de-privacidade`, `autoComplete="off"` no honeypot e parse seguro de respostas não-JSON

- [ ] **Step 1: Escrever testes que falham em `src/app/__tests__/globals.test.ts` e `src/components/sections/__tests__/ContactForm.test.tsx`**

Em `src/app/__tests__/globals.test.ts`:
- Ler `src/app/globals.css` e verificar que:
  - Existe `@layer base` contendo `html` (com `scroll-padding-top`), `body` e `:focus-visible`.
  - Não existem regras globais fora de `@layer` sobrescrevendo `a {`, `button,` ou `* {`.

Em `src/components/sections/__tests__/ContactForm.test.tsx`:
1. `não renderiza elemento <label> aninhado dentro de outro <label>` (`container.querySelector("label label")` é `null`)
2. `associa campos aos seus labels via htmlFor/id e aplica aria-invalid e aria-describedby em erro de validação`
3. `possui link para /politica-de-privacidade no checkbox de consentimento e autoComplete="off" no honeypot`
4. `exibe mensagem amigável em pt-BR quando o servidor retorna 502 HTML não-JSON` (mock `global.fetch` retornando `new Response("<html>Bad Gateway</html>", { status: 502, headers: { "content-type": "text/html" } })`, confirmar que o alerta exibido **não** contém `SyntaxError` nem `Unexpected token`)
5. `botão "Enviar outra mensagem" após envio bem-sucedido possui type="button"`

- [ ] **Step 2: Rodar os testes e verificar que falham (RED)**

Run: `npx vitest run src/app/__tests__/globals.test.ts src/components/sections/__tests__/ContactForm.test.tsx`
Expected: FAIL em todos os testes novos.

- [ ] **Step 3: Corrigir `src/app/globals.css`**

- Remover `* { box-sizing: border-box; }`, `a { color: inherit; text-decoration: none; }` e `button, input, textarea, select { font: inherit; }` (já cobertos pelo Preflight do Tailwind v4 dentro de `@layer base`).
- Envolver `html` (adicionando `scroll-padding-top: 84px;`), `body` e `:focus-visible` dentro de `@layer base { ... }`.
- Manter `@theme`, `:root { color-scheme: dark; }` e `@media (prefers-reduced-motion: reduce)` intactos.

- [ ] **Step 4: Refatorar `src/components/ui/Button.tsx` e `src/components/ui/FormFields.tsx`**

- Em `src/components/ui/Button.tsx`: extrair e exportar `buttonVariants({ variant, size, className })`, adicionar prop `loadingText = "Enviando..."`, aceitar `ref?: React.Ref<HTMLButtonElement>` diretamente (React 19).
- Em `src/components/ui/FormFields.tsx`:
  - Aceitar `ref` diretamente nas props (React 19) em `Input`, `Textarea` e `Select`.
  - No `Select`, envolver em `<div className="relative">` com `<select className={cn(inputBase, "cursor-pointer appearance-none pr-10", className)}>` e `<ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)]" />` (de `lucide-react`).
  - Refatorar `Field` para renderizar `<div>` com `<label htmlFor={htmlFor}>` e `<span id={errorId} role="alert">` irmão do controle.

- [ ] **Step 5: Refatorar `src/components/sections/ContactForm.tsx`**

- Usar `useId()` (ou prefixo único) para `id` e `errorId` de cada campo (`name`, `company`, `email`, `phone`, `projectType`, `message`, `consent`), passando `aria-invalid={Boolean(errors.X)}` e `aria-describedby={errors.X ? errorId : undefined}`.
- Renderizar o checkbox de consentimento fora de `<Field>` (usando `<div>` + único `<label>` + `<span role="alert">` irmão), incluindo `<Link href="/politica-de-privacidade" className="underline hover:text-white">Política de Privacidade</Link>` no texto.
- Adicionar `autoComplete="off"` ao input honeypot.
- Adicionar `type="button"` ao botão `"Enviar outra mensagem"`.
- Em `onSubmit`, encapsular `await response.json()` em `try/catch`: se o corpo não for JSON válido ou `!response.ok`, exibir `result?.message || "Erro ao enviar mensagem. Tente novamente mais tarde."`.
- Envolver o símbolo `↗` do botão de envio em `<span aria-hidden="true">↗</span>`.

- [ ] **Step 6: Rodar todos os testes e `tsc` + `lint` (GREEN)**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: PASS em todas as suítes e zero erros de tipo/lint.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/components/ui/Button.tsx src/components/ui/FormFields.tsx src/components/sections/ContactForm.tsx src/app/__tests__/globals.test.ts src/components/sections/__tests__/ContactForm.test.tsx
git commit -m "fix(ui): corrigir @layer base no Tailwind v4, eliminar label aninhado e blindar ContactForm"
```

---

### Task 4: Acessibilidade (a11y), DRY de botões, tipagem estrita e migração Next.js 16 nos componentes de UI/seções

**Files:**
- Modify: `src/components/ui/Accordion.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/illustrations/DashboardMockup.tsx`
- Modify: `src/components/sections/SegmentsSection.tsx`
- Modify: `src/components/sections/SolutionsSection.tsx`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/DifferentialsSection.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/ui/__tests__/Accordion.test.tsx`
- Test: `src/components/layout/__tests__/Navbar.test.tsx`
- Test: `src/components/sections/__tests__/a11y-sections.test.tsx`

**Interfaces:**
- Consumes: `buttonVariants` de `src/components/ui/Button.tsx`; `ServiceId` de `src/data/services.ts`
- Produces: componentes de layout/seções em conformidade WAI-ARIA, sem `priority` depreciado e com `Record<ServiceId, React.ReactNode>` exaustivo

- [ ] **Step 1: Escrever testes que falham para `Accordion`, `Navbar`, `DashboardMockup` e `SegmentsSection`**

1. `src/components/ui/__tests__/Accordion.test.tsx`:
   - `renderiza pergunta dentro de <h3> com button[type="button"], aria-expanded e aria-controls válidos`
   - `ao abrir, renderiza painel com role="region" e aria-labelledby apontando para o botão`
2. `src/components/layout/__tests__/Navbar.test.tsx`:
   - `botão mobile possui type="button" e tecla Escape fecha o menu mobile aberto`
   - `logo usa href="/#inicio"` e não dispara warning de prop depreciada
3. `src/components/sections/__tests__/a11y-sections.test.tsx`:
   - `DashboardMockup marca container decorativo com aria-hidden="true" e não renderiza elemento <aside>`
   - `SegmentsSection renderiza <ul aria-label="Segmentos atendidos"> com 6 itens <li>`

- [ ] **Step 2: Rodar os testes e verificar que falham (RED)**

Run: `npx vitest run src/components/ui/__tests__/Accordion.test.tsx src/components/layout/__tests__/Navbar.test.tsx src/components/sections/__tests__/a11y-sections.test.tsx`
Expected: FAIL em todos os testes novos.

- [ ] **Step 3: Implementar correções de a11y, Next.js 16 e DRY nos componentes**

- `src/components/ui/Accordion.tsx`: usar `useId()` para `buttonId` e `panelId`; envolver `<button type="button" id={buttonId} aria-expanded={open} aria-controls={panelId}>` em `<h3>`; renderizar painel aberto em `<div id={panelId} role="region" aria-labelledby={buttonId}>`.
- `src/components/layout/Navbar.tsx`: adicionar `useEffect` com listener `keydown` para fechar menu no `Escape` quando `menuOpen` for `true`; adicionar `type="button"` no botão toggle; substituir `priority` por `preload` no `<Image>`; usar `buttonVariants()` nos CTAs; prefixar links para `/#inicio` e `/#contato`; envolver `↗` em `<span aria-hidden="true">`.
- `src/components/layout/Footer.tsx`: atualizar logo link para `/#inicio` e documentar com comentário que `YEAR = 2026` evita acesso a clock dinâmico sob `cacheComponents: true`.
- `src/components/illustrations/DashboardMockup.tsx`: substituir `aria-label` na `<div>` raiz por `aria-hidden="true"`, trocar `<aside>` por `<div>` e remover `aria-label` do `<svg>` interno (já coberto por `aria-hidden="true"` no pai).
- `src/components/sections/SegmentsSection.tsx`: trocar `<div aria-label="Segmentos atendidos">` + `<span>` por `<ul aria-label="Segmentos atendidos">` + `<li>`.
- `src/components/sections/SolutionsSection.tsx`: importar `type { ServiceId }` de `@/data/services` e tipar `const mockups: Record<ServiceId, React.ReactNode>`; envolver símbolos Unicode decorativos (`◈`, `✓`, `○`, `↳`, `→`, `⌘`) em `<span aria-hidden="true">` (ou marcar os mockups visuais como `aria-hidden="true"`).
- `src/components/sections/HeroSection.tsx`, `src/components/sections/DifferentialsSection.tsx`, `src/app/page.tsx`: reutilizar `buttonVariants()` nos links estilizados como botão e envolver símbolos Unicode decorativos (`◈`, `⌘`, `↗`, `↓`) em `<span aria-hidden="true">`.

- [ ] **Step 4: Rodar todos os testes, `tsc` e `lint` (GREEN)**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: PASS em todas as suítes e zero erros de tipo/lint.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Accordion.tsx src/components/layout/Navbar.tsx src/components/layout/Footer.tsx src/components/illustrations/DashboardMockup.tsx src/components/sections/SegmentsSection.tsx src/components/sections/SolutionsSection.tsx src/components/sections/HeroSection.tsx src/components/sections/DifferentialsSection.tsx src/app/page.tsx src/components/ui/__tests__/Accordion.test.tsx src/components/layout/__tests__/Navbar.test.tsx src/components/sections/__tests__/a11y-sections.test.tsx
git commit -m "fix(a11y): adequar Accordion/Navbar/DashboardMockup/Segments, migrar Image preload e deduplicar botões"
```

---

### Task 5: SEO, Metadata/OG/Ícones Next.js 16, Política de Privacidade (LGPD) e Headers de Segurança

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/app/favicon.ico`
- Create: `src/app/icon.svg`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/twitter-image.tsx`
- Modify: `src/app/politica-de-privacidade/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: `next.config.ts`
- Test: `src/config/__tests__/site-seo-security.test.ts`

**Interfaces:**
- Consumes: nenhum
- Produces:
  - `resolveSiteUrl(rawUrl?: string): string` em `src/config/site.ts`
  - `siteConfig.nav` e `siteConfig.footer` com âncoras prefixadas por `/` (`/#solucoes`, `/#diferenciais`, `/#processo`, `/#faq`, `/#contato`)
  - `src/app/icon.svg`, `src/app/opengraph-image.tsx` e `src/app/twitter-image.tsx` (1200×630 PNG estático via `ImageResponse`)
  - Headers de segurança atualizados em `next.config.ts` (`poweredByHeader: false`, sem `X-XSS-Protection`, com `Strict-Transport-Security` e `Content-Security-Policy`)

- [ ] **Step 1: Escrever testes que falham em `src/config/__tests__/site-seo-security.test.ts`**

Testar:
1. `resolveSiteUrl("")`, `resolveSiteUrl("   ")` e `resolveSiteUrl(undefined)` retornam `"https://b2byte.com.br"`, e `resolveSiteUrl(" https://example.com/// ")` retorna `"https://example.com"` (Review Focus #1).
2. `siteConfig.nav` e `siteConfig.footer` têm âncoras prefixadas com `/#` (nenhum `href` começando apenas com `#`).
3. `robots()` inclui `disallow: "/api/"` e `sitemap` válido.
4. `sitemap()` retorna `lastModified` determinístico (igual em chamadas consecutivas).
5. `nextConfig` possui `poweredByHeader: false`, inclui `Strict-Transport-Security` e `Content-Security-Policy`, e **não** inclui `X-XSS-Protection`.
6. `PrivacyPage` renderiza `<main id="main-content">`, menciona operador de e-mail (**Resend**) / transferência internacional, menciona controlador (**B2byte Software Engineering**), não usa classes `prose` inertes nem `text-[var(--color-border)]`, e exporta `metadata.alternates.canonical === "/politica-de-privacidade"`.

- [ ] **Step 2: Rodar os testes e verificar que falham (RED)**

Run: `npx vitest run src/config/__tests__/site-seo-security.test.ts`
Expected: FAIL em todos os 6 testes.

- [ ] **Step 3: Implementar SEO, OG/Ícones, LGPD e Headers de Segurança**

- `src/config/site.ts`: exportar `resolveSiteUrl(rawUrl?: string)` (`const cleaned = rawUrl?.trim().replace(/\/+$/, ""); return cleaned || "https://b2byte.com.br";`), usar `url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)`, prefixar todas as âncoras em `nav` e `footer` com `/` (`/#solucoes`, `/#diferenciais`, `/#processo`, `/#faq`, `/#contato`).
- Remover `src/app/favicon.ico` (boilerplate grayscale do `create-next-app`) e criar `src/app/icon.svg` com o SVG da marca B2byte (`public/images/favicon.svg`).
- Criar `src/app/opengraph-image.tsx` (1200×630, `contentType = "image/png"`, `alt = "B2byte Software Engineering — Desenvolvimento de Software Sob Medida"`, renderizando card dark `#0B0F1A` / `#1E1B4B` / `#8B7CF6` via `ImageResponse` de `next/og`) e `src/app/twitter-image.tsx` re-exportando `default`, `alt`, `size`, `contentType` de `./opengraph-image`.
- `src/app/layout.tsx`: remover bloco manual `icons` redundante (agora gerenciado nativamente por `src/app/icon.svg`).
- `src/app/page.tsx`: exportar `metadata: Metadata = { alternates: { canonical: "/" } }` (evita que futuras rotas filhas herdem canonical `"/"` do layout raiz).
- `src/app/politica-de-privacidade/page.tsx`:
  - Adicionar `alternates: { canonical: "/politica-de-privacidade" }` e `openGraph: { url: "/politica-de-privacidade" }` em `metadata`.
  - Adicionar `id="main-content"` em `<main>`.
  - Remover classes `prose prose-invert prose-sm` inertes e corrigir `text-[var(--color-border)]` para `text-[var(--color-muted)]`.
  - Adequar texto à LGPD: identificar o controlador (`B2byte Software Engineering`, Brasília/DF), informar o compartilhamento estritamente necessário com o operador de envio de e-mails **Resend** (com possibilidade de processamento/transferência internacional de dados conforme Art. 33 da LGPD) e listar direitos do titular + canal de solicitação (Art. 18 da LGPD).
- `src/app/sitemap.ts`: usar constante `const LAST_MODIFIED = new Date("2026-11-25T00:00:00.000Z")` em vez de `new Date()`.
- `src/app/robots.ts`: configurar `rules: { userAgent: "*", allow: "/", disallow: "/api/" }`.
- `next.config.ts`: adicionar `poweredByHeader: false`, remover `X-XSS-Protection`, adicionar `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` e `Content-Security-Policy` compatível com Next.js (`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`).

- [ ] **Step 4: Rodar todos os testes, `tsc` e `lint` (GREEN)**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: PASS em todas as suítes e zero erros de tipo/lint.

- [ ] **Step 5: Commit**

```bash
git add src/config/site.ts src/app/layout.tsx src/app/favicon.ico src/app/icon.svg src/app/opengraph-image.tsx src/app/twitter-image.tsx src/app/politica-de-privacidade/page.tsx src/app/sitemap.ts src/app/robots.ts next.config.ts src/config/__tests__/site-seo-security.test.ts
git commit -m "fix(seo,security,lgpd): adicionar icon/OG próprios, canonicals, adequação LGPD e headers seguros"
```

---

### Task 6: Limpar código morto/assets boilerplate, atualizar `README.md` e `.gitignore`, e verificar build completo

**Files:**
- Delete: `src/data/projects.ts`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Delete: `public/brand/logo-primary.svg` (e diretório vazio `public/brand/`)
- Delete: `public/images/avatar.png`, `public/images/favicon.svg`, `public/images/logo-light.png`, `public/images/logo-light.svg`, `public/images/logo-mono-dark.png`, `public/images/logo-mono-dark.svg`, `public/images/logo-mono-white.png`, `public/images/logo-primary.png`
- Delete empty dirs: `public/projects/`, `references/`
- Modify: `.gitignore`
- Modify: `README.md`

**Interfaces:**
- Consumes: todos os entregáveis das Tasks 1–5
- Produces: repositório limpo, documentação fiel e build de produção verificado

- [ ] **Step 1: Remover arquivos/assets não utilizados e diretórios vazios**

Remover apenas os arquivos listados acima, preservando `public/images/logo-primary.svg` e `public/images/logo-mono-white.svg`.
Verificar com `grep -rn` que nenhuma referência em `src/` foi quebrada.

- [ ] **Step 2: Atualizar `.gitignore` e `README.md`**

- Em `.gitignore`: substituir as 5 linhas de `.env*` individuais por `.env*` + `!.env.example`, e adicionar `.claude/` e `.superpowers/`.
- Em `README.md`: substituir o boilerplate do `create-next-app` pela documentação do projeto **B2byte Landing Page** (visão geral, stack, variáveis de ambiente baseadas em `.env.example`, comandos `dev`/`build`/`start`/`lint`/`test`, e estrutura de pastas).

- [ ] **Step 3: Executar verificação completa de ponta a ponta (Review Focus #5)**

Run:
```bash
npm test && npx tsc --noEmit && npm run lint && npm run build
```
Expected:
- `npm test`: 100% PASS (0 falhas)
- `npx tsc --noEmit`: exit 0
- `npm run lint`: exit 0 (0 erros / 0 avisos)
- `npm run build`: exit 0, com `/`, `/politica-de-privacidade`, `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/opengraph-image`, `/twitter-image` compilados/pré-renderizados sem erros sob `cacheComponents: true`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: limpar assets/código não utilizados, atualizar README e higiene do .gitignore"
```
