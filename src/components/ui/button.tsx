import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-amber text-ink-950 hover:bg-amber/90 font-semibold',
  secondary: 'bg-ink-700 text-ink-100 hover:bg-ink-600 border border-ink-600',
  ghost: 'text-ink-400 hover:text-ink-200 hover:bg-ink-800',
  danger: 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-150 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
);

Button.displayName = 'Button';
