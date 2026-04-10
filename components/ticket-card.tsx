import Link from "next/link";
import type { Ticket } from "@/lib/tickets";
import { TOOLS } from "@/lib/tools";

const STATUS_CONFIG = {
  ready: { label: "Ready", color: "bg-accent-forest", border: "border-accent-forest" },
  in_progress: { label: "In Progress", color: "bg-status-progress", border: "border-status-progress" },
  backlog: { label: "Backlog", color: "bg-transparent", border: "border-fg-muted" },
  shipped: { label: "Shipped", color: "bg-status-shipped", border: "border-status-shipped" },
} as const;

const PRIORITY_CONFIG = {
  P0: { label: "Urgent", bars: 4, color: "text-priority-p0" },
  P1: { label: "High", bars: 3, color: "text-priority-p1" },
  P2: { label: "Medium", bars: 2, color: "text-priority-p2" },
  P3: { label: "Low", bars: 1, color: "text-fg-muted" },
} as const;

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const status = STATUS_CONFIG[ticket.status];
  const priority = PRIORITY_CONFIG[ticket.priority];
  const stackPreview = ticket.stack.slice(0, 5);
  const overflow = ticket.stack.length - stackPreview.length;

  return (
    <Link
      href={`/tickets/${ticket.id.toLowerCase()}`}
      className="hairline-b group flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-bg-subtle"
    >
      <div className="flex items-center gap-4">
        <span className={`h-2 w-2 rounded-full border ${status.border} ${status.color}`} />
        <span className="font-mono text-xs text-fg-muted tabular-nums">{ticket.id}</span>
        <span className="font-serif text-lg font-medium text-fg-primary group-hover:text-accent-forest transition-colors">
          {ticket.title}
        </span>
        <div className="ml-auto flex items-center gap-4">
          <PriorityIcon priority={ticket.priority} />
          <span className="font-mono text-xs text-fg-subtle whitespace-nowrap">{ticket.effort}</span>
        </div>
      </div>

      <div className="pl-6 text-sm text-fg-secondary leading-relaxed">{ticket.oneLiner}</div>

      <div className="pl-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
          Stack
        </span>
        {stackPreview.map((toolId) => {
          const tool = Object.values(TOOLS).find((t) => t.id === toolId);
          if (!tool) return null;
          return (
            <span
              key={toolId}
              className="hairline rounded-sm bg-bg-base px-2 py-0.5 font-mono text-[11px] text-fg-secondary"
            >
              {tool.name}
            </span>
          );
        })}
        {overflow > 0 && (
          <span className="font-mono text-[11px] text-fg-muted">+{overflow} more</span>
        )}
      </div>
    </Link>
  );
}

function PriorityIcon({ priority }: { priority: Ticket["priority"] }) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-end gap-[2px]" aria-label={`Priority ${config.label}`}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-[3px] ${i <= config.bars ? config.color.replace("text-", "bg-") : "bg-bg-muted"}`}
            style={{ height: `${4 + i * 2}px` }}
          />
        ))}
      </div>
      <span className={`font-mono text-[11px] ${config.color}`}>{priority}</span>
    </div>
  );
}
