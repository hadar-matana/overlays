import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';
import { TabSelect } from '../atlas-base/basic/tab-select';

export type ImageIdSearchMode = 'and' | 'just';

export interface SearchByImageIdProps {
  imageId: string;
  onSearchByIdValue: (imageId: string) => void
  searchByIdMode: ImageIdSearchMode;
  onChangeSearchByIdMode: (mode: ImageIdSearchMode) => void
}

export const SearchByImageIdFilter: FunctionComponent<SearchByImageIdProps> = ({
  imageId, 
  onSearchByIdValue, 
  searchByIdMode, 
  onChangeSearchByIdMode
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchByIdValue(e.target.value);
  }

  return (
    <Expander
      contentClassName="px-3.5 pt-3.5"
      items={[{
        id: 'search-by-image-id',
        header: 'חיפוש לפי מזהה תמונה',
        content: (
        <div>
          <div>
            <TabSelect
              value={searchByIdMode}
              onValueChange={value => onChangeSearchByIdMode(value as ImageIdSearchMode)}
              options={[
                { label: 'וגם', value: 'and', content: undefined },
                { label: 'רק', value: 'just', content: undefined },
              ]}
            />
          </div>
          <div className="flex items-center gap-2" dir="rtl">
            <input
              type="text"
              value={imageId}
              onChange={handleChange}
              placeholder="הזן מזהה תמונה"
              className="flex-1 h-6 px-3 text-sm text-white/90 placeholder:text-slate-400 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:border-[#1FC5A8] focus:ring-0 transition-all duration-200"
            />
          </div>
        </div>
      )}]}
    />
  );
};

