# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Self-hosted life dashboard — Next.js 14 (App Router) monorepo. Aggregates Proxmox infrastructure, Docker containers, academic schedule, and local file storage into a customizable widget-based UI with an integrated Claude AI that can autonomously extend the dashboard (new pages, widgets, API routes) without human file edits.

## Commands

```bash
# Dev
npm run dev

# Build & type-check
npm run build

# Lint
npm run lint

# DB migrations (after editing prisma/schema.prisma)
npx prisma migrate dev --name <description>
npx prisma generate

# Add shadcn/ui components
npx shadcn@latest add <component>
```

## Architecture

### Widget System (the core abstraction)

Every feature is a widget. Each widget lives at `src/widgets/<name>/` and exports three things:

- `index.tsx` — React component that receives `config` and `data` props
- `fetcher.ts` — async function that hits the relevant API route and returns typed data
- `config.ts` — default config object + Zod schema for the widget's settings

The central registry at `src/widgets/_registry.ts` (and its server-side loader at `src/lib/registry.ts`) maps widget type strings to these modules. **Adding a new widget = add a folder + register it. No other wiring needed.**

### Layout Persistence

Layouts are JSON stored in SQLite via Prisma. Each page (`home`, `infrastructure`, `academic`, `storage`) has a row storing an array of `LayoutItem` objects (widget type, grid position/size, per-widget config). The `useLayout` hook loads and saves this. `DashboardGrid.tsx` wraps `react-grid-layout` and is the only place that reads/writes layout state.

### Data Flow

```
Widget component
  → useWidgetData(widgetType, config)   [hooks/useWidgetData.ts — React Query]
    → fetcher.ts                         [calls /api/<integration>/...]
      → src/lib/integrations/<name>.ts   [typed API client]
        → external service
```

Real-time data (Proxmox stats, Docker status) uses Server-Sent Events via `/api/sse/route.ts`.

### AI Autonomous Extension

`src/app/api/ai/route.ts` runs Claude with tool use. The tools defined in `src/lib/ai/tools.ts` are:

| Tool | Effect |
|------|--------|
| `create_widget` | Scaffolds a new widget folder with index/fetcher/config |
| `add_api_route` | Creates a new file under `src/app/api/` |
| `update_layout` | Inserts a widget into a page's saved layout in SQLite |
| `read_file` / `list_directory` | Inspects existing code before writing |

This is how the dashboard grows itself — the AI can build a complete new feature end-to-end.

### State

- **Zustand** (`src/store/dashboard.ts`) — UI state: edit mode on/off, active page, AI panel open/closed
- **React Query** — all server data, with per-widget cache keys and refetch intervals
- **Prisma/SQLite** — persistent: layouts, widget configs, integration credentials

## Integration Clients

All external API clients live in `src/lib/integrations/`. Each exposes typed async functions; the corresponding API route under `src/app/api/` is a thin proxy that calls the client and returns JSON. Never call integration clients directly from widget components — always go through the API route + fetcher pattern.

| File | Service |
|------|---------|
| `proxmox.ts` | Proxmox REST API — nodes, VMs, LXC containers |
| `docker.ts` | Docker Engine API via socket or Portainer |
| `canvas.ts` | Canvas LMS REST API — assignments, due dates |
| `storage.ts` | Local file storage — Nextcloud WebDAV or SMB |

## Key Types

`src/types/widget.ts` defines `WidgetDefinition`, `WidgetConfig`, and `LayoutItem` — read these before creating or modifying any widget. `src/types/integrations.ts` has the typed shapes for all external data (`ProxmoxNode`, `DockerContainer`, `Assignment`, etc.).

## Environment Variables

All secrets go in `.env.local` (never committed). See `.env.example` for the full list. Integration clients read their credentials from `process.env` at the server level only — never expose integration keys to the client bundle.
