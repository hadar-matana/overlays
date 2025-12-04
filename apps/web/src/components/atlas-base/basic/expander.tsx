import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@zohan/ui/components/accordion';
import { cn } from '../../../lib/utils';

export type ExpanderItem = {
  id: string;
  header: React.ReactNode;
  content?: React.ReactNode;
};

const ExpanderDepthContext = React.createContext(0);

export function Expander({
  items,
  className = 'gap-0',
  itemClassName = '',
  triggerClassName = 'px-0 py-2 text-white/60',
  contentClassName = 'px-0 pt-4',
}: {
  items: ExpanderItem[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const depth = React.useContext(ExpanderDepthContext);
  const lvl = Math.min(depth, 3);

  const textByDepth = [
    'text-[14px] leading-[16px] font-bold',   // level 0
    'text-[13px] leading-[14px] font-medium', // level 1
    'text-[12px] leading-[14px] font-normal', // level 2
    'text-[11px] leading-[12px] font-normal', // level 3+
  ][lvl];

  const paddingByDepth = [
    'pr-16 pl-4 py-0.5', // level 0
    'pr-12 pl-3 py-0',   // level 1
    'pr-12 pl-3 py-0',   // level 2
    'pr-12 pl-3 py-0',   // level 3+
  ][lvl];

  const contentPadByDepth = [
    'px-4 pb-0', // level 0
    'px-3 pb-0', // level 1
    'px-3 pb-0', // level 2
    'px-3 pb-0', // level 3+
  ][lvl];

  return (
    <ExpanderDepthContext.Provider value={depth + 1}>
      <Accordion
        dir="rtl"
        type="single"
        collapsible
        className={cn('flex w-full flex-col gap-2', className)}
      >
        {items.map(({ id, header, content }) => (
          <AccordionItem
            key={id}
            value={id}
            className={cn(
              'overflow-hidden rounded-[8px] bg-transparent',
              itemClassName,
            )}
          >
            <AccordionTrigger
              className={cn(
                'min-h-[14px] rounded-[8px] text-white/90',
                'bg-transparent',
                'transition-colors duration-150 ease-out',
                'hover:bg-white/5',
                'data-[state=open]:bg-white/7',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/25',
                '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:stroke-[1.5] [&>svg]:text-white/80',
                '[&>svg]:transition-transform [&>svg]:duration-150 [&>svg]:ease-out',
                textByDepth,
                paddingByDepth,
                triggerClassName,
              )}
            >
              <span className="mr-4">{header}</span>
            </AccordionTrigger>

            {content && (
              <AccordionContent
                className={cn(
                  'text-sm text-white/70 overflow-hidden',
                  'transition-all duration-150 ease-out',
                  'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
                  contentPadByDepth,
                  contentClassName,
                )}
              >
                {content}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </ExpanderDepthContext.Provider>
  );
}

