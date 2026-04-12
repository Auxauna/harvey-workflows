import type { EvidenceBlock as EvidenceBlockType, ClaimStatus } from "@/lib/tickets";
import { SectionHeader } from "./background-section";

const CLAIM_STATUS_LABEL: Record<ClaimStatus, string> = {
  verified: "Verified",
  assumption: "Assumption",
  hypothesis: "Hypothesis",
};

const CLAIM_STATUS_STYLE: Record<ClaimStatus, string> = {
  verified: "bg-accent-forest-bg text-accent-forest",
  assumption: "bg-accent-amber-bg text-accent-amber",
  hypothesis: "bg-accent-claret-bg text-accent-claret",
};

export function EvidenceBlock({
  evidence,
  claimStatus,
}: {
  evidence: EvidenceBlockType;
  claimStatus: ClaimStatus;
}) {
  return (
    <section>
      <SectionHeader label="Evidence Card" />
      <div className="mb-3">
        <span
          className={`inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${CLAIM_STATUS_STYLE[claimStatus]}`}
        >
          {CLAIM_STATUS_LABEL[claimStatus]}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Item label="Problem" value={evidence.problem} />
        <Item label="Decision" value={evidence.decision} />
        <Item label="Tool Fit" value={evidence.toolFit} />
        <Item label="Metric" value={evidence.metric} />
        <Item label="Owner" value={evidence.owner} />
        <Item label="Primary Risk" value={evidence.risk} />
      </div>
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline rounded-sm bg-bg-base px-4 py-3">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</div>
      <p className="text-sm leading-relaxed text-fg-secondary">{value}</p>
    </div>
  );
}
