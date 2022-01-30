import { getUnvisitedNeighbours } from "../general";

// Depth first search algorithm
// Returns all of the nodes visited by the algorithm in order
export function DFS(grid, startNode, endNode) {
  // Returns if there is no start node, end node or if they are the same node
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const visitedNodesInOrder = [];

  // Recursively adds nodes to the visitedNodesInOrder
  DFSrecursion(grid, startNode, visitedNodesInOrder, endNode);

  return visitedNodesInOrder;
}

function DFSrecursion(grid, currentNode, visitedNodesInOrder, endNode) {
  // If the currentNode is equal to the end node, return true
  if (currentNode == endNode) {
    return true;
  }

  currentNode.isVisited = true;
  visitedNodesInOrder.push(currentNode); // pushes the currentNode into the nodesVisitedInOrder array
  const unvisitedAdjacentNodes = getUnvisitedNeighbours(currentNode, grid);

  // Applies algorithm to each unvisited adjacent node of currentNode
  for (const unvisitedAdjacent of unvisitedAdjacentNodes) {
    if (DFSrecursion(grid, unvisitedAdjacent, visitedNodesInOrder, endNode)) {
      return true;
    }
  }
}
