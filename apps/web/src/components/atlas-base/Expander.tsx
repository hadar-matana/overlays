import * as React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ExpanderItem = {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
};

// Tracks how deeply nested this Expander is (0 = top)
const ExpanderDepthContext = React.createContext(0);

export function Expander({
  items,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: {
  items: ExpanderItem[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const depth = React.useContext(ExpanderDepthContext);
  const lvl = Math.min(depth, 3);

  // Typography + spacing ramp by depth
  const textByDepth = [
    'text-[14px] leading-[22px] font-bold',     // level 0
    'text-[13px] leading-[20px] font-medium',   // level 1
    'text-[12px] leading-[18px] font-normal',   // level 2
    'text-[11px] leading-[16px] font-normal',   // level 3+
  ][lvl];

  const paddingByDepth = [
    'px-4 py-3',   // level 0
    'px-3 py-2',   // level 1
    'px-3 py-2',   // level 2
    'px-3 py-1.5', // level 3+
  ][lvl];

  const contentPadByDepth = [
    'px-4 pb-3', // level 0
    'px-3 pb-3', // level 1
    'px-3 pb-2', // level 2
    'px-3 pb-2', // level 3+
  ][lvl];

  return (
    <ExpanderDepthContext.Provider value={depth + 1}>
      <Accordion.Root
        dir="rtl"
        type="single"
        collapsible
        className={cn('flex w-full flex-col gap-2', className)}
      >
        {items.map(({ id, header, content }) => (
          <Accordion.Item
            key={id}
            value={id}
            className={cn('overflow-hidden rounded-[12px] bg-transparent', itemClassName)}
          >
            <Accordion.Header dir="rtl">
              <Accordion.Trigger
                dir="rtl"
                className={cn(
                  'group flex w-full items-center justify-between rounded-[12px] min-h-[22px]',
                  'text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
                  'flex-row-reverse', // header on right, chevron on left
                  textByDepth,
                  paddingByDepth,
                  triggerClassName,
                )}
              >
                <div className="text-right">{header}</div>
                <ChevronDown className="size-4 shrink-0 stroke-[1.5] text-white/80 transition-transform duration-300 ease-out group-data-[state=closed]:-rotate-90 group-data-[state=open]:rotate-0" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content
              className={cn(
                'text-sm text-white/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
                contentPadByDepth,
                contentClassName,
              )}
            >
              <div className="border-t border-white/10 pt-3">{content}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </ExpanderDepthContext.Provider>
  );
}
