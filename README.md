# Syzygy Dashboard

A self-hosted personal life dashboard built with Next.js 15. Aggregates infrastructure stats, academic schedule, habits, tasks, finance, and more into a single dark-themed widget UI — with an integrated Claude AI panel that can autonomously extend the dashboard.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **React 19**
- **Tailwind CSS**
- SQLite via **Prisma** (layout & config persistence)
- **Recharts** for data visualization
- **Zustand** for UI state

## Features

- Modular widget system — every panel is an isolated, collapsible widget
- Live system metrics (CPU, memory, network) with sparkline graphs
- Weekly calendar view with event dots
- Habit tracker with 3-week heatmap and streak counter
- Task list, upcoming deadlines, reading tracker, budget overview, notes
- AI panel (Claude-powered) for natural language queries and autonomous widget scaffolding
- Dark monospace aesthetic (`#07080F` base, JetBrains Mono + Space Grotesk)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              # Next.js App Router pages and layout
  components/
    dashboard/      # Base Widget component
    layout/         # Sidebar, TopBar, AIPanel
    widgets/        # Individual widget components
  lib/
    icons.tsx       # Custom SVG icon set
    integrations/   # Typed API clients (Proxmox, Docker, Canvas, Storage)
    ai/             # Claude tool definitions for autonomous extension
  widgets/          # Widget registry (type → module mapping)
  store/            # Zustand UI state
  types/            # Shared TypeScript types
```

## Adding a Widget

1. Create `src/widgets/<name>/` with `index.tsx`, `fetcher.ts`, and `config.ts`
2. Register it in `src/widgets/_registry.ts`

No other wiring needed — the layout system picks it up automatically.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in credentials for any integrations you want to enable (Proxmox, Docker, Canvas LMS, Nextcloud/SMB). Integration keys are server-only and never exposed to the client bundle.
