# Life Dashboard — Project Outline

## Vision
A self-hosted, locally-run life dashboard that aggregates infrastructure, academic, storage, and personal data into a single customizable interface with an integrated AI that can navigate, answer questions, and autonomously extend the dashboard itself.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Widget Grid | react-grid-layout |
| Charts | Recharts + Nivo |
| Client State | Zustand |
| Server Data | React Query (TanStack Query) |
| Database | SQLite via Prisma |
| Real-time | Server-Sent Events (SSE) |
| AI | Claude API (claude-sonnet-4-6) with tool use |
| Styling | Tailwind CSS + shadcn/ui |

## Core Concepts

### Widget Registry
Every widget is a self-contained module under `src/widgets/<name>/`. The registry (`src/lib/registry.ts`) maps widget type strings to their React component, data fetcher, and default config. Adding a new widget = adding a folder and registering it — no other wiring needed.

### Layout Persistence
Dashboard layouts are JSON stored in SQLite. Each "page" (e.g., Home, Infrastructure, Academic) has a saved layout that records widget positions, sizes, and per-widget config. The drag/resize UI writes back to the DB on change.

### Autonomous AI Extension
The AI has Claude tool-use access to:
- `create_widget` — scaffold a new widget module
- `add_api_route` — add a new backend data route
- `update_layout` — insert a widget into a page layout
- `read_file` / `list_directory` — inspect the codebase

This allows the AI to build a new page end-to-end without human file edits.

## Planned Integrations
| Integration | Method |
|-------------|--------|
| Proxmox | Proxmox REST API (nodes, VMs, containers) |
| Docker | Docker Engine API via socket or Portainer API |
| Assignments / Quizzes | Canvas LMS REST API or manual entry |
| Local Storage | Nextcloud WebDAV / SMB / custom file server |
| AI Chat | Claude API (Anthropic SDK) |

## Pages (Initial)
- **Home** — summary cards: system health, upcoming deadlines, storage usage, quick AI chat
- **Infrastructure** — Proxmox node stats, VM list, Docker container grid, network I/O
- **Academic** — assignment calendar, quiz schedule, grade tracker, deadline countdown
- **Storage** — file browser, disk usage graphs, recent files
- **Settings** — API key management, integration config, layout reset

## Autonomy Model
The dashboard is designed to grow itself:
1. User (or AI) identifies a data need
2. AI uses tools to create the widget module + API route
3. Widget is registered and added to the target page layout
4. No manual file editing required for new features

## Development Phases
1. **Scaffold** — Next.js + Prisma + shadcn/ui + react-grid-layout, empty widget shell
2. **Widget System** — registry, layout persistence, drag/drop UI, placeholder widgets
3. **Infrastructure** — Proxmox + Docker integrations
4. **Academic** — Canvas LMS or manual assignment tracker
5. **Storage** — local file browser widget
6. **AI Layer** — chat panel + tool-use autonomous extension
7. **Polish** — graphs, dark/light theme, mobile responsive, auth
