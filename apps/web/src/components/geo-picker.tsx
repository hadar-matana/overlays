export interface GeoPickerProps {
  toggleGeoPicking: () => void;
  isGeoPickingActive: boolean;
  wktPolygon: string;
}

export function GeoPicker({
  toggleGeoPicking,
  isGeoPickingActive,
  wktPolygon,
}: GeoPickerProps) {
  return (
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
  );
}
