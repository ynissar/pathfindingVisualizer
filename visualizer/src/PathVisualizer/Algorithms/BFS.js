import { getUnvisitedNeighbours } from "./general";

export function BFS(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  let visitedNodesInOrder = [];
  let nodeQueue = [];
  nodeQueue.push(startNode);
  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);

  while (nodeQueue.length !== 0) {
    let currentNode = nodeQueue.shift();
    visitedNodesInOrder.push(currentNode);

    if (currentNode == endNode) {
      return visitedNodesInOrder;
    }

    let currentUnvisitedAdjacent = getUnvisitedNeighbours(currentNode, grid);

    for (const adjacentNode of currentUnvisitedAdjacent) {
      adjacentNode.previousNode = currentNode;
      adjacentNode.isVisited = true;
      nodeQueue.push(adjacentNode);
    }
  }
}
