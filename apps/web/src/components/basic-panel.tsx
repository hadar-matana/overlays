import { useMemo, useState } from 'react';
import Panel from '@/components/atlas-base/Panel';
import { Expander } from '@/components/atlas-base/Expander';
import { FilterChip } from '@/components/atlas-base/FilterChip';
import { PrimaryActionButton } from '@/components/atlas-base/primary-action-button';
import { Select } from '@/components/atlas-base/Select';
import { TabSelect } from '@/components/atlas-base/TabSelect';
import { ResultFirst } from '@/components/atlas-base/result-first';
import { ResultSecond } from '@/components/atlas-base/result-second';
import { ResultThird } from '@/components/atlas-base/result-third';

type TimeOption = '1' | '2' | '3';
type PeriodOption = 'day' | 'week' | 'vacation';
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

  const periodOptions = useMemo(
    () => [
      { value: 'day' as PeriodOption, label: 'יום' },
      { value: 'week' as PeriodOption, label: 'שבוע' },
      { value: 'vacation' as PeriodOption, label: 'חופש' },
    ],
    [],
  );

  const resultTabs = useMemo(
    () => [
      {
        value: 'first' as ResultTab,
        label: 'ראשון',
        content: <ResultFirst />,
      },
      {
        value: 'second' as ResultTab,
        label: 'שני',
        content: <ResultSecond />,
      },
      {
        value: 'third' as ResultTab,
        label: 'שלישי',
        content: <ResultThird />,
      },
    ],
    [],
  );

  const [selectedTime, setSelectedTime] = useState<TimeOption>('1');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('day');
  const [activeResult, setActiveResult] = useState<ResultTab>('first');

  return (
    <Panel>
      <div className="flex h-full w-full flex-col gap-4" dir="rtl">
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
                          <FilterChip variant="ghost">זמן אחר</FilterChip>
                          <Select
                            value={selectedTime}
                            onChange={(value) => setSelectedTime(value as TimeOption)}
                            options={timeOptions}
                            fullWidth={false}
                            className="w-[100px]"
                          />
                          <Select
                            value={selectedPeriod}
                            onChange={(value) => setSelectedPeriod(value as PeriodOption)}
                            options={periodOptions}
                            fullWidth={false}
                            className="w-[100px]"
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
        <div className="mt-auto flex justify-end">
          <PrimaryActionButton type="button">
            חפש
          </PrimaryActionButton>
        </div>
      </div>
    </Panel>
  );
};