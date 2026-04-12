import Link from "next/link";
import { MobileShell } from "@/components/mobile-shell";

const SOURCES = [
  {
    label: "Harvey homepage",
    url: "https://www.harvey.ai/",
  },
  {
    label: "Harvey collaboration solution",
    url: "https://www.harvey.ai/solutions/collaboration",
  },
  {
    label: "Harvey Deutsche Telekom customer story",
    url: "https://www.harvey.ai/brand/customers/deutsche-telekom",
  },
  {
    label: "Harvey GTM Business Analyst listing",
    url: "https://app.welcometothejungle.com/jobs/A-tsiqMg",
  },
  {
    label: "Vercel Workflow docs",
    url: "https://vercel.com/docs/workflow",
  },
  {
    label: "Vercel AI SDK docs",
    url: "https://ai-sdk.dev/docs",
  },
  {
    label: "Vercel AI Gateway docs",
    url: "https://vercel.com/docs/ai-gateway",
  },
  {
    label: "Vercel Cron quickstart",
    url: "https://vercel.com/docs/cron-jobs/quickstart",
  },
  {
    label: "Notion API reference",
    url: "https://developers.notion.com/reference",
  },
  {
    label: "Notion request limits",
    url: "https://developers.notion.com/reference/request-limits",
  },
  {
    label: "Clay Salesforce integration overview",
    url: "https://university.clay.com/docs/salesforce-integration-overview",
  },
  {
    label: "Clay waterfall enrichment",
    url: "https://www.clay.com/waterfall-enrichment",
  },
  {
    label: "Fivetran Salesforce connector setup",
    url: "https://fivetran.com/docs/connectors/applications/salesforce/setup-guide",
  },
  {
    label: "Snowflake dynamic tables",
    url: "https://docs.snowflake.com/en/user-guide/dynamic-tables-about",
  },
];

export default function AboutPage() {
  return (
    <MobileShell>
      <div className="max-w-3xl px-10 py-12">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest">
          Method
        </div>
        <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-fg-primary">
          Sources, assumptions, and scope
        </h1>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-fg-secondary">
          <p>
            This portfolio is designed to show readiness for a hybrid GTM Business Analyst role:
            consultant-style requirements translation, cross-functional operating ownership, and
            selective workflow implementation.
          </p>

          <h2 className="mt-12 mb-3 font-serif text-xl font-medium text-fg-primary">Operating stance</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
              <span>80% operator work: diagnosis, governance, baseline metrics, and prioritization.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
              <span>20% builder work: three scoped pilots with explicit success/failure gates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
              <span>Claims are tagged as verified, assumption, or hypothesis in each ticket.</span>
            </li>
          </ul>

          <h2 className="mt-12 mb-3 font-serif text-xl font-medium text-fg-primary">Assumptions called out</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
              <span>
                As of April 12, 2026, no reliable primary-source evidence was found for "Harvey bought
                Vercel". That claim is excluded from core narrative.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-fg-muted" />
              <span>
                Stack details not publicly documented by Harvey are presented as implementation
                assumptions to validate in Month 1.
              </span>
            </li>
          </ul>

          <h2 className="mt-12 mb-3 font-serif text-xl font-medium text-fg-primary">Source pack</h2>
          <ul className="space-y-2">
            {SOURCES.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="text-accent-forest hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <Link href="/" className="font-mono text-xs text-fg-muted transition-colors hover:text-fg-primary">
            ← Back to operator brief
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
