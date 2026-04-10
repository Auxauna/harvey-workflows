import { TOOLS } from "@/lib/tools";

const CATEGORY_LABEL: Record<string, string> = {
  enrichment: "Enrichment",
  marketing: "Marketing",
  crm: "CRM",
  success: "Success",
  support: "Support",
  data: "Data",
  orchestration: "Orchestration",
  warehouse: "Warehouse",
  ai: "AI",
  vercel: "Vercel",
  messaging: "Messaging",
  calls: "Calls",
  pm: "PM",
  docs: "Docs",
  chat: "Chat",
};

export function StackBadges({ stack }: { stack: string[] }) {
  // Group by category
  const grouped: Record<string, { id: string; name: string }[]> = {};
  stack.forEach((toolId) => {
    const tool = Object.values(TOOLS).find((t) => t.id === toolId);
    if (!tool) return;
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push({ id: tool.id, name: tool.name });
  });

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([category, tools]) => (
        <div key={category} className="flex items-baseline gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted w-24 shrink-0">
            {CATEGORY_LABEL[category] || category}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => (
              <span
                key={t.id}
                className="hairline rounded-sm bg-bg-subtle px-2 py-0.5 font-mono text-[11px] text-fg-secondary"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
