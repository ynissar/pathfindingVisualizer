import { getUnvisitedNeighbours } from "../general";

export function DFS(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const visitedNodesInOrder = [];

  DFSrecursion(grid, startNode, visitedNodesInOrder, endNode);

  return visitedNodesInOrder;
}

function DFSrecursion(grid, startNode, visitedNodesInOrder, endNode) {
  if (startNode == endNode) {
    return true;
  }

  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);
  const unvisitedAdjacentNodes = getUnvisitedNeighbours(startNode, grid);

  for (const unvisitedAdjacent of unvisitedAdjacentNodes) {
    if (DFSrecursion(grid, unvisitedAdjacent, visitedNodesInOrder, endNode)) {
      return true;
    }
  }
}
