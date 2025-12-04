import { type FunctionComponent } from 'react';
import { Expander } from '../atlas-base/basic/expander';
import TreeWithFilter from '../atlas-base/tree/tree-with-filter';
import type { TreeNode } from '../atlas-base/tree/tree-view';

interface PhotoFilterProps {
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

const photoTypeTree: TreeNode[] = [
  {
    id: 'רילס',
    name: 'רילס',
    type: 'folder',
    children: [
    {
      id: 'יוטיוב',
      name: 'יוטיוב',
      type: 'folder',
      children: [
        { id: 'טטטטט', name: 'טטטטט', type: 'file' },
        { id: 'ווווו', name: 'ווווו', type: 'file' },
        { id: 'חחחחח', name: 'חחחחח', type: 'file' },
        { id: 'חוניות', name: 'חוניות', type: 'file' }
      ]
    },
    {
      id: 'ספוטיפיי',
      name: 'ספוטיפיי',
      type: 'folder',
      children: [
        { id: 'קקקקקק', name: 'קקקקקק', type: 'file' },
        { id: 'לללללל', name: 'לללללל', type: 'file' },
        { id: 'צצצצצצ', name: 'צצצצצצ', type: 'file' },
        { id: 'סססססס', name: 'סססססס', type: 'file' }
      ]
    }]
  },
  {
    id: 'וידאו',
    name: 'וידאו',
    type: 'folder',
    children: [{ id: 'עעעע', name: 'עעעע', type: 'file' }]
  },
  {
    id: 'סטילס',
    name: 'סטילס',
    type: 'folder',
    children: [
      { id: 'סטילס-פנורמה', name: 'פנורמה', type: 'file' },
      { id: 'סטילס-יפו', name: 'יפו', type: 'file' },
      { id: 'סטילס-זוג', name: 'זוג', type: 'file' },
      { id: 'סטילס-חוניות', name: 'חוניות', type: 'file' }
    ]
  }
];

export const PhotoFilter: FunctionComponent<PhotoFilterProps> = ({
  checkedIds,
  addElementIds,
  removeElementIds
}) => {
  return (
    <Expander
      contentClassName="px-3.5 pt-3.5"
      items={[{
        id: 'photo-type',
        header: 'סוג צילום',
        content: (<TreeWithFilter 
            addElementIds={addElementIds}
            checkedIds={checkedIds}
            removeElementIds={removeElementIds}
            tree={photoTypeTree}
        />)
      }]}
    />);
};

