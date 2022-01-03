export function dijkstra(grid, startNode , endNode) {
    // for edge case where there is no startNode or endNode or both are the same node
    if (!startNode || !endNode || startNode == endNode) {
        return false;
    }

    const visitedNodesInOrder = []; // Array of visited Nodes in order of distance from start
    startNode.distance = 0; // Sets start node = 0
    const unvisitedNodes = getAllNodes(grid); // Gets an array of all nodes in the grid

    // While there are still nodes left in the array of unvisited nodes
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes); // re-sort the nodes by distance (shortest distance nodes always come first)


        const closestNode = unvisitedNodes.shift(); //Shifts first node out of the array

        if (closestNode.isWall) { // If it is a wall, then skip the node
            continue;
        }

        if (closestNode.distance == Infinity) { // if the cloest node is one with a distance of infinity, this means that there aren't any adjacent nodes left
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true; // Sets the current node to isVisited
        console.log(grid);
        visitedNodesInOrder.push(closestNode); // pushes the current node into the array of visited nodes

        if (closestNode === endNode) { // If the node is the end node, then end here
            return visitedNodesInOrder;
        }

        updateUnvisitedNeighbours(closestNode, grid); // updates the adjacent nodes of the current node to set their previous node to the current node and their distance to the current node + 1
    }

}

// Sorts the nodes in the given array in order of shortest distance to longest distance (longest being Infinity)
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Updates the distance and previous node of the  neighbouring nodes of the given node 
function updateUnvisitedNeighbours(node, grid) {
    const neighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of neighbours) {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
    }
}

// returns an array of all of the unvisited neighbours of the given node
function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const {row, column} = node;
    if (row > 0) {
        neighbours.push(grid[row - 1][column]);
    }
    if (row < grid.length -1) {
        neighbours.push(grid[row + 1][column]);
    }
    if (column > 0) {
        neighbours.push(grid[row][column - 1]);
    }
    if (column < grid[0].length - 1) {
        neighbours.push(grid[row][column + 1]);
    }
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

// Returns an array of all nodes in the grid
function getAllNodes(grid) {

    const nodes = [];

    for (const row of grid) {

        for (const node of row) {

            nodes.push(node);
        }
    }

    return nodes;

}

// Works backwards from the end node using its previous nodes
export function getNodesInShortestPathOrder(endNode) {
    const nodesInShortestPathOrder = [];

    let currentNode = endNode;

    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}

