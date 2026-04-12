const PHASES = [
  {
    label: "Days 1-30",
    theme: "Diagnose + Align",
    items: [
      "Shadow key GTM workflows and run cross-functional interviews",
      "Publish current-state system map with ownership",
      "Set KPI baseline and reporting cadence",
      "Stand up weekly intake + monthly roadmap review",
      "Finalize pilot gates for GTM-001 to GTM-003",
    ],
  },
  {
    label: "Days 31-60",
    theme: "Ship Core",
    items: [
      "Launch GTM-001 Pre-call brief canary",
      "Launch GTM-002 routing shadow mode",
      "Track adoption, quality, and exception handling",
      "Retune based on rep and RevOps feedback",
    ],
  },
  {
    label: "Days 61-90",
    theme: "Scale + Govern",
    items: [
      "Harden GTM-002 with confidence + review controls",
      "Run GTM-003 competitive assist as scoped innovation pilot",
      "Publish monthly governance readout",
      "Lock next-quarter roadmap from measured impact",
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

        <div className="grid grid-cols-1 divide-[var(--border-hairline)] rounded-sm bg-bg-base hairline md:grid-cols-3 md:divide-x md:divide-y-0">
          {PHASES.map((phase) => (
            <div key={phase.label} className="px-5 py-5">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
                  {phase.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-right text-fg-muted">
                  {phase.theme}
                </span>
              </div>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug text-fg-secondary">
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
