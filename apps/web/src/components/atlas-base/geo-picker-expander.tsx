import { type FunctionComponent } from 'react';
import { Expander } from './Expander';
import {type GeoPickerProps, GeoPicker } from '../geo-picker';

export const GeoPickerExpander: FunctionComponent<GeoPickerProps> = ({
  toggleGeoPicking,
  isGeoPickingActive,
}: GeoPickerProps) => {
  return (
    <Expander
      className="gap-0"
      itemClassName="rounded-none"
      triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10"
      contentClassName="px-0 pb-3"
      items={[{
        id: 'areas',
        header: 'אזורים',
        content: (<GeoPicker 
            isGeoPickingActive={isGeoPickingActive}
            toggleGeoPicking={toggleGeoPicking}
        />)
      }]}
    />);
};