import { getUnvisitedNeighbours, getAllNodes } from "../general";

// IGNORE
// Making my own search algorithm
export function custom(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const visitedNodesInOrder = []; // Array of visited Nodes in order of distance from start
  startNode.distance = 0; // Sets start node = 0
  startNode.distanceToEnd = distanceToEnd(startNode, endNode);
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length !== 0) {
    sortNodesByDistanceFromEnd(unvisitedNodes);

    const currentNode = unvisitedNodes.shift();

    if (currentNode == endNode) {
      return visitedNodesInOrder;
    }

    const currentAdjacentNodes = getUnvisitedNeighbours(currentNode, grid);

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    for (const currentAdjacent of currentAdjacentNodes) {
      currentAdjacent.distanceToEnd = distanceToEnd(currentAdjacent, endNode);
    }
  }

  return visitedNodesInOrder;
}

function distanceToEnd(node, endNode) {
  const changeInRow = Math.abs(node.row - endNode.row);
  const changeInColumn = Math.abs(node.column - endNode.column);

  return changeInColumn + changeInRow;
}

function sortNodesByDistanceFromEnd(unvisitedNodes) {
  unvisitedNodes.sort(
    (nodeA, nodeB) => nodeA.distanceToEnd - nodeB.distanceToEnd
  );
}
