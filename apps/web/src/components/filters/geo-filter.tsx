import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';

export interface GeoFilterProps {
  toggleGeoPicking: () => void;
  isGeoPickingActive: boolean;
}

export const GeoFilter: FunctionComponent<GeoFilterProps> = ({
  toggleGeoPicking,
  isGeoPickingActive,
}: GeoFilterProps) => {
  return (
    <Expander
      contentClassName="px-3.5 pt-3.5"
      items={[{
        id: 'areas',
        header: 'אזורים',
        content: (
          <button
            onClick={toggleGeoPicking}
            className={`w-[120px] h-6 rounded-lg flex items-center transition-colors ${
                isGeoPickingActive
                ? 'bg-[#4a5578] border border-[#1FC5A8]'
                : 'bg-[#1a1f3a] border border-[#434343] hover:bg-[#252b4a]'
            }`}
            aria-label="Pick border"
          >
            <div className="flex-1 flex items-center justify-center text-white text-sm pt-0.5">
                דקור תיחום
            </div>
            <div className={`w-8 h-full flex items-center justify-center border-r ${
                isGeoPickingActive ? 'border-[#1FC5A8]' : 'border-[#434343]'
            }`}>
                <img src="/svg/geo-icon.svg" alt="geo picker" width="16" height="16" />
            </div>
          </button>
        )
      }]}
    />
  );
};

