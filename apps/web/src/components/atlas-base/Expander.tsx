import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@zohan/ui/components/accordion';
import { cn } from '../../lib/utils';

export type ExpanderItem = {
  id: string;
  header: React.ReactNode;
  content?: React.ReactNode;
};

// Tracks how deeply nested this Expander is (0 = top)
const ExpanderDepthContext = React.createContext(0);

export function Expander({
  items,
  className="gap-0",
  itemClassName="rounded-none",
  triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10",
  contentClassName="px-0 pb-3"
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
      <Accordion dir="rtl" type="single" collapsible className={cn('flex w-full flex-col gap-2', className)}>
        {items.map(({ id, header, content }) => (
          <AccordionItem
            key={id}
            value={id}
            className={cn('overflow-hidden rounded-[12px] bg-transparent', itemClassName)}
          >
            <AccordionTrigger
              className={cn(
                'min-h-[22px] rounded-[12px] text-white/90 focus-visible:ring-white/25 focus-visible:ring-offset-0',
                '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:stroke-[1.5] [&>svg]:text-white/80 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out',
                textByDepth,
                paddingByDepth,
                triggerClassName,
              )}
            >
              {header}
            </AccordionTrigger>

            {content && (
              <AccordionContent
                className={cn(
                  'text-sm text-white/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
                  contentPadByDepth,
                  contentClassName,
                )}
              >
                <div className="border-t border-white/10 pt-3 [&>*]:mx-auto text-center">{content}</div>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </ExpanderDepthContext.Provider>
  );
}
