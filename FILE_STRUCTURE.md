# File Structure

```
Dashboard/
├── OUTLINE.md                        # Project vision and architecture
├── FILE_STRUCTURE.md                 # This file
├── CLAUDE.md                         # Claude Code guidance
├── .env.local                        # API keys (never commit)
├── .env.example                      # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── prisma/
│   ├── schema.prisma                 # DB schema: layouts, widgets, configs
│   └── migrations/
│
├── public/
│   └── icons/                        # Widget icons
│
└── src/
    ├── app/                          # Next.js App Router
    │   ├── layout.tsx                # Root layout (theme provider, AI panel)
    │   ├── page.tsx                  # Home page
    │   ├── infrastructure/
    │   │   └── page.tsx
    │   ├── academic/
    │   │   └── page.tsx
    │   ├── storage/
    │   │   └── page.tsx
    │   ├── settings/
    │   │   └── page.tsx
    │   └── api/
    │       ├── layout/               # CRUD for saved layouts
    │       │   └── route.ts
    │       ├── widgets/              # Widget registry endpoint
    │       │   └── route.ts
    │       ├── ai/                   # Claude chat + tool-use endpoint
    │       │   └── route.ts
    │       ├── proxmox/              # Proxmox API proxy
    │       │   ├── nodes/route.ts
    │       │   └── vms/route.ts
    │       ├── docker/               # Docker API proxy
    │       │   └── containers/route.ts
    │       ├── academic/             # Assignments / Canvas proxy
    │       │   └── route.ts
    │       └── storage/              # Local storage API
    │           └── route.ts
    │
    ├── widgets/                      # Widget modules (one folder per widget)
    │   ├── _registry.ts              # Central registry: type → {component, fetcher, defaultConfig}
    │   ├── proxmox-nodes/
    │   │   ├── index.tsx             # Widget component
    │   │   ├── fetcher.ts            # Data fetching logic
    │   │   └── config.ts            # Default config + config schema
    │   ├── docker-containers/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   ├── assignment-calendar/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   ├── quiz-countdown/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   ├── storage-usage/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   ├── ai-chat/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   ├── system-health/
    │   │   ├── index.tsx
    │   │   ├── fetcher.ts
    │   │   └── config.ts
    │   └── clock/
    │       ├── index.tsx
    │       └── config.ts
    │
    ├── components/
    │   ├── dashboard/
    │   │   ├── DashboardGrid.tsx     # react-grid-layout wrapper
    │   │   ├── WidgetFrame.tsx       # Shared chrome: title bar, resize handle, settings btn
    │   │   ├── WidgetPicker.tsx      # Modal to add widgets from registry
    │   │   └── EditModeToggle.tsx    # Lock/unlock drag-resize mode
    │   ├── ui/                       # shadcn/ui components (auto-generated)
    │   └── layout/
    │       ├── Sidebar.tsx           # Page navigation
    │       ├── TopBar.tsx            # Search, AI toggle, theme switch
    │       └── AIPanel.tsx           # Slide-in AI chat sidebar
    │
    ├── lib/
    │   ├── prisma.ts                 # Prisma client singleton
    │   ├── registry.ts               # Widget registry loader
    │   ├── ai/
    │   │   ├── client.ts             # Anthropic SDK client
    │   │   ├── tools.ts              # Tool definitions for autonomous extension
    │   │   └── systemPrompt.ts       # AI system prompt
    │   ├── integrations/
    │   │   ├── proxmox.ts            # Proxmox API client
    │   │   ├── docker.ts             # Docker API client
    │   │   ├── canvas.ts             # Canvas LMS client
    │   │   └── storage.ts            # Local storage client
    │   └── utils.ts
    │
    ├── hooks/
    │   ├── useLayout.ts              # Load/save layout from DB
    │   ├── useWidgetData.ts          # React Query wrapper for widget fetchers
    │   └── useAI.ts                  # AI chat state + streaming
    │
    ├── store/
    │   └── dashboard.ts              # Zustand store: edit mode, selected page, AI panel open
    │
    └── types/
        ├── widget.ts                 # WidgetDefinition, WidgetConfig, LayoutItem types
        ├── integrations.ts           # ProxmoxNode, DockerContainer, Assignment, etc.
        └── ai.ts                     # Message, Tool, ToolCall types
```
