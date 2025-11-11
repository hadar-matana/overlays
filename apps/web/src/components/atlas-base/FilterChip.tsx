import type { ReactNode } from 'react';

import { Button } from '@zohan/ui/components/button';
import { cn } from '../../lib/utils';

type FilterChipVariant = 'filled' | 'ghost';

type FilterChipProps = {
  children: ReactNode;
  variant?: FilterChipVariant;
  className?: string;
};

export function FilterChip({ children, variant = 'filled', className }: FilterChipProps) {
  const baseClasses =
    'h-6 min-w-[80px] rounded-[4px] border px-3 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0';
  const variantClasses: Record<FilterChipVariant, string> = {
    filled: 'border-[#26292F] bg-[#26292F] hover:border-white/30 hover:bg-[#26292F]',
    ghost: 'border-transparent bg-transparent text-white hover:border-transparent hover:bg-transparent hover:text-white',
  };

  return (
    <Button
      dir="rtl"
      variant="ghost"
      size="sm"
      className={cn(
        'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        baseClasses,
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Button>
  );
}