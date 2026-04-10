export function WhyThisMatters({ text }: { text: string }) {
  return (
    <section className="hairline rounded-sm bg-accent-forest-bg p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-forest mb-3">
        Why this matters
      </div>
      <p className="text-[15px] text-fg-primary leading-relaxed font-serif">{text}</p>
    </section>
  );
}
