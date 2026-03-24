import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'amber' | 'coral' | 'cobalt' | 'success' | 'warning';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-ink-700 text-ink-300',
  amber: 'bg-amber/20 text-amber',
  coral: 'bg-coral/20 text-coral',
  cobalt: 'bg-cobalt/20 text-cobalt',
  success: 'bg-emerald-600/20 text-emerald-400',
  warning: 'bg-yellow-600/20 text-yellow-400',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
