import type { ValidationMetric } from "@/lib/tickets";
import { SectionHeader } from "./background-section";

export function ValidationPlan({ metrics }: { metrics: ValidationMetric[] }) {
  return (
    <section>
      <SectionHeader label="Validation Plan" />
      <div className="space-y-3">
        {metrics.map((m, i) => (
          <div key={i} className="hairline rounded-sm bg-bg-base px-5 py-4">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h4 className="font-serif text-base font-medium text-fg-primary">{m.metric}</h4>
              <span className="font-mono text-xs text-accent-forest tabular-nums whitespace-nowrap">
                {m.target}
              </span>
            </div>
            <p className="text-sm text-fg-secondary leading-relaxed">{m.why}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
