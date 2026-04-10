import Link from "next/link";
import { Sidebar } from "@/components/sidebar";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
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
              Each ticket is structured as a real Linear-style issue. Background. Acceptance
              criteria. Architecture decomposed into a repeatable five-layer pattern. Full stack
              against Harvey&apos;s actual tools — the ones James shared with me on LinkedIn.
              Phased implementation plan. Risks with mitigations. Measurable validation criteria.
            </p>

            <p>
              The unsexy ticket is on the board on purpose. James told me directly that the panel
              needs to see core BA fundamentals before they trust me with the AI building work. So
              the first ticket I would actually pick up at Harvey is the enrichment vendor
              consolidation audit. Pure project management, ticket discipline, follow-through on
              delivery. The building comes after.
            </p>

            <p>
              The four-ticket scope is deliberately small. I picked the workflows that I believe
              create the most leverage in the first 90 days, that surface the most useful diagnostic
              about how Harvey&apos;s GTM machine actually works, and that demonstrate the systems
              thinking I would bring to the role. Eight more would be easy to write. Four is the
              right number to defend in a one-hour conversation.
            </p>

            <h2 className="font-serif text-xl font-medium text-fg-primary mt-12 mb-3">
              The five-layer framework
            </h2>
            <p>
              Each ticket&apos;s architecture is decomposed using the same five-layer pattern I
              developed building Airtight Builds, my production vertical AI system for construction
              specification review. Five trades, ~6,300 patterns, 719 tests, real paying customers.
            </p>
            <p>
              The framework: Layer 1 input normalization. Layer 2 deterministic pre-processing
              (cheap, fast, no AI). Layer 3 AI generation with the right model for the job. Layer 4
              deterministic post-processing (validation, dedup, formatting). Layer 5 delivery into
              the user&apos;s existing surfaces. Plus three cross-cutting concerns: memory,
              observability, validation.
            </p>
            <p>
              I validated this framework five times across different construction trades —
              elevator, electrical, mechanical, fire protection, plumbing — adding the fifth trade
              required zero changes to the existing four. That is the proof that the framework
              generalizes. Different domain, same architecture.
            </p>
            <p>
              The full Airtight story is here:{" "}
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
                href="mailto:jake@airtightbuilds.com"
                className="text-accent-forest hover:underline"
              >
                jake@airtightbuilds.com
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
      </main>
    </div>
  );
}
