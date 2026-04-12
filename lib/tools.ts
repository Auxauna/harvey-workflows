export type ToolCategory =
  | "crm"
  | "marketing"
  | "support"
  | "pm"
  | "docs"
  | "messaging"
  | "calls"
  | "enrichment"
  | "warehouse"
  | "integration"
  | "vercel"
  | "ai";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  role: string;
}

export const TOOLS: Record<string, Tool> = {
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description:
      "CRM system for accounts, contacts, opportunities, and lead lifecycle management.",
    role:
      "System of record for GTM execution. Routing outcomes, ownership, and pipeline state write back here.",
  },
  marketo: {
    id: "marketo",
    name: "Marketo",
    category: "marketing",
    description:
      "Marketing automation platform for form capture, nurture programs, and lead lifecycle rules.",
    role:
      "Top-of-funnel signal source for inbound and nurture-stage leads before SFDC handoff.",
  },
  zendesk: {
    id: "zendesk",
    name: "Zendesk",
    category: "support",
    description:
      "Support platform for ticketing and customer interaction history.",
    role:
      "Support and post-sales signal source used for health and escalation context.",
  },
  linear: {
    id: "linear",
    name: "Linear",
    category: "pm",
    description: "Issue tracking and cross-functional delivery coordination.",
    role:
      "Intake, triage, retune backlog, and execution tracking surface for GTM Technology work.",
  },
  notion: {
    id: "notion",
    name: "Notion",
    category: "docs",
    description:
      "Documentation workspace with pages and databases accessible via API.",
    role:
      "Operating artifacts layer: discovery notes, decision logs, runbooks, battlecards, and readouts.",
  },
  slack: {
    id: "slack",
    name: "Slack",
    category: "messaging",
    description: "Team communication and alerting surface.",
    role:
      "Human-in-the-loop approvals, routing escalations, and rep-facing workflow notifications.",
  },
  gong: {
    id: "gong",
    name: "Gong",
    category: "calls",
    description:
      "Revenue intelligence system for call recordings, transcripts, and summaries.",
    role:
      "Conversation signal source for coaching, pre-call context, and competitive mention detection.",
  },
  clay: {
    id: "clay",
    name: "Clay",
    category: "enrichment",
    description:
      "GTM enrichment and research workflow platform with waterfall-style data coverage.",
    role:
      "Enrichment and research layer for account/contact context before seller-facing outputs.",
  },
  scalestack: {
    id: "scalestack",
    name: "Scalestack",
    category: "enrichment",
    description:
      "GTM workflow platform for enrichment and routing-oriented orchestration.",
    role:
      "Optional enterprise enrichment lane for high-volume lead classification and routing flows.",
  },
  fivetran: {
    id: "fivetran",
    name: "Fivetran",
    category: "integration",
    description:
      "Managed ELT connector platform for syncing operational system data to warehouses.",
    role:
      "Moves GTM system data into Snowflake for reliable cross-system reporting and audits.",
  },
  snowflake: {
    id: "snowflake",
    name: "Snowflake",
    category: "warehouse",
    description:
      "Cloud data warehouse used for analytics, data modeling, and governance reporting.",
    role:
      "Shared KPI and governance layer across Marketing, Sales, Success, RevOps, and GTM Technology.",
  },
  vercelWorkflow: {
    id: "vercel-workflow",
    name: "Vercel Workflow",
    category: "vercel",
    description:
      "Durable, resumable multi-step workflow execution on Vercel.",
    role:
      "Execution control plane for long-running GTM workflows with retries, pauses, and human approvals.",
  },
  vercelAiSdk: {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    category: "ai",
    description:
      "TypeScript SDK for model-agnostic generation, tool calling, and structured outputs.",
    role:
      "Application layer for deterministic prompt/tool patterns and typed outputs in workflow steps.",
  },
  vercelAiGateway: {
    id: "vercel-ai-gateway",
    name: "Vercel AI Gateway",
    category: "vercel",
    description:
      "Unified model gateway for routing, observability, and usage management.",
    role:
      "Provider abstraction and usage visibility for production AI calls.",
  },
  vercelCron: {
    id: "vercel-cron",
    name: "Vercel Cron",
    category: "vercel",
    description:
      "Scheduled HTTP trigger for recurring jobs on Vercel.",
    role:
      "Time-based trigger for recurring GTM jobs such as digests, sweeps, and periodic evaluations.",
  },
};

export function getTool(id: string): Tool | undefined {
  return TOOLS[id];
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return Object.values(TOOLS).filter((tool) => tool.category === category);
}
