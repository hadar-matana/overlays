import '@fontsource/heebo/400.css';
import type { ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@zohan/ui/components/tabs';
import { cn } from '../../../lib/utils';

export function TabSelect<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: {
  value: T;
  onValueChange: (v: T) => void;
  options: { value: T; label: ReactNode; content: ReactNode }[];
  className?: string;
}) {
  return (
    <Tabs dir="rtl" value={value} onValueChange={v => onValueChange(v as T)} className="w-full">
      <TabsList
        className={cn(
          'flex h-6 w-full overflow-hidden rounded-[4px] border border-[color:var(--line)] bg-[#26292F] p-0',
          className,
        )}
        style={{ fontFamily: 'Heebo, sans-serif' }}
      >
        {options.map(option => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              'flex h-full flex-1 basis-0 items-center justify-center px-3 text-center bg-transparent',
              'text-[14px] leading-[22px] font-normal tracking-[0]',
              'rounded-none first:rounded-tr-[4px] first:rounded-br-[4px] last:rounded-tl-[4px] last:rounded-bl-[4px]',
              'text-[color:var(--ctl-muted)] data-[state=active]:text-[#1FC5A8]',
              'border border-transparent data-[state=active]:border-[#1FC5A8] data-[state=active]:!bg-transparent data-[state=active]:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
              'transition-colors',
            )}
          >
            <span className="w-full text-center">{option.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map(option => (
        <TabsContent
          key={option.value}
          value={option.value}
          className="mt-3 w-full text-right text-[14px] leading-[22px] text-white"
        >
          {option.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

