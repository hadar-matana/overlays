import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';
import TreeWithFilter from '../atlas-base/tree/tree-with-filter';

interface PhotoFilterProps {
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

export const PhotoFilter: FunctionComponent<PhotoFilterProps> = ({
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

