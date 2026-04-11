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
              This is the working charter for the GTM Technology function at Harvey. It is a
              Business Analyst&apos;s roadmap first, a builder&apos;s roadmap second. Month 1
              is pure analyst work: shadow the top performers, interview stakeholders across
              every function, baseline the metrics that matter, triage the existing Linear
              backlog, audit data integrity. Every automation that follows is only as good as
              that groundwork.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The role, mirrored
            </h2>
            <p>
              The GTM Business Analyst JD lists five responsibilities. This board mirrors all
              five.
            </p>
            <ol className="space-y-3 ml-6 list-decimal">
              <li>
                <strong className="text-fg-primary">Roadmap execution.</strong> Translate
                business objectives into technical requirements. Every ticket here starts
                with a shadowing observation or a stakeholder signal, not a guess.
              </li>
              <li>
                <strong className="text-fg-primary">Orchestration.</strong> Gather
                requirements, design automations. Each workflow ticket is the requirements
                document plus the architecture plus the ROI math plus the rollout plan in one
                artifact — the shape a Linear issue takes when the BA writes it.
              </li>
              <li>
                <strong className="text-fg-primary">Data and agentic processes.</strong>{" "}
                Leverage Clay, Scalestack, Gong, Claude, and MCP-wired tools to automate
                account research, prospect prioritization, and signal detection. Every
                workflow on this board uses the tools named in the JD.
              </li>
              <li>
                <strong className="text-fg-primary">Cross-functional partnership.</strong>{" "}
                Liaison between Marketing, Sales, Success, RevOps, and GTM Systems. The Month
                1 diagnostic ticket (GTM-000) captures this as eight stakeholder interviews,
                five shadow sessions, and a weekly operating cadence.
              </li>
              <li>
                <strong className="text-fg-primary">Systems governance.</strong> Data
                integrity, deduplication, system audits. GTM-006 operationalizes this as a
                weekly Claude Code agent that audits SFDC, opens Linear tickets for anomalies,
                and publishes a governance digest to Rob every Monday.
              </li>
            </ol>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The BA discipline
            </h2>
            <p>
              The analyst work is non-negotiable and it comes first. Five principles shape
              every ticket on this board.
            </p>
            <ol className="space-y-3 ml-6 list-decimal">
              <li>
                <strong className="text-fg-primary">Shadow before building.</strong> Every
                workflow starts with a half-day watching the best performer do the work by
                hand. Playbook documents describe the aspirational flow. Shadowing reveals
                the one that actually wins deals.
              </li>
              <li>
                <strong className="text-fg-primary">Baseline before building.</strong>{" "}
                Month 1 stands up six baseline metrics in Snowflake. No workflow ships
                without a real number to measure it against. ROI claims without baselines
                are fiction.
              </li>
              <li>
                <strong className="text-fg-primary">
                  Gold set before the prompt.
                </strong>{" "}
                Every probabilistic workflow has a hand-labeled gold set built before the
                first Claude Code call. Acceptance criteria are pass^k grader targets against
                the gold set, not vibes.
              </li>
              <li>
                <strong className="text-fg-primary">
                  Shadow mode, canary, full rollout.
                </strong>{" "}
                Nothing goes to production without running in shadow mode first (generate
                but don&apos;t send), then canary on one pod, then full. The discipline is
                what makes probabilistic systems safe to trust.
              </li>
              <li>
                <strong className="text-fg-primary">
                  Clear the queue before adding to it.
                </strong>{" "}
                Month 1 triages the existing GTM Technology Linear backlog and helps close
                the first five P1s before a single new ticket is added. Respect for the
                existing work is the first signal of a real BA.
              </li>
            </ol>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The creative edge
            </h2>
            <p>
              On top of the BA fundamentals, each workflow has its own first-principles
              framing — a unique mental model for the specific problem it solves rather than
              a copy-paste template. Synthesis as a routing problem. Entity resolution as
              graph stitching. Classification as encoded judgment. Revealed preference over
              stated preference. Latency as the product. Clean data compounds. Every ticket
              on the board articulates its own frame in the First Principles section at the
              top, which is the portfolio of AI first principles the JD asks for.
            </p>
            <p>
              The implementation primitives are lean. Claude Code is the agent runtime inside
              Vercel Sandbox, triggered by Vercel Cron or SFDC Platform Events. Tools are
              wired as MCP servers (Clay, Scalestack, Gong, Firecrawl, Snowflake, Salesforce,
              Slack, Linear, Notion). Human-in-the-loop happens in Slack via Vercel Chat SDK,
              with the agent pausing to state and a Slack webhook waking a second Claude Code
              burst on rep approval. No bespoke orchestration code, no hand-rolled SDK glue
              per integration.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The strategic hook
            </h2>
            <p>
              Gabe Pereyra has publicly asked the load-bearing strategic question: if every
              law firm buys Harvey, how does Harvey differentiate itself? The product answer
              is Memory, Workflow Agents, and Agent Builder — depth and customization per
              firm, not just breadth of deployment. GTM Technology operationalizes that
              answer at the sales motion layer. Every workflow on this board either encodes a
              top-performer move so the rest of the team can ship at the top performer&apos;s
              level, or turns a new product capability into a daily GTM ritual so the launch
              doesn&apos;t stop being a pipeline event after week two.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The 90-day rhythm
            </h2>
            <p>
              <strong className="text-fg-primary">Month 1 — Diagnose.</strong> Shadow five
              top performers across seats. Interview eight leaders across functions.
              Baseline six metrics in Snowflake. Triage the existing Linear backlog and help
              clear the first five P1s. Audit data integrity on the top 50 accounts. Publish
              a 3-page diagnostic memo. Week 4 ships GTM-001 to a canary pod as the
              end-of-month quick win — &quot;I can also build,&quot; not the main
              deliverable. Full plan: GTM-000.
            </p>
            <p>
              <strong className="text-fg-primary">Month 2 — Translate.</strong> Convert
              shadow observations into GTM-002 and GTM-003 requirements documents. Ship
              GTM-005 Competitive Mention Radar on the Gong infrastructure from GTM-001.
              Begin GTM-002 in shadow mode. First weekly GTM Technology review to Rob and
              John.
            </p>
            <p>
              <strong className="text-fg-primary">Month 3 — Ship and govern.</strong> Ship
              GTM-002 to production. Ship GTM-003 with the 500-lead confusion matrix. Stand
              up GTM-006 Systems Governance as the weekly Monday audit. Defer GTM-004 to
              Month 4 once Q2 product analytics are stable. Quarterly review with James.
            </p>
            <p>
              Ongoing from day one: weekly shadow session with a rotating GTM role, weekly
              eval runs against gold sets, weekly competitive update to Rob, monthly charter
              review with James.
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
