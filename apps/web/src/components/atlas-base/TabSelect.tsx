import '@fontsource/heebo/400.css';
import * as Tabs from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function TabSelect<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: {
  value: T;
  onValueChange: (v: T) => void;
  options: { value: T; label: ReactNode }[];
  className?: string;
}) {
  return (
    <Tabs.Root
      dir="rtl"
      value={value}
      onValueChange={(v) => onValueChange(v as T)}
      className="w-full"
    >
      <Tabs.List
        className={cn(
          'flex h-6 w-full overflow-hidden rounded-[4px] border border-[color:var(--line)] bg-[#26292F]',
          className,
        )}
        // apply Heebo once at the list level
        style={{ fontFamily: 'Heebo, sans-serif' }}
      >
        {options.map((option) => (
          <Tabs.Trigger
            key={option.value}
            value={option.value}
            className={cn(
              // layout
              'flex h-full flex-1 basis-0 items-center justify-center px-3 text-center',
              // typography (14/22, regular)
              'text-[14px] leading-[22px] font-normal tracking-[0]',
              // rounding per side in RTL
              'rounded-none first:rounded-tr-[4px] first:rounded-br-[4px] last:rounded-tl-[4px] last:rounded-bl-[4px]',
              // colors + active state
              'text-[color:var(--ctl-muted)] data-[state=active]:text-[#1FC5A8]',
              // border driven by Radix active state (no inline styles needed)
              'border border-transparent data-[state=active]:border-[#1FC5A8]',
              // focus polish
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
              // smooth color changes
              'transition-colors',
            )}
          >
            <span className="w-full text-center">{option.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
