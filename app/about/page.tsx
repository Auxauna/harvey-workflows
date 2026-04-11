import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

export default function AboutPage() {
  return (
    <MobileShell>
      <div className="px-10 py-12 max-w-3xl">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
            About this artifact
          </div>
          <h1 className="font-serif text-4xl font-medium text-fg-primary leading-[1.1] tracking-tight">
            What this is, and why it exists.
          </h1>

          <div className="mt-10 space-y-6 text-[15px] text-fg-secondary leading-relaxed">
            <p>
              This is a working roadmap of the four GTM workflow automations I would prioritize as
              Harvey&apos;s first GTM Business Analyst hire. I built it the weekend before my
              hiring manager interview because the best way to prove I can do the role is to do
              the role.
            </p>

            <p>
              Each ticket is structured as a real Linear-style issue. The problem. The top
              performer move. Acceptance criteria. The agent build. The stack. The ROI math. A
              weekend-MVP-then-iterate ship plan. What could go wrong. How we know it&apos;s
              working. Why it matters. Every ticket is scoped against Harvey&apos;s actual tools —
              the ones James shared with me on LinkedIn.
            </p>

            <p>
              GTM-002 is the Firecrawl ticket. It is the structured answer to the question James
              asked me in our DMs on April 10 about how to extract law firm client lists with
              Firecrawl. James told me directly that the panel needs to see core BA fundamentals
              before they trust me with the AI building work, so the way I would actually pick that
              ticket up is the unsexy way: validate the prompt against five known firms, build the
              post-processing layer, ship to one canary AE pod, measure, iterate. Project
              management, ticket discipline, follow-through on delivery. The building comes
              wrapped in the BA work, not separate from it.
            </p>

            <p>
              The four-ticket scope is deliberately small. I picked the workflows that create the
              most leverage in the first 90 days, that surface the most useful diagnostic about how
              Harvey&apos;s GTM machine actually works, and that demonstrate the systems thinking I
              would bring to the role. Eight more would be easy to write. Four is the right number
              to defend in a one-hour conversation.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The blueprint
            </h2>
            <p>
              I structured these tickets the way Drew Bredvick at Vercel structures GTM agent
              work. Drew built Vercel&apos;s first GTM agent in a weekend — $60K/year in
              engineering cost, $2M/year in headcount savings, 32x ROI — by shadowing the best
              performer first, picking 10x leverage problems, vibe coding the prototype, and
              using Slack as the human-in-the-loop approval surface. That is the model.
            </p>
            <p>
              Every ticket on this board follows Drew&apos;s Sense → Decide → Act → Record loop.
              Sense the state of a real system. Decide via Claude with as much context as
              possible. Act through APIs into Harvey&apos;s existing tools. Record everything so
              the human can trust it. The architecture diagrams show the loop as it manifests in
              each specific workflow — different tools per ticket, same shape.
            </p>
            <p>
              Every ticket also starts with the top performer&apos;s actual workflow, scopes a
              single high-leverage problem, frames the build as a weekend-MVP-then-iterate plan,
              and treats Slack as the canonical delivery surface. I built a vertical AI agent for
              construction spec review across five trades on the side, so I know how to ship
              production AI in a domain. But the GTM context calls for Drew&apos;s voice, not my
              construction-extraction voice. They are different problems and they deserve
              different shapes.
            </p>
            <p>
              The full story behind the construction agent is here:{" "}
              <a
                href="https://airtight-story.vercel.app"
                className="text-accent-forest hover:underline"
              >
                airtight-story.vercel.app
              </a>
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
