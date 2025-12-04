import { useAppForm } from '@/lib/form-envelops';
import type { FunctionComponent } from 'react';
import { useMapPanelContext } from '@/contexts/map-panel-context';
import { GeoFilter } from './filters/geo-filter';
import { PhotoFilter } from './filters/photo-filter';
import { AdvancedFilter } from './filters/advanced-filter';
import { PrimaryActionButton } from './atlas-base/basic/primary-action-button';
import { SearchByImageIdFilter, type ImageIdSearchMode } from './filters/search-by-image-id-filter';
import { TimeFilter, type TimeMode } from './filters/time-filter';
import moment from 'moment';
import type { AbsoluteTime } from './atlas-base/time/absolute-time-picker';
import type { RelativeTime } from './atlas-base/time/relative-time-picker';

interface SearchFormValues {
  selectedPhotoTypes: string[];
  area: {
    wktPolygon: string;
  };
  resolution: {
    from: number;
    to: number;
  };
  timeFilter: {
    timeMode: TimeMode;
    absolute: AbsoluteTime;
    relative: RelativeTime;
  };
  searchByImageId: {
    searchMode: ImageIdSearchMode;
    imageId: string;
  };
}

export const SearchPanel: FunctionComponent<any> = ({}) => {
  const today = moment();
  const start = today.clone().hour(9).minute(0).second(0).millisecond(0);
  const end = today.clone().day(2).hour(23).minute(0).second(0).millisecond(0);
  const { isGeoPickingActive, setIsGeoPickingActive } = useMapPanelContext();

  const form = useAppForm({
    defaultValues: {
      selectedPhotoTypes: [],
      area: {
        wktPolygon: '',
      },
      resolution: {
        from: 0,
        to: 200,
      },
      timeFilter: {
        timeMode: 'relative',
        absolute: {
          start: start,
          end: end,
        },
        relative: {
          amount: 1,
          units: 'months',
        },
      },
      searchByImageId: {
        searchMode: 'and',
        imageId: '',
      },
    } as SearchFormValues,
    onSubmit: () => {},
  });

  return (
    <>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col h-full min-h-0"
        >
          <GeoFilter isGeoPickingActive={isGeoPickingActive} toggleGeoPicking={setIsGeoPickingActive} />

          <form.Field name="timeFilter">
            {field => {
              const onAbsoluteTimeChange = (time: AbsoluteTime) => {
                field.handleChange((prev: any) => ({ ...prev, absolute: { ...time } }));
              };

              const onRelativeTimeChange = (time: RelativeTime) => {
                field.handleChange((prev: any) => ({ ...prev, relative: { ...time } }));
              };

              const onTimeModeChange = (mode: TimeMode) => {
                field.handleChange((prev: any) => ({ ...prev, timeMode: mode }));
              };

              return (
                <TimeFilter
                  timeMode={field.state.value.timeMode}
                  absoluteTime={field.state.value.absolute}
                  relativeTime={field.state.value.relative}
                  setAbsoluteTime={onAbsoluteTimeChange}
                  setRelativeTime={onRelativeTimeChange}
                  setTimeMode={onTimeModeChange}
                />
              );
            }}
          </form.Field>

          <form.Field name="selectedPhotoTypes">
            {field => {
              const onAddElements = (newTypes: string[]) => {
                const newTypesArray = [...field.state.value, ...newTypes.filter(t => !field.state.value.includes(t))];
                field.handleChange(newTypesArray);
              };
              const onRemoveElements = (removeTypes: string[]) => {
                const newTypesArray = [...field.state.value].filter(t => !removeTypes.includes(t));
                field.handleChange(newTypesArray);
              };
              return (
                <PhotoFilter
                  addElementIds={onAddElements}
                  removeElementIds={onRemoveElements}
                  checkedIds={field.state.value}
                />
              );
            }}
          </form.Field>
          
          <form.Field name="resolution">
            {field => {
              const onFromChange = (newValue: number) => {
                field.handleChange({ ...field.state.value, from: newValue });
              };
              const onToChange = (newValue: number) => {
                field.handleChange({ ...field.state.value, to: newValue });
              };
              return (
                <AdvancedFilter
                  fromValue={field.state.value.from}
                  toValue={field.state.value.to}
                  onFromChange={onFromChange}
                  onToChange={onToChange}
                />
              );
            }}
          </form.Field>
          
          <form.Field name="searchByImageId">
            {field => {
              const onSearchByIdValue = (imageId: string) => {
                field.handleChange({ ...field.state.value, imageId: imageId });
              };

              const onChangeSearchByIdMode = (mode: ImageIdSearchMode) => {
                field.handleChange({ ...field.state.value, searchMode: mode });
              };
              return (
                <SearchByImageIdFilter
                  imageId={field.state.value.imageId}
                  onSearchByIdValue={onSearchByIdValue}
                  onChangeSearchByIdMode={onChangeSearchByIdMode}
                  searchByIdMode={field.state.value.searchMode}
                />
              );
            }}
          </form.Field>

          <div className="mt-auto flex mt-5 ml-3 justify-end">
            <PrimaryActionButton type="button">חפש</PrimaryActionButton>
          </div>
        </form>
      </div>
    </>
  );
};
