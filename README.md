## 🔥 Full-Stack CRUD Demo — React/Next + Adonis + Postgres CI/CD Tests
<div>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vercel-46E3B7?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
<img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare"/>
<img src="https://img.shields.io/badge/CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI/CD Pipeline"/>
<img src="https://img.shields.io/badge/JWT-D63AFF?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</div>

## ✨ Visão Geral

Projeto de demonstração com foco em arquitetura limpa e escalavel, UX rápida e deploy real.
Frontend moderno ReactJS (Next + shadcn/ui), formulários tipados (RHF + Zod) e cache de dados (TanStack Query).
Backend sólido (AdonisJS) com JWT, VineJS, Lucid ORM e CORS ajustado.
Banco PostgreSQL. **Pipeline CI/CD** completo, global via Cloudflare.

## 🧩 Stack

- Frontend: ReactJS, Next.js (App Router) · shadcn/ui (Tailwind + Radix) · TanStack Query · React Hook Form + Zod
- Backend: NestJS (TypeScript) · Prisma ORM · class-validator/class-transformer · Passport JWT (AuthGuard) · CORS · Swagger (OpenAPI)
- Banco: PostgreSQL 16
- CI/CD: GitHub Actions · Vercel (UI) · Render (API/DB)
- Domínio & Edge: Cloudflare (DNS, SSL, CDN)
- Hosting extra: Hetzner (landing/estáticos)

## 🧭 Monorepo
```bash
├─ api/           # AdonisJS  (TS)
│  ├─ app/        # controllers, models, validators, auth
│  ├─ config/     # auth, cors, database
│  ├─ start/      # routes, kernel
│  └─ tests/      # Japa (functional/unit)
├─ ui/            # Next.js (App Router)
│  ├─ src/        # app/, components/, lib/
│  └─ src/tests/  # Vitest + React Testing Library
└─ infra/         # docker-compose, manifests (opcional)
```

## 🧪 Testes
- UI — Vitest + React Testing Library
 Escopo: componentes, hooks, validação (Zod), estados de loading/erro e acessibilidade.
- API — Japa (AdonisJS)
 Escopo: healthcheck, autenticação JWT (login → token), rotas protegidas, CRUD e validações (VineJS).

## 🔁 CI (GitHub Actions)

**Pipelines**:
- UI: instala deps (pnpm), roda pnpm test, build do Next.
- API: instala deps, roda node ace test.
- Política: rodar em PR e em pushes para main/develop.
  
## 🚀 Deploy — Vercel (Front)

- UI — **Vercel**: projeto /ui; NEXT_PUBLIC_API_URL=https://api.dominio.com.
- API — **Render**: api; build pnpm i --frozen-lockfile && node ace build; start node build/bin/server.js; rodar migrations.
- **Cloudflare**:  app.dominio.com (Vercel) e api.dominio.com (Render), HTTPS e caching.
- **Hetzner**: landing/ativos atrás do Cloudflare

## 🚀 Deploy — Render (Back)

- Start: node build/bin/server.js
- Build: pnpm i --frozen-lockfile && node ace build --production
- Migrations pós-build: node build/bin/console.js migration:run --force
- Env JWT_SECRET, APP_KEY, CORS_ORIGIN=https://app.dominio.com

## 🔗 Links

- App (Vercel): aguarde
- API (Render): aguarde
- Landing (Hetzner): aguarde
- Design/Docs: Notion/Wiki

## 🧭 API Docs — Swagger / OpenAPI

## ✅ Checklist
 - Melhoria continua...

## 📜 Licença
- ⚖️ MIT — use, estude e adapte.

- [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fabyo-guimaraes/)
 
