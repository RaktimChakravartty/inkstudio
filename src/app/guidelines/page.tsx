'use client';

import { useState } from 'react';

export default function GuidelinesPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--bg-primary, #FFFFFF)' }}>
          <div className="animate-pulse text-sm" style={{ color: 'var(--color-text-secondary, #6B6B6B)' }}>
            Loading guidelines...
          </div>
        </div>
      )}
      <iframe
        src="/innova-brand-guidelines.html"
        className="w-full h-full border-0"
        title="INNOVA Brand Guidelines"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
