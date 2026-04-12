import { MobileShell } from "@/components/mobile-shell";
import { OperatorBrief } from "@/components/operator-brief";
import { ProjectHeader } from "@/components/project-header";
import { RoadmapRhythm } from "@/components/roadmap-rhythm";
import { TicketCard } from "@/components/ticket-card";
import { TICKETS } from "@/lib/tickets";

export default function Home() {
  return (
    <MobileShell>
      <ProjectHeader />
      <OperatorBrief />
      <RoadmapRhythm />

      <div id="evidence-board" className="px-10 py-8">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            Evidence Board · {TICKETS.length}
          </h2>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            <span>Sorted by Execution Order</span>
          </div>
        </div>

        <div className="hairline rounded-sm bg-bg-base">
          {TICKETS.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        <div className="mt-12 hairline rounded-sm bg-bg-subtle px-6 py-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            How to read this board
          </div>
          <p className="text-sm leading-relaxed text-fg-secondary font-serif">
            GTM-000 is the Month-1 operating baseline. GTM-001 through GTM-003 are the three pilot
            workflows. Every card includes a required evidence block: Problem, Decision, Tool Fit,
            Metric, Owner, and Risk, plus a claim-status tag (verified, assumption, or hypothesis).
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
