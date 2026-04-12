import { TICKETS } from "@/lib/tickets";

export function ProjectHeader() {
  const pilotCount = TICKETS.filter((ticket) => ticket.id !== "GTM-000").length;

  return (
    <header className="hairline-b bg-bg-base px-10 py-10">
      <div className="max-w-5xl">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            Interview Portfolio
          </span>
          <span className="h-px w-8 bg-border-strong" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            GTM Business Analyst
          </span>
        </div>

        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-fg-primary">
          90-Day Operator Plan
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg-secondary">
          Business-first execution plan for Harvey GTM Technology: diagnose the business, establish
          governance and data clarity, then ship three tightly scoped workflow pilots with measurable
          outcomes.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Stat label="Operating Split" value="80% Operator / 20% Build" />
          <Stat label="Primary Asset" value="Operator Brief" />
          <Stat label="Pilot Workflows" value={String(pilotCount)} />
          <Stat label="Evidence Status" value="Verified + Assumptions Tagged" />
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</div>
      <div className="mt-0.5 text-sm text-fg-primary">{value}</div>
    </div>
  );
}
