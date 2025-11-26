import { type FunctionComponent } from 'react';
import { Expander } from './Expander';
import TreeWithFilter from '../tree-with-filter';

interface PhotoTreeExpanderProps {
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

export const PhotoTreeExpander: FunctionComponent<PhotoTreeExpanderProps> = ({
  checkedIds,
  addElementIds,
  removeElementIds
}) => {
  return (
    <Expander
      items={[{
        id: 'photo-type',
        header: 'סוג צילום',
        content: (<TreeWithFilter 
            addElementIds={addElementIds}
            checkedIds={checkedIds}
            removeElementIds={removeElementIds}
            tree={[]}
        />)
      }]}
    />);
};