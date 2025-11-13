import { forwardRef } from 'react';

import { Button, type ButtonProps } from '@zohan/ui/components/button';
import { cn } from '../../lib/utils';

type FilterChipVariant = 'filled' | 'ghost';

type FilterChipProps = Omit<ButtonProps, 'variant' | 'size'> & {
  variant?: FilterChipVariant;
};

const baseClasses =
  'h-6 min-w-[80px] rounded-[4px] border px-3 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0';

const variantClasses: Record<FilterChipVariant, string> = {
  filled: 'border-[#26292F] bg-[#26292F] hover:border-white/30 hover:bg-[#26292F]',
  ghost: 'border-transparent bg-transparent text-white hover:border-transparent hover:bg-transparent hover:text-white',
};

const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, children, dir = 'rtl', variant = 'filled', ...props }, ref) => {
    const resolvedVariantClass = variantClasses[variant] ?? variantClasses.filled;
    const filterChipClasses = cn(baseClasses, resolvedVariantClass, className);

    return (
      <Button
        ref={ref}
        dir={dir}
        variant="ghost"
        size="sm"
        className={filterChipClasses}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

FilterChip.displayName = 'FilterChip';

export { FilterChip };