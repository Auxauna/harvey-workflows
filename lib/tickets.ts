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
      "The best AE already builds her own pre-call brief by hand. Five tabs: Salesforce, Gong, ZoomInfo, Clay, last quarter's deal review notes. Fifteen to twenty minutes of synthesis before every meeting. The agent shadows her exact process — same sources, same priorities, same talking-point hierarchy — and ships the brief to her inbox before she'd have opened the first tab.",
    roiMath: {
      cost: "$15K eng + ~$2K/mo Claude API + ~$200/mo Resend",
      savings: "~$600K/yr in recovered rep prep time across ~40 sellers, plus a quality floor on every brief",
      multiplier: "~15x first-year return, defensible without inflation",
      payback: "Week 2 after canary pod ships",
    },
    background: [
      "Sellers spend 15-20 minutes researching accounts before every external meeting. Pulling from Salesforce for account history, Gong for last-call notes, and Clay + ZoomInfo for firmographic and contact detail. The data already exists. The work of assembling it is the bottleneck.",
      "Rough math: ~40 customer-facing sellers × ~6 external meetings per week × ~20 min prep per meeting × 50 weeks ≈ 4,000 hours per year. Loaded at a conservative $150/hr, that is ~$600K in rep time spent assembling information that already lives in our systems. The time is real; the 200x multipliers in the pitch deck are not.",
      "The pain is worse at Harvey specifically because much of the sales team is former BigLaw attorneys, not SaaS-native sellers. They are exceptional in the room. They are not exceptional at clicking through five tools to assemble a pre-call view. The job of GTM Technology is to make the assembly invisible.",
      "This is the lowest-friction, highest-visibility win for the function. It earns trust with the rep population in week three so the harder systems work has air cover.",
    ],
    acceptanceCriteria: [
      "A one-page brief auto-generates 30 minutes before every external meeting on a sales rep's calendar.",
      "The brief is delivered to the rep via Resend transactional email AND a Slack DM through Vercel Chat SDK. The rep does not have to open a new tool.",
      "The brief includes: meeting attendees with role and tenure, last three Gong call summaries with key objections raised, recent firm news from the past 14 days, the AE's open opportunities at the account, and three suggested talking points scoped to the meeting type.",
      "Every claim in the brief has an inline source citation (Salesforce, Gong, ZoomInfo, Clay). Pass^k=1 on citation coverage across the 50-task golden set — no uncited claims ever ship.",
      "The rep can mark the brief 👍 or 👎 with one click. Ratings log to Snowflake for prompt retuning.",
      "If a brief cannot be generated (data missing, edge case), the system fails silently and logs to Linear for triage. Half-built briefs never ship.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Salesforce Platform Event Subscription",
        detail:
          "A Workato recipe subscribes to Salesforce Platform Events on Activity. When a new external meeting is created or updated within the next 24 hours, the recipe fires immediately and passes meeting metadata downstream. No polling tax, no 5-minute jitter on the 30-minute SLA.",
        tools: ["salesforce", "workato"],
      },
      {
        layer: 2,
        name: "Hydrate — Pull Gong, ZoomInfo, Clay in Parallel",
        detail:
          "Workato pulls account history from SFDC, last-three-call summaries from Gong, and firmographic + contact detail via a ZoomInfo → Clay waterfall (Clay also surfaces LinkedIn-derived signal like recent posts and job changes, which we pick up through Clay rather than direct LinkedIn API since Sales Navigator API is closed to new partners). Filters by meeting type (discovery / expansion / renewal / check-in) to scope what gets pulled.",
        tools: ["salesforce", "gong", "zoominfo", "clay", "workato"],
      },
      {
        layer: 3,
        name: "Decide — Claude Synthesizes the One-Pager",
        detail:
          "Vercel AI SDK v6 calls Claude Sonnet via the AI Gateway with a structured prompt and the source data. Returns a typed object validated against a Zod schema. Tool-calling fetches additional context only when needed (e.g., 'find more recent news about this firm').",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Validate — Schema, Citation Audit, Dedupe",
        detail:
          "TypeScript validation layer checks the output against the Zod schema, ensures every claim has a citation back to a source row, deduplicates against the last brief sent for the same meeting, and renders into both a React Email template (for Resend) and a Slack Block Kit message (for Vercel Chat SDK).",
        tools: ["vercel-ai-sdk"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Resend Email, Slack DM, Snowflake Log",
        detail:
          "Email ships via Resend transactional API (Vercel-native SDK, React Email templates). Slack DM ships via Vercel Chat SDK. Both fire 30 minutes before meeting start so the rep sees the brief in surfaces they already use. Every generation — inputs, model reasoning, delivery receipts, 👍/👎 — streams to Snowflake as the canonical audit trail and prompt-retune source.",
        tools: ["resend", "slack", "vercel-chat-sdk", "snowflake"],
      },
    ],
    stack: [
      "salesforce",
      "gong",
      "zoominfo",
      "clay",
      "workato",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "snowflake",
      "resend",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Gold set and data pull",
        tasks: [
          "Shadow three top AEs for half a day. Watch them build briefs by hand. Time each step.",
          "Collect 50 hand-written briefs from the top three AEs. This is the golden set — the eval target.",
          "Define the Zod schema for a brief (sections, fields, citation format).",
          "Build the Workato recipe subscribing to SFDC Platform Events. Wire up parallel fetchers for Gong, ZoomInfo, and Clay against five sample meetings. Validate end-to-end data flow before AI is in the loop.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "AI synthesis with pass^k=1 citation coverage",
        tasks: [
          "Build the AI SDK route that calls Claude Sonnet via AI Gateway.",
          "Iterate on the system prompt until pass^k=1 on citation coverage across the 50-task golden set (every claim traceable to a source row).",
          "Grader agreement >80% on brief quality vs the top-AE hand-written versions.",
          "Lock the brief template. Ship React Email template for Resend and Block Kit message for Vercel Chat SDK.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Canary pod rollout",
        tasks: [
          "Deploy to one of Rob's enterprise pods as the canary group.",
          "Run in shadow mode for 48 hours (generate but don't send). Manual review on every brief.",
          "Flip to live delivery. Monitor generation rate, open rate, and 👍/👎 feedback for 5 business days. Triage failures via Linear.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Full rollout",
        tasks: [
          "Address canary feedback. Roll out to the rest of the team.",
          "Document the runbook in Notion. Hand recipe ownership to RevOps for ongoing tuning.",
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
        metric: "Citation coverage on golden set",
        target: "pass^k=1 — every claim traceable",
        why: "Zero-tolerance floor. A brief with one uncited claim is a brief a rep can't trust, and trust is the product.",
      },
      {
        metric: "Brief generation rate",
        target: "≥95% of qualifying meetings",
        why: "Coverage floor. Miss 1 in 20 and reps stop trusting the surface.",
      },
      {
        metric: "👍 satisfaction rate",
        target: "≥70% of rated briefs",
        why: "Quality signal from the people using it. Below 70% means the prompt or data needs work.",
      },
      {
        metric: "Self-reported time saved per meeting",
        target: "10–15 minutes average",
        why: "The number the ROI math depends on. Self-reported is enough — we're not optimizing it, we're verifying it exists.",
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
    reporter: "GTM Technology",
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
      "Operating question that surfaced in sync: how do we structure a Firecrawl /agent query to extract every named client company from a law firm's public website at scale? This ticket is the structured answer.",
      "The hard part is not the crawl. It's that law firm websites do not have SaaS-style logo walls. Client data is scattered across three different surfaces, and a naive crawl misses the majority of the value:",
      "1. Representative Experience sections under each practice group. Cleanest source — direct, attributed, contextual.",
      "2. Client lists. Rare. Mostly boutiques. Easy when present, absent at most major firms.",
      "3. Buried in individual attorney bios where partners name-drop specific deals and clients. This is where the actual gold is. Most extraction tools miss it because attorney bios are deeply nested and the named-client mentions are inline prose, not structured data.",
      "Once extracted at scale, this dataset is rocket fuel for Harvey GTM. Every Fortune 500 corporate that a Harvey-prospect law firm works with becomes a warm lead for Harvey's corporate legal motion. The relationship graph compounds in both directions: firms working with Harvey's existing corporate customers are themselves warm leads. Firmographic ABM gets replaced by relationship ABM.",
    ],
    acceptanceCriteria: [
      "For any law firm domain in our pipeline or customer base, a single Firecrawl /agent call returns every explicitly named client company.",
      "The agent prompt accounts for all three data surfaces (representative experience, client lists, attorney bios) so we do not miss the majority of value buried in attorney pages.",
      "Generic placeholders ('a leading technology company', 'a Fortune 500 financial services firm') are filtered out. Only companies named directly are returned.",
      "Each match includes context: which page it came from, which attorney mentioned it, what type of work was performed.",
      "Entity resolution runs every extraction through Clay's company-match before any Snowflake write — 'Morgan Stanley' vs 'Morgan Stanley & Co.' vs 'MS Wealth Management' collapse to one canonical account.",
      "Extraction precision ≥90% on the 15-firm gold set (see Phase 0) before production writes to Snowflake are enabled.",
      "Cross-referenced against existing Salesforce accounts: tagged as cross-sell signal (firm's client is already a Harvey customer) or prospecting signal (firm's client is in Harvey ICP but not yet a customer).",
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
          "One call to Firecrawl /agent (the natural-language agent endpoint launched February 2026) with the discovered URL set and a tightly scoped prompt: 'Find all explicitly named client companies on [firm domain]. Look in representative experience sections, client lists, attorney bios, and deal tombstones. Only return companies named directly, skip generic descriptions like a leading technology company. Include the context of how they were mentioned.' /agent handles JS rendering, pagination, and rate limiting natively via its Spark 1 models. Only the prompt is required; URLs are optional scope hints.",
        tools: ["firecrawl", "vercel-ai-sdk"],
      },
      {
        layer: 4,
        name: "Validate — Entity Resolution, Dedupe, Cross-Reference",
        detail:
          "Each extracted company runs through Clay's company-match for entity resolution — 'Morgan Stanley,' 'Morgan Stanley & Co.,' and 'MS Wealth Management' collapse to one canonical account. Then deduped against existing Salesforce accounts, tagged with source URL, attorney name, work type, and mention context. Cross-referenced against the customer base to flag cross-sell signals (existing Harvey customer surfaced as firm's client) or prospecting signals (ICP fit, not yet customer). Residual generic descriptors filtered via a deterministic regex on phrasing patterns.",
        tools: ["clay", "snowflake", "salesforce"],
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
      "clay",
      "vercel-ai-sdk",
      "vercel-workflows",
      "workato",
      "snowflake",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 0,
        weekRange: "Week 0",
        title: "Build the gold set (manual)",
        tasks: [
          "Pick 15 law firms as the eval set: 10 AmLaw 100, 3 international (Magic Circle / EU), 2 boutique.",
          "Hand-build the canonical firm→client mapping for each. This is the extraction oracle — everything downstream measures against this.",
          "Label each mention with its source surface (representative experience / client list / attorney bio) so we can measure surface-level precision separately.",
          "Stash the gold set in Snowflake `gtm_tech_evals.firm_client_gold` with a schema that mirrors the production `firm_client_mapping` table.",
        ],
      },
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Extraction prompt + post-processing",
        tasks: [
          "Run /agent against the 15 gold-set firms. Score each extraction against the oracle.",
          "Iterate the prompt until precision ≥90% across all three data surfaces and recall ≥80% on attorney-bio mentions (the hardest surface).",
          "Wire entity resolution through Clay's company-match. Wire cross-reference against Salesforce accounts.",
          "Write the failing-gracefully path: if /agent returns fewer than 5 matches on an AmLaw 100 firm, flag for human review rather than writing empty results.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Scheduled execution and Slack delivery",
        tasks: [
          "Wrap the /agent call + post-processing in a Vercel Workflows scheduled job that runs nightly across the firm pipeline.",
          "Build the Slack notification via Vercel Chat SDK with cross-sell and prospecting signal counts per firm.",
          "Shadow mode for 48 hours (generate but don't write to production tables). Manual review on every output.",
          "Flip to live writes. Roll out to one AE pod as canary. Monitor false positive rate, AE engagement, and surfaced cross-sell volume for five business days. Document the runbook in Notion.",
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
      {
        risk: "Firecrawl /agent bills on failure and has no published max-pages-per-call, so a runaway extraction can burn credits without returning usable output.",
        likelihood: "Medium",
        mitigation:
          "Credit budget cap enforced per-firm via Vercel Workflows step-level timeout and a pre-call credit reservation check. Any extraction that exceeds the cap or times out fails loud, logs the spend, and flags the firm for manual review rather than silently retrying.",
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
      "This ticket is the structured answer to a real operating question for the corporate legal motion: how do we extract every named client company from a law firm's public website at scale? Scoped against the actual constraint (client data lives in three places, not one), decomposed into shippable phases, and built on Firecrawl /agent — the tool already in pilot. It unlocks an entire layer of GTM intelligence Harvey does not have today: a relationship graph between law firms and their corporate clients. That graph is rocket fuel for Harvey's corporate legal motion. Every Fortune 500 a customer firm works with becomes a warm lead. The same /agent pattern reuses for any structured extraction problem against the public web — that is the framework, not the one-off.",
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
      "Auto-classify every inbound lead into the right Harvey segment within 5 minutes of arrival, route to the right rep pool, enroll in the right sequence.",
    topPerformerMove:
      "The best AmLaw enterprise rep knows when a lead is 'corporate legal, not law firm' within 30 seconds of opening it. He pattern-matches on title, firm domain, jurisdiction, and prior context — the same four signals every time. The classifier encodes his 30-second decision and runs it on every lead within 5 minutes of arrival, with a written reasoning string so every rep downstream can trust it.",
    roiMath: {
      cost: "$25K eng + ~$1.2K/mo Claude API at current lead volume",
      savings: "Prevents corporate→AmLaw and international→US misroute waste that currently stalls deals mid-funnel",
      multiplier: "Foundational — every downstream workflow gets smarter once segmentation exists",
      payback: "60 days from production cutover",
    },
    background: [
      "Harvey sells to four publicly distinct customer segments: AmLaw 100 law firms, international law firms (Magic Circle, EU, APAC, LatAm), Fortune 500 corporate legal departments, and asset managers (PE, hedge funds, family offices — 50+ already on the platform). Each has fundamentally different procurement, security review processes, sales cycle lengths, buying committees, and success criteria. Selling to a Bridgewater GC is not the same job as selling to a Magic Circle managing partner.",
      "Current routing was built when Harvey only sold AmLaw. Every inbound lead enters one pool and gets handled by the next available rep. The result is mid-funnel waste: an AmLaw enterprise rep gets a corporate legal lead, struggles with an unfamiliar buyer, and the lead goes cold. The reverse happens too. An asset manager lead lands with a Magic Circle international rep who is optimizing for a totally different buying committee.",
      "This is the load-bearing system. Once leads are properly segmented at the front door, every downstream system gets smarter. Lead scoring becomes per-segment. Sequences become per-segment. Pre-call briefs become per-segment. Pipeline reporting becomes per-segment. The whole GTM motion gains a dimension it does not currently have.",
      "Winston has said publicly that 'the machinery is still not there.' This is the part of the machinery that is most clearly missing.",
    ],
    acceptanceCriteria: [
      "Every inbound lead is auto-classified into one of four segments (AmLaw 100 / International law / Corporate legal / Asset manager) within 5 minutes of entering Marketo.",
      "Each classification includes a confidence score and a written reasoning string, both stored on the SFDC Lead record.",
      "Leads with confidence above 85% route automatically. Leads below 85% route to a human review queue.",
      "Each segment has its own rep pool, its own Marketo nurture sequence, and its own first-touch SLA.",
      "Reps can flag a misclassification with one click in Salesforce. Flags create a Linear issue tagged with the segment and reasoning, and feed back into the prompt-retune job.",
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
        name: "Hydrate — ZoomInfo Primary, Clay on Miss",
        detail:
          "ZoomInfo's Enrich API is the primary firmographic and contact source. On miss (international firms where ZoomInfo is weak, newer AmLaw corporate clients), fall back to Clay's waterfall enrichment which layers 50+ providers natively. One primary, one fallback — no three-vendor kitchen sink. Capture firm size, jurisdiction, practice areas, technographic (M365 footprint matters for the Copilot integration), and the contact's exact role.",
        tools: ["zoominfo", "clay"],
      },
      {
        layer: 3,
        name: "Decide — Claude Classifies with Reasoning String",
        detail:
          "Vercel AI SDK v6 calls Claude Sonnet via the AI Gateway. The model receives the enriched lead profile and classifies into one of four segments with a confidence score and a written reasoning string the rep will actually read. Tool calling fetches additional context (recent firm news, jurisdiction-specific signals) only when the base inputs are insufficient.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Route — Per-Segment Rules, Confidence Gate",
        detail:
          "Apply per-segment routing rules. AmLaw 100 routes to former-BigLaw enterprise AE pool. Corporate legal routes to the corporate sales specialist pool. International routes to the regional pool with jurisdiction match. Asset managers route to the asset manager specialist pool (PE / hedge fund / family office buyers). Confidence below 85% routes to human review queue. Dedupe against existing accounts.",
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
      "zoominfo",
      "clay",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "workato",
      "salesforce",
      "snowflake",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Define segment criteria with sales leadership",
        tasks: [
          "Workshop with Rob and the four segment owners to define exact criteria per segment. Lock edge cases (corporate legal departments that also operate in-house law firms, regional offices of global firms, asset managers that also have a law firm arm).",
          "Pull 500 historical leads from Salesforce with known segment outcomes. This is the backtest set.",
          "Lock the rubric. Get sign-off in writing.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Build the ZoomInfo → Clay enrichment path",
        tasks: [
          "Build the ZoomInfo primary + Clay fallback enrichment in Workato. Explicit stop-on-hit rule so we never pay both vendors for the same lead.",
          "Run all 500 historical leads through the enrichment path. Validate completeness (≥95% of leads get enough data to classify).",
          "Identify any data gaps that would block classification and route those to human review explicitly.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Claude classification + confusion matrix backtest",
        tasks: [
          "Build the AI SDK route with Claude classification.",
          "Run the classifier against the 500-lead backtest set. Build the confusion matrix.",
          "Target ≥85% precision on AmLaw 100 and corporate legal (the high-value classes), ≥80% on asset managers and international.",
          "Iterate the prompt until the matrix hits targets. Every misclassification is a training example for the retune job.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Shadow mode → canary → production",
        tasks: [
          "Wire routing rules in Workato + Salesforce flows. Build the human review queue for low-confidence leads.",
          "Run in shadow mode for 5 business days (classify but don't route). Daily confusion matrix review with Rob.",
          "Flip to canary pod. Monitor misclassification rate daily. Full rollout once the first week holds below 5%.",
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
        risk: "Enrichment data is missing for international firms where ZoomInfo and Clay are both weak (APAC and LatAm regional firms, smaller EU boutiques).",
        likelihood: "Medium",
        mitigation:
          "If both the primary and fallback vendor miss, the lead routes to the international human review queue with a note explaining the data gap. Scalestack stays on the bench as a third fallback if the gap becomes systemic, but we don't pay for all three by default.",
      },
    ],
    validation: [
      {
        metric: "Confusion matrix precision on 500-lead backtest",
        target: "≥85% on AmLaw 100 and corporate legal, ≥80% on asset managers and international",
        why: "Hard floor for production. The high-value classes must be strong before we trust the router with real pipeline.",
      },
      {
        metric: "Production misclassification rate",
        target: "<5% within 30 days of launch",
        why: "Real-world signal. Drift above this triggers a prompt retune from the misclassification log.",
      },
      {
        metric: "Time-to-first-touch by segment",
        target: "All four segments within their defined SLA",
        why: "Proves the routing rules and rep pools are working in concert with the classifier.",
      },
      {
        metric: "Mid-funnel conversion lift",
        target: "+5pt to +10pt lead-to-meeting rate vs. pre-launch baseline",
        why: "The reason this exists. If conversion doesn't move, segmentation isn't worth it and we should ask why.",
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
      "The best CSM already knows which customers are Agent Builder ready. Once a week she opens the product analytics tab and scans for three signals in the same order: (1) custom workflow count in Assistant crossing a threshold, (2) multi-step flows hitting the execution ceiling, (3) weekly active users on the customer's innovation team trending up. The agent runs her exact mental checklist daily across the full customer base and routes only the matches — plus a written value hypothesis naming the specific workflows that would convert.",
    roiMath: {
      cost: "~$18K eng + ~$800/mo Claude API",
      savings: "Operationalizes Agent Builder expansion — turns the March 9, 2026 launch into a daily pipeline event rather than a one-time announcement",
      multiplier: "ARR-attributed, tracked with closed-won attribution monthly",
      payback: "First Agent Builder upsell sourced from a delivered signal",
    },
    background: [
      "Harvey launched Agent Builder on March 9, 2026. It is the product the company is betting on for the next phase of expansion. The question for sales is no longer 'who should we tell about this' — it is 'which existing customers are sophisticated enough that they will actually adopt and expand?'",
      "Without signal detection, account executives are guessing. They are looking at the customers they already know well and missing the customers whose usage patterns are quietly screaming 'we are ready for Agent Builder.'",
      "The signals are in the product analytics. A customer with 10+ custom workflows in Assistant, multi-step flows hitting execution limits, and increasing weekly active users among their innovation team is the textbook profile. We have the data. We do not have the system that turns the data into a sales action.",
      "This is product-led growth signal detection applied to a top-down enterprise sales motion. It plugs directly into the public strategic question Gabe Pereyra has been asking: 'If every law firm buys Harvey, how do we differentiate?' The company's answer is Memory, Workflow Agents, and Agent Builder — depth and customization per firm. This workflow is how that answer gets operationalized at the GTM layer. Turn the biggest 2026 product launch into a daily pipeline event rather than a one-time announcement.",
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
        name: "Filter — The Three Signals the Top CSM Scans For",
        detail:
          "Snowflake query filters customers down to those hitting all three signals the best CSM watches for every week: (1) 10+ custom workflows created in Assistant in the last 30 days, (2) at least one multi-step workflow hitting the Assistant execution ceiling, (3) weekly active users among innovation-team users trending up 20%+ over a rolling 4-week window. The exact thresholds are set by shadowing the CSM before launch — not invented. This shrinks the candidate set from thousands to dozens.",
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
        name: "Deliver + Record — SFDC Task, Catalyst Event, Slack HITL",
        detail:
          "Create a Salesforce task on the account with the value hypothesis as the description. Log the same signal as a Catalyst (Totango) customer engagement event so CS sees it alongside their own account notes. Send the AE a Slack DM via Vercel Chat SDK with the signal, the hypothesis, and three one-click buttons: 'actioned,' 'not yet,' or 'wrong fit.' Every button press streams to `upsell_signal_feedback` in Snowflake. A weekly retune job reads the feedback table and adjusts the filter thresholds and prompt wording — the feedback loop is closed, not decorative.",
        tools: ["salesforce", "catalyst", "vercel-chat-sdk", "slack", "snowflake"],
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
      "vercel-chat-sdk",
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
      "This workflow operationalizes the answer to Harvey's public strategic question: if every law firm buys Harvey, how does Harvey differentiate itself? The product answer is Memory, Workflow Agents, and Agent Builder. This ticket is how that answer gets delivered at the GTM layer — every day, the customers most likely to adopt the new capability get surfaced to the right AE with a written reason why. It is the simplest and most measurable form of PLG applied to an enterprise motion. And it sets the pattern for how every future Harvey product launch becomes a daily pipeline event rather than a week-one announcement.",
  },

  {
    id: "GTM-005",
    title: "Post-Call Commitment Tracker",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Month 2",
    status: "ready",
    reporter: "Rob Saliterman, VP Sales",
    labels: ["deal-velocity", "commitment-tracking", "rep-hygiene"],
    oneLiner:
      "Parse every Gong call for commitments the Harvey rep made to the customer, auto-create SFDC tasks with due dates, and confirm with the rep in Slack before anything writes to the opp.",
    topPerformerMove:
      "The best AE keeps a notebook on her desk of 'things I said I'd do.' After every customer call she scans the Gong transcript while it's fresh, pulls the commitments into her task list, and clears them within 24 hours. Below-average reps drop roughly 30% of commitments on the floor. The workflow runs her exact scan on every call the team takes — the rep still owns the commitments, the agent just stops them from falling through.",
    roiMath: {
      cost: "$12K eng + ~$600/mo Claude API",
      savings: "Recovers dropped commitments that stall AmLaw procurement. Two rescued $200K-ACV deals per quarter is a conservative floor.",
      multiplier: "~50x first-year return if the floor holds",
      payback: "First rescued deal",
    },
    background: [
      "Harvey's AmLaw and enterprise sales cycles are 3-6 months and commitment-dense. Every customer call produces 2-5 rep-side commitments — 'I'll send the security questionnaire Friday,' 'we'll run the model card by our research team,' 'let me pull the sample outputs for your practice group by Wednesday.' Each one is a load-bearing promise to a General Counsel who equates 'forgot to send' with 'not a serious vendor.'",
      "Top AEs track commitments obsessively and clear them inside 24 hours. Below-average reps drop roughly 30%, and those drops correlate with deals that stall in weeks 4-8 of procurement. The rep thinks the lull is the security review; the customer is waiting on the thing the rep forgot to send in week 2.",
      "This workflow encodes the top AE's exact process — watch the Gong transcript right after the call ends, copy commitments into a list with due dates, work the list — and runs it automatically across every call the team takes. The rep reviews and confirms. The system never creates a task without a human tap.",
      "Reuses the Gong infrastructure stood up for GTM-001 (Pre-Call Brief). Additive cost is minimal because the data is already flowing.",
    ],
    acceptanceCriteria: [
      "Every Gong call the Harvey sales team records is automatically parsed for rep-side commitments within 5 minutes of call end.",
      "Commitments are extracted with speaker attribution (only commitments made by the Harvey rep), natural-language due dates normalized to ISO, and a confidence score per commitment.",
      "The rep receives a Slack DM via Vercel Chat SDK within 5 minutes of call end with the extracted commitments and three one-click buttons per commitment: confirm, edit, or reject. No SFDC task is created until the rep confirms.",
      "Confirmed commitments become SFDC tasks on the opportunity with the due date, the verbatim commitment text, and a link back to the Gong call.",
      "Every confirm/edit/reject streams to Snowflake `rep_commitments` as training data for the weekly prompt retune.",
      "Speaker attribution is pass^k=1 on a 20-call gold set: the system never attributes a customer commitment to the Harvey rep.",
      "If confidence on every commitment in a call is below threshold, the system fails silently — it never fabricates a commitment or sends a noisy 'nothing found' DM.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Gong Webhook on Call-Ended",
        detail:
          "Gong webhook fires when a call is transcribed and ready. A Vercel API route receives the payload, extracts callId and opportunity association, and enqueues downstream work via a Vercel Workflows durable job.",
        tools: ["gong", "vercel-workflows"],
      },
      {
        layer: 2,
        name: "Hydrate — Pull Transcript and Opportunity Context",
        detail:
          "Gong `/calls/{id}/transcript` returns the full transcript with speaker attribution. SFDC is pulled for opportunity stage, deal size, and last-meeting context. The three inputs feed the decide step.",
        tools: ["gong", "salesforce"],
      },
      {
        layer: 3,
        name: "Decide — Claude Extracts Rep-Side Commitments",
        detail:
          "Vercel AI SDK v6 calls Claude Sonnet via the AI Gateway with a focused prompt: extract every commitment the Harvey rep made, require speaker attribution, return verbatim text plus ISO due date plus confidence score plus the 30-second transcript window around where it was spoken. Zod schema validates the output. Confidence below 0.7 drops the commitment. Speaker attribution below 0.8 drops the commitment. Better to miss than to misattribute.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Validate — Confidence Gate, Dedupe, Format",
        detail:
          "Deterministic layer filters commitments below the confidence threshold, deduplicates against commitments already extracted from the same call (safety net for re-runs), and renders each surviving commitment into a Slack Block Kit card with Confirm / Edit / Reject buttons. If zero commitments survive the gate, no DM is sent.",
        tools: ["vercel-ai-sdk"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Slack HITL, SFDC on Confirm, Snowflake Log",
        detail:
          "Vercel Chat SDK posts the Slack DM. On Confirm, an SFDC task is created on the opp with due date and Gong source link. On Edit, a Slack modal lets the rep adjust the text or date before the task is created. On Reject, the commitment is logged as rejected training data. Every outcome streams to Snowflake `rep_commitments` for the weekly retune and for Rob's weekly completion-rate report.",
        tools: ["vercel-chat-sdk", "slack", "salesforce", "snowflake"],
      },
    ],
    stack: [
      "gong",
      "salesforce",
      "vercel-workflows",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "vercel-chat-sdk",
      "slack",
      "snowflake",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Shadow, gold set, extraction",
        tasks: [
          "Shadow one top AE for a morning. Watch how she tracks commitments today. Time the scan step.",
          "Pull 20 recent Gong calls with known outcomes from high-value opps. Manually extract rep-side commitments into the gold set.",
          "Build the Claude extraction prompt. Iterate until ≥90% recall and ≥90% precision against the gold set. Speaker attribution is non-negotiable — pass^k=1 or the ticket doesn't ship.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Slack HITL, SFDC write, canary",
        tasks: [
          "Build the Vercel API route that receives Gong webhooks and enqueues the durable workflow step.",
          "Build the Slack Block Kit card with Confirm / Edit / Reject via Vercel Chat SDK. Build the SFDC task write on Confirm and the edit-modal handler.",
          "Wire `rep_commitments` logging to Snowflake.",
          "Ship to one AE pod as canary. Monitor confirm / edit / reject ratio for 5 business days. Daily review with Rob.",
        ],
      },
    ],
    risks: [
      {
        risk: "Extraction misses commitments a human would have caught.",
        likelihood: "Medium",
        mitigation:
          "Gold set backtest against 20 hand-extracted calls. Threshold tuned for recall before precision (better to surface an extra commitment the rep rejects than to miss a real one). Reps can flag missed commitments via a Gong comment that feeds the retune job.",
      },
      {
        risk: "Customer-side commitments leak into the rep's task list.",
        likelihood: "Low",
        mitigation:
          "Speaker attribution is hard-gated at confidence 0.8. Misattribution is a trust-killer so the system drops any ambiguous commitment rather than guessing.",
      },
      {
        risk: "Vague commitments ('I'll get back to you') create useless tasks.",
        likelihood: "Medium",
        mitigation:
          "The prompt explicitly instructs the model to skip commitments without a specific deliverable or due date. 'I'll send the security questionnaire by Friday' ships; 'I'll follow up' gets dropped.",
      },
      {
        risk: "Reps ignore the Slack DMs because the volume is too high.",
        likelihood: "Low",
        mitigation:
          "Confidence thresholds cap most calls at 1-3 surfaced commitments. If a rep gets more than 5 per day, the thresholds auto-raise via the retune job.",
      },
    ],
    validation: [
      {
        metric: "Speaker attribution accuracy",
        target: "pass^k=1 on the 20-call gold set",
        why: "Misattributing a customer commitment to the rep is the one mistake that kills trust permanently. Zero tolerance.",
      },
      {
        metric: "Extraction recall",
        target: "≥90% of hand-extracted commitments on the gold set",
        why: "Below this, reps can't trust the system to catch the load-bearing promises.",
      },
      {
        metric: "Rep rejection rate",
        target: "<10% of surfaced commitments",
        why: "Above this, the DMs become noise and the system dies from opt-out.",
      },
      {
        metric: "Rep completion rate on confirmed commitments",
        target: "≥80% within 24 hours",
        why: "The whole point. If reps confirm but don't complete, the workflow is surfacing noise, not fixing behavior.",
      },
    ],
    whyThisMatters:
      "Harvey sells to General Counsels and managing partners who measure vendor seriousness by how precisely promises are kept. Enterprise cycles are commitment-dense by nature, and dropped commitments are one of the top reasons deals stall out in weeks 4-8 of procurement. Top AEs track these obsessively. Most AEs don't. This workflow turns the top performer's private notebook into a team-wide system. Cheap to build, reuses Gong and SFDC infrastructure from GTM-001, and directly addresses Harvey's rep-ramp dependency on ex-Big Law attorneys who have relationship instincts but not necessarily CRM hygiene.",
  },

  {
    id: "GTM-006",
    title: "Competitive Mention Radar",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Month 3",
    status: "ready",
    reporter: "Rob Saliterman, VP Sales",
    labels: ["competitive", "battlecard", "deal-velocity"],
    oneLiner:
      "Daily scan of Gong calls and SFDC email sync for competitor mentions. Classify intent, match to the battlecard, and DM the owning AE with a tailored counter before the next customer touchpoint.",
    topPerformerMove:
      "The best AE has battlecard reflexes. When she hears 'we're also evaluating Legora' she has a three-sentence counter ready in the next breath — name one thing Harvey does that the competitor can't, acknowledge the thing the competitor does better, redirect to the outcome the customer actually cares about. Most reps hear the same competitor name and freeze, then send a generic follow-up email that pretends the mention never happened. This workflow gives every AE the top AE's reflex on every call.",
    roiMath: {
      cost: "$10K eng + ~$500/mo Claude API",
      savings: "One recovered competitive deal per month at $150K ACV is the floor — likely more given the rate of mentions in an active market",
      multiplier: "~180x first-year return at the floor",
      payback: "First recovered competitive deal",
    },
    background: [
      "The AmLaw legal AI market has four serious players as of April 2026: Harvey, Legora (Harvey's fastest-growing direct rival at a $5.55B valuation, roughly half Harvey's ARR), Thomson Reuters CoCounsel (positioning around authoritative research with citations — 1M+ professionals on platform in February 2026), and internal builds running on foundation models or Anthropic's Claude Cowork. Customers probe the comparison in nearly every evaluation call.",
      "When a competitor comes up, the AE has roughly 10 seconds to respond well or poorly. Top AEs have the battlecard memorized and hit back with specific, current counters. Most don't, and the mention becomes an uncomfortable silence followed by a generic follow-up email that nobody reads.",
      "The competitive landscape changes monthly. Legora raised $550M in March 2026. CoCounsel crossed a million users. Foundation-model competitors are a structural squeeze from below. Any static battlecard is out of date within 30 days.",
      "This workflow scans every Gong call and SFDC email thread every few hours, flags competitor mentions, classifies intent (exploratory mention / active evaluation / committed to competitor / internal build), extracts the specific objection, matches to the current battlecard in Notion, and routes a tailored counter to the owning AE within 5 minutes.",
    ],
    acceptanceCriteria: [
      "A scheduled job runs every 4 hours. New Gong transcripts and SFDC email sync rows are pulled into Snowflake.",
      "Every mention of Legora, Thomson Reuters CoCounsel, Anthropic Claude Cowork, Paxton / Vincent AI, Spellbook, Hebbia, LexisNexis Protégé, or 'internal build' language is flagged and classified.",
      "Each classification includes the specific objection or question the customer raised, in the customer's own words.",
      "The owning AE receives a Slack DM via Vercel Chat SDK within 5 minutes of the flagged mention with: the mention context, the classification, the objection, the matched battlecard counter, and a one-click 'insert into my next email' button.",
      "The battlecard lives in Notion, version-controlled, updated weekly by Rob or product marketing. The agent re-reads the battlecard on every run so updates propagate without a deploy.",
      "Classification confuses 'co-counsel' (the legal term — used all the time in AmLaw calls) with 'CoCounsel' (the Thomson Reuters product) less than 5% of the time. Context-aware disambiguation is a non-negotiable test case.",
      "A weekly digest rolls up to Rob: mention counts per competitor, AE insertion rate per counter, and any unclassified 'AI legal tool' mentions that could indicate a new entrant.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Gong + SFDC Sync into Snowflake",
        detail:
          "Fivetran replicates the last Gong transcript batch and the last SFDC email thread batch into Snowflake every hour. The competitive radar query runs against new rows only to avoid reprocessing historical data.",
        tools: ["gong", "salesforce", "fivetran", "snowflake"],
      },
      {
        layer: 2,
        name: "Filter — Keyword Prefilter with Notion-Sourced Keyword List",
        detail:
          "A deterministic Snowflake query filters new rows for competitor name mentions. The keyword list lives in Notion and is re-read on every run, so Rob can add a new competitor in 10 seconds without a deploy. This shrinks the LLM workload from every call to only the calls where a mention is plausible.",
        tools: ["snowflake", "notion"],
      },
      {
        layer: 3,
        name: "Decide — Claude Classifies Mention + Extracts Objection",
        detail:
          "For each flagged mention, Vercel AI SDK v6 calls Claude Sonnet via the AI Gateway with the 30-second context window around the mention, customer history, and the current Notion battlecard. Returns a typed JSON object: competitor name, classification (exploratory / active eval / committed / internal build), objection text in the customer's own words, matched battlecard counter, and a confidence score. The prompt explicitly disambiguates 'co-counsel' (legal term) from 'CoCounsel' (product).",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway", "claude"],
      },
      {
        layer: 4,
        name: "Validate — Confidence Gate, Dedupe",
        detail:
          "Filter out mentions below 0.75 confidence. Deduplicate against mentions already flagged in the last 7 days for the same (AE, customer, competitor) triple. Silent failure on zero hits.",
        tools: ["vercel-ai-sdk"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Slack DM, Snowflake Log, Weekly Digest to Rob",
        detail:
          "Vercel Chat SDK posts the Slack DM to the account-owning AE with the mention context, classification, objection, battlecard counter, and a one-click 'insert into next email' modal. Every mention and outcome streams to Snowflake `competitive_mentions`. The weekly digest to Rob pulls from that table — mention counts per competitor, insertion rate per AE, unclassified AI legal tool mentions.",
        tools: ["vercel-chat-sdk", "slack", "snowflake"],
      },
    ],
    stack: [
      "gong",
      "salesforce",
      "fivetran",
      "snowflake",
      "notion",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "claude",
      "vercel-workflows",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Battlecard source of truth + classification prompt",
        tasks: [
          "Workshop with Rob to write the current battlecard for each competitor: one specific Harvey win, one acknowledged competitor strength, one redirect framing. Stand it up in Notion with version history.",
          "Build the Snowflake keyword prefilter query against the last 90 days of Gong + SFDC data. Validate the hit rate — too many mentions per day means the keyword list is too loose.",
          "Build the Claude classification prompt. Run it against 50 historical mentions with known competitor + outcome. Target ≥90% classification accuracy. Explicitly validate the 'co-counsel' / 'CoCounsel' disambiguation on 20 ambiguous cases.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Slack HITL flow and weekly digest",
        tasks: [
          "Build the Slack DM and 'insert into next email' modal via Vercel Chat SDK.",
          "Wire `competitive_mentions` logging and the weekly digest query to Rob.",
          "Ship to 3 canary AEs. Monitor insertion rate and objection relevance for 5 business days.",
          "Publish the first weekly digest. Establish the battlecard update cadence with Rob and product marketing.",
        ],
      },
    ],
    risks: [
      {
        risk: "Battlecard counters sound generic and AEs ignore them.",
        likelihood: "Medium",
        mitigation:
          "The battlecard is a Rob + product marketing deliverable, not automated. The agent retrieves and matches; the counters themselves are hand-crafted. Weekly digest forces Rob to see which counters land and which get ignored, so the battlecard stays under real-world pressure.",
      },
      {
        risk: "'Co-counsel' (the legal term) triggers false positives for CoCounsel (the Thomson Reuters product).",
        likelihood: "High",
        mitigation:
          "Context-aware classification via Claude. The prompt explicitly distinguishes the legal term ('co-counsel on a matter') from the product. Validated on 20 ambiguous historical mentions before ship. False positive rate measured weekly.",
      },
      {
        risk: "Competitor name mentioned in a friendly context (customer complimenting both tools) triggers a battlecard counter the AE doesn't need.",
        likelihood: "Medium",
        mitigation:
          "Classification step handles this — 'exploratory mention' classification sends a lighter notification without the 'insert into email' CTA.",
      },
      {
        risk: "Keyword list misses a new competitor that enters the market.",
        likelihood: "Medium",
        mitigation:
          "Rob can add a new name to the Notion keyword list in 10 seconds. Weekly digest includes 'unclassified AI legal tool mentions' so the team can spot new entrants via transcript signal before the keyword list catches up.",
      },
    ],
    validation: [
      {
        metric: "Classification accuracy on historical set",
        target: "≥90% agreement with manual labeling of 50 historical mentions",
        why: "Below this, the DMs become noise and AEs opt out.",
      },
      {
        metric: "AE insertion rate on delivered counters",
        target: "≥40% of counters inserted into an email",
        why: "Tells us the counters are landing. If low, the battlecard itself needs work — not the agent.",
      },
      {
        metric: "Time from mention to AE DM",
        target: "<5 minutes median",
        why: "The value is reflex speed. Past 15 minutes the AE has already moved on.",
      },
      {
        metric: "Competitive win rate lift vs 90-day baseline",
        target: "+5pt",
        why: "The reason this exists. Lagging indicator, but the one that matters to Rob.",
      },
    ],
    whyThisMatters:
      "The AmLaw legal AI market is four serious players deep and getting deeper. Legora is growing fast. CoCounsel is reframing the category around authoritative research. Foundation-model competitors are a structural squeeze from below. Every competitive mention in a customer conversation is a hinge — a weak response loses the deal, a sharp one bends it. This workflow arms every AE with the top AE's battlecard reflex on every call, keeps the battlecard current because the source of truth is a Notion doc Rob updates weekly, and turns competitive intel into a shipping ritual rather than a quarterly slide deck. It reuses the Gong and SFDC infrastructure from GTM-001 and GTM-005 — additive cost is minimal because the data is already in Snowflake.",
  },
];

export function getTicket(id: string): Ticket | undefined {
  return TICKETS.find((t) => t.id.toLowerCase() === id.toLowerCase());
}

export function getAllTickets(): Ticket[] {
  return TICKETS;
}
