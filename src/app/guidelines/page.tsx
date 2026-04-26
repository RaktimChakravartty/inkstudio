'use client';

import { useState } from 'react';
import { Brandmark } from '@/components/brand/Brandmark';
import { ExternalLink } from 'lucide-react';

export default function GuidelinesPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] animate-fade-in">
      {/* Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 md:px-6 py-2 flex items-center justify-between bg-ink-950/80 backdrop-blur-sm border-b border-ink-700">
        <p className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">Brand Guidelines</p>
        <a href="/innova-brand-guidelines.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-mono text-[10px] text-cinnamon hover:underline">
          Open in new tab <ExternalLink size={10} />
        </a>
      </div>

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-5" style={{ background: 'var(--bg-primary)' }}>
          <Brandmark size={32} className="text-ink-500 animate-pulse mb-3" />
          <p className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">Loading brand guidelines...</p>
        </div>
      )}

      <iframe
        src="/innova-brand-guidelines.html"
        className="w-full h-full border-0 pt-9"
        title="INNOVA Brand Guidelines"
        onLoad={() => setLoading(false)}
      />

      {/* Mobile note */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-10">
        <p className="text-center font-mono text-[9px] text-ink-500 bg-ink-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-ink-700">
          Best viewed on desktop
        </p>
      </div>
    </div>
  );
}
