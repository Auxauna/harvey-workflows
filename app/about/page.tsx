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
              This is the working charter for the GTM Technology function at Harvey. The
              mandate is simple: encode what the top performers in every GTM seat already do by
              hand, measure what that work is worth in rep time and pipeline impact, and ship
              the automations that give the time back.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The thesis
            </h2>
            <p>
              Systems thinking applied to GTM. Most GTM automation starts with the rep and
              works backward to the tooling. This charter starts with the data — what state
              exists in what system, what can be filtered deterministically, where an LLM is
              worth the cost, what the audit trail looks like — and builds the workflow around
              that. The result reads more like a data pipeline than a conventional GTM
              playbook, which is the point. The value we bring to Harvey is production
              engineering discipline applied to a domain that usually runs on spreadsheets and
              vibes.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The principles
            </h2>
            <p>
              Every ticket on this board is built against the same five principles. They
              aren&apos;t new. They&apos;re the load-bearing ideas from the small number of
              public reference builds that actually work in production.
            </p>
            <ol className="space-y-3 ml-6 list-decimal">
              <li>
                <strong className="text-fg-primary">Shadow before building.</strong> Every
                workflow starts with a half-day watching the best performer do it by hand. The
                top AE&apos;s six-tab flow. The top CSM&apos;s three-signal weekly scan. The
                top researcher&apos;s three-data-surfaces insight. Playbook documents describe
                the aspirational workflow. Shadowing reveals the one that actually wins deals.
              </li>
              <li>
                <strong className="text-fg-primary">10x leverage, not 10-20% incremental.</strong>{" "}
                Every workflow here targets a multiplier. Incremental cleanups go on the
                backlog. What we skip matters more than what we ship.
              </li>
              <li>
                <strong className="text-fg-primary">Sense → Decide → Act → Record.</strong>{" "}
                Every agent pulls state from a real system, decides with as much context as
                possible, acts through APIs into the tools the team already uses, and records
                everything to Snowflake so the human can trust it and the prompt can be
                retuned. The architecture diagrams on each ticket show the loop as it
                manifests in that specific workflow.
              </li>
              <li>
                <strong className="text-fg-primary">
                  Humans in the loop for judgment, not drudgery.
                </strong>{" "}
                Slack is the canonical HITL surface, delivered through Vercel Chat SDK. The
                rep sees the draft, taps confirm, the action fires. Nothing touches a customer
                without a human tap.
              </li>
              <li>
                <strong className="text-fg-primary">Data problem, not model problem.</strong>{" "}
                Every public build that has worked — Vercel&apos;s Lead Agent (10 inbound SDRs
                down to 1, 32x ROI), LangChain&apos;s GTM Agent (250% lead-to-qualified
                conversion lift, 40 hours per rep per month reclaimed), Vanta&apos;s
                three-layer stack — converged on the same lesson. Enrichment plumbing,
                context assembly, and eval infrastructure are harder than the prompt. Build
                the pipeline first.
              </li>
            </ol>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The strategic hook
            </h2>
            <p>
              Gabe Pereyra has publicly asked the load-bearing strategic question: if every
              law firm buys Harvey, how does Harvey differentiate itself? The product answer
              is Memory, Workflow Agents, and Agent Builder — depth and customization per
              firm, not just breadth of deployment. GTM Technology operationalizes that
              answer at the sales motion layer. Every workflow on this board either (a)
              encodes a top-performer move so the rest of the team can ship at the top
              performer&apos;s level, or (b) turns a new product capability into a daily GTM
              ritual so the launch doesn&apos;t stop being a pipeline event after week two.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The workflows
            </h2>
            <p>
              Six Linear-style tickets, scoped against Harvey&apos;s actual stack. Each one
              has: the problem, the top performer move, acceptance criteria, the agent build,
              the stack, the ROI math, a weekend-MVP-then-harden ship plan, what could go
              wrong, how we know it&apos;s working, and why it matters. They are examples of
              how the function ships, not the full scope of the first 90 days.
            </p>
            <p>
              GTM-002 is the Firecrawl ticket. It is the structured answer to an operating
              question: how do we extract every named client company from a law firm&apos;s
              public website at scale? The hard part is not the crawl. It is that client data
              is scattered across three surfaces — representative experience, client lists,
              and attorney bios — and most extraction tools miss the attorney bio surface
              entirely. Solving it at scale surfaces the relationship graph between law firms
              and their corporate clients, which is rocket fuel for the corporate legal
              motion.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The 90-day rhythm
            </h2>
            <p>
              <strong className="text-fg-primary">Month 1 — Diagnose + quick win.</strong>{" "}
              Shadow the top three AEs and top two CSMs. Build the 50-task golden set for
              briefs and the 15-firm gold mapping for customer extraction. Stand up the
              eval schema in Snowflake. Ship GTM-001 to a canary pod by week 3.
            </p>
            <p>
              <strong className="text-fg-primary">
                Month 2 — Foundation + commitment tracking.
              </strong>{" "}
              Ship GTM-005 on the Gong infrastructure stood up for GTM-001. Begin GTM-002 in
              shadow mode. First weekly GTM Technology review published to Rob and John.
            </p>
            <p>
              <strong className="text-fg-primary">Month 3 — Scale + competitive edge.</strong>{" "}
              Ship GTM-002 to production. Ship GTM-006 on the same Gong + Snowflake
              infrastructure. Begin GTM-003 with confusion matrix validation in shadow mode.
              GTM-004 defers to Month 4 once the Q2 product analytics are stable.
            </p>
            <p>
              Ongoing from day one: weekly shadow session with a rotating GTM role, weekly
              eval runs against golden sets, weekly competitive update to Rob, monthly
              charter review.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              Prior work
            </h2>
            <p>
              A vertical AI agent built for construction spec review and validated across
              five trades — ~6,300 patterns, 719 tests, production deployment — lives at{" "}
              <a
                href="https://airtight-story.vercel.app"
                className="text-accent-forest hover:underline"
              >
                airtight-story.vercel.app
              </a>
              . Different domain. Same discipline underneath: data pipeline thinking,
              dispatch over single LLM calls, detection separated from judgment, persistent
              memory that compounds run over run.
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
