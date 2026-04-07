'use client';

import { useState, useMemo, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { PLATFORM_LABELS, PLATFORM_CHAR_LIMITS } from '@/lib/prompt-engine';
import type { PlatformVariant } from '@/lib/prompt-engine';

type IconTier = 'tier1' | 'tier2' | 'tier3' | 'tier4';
type IconVertical = 'space' | 'people' | 'tech' | 'neutral';
type RenderMode = 'filled' | 'outline' | 'dot_array' | 'halftone' | 'scattered';
type IconSize = '32' | '48' | '64' | '128';

const TIER_LABELS: Record<IconTier, { label: string; desc: string }> = {
  tier1: { label: 'Tier 1 — Mark Variants', desc: 'The brandmark itself in different renders' },
  tier2: { label: 'Tier 2 — Category Icons', desc: '3-4 per vertical, capability representation' },
  tier3: { label: 'Tier 3 — Wayfinding', desc: 'Environmental signage icons' },
  tier4: { label: 'Tier 4 — UI Icons', desc: 'Digital interface icons' },
};

const TIER_SUGGESTIONS: Record<IconTier, string[]> = {
  tier1: ['Standard mark', 'Filled mark', 'Outline mark', 'Dot array mark'],
  tier2: ['Managed Office', 'Coworking', 'Meeting Room', 'Talent Search', 'Team Building', 'AV Integration', 'Video Conferencing', 'Smart Room', 'Digital Signage'],
  tier3: ['Reception', 'Meeting Room', 'Phone Booth', 'Washroom', 'Pantry/Café', 'Helpdesk', 'Fire Exit', 'Elevator', 'Stairs', 'Parking', 'Printer', 'Server Room', 'Locker', 'Smoking Area'],
  tier4: ['Search', 'Menu', 'Close', 'Settings', 'Notification', 'User', 'Calendar', 'Download', 'Share', 'Filter', 'Edit', 'Delete', 'Plus', 'Arrow'],
};

const RENDER_LABELS: Record<RenderMode, string> = {
  filled: 'Filled (solid forms)', outline: 'Outline (2px stroke)', dot_array: 'Dot Array', halftone: 'Halftone', scattered: 'Scattered (60% density)',
};

const PRIMITIVES = [
  { id: 'P1', name: 'The Node', source: 'Core circle', desc: 'Perfect circle, base unit' },
  { id: 'P2', name: 'The Cardinal', source: 'N/E/S/W capsule', desc: 'Stadium/capsule shape' },
  { id: 'P3', name: 'The Bridge', source: 'Corner quarter-circle', desc: '90° arc segment' },
  { id: 'P4', name: 'The Channel', source: 'Cross negative space', desc: 'Narrow rectangular gap' },
  { id: 'P5', name: 'The Arc', source: 'Quarter-circle curve', desc: 'Single curved stroke' },
  { id: 'P6', name: 'The Cluster', source: 'Multiple P1 nodes', desc: 'Circles at varying scales' },
  { id: 'P7', name: 'The Ring', source: 'P1 as outline', desc: 'Circle stroke, no fill' },
];

function getPrimitivesUsed(tier: IconTier, vertical: IconVertical): string[] {
  const base = ['P1'];
  if (tier === 'tier1') return ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
  if (vertical === 'space') return [...base, 'P3', 'P4'];
  if (vertical === 'people') return [...base, 'P6', 'P7'];
  if (vertical === 'tech') return [...base, 'P4', 'P5', 'P7'];
  return [...base, 'P2', 'P5'];
}

function buildSpec(tier: IconTier, vertical: IconVertical, render: RenderMode, size: string, icon: string): string {
  const s = parseInt(size);
  const prims = getPrimitivesUsed(tier, vertical);
  return `GRID\nArtboard: ${s}px × ${s}px\nMini unit: 2px\nSafe zone: 2px all sides\nLive area: ${s - 4}px × ${s - 4}px\n\nSTROKE\nWeight: 2px (at 32px base, scales proportionally)\nAlignment: Centred\nCaps: Round\nJoins: Round\nNO variable weight (reserved for Ink Register)\n\nCURVES\nAll curves: circular arc segments ONLY\nRadius R1: 9.5px (at 32px scale)\nRadius R2: 7.1px (at 32px scale)\nNO freehand Bézier curves\n\nANGLES\nStraight lines: 0°, 45°, or 90° ONLY\n\nPRIMITIVES USED\n${prims.join(', ')}\n\nRENDER\nMode: ${RENDER_LABELS[render]}\n${render === 'outline' ? 'Stroke 2px, no fill, channel gaps maintained' : render === 'filled' ? 'Solid forms, no stroke' : ''}\nMinimum size for outline: 48px\nBelow 48px: always use filled\n\nICON: ${icon || TIER_LABELS[tier].label}\n\nEXPORT\nSVG: paths expanded, no live text\nPNG: @1x, @2x, @4x\nPDF: for print production`;
}

function buildExplorationPrompt(tier: IconTier, vertical: IconVertical, render: RenderMode, size: string, icon: string): string {
  const renderDesc = render === 'filled' ? 'solid black filled forms' : render === 'outline' ? '2px outline strokes with no fill' : render === 'dot_array' ? 'silhouette filled with varying-size dots' : render === 'halftone' ? 'dense dot matrix halftone' : 'forms dissolved into floating circles at 60% density';
  const vertDesc = vertical === 'space' ? 'architectural floor-plan feel (bridges + channels)' : vertical === 'people' ? 'community/cluster feel (grouped circles)' : vertical === 'tech' ? 'circuit board precision (channels + arcs + rings)' : 'balanced use of all primitives';
  return `A grid of 9 minimal ${renderDesc} icons on a white background. Each icon is drawn in a single-weight stroke (2px), with rounded caps and joins. The icons should feel like they belong to the same family: derived from a circle as the base unit. Include: ${icon || TIER_LABELS[tier].desc}. Style: editorial, not corporate. Rounded terminals. Consistent optical weight. ${size}px grid. ${vertDesc}. The construction geometry uses only circular arcs at two specific radii — no freehand curves, no sharp corners on organic forms.`;
}

export default function IconsPage() {
  const { showToast } = useToast();
  const [tier, setTier] = useState<IconTier>('tier3');
  const [vertical, setVertical] = useState<IconVertical>('neutral');
  const [render, setRender] = useState<RenderMode>('outline');
  const [size, setSize] = useState<IconSize>('48');
  const [icon, setIcon] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showPrimitives, setShowPrimitives] = useState(true);
  const [activePlatform, setActivePlatform] = useState<PlatformVariant>('universal');

  const spec = useMemo(() => buildSpec(tier, vertical, render, size, icon), [tier, vertical, render, size, icon]);
  const prompt = useMemo(() => buildExplorationPrompt(tier, vertical, render, size, icon), [tier, vertical, render, size, icon]);

  const handleCopy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  const suggestions = TIER_SUGGESTIONS[tier];

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="The Dot Grid" subtitle="Icon System · Derived from brandmark geometry" />
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* LEFT */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Icon Tier</p>
            {(Object.keys(TIER_LABELS) as IconTier[]).map((t) => (
              <button key={t} onClick={() => { setTier(t); setIcon(''); }} className={`w-full text-left p-2.5 rounded-lg border transition cursor-pointer ${tier === t ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                <p className="text-[11px] font-medium">{TIER_LABELS[t].label}</p>
                <p className="text-[9px] text-ink-500 mt-0.5">{TIER_LABELS[t].desc}</p>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Vertical Expression</p>
            <div className="flex flex-wrap gap-1.5">
              {(['space', 'people', 'tech', 'neutral'] as IconVertical[]).map((v) => (
                <button key={v} onClick={() => setVertical(v)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${vertical === v ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{v}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Render Mode</p>
            {(Object.keys(RENDER_LABELS) as RenderMode[]).map((r) => (
              <button key={r} onClick={() => setRender(r)} className={`w-full text-left px-3 py-2 rounded-lg border transition cursor-pointer text-[11px] ${render === r ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{RENDER_LABELS[r]}</button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Target Size</p>
            <div className="flex gap-1.5">
              {(['32', '48', '64', '128'] as IconSize[]).map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer font-mono ${size === s ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{s}px</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Specific Icon</p>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Type or select..." className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100 placeholder:text-ink-500" />
            <div className="flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setIcon(s)} className="px-2 py-1 rounded text-[9px] bg-ink-800 text-ink-400 hover:text-ink-200 hover:bg-ink-700 border border-ink-700 transition cursor-pointer">{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Icon Preview Grid */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-3">Icon Preview</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Workspace', paths: <><rect x="8" y="14" width="32" height="20" rx="9.5" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="2"/></> },
                { name: 'Meeting', paths: <><path d="M10 30 A14 14 0 0 1 24 16" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M24 16 A14 14 0 0 1 38 30" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="16" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="32" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/></> },
                { name: 'Phone Booth', paths: <><rect x="14" y="8" width="20" height="32" rx="7.1" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="22" r="4" fill="none" stroke="currentColor" strokeWidth="2"/></> },
                { name: 'Reception', paths: <><path d="M8 28 A16 16 0 0 1 24 12" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="24" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="2"/><circle cx="14" cy="20" r="3.5" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="2"/></> },
                { name: 'Café', paths: <><path d="M14 16 A10 10 0 0 0 34 16" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="16" x2="14" y2="32" stroke="currentColor" strokeWidth="2"/><line x1="34" y1="16" x2="34" y2="32" stroke="currentColor" strokeWidth="2"/><path d="M14 32 A10 10 0 0 0 34 32" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 10 Q20 6 24 8 Q28 6 28 10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/></> },
                { name: 'Parking', paths: <><rect x="10" y="8" width="28" height="32" rx="9.5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M18 34 L18 16 L28 16 A7 7 0 0 1 28 30 L18 30" fill="none" stroke="currentColor" strokeWidth="2"/></> },
                { name: 'Elevator', paths: <><rect x="10" y="8" width="28" height="32" rx="7.1" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 20 L24 14 L28 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 28 L24 34 L28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></> },
                { name: 'Restroom', paths: <><circle cx="18" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="30" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="18" y1="20" x2="18" y2="36" stroke="currentColor" strokeWidth="2"/><line x1="30" y1="20" x2="30" y2="36" stroke="currentColor" strokeWidth="2"/><line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.3"/></> },
                { name: 'WiFi', paths: <><path d="M12 20 A16 16 0 0 1 36 20" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 25 A11 11 0 0 1 32 25" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 30 A6 6 0 0 1 28 30" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="34" r="2" fill="currentColor"/></> },
                { name: 'Print', paths: <><rect x="12" y="18" width="24" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 18 L16 10 L32 10 L32 18" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 32 L16 38 L32 38 L32 32" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="32" cy="24" r="1.5" fill="currentColor"/></> },
                { name: 'Exit', paths: <><rect x="10" y="10" width="20" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M30 18 L38 24 L30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="22" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
                { name: 'Helpdesk', paths: <><path d="M10 30 A14 14 0 0 1 38 30" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="34" cy="10" r="2.5" fill="currentColor" opacity="0.4"/></> },
              ].map((ic) => (
                <div key={ic.name} className="flex flex-col items-center p-2 rounded-lg bg-ink-900 border border-ink-700 hover:border-ink-600 transition">
                  <svg viewBox="0 0 48 48" width={parseInt(size)} height={parseInt(size)} className="text-ink-100 mb-1.5">
                    {render === 'filled' ? (
                      <g style={{ fill: 'currentColor', stroke: 'none' }}>{ic.paths}</g>
                    ) : ic.paths}
                  </svg>
                  <span className="font-mono text-[8px] text-ink-500">{ic.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Construction Spec */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Illustrator Build Spec</p>
              <Button variant="secondary" size="sm" onClick={() => handleCopy('spec', spec)}>
                {copied === 'spec' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'spec' ? 'Copied!' : 'Copy Spec'}
              </Button>
            </div>
            <pre className="text-[11px] text-ink-300 font-mono whitespace-pre-wrap leading-relaxed">{spec}</pre>
          </div>

          {/* AI Exploration Prompt */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Concept Exploration Prompt</p>
              <Button size="sm" onClick={() => handleCopy('prompt', prompt)}>
                {copied === 'prompt' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'prompt' ? 'Copied!' : 'Copy Prompt'}
              </Button>
            </div>
            <pre className="text-[11px] text-ink-200 font-mono whitespace-pre-wrap leading-relaxed">{prompt}</pre>
            <p className="text-[10px] text-ink-500 mt-2">{prompt.length} chars</p>
          </div>

          {/* Primitives Reference */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
            <button onClick={() => setShowPrimitives(!showPrimitives)} className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-ink-800/50 transition">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">The Seven Primitives</span>
              <span className="text-ink-500 text-[11px]">{showPrimitives ? '−' : '+'}</span>
            </button>
            {showPrimitives && (
              <div className="px-5 pb-4 space-y-3">
                {PRIMITIVES.map((p) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center flex-shrink-0">
                      {p.id === 'P1' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="6" fill="currentColor" /></svg>}
                      {p.id === 'P2' && <svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="4" y="6" width="12" height="8" rx="4" fill="currentColor" /></svg>}
                      {p.id === 'P3' && <svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M 4 16 A 12 12 0 0 1 16 4" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
                      {p.id === 'P4' && <svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="9" y="2" width="2" height="16" fill="currentColor" /><rect x="2" y="9" width="16" height="2" fill="currentColor" /></svg>}
                      {p.id === 'P5' && <svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M 4 16 Q 4 4 16 4" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
                      {p.id === 'P6' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="7" cy="10" r="3" fill="currentColor" /><circle cx="14" cy="7" r="2.5" fill="currentColor" /><circle cx="13" cy="14" r="2" fill="currentColor" /></svg>}
                      {p.id === 'P7' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
                    </div>
                    <div>
                      <p className="text-[11px] text-ink-200 font-medium">{p.id} — {p.name}</p>
                      <p className="text-[10px] text-ink-500">{p.source} · {p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
