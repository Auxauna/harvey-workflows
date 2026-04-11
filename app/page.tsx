import { MobileShell } from "@/components/mobile-shell";
import { ProjectHeader } from "@/components/project-header";
import { RoadmapRhythm } from "@/components/roadmap-rhythm";
import { TicketCard } from "@/components/ticket-card";
import { TICKETS } from "@/lib/tickets";

export default function Home() {
  return (
    <MobileShell>
      <ProjectHeader />
      <RoadmapRhythm />

      <div className="px-10 py-8">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            Tickets · {TICKETS.length}
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
            Seven Linear-style tickets. GTM-000 is the Month 1 BA diagnostic — shadow,
            interview, baseline, triage, audit — and it&apos;s a first-class deliverable,
            not a preamble. GTM-001 through GTM-006 are the workflow examples that ship in
            Months 2 and 3, each one grounded in what Month 1 uncovers. Every ticket opens
            with its own first-principles framing, because the JD asks for a portfolio of
            AI first principles — not a copy-paste template. See the about page for the
            full charter.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
