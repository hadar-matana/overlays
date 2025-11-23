'use client';

import { createContext, useContext, useState, useMemo, useCallback, type FC } from 'react';
import { Collapsible, CollapsibleContent } from '@zohan/ui/components/collapsible';
import { Button } from '@zohan/ui/components/button';
import { Checkbox } from '@zohan/ui/components/checkbox';
import { cn } from '@zohan/ui/lib/utils';
import { Folder, FolderOpen, File, ChevronLeft } from 'lucide-react';

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  type?: 'folder' | 'file';
}

export interface TreeViewProps {
  sourceTree: TreeNode[];
  treeData: TreeNode[];
  checkedIds: string[];
  addElementIds: (ids: string[]) => void;
  removeElementIds: (ids: string[]) => void;
}

enum CheckboxState {
  UNCHECKED = 'unchecked',
  CHECKED = 'checked',
  INDETERMINATE = 'indeterminate'
}

interface TreeViewContextType {
  checkedItems: Map<string, CheckboxState>;
  toggleItem: (id: string, allData: TreeNode[]) => void;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
}

const TreeViewContext = createContext<TreeViewContextType | null>(null);

const useTreeView = () => {
  const context = useContext(TreeViewContext);
  if (!context) {
    throw new Error('useTreeView must be used within TreeViewProvider');
  }
  return context;
};

const getAllDescendantLeafsIds = (node: TreeNode): string[] => {
  const ids: string[] = !node.children ? [node.id] : [];
  if (node.children) {
    for (const child of node.children) {
      ids.push(...getAllDescendantLeafsIds(child));
    }
  }
  return ids;
};

const findNodeById = (id: string, data: TreeNode[]): TreeNode | null => {
  for (const node of data) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(id, node.children);
      if (found) return found;
    }
  }
  return null;
};

const calculateNodeStateByChildren = (node: TreeNode, checkedMap: Map<string, CheckboxState>): CheckboxState => {
  let checkedCount = 0;
  let totalCount = 0;
  let hasIndeterminate = false;

  for (const child of node.children ?? []) {
    const childState = checkedMap.get(child.id);
    totalCount++;
    
    if (childState === CheckboxState.CHECKED) {
      checkedCount++;
    } else if (childState === CheckboxState.INDETERMINATE) {
      hasIndeterminate = true;
    }
  }

  if (checkedCount === totalCount) {
    return CheckboxState.CHECKED;
  } else if (checkedCount > 0 || hasIndeterminate) {
    return CheckboxState.INDETERMINATE;
  } else {
    return CheckboxState.UNCHECKED;
  }
};

const TreeNodeItem: FC<{ node: TreeNode; level: number; treeData: TreeNode[] }> = ({ node, level, treeData }) => {
  const { checkedItems, toggleItem, expandedItems, toggleExpanded } = useTreeView();
  const isExpanded = expandedItems.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const nodeType = node.type || (hasChildren ? 'folder' : 'file');

  const checkboxState = checkedItems.get(node.id);

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpanded(node.id);
    }
  };

  const handleCheckboxCheckedChange = () => {
    toggleItem(node.id, treeData);
  };

  const handleNodeClick = () => {
    if (hasChildren) {
      toggleExpanded(node.id);
    } else {
      toggleItem(node.id, treeData);
    }
  };

  const getIcon = () => {
    const Icon = nodeType === 'folder' ? (isExpanded ? FolderOpen : Folder) : File;
    return <Icon className="h-4 w-4 text-[#FFFFFFE0]" />;
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          'flex items-center gap-2 py-2 rounded-sm cursor-pointer group hover:bg-white/5',
          'min-h-[36px] justify-start w-full'
        )}
        style={{ paddingRight: `${level * 16 + (hasChildren ? 4 : 12)}px` }}
        onClick={handleNodeClick}
      >
        <div className={cn(
          "flex-shrink-0 flex items-center justify-center h-5",
          hasChildren ? "w-4" : "w-2"
        )}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-4 w-4 p-0 hover:bg-transparent',
              !hasChildren && 'invisible'
            )}
            onClick={handleToggleExpanded}
          >
            {hasChildren && (
              <ChevronLeft className={cn(
                "h-3 w-3 text-muted-foreground transition-transform duration-200 ease-in-out",
                isExpanded && "-rotate-90"
              )} />
            )}
          </Button>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 flex items-center">
          <Checkbox
            indeterminate={checkboxState === CheckboxState.INDETERMINATE}
            indeterminateColor='#1FC5A8'
            checked={checkboxState === CheckboxState.CHECKED}
            onCheckedChange={handleCheckboxCheckedChange}
            className="border-[#434343] bg-[#26292F] data-[state=checked]:bg-[#1FC5A8] data-[state=checked]:border-[#1FC5A8]"
          />
        </div>

        <div className="flex-shrink-0 flex items-center">
          {getIcon()}
        </div>

        <span
          className={cn(
            'text-sm truncate leading-none',
            checkboxState === CheckboxState.CHECKED && 'font-medium'
          )}
        >
          {node.name}
        </span>
      </div>

      {hasChildren && (
        <Collapsible open={isExpanded}>
          <CollapsibleContent className="space-y-0 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            {node.children?.map(child => (
              <TreeNodeItem
                key={child.id}
                node={child}
                level={level + 1}
                treeData={treeData}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export const TreeView: FC<TreeViewProps> = ({
  sourceTree,
  treeData,
  checkedIds,
  addElementIds,
  removeElementIds
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const checkedItems = useMemo(() => {
    const map = new Map<string, CheckboxState>();
    checkedIds.forEach((id: string) => {
      map.set(id, CheckboxState.CHECKED);
    });
    
    const calculateParentStates = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          calculateParentStates(node.children);
          
          const parentState = calculateNodeStateByChildren(node, map);
          map.set(node.id, parentState);
        }
      });
    };
    
    calculateParentStates(sourceTree);
    return map;
  }, [checkedIds]);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleItem = useCallback((id: string, allData: TreeNode[]) => {
    const node = findNodeById(id, allData);
    if (!node) return;

    const currentState = checkedItems.get(node.id);
    const newCheckedState = currentState !== CheckboxState.CHECKED;

    const descendantIds = getAllDescendantLeafsIds(node);
    
    if (newCheckedState) {
      addElementIds(descendantIds);
    } else {
      removeElementIds(descendantIds);
    }
  }, [addElementIds, removeElementIds]);

  const treeContextValue: TreeViewContextType = useMemo(
    () => ({
      checkedItems,
      toggleItem,
      expandedItems,
      toggleExpanded,
    }),
    [checkedItems, toggleItem, expandedItems, toggleExpanded]
  );

  return (
    <TreeViewContext.Provider value={treeContextValue}>
      <div className='text-sm bg-gradient-to-b from-[#080A23] to-[#141529] text-[#FFFFFFE0] flex flex-col items-stretch w-full'>
        {treeData.map(node => (
          <TreeNodeItem key={node.id} node={node} level={0} treeData={treeData} />
        ))}
      </div>
    </TreeViewContext.Provider>
  );
};

export default TreeView;