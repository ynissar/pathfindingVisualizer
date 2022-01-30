import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathVisualizer.css";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "./Algorithms/pathfinding/dijkstra";
import { DFS } from "./Algorithms/pathfinding/DFS";
import { BFS } from "./Algorithms/pathfinding/BFS";
import { Astar } from "./Algorithms/pathfinding/A";
import Header from "./Header";

// Constants for number of grid rows and columns
const GRID_ROWS = 25;
const GRID_COLUMNS = 51;

// Values determining the start and end nodes's row and column
let startNodeRow = 12;
let startNodeColumn = 3;
let endNodeRow = 12;
let endNodeColumn = 47;

// Toggle whether a start or end nodes needs to be placed
let isThereStart = true;
let isThereEnd = true;

// PathVisualizer Constructor
// Creates page for pathVisualizer and centers around grid in state which visualizes the path
class PathVisualizer extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      grid: createGrid(), // default grid state is an empty grid with a start and end node
      mouseIsPressed: false,
    };

    // function bindings
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

  // Render(), mounts to DOM
  // Renders a <Node /> for each item in grid
  render() {
    const { grid } = this.state;

    return (
      <div>
        {/* Header component creating header */}
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
                } = node; // node from grid
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
                  ></Node>
                );
              });
            })
          }
        </div>
      </div>
    );
  }

  // Mouse down method
  // Toggles walls on or off
  // Toggles start or end node placement if necessary
  handleMouseDown(row, column) {
    const newGrid = this.state.grid;
    // If the node is not the start node or end node and there already is a start node and end node on the grid
    if (
      !newGrid[row][column].isStart &&
      !newGrid[row][column].isEnd &&
      isThereStart &&
      isThereEnd
    ) {
      newGrid[row][column].isWall = !newGrid[row][column].isWall; // Changes it to the is the opposite of isWall for the node
      this.setState({ grid: newGrid, mouseIsPressed: true }); // updates grid in state
    }
    // if the node is the start node
    else if (newGrid[row][column].isStart) {
      newGrid[row][column].isStart = !newGrid[row][column].isStart; // makes the node not the start node
      isThereStart = false; // Sets that there is not a start node
      this.setState({ grid: newGrid, mouseIsPressed: false }); // updates grid in state
      return;
    }
    // if the node is the end node
    else if (newGrid[row][column].isEnd) {
      newGrid[row][column].isEnd = !newGrid[row][column].isEnd; // makes the node not the end node
      isThereEnd = false; // Sets that there is not an end node
      this.setState({ grid: newGrid, mouseIsPressed: false }); // updates grid in state
      return;
    }
    // If there is not a start node at the moment
    else if (isThereStart === false) {
      newGrid[row][column].isStart = !newGrid[row][column].isStart; // makes the node the start node
      startNodeRow = row;
      startNodeColumn = column;
      isThereStart = true; // sets that there is a start node
      this.setState({ grid: newGrid, mouseIsPressed: false }); // updates grid in state
      return;
    }
    // If there is not an end node at the moment
    else if (isThereEnd === false) {
      newGrid[row][column].isEnd = !newGrid[row][column].isEnd; // makes the node the end node
      isThereEnd = true;
      endNodeRow = row;
      endNodeColumn = column; // sets that there is an end node
      this.setState({ grid: newGrid, mouseIsPressed: false }); // updates grid in state
      return;
    }
  }

  // Mouse enter function
  // used to check whether the mouse is currently pressed, if it is, then toggle wall on/off
  handleMouseEnter(row, column) {
    if (this.state.mouseIsPressed === false) {
      // if the mouse is not currently pressed, then return
      return;
    }

    const newGrid = this.state.grid;
    newGrid[row][column].isWall = !newGrid[row][column].isWall; // Changes it to the is the opposite of isWall for the node
    this.setState({ grid: newGrid });
  }

  // Mouse up function
  // If the mouse goes up, then the mouse is no longer pressed in state
  handleMouseUp(row, column) {
    this.setState({ mouseIsPressed: false }); // Sets that the mouse is no longer pressed
  }

  // Animate visited function
  // Animates the nodes that are visited by the given pathfinding algorithm
  animateVisited(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // timeout function set to update whether the node has been checked (visualized) and updates state
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
      // timeout function set to update whether the node is a part of the shortest path and then visualizes it
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
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);

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

    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(visitedNodesInOrder);
  }

  // visualize A* algorithm function
  // Visualizes the A* algorithm by apply functions to receive the nodes visited and the shortest path
  visualizeAstar() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = Astar(grid, startNode, endNode);

    const shortestPath = getNodesInShortestPathOrder(endNode);

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

    const shortestPath = getNodesInShortestPathOrder(endNode);

    this.animateVisited(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  // Clear board function
  // Resets grid to its original state
  clearBoard() {
    let cleanGrid = createGrid();

    this.setState({ grid: cleanGrid });
  }

  // Clear path function
  // resets majority of the qualities of the grid in state, leaving the walls, start, and end nodes
  clearPath() {
    let { grid } = this.state;

    grid.map((row) =>
      row.map((node) => {
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
    isStart: row === startNodeRow && column === startNodeColumn,
    isEnd: row === endNodeRow && column === endNodeColumn,
    distance: Infinity, // distance of path from start node. Used in Djikstra's and A*
    distanceToEnd: Infinity, // distance of path from end node. Used in A*
    fcost: Infinity, // distance from start plus distance to end node. Used in A*
    isVisited: false, // Whether the node has been visited. Used in all algorithms
    isWall: false,
    previousNode: null,
    isChecked: false, // Whether the node has been visualized
    isShortest: false, // Whether the node has been visualized as a shortest node
  };

  return node;
}

export default PathVisualizer;
