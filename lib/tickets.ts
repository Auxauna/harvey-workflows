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
  firstPrinciples: string;
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
    id: "GTM-000",
    title: "Diagnostic Month — Shadow, Interview, Baseline",
    priority: "P0",
    effort: "4 weeks",
    sprint: "Month 1",
    status: "ready",
    reporter: "GTM Technology",
    labels: ["business-analysis", "diagnostic", "stakeholder-interviews", "baseline-metrics"],
    oneLiner:
      "Month 1 is pure BA work. Shadow top performers, interview stakeholders, baseline the metrics, triage the existing Linear backlog, audit data integrity. Every build that follows is only as good as this groundwork.",
    firstPrinciples:
      "Learn the business before automating it. Every great GTM Business Analyst's first move at a new company is diagnostic — shadow first, build second. Skip this month and every workflow on the board is a guess wearing a confidence score. The creative work only has the right targets after the shadowing.",
    topPerformerMove:
      "The best GTM BA's first week at a new company isn't spent building anything. It's spent with a notebook — watching the best AE handle a prospecting call, watching the top CSM scan the weekly health board, watching the segment owner route a lead. Every top performer move this roadmap mirrors downstream was discovered by someone who shut up for a week and watched people work.",
    roiMath: {
      cost: "One month of fully-loaded BA time (~$16K)",
      savings: "Every subsequent ticket targets a real problem instead of a guess — the highest-leverage month in the 90-day plan",
      multiplier: "Not directly measurable; every workflow on this board sources its top-performer move and ROI assumptions from Month 1",
      payback: "Every ticket shipped after Month 1 is 'paid back' by this investment",
    },
    background: [
      "The GTM Business Analyst role exists to translate business objectives into technical requirements and ship automations that make the GTM motion faster and more accurate. Every word of that depends on understanding the business first.",
      "Showing up in Month 1 with a roadmap of things to build is the wrong shape. Showing up in Month 1 with a notebook, a calendar full of shadow sessions and stakeholder interviews, and a list of open questions is the right shape. The creative building work lives in Months 2 and 3 — and it's only credible if Month 1 did the groundwork.",
      "This ticket is the Month 1 plan as a first-class artifact. Specific shadow targets, specific stakeholder interviews, specific baseline metrics, specific backlog triage activities, specific data integrity audits. It ships a 3-page diagnostic memo at the end that grounds every subsequent ticket on the board in real signal rather than invented ones.",
    ],
    acceptanceCriteria: [
      "Shadow sessions completed with at least five top performers across seats: three AEs (one AmLaw enterprise, one corporate legal, one international or asset manager) and two CSMs managing top 20 customers. Notes live in Notion within 24 hours of each session.",
      "Stakeholder interviews completed with at least eight leaders across functions: Rob Saliterman (VP Sales), John Haddock (CBO), James Hunsberger (Head of GTM Technology), the RevOps lead, the Marketing Ops lead, the CS lead, the Lead-to-Cash Product owner, and one segment rep leader.",
      "Baseline metrics captured in Snowflake `gtm_tech_baseline`: deal velocity by segment, lead-to-meeting conversion by source, time-to-first-touch by segment, Agent Builder adoption rate by customer tier, top-20 account health score, and data quality index (dupes / orphans / missing ownership).",
      "Existing GTM Technology Linear backlog triaged: every open ticket reviewed with James, priorities set, and the first five P1s closed or meaningfully progressed within the month. We help clear the queue before we add to it.",
      "Data integrity audit completed on the top 50 accounts by ARR: duplicate check, ownership conflict check, missing-field check, stale-record check. Findings in Notion, cleanup tickets opened in Linear for the Month 3 Systems Governance work.",
      "A 3-page diagnostic memo published by end of Month 1 covering: the GTM motion as observed, the most-shared pain points, the three biggest data hygiene issues, the top-performer moves the roadmap should encode, the top-3 workflow priorities grounded in real signal, and the open questions James and Rob should resolve.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Shadow Sessions — 5 Top Performers",
        detail:
          "Three AEs (one per segment where possible) and two CSMs. Each session is a half-day with the top performer plus 2-3 follow-up Gong call reviews to see the patterns replay. Notes written same-day to Notion. The goal isn't critique — it's discovering the undocumented moves the top rep makes without realizing they're doing anything special.",
        tools: ["gong", "notion", "slack"],
      },
      {
        layer: 2,
        name: "Stakeholder Interviews — 8 Leaders Across Functions",
        detail:
          "45-minute interviews with Rob, John, James, the RevOps lead, Marketing Ops lead, CS lead, Lead-to-Cash PM, and one segment rep leader. Same core questions to every interviewee: what's working, what's broken, what would you automate if you had a week, what systems don't talk to each other, what decision gets made with bad data most often. Notes to Notion.",
        tools: ["notion", "slack"],
      },
      {
        layer: 3,
        name: "Metric Baselines — 6 Metrics Into Snowflake",
        detail:
          "Stand up `gtm_tech_baseline` schema in Snowflake. Populate with six baseline metrics: deal velocity by segment, lead-to-meeting conversion by source, time-to-first-touch by segment, Agent Builder adoption rate, top-20 account health, and data quality index. These are the numbers every workflow on the board gets measured against — without them, ROI claims are fabrication.",
        tools: ["snowflake", "salesforce", "fivetran"],
      },
      {
        layer: 4,
        name: "Backlog Triage — Clear Before Adding",
        detail:
          "Review every open GTM Technology Linear ticket with James. Close the irrelevant ones, reassign what belongs elsewhere, help clear the first five P1s that are achievable inside Month 1. Demonstrates respect for the existing queue before adding to it — and surfaces any work that should influence the Month 2 plan.",
        tools: ["linear", "notion"],
      },
      {
        layer: 5,
        name: "Data Integrity Audit — Top 50 Accounts",
        detail:
          "Deterministic audit on the top 50 accounts by ARR. Check for duplicate accounts, ownership conflicts, missing required fields, and stale pipeline records. Write findings to Notion, open cleanup tickets in Linear for the Month 3 GTM-006 Systems Governance work. This is also a preview of what the recurring agent will automate once built.",
        tools: ["salesforce", "snowflake", "linear", "notion"],
      },
    ],
    stack: ["gong", "notion", "slack", "snowflake", "salesforce", "fivetran", "linear"],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Shadow sessions + first stakeholder interviews",
        tasks: [
          "Monday: shadow top AmLaw enterprise AE for the morning. Shadow top CSM in the afternoon. Notes same day.",
          "Tuesday: shadow top corporate legal AE. Review three of her recent Gong calls.",
          "Wednesday: first four stakeholder interviews (Rob, John, James, RevOps lead).",
          "Thursday: shadow second top CSM. Fifth stakeholder interview (Marketing Ops lead).",
          "Friday: review Week 1 notes with James. Lock Week 2 interview list.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Finish interviews, stand up baseline metrics",
        tasks: [
          "Monday-Tuesday: remaining stakeholder interviews (CS lead, Lead-to-Cash PM, segment rep leader).",
          "Wednesday-Thursday: stand up `gtm_tech_baseline` in Snowflake. Wire the six metrics from SFDC and Fivetran-replicated product analytics.",
          "Friday: Linear backlog triage with James. Identify the five P1s to help clear.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Data integrity audit + close the first backlog tickets",
        tasks: [
          "Monday-Tuesday: data integrity audit on top 50 accounts by ARR. Write findings to Notion. Open cleanup tickets in Linear.",
          "Wednesday-Thursday: close or meaningfully advance the five P1 backlog tickets from Week 2.",
          "Friday: mid-month review with James. Course-correct Month 1 priorities based on what's surfaced so far.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Diagnostic memo + first quick-win canary",
        tasks: [
          "Monday-Tuesday: write the 3-page diagnostic memo. Ship to James, Rob, John for review.",
          "Wednesday-Thursday: ship the GTM-001 Pre-Call Brief canary to one AE pod as the end-of-month quick win. 'I can also build,' not the main deliverable.",
          "Friday: retrospective with James. Lock the Month 2 plan from the memo's priorities.",
        ],
      },
    ],
    risks: [
      {
        risk: "Top performers don't have time to shadow.",
        likelihood: "Medium",
        mitigation:
          "Rob and John help gatekeep the asks. 30-minute sessions where 45 is a stretch. Fallback: review recent Gong calls asynchronously instead of live shadowing. The point is pattern discovery, not face time.",
      },
      {
        risk: "Stakeholder interviews surface conflicting priorities across functions.",
        likelihood: "High",
        mitigation:
          "Conflicts are the signal — not the problem. The memo names them explicitly and asks James to arbitrate in the Month 1 retro. Surfacing the conflict is more useful than pretending everyone agrees.",
      },
      {
        risk: "Month 1 ends with a memo and zero shipped automation — perceived as slow by the field team.",
        likelihood: "Medium",
        mitigation:
          "The Week 4 GTM-001 canary exists specifically to counter this perception. If Week 4 slips, the memo still ships — the BA work is the deliverable, not a preamble to it. James has cover because the JD says this is BA work first.",
      },
      {
        risk: "Data integrity findings become their own distraction that derails the rest of Month 1.",
        likelihood: "Medium",
        mitigation:
          "Month 1 only audits and opens cleanup tickets. Actual fixes live in GTM-006 Systems Governance starting Month 3. The audit is mapping the problem, not solving it yet.",
      },
    ],
    validation: [
      {
        metric: "Shadow sessions completed",
        target: "5 sessions (3 AEs + 2 CSMs) with notes in Notion",
        why: "Undocumented top-performer moves are the raw material for every subsequent ticket. Less than 5 is not enough signal.",
      },
      {
        metric: "Stakeholder interviews completed",
        target: "8 interviews across functions, all with notes in Notion",
        why: "Cross-functional coverage is the whole point of the BA role per the JD. 8 is the minimum to see the GTM motion end-to-end.",
      },
      {
        metric: "Baseline metrics live in Snowflake",
        target: "6 metrics populated, queryable, with a visualization",
        why: "Every workflow on the board is measured against these. No baseline, no credible ROI claims.",
      },
      {
        metric: "Diagnostic memo published",
        target: "3 pages max, reviewed by James + Rob + John",
        why: "The memo is the hard deliverable for Month 1 — it grounds every subsequent ticket in real signal rather than guessing.",
      },
      {
        metric: "Backlog tickets advanced",
        target: "5 P1s from the GTM Technology Linear backlog closed or meaningfully progressed",
        why: "Demonstrates respect for the existing queue and cross-functional partnership. The build work is not the only work.",
      },
    ],
    whyThisMatters:
      "This is the load-bearing month. Without it, every workflow ticket on this board is speculation — top-performer moves invented, ROI numbers fabricated, data quality claims unverified. With it, every subsequent ticket sources its design, its ROI math, and its validation plan from the real GTM motion at Harvey as observed in person. The job description says this role is a business analyst first and a builder second. Month 1 is that claim in the hard way: one month of pure BA work, one 3-page memo at the end, zero shipping bias.",
  },

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
    firstPrinciples:
      "Synthesis is a routing problem, not a generation problem. Five sources, four meeting types — the agent's real work is deciding which source answers which field for which meeting shape, then summarizing the slice. The creative move is the dispatch function, not the LLM call at the end. Every failure mode a brief has — hallucinated execs, stale news, irrelevant context — traces back to a routing mistake upstream, not a bad prompt.",
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
        name: "Sense — SFDC Platform Event Wakes Claude Code",
        detail:
          "Salesforce Platform Event on Activity fires when a new external meeting is created or updated in the next 24 hours. A Vercel API route receives the event and invokes Claude Code inside Vercel Sandbox. No polling tax, no 5-minute jitter on the 30-minute SLA.",
        tools: ["salesforce", "mcp", "vercel-sandbox", "claude-code"],
      },
      {
        layer: 2,
        name: "Hydrate — Claude Code Calls Clay via MCP",
        detail:
          "Claude Code's first tool call is Clay via MCP. Clay is the flexible orchestration layer for one-off per-meeting enrichment — it wraps ZoomInfo, Clearbit, Apollo, LinkedIn-derived signal, and Gong's call history behind a single call, scoped by meeting type (discovery / expansion / renewal / check-in). One MCP call, one round trip, no hand-rolled waterfall code.",
        tools: ["clay", "gong", "mcp"],
      },
      {
        layer: 3,
        name: "Decide — Claude Code Synthesizes and Validates",
        detail:
          "Claude Code (Sonnet 4.6 via AI Gateway) synthesizes the one-pager from the hydrated context, requires inline citations for every claim, and validates the output against a Zod schema. Tool-calling fetches additional context only when the base inputs are insufficient — e.g., 'the firm just had a merger, pull the last 7 days of news before finalizing.'",
        tools: ["claude-code", "claude", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Pause — Claude Code Emits Slack HITL and Exits",
        detail:
          "Claude Code writes the draft to Snowflake pending_briefs with a unique brief_id, posts a Vercel Chat SDK card to Slack with approve / edit / reject buttons, and exits. No process stays resident waiting. State lives in Snowflake. A Slack webhook on rep action wakes a second Claude Code burst inside a fresh Sandbox.",
        tools: ["snowflake", "vercel-chat-sdk", "slack"],
      },
      {
        layer: 5,
        name: "Act + Record — Second Burst Delivers and Logs",
        detail:
          "On rep approve, a second Claude Code burst reads the brief state from Snowflake, ships the email via Resend (React Email template), confirms in Slack, and writes the full audit trail — inputs, model reasoning, delivery receipts, and 👍/👎 — to Snowflake brief_outcomes. On edit, the rep's modified draft replaces the original before delivery. On reject, the outcome logs and the flow ends silently.",
        tools: ["resend", "slack", "vercel-chat-sdk", "snowflake", "claude-code"],
      },
    ],
    stack: [
      "salesforce",
      "gong",
      "clay",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "vercel-cron",
      "claude",
      "vercel-ai-gateway",
      "snowflake",
      "resend",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Gold set and MCP wiring",
        tasks: [
          "Shadow three top AEs for half a day each. Watch them build briefs by hand. Time every step, note which tab answers which question.",
          "Collect 50 hand-written briefs from the top three AEs. This is the golden set — the eval target.",
          "Define the Zod schema for a brief (sections, fields, citation format).",
          "Wire the Salesforce, Clay, and Gong MCP servers into a Claude Code project. Point them at a test Vercel Sandbox environment and verify the first end-to-end dry run against five sample meetings before AI enters the loop.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Synthesis prompt to pass^k=1 on citations",
        tasks: [
          "Build the Claude Code prompt for synthesis. Keep it under 200 lines — the routing logic lives in the MCP calls, not the prompt.",
          "Iterate against the 50-task golden set until pass^k=1 on citation coverage (every claim traceable to a source row).",
          "Grader agreement >80% on brief quality vs the top-AE hand-written versions, measured by a blind human rubric.",
          "Lock the brief template. Ship the React Email template for Resend and the Block Kit card for Vercel Chat SDK.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Canary pod with shadow mode first",
        tasks: [
          "Deploy to one of Rob's enterprise pods as the canary group.",
          "Run in shadow mode for 48 hours (generate but don't send). Manually review every brief.",
          "Flip to live delivery. Monitor generation rate, open rate, and 👍/👎 feedback for 5 business days. Triage failures via Linear.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Full rollout and handoff",
        tasks: [
          "Address canary feedback. Roll out to the rest of the team.",
          "Document the runbook in Notion. Hand ongoing MCP server ownership and prompt tuning to RevOps.",
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
          "Clay's enrichment refresh runs hourly on hot accounts and daily on cold ones via the MCP server's cached fetch. The brief always includes a 'data freshness' line so the rep knows which fields are live and which are cached.",
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
    firstPrinciples:
      "Entity resolution as graph stitching. The three data surfaces — representative experience pages, client lists, attorney bios — aren't redundant sources of the same data. They're complementary fragments of one relationship graph that the top researcher reconstructs in her head as she clicks around. The agent's real job is reconstructing that graph and collapsing the mentions into canonical accounts. The crawl is the easy part; the graph is the work.",
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
        name: "Sense — Nightly Cron Pulls Firm Queue from SFDC",
        detail:
          "Vercel Cron fires nightly. Claude Code spins up inside Vercel Sandbox, reads the law firm account queue from SFDC via MCP, and processes one firm per execution so each crawl has isolated state and failure domain.",
        tools: ["salesforce", "mcp", "vercel-sandbox", "vercel-cron", "claude-code"],
      },
      {
        layer: 2,
        name: "Scope — Firecrawl Sitemap Discovery",
        detail:
          "Claude Code calls Firecrawl via MCP for a sitemap.xml discovery pass on the firm's domain. Candidate URLs are scoped to practice-group pages, attorney bios, news/insights, and deal tombstones before the heavy /agent call runs, so credits aren't burned crawling marketing pages.",
        tools: ["firecrawl", "mcp"],
      },
      {
        layer: 3,
        name: "Decide — Single Firecrawl /agent Call",
        detail:
          "Claude Code calls Firecrawl /agent (the natural-language agent endpoint, launched February 2026) with the scoped URL set and a tightly written prompt: find every explicitly named client company across the three data surfaces, include attribution context, skip generic descriptors like 'a leading technology company,' and return structured JSON. /agent handles JS rendering, pagination, and rate limiting natively via Spark 1.",
        tools: ["firecrawl", "mcp", "claude-code"],
      },
      {
        layer: 4,
        name: "Resolve — Graph Stitching via Clay",
        detail:
          "Claude Code calls Clay via MCP for entity resolution. Clay's company-match collapses 'Morgan Stanley,' 'Morgan Stanley & Co.,' and 'MS Wealth Management' into one canonical account. Each resolved company is cross-referenced against SFDC (also via MCP) to tag cross-sell signals (existing Harvey customer surfaced as firm's client) and prospecting signals (ICP fit, not yet customer). Residual generic descriptors filter out via a deterministic regex.",
        tools: ["clay", "salesforce", "mcp"],
      },
      {
        layer: 5,
        name: "Record + Deliver — Snowflake Write, Slack Digest",
        detail:
          "Claude Code writes the resolved graph to Snowflake firm_client_mapping (one row per canonical firm→client pair with attribution metadata). The owning AE gets a Slack DM via Vercel Chat SDK: 'Cool & Associates works with 47 named companies. 12 are Harvey ICP fit. 3 are existing Harvey customers — cross-sell opportunity.' High-confidence prospecting signals push to SFDC as new account candidates with provenance attached.",
        tools: ["snowflake", "salesforce", "vercel-chat-sdk", "slack", "mcp"],
      },
    ],
    stack: [
      "salesforce",
      "firecrawl",
      "clay",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "vercel-cron",
      "claude",
      "vercel-ai-gateway",
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
        title: "Scheduled Sandbox runs and Slack delivery",
        tasks: [
          "Wrap the Claude Code agent in a Vercel Cron trigger that invokes Sandbox nightly across the firm pipeline. Budget cap per firm enforced via step-level credit checks.",
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
    firstPrinciples:
      "Classification is encoded judgment, not LLM guessing. The top AmLaw enterprise rep's 30-second pattern match on four signals (title, firm domain, jurisdiction, prior context) is the oracle — the agent's job is to replay that pattern match on every lead and write down why. The reasoning string is the product as much as the classification itself, because it's what makes the decision auditable, retunable, and trustworthy to the rep who inherits the lead downstream.",
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
        name: "Sense — Marketo / Qualified Webhook Wakes Claude Code",
        detail:
          "When a lead fills a form on harvey.ai, schedules a demo via Qualified, or crosses an MQL threshold in Marketo, a webhook hits a Vercel API route and invokes Claude Code inside Vercel Sandbox. The lead payload (email, company, role, captured form fields) is passed in as initial state.",
        tools: ["marketo", "qualified", "mcp", "vercel-sandbox", "claude-code"],
      },
      {
        layer: 2,
        name: "Hydrate — Claude Code Calls Scalestack via MCP",
        detail:
          "Claude Code's first tool call is Scalestack via MCP. Scalestack is the enterprise orchestration layer for bulk managed enrichment — it wraps ZoomInfo, Clearbit, Apollo, Cognism, G2, and 60+ other providers behind a single call with sub-3-second latency and 92%+ B2B match rate. One MCP call, one round trip, one billing envelope — not a three-vendor kitchen sink the agent has to reconcile in code.",
        tools: ["scalestack", "mcp"],
      },
      {
        layer: 3,
        name: "Decide — Claude Code Classifies with Reasoning String",
        detail:
          "Claude Code (Sonnet 4.6 via AI Gateway) receives the enriched lead profile and classifies into one of four segments — AmLaw 100, international law, corporate legal, asset manager — with a confidence score and a written reasoning string the rep will actually read. Tool calling fetches additional context (recent firm news, jurisdiction-specific signals) only when the base inputs aren't enough.",
        tools: ["claude-code", "claude", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Route — Confidence Gate with Slack HITL on Ambiguity",
        detail:
          "High-confidence classifications (>0.85) auto-route. AmLaw 100 → former-BigLaw enterprise AE pool. Corporate legal → corporate sales specialist pool. International → regional pool with jurisdiction match. Asset managers → PE/hedge fund/family office specialist pool. Low-confidence classifications pause the agent, post a Slack HITL card to RevOps via Chat SDK, and wait for human resolution. The human decision wakes a second Claude Code burst for final routing.",
        tools: ["salesforce", "vercel-chat-sdk", "slack"],
      },
      {
        layer: 5,
        name: "Deliver + Record — SFDC Update, Sequence Enrollment, Retune Feed",
        detail:
          "SFDC Lead record updates with segment, confidence score, and reasoning string via MCP. Marketo enrolls the lead into the segment-specific nurture. The owning rep receives a Slack DM with the brief and the reasoning so they trust the classification. Every classification (auto-routed or HITL-resolved) and every misclassification flag streams to Snowflake for the monthly prompt retune.",
        tools: ["salesforce", "marketo", "snowflake", "vercel-chat-sdk", "slack"],
      },
    ],
    stack: [
      "marketo",
      "qualified",
      "scalestack",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "claude",
      "vercel-ai-gateway",
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
        title: "Wire Scalestack MCP and validate coverage",
        tasks: [
          "Wire Scalestack as an MCP server into the Claude Code project. One tool call per lead, no hand-rolled waterfall code.",
          "Run all 500 historical leads through the Scalestack enrichment path. Validate completeness (≥95% of leads get enough data to classify).",
          "Identify any data gaps that would block classification — those leads route to human review explicitly rather than being force-classified.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Classification prompt + confusion matrix backtest",
        tasks: [
          "Write the Claude Code classification prompt with the four-segment rubric and reasoning-string requirement.",
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
          "Wire the SFDC MCP write-back and the Slack HITL escalation for low-confidence leads.",
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
    firstPrinciples:
      "Revealed preference beats stated preference. What a customer says in a QBR is aspirational. What they do in the product every day is honest. The three signal thresholds aren't a scoring model — they're the top CSM's mental checklist for 'this customer is telling me they're ready' via their behavior. The agent is a translator from revealed preference to value hypothesis, in the CSM's own voice, daily.",
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
        name: "Sense — Daily Cron Fires Claude Code Against Product Analytics",
        detail:
          "Vercel Cron fires Claude Code inside Vercel Sandbox every morning at 6am Pacific. Fivetran has already replicated Harvey's product analytics into Snowflake hourly overnight. Claude Code reads from `product_usage` via the Snowflake MCP server — workflow counts, execution metadata, active user counts per customer per day.",
        tools: ["fivetran", "snowflake", "mcp", "vercel-sandbox", "vercel-cron", "claude-code"],
      },
      {
        layer: 2,
        name: "Filter — The Top CSM's Three-Signal Mental Checklist",
        detail:
          "Claude Code runs the three-signal filter that the top CSM scans for every week: (1) 10+ custom workflows created in Assistant in the last 30 days, (2) at least one multi-step workflow hitting the Assistant execution ceiling, (3) weekly active users among innovation-team users trending up 20%+ over a rolling 4-week window. The exact thresholds are fixed by shadowing the top CSM before launch, not invented. The filter shrinks the candidate set from thousands to dozens before the LLM enters the loop.",
        tools: ["snowflake", "mcp"],
      },
      {
        layer: 3,
        name: "Decide — Claude Code Drafts the Value Hypothesis",
        detail:
          "For each candidate customer, Claude Code (Sonnet 4.6) synthesizes a value hypothesis from the customer's usage profile and any open opportunities. Returns a typed object: written hypothesis, the three specific workflows that would benefit most from Agent Builder, the suggested first conversation framing, and a confidence score. The prompt is tuned against 20 historical upgrade stories so the hypothesis sounds like what the CSM would actually say — not generic upsell boilerplate.",
        tools: ["claude-code", "claude", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Score — Dedupe, Suppress, Route by Ownership",
        detail:
          "Claude Code applies a final rubric via MCP calls: filter out customers in active procurement or renewal negotiation, suppress customers with an existing Agent Builder opportunity, dedupe against signals sent in the last 14 days. Each surviving signal routes to the account-owning AE based on SFDC ownership.",
        tools: ["salesforce", "mcp"],
      },
      {
        layer: 5,
        name: "Deliver + Record — SFDC Task, Catalyst Event, Slack HITL Feedback Loop",
        detail:
          "Claude Code creates a Salesforce task on the account with the value hypothesis as the description, logs the same signal as a Catalyst (Totango) customer engagement event so CS sees it alongside their own account notes, and sends the AE a Slack DM via Vercel Chat SDK with three one-click buttons: actioned, not yet, wrong fit. Every button press streams to `upsell_signal_feedback` in Snowflake. A weekly retune job reads the feedback table and adjusts the filter thresholds and prompt wording — the feedback loop is closed, not decorative.",
        tools: ["salesforce", "catalyst", "vercel-chat-sdk", "slack", "snowflake", "mcp"],
      },
    ],
    stack: [
      "fivetran",
      "snowflake",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "vercel-cron",
      "claude",
      "vercel-ai-gateway",
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
        title: "Production rollout via Vercel Cron + Sandbox",
        tasks: [
          "Wire Vercel Cron to invoke Claude Code inside Sandbox daily at 6am Pacific.",
          "Build the Slack delivery flow via Vercel Chat SDK with the actioned/not yet/wrong fit feedback buttons.",
          "Wire the feedback loop back to Snowflake `upsell_signal_feedback` so the weekly retune job can adjust thresholds and prompt wording.",
          "Roll out. Monitor signal-to-action rate weekly with Rob and John.",
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
    title: "Competitive Mention Radar",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Month 3",
    status: "ready",
    reporter: "Rob Saliterman, VP Sales",
    labels: ["competitive", "battlecard", "deal-velocity"],
    oneLiner:
      "Daily scan of Gong calls and SFDC email sync for competitor mentions. Classify intent, match to the battlecard, and DM the owning AE with a tailored counter before the next customer touchpoint.",
    firstPrinciples:
      "Latency is the product. The value here isn't classification accuracy or battlecard comprehensiveness — it's how fast a sharpened counter reaches the AE after a customer mention. This is an ambient, reactive agent, not a batch report. A 90% accurate counter delivered within 5 minutes beats a 99% accurate counter delivered the next day, every time.",
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
        name: "Sense — Vercel Cron Fires Claude Code Against Fresh Transcripts",
        detail:
          "Vercel Cron fires Claude Code inside Sandbox every 4 hours. Fivetran has already replicated the last 4 hours of Gong transcripts and SFDC email sync rows into Snowflake. Claude Code reads only the new rows via the Snowflake MCP server — no historical reprocessing.",
        tools: ["gong", "salesforce", "fivetran", "snowflake", "mcp", "vercel-sandbox", "vercel-cron", "claude-code"],
      },
      {
        layer: 2,
        name: "Filter — Keyword Prefilter with Notion-Sourced Keyword List",
        detail:
          "Claude Code pulls the current competitor keyword list from Notion via MCP and runs a deterministic prefilter over the new rows. The keyword list is version-controlled and Rob can add a new competitor in 10 seconds without a deploy. This shrinks the LLM workload from every call to only the calls where a mention is plausible.",
        tools: ["notion", "snowflake", "mcp"],
      },
      {
        layer: 3,
        name: "Decide — Claude Classifies Mention + Extracts Objection",
        detail:
          "For each flagged mention, Claude Code (Sonnet 4.6 via AI Gateway) reads the 30-second context window around the mention, the customer history, and the current Notion battlecard. Returns a typed object: competitor name, classification (exploratory / active eval / committed / internal build), objection text in the customer's own words, matched battlecard counter, and a confidence score. The prompt explicitly disambiguates 'co-counsel' (legal term) from 'CoCounsel' (Thomson Reuters product).",
        tools: ["claude-code", "claude", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Validate — Confidence Gate, 7-Day Dedupe",
        detail:
          "Claude Code filters out mentions below 0.75 confidence and deduplicates against mentions already flagged in the last 7 days for the same (AE, customer, competitor) triple. Silent failure on zero hits — no 'nothing happened' DMs.",
        tools: ["claude-code", "snowflake", "mcp"],
      },
      {
        layer: 5,
        name: "Deliver + Record — Slack DM, Snowflake Log, Weekly Digest",
        detail:
          "Claude Code posts the Slack DM via Vercel Chat SDK to the account-owning AE with the mention context, classification, objection, battlecard counter, and a one-click 'insert into next email' modal. Every mention and outcome streams to Snowflake `competitive_mentions`. The weekly digest to Rob pulls from that table — mention counts per competitor, insertion rate per AE, and any unclassified AI legal tool mentions that could indicate a new entrant.",
        tools: ["vercel-chat-sdk", "slack", "snowflake", "mcp"],
      },
    ],
    stack: [
      "gong",
      "salesforce",
      "fivetran",
      "snowflake",
      "notion",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "vercel-cron",
      "claude",
      "vercel-ai-gateway",
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
      "The AmLaw legal AI market is four serious players deep and getting deeper. Legora is growing fast. CoCounsel is reframing the category around authoritative research. Foundation-model competitors are a structural squeeze from below. Every competitive mention in a customer conversation is a hinge — a weak response loses the deal, a sharp one bends it. This workflow arms every AE with the top AE's battlecard reflex on every call, keeps the battlecard current because the source of truth is a Notion doc Rob updates weekly, and turns competitive intel into a shipping ritual rather than a quarterly slide deck. It reuses the Gong and SFDC infrastructure from GTM-001 — additive cost is minimal because the data is already in Snowflake.",
  },

  {
    id: "GTM-006",
    title: "Systems Governance — Weekly Data Integrity Audit",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Month 3",
    status: "ready",
    reporter: "GTM Technology",
    labels: ["data-integrity", "governance", "infrastructure", "recurring"],
    oneLiner:
      "Weekly Claude Code audit of SFDC data quality. Opens Linear tickets for anomalies, publishes a digest to Rob, makes data hygiene a system rather than a quarterly firedrill.",
    firstPrinciples:
      "Clean data compounds. Every dirty row — the duplicate account, the orphan contact, the opportunity with no owner, the stale pipeline record — poisons every downstream workflow invisibly. The agent's job isn't to fix the data. It's to make data quality a first-class weekly observable so the RevOps team can keep ahead of the mess instead of quarterly firedrill-ing out of it.",
    topPerformerMove:
      "The best RevOps lead already spot-checks data quality every Monday morning — pulls a Snowflake query, scans for the usual suspects (dupes, orphans, missing owners, stale pipelines), opens a handful of Linear tickets, moves on. The agent encodes her exact query logic and her exact triage rules and runs them every week at the same level of discipline, without requiring her Monday morning.",
    roiMath: {
      cost: "~$10K eng + ~$300/mo Claude API",
      savings: "Prevents the data quality decay that poisons every other workflow on this board. Compounds weekly.",
      multiplier: "Not directly ARR-attributable, but every workflow's accuracy depends on this floor",
      payback: "First week the data quality score moves off zero",
    },
    background: [
      "The GTM Business Analyst job description lists 'Systems Governance — data integrity, deduplication, system audits' as one of five core responsibilities. This ticket operationalizes that responsibility as a weekly recurring workflow rather than a quarterly firedrill.",
      "Right now data quality at Harvey is handled reactively: a RevOps lead notices the pipeline is a mess, runs a one-off audit, a team cleans up, and the cycle repeats 90 days later. In between, every workflow downstream quietly absorbs the decay. GTM-003 Lead Routing can't route correctly if the account hierarchy is wrong. GTM-004 Agent Builder signals can't fire correctly if ownership is ambiguous. GTM-002 Firm Client Mapping poisons the graph if duplicates aren't resolved.",
      "This ticket converts that cadence from quarterly reactive to weekly proactive. A Claude Code agent runs every Monday morning, pulls the SFDC data quality snapshot from Snowflake, runs deterministic checks, uses Claude only where deterministic rules can't disambiguate (e.g., 'is this account a duplicate of that one given similar names but different domains'), opens Linear tickets for each issue class with affected row counts, and publishes a digest to Rob showing the week-over-week data quality score.",
      "The audit doesn't fix anything autonomously. It makes the problem visible on a weekly rhythm so the RevOps team can keep ahead of it without relying on one person noticing.",
    ],
    acceptanceCriteria: [
      "A scheduled Claude Code run fires every Monday at 6am Pacific inside Vercel Sandbox via Vercel Cron.",
      "Six data quality checks run deterministically against Snowflake: duplicate account detection (fuzzy match on name + domain), orphan contact detection, ownership conflict detection, stale pipeline detection (opps past stage SLA), missing required field detection, bad email format detection.",
      "Claude is called only for the duplicate account check where deterministic matching is ambiguous. Every other check is pure SQL — no LLM cost, no LLM drift.",
      "Each anomaly class becomes one Linear ticket per week with the affected row count attached and a query link to the underlying Snowflake rows.",
      "A weekly digest posts to #gtm-tech-governance Slack by 7am Pacific Monday via Vercel Chat SDK: overall data quality score (0-100), week-over-week delta, top three issue classes by row count.",
      "The weekly score streams to Snowflake `data_quality_weekly` as a time series for trend analysis.",
      "Dupe disambiguation prompt is pass^k=1 on a 20-case gold set of known dupes and non-dupes before the ticket ships. No false-positive merges ever get auto-suggested.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Sense — Monday Cron Fires Claude Code",
        detail:
          "Vercel Cron fires Claude Code inside Vercel Sandbox every Monday at 6am Pacific. Claude Code reads the current SFDC data snapshot from Snowflake via MCP — accounts, contacts, opportunities, ownership, activity timestamps.",
        tools: ["snowflake", "mcp", "vercel-sandbox", "vercel-cron", "claude-code"],
      },
      {
        layer: 2,
        name: "Check — Six Deterministic SQL Checks",
        detail:
          "Claude Code runs six parameterized Snowflake queries: duplicate accounts (fuzzy match on name + domain), orphan contacts, ownership conflicts, stale pipeline records, missing required fields, bad email formats. Each query returns a row count and a query link. No LLM involvement at this layer — deterministic is cheap, fast, and auditable.",
        tools: ["snowflake", "mcp"],
      },
      {
        layer: 3,
        name: "Disambiguate — LLM Only for Ambiguous Dupes",
        detail:
          "For duplicate-account candidates where the deterministic check returns 'maybe' (similar names, different domains, similar URLs), Claude Code calls the LLM with the candidate pair and the full account metadata. Returns a merge recommendation with confidence. Anything below 0.85 stays flagged for human review rather than being auto-suggested.",
        tools: ["claude-code", "claude", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Record — Linear Tickets + Snowflake Trend",
        detail:
          "Claude Code opens one Linear ticket per issue class for the week via MCP, attaches the row counts and Snowflake query links, and tags the RevOps owner. Writes the weekly data quality score and per-class counts to Snowflake `data_quality_weekly` as a time series.",
        tools: ["linear", "snowflake", "mcp"],
      },
      {
        layer: 5,
        name: "Deliver — Monday Morning Digest to Slack",
        detail:
          "Claude Code posts the weekly digest to #gtm-tech-governance via Vercel Chat SDK by 7am Pacific Monday: overall data quality score, week-over-week delta, top three issue classes, and links to the Linear tickets just opened. Rob, John, and James are in the channel.",
        tools: ["vercel-chat-sdk", "slack", "mcp"],
      },
    ],
    stack: [
      "snowflake",
      "salesforce",
      "claude-code",
      "mcp",
      "vercel-sandbox",
      "vercel-cron",
      "claude",
      "vercel-ai-gateway",
      "linear",
      "vercel-chat-sdk",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Deterministic check queries + dupe gold set",
        tasks: [
          "Build the six Snowflake queries for the deterministic data quality checks. Validate each against known manual findings from the GTM-000 data integrity audit.",
          "Build the 20-case dupe detection gold set from real dupes and real non-dupes sourced from the Month 1 audit.",
          "Write the Claude Code prompt for dupe disambiguation. Iterate until pass^k=1 on the gold set — zero false merges allowed.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Linear integration, digest, canary Monday",
        tasks: [
          "Wire the Linear and Snowflake MCP servers into Claude Code. Open one test ticket per issue class against a dev Linear project.",
          "Build the Vercel Chat SDK digest for the #gtm-tech-governance Slack channel.",
          "Schedule the Monday 6am cron. Run a canary Monday where outputs go to a dev Linear project and a private Slack channel. Validate the digest looks right.",
          "Flip to production Monday. Publish the first real digest with Rob, John, and James in the channel.",
        ],
      },
    ],
    risks: [
      {
        risk: "False-positive duplicate detection suggests merging two legitimately different accounts.",
        likelihood: "High",
        mitigation:
          "Dupe disambiguation below 0.85 confidence never auto-suggests a merge — it flags for human review. Pass^k=1 on the 20-case gold set before ship. Rob or the RevOps lead makes the merge call, not the agent.",
      },
      {
        risk: "Weekly Linear ticket volume overwhelms RevOps.",
        likelihood: "Medium",
        mitigation:
          "One ticket per issue class per week, not one per anomaly. Row counts attached, not row dumps. The digest is the primary surface; Linear tickets are the backlog source RevOps picks from.",
      },
      {
        risk: "Data quality score becomes a vanity metric that doesn't drive action.",
        likelihood: "Medium",
        mitigation:
          "Weekly review with Rob establishes the score as a real KPI. If it trends flat or down for two consecutive weeks, the function prioritizes cleanup work over new workflow builds. Baked into the Month 2+ operating cadence.",
      },
    ],
    validation: [
      {
        metric: "Dupe disambiguation accuracy on gold set",
        target: "pass^k=1 on 20-case gold set before production ship",
        why: "False merges are catastrophic and hard to reverse. Zero tolerance floor.",
      },
      {
        metric: "Weekly digest delivered by 7am Monday Pacific",
        target: "100% of weeks for the first month of production",
        why: "The rhythm is the product. Miss a Monday and the weekly governance cadence breaks down.",
      },
      {
        metric: "Data quality score trend",
        target: "Improving or flat over 4-week rolling window",
        why: "The reason this exists. If the score trends down despite cleanup work, we're losing ground faster than we're fixing it and priorities need to shift.",
      },
    ],
    whyThisMatters:
      "Data integrity is the GTM BA job description's core responsibility that I was missing entirely from earlier drafts of this roadmap. Systems Governance isn't glamorous but it separates a BA who ships reliable workflows from a BA who ships workflows that quietly corrupt the CRM. Every workflow on this board depends on clean data under the hood — routing can't route correctly with broken hierarchy, expansion signals can't fire with ambiguous ownership, firm mapping can't write to Snowflake without poisoning the graph if dupes aren't resolved. This ticket makes data hygiene a weekly observable rather than a quarterly firedrill, and it's the kind of unsexy infrastructure work that a real GTM BA owns and a LARPing one skips.",
  },
];

export function getTicket(id: string): Ticket | undefined {
  return TICKETS.find((t) => t.id.toLowerCase() === id.toLowerCase());
}

export function getAllTickets(): Ticket[] {
  return TICKETS;
}
