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
  return neighbours.filter(
    (neighbour) => !neighbour.isVisited && !neighbour.isWall
  );
}

// Returns an array of all nodes in the grid
export function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

// Sorts the nodes in the given array in order of shortest distance to longest distance (longest being Infinity)
