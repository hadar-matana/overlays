import { type FC } from 'react';
import { TabSelect } from './atlas-base/TabSelect';
import { Expander } from './atlas-base/Expander';

export interface SearchByImageIdProps {
  imageId: string;
  onSearchByIdValue: (imageId: string) => void
  searchByIdMode: 'and' | 'just';
  onChangeSearchByIdMode: (mode: 'and' | 'just') => void
}

export const SearchByImageId: FC<SearchByImageIdProps> = ({ 
  imageId, 
  onSearchByIdValue, 
  searchByIdMode, 
  onChangeSearchByIdMode 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchByIdValue(e.target.value);
  };

  return (
    <Expander
      items={[{
        id: 'search-by-image-id',
        header: 'חיפוש לפי מזהה תמונה',
        content: (
        <div className="w-[293px]">
          <div className='px-1'>
            <TabSelect
              value={searchByIdMode}
              onValueChange={value => onChangeSearchByIdMode(value as 'and' | 'just')}
              options={[
                { label: 'וגם', value: 'and', content: undefined },
                { label: 'רק', value: 'just', content: undefined },
              ]}
            />
          </div>
          <div className="flex items-center gap-2 px-1" dir="rtl">
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

export default SearchByImageId;
