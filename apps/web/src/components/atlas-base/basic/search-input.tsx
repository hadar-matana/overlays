import { type FC } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onChangeSearchInput: (value: string) => void;
  searchValue: string;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  onChangeSearchInput,
  searchValue = '',
  placeholder = "חפש...",
}) => {
  return (
    <div className="relative w-[261px]">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 z-10" 
        strokeWidth={2}
      />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onChangeSearchInput(e.target.value)}
        placeholder={placeholder}
        className="w-full h-6 pl-10 pr-4 text-sm text-white/90 placeholder:text-slate-400 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:border-[#1FC5A8] focus:ring-0 transition-all duration-200"
        dir="rtl"
      />
    </div>
  );
};

export default SearchInput;

