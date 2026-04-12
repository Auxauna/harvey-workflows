import Link from "next/link";

const CONTEXT_POINTS = [
  "Harvey serves legal and professional services teams with a platform that includes Assistant, Vault, Knowledge, Workflow Agents, and ecosystem integrations.",
  "ICP spans law firms and in-house legal teams with complex workflows, high trust requirements, and pressure to increase output without increasing headcount.",
  "GTM pain to solve in first 90 days: inconsistent routing, fragmented context across systems, and weak cross-functional KPI governance.",
];

const SYSTEM_MAP = [
  {
    lane: "Operational Systems",
    tools: "Salesforce, Marketo, Zendesk, Gong",
    owner: "RevOps + functional teams",
    decision: "Use these as system-of-record sources for lifecycle execution.",
  },
  {
    lane: "Data + Governance",
    tools: "Fivetran -> Snowflake",
    owner: "RevOps + Data",
    decision: "Cross-system KPI reporting and auditability live here.",
  },
  {
    lane: "Operating Artifacts",
    tools: "Notion + Linear",
    owner: "GTM Business Analyst",
    decision: "Discovery notes, decision log, runbooks, and roadmap accountability.",
  },
  {
    lane: "Workflow Execution",
    tools: "Vercel Workflow + AI SDK + AI Gateway",
    owner: "GTM Technology",
    decision: "Stateful, observable workflow runtime for selected automations.",
  },
];

const CADENCE = [
  {
    label: "Days 1-30",
    focus: "Diagnose + Align",
    output:
      "System map, KPI baseline, prioritization rubric, and decision cadence running weekly.",
  },
  {
    label: "Days 31-60",
    focus: "Ship Core Pilots",
    output:
      "Pre-call brief and segment routing canaries with adoption + quality tracking.",
  },
  {
    label: "Days 61-90",
    focus: "Scale + Govern",
    output:
      "Routing hardening, pilot decisions, monthly governance readout, and next-quarter roadmap.",
  },
];

const PILOTS = [
  {
    id: "GTM-001",
    title: "Pre-call brief",
    why: "Quick seller productivity win.",
  },
  {
    id: "GTM-002",
    title: "Segment routing + human review",
    why: "Core system quality and response-speed improvement.",
  },
  {
    id: "GTM-003",
    title: "Competitive mention assist (pilot)",
    why: "20% innovation lane with controlled scope.",
  },
];

const ROI_MODEL = [
  "Weekly: intake throughput, SLA adherence, and open risk log.",
  "Biweekly: pilot quality and adoption review with go/no-go gates.",
  "Monthly: KPI trend review (conversion, speed, data quality, rep productivity) with leadership decisions.",
  "Quarterly: roadmap reset based on measured impact and dependency changes.",
];

const SOURCES = [
  {
    label: "Harvey homepage",
    url: "https://www.harvey.ai/",
  },
  {
    label: "Harvey collaboration solution",
    url: "https://www.harvey.ai/solutions/collaboration",
  },
  {
    label: "Harvey Deutsche Telekom customer story",
    url: "https://www.harvey.ai/brand/customers/deutsche-telekom",
  },
  {
    label: "Harvey GTM Business Analyst listing",
    url: "https://app.welcometothejungle.com/jobs/A-tsiqMg",
  },
  {
    label: "Vercel Workflow docs",
    url: "https://vercel.com/docs/workflow",
  },
  {
    label: "Vercel AI SDK docs",
    url: "https://ai-sdk.dev/docs",
  },
  {
    label: "Notion API reference",
    url: "https://developers.notion.com/reference",
  },
  {
    label: "Clay Salesforce integration docs",
    url: "https://university.clay.com/docs/salesforce-integration-overview",
  },
  {
    label: "Fivetran Salesforce setup",
    url: "https://fivetran.com/docs/connectors/applications/salesforce/setup-guide",
  },
  {
    label: "Snowflake dynamic tables",
    url: "https://docs.snowflake.com/en/user-guide/dynamic-tables-about",
  },
];

export function OperatorBrief() {
  return (
    <section className="px-10 py-8">
      <div className="max-w-5xl space-y-10">
        <div className="hairline rounded-sm bg-bg-subtle px-6 py-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            Operator Brief (Primary Asset)
          </div>
          <p className="text-sm leading-relaxed text-fg-secondary">
            This portfolio is intentionally business-first: 80% operating-system work (diagnosis,
            governance, instrumentation) and 20% pilot automation. The goal is to show day-one
            judgment, not architecture theater.
          </p>
        </div>

        <section>
          <Header label="1. Business Context" />
          <ul className="space-y-2">
            {CONTEXT_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-fg-secondary">
                <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Header label="2. Current-State System Map" />
          <div className="space-y-3">
            {SYSTEM_MAP.map((row) => (
              <div key={row.lane} className="hairline rounded-sm bg-bg-base px-5 py-4">
                <div className="mb-1 text-sm font-medium text-fg-primary">{row.lane}</div>
                <div className="text-xs text-fg-muted font-mono">{row.tools}</div>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{row.decision}</p>
                <div className="mt-2 text-xs text-fg-subtle">Owner: {row.owner}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Header label="3. 30/60/90 Cadence" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {CADENCE.map((item) => (
              <div key={item.label} className="hairline rounded-sm bg-bg-base px-4 py-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">{item.label}</div>
                <div className="mt-1 text-sm font-medium text-fg-primary">{item.focus}</div>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{item.output}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Header label="4. Three Pilot Workflows" />
          <div className="space-y-2">
            {PILOTS.map((pilot) => (
              <div key={pilot.id} className="hairline rounded-sm bg-bg-base px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-fg-primary">{pilot.id} - {pilot.title}</div>
                    <div className="text-sm text-fg-secondary">{pilot.why}</div>
                  </div>
                  <Link
                    href={`/tickets/${pilot.id.toLowerCase()}`}
                    className="font-mono text-[11px] text-accent-forest hover:underline"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Header label="5. ROI + Governance Model" />
          <ul className="space-y-2">
            {ROI_MODEL.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-fg-secondary">
                <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Header label="Assumptions" />
          <div className="space-y-2 text-sm leading-relaxed text-fg-secondary">
            <p>
              Treat "Harvey bought Vercel" as unverified unless primary-source confirmation is
              provided.
            </p>
            <p>
              Tool stack details not directly documented by Harvey are framed as implementation
              assumptions to validate in Month 1.
            </p>
          </div>
        </section>

        <section>
          <Header label="Source Pack" />
          <ul className="space-y-2">
            {SOURCES.map((source) => (
              <li key={source.url} className="text-sm text-fg-secondary leading-relaxed">
                <a href={source.url} target="_blank" rel="noreferrer" className="text-accent-forest hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

function Header({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">{label}</span>
      <span className="h-px flex-1 bg-border-hairline" />
    </div>
  );
}
