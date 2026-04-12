import type { Ticket } from "@/lib/tickets";

const STATUS_LABELS: Record<Ticket["status"], string> = {
  ready: "Ready",
  in_progress: "In Progress",
  backlog: "Backlog",
  shipped: "Shipped",
};

const STATUS_DOT: Record<Ticket["status"], string> = {
  ready: "bg-accent-forest",
  in_progress: "bg-status-progress",
  backlog: "border border-fg-muted",
  shipped: "bg-status-shipped",
};

const PRIORITY_LABELS: Record<Ticket["priority"], string> = {
  P0: "P0 — Urgent",
  P1: "P1 — High",
  P2: "P2 — Medium",
  P3: "P3 — Low",
};

const CLAIM_STYLE = {
  verified: "bg-accent-forest-bg text-accent-forest",
  assumption: "bg-accent-amber-bg text-accent-amber",
  hypothesis: "bg-accent-claret-bg text-accent-claret",
} as const;

export function PropertiesPanel({ ticket }: { ticket: Ticket }) {
  return (
    <aside className="hairline space-y-4 rounded-sm bg-bg-subtle p-5">
      <Field label="Status">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT[ticket.status]}`} />
          <span className="text-sm text-fg-primary">{STATUS_LABELS[ticket.status]}</span>
        </div>
      </Field>

      <Field label="Claim Status">
        <span
          className={`inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${CLAIM_STYLE[ticket.claimStatus]}`}
        >
          {ticket.claimStatus}
        </span>
      </Field>

      <Field label="Priority">
        <span className="text-sm text-fg-primary">{PRIORITY_LABELS[ticket.priority]}</span>
      </Field>

      <Field label="Effort">
        <span className="font-mono text-sm tabular-nums text-fg-primary">{ticket.effort}</span>
      </Field>

      <Field label="Sprint">
        <span className="text-sm text-fg-primary">{ticket.sprint}</span>
      </Field>

      <Field label="Owner">
        <span className="text-sm text-fg-primary">{ticket.evidence.owner}</span>
      </Field>

      <Field label="Primary Metric">
        <span className="text-sm text-fg-primary">{ticket.evidence.metric}</span>
      </Field>

      <Field label="Labels">
        <div className="flex flex-wrap gap-1">
          {ticket.labels.map((label) => (
            <span
              key={label}
              className="hairline rounded-sm bg-bg-base px-1.5 py-0.5 font-mono text-[10px] text-fg-secondary"
            >
              {label}
            </span>
          ))}
        </div>
      </Field>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</div>
      {children}
    </div>
  );
}
