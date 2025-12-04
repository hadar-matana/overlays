import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';
import ResolutionFilter, { type ResolutionFilterProps } from './resolution-filter';

export const AdvancedFilter: FunctionComponent<ResolutionFilterProps> = ({
    fromValue,
    toValue,
    onFromChange,
    onToChange
}: ResolutionFilterProps) => {
  return (
    <Expander
      contentClassName="px-3.5 pt-3.5"
      items={[{
        id: 'advanced',
        header: 'מתקדם',
        content: (<ResolutionFilter 
            fromValue={fromValue}
            toValue={toValue}
            onFromChange={onFromChange}
            onToChange={onToChange}
        />)
      }]}
    />);
};

