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
      className="gap-0"
      itemClassName="rounded-none"
      triggerClassName="rounded-none px-0 py-2 text-white/60 border-b border-white/10"
      contentClassName="px-0 pb-3"
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