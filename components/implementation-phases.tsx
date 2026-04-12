import type { ImplementationPhase } from "@/lib/tickets";
import { SectionHeader } from "./background-section";

export function ImplementationPhases({ phases }: { phases: ImplementationPhase[] }) {
  return (
    <section>
      <SectionHeader label="Execution Plan" />
      <div className="space-y-4">
        {phases.map((phase, idx) => (
          <div key={phase.phase} className="hairline rounded-sm bg-bg-base">
            <div className="hairline-b flex items-baseline justify-between px-5 py-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                  Phase {phase.phase}
                </span>
                <h4 className="font-serif text-base font-medium text-fg-primary">{phase.title}</h4>
              </div>
              <span className="font-mono text-[11px] text-fg-subtle">{phase.weekRange}</span>
            </div>
            <ul className="px-5 py-4 space-y-2">
              {phase.tasks.map((task, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-fg-secondary leading-relaxed"
                >
                  <span className="font-mono text-[10px] text-fg-muted mt-1.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
