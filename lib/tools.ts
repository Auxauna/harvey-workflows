// Harvey's actual GTM tool stack, per James Hunsberger's LinkedIn message.
// Tools are referenced across tickets to show stack awareness.

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
  | "chat";

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
      "AI-native data orchestration platform for prospecting, enrichment, and outbound research workflows.",
    role:
      "Primary enrichment layer for sales-led motions. Used for waterfall enrichment, claygents, and on-demand account research.",
  },
  scalestack: {
    id: "scalestack",
    name: "Scalestack",
    category: "enrichment",
    description:
      "AI-powered RevOps automation platform for account research, scoring, and segmentation.",
    role:
      "Newer addition to the stack. Strongest on international firmographic data and segment-specific account scoring.",
  },
  zoominfo: {
    id: "zoominfo",
    name: "ZoomInfo",
    category: "enrichment",
    description:
      "Enterprise contact and company intelligence platform with intent data, technographic insights, and CRM integrations.",
    role:
      "System of record for B2B contact data inside Salesforce. Provides intent signals via ZoomInfo Copilot.",
  },
  marketo: {
    id: "marketo",
    name: "Marketo",
    category: "marketing",
    description:
      "Adobe Marketo Engage. Enterprise marketing automation platform for lead scoring, nurture programs, and lead-to-account matching.",
    role:
      "Top-of-funnel system. Captures form fills, runs scoring rules, and syncs qualified leads to Salesforce.",
  },
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    description:
      "Sales Cloud. The system of record for accounts, contacts, opportunities, and the source of truth for revenue.",
    role:
      "Center of gravity for the GTM motion. Every workflow either reads from or writes to SFDC.",
  },
  catalyst: {
    id: "catalyst",
    name: "Catalyst",
    category: "success",
    description:
      "Customer success platform for health scoring, account management, and expansion signal detection.",
    role:
      "Post-close customer journey layer. Tracks health, expansion signals, and routes engagement events to CSMs.",
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
      "Enterprise iPaaS for orchestrating synchronous and event-driven workflows across SaaS tools and data systems. Workato Enterprise MCP (launched Feb 2026) exposes recipes as callable services for external AI agents.",
    role:
      "Glue layer for cross-tool automations. Recipes route data, trigger workflows, and handle conditional logic across the stack. Workato Genies act as autonomous agents for multi-step business processes.",
  },
  fivetran: {
    id: "fivetran",
    name: "Fivetran",
    category: "data",
    description:
      "Managed ELT pipelines for replicating SaaS source data into the Snowflake warehouse on a scheduled cadence.",
    role:
      "Background data movement. Pulls from Salesforce, Marketo, Catalyst, Zendesk, and product analytics into Snowflake hourly or daily.",
  },
  snowflake: {
    id: "snowflake",
    name: "Snowflake",
    category: "warehouse",
    description:
      "Cloud data warehouse and AI Data Cloud. Cortex AI Functions (GA November 2025) and Cortex Agents enable running Claude and other models inline against warehouse data without leaving the system.",
    role:
      "Where every GTM dataset lands. Analytics, scoring models, attribution, and Cortex-powered AI compute all run here. The single source of truth that other workflows read from.",
  },
  linear: {
    id: "linear",
    name: "Linear",
    category: "pm",
    description:
      "Issue tracking and project management for engineering and cross-functional GTM work.",
    role:
      "Where this very ticket lives. The engineering source of truth for what's shipped, in progress, and backlogged.",
  },
  notion: {
    id: "notion",
    name: "Notion",
    category: "docs",
    description:
      "Knowledge base, documentation layer, and structured data store for cross-functional teams.",
    role:
      "Where audits, runbooks, and architecture docs live. Used for the artifacts that don't belong in Linear or Snowflake.",
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
      "Revenue intelligence platform that records, transcribes, and analyzes sales calls and customer conversations.",
    role:
      "Source of truth for what was actually said in customer conversations. Pulled into briefs, scoring, and signal detection.",
  },
  slack: {
    id: "slack",
    name: "Slack",
    category: "messaging",
    description:
      "Team messaging and notifications hub. Where reps actually live during their work day.",
    role:
      "Delivery surface for every workflow. If a system needs to reach a rep, it does so via Slack DM or channel post.",
  },
  vercelSdk: {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    category: "vercel",
    description:
      "TypeScript SDK for building AI applications with a unified provider interface across Anthropic, OpenAI, Google, and others.",
    role:
      "Foundation for every AI workflow Harvey builds internally. Provides generateText, generateObject, tool calling, and streaming.",
  },
  vercelGateway: {
    id: "vercel-ai-gateway",
    name: "Vercel AI Gateway",
    category: "vercel",
    description:
      "Unified routing, caching, and observability layer for LLM calls across multiple providers.",
    role:
      "Single integration point for all model providers. Handles failover, cost optimization, and unified billing.",
  },
  vercelSandbox: {
    id: "vercel-sandbox",
    name: "Vercel Sandbox",
    category: "vercel",
    description:
      "Isolated execution environment for running untrusted code or agent tool calls in a secure container.",
    role:
      "Used for any workflow step that runs generated code, executes tools, or needs ephemeral compute with strong isolation.",
  },
  vercelWorkflows: {
    id: "vercel-workflows",
    name: "Vercel Workflows",
    category: "vercel",
    description:
      "Durable, scheduled, event-driven workflow orchestration with built-in retries, observability, and step management.",
    role:
      "Powers scheduled jobs and long-running orchestrations. The runtime layer for daily signal detection and recurring sync work.",
  },
  claude: {
    id: "claude",
    name: "Claude",
    category: "ai",
    description:
      "Anthropic Claude — Sonnet 4.6 for fast extraction and reasoning, Opus 4.6 for synthesis and complex judgment.",
    role:
      "The reasoning layer for every workflow. Sonnet handles the heavy parallel work, Opus handles the final judgment.",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn Sales Navigator",
    category: "enrichment",
    description:
      "Professional network data for contact research, role changes, and recent activity.",
    role:
      "Pulled in real-time for pre-call brief generation. Used to surface recent posts, job changes, and shared connections.",
  },
  firecrawl: {
    id: "firecrawl",
    name: "Firecrawl",
    category: "data",
    description:
      "Web scraping and crawling API with an /agent endpoint that takes a natural-language prompt and returns structured data extracted from any public website. Handles JS rendering, pagination, and rate limiting natively.",
    role:
      "James is currently piloting Firecrawl. The /agent endpoint is the right primitive for any structured extraction problem against the public web — law firm sites, attorney bios, deal tombstones, anywhere the data is not already in an API.",
  },
};

export function getTool(id: string): Tool | undefined {
  return TOOLS[id];
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return Object.values(TOOLS).filter((t) => t.category === category);
}
