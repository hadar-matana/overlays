import { type FunctionComponent } from 'react';
import { IncrementInput } from './atlas-base/IncrementInput';

export interface ResolutionFilterProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: number) => void;
  onToChange: (value: number) => void;
}

export const ResolutionFilter: FunctionComponent<ResolutionFilterProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange
}) => {
  return (
    <div className="w-[293px]">
      <label className="block text-sm mb-2 text-[#FFFFFFE0] text-right pr-1">
        רזולוציה
      </label>
      
      <div className="flex items-center gap-2 px-1" dir="rtl">
        <span className="text-[#FFFFFFE0] shrink-0">מ</span>
        <IncrementInput className="w-1/3" value={Number(fromValue)} onChange={onFromChange} />
        
        <span className="text-[#FFFFFFE0] shrink-0">עד</span>
        <IncrementInput className="w-1/3" value={Number(toValue)} onChange={onToChange} />
      </div>
    </div>
  );
};

export default ResolutionFilter;
