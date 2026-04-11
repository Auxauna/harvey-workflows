import { TICKETS } from "@/lib/tickets";

export function ProjectHeader() {
  const totalEffort = TICKETS.length;
  const stackSize = new Set(TICKETS.flatMap((t) => t.stack)).size;

  return (
    <header className="hairline-b bg-bg-base px-10 py-10">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            Charter
          </span>
          <span className="h-px w-8 bg-border-strong" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            GTM Technology
          </span>
        </div>

        <h1 className="font-serif text-5xl font-medium text-fg-primary leading-[1.05] tracking-tight">
          First 90 Days
        </h1>

        <p className="mt-5 text-lg text-fg-secondary leading-relaxed max-w-3xl">
          A working charter for the first 90 days of GTM Technology at Harvey. The mandate:
          encode what the top performers in every GTM seat already do by hand, measure what that
          work is worth in rep time and pipeline impact, and ship the automations that give the
          time back. What follows is how we&apos;re framing the first 90 days, and a starter set
          of workflow examples showing how the work ships.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Stat label="Function" value="GTM Technology" />
          <Stat label="Sprint" value="First 90 Days" />
          <Stat label="Quarter" value="Q2 2026" />
          <Stat label="Workflow Examples" value={String(totalEffort)} />
          <Stat label="Tools in Stack" value={String(stackSize)} />
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</div>
      <div className="text-sm text-fg-primary mt-0.5">{value}</div>
    </div>
  );
}
