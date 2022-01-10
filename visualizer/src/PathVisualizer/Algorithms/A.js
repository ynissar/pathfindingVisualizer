import { getUnvisitedNeighbours, getAllNodes } from "./general";

export function A(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const unvisitedNodes = getAllNodes(grid);
  const nodesVisitedInOrder = [];

  const openNodes = []; // set of needs to be evaluated
  const closedNodes = []; // set of nodes already evaluated

  startNode.distance = 0;
  startNode.distanceToEnd = distanceToEnd(startNode, endNode);
  startNode.fcost = distanceToEnd(startNode, endNode);

  openNodes.push(startNode);

  while (openNodes.length !== 0) {
    sortNodesByfcost(openNodes);
    const currentNode = openNodes.shift();
    closedNodes.push(currentNode);
    nodesVisitedInOrder.push(currentNode);

    if (currentNode == endNode) {
      return nodesVisitedInOrder;
    }

    const currentAdjacentNodes = getUnvisitedNeighbours(currentNode, grid);

    for (const currentAdjacent of currentAdjacentNodes) {
      if (closedNodes.includes(currentAdjacent)) {
      } else if (
        !openNodes.includes(currentAdjacent) ||
        currentAdjacent.distance > currentNode.distance + 1
      ) {
        currentAdjacent.distance = currentNode.distance + 1;
        currentAdjacent.distanceToEnd = distanceToEnd(currentAdjacent, endNode);
        currentAdjacent.fcost =
          currentAdjacent.distance + currentAdjacent.distanceToEnd;
        currentAdjacent.previousNode = currentNode;
        if (!openNodes.includes(currentAdjacent)) {
          openNodes.push(currentAdjacent);
        }
      }
    }
  }
}

function distanceToEnd(node, endNode) {
  const changeInRow = Math.abs(node.row - endNode.row);
  const changeInColumn = Math.abs(node.column - endNode.column);

  return changeInColumn + changeInRow;
}

function sortNodesByfcost(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.fcost == nodeB.fcost) {
      return nodeA.distanceToEnd - nodeB.distanceToEnd;
    } else {
      return nodeA.fcost - nodeB.fcost;
    }
  });
}
