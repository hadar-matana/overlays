import { useState } from 'react';
import Panel from '@/components/panel';
import { Expander } from '@/components/atlas-base/basic/expander';
import { PrimaryActionButton } from '@/components/atlas-base/basic/primary-action-button';
import { OverlayResult } from '@/components/results/overlay-result';
import { mockOverlayResults, type OverlayResultItem } from '@/lib/mock-overlays';
import { fetchOverlayResultDetails } from '@/lib/overlay-rpc';
import moment from 'moment';
import { PhotoFilter } from './filters/photo-filter';
import { GeoFilter } from './filters/geo-filter';
import { AdvancedFilter } from './filters/advanced-filter';
import { TimeFilter } from './filters/time-filter';
import { SearchByImageIdFilter } from './filters/search-by-image-id-filter';

export const BasicPanel = () => {
  const [time, setTime] = useState<{ start: moment.Moment; end: moment.Moment }>(() => {
    const today = moment();
    const start = today.clone().hour(9).minute(0).second(0).millisecond(0);
    const end = today.clone().hour(23).minute(0).second(0).millisecond(0);

    return { start, end };
  });

  const handleOverlayClick = (item: OverlayResultItem) => {
    // Stub for future ORPC call – replace once you know the API
    void fetchOverlayResultDetails(item);
  };

  return (
    <Panel>
      <div className="flex h-full w-full flex-col gap-4" dir="rtl">
        {/* חיפוש – filters + time */}
        <Expander
          items={[
            {
              id: 'search',
              header: 'חיפוש',
              content: (
                <div className="flex flex-col gap-3">
                  <PhotoFilter
                    addElementIds={() => undefined}
                    checkedIds={[]}
                    removeElementIds={() => undefined}
                  />

                  <GeoFilter
                    isGeoPickingActive={true}
                    toggleGeoPicking={() => undefined}
                  />

                  <AdvancedFilter
                    fromValue=""
                    onFromChange={() => {}}
                    onToChange={() => {}}
                    toValue=""
                  />

                  <TimeFilter
                    className="w-full"
                    time={time}
                    setTime={setTime}
                    defaultTimeMode="relative"
                  />

                  <SearchByImageIdFilter
                    onSearch={(value: string) => console.log(value)}
                  />
                </div>
              ),
            },
          ]}
        />

        <Expander
          items={[
            {
              id: 'results',
              header: `תוצאות (${mockOverlayResults.length})`,
              content: (
                <div className="mt-1 divide-y-[1px] divide-[#262626]">
                  {mockOverlayResults.map((item) => (
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
