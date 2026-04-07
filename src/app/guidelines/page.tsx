'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function GuidelinesPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-8 py-3 border-b border-ink-700 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-display text-base font-semibold text-ink-100">Brand Guidelines</h1>
          <p className="font-mono text-[10px] text-ink-500">INNOVA AM Tech — Brand Identity</p>
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
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950 z-10">
            <Loader2 size={24} className="animate-spin text-ink-500" />
          </div>
        )}
        <iframe
          src="/innova-brand-guidelines.html"
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 57px)' }}
          title="INNOVA Brand Guidelines"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
