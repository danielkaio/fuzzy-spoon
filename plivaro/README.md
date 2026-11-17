# Plivaro

Site da Plivaro em React, com Next.js (App Router), TypeScript e Tailwind CSS.

## Rodando localmente

```bash
cp .env.example .env.local   # preencha as chaves
npm install
npm run dev                  # http://localhost:3000
```

## Variáveis de ambiente

| Variável               | Para que serve                                        |
| ---------------------- | ----------------------------------------------------- |
| `RESEND_API_KEY`       | Chave da API do Resend, usada para enviar a proposta. |
| `EMAIL_TO`             | Quem recebe as propostas. Aceita `PLIVARO_EMAIL_TO`.  |
| `EMAIL_CC`             | Cópia opcional.                                       |
| `FROM_EMAIL`           | Remetente verificado no Resend.                       |
| `NEXT_PUBLIC_SITE_URL` | Domínio canônico. Padrão: `https://plivaro.com`.      |

## Estrutura

- `app/page.tsx` monta a página inicial a partir dos componentes em `components/`.
- `app/api/proposta/route.ts` valida o formulário e envia o e-mail pelo Resend.
- `app/politica-privacidade-cookies/` é a página de privacidade e cookies.
- `lib/site.ts` concentra textos, serviços, etapas e contatos.
- `lib/proposta.ts` tem os planos e a validação usada no navegador e no servidor.
- `app/sitemap.ts`, `app/robots.ts` e `app/opengraph-image.tsx` cuidam do SEO.

## Deploy na Vercel

Aponte o **Root Directory** do projeto para `plivaro/` e cadastre as variáveis
acima. Os endereços antigos `/index.html` e `/politica-privacidade-cookies.html`
redirecionam para as novas rotas.
