import { type TreeNode } from './tree-view';

class TreeFilterService {
  filterTree(filterText: string, treeData: TreeNode[]): TreeNode[] {
    const normalizedFilter = filterText.toLowerCase().trim();
    
    this.markMatchingNodesAndRelatives(treeData, normalizedFilter);
    return [...treeData];
  }

  private setAllNodesDisplayed(nodes: TreeNode[], isDisplayed: boolean): void {
    nodes.forEach(node => {
      node.isDisplayed = isDisplayed;
      if (node.children) {
        this.setAllNodesDisplayed(node.children, isDisplayed);
      }
    });
  }

  private markMatchingNodesAndRelatives(nodes: TreeNode[], filterText: string): boolean {
    let isChildrenMatched = false;
    nodes.forEach(node => {
      if (node.name.toLowerCase().includes(filterText) || filterText === '' || filterText == undefined){
        node.isDisplayed = true;
        this.setAllNodesDisplayed(node.children ?? [], true);
        isChildrenMatched = true;
      } else {
        if (this.markMatchingNodesAndRelatives(node.children ?? [], filterText)) {
          node.isDisplayed = true;
          isChildrenMatched = true;
        } else {
          node.isDisplayed = false;
        }
      }
    });

    return isChildrenMatched;        
  }
}

export const treeFilterService = new TreeFilterService();

