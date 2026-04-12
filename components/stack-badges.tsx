import { TOOLS } from "@/lib/tools";

const CATEGORY_LABEL: Record<string, string> = {
  crm: "CRM",
  marketing: "Marketing",
  support: "Support",
  pm: "PM",
  docs: "Docs",
  messaging: "Messaging",
  calls: "Calls",
  enrichment: "Enrichment",
  warehouse: "Warehouse",
  integration: "Integration",
  vercel: "Vercel",
  ai: "AI",
};

export function StackBadges({ stack }: { stack: string[] }) {
  const grouped: Record<string, { id: string; name: string }[]> = {};

  stack.forEach((toolId) => {
    const tool = Object.values(TOOLS).find((item) => item.id === toolId);
    if (!tool) return;
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push({ id: tool.id, name: tool.name });
  });

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([category, tools]) => (
        <div key={category} className="flex items-baseline gap-3">
          <div className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
            {CATEGORY_LABEL[category] || category}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool) => (
              <span
                key={tool.id}
                className="hairline rounded-sm bg-bg-subtle px-2 py-0.5 font-mono text-[11px] text-fg-secondary"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
