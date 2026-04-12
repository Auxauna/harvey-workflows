export type Priority = "P0" | "P1" | "P2" | "P3";
export type Status = "ready" | "in_progress" | "backlog" | "shipped";
export type ClaimStatus = "verified" | "assumption" | "hypothesis";

export interface ArchitectureLayer {
  layer: number;
  name: string;
  detail: string;
  tools: string[];
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

export interface EvidenceBlock {
  problem: string;
  decision: string;
  toolFit: string;
  metric: string;
  owner: string;
  risk: string;
}

export interface SourceLink {
  label: string;
  url: string;
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
  background: string[];
  evidence: EvidenceBlock;
  acceptanceCriteria: string[];
  architecture: ArchitectureLayer[];
  stack: string[];
  implementation: ImplementationPhase[];
  risks: Risk[];
  validation: ValidationMetric[];
  whyThisMatters: string;
  claimStatus: ClaimStatus;
  sources: SourceLink[];
}

export const TICKETS: Ticket[] = [
  {
    id: "GTM-000",
    title: "Month 1 Diagnostic + Operating Baseline",
    priority: "P0",
    effort: "4 weeks",
    sprint: "Days 1-30",
    status: "ready",
    reporter: "GTM Technology",
    labels: ["diagnostic", "governance", "baseline", "operating-system"],
    oneLiner:
      "Run a business-first diagnostic, publish one shared GTM system map, and establish KPI + governance cadence before scaling automation.",
    firstPrinciples:
      "Operator judgment comes first. A workflow is only useful if it solves a prioritized business problem and is measurable in the operating rhythm.",
    background: [
      "Harvey's GTM Business Analyst role is explicitly hybrid: consultant-style requirements translation, stack-level advisory ownership, and selective AI automation delivery.",
      "The first 30 days should create shared context: who owns which process, where truth lives, and which bottlenecks are worth automating now versus later.",
      "This ticket is the load-bearing foundation for the other three pilots. If this diagnostic is weak, every automation claim is weak.",
    ],
    evidence: {
      problem:
        "Cross-functional GTM asks compete without a shared prioritization rubric or common KPI baseline.",
      decision:
        "Ship a Month-1 operator baseline first: discovery, system map, KPI baseline, and weekly decision cadence.",
      toolFit:
        "Notion for operating artifacts, Linear for intake/triage, SFDC/Marketo/Zendesk as systems of record, Fivetran + Snowflake for cross-system reporting.",
      metric:
        "Six baseline KPIs published weekly with owner-level accountability.",
      owner: "GTM Business Analyst (DRI) + James Hunsberger + RevOps partners",
      risk: "Stakeholder bandwidth in Month 1 slows discovery and decision speed.",
    },
    acceptanceCriteria: [
      "Complete structured discovery: 5 shadow sessions and 8 stakeholder interviews with notes published in Notion.",
      "Publish one GTM system map documenting source-of-truth ownership for lead, account, opportunity, support, and activity data.",
      "Define and publish 6 baseline KPIs with formulas, data owner, refresh cadence, and target direction.",
      "Stand up weekly intake with James and a monthly roadmap review with GTM leadership.",
      "Deliver a Month-1 readout with top bottlenecks, priority ranking, and pilot go/no-go decisions.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Discover",
        detail:
          "Shadow high-performing reps and run cross-functional interviews using one question set. Capture observations as structured Notion pages.",
        tools: ["notion", "gong", "slack"],
      },
      {
        layer: 2,
        name: "Map",
        detail:
          "Create the current-state GTM systems map: source of truth, handoffs, failure points, and ownership by team.",
        tools: ["salesforce", "marketo", "zendesk", "notion"],
      },
      {
        layer: 3,
        name: "Baseline",
        detail:
          "Define KPI logic in business language, then align operational dashboards in SFDC and governance reporting in Snowflake.",
        tools: ["salesforce", "fivetran", "snowflake"],
      },
      {
        layer: 4,
        name: "Prioritize",
        detail:
          "Use a scoring rubric (impact, effort, risk, dependency) to rank incoming asks and select the first three pilots.",
        tools: ["linear", "notion"],
      },
      {
        layer: 5,
        name: "Operate",
        detail:
          "Run weekly decision cadence with explicit owners, due dates, and rollback criteria for each selected pilot.",
        tools: ["linear", "notion", "slack"],
      },
    ],
    stack: [
      "salesforce",
      "marketo",
      "zendesk",
      "linear",
      "notion",
      "fivetran",
      "snowflake",
      "gong",
      "slack",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Discovery and stakeholder alignment",
        tasks: [
          "Run first round of shadow sessions and leadership interviews.",
          "Stand up weekly GTM Technology intake cadence.",
          "Draft initial list of bottlenecks and unresolved ownership issues.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "System map and KPI definitions",
        tasks: [
          "Publish source-of-truth map and critical handoff points.",
          "Define KPI formulas, data owners, and reporting cadence.",
          "Confirm which reporting lives in SFDC versus Snowflake.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Backlog triage and pilot selection",
        tasks: [
          "Apply prioritization rubric to active backlog items.",
          "Select 3 pilots with owners, gates, and success criteria.",
          "Document dependencies and support needs by function.",
        ],
      },
      {
        phase: 4,
        weekRange: "Week 4",
        title: "Month-1 operator readout",
        tasks: [
          "Deliver readout with findings, ranked opportunities, and implementation sequence.",
          "Publish governance calendar for weekly and monthly review rituals.",
          "Lock 60-day execution plan for GTM-001 through GTM-003.",
        ],
      },
    ],
    risks: [
      {
        risk: "Discovery produces conflicting priorities across Sales, Marketing, and Success.",
        likelihood: "High",
        mitigation:
          "Treat conflicts as decision inputs. Escalate tradeoffs in a single weekly decision log with named approvers.",
      },
      {
        risk: "KPI baseline debates block execution.",
        likelihood: "Medium",
        mitigation:
          "Freeze v1 KPI definitions in Month 1 and allow monthly revisions with version history.",
      },
      {
        risk: "Too many asks create delivery thrash.",
        likelihood: "High",
        mitigation:
          "Limit to three pilots and enforce prioritization rubric before any new build starts.",
      },
    ],
    validation: [
      {
        metric: "Discovery coverage",
        target: "5 shadow sessions + 8 stakeholder interviews",
        why: "Ensures requirements are grounded in real GTM workflow pain.",
      },
      {
        metric: "Baseline KPI completeness",
        target: "6 KPIs with owner, formula, and refresh cadence",
        why: "Creates common language for ROI and governance.",
      },
      {
        metric: "Cadence adoption",
        target: "Weekly intake + monthly roadmap review running by end of Month 1",
        why: "Proves operating discipline, not one-off documentation.",
      },
    ],
    whyThisMatters:
      "This is the no-regret work. It shows you can walk in, create clarity, and run the function before promising automation outcomes.",
    claimStatus: "verified",
    sources: [
      {
        label: "Harvey GTM Business Analyst listing",
        url: "https://app.welcometothejungle.com/jobs/A-tsiqMg",
      },
      {
        label: "Fivetran Salesforce setup guide",
        url: "https://fivetran.com/docs/connectors/applications/salesforce/setup-guide",
      },
      {
        label: "Snowflake dynamic tables",
        url: "https://docs.snowflake.com/en/user-guide/dynamic-tables-about",
      },
    ],
  },
  {
    id: "GTM-001",
    title: "Pre-Call Brief Workflow (Quick Win)",
    priority: "P1",
    effort: "2 weeks",
    sprint: "Days 31-45",
    status: "ready",
    reporter: "Sales Leadership",
    labels: ["rep-productivity", "quick-win", "seller-experience"],
    oneLiner:
      "Generate a concise pre-call brief with grounded context and deliver it where reps already work.",
    firstPrinciples:
      "Useful automation removes prep friction without adding trust debt. Citation and reviewability matter more than length.",
    background: [
      "Reps lose high-value time stitching account context before meetings.",
      "The workflow should produce a reusable artifact (Notion) with a lightweight approval and feedback loop (Slack).",
      "This is a fast trust-building win after Month-1 diagnostic work.",
    ],
    evidence: {
      problem:
        "Meeting prep is repetitive and inconsistent, causing avoidable rep-time loss and variable call quality.",
      decision:
        "Ship a pre-call brief workflow with strict structure, source grounding, and a one-click feedback loop.",
      toolFit:
        "Vercel Workflow orchestrates steps, AI SDK handles generation/tool calling, Clay enriches contacts, SFDC/Gong provide account history, Notion stores artifact, Slack handles approvals.",
      metric: "Average prep-time reduction per meeting and rep adoption rate.",
      owner: "GTM Business Analyst + Sales Enablement pod lead",
      risk: "If brief quality is inconsistent, reps will stop opening it.",
    },
    acceptanceCriteria: [
      "Brief generated before qualifying external meetings and delivered via Slack with Notion link.",
      "Brief includes account summary, current opportunity context, recent conversation signals, and suggested talking points.",
      "Each section includes a source pointer to SFDC/Gong/Clay input.",
      "Rep feedback (helpful/not helpful) is captured and routed into retune backlog.",
      "Workflow has fallback behavior for missing data and never ships partial output as complete.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Trigger",
        detail:
          "Scheduled or event trigger starts a workflow for qualifying meetings.",
        tools: ["vercel-cron", "vercel-workflow", "salesforce"],
      },
      {
        layer: 2,
        name: "Context hydration",
        detail:
          "Gather meeting/account context from SFDC + Gong and enrich contact/account fields from Clay.",
        tools: ["salesforce", "gong", "clay"],
      },
      {
        layer: 3,
        name: "Draft generation",
        detail:
          "Generate structured brief with AI SDK and log model usage through AI Gateway.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Human-in-the-loop delivery",
        detail:
          "Write brief to Notion and send Slack notification with feedback controls.",
        tools: ["notion", "slack"],
      },
      {
        layer: 5,
        name: "Feedback and analytics",
        detail:
          "Store feedback in Linear for tuning and mirror adoption metrics to Snowflake.",
        tools: ["linear", "fivetran", "snowflake"],
      },
    ],
    stack: [
      "vercel-workflow",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "vercel-cron",
      "salesforce",
      "gong",
      "clay",
      "notion",
      "slack",
      "linear",
      "fivetran",
      "snowflake",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Template + quality bar",
        tasks: [
          "Define brief template with sales leaders and top reps.",
          "Build a small gold set of hand-written briefs for quality comparison.",
          "Finalize source hierarchy and missing-data fallback rules.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Canary rollout",
        tasks: [
          "Run shadow mode for one rep pod.",
          "Enable live delivery after quality sign-off.",
          "Review usage and feedback daily, then lock v1 for broader rollout.",
        ],
      },
    ],
    risks: [
      {
        risk: "Low relevance for some meeting types.",
        likelihood: "Medium",
        mitigation:
          "Start with highest-volume meeting type and expand after quality targets are met.",
      },
      {
        risk: "Incomplete source data degrades trust.",
        likelihood: "Medium",
        mitigation:
          "Show data freshness and omit sections when source confidence is low.",
      },
      {
        risk: "Workflow creates notification fatigue.",
        likelihood: "Low",
        mitigation:
          "Gate by meeting criteria and provide per-rep delivery preferences.",
      },
    ],
    validation: [
      {
        metric: "Rep adoption",
        target: ">=70% open rate in canary pod",
        why: "Adoption is the first indicator that the workflow is actually useful.",
      },
      {
        metric: "Prep-time saved",
        target: "10+ minutes self-reported average per qualifying meeting",
        why: "Directly ties to the workflow's business case.",
      },
      {
        metric: "Quality sentiment",
        target: ">=70% helpful feedback after week 1 live",
        why: "Protects trust before scaling distribution.",
      },
    ],
    whyThisMatters:
      "It demonstrates agency with controlled risk: visible seller impact, fast iteration, and measurable ROI.",
    claimStatus: "verified",
    sources: [
      {
        label: "Vercel Workflow docs",
        url: "https://vercel.com/docs/workflow",
      },
      {
        label: "AI SDK docs",
        url: "https://ai-sdk.dev/docs",
      },
      {
        label: "Clay waterfall enrichment",
        url: "https://www.clay.com/waterfall-enrichment",
      },
      {
        label: "Notion API reference",
        url: "https://developers.notion.com/reference",
      },
    ],
  },
  {
    id: "GTM-002",
    title: "Segment Routing + Human Review Queue",
    priority: "P1",
    effort: "3 weeks",
    sprint: "Days 46-70",
    status: "ready",
    reporter: "Marketing + Sales + RevOps",
    labels: ["lead-routing", "core-system", "governance"],
    oneLiner:
      "Classify inbound leads into clear GTM segments with confidence gating and explicit human review for ambiguous cases.",
    firstPrinciples:
      "A routing model is an operations decision system, not just a model output. Transparency and override design determine trust.",
    background: [
      "Lead quality and handoff speed suffer when segmentation logic is implicit or inconsistently applied.",
      "This workflow enforces explicit criteria, confidence thresholds, and auditability.",
      "The goal is reliable first-touch routing, not autonomous decision-making without oversight.",
    ],
    evidence: {
      problem:
        "Leads are not consistently routed to the best owner, creating SLA misses and conversion loss.",
      decision:
        "Implement a confidence-gated routing workflow with mandatory human review below threshold.",
      toolFit:
        "Marketo/SFDC provide trigger + routing destination, Clay or Scalestack provide enrichment inputs, Vercel Workflow handles stateful branching, AI SDK handles classification, Slack supports reviewer queue.",
      metric: "Misroute rate, time-to-first-touch by segment, and review queue aging.",
      owner: "GTM Business Analyst + RevOps routing owner",
      risk: "False confidence can push bad auto-routes into production.",
    },
    acceptanceCriteria: [
      "Every qualifying inbound lead receives segment, confidence, and reasoning fields.",
      "Above-threshold leads auto-route; below-threshold leads enter a reviewer queue.",
      "Reviewers can approve, override, or reclassify with one action.",
      "All routing outcomes are logged with reason code for monthly audits.",
      "No route goes live without shadow-mode evaluation against historical outcomes.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Inbound signal",
        detail: "Marketo and SFDC handoff triggers a routing workflow execution.",
        tools: ["marketo", "salesforce", "vercel-workflow"],
      },
      {
        layer: 2,
        name: "Enrichment",
        detail:
          "Hydrate firmographic/context fields via Clay or Scalestack based on final stack choice in Month 1.",
        tools: ["clay", "scalestack"],
      },
      {
        layer: 3,
        name: "Classification",
        detail:
          "AI SDK returns segment label, confidence score, and machine-readable reason string.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway"],
      },
      {
        layer: 4,
        name: "Route and review",
        detail:
          "Auto-route high confidence; send low confidence to Slack review queue; write final result to SFDC.",
        tools: ["salesforce", "slack", "vercel-workflow"],
      },
      {
        layer: 5,
        name: "Governance reporting",
        detail:
          "Mirror routing logs to Snowflake for SLA, misroute, and reviewer-performance tracking.",
        tools: ["fivetran", "snowflake", "notion"],
      },
    ],
    stack: [
      "marketo",
      "salesforce",
      "clay",
      "scalestack",
      "vercel-workflow",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "slack",
      "fivetran",
      "snowflake",
      "notion",
      "linear",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Routing criteria and historical benchmark",
        tasks: [
          "Define segment rubric with GTM leaders and revops.",
          "Build historical benchmark set from known outcomes.",
          "Set initial confidence threshold and reviewer SLA.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Workflow and review queue",
        tasks: [
          "Implement workflow branching and reviewer interactions.",
          "Run in shadow mode and compare against current routing.",
          "Tune reason codes and reviewer UX before go-live.",
        ],
      },
      {
        phase: 3,
        weekRange: "Week 3",
        title: "Canary and governance",
        tasks: [
          "Launch to one route group with daily audit review.",
          "Track misroutes and SLA adherence.",
          "Publish first monthly governance snapshot.",
        ],
      },
    ],
    risks: [
      {
        risk: "Overfitting to old lead patterns.",
        likelihood: "Medium",
        mitigation:
          "Use monthly retune cycle with reviewer overrides as supervised feedback.",
      },
      {
        risk: "Human review queue bottlenecks response time.",
        likelihood: "Medium",
        mitigation:
          "Set queue SLA, backup reviewer rotation, and escalation path in Slack.",
      },
      {
        risk: "Ambiguous segment criteria create inconsistent overrides.",
        likelihood: "High",
        mitigation:
          "Keep explicit rubric and review override reasons in a versioned playbook.",
      },
    ],
    validation: [
      {
        metric: "Misroute rate",
        target: "<5% after first month live",
        why: "Primary quality indicator for routing trust.",
      },
      {
        metric: "Reviewer queue SLA",
        target: "95% reviewed within business-day SLA",
        why: "Prevents governance from becoming a speed bottleneck.",
      },
      {
        metric: "First-touch latency",
        target: "Improved by segment vs Month-1 baseline",
        why: "Confirms routing changes improve actual GTM execution.",
      },
    ],
    whyThisMatters:
      "This is core infrastructure work: better routing quality compounds across conversion, speed, and rep utilization.",
    claimStatus: "verified",
    sources: [
      {
        label: "Harvey GTM BA role text",
        url: "https://app.welcometothejungle.com/jobs/A-tsiqMg",
      },
      {
        label: "Vercel Workflow docs",
        url: "https://vercel.com/docs/workflow",
      },
      {
        label: "AI SDK tool calling",
        url: "https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling",
      },
    ],
  },
  {
    id: "GTM-003",
    title: "Competitive Mention Assist (Innovation Pilot)",
    priority: "P2",
    effort: "2 weeks",
    sprint: "Days 71-90",
    status: "backlog",
    reporter: "Sales Leadership",
    labels: ["innovation", "competitive", "assistive-ai"],
    oneLiner:
      "Detect competitive mentions from conversation and email context, then deliver concise, reviewable counters to account owners.",
    firstPrinciples:
      "This is an assistive pilot, not a core system. It should improve seller response quality without pretending to be a single source of truth.",
    background: [
      "Competitive objections are high-stakes moments where reps need context quickly.",
      "A lightweight assistive workflow can increase consistency while preserving human judgment.",
      "As a pilot, it should be scoped, measured, and easy to turn off.",
    ],
    evidence: {
      problem:
        "Competitive responses vary by rep and often depend on memory rather than current guidance.",
      decision:
        "Pilot an assistive workflow that surfaces likely mention context and draft counters tied to a maintained battlecard.",
      toolFit:
        "Gong + SFDC provide signal source, Notion stores versioned battlecard, AI SDK handles classification/suggestion, Slack delivers recommendations.",
      metric: "Adoption of assist cards and qualitative rep usefulness score.",
      owner: "GTM Business Analyst + Product Marketing partner",
      risk: "Low-quality suggestions can reduce trust and clutter rep workflows.",
    },
    acceptanceCriteria: [
      "Workflow flags candidate mentions and classifies context before sending any recommendation.",
      "Suggestions reference the active Notion battlecard source.",
      "Reps can dismiss suggestions and submit quality feedback quickly.",
      "Pilot remains opt-in and canary-scoped through initial launch window.",
      "Weekly digest summarizes mention volume, usage, and quality feedback.",
    ],
    architecture: [
      {
        layer: 1,
        name: "Signal ingest",
        detail: "Pull recent call/email context on a schedule for candidate mention scanning.",
        tools: ["gong", "salesforce", "vercel-cron"],
      },
      {
        layer: 2,
        name: "Classify",
        detail:
          "Use AI SDK to classify mention intent and extract concise objection text.",
        tools: ["vercel-ai-sdk", "vercel-ai-gateway"],
      },
      {
        layer: 3,
        name: "Battlecard match",
        detail:
          "Retrieve current battlecard guidance from Notion and produce suggestion variants.",
        tools: ["notion", "vercel-workflow"],
      },
      {
        layer: 4,
        name: "Rep delivery",
        detail:
          "Send assist card in Slack with accept/dismiss feedback controls.",
        tools: ["slack"],
      },
      {
        layer: 5,
        name: "Pilot analytics",
        detail:
          "Track usage and quality feedback in Linear and Snowflake for weekly review.",
        tools: ["linear", "fivetran", "snowflake"],
      },
    ],
    stack: [
      "gong",
      "salesforce",
      "notion",
      "slack",
      "vercel-cron",
      "vercel-workflow",
      "vercel-ai-sdk",
      "vercel-ai-gateway",
      "linear",
      "fivetran",
      "snowflake",
    ],
    implementation: [
      {
        phase: 1,
        weekRange: "Week 1",
        title: "Pilot design",
        tasks: [
          "Define mention taxonomy and quality rubric with Sales + Product Marketing.",
          "Set battlecard template and update cadence in Notion.",
          "Build canary cohort and opt-in criteria.",
        ],
      },
      {
        phase: 2,
        weekRange: "Week 2",
        title: "Canary execution",
        tasks: [
          "Run pilot for small rep cohort with daily quality checks.",
          "Review false positives and reduce noise.",
          "Decide continue/iterate/stop using explicit pilot gates.",
        ],
      },
    ],
    risks: [
      {
        risk: "Suggestions are generic and ignored.",
        likelihood: "Medium",
        mitigation:
          "Co-own battlecard quality with Product Marketing and use rep feedback as a hard gate.",
      },
      {
        risk: "False positives create alert fatigue.",
        likelihood: "High",
        mitigation:
          "Use confidence thresholding and dedupe by account + timeframe.",
      },
      {
        risk: "Pilot scope expands prematurely.",
        likelihood: "Medium",
        mitigation:
          "Keep explicit pilot charter and require go/no-go review before any scale-up.",
      },
    ],
    validation: [
      {
        metric: "Assist card usage",
        target: ">=40% interaction rate in pilot cohort",
        why: "Shows whether reps find recommendations actionable.",
      },
      {
        metric: "Quality sentiment",
        target: ">=70% positive feedback on used cards",
        why: "Prevents scaling low-trust suggestions.",
      },
      {
        metric: "Noise rate",
        target: "Declining false-positive rate week over week",
        why: "Ensures pilot improves signal quality over time.",
      },
    ],
    whyThisMatters:
      "It proves creative agency in the 20% lane without distracting from core operating system work.",
    claimStatus: "hypothesis",
    sources: [
      {
        label: "Notion API reference",
        url: "https://developers.notion.com/reference",
      },
      {
        label: "AI SDK docs",
        url: "https://ai-sdk.dev/docs",
      },
      {
        label: "Vercel Cron quickstart",
        url: "https://vercel.com/docs/cron-jobs/quickstart",
      },
    ],
  },
];

export function getTicket(id: string): Ticket | undefined {
  return TICKETS.find((ticket) => ticket.id.toLowerCase() === id.toLowerCase());
}

export function getAllTickets(): Ticket[] {
  return TICKETS;
}
