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
            Workflow Examples · {TICKETS.length}
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
            Six Linear-style tickets, each one a worked example of how the function ships.
            Every ticket leads with the problem, names the top performer&apos;s existing
            move, and shows the ROI math before the architecture. The principles repeat:
            shadow the best performer first, pick the 10x lever, build the pipeline before
            the prompt, treat Slack as the human-in-the-loop surface, measure with evals
            not vibes. See the about page for the full charter and the 90-day calendar.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
