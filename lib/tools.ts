// Harvey's actual GTM tool stack. Tools are referenced across tickets to show stack awareness.

export type ToolCategory =
  | "enrichment"
  | "marketing"
  | "crm"
  | "success"
  | "support"
  | "data"
  | "orchestration"
  | "warehouse"
  | "ai"
  | "vercel"
  | "messaging"
  | "calls"
  | "pm"
  | "docs"
  | "chat"
  | "email";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  role: string; // Why it's in Harvey's stack specifically
}

export const TOOLS: Record<string, Tool> = {
  clay: {
    id: "clay",
    name: "Clay",
    category: "enrichment",
    description:
      "AI-native data orchestration platform for prospecting, enrichment, and outbound research workflows. Waterfall enrichment is a native primitive — pay only when a provider returns a hit.",
    role:
      "Primary enrichment layer and the practical source of LinkedIn-derived signal (job changes, recent posts, shared connections) now that LinkedIn's Sales Navigator API is closed to new partners. Used for waterfall enrichment, claygents, and on-demand account research.",
  },
  scalestack: {
    id: "scalestack",
    name: "Scalestack",
    category: "enrichment",
    description:
      "Global enterprise GTM orchestration platform layering 60+ data providers behind a single API. Used for account research, scoring, and segmentation.",
    role:
      "On the bench. Available as a secondary enrichment path for accounts where Clay and ZoomInfo both miss. Not used in the default waterfall for v1.",
  },
  zoominfo: {
    id: "zoominfo",
    name: "ZoomInfo",
    category: "enrichment",
    description:
      "Enterprise contact and company intelligence platform with intent data, technographic insights, and CRM integrations. Enrich API supports real-time, scheduled, and on-demand modes with a ~1,500 req/min rate limit.",
    role:
      "Primary firmographic and contact data source inside Salesforce. Default first call in every enrichment waterfall.",
  },
  marketo: {
    id: "marketo",
    name: "Marketo",
    category: "marketing",
    description:
      "Adobe Marketo Engage. Enterprise marketing automation platform for lead scoring, nurture programs, and lead-to-account matching.",
    role:
      "Top-of-funnel system. Captures form fills, runs scoring rules, and syncs qualified leads to Salesforce. Transactional sends have been migrated to Resend for Vercel-native delivery — Marketo stays focused on nurture and lifecycle.",
  },
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description:
      "Sales Cloud. The system of record for accounts, contacts, opportunities, and the source of truth for revenue. Platform Events and CDC streams expose real-time change data without polling.",
    role:
      "Center of gravity for the GTM motion. Every workflow either reads from or writes to SFDC. Real-time triggers use Platform Events rather than Workato polling to avoid 5-minute jitter on time-sensitive flows.",
  },
  catalyst: {
    id: "catalyst",
    name: "Catalyst (by Totango)",
    category: "success",
    description:
      "Customer success platform for health scoring, account management, and expansion signal detection. Part of the Totango suite since the February 2024 merger.",
    role:
      "Post-close customer journey layer. Tracks health, expansion signals, and routes engagement events to CSMs. Agent Builder upsell signals log here as customer engagement events alongside the CSM's own account notes.",
  },
  zendesk: {
    id: "zendesk",
    name: "Zendesk",
    category: "support",
    description:
      "Enterprise support and ticketing platform with built-in AI agents and unified agent workspace.",
    role:
      "Replacing Freshdesk in an active migration. Will be the post-launch support and customer service layer.",
  },
  workato: {
    id: "workato",
    name: "Workato",
    category: "orchestration",
    description:
      "Enterprise iPaaS for orchestrating synchronous and event-driven workflows across SaaS tools and data systems. Workato Enterprise MCP (Feb 2026) exposes recipes as callable services for external AI agents.",
    role:
      "Glue layer for cross-tool automations. Recipes route data, trigger workflows, and handle conditional logic across the stack. Event-driven triggers (Salesforce Platform Events, Gong webhooks) are preferred over polling for any time-sensitive flow.",
  },
  fivetran: {
    id: "fivetran",
    name: "Fivetran",
    category: "data",
    description:
      "Managed ELT pipelines for replicating SaaS source data into the Snowflake warehouse on configurable sync frequency (5 min to 24 hr).",
    role:
      "Background data movement. Pulls from Salesforce, Marketo, Catalyst, Zendesk, Gong, and product analytics into Snowflake on an hourly or faster cadence. Every signal detection workflow reads from the Fivetran-replicated tables rather than calling source APIs directly.",
  },
  snowflake: {
    id: "snowflake",
    name: "Snowflake",
    category: "warehouse",
    description:
      "Cloud data warehouse and AI Data Cloud. Cortex AI Functions (GA November 2025) and Cortex Agents run Claude inline against warehouse data without leaving the system.",
    role:
      "Where every GTM dataset lands. Analytics, scoring models, attribution, eval sets, and Cortex-powered AI compute all run here. The single source of truth that other workflows read from and the canonical audit trail for every agent decision.",
  },
  linear: {
    id: "linear",
    name: "Linear",
    category: "pm",
    description:
      "Issue tracking and project management for engineering and cross-functional GTM work.",
    role:
      "Where this very roadmap lives. The engineering source of truth for what's shipped, in progress, and backlogged.",
  },
  notion: {
    id: "notion",
    name: "Notion",
    category: "docs",
    description:
      "Knowledge base, documentation layer, and structured data store for cross-functional teams.",
    role:
      "Where audits, runbooks, architecture docs, and the competitive battlecard live. The battlecard is version-controlled in Notion and re-read by the competitive radar agent on every run so updates propagate without a deploy.",
  },
  qualified: {
    id: "qualified",
    name: "Qualified",
    category: "chat",
    description:
      "Conversational sales platform with Piper, an AI SDR agent that qualifies and routes inbound web visitors in real-time. Acquired by Salesforce in December 2025; being integrated into Agentforce.",
    role:
      "Front door for inbound web traffic. Qualifies anonymous visitors, books meetings directly to AE calendars, syncs natively to SFDC. Post-acquisition, Piper is moving inside the Agentforce platform.",
  },
  gong: {
    id: "gong",
    name: "Gong",
    category: "calls",
    description:
      "Revenue intelligence platform that records, transcribes, and analyzes sales calls and customer conversations. Public API exposes call metadata, transcripts, and summaries via /v2/calls/extensive and /calls/{id}/transcript.",
    role:
      "Source of truth for what was actually said in customer conversations. Pulled into briefs, commitment tracking, competitive radar, and signal detection. Webhooks on call-ended are the primary trigger for post-call agents.",
  },
  slack: {
    id: "slack",
    name: "Slack",
    category: "messaging",
    description:
      "Team messaging and notifications hub. Where reps actually live during their work day.",
    role:
      "Canonical HITL surface for every agent on this roadmap. Reps review drafts, confirm commitments, and one-click approve actions before anything reaches a customer. Integration is via Vercel Chat SDK rather than a bespoke Slack bot.",
  },
  vercelChatSdk: {
    id: "vercel-chat-sdk",
    name: "Vercel Chat SDK",
    category: "vercel",
    description:
      "Unified chat adapter framework from Vercel Labs (@chat-adapter/slack). Ships interactive buttons, cards, modals, and event handlers via JSX. Integrates directly with the AI SDK for tool-calling agents.",
    role:
      "The human-in-the-loop primitive. Every agent that writes to Slack does so through Chat SDK, so approve/reject/edit buttons are first-class and the HITL pattern is the same shape across every workflow.",
  },
  resend: {
    id: "resend",
    name: "Resend",
    category: "email",
    description:
      "Developer-first transactional email API with a React Email component library. Built by Vercel alumni; tight integration with Next.js and the Vercel deployment surface.",
    role:
      "Transactional delivery surface for every agent-generated email (pre-call briefs, commitment confirmations, competitive battlecards). Replaces Marketo's transactional API for agent flows because the Vercel-native SDK, React Email templates, and observability story match how the rest of the stack ships.",
  },
  vercelSdk: {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    category: "vercel",
    description:
      "TypeScript SDK (v6, December 2025) for building AI applications with a unified provider interface. Ships DurableAgent, tool-calling loops with structured output, streaming, full MCP support with OAuth, tool-execution approval, and DevTools.",
    role:
      "Foundation for every AI workflow on this roadmap. generateText, generateObject, and DurableAgent are the three primitives. Tool-execution approval is how HITL gates get enforced at the SDK layer before Slack ever sees the request.",
  },
  vercelGateway: {
    id: "vercel-ai-gateway",
    name: "Vercel AI Gateway",
    category: "vercel",
    description:
      "Unified routing, caching, and observability layer for LLM calls across providers. GA since August 2025. Claude Sonnet 4.6 (1M context) and Opus 4.6 are both live on the Gateway with prompt caching and batch support.",
    role:
      "Single integration point for Claude and any future model. Handles failover, cost tracking, and observability without per-workflow auth management.",
  },
  vercelSandbox: {
    id: "vercel-sandbox",
    name: "Vercel Sandbox",
    category: "vercel",
    description:
      "Isolated execution environment for running untrusted code or agent tool calls in a secure container. GA since January 2026.",
    role:
      "Reserved for workflow steps that execute generated code — not used in v1 of any workflow on this roadmap. Available for future workflows where the Decide step generates SQL, executable transforms, or shell commands that need sandboxing before Act.",
  },
  vercelWorkflows: {
    id: "vercel-workflows",
    name: "Vercel Workflow DevKit",
    category: "vercel",
    description:
      "Durable, scheduled, event-driven workflow orchestration with deterministic replay, built-in retries, observability, and step management. Public beta. Survives crashes, deploys, and indefinite pauses without consuming resources.",
    role:
      "Runtime for scheduled jobs and long-running orchestrations — daily signal detection, recurring sync work, and any agent that waits for a human HITL gate. Survives deploys mid-run, which is the primitive that makes the weekend-MVP-then-harden pattern safe at production scale.",
  },
  claude: {
    id: "claude",
    name: "Claude",
    category: "ai",
    description:
      "Anthropic Claude — Sonnet 4.6 (1M context) for fast extraction and reasoning, Opus 4.6 for synthesis and complex judgment. Accessed via Vercel AI Gateway with prompt caching.",
    role:
      "The reasoning layer for every workflow. Sonnet handles the heavy parallel work, Opus handles the final judgment where stakes are higher (competitive positioning, expansion value hypothesis).",
  },
  firecrawl: {
    id: "firecrawl",
    name: "Firecrawl",
    category: "data",
    description:
      "Web scraping and crawling API. The /agent endpoint, launched February 2026 as the evolution of /extract, takes a natural-language prompt and returns structured data extracted from any public website. Handles JS rendering, pagination, and rate limiting natively via Spark 1 models.",
    role:
      "Currently in pilot at Harvey. The /agent endpoint is the right primitive for any structured extraction problem against the public web — law firm client pages, attorney bios, deal tombstones. Known gotchas: billed on failure, credit-based pricing on top of tier, no published max-pages per call.",
  },
};

export function getTool(id: string): Tool | undefined {
  return TOOLS[id];
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return Object.values(TOOLS).filter((t) => t.category === category);
}
