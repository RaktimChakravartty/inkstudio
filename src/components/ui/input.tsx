import { cn } from '@/lib/cn';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-ink-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2.5 text-sm text-ink-100',
          'placeholder:text-ink-500 transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-cinnamon/20 focus:border-cinnamon/50',
          className
        )}
        {...props}
      />
    </div>
  )
);

Input.displayName = 'Input';