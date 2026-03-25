import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'amber' | 'coral' | 'cobalt' | 'success' | 'warning';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-ink-800 text-ink-300 border-ink-700',
  amber: 'bg-amber/15 text-amber border-amber/20',
  coral: 'bg-coral/15 text-coral border-coral/20',
  cobalt: 'bg-cobalt/15 text-cobalt border-cobalt/20',
  success: 'bg-emerald-600/15 text-emerald-600 border-emerald-600/20',
  warning: 'bg-yellow-600/15 text-yellow-700 border-yellow-600/20',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
