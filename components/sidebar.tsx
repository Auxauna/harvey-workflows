import Link from "next/link";
import { TICKETS } from "@/lib/tickets";

export function Sidebar() {
  const ready = TICKETS.filter((ticket) => ticket.status === "ready").length;
  const inProgress = TICKETS.filter((ticket) => ticket.status === "in_progress").length;
  const backlog = TICKETS.filter((ticket) => ticket.status === "backlog").length;

  return (
    <aside className="hairline-r flex h-screen w-64 flex-col bg-bg-subtle">
      <div className="hairline-b px-5 py-5">
        <Link href="/" className="block">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            GTM Technology
          </div>
          <div className="mt-1 font-serif text-base font-medium text-fg-primary">
            Operator Portfolio
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
          Workspace
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary hover:bg-bg-muted hover:text-fg-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-forest" />
          Operator Brief + Board
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary hover:bg-bg-muted hover:text-fg-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fg-muted" />
          Sources + Assumptions
        </Link>

        <div className="mt-6 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
          Status
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary">
            <span className="h-2 w-2 rounded-full border border-status-ready" />
            Ready
            <span className="ml-auto font-mono text-xs text-fg-muted">{ready}</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary">
            <span className="h-2 w-2 rounded-full bg-status-progress" />
            In Progress
            <span className="ml-auto font-mono text-xs text-fg-muted">{inProgress}</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary">
            <span className="h-2 w-2 rounded-full border border-fg-muted" />
            Backlog
            <span className="ml-auto font-mono text-xs text-fg-muted">{backlog}</span>
          </div>
        </div>

        <div className="mt-6 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
          Tickets
        </div>
        <div className="space-y-0.5">
          {TICKETS.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id.toLowerCase()}`}
              className="flex items-center gap-3 px-5 py-1.5 text-sm text-fg-secondary hover:bg-bg-muted hover:text-fg-primary"
            >
              <span className="font-mono text-[11px] text-fg-muted">{ticket.id}</span>
              <span className="truncate">{ticket.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="hairline-t px-5 py-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
          Focus
        </div>
        <div className="mt-1 text-sm text-fg-primary">Hybrid BA + GTM Engineer</div>
        <div className="mt-0.5 text-xs text-fg-subtle">Operator-first, pilot-backed</div>
      </div>
    </aside>
  );
}
