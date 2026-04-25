interface ModuleHeaderProps {
  system: string;
  subtitle: string;
  accentColour?: string;
}

export function ModuleHeader({ system, subtitle, accentColour = '#D4772E' }: ModuleHeaderProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="font-display text-[28px] font-semibold text-ink-50 tracking-tight leading-tight">{system}</h1>
      <p className="font-mono text-[10px] text-ink-500 mt-2 uppercase tracking-[0.15em]">{subtitle}</p>
      <div className="mt-4 h-[2px] w-16 rounded-full" style={{ backgroundColor: accentColour }} />
    </div>
  );
}