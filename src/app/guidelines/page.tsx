import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Guidelines — INNOVA',
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-8 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-display text-base font-semibold text-[var(--text-primary)]">Brand Guidelines</h1>
          <p className="font-mono text-[10px] text-[var(--text-muted)]">INNOVA AM Tech — Brand Identity 2026</p>
        </div>
        <a
          href="/innova-brand-guidelines.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-cinnamon hover:underline"
        >
          Open in new tab ↗
        </a>
      </div>
      <iframe
        src="/innova-brand-guidelines.html"
        className="w-full border-0 flex-1"
        style={{ minHeight: '600px' }}
        title="Brand Guidelines"
      />
    </div>
  );
}
