// Harvey's actual GTM tool stack. Tools are referenced across tickets to show stack awareness.

export type ToolCategory =
  | "enrichment"
  | "marketing"
  | "crm"
  | "success"
  | "support"
  | "data"
  | "runtime"
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
  // ─── Orchestration layer (agent runtime + tool protocol) ───
  claudeCode: {
    id: "claude-code",
    name: "Claude Code",
    category: "ai",
    description:
      "Anthropic's coding-oriented agent runtime. Runs as an end-to-end agent with native tool use, multi-step reasoning, and error recovery. Operates on a 'plain English prompt + MCP servers' model rather than bespoke orchestration code.",
    role:
      "The agent runtime for every workflow on this roadmap. Instead of writing bespoke orchestration pipelines, each workflow is a short Claude Code prompt plus a set of MCP servers for the tools it needs. Keeps the codebase thin, the decisions legible, and the failure modes isolated to the MCP layer.",
  },
  mcp: {
    id: "mcp",
    name: "MCP",
    category: "ai",
    description:
      "Model Context Protocol — Anthropic's open protocol for exposing tools, resources, and elicitations to AI agents. MCP servers wrap a given tool's API and expose it to Claude Code through a standard interface.",
    role:
      "The tool protocol for every workflow. Each source system (Salesforce, Gong, Clay, Scalestack, Firecrawl, Snowflake, Slack) is wired to Claude Code as an MCP server. Swappable, observable, and version-controlled — no bespoke SDK glue code per integration.",
  },
  vercelSandbox: {
    id: "vercel-sandbox",
    name: "Vercel Sandbox",
    category: "vercel",
    description:
      "Isolated execution environment for running agents and untrusted code in a secure container. GA since January 2026. Ephemeral, observable via Vercel dashboard, integrates with the rest of the Vercel platform primitives.",
    role:
      "Where Claude Code actually runs for every scheduled and triggered workflow. Each agent run is a Sandbox execution with fresh state, the relevant MCP servers pre-wired, and outcomes logged to Snowflake and Vercel Observability.",
  },
  vercelCron: {
    id: "vercel-cron",
    name: "Vercel Cron",
    category: "vercel",
    description:
      "Scheduled job primitive on Vercel. Triggers Sandbox executions on time-based or webhook-based schedules with built-in retry and observability.",
    role:
      "The trigger layer for every recurring workflow. Daily, hourly, and near-real-time jobs all run on Cron, which spins up a Claude Code agent inside Vercel Sandbox for each execution. Event-driven flows (Slack callbacks, SFDC Platform Events) hit Vercel API routes that invoke Sandbox on demand.",
  },
  vercelGateway: {
    id: "vercel-ai-gateway",
    name: "Vercel AI Gateway",
    category: "vercel",
    description:
      "Unified routing, caching, and observability layer for LLM calls across providers. GA since August 2025. Claude Sonnet 4.6 (1M context) and Opus 4.6 live on the Gateway with prompt caching and batch support.",
    role:
      "Backs every Claude Code model call. Handles failover, cost tracking, and observability without per-workflow auth management. Single source of truth for model usage across the function.",
  },
  claude: {
    id: "claude",
    name: "Claude",
    category: "ai",
    description:
      "Anthropic Claude — Sonnet 4.6 (1M context) for fast extraction and reasoning, Opus 4.6 for synthesis and complex judgment. Accessed via Vercel AI Gateway with prompt caching.",
    role:
      "The reasoning layer inside Claude Code. Sonnet handles heavy parallel extraction and classification, Opus handles higher-stakes synthesis (competitive counters, expansion value hypotheses, diagnostic analysis).",
  },

  // ─── Enrichment orchestration layers ───
  clay: {
    id: "clay",
    name: "Clay",
    category: "enrichment",
    description:
      "AI-native data orchestration platform for prospecting, enrichment, and outbound research workflows. Wraps 40+ data providers (ZoomInfo, Clearbit, Apollo, Cognism, LinkedIn-derived signal) behind a flexible waterfall. Strong at DIY spreadsheet-style workflows and bespoke one-off research via 'claygents.'",
    role:
      "The flexible, one-off counterpart to Scalestack. Used for per-meeting enrichment in GTM-001 (where each meeting needs bespoke context) and for entity resolution in GTM-002 (company-match is a Clay-native primitive). Exposed to Claude Code via an MCP server.",
  },
  scalestack: {
    id: "scalestack",
    name: "Scalestack",
    category: "enrichment",
    description:
      "Enterprise GTM orchestration platform. Wraps 60+ data providers (ZoomInfo, Clearbit, Apollo, Cognism, G2) behind a managed, ICP-aligned workflow engine. Handles enrichment, scoring, routing, territory mapping, and deduplication as composable AI-driven modules. Positions explicitly against Clay as the managed enterprise counterpart to Clay's DIY approach. Sub-3-second latency, 92%+ B2B match rate, SOC 2. MongoDB case study: hundreds of thousands of accounts across 90 territories.",
    role:
      "The bulk orchestration layer for recurring, enterprise-scale enrichment. Used in GTM-003 Lead Routing because the classification volume demands managed orchestration, not hand-tuned waterfalls. Exposed to Claude Code via an MCP server.",
  },
  zoominfo: {
    id: "zoominfo",
    name: "ZoomInfo",
    category: "enrichment",
    description:
      "Enterprise contact and company intelligence platform with intent data, technographic insights, and CRM integrations. ~1,500 req/min rate limit on the Enrich API.",
    role:
      "A raw data provider accessed through Clay or Scalestack's waterfall, not called directly from agent workflows. Still part of the stack because it's a primary firmographic source inside both orchestration layers.",
  },

  // ─── CRM, marketing, support, success ───
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description:
      "Sales Cloud. System of record for accounts, contacts, opportunities, and the source of truth for revenue. Platform Events and CDC streams expose real-time change data without polling.",
    role:
      "Center of gravity. Every workflow reads from or writes to SFDC via an MCP server. Platform Events are the preferred trigger for real-time flows (new lead, new external meeting), not polling.",
  },
  marketo: {
    id: "marketo",
    name: "Marketo",
    category: "marketing",
    description:
      "Adobe Marketo Engage. Enterprise marketing automation platform for lead scoring, nurture programs, and lead-to-account matching.",
    role:
      "Top-of-funnel system. Captures form fills, runs scoring rules, and syncs qualified leads to Salesforce. Nurture and lifecycle only — transactional agent sends now go through Resend.",
  },
  resend: {
    id: "resend",
    name: "Resend",
    category: "email",
    description:
      "Developer-first transactional email API with a React Email component library. Built by Vercel alumni, tight integration with Next.js and the Vercel deployment surface.",
    role:
      "Transactional delivery surface for every agent-generated email (pre-call briefs, commitment confirmations, competitive battlecards). Paired with React Email templates so agent outputs land in the inbox looking native.",
  },
  catalyst: {
    id: "catalyst",
    name: "Catalyst (by Totango)",
    category: "success",
    description:
      "Customer success platform for health scoring, account management, and expansion signal detection. Part of the Totango suite since the February 2024 merger.",
    role:
      "Post-close customer journey layer. Tracks health, expansion signals, and routes engagement events to CSMs. Agent-generated upsell signals log here as customer engagement events alongside the CSM's own account notes.",
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

  // ─── Data movement + warehouse ───
  fivetran: {
    id: "fivetran",
    name: "Fivetran",
    category: "data",
    description:
      "Managed ELT pipelines for replicating SaaS source data into the Snowflake warehouse on configurable sync frequency (5 min to 24 hr).",
    role:
      "Background data movement. Pulls from Salesforce, Marketo, Catalyst (Totango), Zendesk, Gong, and product analytics into Snowflake on an hourly or faster cadence. Agents read from Fivetran-replicated tables rather than calling source APIs directly for historical data.",
  },
  snowflake: {
    id: "snowflake",
    name: "Snowflake",
    category: "warehouse",
    description:
      "Cloud data warehouse and AI Data Cloud. Cortex AI Functions (GA November 2025) and Cortex Agents run Claude inline against warehouse data without leaving the system.",
    role:
      "Where every GTM dataset lands and where every agent writes its audit trail. Eval sets, scoring models, attribution, signal logs, prompt-retune training data, and HITL pause/resume state all live in Snowflake. Exposed to Claude Code via an MCP server.",
  },
  firecrawl: {
    id: "firecrawl",
    name: "Firecrawl",
    category: "data",
    description:
      "Web scraping and crawling API. The /agent endpoint, launched February 2026 as the evolution of /extract, takes a natural-language prompt and returns structured data extracted from any public website. Handles JS rendering, pagination, and rate limiting natively via Spark 1 models.",
    role:
      "Currently in pilot at Harvey. The /agent endpoint is the right primitive for any structured extraction against the public web — law firm client pages, attorney bios, deal tombstones. Known gotchas: billed on failure, credit-based pricing, no published max-pages per call. Exposed to Claude Code via an MCP server.",
  },

  // ─── Collaboration + PM + docs ───
  slack: {
    id: "slack",
    name: "Slack",
    category: "messaging",
    description:
      "Team messaging and notifications hub. Where reps actually live during their work day.",
    role:
      "The canonical HITL surface for every agent. Reps review drafts, confirm actions, approve or reject commitments — all inside Slack through the Vercel Chat SDK. Slack webhook callbacks wake paused Claude Code bursts to resume work once the human has tapped.",
  },
  vercelChatSdk: {
    id: "vercel-chat-sdk",
    name: "Vercel Chat SDK",
    category: "vercel",
    description:
      "Unified chat adapter framework from Vercel Labs (@chat-adapter/slack). Ships interactive buttons, cards, modals, and event handlers via JSX. Integrates directly with Claude Code for tool-call approval flows.",
    role:
      "The HITL primitive. Every Slack interaction — approve/edit/reject buttons, insert-into-email modals, competitive counter inserts — is built on Chat SDK. Slack webhooks from user interactions trigger Vercel Sandbox to re-invoke Claude Code for the continuation burst.",
  },
  gong: {
    id: "gong",
    name: "Gong",
    category: "calls",
    description:
      "Revenue intelligence platform that records, transcribes, and analyzes sales calls and customer conversations. Public API exposes call metadata, transcripts, and summaries via /v2/calls/extensive and /calls/{id}/transcript.",
    role:
      "Source of truth for what was actually said in customer conversations. Shadow sessions live here. Every post-call workflow reads transcripts via an MCP server. Webhooks on call-ended are the primary trigger for near-real-time post-call agents.",
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
  linear: {
    id: "linear",
    name: "Linear",
    category: "pm",
    description:
      "Issue tracking and project management for engineering and cross-functional GTM work.",
    role:
      "Where this very roadmap lives. The engineering source of truth for what's shipped, in progress, and backlogged. Systems Governance automatically opens Linear tickets for data quality anomalies.",
  },
  notion: {
    id: "notion",
    name: "Notion",
    category: "docs",
    description:
      "Knowledge base, documentation layer, and structured data store for cross-functional teams.",
    role:
      "Where the competitive battlecard, diagnostic-month interview notes, stakeholder map, and architecture docs live. The battlecard is version-controlled in Notion and re-read by the competitive radar agent on every run, so updates propagate without a deploy.",
  },
};

export function getTool(id: string): Tool | undefined {
  return TOOLS[id];
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return Object.values(TOOLS).filter((t) => t.category === category);
}
