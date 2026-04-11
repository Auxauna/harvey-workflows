// All four GTM workflow tickets, structured as Linear-style issues.
// Each ticket follows a strict BA discipline pattern: background → criteria → architecture → stack → plan → risks → validation.

export type Priority = "P0" | "P1" | "P2" | "P3";
export type Status = "ready" | "in_progress" | "backlog" | "shipped";

export interface ArchitectureLayer {
  layer: number;
  name: string;
  detail: string;
  tools: string[]; // tool ids
}

export interface ImplementationPhase {
  phase: number;
  weekRange: string;
  title: string;
  tasks: string[];
}

export interface Risk {
  risk: string;
  likelihood: "Low" | "Medium" | "High";
  mitigation: string;
}

export interface ValidationMetric {
  metric: string;
  target: string;
  why: string;
}

export interface RoiMath {
  cost: string;
  savings: string;
  multiplier: string;
  payback: string;
}

export interface Ticket {
  id: string;
  title: string;
  priority: Priority;
  effort: string;
  sprint: string;
  status: Status;
  reporter: string;
  labels: string[];
  oneLiner: string;
  topPerformerMove?: string;
  roiMath?: RoiMath;
  background: string[];
  acceptanceCriteria: string[];
  architecture: ArchitectureLayer[];
  stack: string[]; // tool ids
  implementation: ImplementationPhase[];
  risks: Risk[];
  validation: ValidationMetric[];
  whyThisMatters: string;
}

export const TICKETS: Ticket[] = [
  {
    id: "GTM-001",
    title: "Pre-Call Brief Automation",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Week 3 of First 90 Days",
    status: "ready",
    reporter: "Rob Saliterman, VP Sales",
    labels: ["sales-enablement", "rep-productivity", "easy-win"],
    oneLiner:
      "Auto-generate a one-page meeting brief 30 minutes before every external meeting and deliver it to the rep's inbox and Slack.",
    topPerformerMove:
      "Your best AE already builds her own pre-call brief by hand. She has six tabs open: Salesforce, Gong, ZoomInfo, LinkedIn, Clay, last quarter's deal review notes. Thirty minutes of synthesis before every meeting. The agent shadows her exact process — same sources, same priorities, same talking-point hierarchy — and ships the brief to her inbox before she'd have even opened the first tab.",
    roiMath: {
      cost: "$15K eng + ~$2K/mo Claude API",
      savings: "~$3M/yr in rep prep time across 30 reps × 8 meetings × 30 min",
      multiplier: "200x first-year return",
      payback: "4 days after canary pod launch",
    },
    background: [
      "Reps spend 30 to 45 minutes researching accounts before every external meeting. Pulling from Salesforce for account history, Gong for last-call notes, ZoomInfo and Clay for firmographic detail, and LinkedIn for the contact's recent activity. The data exists. The work of assembling it is the bottleneck.",
      "Rough math: ~8 external meetings per day per rep × 30 minutes of prep × 30 reps = ~120 hours per day across the sales team spent on research that should be automated. Annualized that is roughly $3M of fully-loaded rep time spent assembling information that already lives in our systems.",
      "The pain is worse at Harvey specifically because much of the sales team is former BigLaw attorneys, not SaaS-native sellers. They are exceptional in conversation. They are not exceptional at clicking through six tools to assemble a pre-call view. The job of GTM Technology is to make the assembly invisible.",
      "This is the lowest-friction, highest-visibility win for the function. It earns trust with the rep population in week three so the harder systems work has air cover.",
    ],
    acceptanceCriteria: [
      "A one-page brief auto-generates 30 minutes before every external meeting on a sales rep's calendar.",
      "The brief is delivered to the rep's inbox via transactional email AND as a Slack DM. The rep does not have to open a new tool.",
      "The brief includes: meeting attendees with role and tenure, last three Gong call summaries with key objections raised, recent firm news from the past 14 days, the AE's open opportunities at the account, and three suggested talking points scoped to the meeting type.",
      "Every brief includes inline source citations (Salesforce, Gong, ZoomInfo, LinkedIn). No claims without sources.",
      "The rep can mark the brief 👍 or 👎 with one click. Ratings are logged to Snowflake for continuous improvement.",
      "If a brief cannot be generated (data missing, edge case), the system fails silently and logs the failure to a Linear issue for triage. It never sends a half-built brief.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Salesforce Calendar Watcher",
        detail:
          "A Workato recipe polls Salesforce activities every 5 minutes. When a new external meeting is created or updated within the next 24 hours, it fires a downstream workflow with the meeting metadata.",
        tools: ["salesforce", "workato"],
      },
      {
        layer: 2,
        name: "Hydrate — Pull Gong, ZoomInfo, Clay, LinkedIn in Parallel",
        detail:
          "Workato pulls account history from SFDC, last-three-call summaries from Gong, firmographic data via ZoomInfo and Clay (waterfall enrichment), recent LinkedIn activity for the contacts, and any open opportunities. Filters by meeting type (discovery vs expansion vs renewal vs check-in) to scope what gets pulled.",
        tools: ["salesforce", "gong", "zoominfo", "clay", "linkedin", "workato"],
      },
      {
        layer: 3,
        name: "Decide — Claude Synthesizes the One-Pager",
        detail:
          "Vercel AI SDK calls Claude Sonnet via the AI Gateway with a structured prompt + the source data. Returns a typed JSON object with the brief sections. Tool-calling is used to fetch additional context only if the model needs it (e.g., 'find more recent news about this firm').",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Validate — Schema Check, Citation Audit, Dedupe",
        detail:
          "TypeScript validation layer checks the JSON against a Zod schema, ensures every claim has a citation, deduplicates against the last brief sent for the same meeting, and renders into both a Markdown email body and a Slack Block Kit message.",
        tools: ["vercel-ai-sdk"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Slack DM, Email, Snowflake Log",
        detail:
          "Email goes via Marketo transactional API. Slack DM goes via Slack Workflow. Both fire 30 minutes before meeting start. Rep sees the brief in surfaces they already use. Every generation — inputs, model reasoning, delivery receipts, 👍/👎 — logs to Snowflake so the human can trust it.",
        tools: ["marketo", "slack", "snowflake"],
      },
    ],
    stack: [
      "salesforce",
      "gong",
      "zoominfo",
      "clay",
      "linkedin",
      "workato",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "snowflake",
      "marketo",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Build the data pull layer",
        tasks: [
          "Define the Zod schema for a brief (sections, fields, citation format).",
          "Build the Workato recipe that polls SFDC for upcoming meetings.",
          "Wire up data fetchers for Gong, ZoomInfo, Clay, and LinkedIn against five sample meetings.",
          "Validate that the right data flows through end-to-end before AI is in the loop.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Add the AI synthesis layer with three alpha testers",
        tasks: [
          "Build the Vercel AI SDK route that calls Claude Sonnet via AI Gateway.",
          "Iterate on the system prompt with three rep volunteers as alpha testers.",
          "Validate citation accuracy and brief quality against ground truth.",
          "Lock the brief template that everyone gets.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Production rollout to one pod",
        tasks: [
          "Deploy to one of Rob's enterprise pods as the canary group.",
          "Wire up Slack delivery and Marketo transactional email.",
          "Monitor brief generation rate, open rate, and 👍/👎 feedback for 5 business days.",
          "Triage any failures via Linear.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Expand to the full sales team",
        tasks: [
          "Address any feedback from canary pod.",
          "Roll out to the rest of the team.",
          "Document the runbook in Notion.",
          "Hand the recipe ownership over to RevOps for ongoing tuning.",
        ],
      },
    ],
    risks: [
      {
        risk: "Brief quality varies between meetings or across meeting types.",
        likelihood: "Medium",
        mitigation:
          "Three-rep alpha test before broad rollout. Each alpha tester reviews 10 briefs and scores them against a rubric. Iterate on the prompt until average score is above 4 of 5.",
      },
      {
        risk: "Reps ignore the briefs because they default to their existing prep habit.",
        likelihood: "Medium",
        mitigation:
          "Deliver in Slack DM AND email so it shows up where they already are. Track open rate; if below 60% in week one, change the delivery cadence and template.",
      },
      {
        risk: "Data freshness lag — Gong call summaries are 2 hours behind, ZoomInfo data is 7 days stale.",
        likelihood: "Medium",
        mitigation:
          "Workato sync runs every hour for hot data, daily for cold. The brief always includes a 'data freshness' line so the rep knows.",
      },
      {
        risk: "LLM hallucinates a fact that does not appear in source data.",
        likelihood: "Low",
        mitigation:
          "Every claim in the brief must include a citation linking back to the source. Post-processing layer rejects any uncited claim. The model is instructed to omit anything it cannot ground.",
      },
    ],
    validation: [
      {
        metric: "Brief generation rate",
        target: "95% of qualifying meetings",
        why: "Coverage is the floor. If we miss 1 in 20, reps stop trusting it.",
      },
      {
        metric: "Brief open rate",
        target: "80% within 30 minutes of delivery",
        why: "Tells us reps are actually finding value in the surface where we put it.",
      },
      {
        metric: "👍 satisfaction rate",
        target: "70% of rated briefs",
        why: "Quality signal. Below 70% means the prompt or data needs work.",
      },
      {
        metric: "Self-reported time saved per meeting",
        target: "20 minutes average",
        why: "The whole reason we built this. Validates the ROI math.",
      },
      {
        metric: "Deal advancement lift",
        target: "+5pt versus pre-launch baseline",
        why: "Lagging indicator. Proves better prep leads to better meetings.",
      },
    ],
    whyThisMatters:
      "This is the easy win that earns the right to do the harder systems work. It is high friction (every rep, every meeting), fast to ship (two weeks), and immediately visible (the rep sees the value in their inbox the day it launches). It also addresses Harvey's specific challenge of selling with a former-BigLaw rep population that needs invisible tooling, not another dashboard. Win this in week three and the panel trusts me with the rest of the roadmap.",
  },

  {
    id: "GTM-002",
    title: "Law Firm Customer Mapping via Firecrawl /agent",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Month 1",
    status: "ready",
    reporter: "James Hunsberger, Head of GTM Technology",
    labels: ["prospecting", "intelligence", "firecrawl", "relationship-graph"],
    oneLiner:
      "Build a Firecrawl /agent workflow that extracts every named client company from a law firm's public website. Surfaces the corporate relationships hiding in attorney bios.",
    topPerformerMove:
      "Your best researcher already knows where law firm client data hides — practice-group representative experience, attorney bio deal tombstones, news mentions of closed matters. Nobody writes it down. It lives in her muscle memory. The agent doesn't replace her intuition; it encodes the three-surfaces insight into one careful prompt and lets Firecrawl /agent do the legwork at firm-portfolio scale.",
    roiMath: {
      cost: "$8K eng + Firecrawl credits (~$300/mo at 500 firms)",
      savings: "Unlocks 100% of the corporate cross-sell relationship graph Harvey does not have today",
      multiplier: "Untapped — every Fortune 500 client of a pipeline firm becomes a warm lead",
      payback: "First closed cross-sell deal sourced from the graph",
    },
    background: [
      "James asked me directly on April 10: 'Some firms list out what companies they work with. How would you structure the firecrawl query to look to see what customers are listed?' This ticket is the structured answer.",
      "The hard part is not the crawl. It's that law firm websites do not have SaaS-style logo walls. Client data is scattered across three different surfaces, and a naive crawl misses the majority of the value:",
      "1. Representative Experience sections under each practice group. Cleanest source — direct, attributed, contextual.",
      "2. Client lists. Rare. Mostly boutiques. Easy when present, absent at most major firms.",
      "3. Buried in individual attorney bios where partners name-drop specific deals and clients. This is where the actual gold is. Most extraction tools miss it because attorney bios are deeply nested and the named-client mentions are inline prose, not structured data.",
      "Once extracted at scale, this dataset is rocket fuel for Harvey GTM. Every Fortune 500 corporate that a Harvey-prospect law firm works with becomes a warm lead for Harvey's corporate legal motion. The relationship graph compounds in both directions: firms working with Harvey's existing corporate customers are themselves warm leads. Firmographic ABM gets replaced by relationship ABM.",
    ],
    acceptanceCriteria: [
      "For any law firm domain in our pipeline or customer base, run a single Firecrawl /agent call that returns every explicitly named client company.",
      "The agent prompt accounts for all three data surfaces (representative experience, client lists, attorney bios) so we do not miss the majority of value buried in attorney pages.",
      "Generic placeholders ('a leading technology company', 'a Fortune 500 financial services firm') are filtered out. Only return companies named directly.",
      "Each match includes context: which page it came from, which attorney mentioned it, what type of work was performed.",
      "Output is structured JSON written to Snowflake under firm_client_mapping with one row per (firm, client) pair.",
      "Cross-reference each extracted client against existing Salesforce accounts: tag matches as cross-sell signals (firm's client is already a Harvey customer) or prospecting signals (firm's client is in Harvey ICP but not yet a customer).",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Law Firm Domain Queue",
        detail:
          "Salesforce account list filtered to law firm domains. One firm per workflow execution. Workato recipe pulls the queue daily and fans out to the workflow runtime.",
        tools: ["salesforce", "workato"],
      },
      {
        layer: 2,
        name: "Scope — Sitemap Discovery for Candidate URLs",
        detail:
          "Optional sitemap.xml fetch to identify candidate pages: practice group landing pages, attorney bio pages, news/insights pages. Provides scope hints to /agent so it does not have to crawl blind. Falls back to root domain if no sitemap is exposed.",
        tools: ["firecrawl"],
      },
      {
        layer: 3,
        name: "Decide — Single Firecrawl /agent Call",
        detail:
          "Single call to Firecrawl /agent with the discovered URL set and a tightly scoped prompt: 'Find all explicitly named client companies on [firm domain]. Look in representative experience sections, client lists, attorney bios, and deal tombstones. Only return companies named directly, skip anything described generically like a leading technology company. Include the context of how they were mentioned.' /agent handles JS rendering, pagination, and rate limiting natively. Only the prompt is required; URLs are optional scope hints.",
        tools: ["firecrawl", "vercel-ai-sdk"],
      },
      {
        layer: 4,
        name: "Validate — Dedupe, ICP Tag, Cross-Reference",
        detail:
          "Each extracted company validated against a known company list. Deduped against existing Salesforce accounts. Tagged with source URL, attorney name, work type, and mention context. Cross-referenced against customer base to flag cross-sell signals (existing Harvey customer surfaced as firm's client) and prospecting signals (ICP fit, not yet customer). Residual generic descriptors filtered via deterministic regex on phrasing patterns.",
        tools: ["snowflake", "salesforce"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Snowflake Write, Slack Cross-Sell Signal",
        detail:
          "Structured client list written to Snowflake firm_client_mapping table for aggregation across the entire firm portfolio. AE who owns the law firm receives a Slack DM: 'Cool & Associates works with 47 named companies. 12 are Harvey ICP fit. 3 are existing Harvey customers — cross-sell opportunity.' High-confidence prospecting signals push to Salesforce as new account candidates with the source firm attached for context. Every extraction and tagging decision logs to Snowflake so AEs can audit how the graph was built.",
        tools: ["snowflake", "salesforce", "slack"],
      },
    ],
    stack: [
      "salesforce",
      "firecrawl",
      "vercel-ai-sdk",
      "vercel-workflows",
      "workato",
      "snowflake",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Validate the prompt against five known firms",
        tasks: [
          "Pick five law firms with publicly known client lists as the validation set. Two AmLaw 100, two mid-market, one boutique.",
          "Run /agent against each with the initial prompt. Score extraction quality manually against ground truth.",
          "Iterate the prompt until accuracy is above 90% on all three data surfaces (representative experience, client lists, attorney bios).",
          "Build the post-processing layer: dedupe, ICP scoring, cross-reference against Salesforce accounts.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Wire scheduled execution and Slack delivery",
        tasks: [
          "Wrap the /agent call + post-processing in a Vercel Workflows scheduled job that runs nightly across the firm pipeline.",
          "Build the Slack notification template with the cross-sell and prospecting signal counts per firm.",
          "Roll out to one AE pod as canary. Monitor false positive rate, AE engagement, and surfaced cross-sell signal volume for five business days.",
          "Document the runbook in Notion. Hand ongoing tuning to RevOps.",
        ],
      },
    ],
    risks: [
      {
        risk: "Some firm sites have anti-scraping protection or unusual structure that breaks the crawl.",
        likelihood: "Medium",
        mitigation:
          "Firecrawl handles JS rendering and rate limiting natively. If a specific firm blocks repeatedly, fall back to manual research and flag the firm to RevOps for an alternate approach.",
      },
      {
        risk: "Generic placeholders like 'a leading technology company' or 'a Fortune 500 client' pollute the dataset.",
        likelihood: "High",
        mitigation:
          "Explicit prompt instruction to skip generic descriptions. Plus a deterministic post-processing regex filter that pattern-matches generic phrasings and drops them before write.",
      },
      {
        risk: "An attorney mentions a client by name but the engagement was confidential or privileged.",
        likelihood: "Low",
        mitigation:
          "We only extract explicitly published information from public web pages. The data we surface is the same data a human researcher would find by reading attorney bios. No private API access, no scraping behind logins, no confidential sources.",
      },
      {
        risk: "Attorney bio pages are deeply nested across hundreds of URLs and slow to crawl per firm.",
        likelihood: "Medium",
        mitigation:
          "Pre-scope the URL set via sitemap fetch before /agent runs. Pass the scoped URLs as the optional URLs parameter so /agent does not crawl blind across the entire site.",
      },
    ],
    validation: [
      {
        metric: "Extraction accuracy on validation set",
        target: "≥90% of known clients found across the five validation firms",
        why: "Below this, the dataset is noise and AEs stop trusting the signals.",
      },
      {
        metric: "Average clients extracted per firm",
        target: "30+ clients per firm at AmLaw scale",
        why: "Coverage signal. If we are pulling 5 per firm we are missing the attorney bio surface entirely.",
      },
      {
        metric: "ICP match rate",
        target: "30% of extracted clients are Harvey ICP fits",
        why: "Tells us the dataset is generating real prospecting signal, not noise from random corporate mentions.",
      },
      {
        metric: "Cross-sell signal volume",
        target: "Tracked weekly per AE pod",
        why: "Cross-sell signals are the highest-value output. Each one is a warm path between an existing customer and a prospect.",
      },
      {
        metric: "AE action rate on signals",
        target: "60% of generated signals actioned within 5 business days",
        why: "Lagging indicator that the dataset is trustworthy and the framing is right.",
      },
    ],
    whyThisMatters:
      "James asked me how to structure this query in our LinkedIn DMs on April 10. This ticket is the structured answer, scoped against the actual constraint (client data lives in three places, not one), decomposed into shippable phases, and built on the exact tool he is currently piloting. It also unlocks an entire layer of GTM intelligence Harvey does not have today: a relationship graph between law firms and their corporate clients. That graph is rocket fuel for Harvey's corporate legal motion. Every Fortune 500 a customer firm works with becomes a warm lead. The same /agent pattern reuses for any structured extraction problem against the public web — that is the framework, not the one-off.",
  },

  {
    id: "GTM-003",
    title: "Segment-Specific Lead Routing",
    priority: "P1",
    effort: "4 weeks",
    sprint: "Month 2",
    status: "backlog",
    reporter: "Rob Saliterman, VP Sales",
    labels: ["lead-routing", "segmentation", "foundation"],
    oneLiner:
      "Auto-classify every inbound lead into the right segment within 5 minutes of arrival, route to the right rep pool, enroll in the right sequence.",
    topPerformerMove:
      "Your best AmLaw enterprise rep already knows when a lead is 'corporate legal, not law firm' within 30 seconds of opening it. He pattern-matches on title, firm name, jurisdiction, and prior context — the same four signals every time. The classifier encodes his 30-second decision and runs it on every lead within 5 minutes of arrival, with a written reasoning string so every rep downstream can trust it.",
    roiMath: {
      cost: "$25K eng + Claude API (~$1.2K/mo at current lead volume)",
      savings: "+10pt mid-funnel lift, prevents corporate→AmLaw routing waste that currently leaks deals",
      multiplier: "Foundational — every downstream workflow gets smarter once segmentation exists",
      payback: "60 days from production cutover",
    },
    background: [
      "Harvey now sells to four meaningfully distinct customer segments: AmLaw 100 firms, Fortune 100 corporate legal departments, mid-market firms, and international. Each has fundamentally different procurement, security review processes, sales cycle lengths, buyer personas, and success criteria. Selling to a Fortune 500 General Counsel is not the same job as selling to a managing partner at a global law firm.",
      "Current routing was built when Harvey only sold AmLaw. Every inbound lead enters one pool and gets handled by the next available rep. The result is mid-funnel waste: an AmLaw enterprise rep gets a corporate legal lead, struggles to handle the unfamiliar buyer, and the lead goes cold. The reverse happens too.",
      "This is the load-bearing system. Once leads are properly segmented at the front door, every downstream system gets smarter. Lead scoring becomes per-segment. Sequences become per-segment. Pre-call briefs become per-segment. Pipeline reporting becomes per-segment. The whole GTM motion gains a dimension it does not currently have.",
      "Winston said publicly on the Sequoia podcast that 'the machinery is still not there.' This is the part of the machinery that is most clearly missing.",
    ],
    acceptanceCriteria: [
      "Every inbound lead is auto-classified into one of four segments within 5 minutes of entering Marketo.",
      "Each classification includes a confidence score and a written reasoning string, both stored on the SFDC Lead record.",
      "Leads with confidence above 85% route automatically. Leads below 85% route to a human review queue.",
      "Each segment has its own rep pool, its own Marketo nurture sequence, and its own first-touch SLA.",
      "Reps can flag a misclassification with one click in Salesforce. Flags create a Linear issue tagged with the segment and reasoning, and feed back into prompt tuning.",
      "Misclassification rate stays below 5% in production after the first month.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Marketo / Qualified Form Webhook",
        detail:
          "When a lead fills a form on harvey.ai, schedules a demo via Qualified, or crosses an MQL threshold in Marketo, a webhook fires into a Vercel API route. Includes the lead's email, company, role, and any captured form fields.",
        tools: ["marketo", "qualified"],
      },
      {
        layer: 2,
        name: "Hydrate — Clay → Scalestack → ZoomInfo Waterfall",
        detail:
          "Run a waterfall enrichment: Clay first for fast firmographic data, then Scalestack for international firms (where it is strongest), then ZoomInfo as backup for contact-level detail. Capture firm size, jurisdiction, practice areas, technographic (M365 footprint matters for the Copilot integration), and the contact's exact role.",
        tools: ["clay", "scalestack", "zoominfo"],
      },
      {
        layer: 3,
        name: "Decide — Claude Classifies with Reasoning String",
        detail:
          "Vercel AI SDK calls Claude Sonnet via the AI Gateway. The model receives the enriched lead profile and is asked to classify into one of four segments with a confidence score and a written reasoning string. Tool calling lets the model fetch additional context (recent firm news, jurisdiction-specific signals) if needed before deciding.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude", "vercel-sandbox"],
      },
      {
        layer: 4,
        name: "Route — Per-Segment Rules, Confidence Gate",
        detail:
          "Apply per-segment routing rules. AmLaw 100 routes to former-BigLaw enterprise AE pool. Fortune 100 corporate legal routes to corporate sales specialist pool. Mid-market firms route to velocity reps. International routes to regional pool with jurisdiction match. Confidence below 85% routes to human review queue. Dedupe against existing accounts.",
        tools: ["workato", "salesforce"],
      },
      {
        layer: 5,
        name: "Deliver + Record — SFDC Update, Sequence Enrollment, Slack DM",
        detail:
          "Salesforce Lead record is updated with segment, confidence score, and reasoning. Marketo enrolls the lead into the segment-specific nurture sequence. The owning rep receives a Slack DM with the brief and the reasoning so they trust the classification. Every classification and misclassification flag streams to Snowflake for monthly retune.",
        tools: ["salesforce", "marketo", "slack", "snowflake"],
      },
    ],
    stack: [
      "marketo",
      "qualified",
      "clay",
      "scalestack",
      "zoominfo",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "vercel-sandbox",
      "workato",
      "salesforce",
      "snowflake",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Define segment criteria with sales leadership",
        tasks: [
          "Workshop with Rob, sales leadership, and the four segment owners to define exact criteria per segment.",
          "Document edge cases (corporate legal departments that are also law firms, regional offices of global firms, etc.).",
          "Lock the rubric. Get sign-off in writing.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Build the enrichment cascade and backtest",
        tasks: [
          "Build the waterfall enrichment workflow in Workato.",
          "Pull 200 historical leads with known segment outcomes from Salesforce.",
          "Run them through the enrichment cascade. Validate completeness.",
          "Identify any data gaps that would block classification.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Wire up Claude classification + validate against backtest",
        tasks: [
          "Build the Vercel AI SDK route with Claude classification.",
          "Run the classifier against the 200 historical leads.",
          "Compare to the known segment outcomes.",
          "Iterate on the prompt until accuracy is above 90% on the backtest.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Production rollout with human review fallback",
        tasks: [
          "Wire up routing rules in Workato + Salesforce flows.",
          "Build the human review queue for low-confidence leads.",
          "Set up the Slack notification flow.",
          "Roll out to production. Monitor misclassification rate daily for 5 business days.",
        ],
      },
    ],
    risks: [
      {
        risk: "Misclassification damages deal flow if a hot AmLaw lead gets routed to the wrong pool.",
        likelihood: "High",
        mitigation:
          "Confidence threshold at 85%. Anything below routes to human review. Reps can re-route in one click. The first month runs in shadow mode parallel to existing routing so we catch errors before they hit pipeline.",
      },
      {
        risk: "Edge cases cluster around corporate legal departments at firms that are also Harvey customers via their law firm.",
        likelihood: "Medium",
        mitigation:
          "Explicit edge case handling in the classifier prompt. If the model detects a potential dual-relationship account, it flags for human review regardless of confidence score.",
      },
      {
        risk: "Reps do not trust the classification because they cannot see why the model decided.",
        likelihood: "Medium",
        mitigation:
          "The reasoning string is always written to the Salesforce Lead record. Reps see exactly why the model classified the way it did, with the data points cited. Trust comes from transparency.",
      },
      {
        risk: "Enrichment data is missing for international firms in jurisdictions where Clay and ZoomInfo are weak.",
        likelihood: "Medium",
        mitigation:
          "Scalestack is in the cascade specifically for international coverage. If all three vendors fail to find data, the lead routes to the international human review queue with a note explaining why.",
      },
    ],
    validation: [
      {
        metric: "Classification accuracy on backtest",
        target: "≥90% agreement with known historical outcomes",
        why: "Floor for production rollout. Cannot launch below this.",
      },
      {
        metric: "Production misclassification rate",
        target: "<5% within 30 days of launch",
        why: "Real-world signal. If it drifts above, we retune the prompt and revalidate.",
      },
      {
        metric: "Time-to-first-touch by segment",
        target: "All four segments within their defined SLA",
        why: "Proves the routing rules and rep pools are working in concert.",
      },
      {
        metric: "Mid-funnel conversion lift",
        target: "+10pt lead-to-meeting rate vs. pre-launch baseline",
        why: "The reason this exists. If conversion does not move, the segmentation isn't worth it.",
      },
    ],
    whyThisMatters:
      "This is the load-bearing systems work. It is foundational because every other GTM workflow gets better when leads are properly segmented from the front door. Lead scoring, nurture sequences, pre-call briefs, pipeline reporting — all of them depend on knowing which segment a lead is in. Until this exists, every downstream system is doing best-effort guessing. Once this exists, the rest of the roadmap compounds.",
  },

  {
    id: "GTM-004",
    title: "Agent Builder Upsell Signal Detection",
    priority: "P1",
    effort: "3 weeks",
    sprint: "Month 3",
    status: "backlog",
    reporter: "John Haddock, Chief Business Officer",
    labels: ["product-led-growth", "expansion", "agent-builder"],
    oneLiner:
      "Daily detection of which existing customers are showing 'ready for Agent Builder' product signals. Routes value hypothesis to the AE.",
    topPerformerMove:
      "Your best CSM already knows which customers are Agent Builder ready. Once a week she opens the product analytics tab and scans for workflow count, multi-step complexity, and execution ceilings. Three signals, same order, every time. The agent runs her exact mental checklist daily across the full customer base and routes only the ones that match — plus a written value hypothesis naming the specific workflows that would convert.",
    roiMath: {
      cost: "$18K eng + Claude API (~$800/mo)",
      savings: "Operationalizes Agent Builder expansion motion — turns the biggest 2026 launch into a daily pipeline event",
      multiplier: "ARR-attributed; tracked with closed-won attribution monthly",
      payback: "First Agent Builder upsell sourced from a delivered signal",
    },
    background: [
      "Harvey launched Agent Builder in March 2026. It is the product the company is betting on for the next phase of expansion. The question for sales is no longer 'who should we tell about this' — it is 'which existing customers are sophisticated enough that they will actually adopt and expand?'",
      "Without signal detection, account executives are guessing. They are looking at the customers they already know well and missing the customers whose usage patterns are quietly screaming 'we are ready for Agent Builder.'",
      "The signals are in the product analytics. A customer with 10+ custom workflows in Assistant, multi-step flows hitting execution limits, and increasing weekly active users among their innovation team is the textbook profile. We have the data. We do not have the system that turns the data into a sales action.",
      "This is product-led growth signal detection applied to a top-down enterprise sales motion. The opportunity: turn Harvey's biggest 2026 product launch into a measurable pipeline event automatically, every day.",
    ],
    acceptanceCriteria: [
      "A scheduled job runs daily at 6am Pacific. Pulls the latest product analytics from Snowflake.",
      "Identifies customers showing the 'ready for Agent Builder' signal pattern (10+ workflows, multi-step, hitting Assistant ceiling, growing WAU).",
      "Generates a written value hypothesis per qualified customer: which specific workflows would convert, what business outcome the customer would gain, why this is the right time to have the conversation.",
      "Dedupes against existing open opportunities tagged with Agent Builder.",
      "Routes each signal to the account-owning AE via Salesforce task + Slack DM.",
      "AE marks each signal as 'actioned', 'not yet', or 'wrong fit'. Marks feed back into the signal detection prompt for monthly retuning.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Daily Product Analytics Pull",
        detail:
          "Fivetran replicates Harvey's product analytics database into Snowflake hourly. The Agent Builder signal job reads from a `product_usage` table that has workflow counts, execution metadata, and active user counts per customer per day.",
        tools: ["fivetran", "snowflake"],
      },
      {
        layer: 2,
        name: "Filter — Threshold Query for Candidate Customers",
        detail:
          "Snowflake query filters customers down to those meeting baseline criteria: 10+ custom workflows in Assistant in the last 30 days, at least one multi-step workflow, weekly active users among innovation team users trending up 20%+ over a rolling 4-week window. This shrinks the candidate set from thousands to dozens.",
        tools: ["snowflake"],
      },
      {
        layer: 3,
        name: "Decide — Claude Drafts the Value Hypothesis",
        detail:
          "For each candidate customer, Vercel AI SDK calls Claude Sonnet via the AI Gateway with the customer's specific usage profile and any open opportunities. The model returns a typed JSON object containing: a written value hypothesis, the three specific workflows that would benefit most from Agent Builder, the suggested first conversation framing, and a confidence score.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Score — Dedupe, Suppress, Route by Ownership",
        detail:
          "Apply a final scoring rubric. Filter out customers in active procurement, in renewal negotiation, or with an existing Agent Builder opportunity. Dedupe against signals sent in the last 14 days. Route each remaining signal to the account-owning AE based on Salesforce ownership.",
        tools: ["workato", "salesforce"],
      },
      {
        layer: 5,
        name: "Deliver + Record — SFDC Task, Catalyst Event, Slack DM",
        detail:
          "Create a Salesforce task on the account with the value hypothesis as the description. Log the same signal as a Catalyst customer engagement event so CS sees it too. Send the AE a Slack DM with the signal, the hypothesis, and a one-click 'mark actioned/not yet/wrong fit' button. Every feedback mark logs back to Snowflake for monthly prompt retune.",
        tools: ["salesforce", "catalyst", "slack", "snowflake"],
      },
    ],
    stack: [
      "fivetran",
      "snowflake",
      "workato",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "vercel-workflows",
      "salesforce",
      "catalyst",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Define signal criteria with CS + Product",
        tasks: [
          "Workshop with Customer Success and Product to define what 'ready for Agent Builder' actually looks like in the data.",
          "Identify 20 historical customers who upgraded to Agent Builder. Profile their pre-upgrade usage patterns.",
          "Lock the threshold filters and the rubric.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Build the value hypothesis generation layer",
        tasks: [
          "Build the Snowflake query that produces the candidate set.",
          "Build the Claude prompt that generates value hypotheses.",
          "Validate against the 20 historical upgrades — does the hypothesis match what actually happened in the conversation?",
          "Iterate until 80% of generated hypotheses match the actual upgrade story.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Production rollout via Vercel Workflows scheduled job",
        tasks: [
          "Wire up Vercel Workflows to run the job daily at 6am Pacific.",
          "Build the Slack delivery flow with the actioned/not yet/wrong fit feedback buttons.",
          "Wire the feedback loop back to Snowflake so we can monitor signal quality over time.",
          "Roll out. Monitor signal-to-action rate weekly.",
        ],
      },
    ],
    risks: [
      {
        risk: "Generated value hypotheses sound generic and AEs ignore them.",
        likelihood: "Medium",
        mitigation:
          "Include specific workflow names from the customer's actual usage in every hypothesis. The hypothesis must reference real product behavior, not abstractions. Validate against 20 historical upgrades before launch.",
      },
      {
        risk: "AEs ignore signals because the volume is too high.",
        likelihood: "Medium",
        mitigation:
          "Confidence threshold filters down to roughly 5-10 signals per AE per week. Quality over quantity. Better to miss a marginal signal than to spam an AE with low-confidence hypotheses.",
      },
      {
        risk: "Premature signals damage customer relationships if a customer is not ready.",
        likelihood: "Low",
        mitigation:
          "Filter out customers in active procurement or renewal negotiation. The signal is about timing, not just fit. Catalyst data tells us if the customer is in a sensitive moment.",
      },
      {
        risk: "Signal quality degrades as Agent Builder usage patterns evolve.",
        likelihood: "High",
        mitigation:
          "Monthly retune from the AE feedback loop. Every 'wrong fit' marking is data. The prompt and the threshold filters get retuned from real-world feedback.",
      },
    ],
    validation: [
      {
        metric: "Signals generated per week",
        target: "5-10 per AE",
        why: "High enough to drive action, low enough to maintain quality.",
      },
      {
        metric: "AE action rate",
        target: "60% within 5 business days of receipt",
        why: "Tells us AEs trust the signal enough to do something with it.",
      },
      {
        metric: "Signal-to-conversation rate",
        target: "30% of actioned signals lead to an upsell conversation",
        why: "Lagging indicator. Proves the value hypothesis is landing with customers.",
      },
      {
        metric: "Agent Builder ARR attributable to signal",
        target: "Tracked monthly with closed-won attribution",
        why: "The reason this exists. Direct revenue impact, measured.",
      },
    ],
    whyThisMatters:
      "This ticket operationalizes Harvey's biggest 2026 product launch. Without it, Agent Builder adoption is happening through ad-hoc conversations and AE intuition. With it, every day we are surfacing the customers most likely to expand and giving the AE a written reason why. It is the simplest and most measurable form of product-led growth applied to an enterprise sales motion. And it sets the pattern for how every future Harvey product launch becomes a pipeline event automatically.",
  },
];

export function getTicket(id: string): Ticket | undefined {
  return TICKETS.find((t) => t.id.toLowerCase() === id.toLowerCase());
}

export function getAllTickets(): Ticket[] {
  return TICKETS;
}
