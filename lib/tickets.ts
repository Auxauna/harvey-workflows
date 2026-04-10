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
        name: "Input — Calendar Trigger",
        detail:
          "A Workato recipe polls Salesforce activities every 5 minutes. When a new external meeting is created or updated within the next 24 hours, it fires a downstream workflow with the meeting metadata.",
        tools: ["salesforce", "workato"],
      },
      {
        layer: 2,
        name: "Deterministic Pre-Processing — Multi-Source Pull",
        detail:
          "Workato pulls account history from SFDC, last-three-call summaries from Gong, firmographic data via ZoomInfo and Clay (waterfall enrichment), recent LinkedIn activity for the contacts, and any open opportunities. Filters by meeting type (discovery vs expansion vs renewal vs check-in) to scope what gets pulled.",
        tools: ["salesforce", "gong", "zoominfo", "clay", "linkedin", "workato"],
      },
      {
        layer: 3,
        name: "AI Synthesis — One-Page Brief",
        detail:
          "Vercel AI SDK calls Claude Sonnet via the AI Gateway with a structured prompt + the source data. Returns a typed JSON object with the brief sections. Tool-calling is used to fetch additional context only if the model needs it (e.g., 'find more recent news about this firm').",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Deterministic Post-Processing — Validate and Format",
        detail:
          "TypeScript validation layer checks the JSON against a Zod schema, ensures every claim has a citation, deduplicates against the last brief sent for the same meeting, and renders into both a Markdown email body and a Slack Block Kit message.",
        tools: ["vercel-ai-sdk"],
      },
      {
        layer: 5,
        name: "Delivery — In Existing Surfaces",
        detail:
          "Email goes via Marketo transactional API. Slack DM goes via Slack Workflow. Both fire 30 minutes before meeting start. Rep sees the brief in surfaces they already use. No new tool, no login, no app to install.",
        tools: ["marketo", "slack"],
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
    title: "Enrichment Vendor Consolidation Audit",
    priority: "P2",
    effort: "3 weeks",
    sprint: "Month 1",
    status: "ready",
    reporter: "James Hunsberger, Head of GTM Technology",
    labels: ["audit", "cost-savings", "BA-fundamentals"],
    oneLiner:
      "Audit Clay, Scalestack, and ZoomInfo for overlap and ROI. Recommend consolidation with a documented migration plan.",
    background: [
      "Harvey runs three enrichment vendors concurrently: Clay, Scalestack, and ZoomInfo. Combined annual spend is likely in the $200K to $400K range, depending on contract terms. None of these vendors have been audited for overlap since they were brought in during hypergrowth.",
      "This is exactly the work the GTM Business Analyst job description calls out: 'deep research into verifying the tools we have adopted are driving ROI.' Most candidates for this role would build new automations on top of these tools. This ticket goes the other direction. Audit first. Build second.",
      "There is a real chance that each vendor was the right call when it landed and that all three should stay, scoped to specific motions. There is also a real chance that one or two are being paid for and not driving incremental value. The audit will tell us. Either way, the documentation of overlap and quality becomes a permanent reference for future tooling decisions.",
      "This is the unsexy work that builds credibility. It proves I will do the BA fundamentals before the AI building.",
    ],
    acceptanceCriteria: [
      "Documented overlap matrix showing which fields each vendor provides for each of the four customer segments (AmLaw 100, Fortune 100 corporate, mid-market firms, international).",
      "Quality comparison per data type per segment, scored against a defined rubric. Includes accuracy, completeness, and freshness.",
      "Cost-per-enriched-record calculation per vendor.",
      "A clear written recommendation: keep all three, consolidate to two, or consolidate to one. The recommendation must be defensible with data, not opinion.",
      "If consolidation is recommended, a written migration plan with: which downstream workflows are affected, what data backfill is required, and what the cutover sequence looks like.",
      "The full audit lives in Notion as a permanent reference doc.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Input — Stratified Sample of 1,000 Accounts",
        detail:
          "Pull a stratified sample of 1,000 Salesforce accounts: 250 from each of the four segments (AmLaw 100, Fortune 100 corporate, mid-market firms, international). Sampling stratified across deal stage and geography to avoid bias.",
        tools: ["salesforce"],
      },
      {
        layer: 2,
        name: "Deterministic Enrichment — Run Every Account Through Each Vendor",
        detail:
          "For each account, call Clay, Scalestack, and ZoomInfo in parallel. Capture the full field response from each vendor verbatim, with a timestamp. Snapshot all three response sets to Snowflake under a `vendor_audit` schema.",
        tools: ["clay", "scalestack", "zoominfo", "snowflake"],
      },
      {
        layer: 3,
        name: "AI Quality Scoring — Field-by-Field Comparison",
        detail:
          "For each field (firm size, jurisdiction, practice areas, technographic, contact roles, etc.), run a Claude Sonnet judge prompt via the AI Gateway. The prompt compares the three vendor responses against ground-truth signals (firm website, public filings, press) and scores each on accuracy, completeness, and freshness.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Deterministic Aggregation — Quality Matrix",
        detail:
          "Aggregate the field-level scores into a per-vendor, per-segment quality matrix. Calculate cost-per-accurate-record for each vendor at the segment level. Identify fields where each vendor wins and fields where they overlap.",
        tools: ["snowflake"],
      },
      {
        layer: 5,
        name: "Delivery — Notion Audit Document",
        detail:
          "Render the matrix, the recommendation, the migration plan, and a one-page executive summary as a Notion document. Share with James, Rob Saliterman, and the RevOps lead. Schedule a 30-minute walkthrough.",
        tools: ["notion"],
      },
    ],
    stack: [
      "salesforce",
      "clay",
      "scalestack",
      "zoominfo",
      "snowflake",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "notion",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Define and run the sample",
        tasks: [
          "Meet with RevOps and Marketing Ops to align on which fields matter most per segment.",
          "Pull the stratified 1,000-account sample from Salesforce.",
          "Build the parallel enrichment runner that hits all three vendors.",
          "Land the raw responses in Snowflake under `vendor_audit`.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Build the quality scoring layer",
        tasks: [
          "Define the per-field quality rubric (accuracy, completeness, freshness, defensibility).",
          "Build the Claude judge prompt and validate it against 50 manually-scored records as ground truth.",
          "Run the scoring across all 1,000 sample accounts × 3 vendors × 12 fields.",
          "Aggregate into the quality matrix.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Generate audit + recommendation + migration plan",
        tasks: [
          "Write the recommendation (keep all / consolidate to two / consolidate to one) with the data behind it.",
          "Draft the migration plan if consolidation is recommended, including downstream workflow impact analysis.",
          "Render the audit as a Notion document.",
          "Walk James, Rob, and RevOps through it. Decide.",
        ],
      },
    ],
    risks: [
      {
        risk: "One vendor is meaningfully better on a specific segment we did not stratify properly.",
        likelihood: "Medium",
        mitigation:
          "Stratify the sample by segment from the start. Score quality at the segment level, not the aggregate level. Recommendations are scoped per segment.",
      },
      {
        risk: "Killing a vendor breaks downstream automations that nobody documented.",
        likelihood: "High",
        mitigation:
          "Before recommending any consolidation, run an audit of all Workato recipes, Marketo programs, and SFDC flows that consume each vendor's data. The migration plan must account for every consumer.",
      },
      {
        risk: "The Claude quality judge is biased toward one vendor's data style.",
        likelihood: "Medium",
        mitigation:
          "Validate the judge against 50 manually-scored records before running at scale. If judge accuracy is below 90% on the validation set, adjust the prompt or fall back to manual scoring.",
      },
      {
        risk: "Recommendation is politically uncomfortable because someone champions one of the vendors.",
        likelihood: "Medium",
        mitigation:
          "Ground every recommendation in the data. Walk the affected stakeholder through the matrix before publishing the audit. Decisions are easier when the data is shared first.",
      },
    ],
    validation: [
      {
        metric: "Audit completeness",
        target: "100% of fields scored across all three vendors and four segments",
        why: "Partial data means partial decisions.",
      },
      {
        metric: "Judge accuracy on validation set",
        target: "90% agreement with manual scoring",
        why: "Tells us the AI scoring layer is trustworthy at scale.",
      },
      {
        metric: "Cost savings projection",
        target: "Defensible $ figure if consolidation is recommended",
        why: "Audit is only worth doing if the savings are real.",
      },
      {
        metric: "Stakeholder sign-off",
        target: "James, Rob, and RevOps lead all agree with recommendation",
        why: "A recommendation with no buy-in is a slide deck.",
      },
    ],
    whyThisMatters:
      "This ticket is on the board because James told me directly that the panel needs to see core BA fundamentals before they trust me with the AI building work. This is that ticket. It is unsexy. It is project management, ticket discipline, and follow-through on delivery. It is also probably worth $100K to $300K per year in vendor cost reduction depending on what the data shows. Both can be true. Doing the audit IS the AI building work — it just looks like spreadsheets first.",
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
        name: "Input — Marketo Form Fill or MQL Trigger",
        detail:
          "When a lead fills a form on harvey.ai, schedules a demo via Qualified, or crosses an MQL threshold in Marketo, a webhook fires into a Vercel API route. Includes the lead's email, company, role, and any captured form fields.",
        tools: ["marketo", "qualified"],
      },
      {
        layer: 2,
        name: "Deterministic Enrichment Cascade",
        detail:
          "Run a waterfall enrichment: Clay first for fast firmographic data, then Scalestack for international firms (where it is strongest), then ZoomInfo as backup for contact-level detail. Capture firm size, jurisdiction, practice areas, technographic (M365 footprint matters for the Copilot integration), and the contact's exact role.",
        tools: ["clay", "scalestack", "zoominfo"],
      },
      {
        layer: 3,
        name: "AI Classification — Claude with Tool Calling",
        detail:
          "Vercel AI SDK calls Claude Sonnet via the AI Gateway. The model receives the enriched lead profile and is asked to classify into one of four segments with a confidence score and a written reasoning string. Tool calling lets the model fetch additional context (recent firm news, jurisdiction-specific signals) if needed before deciding.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude", "vercel-sandbox"],
      },
      {
        layer: 4,
        name: "Deterministic Routing Rules",
        detail:
          "Apply per-segment routing rules. AmLaw 100 routes to former-BigLaw enterprise AE pool. Fortune 100 corporate legal routes to corporate sales specialist pool. Mid-market firms route to velocity reps. International routes to regional pool with jurisdiction match. Confidence below 85% routes to human review queue. Dedupe against existing accounts.",
        tools: ["workato", "salesforce"],
      },
      {
        layer: 5,
        name: "Delivery — SFDC Update + Sequence Enrollment + Slack Notification",
        detail:
          "Salesforce Lead record is updated with segment, confidence score, and reasoning. Marketo enrolls the lead into the segment-specific nurture sequence. The owning rep receives a Slack DM with the brief and the reasoning so they trust the classification.",
        tools: ["salesforce", "marketo", "slack"],
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
        name: "Input — Daily Product Analytics Sync",
        detail:
          "Fivetran replicates Harvey's product analytics database into Snowflake hourly. The Agent Builder signal job reads from a `product_usage` table that has workflow counts, execution metadata, and active user counts per customer per day.",
        tools: ["fivetran", "snowflake"],
      },
      {
        layer: 2,
        name: "Deterministic Threshold Filters",
        detail:
          "Snowflake query filters customers down to those meeting baseline criteria: 10+ custom workflows in Assistant in the last 30 days, at least one multi-step workflow, weekly active users among innovation team users trending up 20%+ over a rolling 4-week window. This shrinks the candidate set from thousands to dozens.",
        tools: ["snowflake"],
      },
      {
        layer: 3,
        name: "AI Value Hypothesis Generation",
        detail:
          "For each candidate customer, Vercel AI SDK calls Claude Sonnet via the AI Gateway with the customer's specific usage profile and any open opportunities. The model returns a typed JSON object containing: a written value hypothesis, the three specific workflows that would benefit most from Agent Builder, the suggested first conversation framing, and a confidence score.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Deterministic Scoring + Deduplication + Routing",
        detail:
          "Apply a final scoring rubric. Filter out customers in active procurement, in renewal negotiation, or with an existing Agent Builder opportunity. Dedupe against signals sent in the last 14 days. Route each remaining signal to the account-owning AE based on Salesforce ownership.",
        tools: ["workato", "salesforce"],
      },
      {
        layer: 5,
        name: "Delivery — Salesforce Task + Catalyst Signal + Slack DM",
        detail:
          "Create a Salesforce task on the account with the value hypothesis as the description. Log the same signal as a Catalyst customer engagement event so CS sees it too. Send the AE a Slack DM with the signal, the hypothesis, and a one-click 'mark actioned/not yet/wrong fit' button.",
        tools: ["salesforce", "catalyst", "slack"],
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
