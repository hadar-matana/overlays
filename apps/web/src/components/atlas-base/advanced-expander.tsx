import { type FunctionComponent } from 'react';
import { Expander } from './Expander';
import ResolutionFilter, { type ResolutionFilterProps } from '../resolution-filter';

export const AdvancedExpander: FunctionComponent<ResolutionFilterProps> = ({
    fromValue,
    toValue,
    onFromChange,
    onToChange
}: ResolutionFilterProps) => {
  return (
    <Expander
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