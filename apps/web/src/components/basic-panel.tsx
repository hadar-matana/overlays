import { useMemo, useState } from 'react';
import Panel from '@/components/atlas-base/Panel';
import { Expander } from '@/components/atlas-base/Expander';
import { PrimaryActionButton } from '@/components/atlas-base/primary-action-button';
import { TabSelect } from '@/components/atlas-base/TabSelect';
import { ResultFirst } from '@/components/atlas-base/result-first';
import { ResultSecond } from '@/components/atlas-base/result-second';
import { ResultThird } from '@/components/atlas-base/result-third';
import { OverlayResult } from '@/components/atlas-base/overlay-result';
import { mockOverlayResults, type OverlayResultItem } from '@/lib/mock-overlays';
import { fetchOverlayResultDetails } from '@/lib/overlay-rpc';
import { TimePicker } from './atlas-base/TimePicker';
import moment from 'moment';
import { PhotoTreeExpander } from './atlas-base/photo-tree-expander';
import { GeoPickerExpander } from './atlas-base/geo-picker-expander';
import { AdvancedExpander } from './atlas-base/advanced-expander';
type ResultTab = 'first' | 'second' | 'third';

export const BasicPanel = () => {
  const [time, setTime] = useState<{ start: moment.Moment; end: moment.Moment }>({ start: moment(), end: moment() });
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
  const [activeResult, setActiveResult] = useState<ResultTab>('first');

  const handleOverlayClick = (item: OverlayResultItem) => {
    // Stub for future ORPC call – replace once you know the API
    void fetchOverlayResultDetails(item);
  };

  return (
    <Panel>
      <div className="flex h-full w-full flex-col gap-4" dir="rtl">
        {/* חיפוש – tabs + textarea + time filters */}
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
                <div className="flex flex-col gap-3">
                  <TabSelect<ResultTab>
                    value={activeResult}
                    onValueChange={value => setActiveResult(value)}
                    options={resultTabs}
                  />

                  <PhotoTreeExpander 
                    addElementIds={() => undefined}
                    checkedIds={[]}
                    removeElementIds={() => undefined}
                  />

                  <GeoPickerExpander isGeoPickingActive={true} toggleGeoPicking={() => undefined} />

                  <AdvancedExpander fromValue='' onFromChange={() => {}} onToChange={() => {}} toValue='' />

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
                          <TimePicker className="w-full" time={time} setTime={setTime} defaultTimeMode="relative" />
                        ),
                      },
                    ]}
                  />
                </div>
              ),
            },
          ]}
        />

        {/* תוצאות – header with count + flat list of rows */}
        <Expander
          className="gap-3"
          itemClassName="rounded-none"
          triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10"
          contentClassName="px-0 pb-3"
          items={[
            {
              id: 'results',
              header: `תוצאות (${mockOverlayResults.length})`,
              content: (
                // horizontal dividers: colorBorderSecondary (#262626)
                <div className="mt-1 divide-y-[1px] divide-[#262626]">
                  {mockOverlayResults.map(item => (
                    <OverlayResult
                      key={item.id}
                      sensor={item.sensor}
                      date={item.date}
                      time={item.time}
                      info={item.info}
                      onClick={() => handleOverlayClick(item)}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />

        <div className="mt-auto flex justify-end">
          <PrimaryActionButton type="button">חפש</PrimaryActionButton>
        </div>
      </div>
    </Panel>
  );
};
