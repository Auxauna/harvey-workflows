import type { Risk } from "@/lib/tickets";
import { SectionHeader } from "./background-section";

const LIKELIHOOD_COLOR: Record<Risk["likelihood"], string> = {
  Low: "bg-accent-forest-bg text-accent-forest",
  Medium: "bg-accent-amber-bg text-accent-amber",
  High: "bg-accent-claret-bg text-accent-claret",
};

export function RisksTable({ risks }: { risks: Risk[] }) {
  return (
    <section>
      <SectionHeader label="Risks & Mitigations" />
      <div className="hairline rounded-sm overflow-hidden">
        {risks.map((risk, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto_2fr] gap-5 px-5 py-4 ${i > 0 ? "hairline-t" : ""}`}
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted mb-1.5">
                Risk
              </div>
              <p className="text-sm text-fg-primary leading-snug">{risk.risk}</p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted mb-1.5">
                Likelihood
              </div>
              <span
                className={`inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${LIKELIHOOD_COLOR[risk.likelihood]}`}
              >
                {risk.likelihood}
              </span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted mb-1.5">
                Mitigation
              </div>
              <p className="text-sm text-fg-secondary leading-snug">{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
