import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileShell } from "@/components/mobile-shell";
import { PropertiesPanel } from "@/components/properties-panel";
import { BackgroundSection, SectionHeader } from "@/components/background-section";
import { EvidenceBlock } from "@/components/evidence-block";
import { AcceptanceCriteria } from "@/components/acceptance-criteria";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { StackBadges } from "@/components/stack-badges";
import { ImplementationPhases } from "@/components/implementation-phases";
import { RisksTable } from "@/components/risks-table";
import { ValidationPlan } from "@/components/validation-plan";
import { WhyThisMatters } from "@/components/why-this-matters";
import { SourceLinks } from "@/components/source-links";
import { TICKETS, getTicket } from "@/lib/tickets";

export function generateStaticParams() {
  return TICKETS.map((ticket) => ({ id: ticket.id.toLowerCase() }));
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
    <MobileShell>
      <div className="hairline-b bg-bg-base px-10 py-4">
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="font-mono text-fg-muted transition-colors hover:text-fg-primary">
            Operator Brief
          </Link>
          <span className="text-fg-muted">/</span>
          <span className="font-mono text-fg-secondary">{ticket.id}</span>
        </div>
      </div>

      <header className="hairline-b bg-bg-base px-10 py-10">
        <div className="max-w-5xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-fg-muted">{ticket.id}</span>
            <span className="h-px w-6 bg-border-strong" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              {ticket.sprint}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-fg-primary">
            {ticket.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg-secondary">{ticket.oneLiner}</p>
        </div>
      </header>

      <div className="px-10 py-10">
        <div className="grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0 space-y-12">
            <section>
              <SectionHeader label="First Principles" />
              <div className="hairline-l border-l-2 border-accent-forest bg-accent-forest-bg/40 px-5 py-4">
                <p className="font-serif text-[15px] italic leading-relaxed text-fg-primary">
                  {ticket.firstPrinciples}
                </p>
              </div>
            </section>

            <BackgroundSection background={ticket.background} label="Context" />
            <EvidenceBlock evidence={ticket.evidence} claimStatus={ticket.claimStatus} />
            <AcceptanceCriteria criteria={ticket.acceptanceCriteria} />

            <section>
              <SectionHeader label="Implementation Notes" />
              <ArchitectureDiagram layers={ticket.architecture} />
            </section>

            <section>
              <SectionHeader label="Tooling" />
              <StackBadges stack={ticket.stack} />
            </section>

            <ImplementationPhases phases={ticket.implementation} />
            <RisksTable risks={ticket.risks} />
            <ValidationPlan metrics={ticket.validation} />
            <SourceLinks sources={ticket.sources} />
            <WhyThisMatters text={ticket.whyThisMatters} />
          </div>

          <div className="lg:sticky lg:top-10 self-start">
            <PropertiesPanel ticket={ticket} />
          </div>
        </div>
      </div>

      <div className="hairline-t bg-bg-subtle px-10 py-6">
        <div className="max-w-5xl flex items-center justify-between">
          <Link href="/" className="font-mono text-xs text-fg-muted transition-colors hover:text-fg-primary">
            ← Back to operator brief
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            GTM Technology · Operator Portfolio
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
