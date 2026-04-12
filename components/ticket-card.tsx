import Link from "next/link";
import type { Ticket } from "@/lib/tickets";

const STATUS_CONFIG = {
  ready: { label: "Ready", color: "bg-accent-forest", border: "border-accent-forest" },
  in_progress: { label: "In Progress", color: "bg-status-progress", border: "border-status-progress" },
  backlog: { label: "Backlog", color: "bg-transparent", border: "border-fg-muted" },
  shipped: { label: "Shipped", color: "bg-status-shipped", border: "border-status-shipped" },
} as const;

const PRIORITY_CONFIG = {
  P0: { bars: 4, color: "text-priority-p0" },
  P1: { bars: 3, color: "text-priority-p1" },
  P2: { bars: 2, color: "text-priority-p2" },
  P3: { bars: 1, color: "text-fg-muted" },
} as const;

const CLAIM_STYLE = {
  verified: "bg-accent-forest-bg text-accent-forest",
  assumption: "bg-accent-amber-bg text-accent-amber",
  hypothesis: "bg-accent-claret-bg text-accent-claret",
} as const;

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const status = STATUS_CONFIG[ticket.status];
  const claimStyle = CLAIM_STYLE[ticket.claimStatus];

  return (
    <Link
      href={`/tickets/${ticket.id.toLowerCase()}`}
      className="group flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-bg-subtle hairline-b"
    >
      <div className="flex items-center gap-4">
        <span className={`h-2 w-2 rounded-full border ${status.border} ${status.color}`} />
        <span className="font-mono text-xs tabular-nums text-fg-muted">{ticket.id}</span>
        <span className="text-lg font-medium text-fg-primary font-serif transition-colors group-hover:text-accent-forest">
          {ticket.title}
        </span>
        <div className="ml-auto flex items-center gap-4">
          <PriorityIcon priority={ticket.priority} />
          <span className="font-mono text-xs whitespace-nowrap text-fg-subtle">{ticket.effort}</span>
        </div>
      </div>

      <div className="pl-6 text-sm leading-relaxed text-fg-secondary">{ticket.oneLiner}</div>

      <div className="pl-6 grid grid-cols-1 gap-2 md:grid-cols-3">
        <EvidencePill label="Problem" value={ticket.evidence.problem} />
        <EvidencePill label="Metric" value={ticket.evidence.metric} />
        <EvidencePill label="Owner" value={ticket.evidence.owner} />
      </div>

      <div className="pl-6 flex items-center gap-2">
        <span className={`rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${claimStyle}`}>
          {ticket.claimStatus}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
          {status.label}
        </span>
      </div>
    </Link>
  );
}

function EvidencePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline rounded-sm bg-bg-base px-2.5 py-1.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</div>
      <div className="line-clamp-2 text-xs leading-relaxed text-fg-secondary">{value}</div>
    </div>
  );
}

function PriorityIcon({ priority }: { priority: Ticket["priority"] }) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-end gap-[2px]" aria-label={`Priority ${priority}`}>
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-[3px] ${index <= config.bars ? config.color.replace("text-", "bg-") : "bg-bg-muted"}`}
            style={{ height: `${4 + index * 2}px` }}
          />
        ))}
      </div>
      <span className={`font-mono text-[11px] ${config.color}`}>{priority}</span>
    </div>
  );
}
