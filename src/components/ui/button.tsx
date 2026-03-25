import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-amber text-white hover:bg-amber/90 font-semibold shadow-sm',
  secondary: 'bg-ink-800 text-ink-200 hover:bg-ink-700 border border-ink-700',
  ghost: 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/60',
  danger: 'bg-red-600/10 text-red-500 hover:bg-red-600/20 border border-red-600/20',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-2.5 py-1.5 text-xs gap-1.5',
  md: 'px-3.5 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2 font-medium',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer',
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
