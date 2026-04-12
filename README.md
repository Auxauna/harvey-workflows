# Harvey GTM BA Operator Portfolio

Operator-first interview portfolio for a hybrid GTM Business Analyst / GTM Engineering role.

## What this app shows
- A 90-day operating plan with explicit governance and KPI instrumentation.
- An evidence board with four tickets:
  - `GTM-000` Month-1 diagnostic + operating baseline
  - `GTM-001` Pre-call brief workflow (quick win)
  - `GTM-002` Segment routing + human review queue (core system)
  - `GTM-003` Competitive mention assist (innovation pilot)
- Claims tagged by confidence (`verified`, `assumption`, `hypothesis`).

## Local development
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
pnpm start
```

## Key files
- `app/page.tsx`: Operator brief + evidence board
- `app/tickets/[id]/page.tsx`: Detailed ticket views
- `app/about/page.tsx`: Source pack and assumptions
- `lib/tickets.ts`: Portfolio content model
- `lib/tools.ts`: Tooling model used across tickets
- `docs/operator-brief.md`: Standalone operator brief
