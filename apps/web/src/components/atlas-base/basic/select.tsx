import type { ReactNode } from 'react';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@zohan/ui/components/select';
import { cn } from '../../../lib/utils';

type SelectOption = { value: string; label: ReactNode };

type AtlasSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  fullWidth?: boolean; 
};

export function Select({
  value,
  onChange,
  options,
  placeholder = 'בחר…',
  className,
  fullWidth = true,
}: AtlasSelectProps) {
  const BG = '#26292F'; 
  const RADIUS = 'rounded-[7px]';
  const BORDER_IDLE = '#26292F';

  const widthClass = fullWidth ? 'w-full' : 'min-w-[110px]';
  const classNameString = typeof className === 'string' ? className : '';
  const hasCustomWidth = /\b(?:max-w|min-w|w)-/u.test(classNameString);

  const triggerClasses = cn(
    'flex h-8 items-center justify-between p-1', 
    '[&>svg]:order-first [&>svg]:ml-0 [&>svg]:mr-2', 
    hasCustomWidth ? null : widthClass, 
    RADIUS,
    'text-sm font-medium text-white',
    `bg-[${BG}]`,
    `border border-[${BORDER_IDLE}]`,
    'transition-colors',
    'hover:border-white/30',
    'border border-[color:var(--line)] bg-[#26292F]', 
    'data-[state=open]:border-[#1FC5A8]', 
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
        className="rounded-[7px] border border-[#26292F] bg-[#26292F] shadow-lg outline-none ring-0"
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
                '!h-6 flex items-center justify-center !px-3 !py-0 rounded-[7px]',
                'text-sm text-white/85 transition-colors border border-transparent !leading-[22px]',
                'outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                '[&>span:first-child]:hidden [&>span:last-child]:w-full [&>span:last-child]:text-right [&>span:last-child]:text-center',
                'data-[state=checked]:!bg-[#1FC5A8]/10 data-[state=checked]:!border-[#1FC5A8]',
                'data-[state=unchecked]:hover:!bg-[#1FC5A8]/10 data-[state=unchecked]:hover:!border-transparent',
                'data-[state=unchecked]:data-[highlighted]:!bg-[#1FC5A8]/10 data-[state=unchecked]:data-[highlighted]:!border-transparent',
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

