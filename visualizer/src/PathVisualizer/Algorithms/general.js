// returns an array of all of the unvisited neighbours of the given node
export function getUnvisitedNeighbours(node, grid) {
  const neighbours = [];
  const { row, column } = node;
  if (row > 0) {
    neighbours.push(grid[row - 1][column]);
  }
  if (column < grid[0].length - 1) {
    neighbours.push(grid[row][column + 1]);
  }
  if (row < grid.length - 1) {
    neighbours.push(grid[row + 1][column]);
  }
  if (column > 0) {
    neighbours.push(grid[row][column - 1]);
  }
  // Filters all of the neighoubrs that have already been visited or are walls out
  return neighbours.filter(
    (neighbour) => !neighbour.isVisited && !neighbour.isWall
  );
}

// Returns an array of all nodes in the grid
export function getAllNodes(grid) {
  const nodes = [];

  // nested for loop used to push all of the nodes into the nodes array
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}
