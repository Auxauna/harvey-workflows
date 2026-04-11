import type { ArchitectureLayer } from "@/lib/tickets";
import { TOOLS } from "@/lib/tools";

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="space-y-3">
      {layers.map((layer, idx) => (
        <div key={layer.layer} className="hairline rounded-sm bg-bg-base">
          <div className="flex items-start gap-4 px-5 py-4">
            <div className="flex flex-col items-center pt-0.5">
              <div className="hairline flex h-7 w-7 items-center justify-center rounded-full bg-bg-subtle font-mono text-xs font-medium text-fg-primary tabular-nums">
                {idx + 1}
              </div>
              {idx < layers.length - 1 && (
                <div className="mt-2 h-6 w-px bg-border-hairline" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-base font-medium text-fg-primary">
                {layer.name}
              </h4>
              <p className="mt-2 text-sm text-fg-secondary leading-relaxed">{layer.detail}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {layer.tools.map((toolId) => {
                  const tool = Object.values(TOOLS).find((t) => t.id === toolId);
                  if (!tool) return null;
                  return (
                    <span
                      key={toolId}
                      className="hairline rounded-sm bg-bg-subtle px-2 py-0.5 font-mono text-[10px] text-fg-secondary"
                    >
                      {tool.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
