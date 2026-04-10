import { SectionHeader } from "./background-section";

export function AcceptanceCriteria({ criteria }: { criteria: string[] }) {
  return (
    <section>
      <SectionHeader label="Acceptance Criteria" />
      <ul className="space-y-3">
        {criteria.map((c, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] text-fg-secondary leading-relaxed">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
