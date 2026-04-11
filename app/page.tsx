import { MobileShell } from "@/components/mobile-shell";
import { ProjectHeader } from "@/components/project-header";
import { TicketCard } from "@/components/ticket-card";
import { TICKETS } from "@/lib/tickets";

export default function Home() {
  return (
    <MobileShell>
      <ProjectHeader />

        <div className="px-10 py-8">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              Workflows · {TICKETS.length}
            </h2>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              <span>Sorted by Sprint</span>
            </div>
          </div>

          <div className="hairline rounded-sm bg-bg-base">
            {TICKETS.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>

          <div className="mt-12 hairline rounded-sm bg-bg-subtle px-6 py-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted mb-2">
              How to read this board
            </div>
            <p className="text-sm text-fg-secondary leading-relaxed font-serif">
              Each ticket is structured as a real Linear-style issue, written in the voice Drew
              Bredvick uses for Vercel&apos;s GTM agents: shadow the best performer, scope
              ruthlessly, vibe code the prototype, ship the weekend MVP, measure the ROI. GTM-002
              is the structured answer to the Firecrawl question James asked me in our DMs on
              April 10. Every ticket leads with the problem, names the top performer move, and
              shows the ROI math before the architecture.
            </p>
          </div>
        </div>
    </MobileShell>
  );
}
