import { useMemo, useState } from 'react';
import Panel from '@/components/atlas-base/Panel';
import { Expander } from '@/components/atlas-base/Expander';
import { FilterChip } from '@/components/atlas-base/FilterChip';
import { Select } from '@/components/atlas-base/Select';
import { TabSelect } from '@/components/atlas-base/TabSelect';

type TimeOption = '1' | '2' | '3';
type ResultTab = 'first' | 'second' | 'third';

export const BasicPanel = () => {
  const timeOptions = useMemo(
    () => [
      { value: '1' as TimeOption, label: '1' },
      { value: '2' as TimeOption, label: '2' },
      { value: '3' as TimeOption, label: '3' },
    ],
    [],
  );

  const resultTabs = useMemo(
    () => [
      { value: 'first' as ResultTab, label: 'ראשון' },
      { value: 'second' as ResultTab, label: 'שני' },
      { value: 'third' as ResultTab, label: 'שלישי' },
    ],
    [],
  );

  const [selectedTime, setSelectedTime] = useState<TimeOption>('1');
  const [activeResult, setActiveResult] = useState<ResultTab>('first');

  return (
    <Panel>
      <div className="flex w-full flex-col gap-4" dir="rtl">
        <Expander
          className="gap-0"
          itemClassName="rounded-none"
          triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10"
          contentClassName="px-0 pb-3"
          items={[
            {
              id: 'search',
              header: 'חיפוש',
              content: (
                <Expander
                  className="gap-0"
                  itemClassName="rounded-none"
                  triggerClassName="rounded-none px-0 py-2 text-white/60"
                  contentClassName="px-0 pt-2"
                  items={[
                    {
                      id: 'times',
                      header: 'זמנים',
                      content: (
                        <div className="flex items-center justify-between gap-3">
                          <FilterChip variant="ghost">זמן אוחר</FilterChip>
                          <Select
                            value={selectedTime}
                            onChange={(value) => setSelectedTime(value as TimeOption)}
                            options={timeOptions}
                            fullWidth={false}
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              ),
            },
          ]}
        />

        <Expander
          className="gap-3"
          itemClassName="rounded-none"
          triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10"
          contentClassName="px-0 pb-3"
          items={[
            {
              id: 'results',
              header: 'תוצאות',
              content: (
                <TabSelect<ResultTab>
                  value={activeResult}
                  onValueChange={(value) => setActiveResult(value)}
                  options={resultTabs}
                />
              ),
            },
          ]}
        />
      </div>
    </Panel>
  );
};
