import { getUnvisitedNeighbours } from "../general";

// Breadth first search algorithm
// Returns all of the nodes visited by the algorithm in order
export function BFS(grid, startNode, endNode) {
  // Returns if there is no start node, end node or if they are the same node
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  let visitedNodesInOrder = [];
  let nodeQueue = [];
  nodeQueue.push(startNode);
  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);

  // while there are nodes left on the grid
  while (nodeQueue.length !== 0) {
    let currentNode = nodeQueue.shift();
    visitedNodesInOrder.push(currentNode);

    // If the current node being visited is the end node, return visitedNodesInOrder
    if (currentNode == endNode) {
      return visitedNodesInOrder;
    }

    let currentUnvisitedAdjacent = getUnvisitedNeighbours(currentNode, grid);

    // Pushes adjacent nodes into the nodeQueue
    for (const adjacentNode of currentUnvisitedAdjacent) {
      adjacentNode.previousNode = currentNode;
      adjacentNode.isVisited = true;
      nodeQueue.push(adjacentNode);
    }
  }
}
