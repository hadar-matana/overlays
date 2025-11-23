import { useState, useEffect, type FunctionComponent } from 'react';
import TreeView, { type TreeNode } from './tree-view';
import SearchInput from './search-input';
import { treeFilterService } from './tree-filter-service';

interface PhotosFilterProps {
  photoTree: TreeNode[];
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

export const PhotosFilter: FunctionComponent<PhotosFilterProps> = ({
  photoTree, 
  checkedIds,
  addElementIds,
  removeElementIds
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPhotoTree, setFilteredPhotoTree] = useState<TreeNode[]>(photoTree);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPhotoTree(photoTree);
    } else {
      const filtered = treeFilterService.filterTree(searchQuery, photoTree);
      setFilteredPhotoTree(filtered);
    }
  }, [searchQuery]);

  return (
    <div className={`w-[300px] bg-gradient-to-b from-[#080A23] to-[#141529] border border-slate-600/30 rounded-lg p-4`}>
      <div className="mb-4">
        <SearchInput
          searchValue={searchQuery}
          onChangeSearchInput={setSearchQuery}
          placeholder="חיפוש..."
        />
      </div>
      
      <div className="max-h-[252px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-500/50 [&::-webkit-scrollbar-thumb]:rounded-full">
        <TreeView
          sourceTree={photoTree} 
          treeData={filteredPhotoTree} 
          checkedIds={checkedIds}
          addElementIds={addElementIds}
          removeElementIds={removeElementIds}
        />
      </div>
    </div>
  );
};

export default PhotosFilter;