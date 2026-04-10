export function BackgroundSection({ background }: { background: string[] }) {
  return (
    <section>
      <SectionHeader label="Background" />
      <div className="space-y-4 text-fg-secondary leading-relaxed">
        {background.map((para, i) => (
          <p key={i} className="text-[15px]">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="hairline-b mb-5 pb-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
        {label}
      </div>
    </div>
  );
}

export { SectionHeader };
