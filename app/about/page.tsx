import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

export default function AboutPage() {
  return (
    <MobileShell>
      <div className="px-10 py-12 max-w-3xl">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            About this roadmap
          </div>
          <h1 className="font-serif text-4xl font-medium text-fg-primary leading-[1.1] tracking-tight">
            What this is, and why it exists.
          </h1>

          <div className="mt-10 space-y-6 text-[15px] text-fg-secondary leading-relaxed">
            <p>
              This is the working charter for the GTM Technology function at Harvey. The mandate
              is simple: GTM Technology exists to encode what the best performers in every GTM
              role already do by hand, measure what that work is worth in rep time and pipeline
              impact, and ship the automations that give the time back.
            </p>

            <p>
              Every ticket on this board is structured as a real Linear-style issue. The
              problem. The top performer move. Acceptance criteria. The agent build. The stack.
              The ROI math. A weekend-MVP-then-iterate ship plan. What could go wrong. How we
              know it&apos;s working. Why it matters. Every ticket is scoped against Harvey&apos;s
              actual stack and the tools the GTM team uses today.
            </p>

            <p>
              The four workflows are examples, not the full scope of the first 90 days. They
              show how the function prioritizes and ships: shadow the best performer, pick 10x
              leverage problems, ship the weekend MVP, measure the multiplier. The principles
              repeat across every ticket, which is the point — the shape of the work is
              consistent even when the workflows are different.
            </p>

            <p>
              GTM-002 is the Firecrawl ticket. It is the structured answer to an operating
              question that surfaced in sync: how do we extract every named client company from
              a law firm&apos;s public website at scale? The hard part is not the crawl. It is
              that client data is scattered across three surfaces — representative experience
              sections, client lists, and attorney bios — and most extraction tools miss the
              attorney bio surface entirely. Solving it at scale surfaces the relationship graph
              between law firms and their corporate clients, which is rocket fuel for the
              corporate legal motion.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The blueprint
            </h2>
            <p>
              Every workflow on this board follows the same shape. Sense the state of a real
              system — CRM, calendar, product analytics, inbox, or the public web. Decide via
              Claude with as much context as possible. Act through APIs into the tools the team
              already uses. Record everything so the human can trust it. The architecture
              diagrams show the loop as it manifests in each specific workflow — different tools
              per ticket, same shape.
            </p>
            <p>
              Every workflow also starts with the top performer&apos;s actual workflow, scopes a
              single high-leverage problem, frames the build as a weekend-MVP-then-iterate plan,
              and treats Slack as the canonical delivery surface. Humans stay in the loop for
              judgment, not drudgery. The point is consistency: the shape of the work is the
              same whether it is pre-call briefs, lead routing, customer mapping, or expansion
              signal detection.
            </p>
            <p>
              Prior work encoding institutional knowledge into a production AI system — a
              vertical agent for construction spec review validated across five trades, ~6,300
              patterns, 719 tests — lives here:{" "}
              <a
                href="https://airtight-story.vercel.app"
                className="text-accent-forest hover:underline"
              >
                airtight-story.vercel.app
              </a>
              . Different domain, same discipline underneath.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">Contact</h2>
            <p>
              Jacob Rucker
              <br />
              <a
                href="mailto:jacobruckerpersonal@gmail.com"
                className="text-accent-forest hover:underline"
              >
                jacobruckerpersonal@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-16">
            <Link
              href="/"
              className="font-mono text-xs text-fg-muted hover:text-fg-primary transition-colors"
            >
              ← Back to all tickets
            </Link>
          </div>
        </div>
    </MobileShell>
  );
}
