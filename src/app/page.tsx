'use client';

import Link from 'next/link';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  ArrowRight, BookOpen, Palette, Type, Image,
} from 'lucide-react';
import { MODULES, VERTICALS } from '@/lib/constants/brand';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
};

const MODULE_COLOURS: Record<string, string> = {
  illustration: '#D4772E', photography: '#D4772E', icons: '#2D4272',
  layout: '#3D6B4F', motion: '#191919', patterns: '#9A958F',
};

const REFERENCE_LINKS = [
  { href: '/guidelines', label: 'Brand Guidelines', desc: 'Complete identity system documentation', icon: BookOpen },
  { href: '/colour', label: 'Colour System', desc: 'Palette, tints, accessibility, usage rules', icon: Palette },
  { href: '/typography', label: 'Typography', desc: 'Typefaces, specimens, and hierarchy', icon: Type },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1100px] mx-auto">
      {/* Top — Brand identity */}
      <div className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-3">
          <img src="/brandmark.svg" alt="INNOVA" className="w-10 h-10" style={{ filter: 'var(--brandmark-filter, none)' }} />
          <span className="font-display text-[28px] font-semibold text-ink-100 tracking-tight">innova</span>
        </div>
        <p className="text-[16px] text-ink-400">Visual Language Platform</p>
        <div className="flex gap-3 mt-3">
          {Object.values(VERTICALS).map((v) => (
            <span key={v.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-800 border border-ink-700">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.colour }} />
              <span className="font-mono text-[10px] text-ink-400">{v.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Two-column split */}
      <div className="flex gap-10">
        {/* Left column — Modules */}
        <div className="flex-[3]">
          <p className="font-body text-[12px] font-bold uppercase text-ink-500 tracking-wider mb-3">Modules</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden">
            {MODULES.map((mod, i) => {
              const Icon = ICON_MAP[mod.icon] || PenTool;
              const colour = MODULE_COLOURS[mod.id] || '#D4772E';
              return (
                <Link
                  key={mod.id}
                  href={mod.route}
                  className={`group flex items-center gap-4 px-5 py-4 hover:bg-ink-800/40 transition-colors ${i < MODULES.length - 1 ? 'border-b border-ink-700' : ''}`}
                >
                  <Icon size={22} style={{ color: colour }} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-ink-100">{mod.name}</p>
                    <p className="text-[12px] text-ink-400 mt-0.5 truncate">{mod.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-ink-600 group-hover:text-ink-300 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column — Reference + Library */}
        <div className="flex-[2]">
          <p className="font-body text-[12px] font-bold uppercase text-ink-500 tracking-wider mb-3">Brand Reference</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden mb-6">
            {REFERENCE_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 px-4 py-3 hover:bg-ink-800/40 transition-colors ${i < REFERENCE_LINKS.length - 1 ? 'border-b border-ink-700' : ''}`}
              >
                <link.icon size={18} className="text-ink-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-ink-200">{link.label}</p>
                  <p className="text-[11px] text-ink-500 truncate">{link.desc}</p>
                </div>
                <ArrowRight size={14} className="text-ink-600 group-hover:text-ink-300 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          <p className="font-body text-[12px] font-bold uppercase text-ink-500 tracking-wider mb-3">Library</p>
          <Link
            href="/gallery"
            className="group flex items-center gap-3 px-4 py-3 border border-ink-700 rounded-lg hover:bg-ink-800/40 transition-colors"
          >
            <Image size={18} className="text-ink-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink-200">Gallery</p>
              <p className="text-[11px] text-ink-500">Generated and curated visual assets</p>
            </div>
            <ArrowRight size={14} className="text-ink-600 group-hover:text-ink-300 transition-colors flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
