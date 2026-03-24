'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Pen,
  LayoutGrid,
  BookOpen,
  Palette,
  Settings,
  FileText,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { href: '/', label: 'Generator', icon: Pen },
  { href: '/gallery', label: 'Gallery', icon: LayoutGrid },
  { href: '/library', label: 'Reference Library', icon: BookOpen },
  { href: '/brand-kit', label: 'Brand Kit', icon: Palette },
  { href: '/prompt-library', label: 'Prompt Library', icon: FileText },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-ink-900 border-r border-ink-800 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-ink-800">
        <Link href="/" className="block">
          <h1 className="font-serif text-2xl tracking-tight">
            <span className="text-amber font-bold">ink</span>
            <span className="text-ink-300 font-light">.</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-500 mt-1">
            INNOVA Ink Studio
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                isActive
                  ? 'bg-ink-800 text-white'
                  : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50'
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className={isActive ? 'font-medium' : ''}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-ink-800">
        <p className="text-[10px] text-ink-600 text-center">
          The Ink Register &middot; v1.0
        </p>
      </div>
    </aside>
  );
}
