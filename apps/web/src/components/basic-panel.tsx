import Panel from '@/components/panel';
import { Expander } from '@/components/atlas-base/basic/expander';
import { OverlayResult } from '@/components/results/overlay-result';
import { mockOverlayResults, type OverlayResultItem } from '@/lib/mock-overlays';
import { fetchOverlayResultDetails } from '@/lib/overlay-rpc';
import { SearchPanel } from './search-panel';

export const BasicPanel = () => {
  const handleOverlayClick = (item: OverlayResultItem) => {
    // Stub for future ORPC call – replace once you know the API
    void fetchOverlayResultDetails(item);
  };

  return (
    <Panel>
      <div className="flex h-full w-full flex-col gap-1" dir="rtl">
        <Expander
          items={[
            {
              id: 'search',
              header: 'חיפוש',
              content: (
                <div className="flex flex-col gap-3">
                  <SearchPanel />
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
      </div>
    </Panel>
  );
};
