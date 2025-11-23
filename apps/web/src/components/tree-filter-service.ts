import { type TreeNode } from './tree-view';

class TreeFilterService {
  filterTree(filterText: string, treeData: TreeNode[]): TreeNode[] {
    if (!filterText || filterText.trim() === '') {
      return treeData;
    }

    const normalizedFilter = filterText.toLowerCase().trim();
    
    const matchingNodeIds = this.findMatchingNodes(treeData, normalizedFilter);
    
    if (matchingNodeIds.size === 0) {
      return [];
    }

    return this.buildFilteredTree(treeData, matchingNodeIds);
  }

  private findMatchingNodes(nodes: TreeNode[], filterText: string): Set<string> {
    const matchingIds = new Set<string>();

    nodes.forEach(node => this.traverseAndAddMatching(node, filterText, matchingIds));
    return matchingIds;
  }

  private traverseAndAddMatching(node: TreeNode, filterText: string, matchingIds: Set<string>): void {
    const isNodeMatches = node.name.toLowerCase().includes(filterText);
    
    if (isNodeMatches) {
      matchingIds.add(node.id);
    } else if (node.children) {
      node.children.forEach(child => this.traverseAndAddMatching(child, filterText, matchingIds));
    }
  }

  private buildFilteredTree(nodes: TreeNode[], matchingNodeIds: Set<string>): TreeNode[] {
    const filteredNodes: TreeNode[] = [];

    nodes.forEach(node => {
      const processedNode = this.examineNodeForFilteredTree(node, matchingNodeIds);
      if (processedNode) {
        filteredNodes.push(processedNode);
      }
    });

    return filteredNodes;
  }

  private examineNodeForFilteredTree(node: TreeNode, matchingNodeIds: Set<string>): TreeNode | undefined {
    if (matchingNodeIds.has(node.id)) {
      return { ...node };
    }
    
    const filteredChildren = this.examineSubNodesForFilteredTree(node, matchingNodeIds);

    if (filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren
      };
    }
  }

  private examineSubNodesForFilteredTree(node: TreeNode, matchingNodeIds: Set<string>): TreeNode[] {
    if (!node.children) {
      return [];
    }

    return node.children
      .map(child => this.examineNodeForFilteredTree(child, matchingNodeIds))
      .filter((child): child is TreeNode => child !== undefined);
  }
}

export const treeFilterService = new TreeFilterService();