import { type FunctionComponent } from 'react';
import { Expander } from './Expander';
import {type GeoPickerProps, GeoPicker } from '../geo-picker';

export const GeoPickerExpander: FunctionComponent<GeoPickerProps> = ({
  toggleGeoPicking,
  isGeoPickingActive,
  wktPolygon
}: GeoPickerProps) => {
  return (
    <Expander
      items={[{
        id: 'areas',
        header: 'אזורים',
        content: (<GeoPicker
            wktPolygon={wktPolygon} 
            isGeoPickingActive={isGeoPickingActive}
            toggleGeoPicking={toggleGeoPicking}
        />)
      }]}
    />);
};