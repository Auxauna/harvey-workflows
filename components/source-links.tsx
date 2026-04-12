import type { SourceLink } from "@/lib/tickets";
import { SectionHeader } from "./background-section";

export function SourceLinks({ sources }: { sources: SourceLink[] }) {
  return (
    <section>
      <SectionHeader label="Sources" />
      <ul className="space-y-2">
        {sources.map((source) => (
          <li key={source.url} className="text-sm text-fg-secondary leading-relaxed">
            <a href={source.url} target="_blank" rel="noreferrer" className="text-accent-forest hover:underline">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
