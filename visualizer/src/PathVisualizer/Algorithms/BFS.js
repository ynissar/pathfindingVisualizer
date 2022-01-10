import { getUnvisitedNeighbours } from "./general";

function BSF(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const visitedNodesInOrder = [];
  const nodeQueue = [];
  nodeQueue.push(startNode);
  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);

  while (unvisitedNodeQueue.length !== 0) {
    const currentNode = nodeQueue.pop();

    currentUnvisitedAdjacent = getUnvisitedNeighbours(currentNode, grid);

    for (const adjacentNode of currentUnvisitedAdjacent) {
      nodeQueue.push(adjacentNode);
      continue;
    }
  }
}
