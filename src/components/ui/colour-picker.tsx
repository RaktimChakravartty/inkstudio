'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface ColourPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function ColourPicker({ value, onChange, label, className }: ColourPickerProps) {
  const [hex, setHex] = useState(value);

  const handleHexChange = (v: string) => {
    setHex(v);
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
      onChange(v);
    }
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-xs font-medium text-ink-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => {
              setHex(e.target.value);
              onChange(e.target.value);
            }}
            className="w-8 h-8 rounded-md border border-ink-600 cursor-pointer bg-transparent"
          />
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-24 bg-ink-800 border border-ink-700 rounded-lg px-2 py-1.5 text-xs text-ink-100 font-mono focus:outline-none focus:ring-1 focus:ring-amber/50"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
