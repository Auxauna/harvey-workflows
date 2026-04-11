const MONTHS = [
  {
    label: "Month 1",
    theme: "Diagnose (BA work)",
    items: [
      "Shadow 5 top performers (3 AEs, 2 CSMs)",
      "Interview 8 leaders across functions",
      "Baseline 6 metrics in Snowflake",
      "Triage existing Linear backlog",
      "Audit data integrity on top 50 accounts",
      "Publish diagnostic memo",
      "Week 4 quick win: ship GTM-001 canary",
    ],
  },
  {
    label: "Month 2",
    theme: "Translate",
    items: [
      "Convert shadow notes into GTM-002 + GTM-003 requirements",
      "Ship GTM-005 Competitive Radar on Gong infra",
      "Begin GTM-002 in shadow mode",
      "First weekly GTM-Tech review to Rob + John",
    ],
  },
  {
    label: "Month 3",
    theme: "Ship + Govern",
    items: [
      "Ship GTM-002 to production",
      "Ship GTM-003 with 500-lead confusion matrix",
      "Stand up GTM-006 Systems Governance (Monday audits)",
      "Defer GTM-004 to Month 4",
    ],
  },
];

export function RoadmapRhythm() {
  return (
    <section className="px-10 py-8">
      <div className="max-w-5xl">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            90-Day Rhythm
          </span>
          <span className="h-px flex-1 bg-border-hairline" />
        </div>
        <div className="hairline rounded-sm bg-bg-base grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]">
          {MONTHS.map((month) => (
            <div key={month.label} className="px-5 py-5">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
                  {month.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted text-right">
                  {month.theme}
                </span>
              </div>
              <ul className="space-y-1.5">
                {month.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-fg-secondary leading-snug"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
