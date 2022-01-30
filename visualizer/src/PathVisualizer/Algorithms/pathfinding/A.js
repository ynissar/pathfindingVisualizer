import { getUnvisitedNeighbours, getAllNodes } from "../general";

// Depth first search algorithm
// Returns all of the nodes visited by the algorithm in order
export function Astar(grid, startNode, endNode) {
  // Returns if there is no start node, end node or if they are the same node
  if (!startNode || !endNode || startNode == endNode) {
    return false;
  }

  const nodesVisitedInOrder = [];

  const openNodes = []; // set of needs to be evaluated
  const closedNodes = []; // set of nodes already evaluated

  // Sets the distance measurements of the node
  startNode.distance = 0;
  startNode.distanceToEnd = distanceToEnd(startNode, endNode);
  startNode.fcost = distanceToEnd(startNode, endNode);

  openNodes.push(startNode);

  // While there are still nodes that need to be visited
  while (openNodes.length !== 0) {
    sortNodesByfcost(openNodes);
    const currentNode = openNodes.shift();
    closedNodes.push(currentNode);
    nodesVisitedInOrder.push(currentNode);

    // If the current node is the end node, returns nodesVisitedInOrder
    if (currentNode == endNode) {
      return nodesVisitedInOrder;
    }

    const currentAdjacentNodes = getUnvisitedNeighbours(currentNode, grid);

    // For each of the adjacent nodes of the current node, updates its various distance properties if it is has not been visited already
    for (const currentAdjacent of currentAdjacentNodes) {
      if (closedNodes.includes(currentAdjacent)) {
      }
      // If the adjacent node is not in the open nodes or if the current distance from the start is greater than current node + 1 (updates path to the adjacent node to be more efficient)
      else if (
        !openNodes.includes(currentAdjacent) ||
        currentAdjacent.distance > currentNode.distance + 1
      ) {
        currentAdjacent.distance = currentNode.distance + 1;
        currentAdjacent.distanceToEnd = distanceToEnd(currentAdjacent, endNode);
        currentAdjacent.fcost =
          currentAdjacent.distance + currentAdjacent.distanceToEnd;
        currentAdjacent.previousNode = currentNode;
        // If the adjacent node is not already in open nodes, push it to openNodes
        if (!openNodes.includes(currentAdjacent)) {
          openNodes.push(currentAdjacent);
        }
      }
    }
  }
}

// Heuristics function used to estimate the distance from the current node to the end node
// Calculates based on the difference in row and column
function distanceToEnd(node, endNode) {
  const changeInRow = Math.abs(node.row - endNode.row);
  const changeInColumn = Math.abs(node.column - endNode.column);

  return changeInColumn + changeInRow;
}

// Sorts the open nodes by their fcost (distance from the start node + distance from the end node)
// If they have the same fcost, sorts them based on their distance from the end node
function sortNodesByfcost(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.fcost == nodeB.fcost) {
      return nodeA.distanceToEnd - nodeB.distanceToEnd;
    } else {
      return nodeA.fcost - nodeB.fcost;
    }
  });
}
