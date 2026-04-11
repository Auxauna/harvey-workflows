import { TICKETS } from "@/lib/tickets";

export function ProjectHeader() {
  const totalEffort = TICKETS.length;
  const stackSize = new Set(TICKETS.flatMap((t) => t.stack)).size;

  return (
    <header className="hairline-b bg-bg-base px-10 py-10">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            Project
          </span>
          <span className="h-px w-8 bg-border-strong" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            GTM Technology Roadmap
          </span>
        </div>

        <h1 className="font-serif text-5xl font-medium text-fg-primary leading-[1.05] tracking-tight">
          First 90 Days at Harvey
        </h1>

        <p className="mt-5 text-lg text-fg-secondary leading-relaxed max-w-3xl">
          A working roadmap of four GTM workflow automations I would prioritize as Harvey&apos;s
          first GTM Business Analyst hire. Each ticket follows the shape Drew Bredvick built into
          Vercel&apos;s first GTM agent — shadow the best performer, scope ruthlessly, ship the
          weekend MVP, measure the ROI. Built on Harvey&apos;s actual GTM stack and the Vercel AI
          primitives Drew uses internally.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Stat label="Tickets" value={String(totalEffort)} />
          <Stat label="Tools in Stack" value={String(stackSize)} />
          <Stat label="Built By" value="Jacob Rucker" />
          <Stat label="For" value="James Hunsberger" />
          <Stat label="Date" value="April 2026" />
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
