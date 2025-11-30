import Panel from '@/components/atlas-base/Panel';
import { Expander } from '@/components/atlas-base/Expander';
import { OverlayResult } from '@/components/atlas-base/overlay-result';
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
                <div className="flex flex-col gap-3">
                  <SearchPanel />
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
      </div>
    </Panel>
  );
};
