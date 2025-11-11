import type { ReactNode } from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@zohan/ui/components/select';
import { cn } from '../../lib/utils';

type SelectOption = { value: string; label: ReactNode };

type AtlasSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  fullWidth?: boolean; // true = width: 100% (Figma says "Fill"); false = min width only (134px)
};

export function Select({
  value,
  onChange,
  options,
  placeholder = 'בחר…',
  className,
  fullWidth = true,
}: AtlasSelectProps) {
  // Figma tokens
  const BG = '#26292F'; // colorBgContainer
  const RADIUS = 'rounded-[4px]'; // border radius
  const BORDER_IDLE = '#26292F'; // outlined idle

  const widthClass = fullWidth ? 'w-full' : 'min-w-[110px]';
  const classNameString = typeof className === 'string' ? className : '';
  const hasCustomWidth = /\b(?:max-w|min-w|w)-/u.test(classNameString);

  const triggerClasses = cn(
    // layout
    'flex h-6 items-center px-3', // Height 24px, small paddings
    '[&>svg]:order-first [&>svg]:ml-0 [&>svg]:mr-2', // Move chevron to left with proper spacing
    hasCustomWidth ? null : widthClass, // "Fill (134px)"
    // visuals
    RADIUS,
    'text-sm font-medium text-white',
    `bg-[${BG}]`,
    `border border-[${BORDER_IDLE}]`, // outlined 1px
    // states
    'transition-colors',
    'hover:border-white/30', // subtle hover (optional — remove if you don't want it)
    'data-[state=open]:border-[#1FC5A8]', // active/open -> primary green border
    // accessibility: remove default rings/outlines
    'outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
    className,
  );

  return (
    <ShadcnSelect dir="rtl" value={value} onValueChange={onChange}>
      <SelectTrigger className={triggerClasses} aria-label="select">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        side="bottom"
        align="end"
        sideOffset={4}
        className="rounded-[4px] border border-[#26292F] bg-[#26292F] shadow-lg outline-none ring-0"
        style={{
          width: 'var(--radix-select-trigger-width)',
          minWidth: 'var(--radix-select-trigger-width)',
          maxWidth: 'var(--radix-select-trigger-width)',
        }}
      >
        <div className="flex flex-col gap-1 p-1">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                // force size to match design (shadcn defaults to h-10)
                '!h-6 flex items-center justify-center !px-3 !py-0 rounded-[4px]',
                'text-sm text-white/85 transition-colors border border-transparent !leading-[22px]',
                // kill rings/glow
                'outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                // internal spans RTL
                '[&>span:first-child]:hidden [&>span:last-child]:w-full [&>span:last-child]:text-right [&>span:last-child]:text-center',
                // SELECTED: green outline + subtle green fill
                'data-[state=checked]:!bg-[#1FC5A8]/10 data-[state=checked]:!border-[#1FC5A8]',
                // UNSELECTED: hover/keyboard highlight -> same fill, NO outline
                'data-[state=unchecked]:hover:!bg-[#1FC5A8]/10 data-[state=unchecked]:hover:!border-transparent',
                'data-[state=unchecked]:data-[highlighted]:!bg-[#1FC5A8]/10 data-[state=unchecked]:data-[highlighted]:!border-transparent',
                // neutralize any default highlighted text color
                'data-[highlighted]:!text-white/85'
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </ShadcnSelect>
  );
}