# CLAUDE.md — E404R

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**E404R** (`e404r-app`) — _"One Gateway. Infinite Intelligence."_

E404R is an intelligent AI routing gateway + Next.js dashboard, forked and evolved from E404R. It exposes one OpenAI-compatible endpoint (`/v1/*`) and routes traffic across **100+ upstream AI providers** with:
- Format translation (translator engine pivoting through OpenAI format)
- Smart AI Router (intelligent model selection by cost/quality/speed)
- Model-combo and multi-account fallback
- OAuth / API-key credential management & token refresh
- Quota / usage tracking and observability
- Optional cloud sync

Two published artifacts live in this one repo:
- The **dashboard + gateway** (root `package.json`, `e404r-app`) — the Next.js server that does the actual routing.
- The **CLI launcher** (`cli/`, published to npm as `e404r`) — a separate package that installs/starts the server and manages the tray. It has its own `package.json`, version, and build.

The code lives in `src/` (Next.js app + dashboard/compat APIs), `open-sse/` (the provider-agnostic routing/translation engine), `cli/` (the launcher package), and `tests/`.

## Commands

Dashboard/gateway (run from repo root):
```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev   # dev (webpack, port 20127 by default)
npm run build && PORT=20128 HOSTNAME=0.0.0.0 npm run start           # production
```
- Bun variants: `npm run dev:bun` / `build:bun` / `start:bun`.
- Default runtime port is **20128** (dashboard at `/dashboard`, API at `/v1`).
- Lint: `npx eslint .` (config `eslint.config.mjs`, extends `eslint-config-next`).

CLI package (`cli/`):
```bash
npm run cli:pack       # build + npm pack from root
cd cli && npm run dev  # nodemon watch
```

Tests (vitest, in `tests/`, an **independent** ESM package):
```bash
npm install
cd tests && npm install
npx vitest run                          # all tests
npx vitest run unit/capabilities.test.js   # single file
```

## E404R Branding & Identity

- **Brand Name**: E404R (Engine 404 Router)
- **Slogan**: "One Gateway. Infinite Intelligence."
- **Primary Color**: `#00D4FF` (Cyber Blue)
- **Accent Color**: `#00FF88` (AI Green)
- **Background**: `#050d1a` (Deep Space)
- **Data dir (Linux/Mac)**: `~/.e404r/`
- **Data dir (Windows)**: `%APPDATA%\e404r\`
- **CLI command**: `e404r`
- **npm package**: `e404r`

## Architecture

Two authoritative docs exist — read them before working in these areas:
- `docs/ARCHITECTURE.md` — full system: request lifecycle, combo/account fallback, OAuth + token refresh, cloud sync, data model.
- `open-sse/AGENTS.md` — the routing/translation engine's own conventions and "how to add a provider/executor/translator". **Read this before editing anything under `open-sse/`.**

### Request flow
```
Client (Claude Code / Cursor / Codex / Cline / OpenCode)
  ↓
/v1/* → /api/v1/* (Next.js rewrite in next.config.mjs)
  ↓
src/sse/handlers/chat.js (parse, combo expansion, account-selection loop)
  ↓
open-sse/handlers/chatCore.js (detect format, translate request, dispatch to executor)
  ↓
open-sse/executors/* (per-provider upstream call; default.js = any OpenAI-compatible)
  ↓
open-sse/translator/* (client format ↔ provider format, pivots through OpenAI)
  ↓
SSE back to client
```

`src/sse/` is the app-side entry glue; `open-sse/` is the provider-agnostic engine (usable standalone).

### Translator engine (`open-sse/translator/`)
- Pivots through **OpenAI as the intermediate format**. A translator registered on an exact `source:target` pair runs as a **direct route**, skipping the lossy double-hop.
- Translators **self-register** via `register(from, to, reqFn, resFn)` as an import side effect — a new translator file MUST be imported in `open-sse/translator/index.js` or it never runs.

### Provider registry (`open-sse/providers/registry/*`)
- One file per provider. `providers/registry/index.js` is **auto-generated** — regenerate with `scripts/migrate-registry.mjs` / `injectDisplayToRegistry.mjs`, don't hand-edit.
- Add a provider: copy `providers/REGISTRY_TEMPLATE.js`, add models to `config/providerModels.js`.

### Persistence
State is stored in SQLite under `src/lib/db/` with adapter fallback chain (`driver.js`): `bun:sqlite` → `better-sqlite3` → `node:sqlite` → `sql.js`.
- DB file: `~/.e404r/db/data.sqlite`
- `src/lib/localDb.js` is a backward-compat shim; new code imports from `@/lib/db/index.js`
- Per-entity logic: `src/lib/db/repos/*`
- Schema/migrations: `src/lib/db/migrations/`

### E404R Smart Router (`src/lib/smartRouter/`)
New in E404R — an intelligence layer on top of the existing routing engine:
- `classifier.js` — classifies request type (code, creative, analysis, simple...)
- `costOptimizer.js` — selects cheapest model for the task
- `qualityRouter.js` — routes by expected quality
- `availabilityChecker.js` — checks provider availability before routing

## Conventions & Gotchas

- Plain JavaScript (ESM), no TypeScript. `@/*` path alias → `src/*` (`jsconfig.json`).
- `custom-server.js` wraps the Next standalone server to derive client IP from TCP socket — preserve this when touching request/IP/rate-limit code.
- Security-sensitive env: `JWT_SECRET`, `INITIAL_PASSWORD` (default `123456` — **must override**), `API_KEY_SECRET`, `MACHINE_ID_SALT`.
- Binary/protobuf upstreams (kiro EventStream, cursor protobuf) don't round-trip through OpenAI — handled inside their own executor.
- Versioning: root and `cli/` are versioned independently; changes logged in `CHANGELOG.md`. Commit style: Conventional Commits (`fix(translator): …`, `feat(smart-router): …`).
- **E404R CSS palette**: brand primary `#00D4FF` (Cyber Blue), accent `#00FF88` (AI Green), background `#050d1a`. Use `--color-primary`, `--color-neon-green`, `--color-neon-blue` CSS variables.
