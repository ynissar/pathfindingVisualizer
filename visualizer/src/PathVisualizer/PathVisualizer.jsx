import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathVisualizer.css";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./Algorithms/pathfinding/dijkstra";
import { DFS } from "./Algorithms/pathfinding/DFS";
import { BFS } from "./Algorithms/pathfinding/BFS";
import { A } from "./Algorithms/pathfinding/A";
import Header from "./Header";

// Constants for start node, end node, # of rows and # of columns
const GRID_ROWS = 21;
const GRID_COLUMNS = 51;
let startNodeRow = 10;
let startNodeColumn = 3;
let endNodeRow = 10;
let endNodeColumn = 47;

// Toggle whether a start or end nodes needs to be placed
let isThereStart = true;
let isThereEnd = true;

class PathVisualizer extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      grid: createGrid(),
      mouseIsPressed: false,
    };

    // function binding
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.visualizeDFS = this.visualizeDFS.bind(this);
    this.visualizeAstar = this.visualizeAstar.bind(this);
    this.visualizeBFS = this.visualizeBFS.bind(this);
    this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.clearPath = this.clearPath.bind(this);
  }

  // Mouse down method
  // Toggles walls on or off
  // Toggles start or end node placement if necessary
  handleMouseDown(row, column) {
    const newGrid = this.state.grid;
    if (
      !newGrid[row][column].isStart &&
      !newGrid[row][column].isEnd &&
      isThereStart &&
      isThereEnd
    ) {
      newGrid[row][column].isWall = !newGrid[row][column].isWall; // Changes it to whatever is the opposite of isWall
      this.setState({ grid: newGrid, mouseIsPressed: true });
    } else if (newGrid[row][column].isStart) {
      newGrid[row][column].isStart = !newGrid[row][column].isStart;
      isThereStart = false;
      this.setState({ grid: newGrid, mouseIsPressed: false });
      return;
    } else if (newGrid[row][column].isEnd) {
      newGrid[row][column].isEnd = !newGrid[row][column].isEnd;
      isThereEnd = false;
      this.setState({ grid: newGrid, mouseIsPressed: false });
      return;
    } else if (isThereStart == false) {
      newGrid[row][column].isStart = !newGrid[row][column].isStart;
      startNodeRow = row;
      startNodeColumn = column;
      isThereStart = true;
      this.setState({ grid: newGrid, mouseIsPressed: false });
      return;
    } else if (isThereEnd == false) {
      newGrid[row][column].isEnd = !newGrid[row][column].isEnd;
      isThereEnd = true;
      endNodeRow = row;
      endNodeColumn = column;
      this.setState({ grid: newGrid, mouseIsPressed: false });
      return;
    }
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  // Mouse enter function
  // used to check whether the mouse is currently pressed, if it is, then toggle wall on/off
  handleMouseEnter(row, column) {
    console.log(`mouse enter at ${row} ${column}`);
    console.log(this.state.mouseIsPressed);
    if (this.state.mouseIsPressed == false) {
      return;
    }

    const newGrid = this.state.grid;
    newGrid[row][column].isWall = !newGrid[row][column].isWall; // Changes it to whatever is the opposite of isWall
    this.setState({ grid: newGrid });
  }

  // Mouse up function
  // If the mouse goes up, then the mouse is no longer pressed in state
  handleMouseUp(row, column) {
    console.log(`mouse up`);
    this.setState({ mouseIsPressed: false });
  }

  // Animate visited function
  // Animates the nodes that are visited by the given pathfinding algorithm
  animateVisited(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.isChecked = true;
        const newGrid = this.state.grid.slice();
        newGrid[node.row][node.column] = node;
        this.setState({ grid: newGrid });
      }, 20 * i);
    }
  }

  // Animate shortest path function
  // Animates the nodes that are given as shortest path nodes
  animateShortest(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        node.isShortest = true;
        const newGrid = this.state.grid.slice();
        newGrid[node.row][node.column] = node;
        this.setState({ grid: newGrid });
      }, 20 * i);
    }
  }

  // visualize dijkstras algorithm function
  // Visualizes the dijkstras algorithm by apply functions to receive the nodes visited and the shortest path
  visualizeDijkstra() {
    const grid = this.state.grid;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(visitedNodesInOrder);
    console.log(shortestPath);
    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  // visualize DFS algorithm function
  // Visualizes the DFS algorithm by apply functions to receive the nodes visited and the shortest path
  visualizeDFS() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = DFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(visitedNodesInOrder);
  }

  // visualize A* algorithm function
  // Visualizes the A* algorithm by apply functions to receive the nodes visited and the shortest path
  visualizeAstar() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = A(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(shortestPath);
    console.log(visitedNodesInOrder);
    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  // visualize BFS algorithm function
  // Visualizes the dijkstras algorithm by apply functions to receive the nodes visited and the shortest path
  visualizeBFS() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = BFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(shortestPath);
    console.log(visitedNodesInOrder);
    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  // Clear board function
  // Resets grid to its original state
  clearBoard() {
    let grid = createGrid();

    this.setState({ grid: grid });
  }

  // Clear path function
  // resets majority of the qualities of the grid in state, leaving the walls, start, and end nodes
  clearPath() {
    let { grid } = this.state;

    grid.map((row, rowIndex) =>
      row.map((node, index) => {
        node.isChecked = false;
        node.isVisited = false;
        node.previousNode = null;
        node.distance = Infinity;
        node.distanceToEnd = Infinity;
        node.fcost = Infinity;
        node.isShortest = false;
      })
    );

    this.setState({ grid: grid });
  }

  // TODO
  // RECURSIVE DIVISION MAZE GENERATION
  recursiveDivision() {}

  // Render(), mounts to DOM
  // Renders a <Node /> for each item in grid
  render() {
    const { grid } = this.state;
    console.log("render");

    return (
      <div>
        <Header
          visualizeAstar={this.visualizeAstar}
          visualizeDFS={this.visualizeDFS}
          visualizeBFS={this.visualizeBFS}
          visualizeDijkstra={this.visualizeDijkstra}
          clearBoard={this.clearBoard}
          clearPath={this.clearPath}
        ></Header>

        <div className="grid">
          {
            // using a nested map methods to create each Node component with props from this.state.grid's nodes' properties
            grid.map((row, rowIndex) => {
              return row.map((node, nodeIndex) => {
                const {
                  row,
                  column,
                  isStart,
                  isEnd,
                  distance,
                  distanceToEnd,
                  fcost,
                  isVisited,
                  isWall,
                  previousNode,
                  isChecked,
                  isShortest,
                  reference,
                } = node;
                return (
                  <Node
                    key={nodeIndex}
                    row={row}
                    column={column}
                    isStart={isStart}
                    isEnd={isEnd}
                    distance={distance}
                    distanceToEnd={distanceToEnd}
                    fcost={fcost}
                    isVisited={isVisited}
                    isWall={isWall}
                    previousNode={previousNode}
                    isChecked={isChecked}
                    isShortest={isShortest}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
                    ref={reference}
                  ></Node>
                );
              });
            })
          }
        </div>
      </div>
    );
  }
}

// creates grid including all nodes
function createGrid() {
  const grid = [];

  // for loop creating node objects containing node props and pushing it into grid
  for (let row = 0; row < GRID_ROWS; row++) {
    let currRow = [];
    for (let column = 0; column < GRID_COLUMNS; column++) {
      currRow.push(createNode(row, column));
    }
    grid.push(currRow);
  }

  return grid;
}

// function used to create nodes for grid
function createNode(row, column) {
  // Creates node object including all relavent node data
  const node = {
    row,
    column,
    isStart: row == startNodeRow && column == startNodeColumn,
    isEnd: row == endNodeRow && column == endNodeColumn,
    distance: Infinity,
    distanceToEnd: Infinity,
    fcost: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isChecked: false,
    isShortest: false,
    reference: React.createRef(),
  };

  return node;
}

export default PathVisualizer;
