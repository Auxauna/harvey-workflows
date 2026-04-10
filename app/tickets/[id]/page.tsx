import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { PropertiesPanel } from "@/components/properties-panel";
import { BackgroundSection } from "@/components/background-section";
import { AcceptanceCriteria } from "@/components/acceptance-criteria";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { StackBadges } from "@/components/stack-badges";
import { ImplementationPhases } from "@/components/implementation-phases";
import { RisksTable } from "@/components/risks-table";
import { ValidationPlan } from "@/components/validation-plan";
import { WhyThisMatters } from "@/components/why-this-matters";
import { SectionHeader } from "@/components/background-section";
import { TICKETS, getTicket } from "@/lib/tickets";

export function generateStaticParams() {
  return TICKETS.map((t) => ({ id: t.id.toLowerCase() }));
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = getTicket(id);
  if (!ticket) notFound();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="hairline-b bg-bg-base px-10 py-4">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/"
              className="font-mono text-fg-muted hover:text-fg-primary transition-colors"
            >
              All Tickets
            </Link>
            <span className="text-fg-muted">/</span>
            <span className="font-mono text-fg-secondary">{ticket.id}</span>
          </div>
        </div>

        {/* Ticket Header */}
        <header className="hairline-b bg-bg-base px-10 py-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-fg-muted tabular-nums">{ticket.id}</span>
              <span className="h-px w-6 bg-border-strong" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
                {ticket.sprint}
              </span>
            </div>

            <h1 className="font-serif text-4xl font-medium text-fg-primary leading-[1.1] tracking-tight">
              {ticket.title}
            </h1>

            <p className="mt-5 text-lg text-fg-secondary leading-relaxed max-w-3xl">
              {ticket.oneLiner}
            </p>
          </div>
        </header>

        {/* Body Layout: main + properties */}
        <div className="px-10 py-10">
          <div className="max-w-5xl grid grid-cols-[1fr_240px] gap-10">
            <div className="space-y-12 min-w-0">
              <BackgroundSection background={ticket.background} />
              <AcceptanceCriteria criteria={ticket.acceptanceCriteria} />

              <section>
                <SectionHeader label="Architecture · Five-Layer Decomposition" />
                <ArchitectureDiagram layers={ticket.architecture} />
              </section>

              <section>
                <SectionHeader label="Full Stack" />
                <StackBadges stack={ticket.stack} />
              </section>

              <ImplementationPhases phases={ticket.implementation} />
              <RisksTable risks={ticket.risks} />
              <ValidationPlan metrics={ticket.validation} />
              <WhyThisMatters text={ticket.whyThisMatters} />
            </div>

            <div className="sticky top-10 self-start">
              <PropertiesPanel ticket={ticket} />
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="hairline-t bg-bg-subtle px-10 py-6">
          <div className="max-w-5xl flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-xs text-fg-muted hover:text-fg-primary transition-colors"
            >
              ← Back to all tickets
            </Link>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              Built by Jacob Rucker · For James Hunsberger · April 2026
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
