import { useAppForm } from "@/lib/form-envelops";
import type { FunctionComponent } from "react";
import { GeoPickerExpander } from "./atlas-base/geo-picker-expander";
import { PhotoTreeExpander } from "./atlas-base/photo-tree-expander";
import { AdvancedExpander } from "./atlas-base/advanced-expander";
import { useMapPanelContext } from "@/contexts/map-panel-context";
import SearchByImageId from "./search-by-image-id";
import { PrimaryActionButton } from "./atlas-base/primary-action-button";

export const SearchPanel: FunctionComponent<any> = ({}) => {
    const form = useAppForm({
        defaultValues: {
            selectedPhotoTypes: [] as Array<string>,
            area: {
                wktPolygon: '',
            },
            resolution: {
                from: 0,
                to: 200
            },
            timeFilter: {
                activeFilter: 'fixed',
                range: {
                    from: '',
                    to: ''
                },
                fixed: {
                    count: 1,
                    units: 'month'
                }
            },
            searchByImageId: {
                searchMode: 'and' as 'and' | 'just',
                imageId: ''
            }
        },
        onSubmit: () => {}
    });

    return (<>
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="flex flex-col h-full min-h-0"
            >
                <form.Field name="area">
                    {field => {
                        const {isGeoPickingActive, setIsGeoPickingActive} = useMapPanelContext();

                        return (
                            <GeoPickerExpander
                                wktPolygon={field.state.value.wktPolygon}
                                isGeoPickingActive={isGeoPickingActive}
                                toggleGeoPicking={setIsGeoPickingActive} 
                            />
                        )
                    }}
                </form.Field>
                <form.Field name="selectedPhotoTypes">
                    {field => {
                        const onAddElements = (newTypes: string[]) => {
                            const newTypesArray = [...field.state.value, ...newTypes.filter(t => !field.state.value.includes(t))]
                            field.handleChange(newTypesArray);
                        };
                        const onRemoveElements = (removeTypes: string[]) => {    
                            const newTypesArray = [...field.state.value].filter(t => !removeTypes.includes(t))
                            field.handleChange(newTypesArray);
                        };
                        return (
                            <PhotoTreeExpander 
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
                            field.handleChange({...field.state.value, from: newValue})
                        }
                        const onToChange = (newValue: number) => {
                            field.handleChange({...field.state.value, to: newValue})
                        }
                        return (
                            <AdvancedExpander 
                                fromValue={field.state.value.from}
                                toValue={field.state.value.to}
                                onFromChange={onFromChange}
                                onToChange={onToChange}
                            />
                        )
                    }}
                </form.Field>
                <form.Field name="searchByImageId">
                    {field => {
                        const onSearchByIdValue = (imageId: string) => {
                            field.handleChange({...field.state.value, imageId: imageId});
                        }

                        const onChangeSearchByIdMode = (mode: 'and' | 'just') => {
                            field.handleChange({...field.state.value, searchMode: mode});
                        }
                        return (<SearchByImageId
                            imageId={field.state.value.imageId}
                            onSearchByIdValue={onSearchByIdValue} 
                            onChangeSearchByIdMode={onChangeSearchByIdMode} 
                            searchByIdMode={field.state.value.searchMode}
                        />)
                    }}
                </form.Field>

                {/* <TimeFilter className="w-full" time={time} setTime={setTime} defaultTimeMode="relative" /> */}

                <div className="mt-auto flex justify-end">
                    <PrimaryActionButton type="button">חפש</PrimaryActionButton>
                </div>
            </form>
        </div>
    </>)
}