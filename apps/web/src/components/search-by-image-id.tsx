import { type FC, useState } from 'react';
import { Search } from 'lucide-react';

export interface SearchByImageIdProps {
  onSearch?: (imageId: string) => void;
}

export const SearchByImageId: FC<SearchByImageIdProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchTriggered = () => {
    if (onSearch) onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchTriggered();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="w-[293px]">
      <div className="flex items-center gap-2 px-1" dir="rtl">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="הזן מזהה תמונה"
          className="flex-1 h-6 px-3 text-sm text-white/90 placeholder:text-slate-400 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:border-[#1FC5A8] focus:ring-0 transition-all duration-200"
        />
        <button
          onClick={handleSearchTriggered}
          className="h-6 w-6 flex items-center justify-center bg-slate-800/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:border-[#1FC5A8] active:bg-slate-600/50 focus:outline-none transition-all duration-200"
        >
          <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default SearchByImageId;
