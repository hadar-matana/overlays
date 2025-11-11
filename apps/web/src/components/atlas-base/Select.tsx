import * as RSelect from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Select({
  value,
  onChange,
  options,
  placeholder = 'בחר…',
  className,
  fullWidth = true,
}: {
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: React.ReactNode }[];
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <RSelect.Root dir="rtl" value={value} onValueChange={onChange}>
      <RSelect.Trigger
        aria-label="select"
        className={cn(
          'flex h-6 items-center justify-between rounded-[4px] border border-[#26292F] bg-[#26292F] px-3 text-sm font-medium text-white transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
          fullWidth ? 'w-full' : 'min-w-[88px]',
          className,
        )}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon><ChevronDown className="size-4" /></RSelect.Icon>
      </RSelect.Trigger>

      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
          className="rounded-[4px] border border-[#26292F] bg-[#26292F] shadow-lg"
          style={{ width: 'var(--radix-select-trigger-width)' }}
        >
          <RSelect.Viewport className="flex flex-col gap-1 p-1">
            {options.map(o => (
              <RSelect.Item
                key={o.value}
                value={o.value}
                className="flex h-8 items-center justify-between rounded-[4px] border border-transparent px-3 text-sm text-white/85 outline-none transition-colors hover:bg-white/10 data-[state=checked]:border-[#1FC5A8] data-[state=checked]:bg-[#1FC5A8]/10"
              >
                <RSelect.ItemText>{o.label}</RSelect.ItemText>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}
