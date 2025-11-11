import { cn } from '../../lib/utils';

type FilterChipProps = {
  children: React.ReactNode;
  variant?: 'filled' | 'ghost';
  className?: string;
};

export function FilterChip({ children, variant = 'filled', className }: FilterChipProps) {
  return (
    <button
      dir="rtl"
      className={cn(
        'inline-flex h-6 min-w-[134px] items-center justify-center rounded-[4px] border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
        variant === 'filled'
          ? 'border-[#26292F] bg-[#26292F] text-white hover:border-white/30'
          : 'border-transparent bg-transparent text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}