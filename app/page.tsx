import { Sidebar } from "@/components/sidebar";
import { ProjectHeader } from "@/components/project-header";
import { TicketCard } from "@/components/ticket-card";
import { TICKETS } from "@/lib/tickets";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
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
              Note for the panel
            </div>
            <p className="text-sm text-fg-secondary leading-relaxed font-serif">
              Each ticket is structured as a real Linear-style issue: diagnosed background,
              acceptance criteria, architecture decomposed into a repeatable five-layer pattern,
              full stack against Harvey&apos;s actual tools, phased implementation plan, risks
              with mitigations, and a measurable validation plan. The unsexy work is on the same
              page as the AI building work because at this stage of GTM Technology, both have to
              be true.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
