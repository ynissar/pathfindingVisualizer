import { getAllNodes } from "../general";

export function recursiveDivision(grid, startNode, endNode) {
  let gridWidth = grid.length;
  let gridHeight = grid[0].length;

  let allNodes = getAllNodes(grid);

  let wallNodesInOrder = [];

  return recursiveDiv(
    wallNodesInOrder,
    0,
    0,
    gridWidth,
    gridHeight,
    startNode,
    endNode
  );
}

function recursiveDiv(
  wallNodesInOrder,
  x,
  y,
  width,
  height,
  startNode,
  endNode
) {
  let wallDirection = orientation(width, height);
}

function orientation(width, height) {
  if (width < height) {
    return 1; // height is greater than width --> bisect horizontally
  } else if (height < width) {
    return -1; // width is greater than height --> bisect vertically
  } else {
    let random = Math.random();

    if (random <= 0.5) {
      return 1;
    } else {
      return -1;
    }
  }
}
