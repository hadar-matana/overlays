import { useState, useEffect, type FunctionComponent } from 'react';
import TreeView, { type TreeNode } from './tree-view';
import SearchInput from './search-input';
import { treeFilterService } from './tree-filter-service';

interface TreeWithFilterProps {
  tree: TreeNode[];
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

export const TreeWithFilter: FunctionComponent<TreeWithFilterProps> = ({
  tree, 
  checkedIds,
  addElementIds,
  removeElementIds
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTree, setFilteredTree] = useState<TreeNode[]>(tree);

  useEffect(() => {
    const filteredTree = treeFilterService.filterTree(searchQuery, tree);
    setFilteredTree(filteredTree);
  }, [searchQuery, tree]);

  return (
    <div className={`w-[293px] p-4`}>
      <div className="mb-4">
        <SearchInput
          searchValue={searchQuery}
          onChangeSearchInput={setSearchQuery}
          placeholder="חיפוש..."
        />
      </div>
      
      <div className="max-h-[252px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-500/50 [&::-webkit-scrollbar-thumb]:rounded-full">
        <TreeView
          treeData={filteredTree} 
          checkedIds={checkedIds}
          addElementIds={addElementIds}
          removeElementIds={removeElementIds}
        />
      </div>
    </div>
  );
};

export default TreeWithFilter;