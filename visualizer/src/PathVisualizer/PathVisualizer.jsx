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

// Constants for start node, end node, # of rows and # of columns
const GRID_ROWS = 20;
const GRID_COLUMNS = 50;
let startNodeRow = 5;
let startNodeColumn = 3;
let endNodeRow = 0;
let endNodeColumn = 0;
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

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  // ComponentsDidMount, runs after render(), then causes render to run again
  // Creates grid for PathVisualizer inputting Nodes

  handleMouseDown(row, column) {
    console.log(`mouse down at ${row} ${column}`);
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

  handleMouseUp(row, column) {
    console.log(`mouse up`);
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder) {
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

  visualizeDijkstra() {
    const grid = this.state.grid;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(visitedNodesInOrder);
    console.log(shortestPath);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  visualizeDFS() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = DFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(visitedNodesInOrder);
  }

  visualizeAstar() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = A(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(shortestPath);
    console.log(visitedNodesInOrder);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  visualizeBFS() {
    const { grid } = this.state;

    const startNode = grid[startNodeRow][startNodeColumn];
    const endNode = grid[endNodeRow][endNodeColumn];

    const visitedNodesInOrder = BFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(shortestPath);
    console.log(visitedNodesInOrder);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  clearBoard() {
    const grid = createGrid();

    this.setState({ grid: grid });
  }

  // Render(), mounts to DOM
  // Renders a <Node /> for each item in grid
  render() {
    const { grid } = this.state;
    // console.log(this.state.mouseIsPressed);
    console.log("render");

    return (
      <div>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeDFS()}>
          Visualize Depth-First-Search Algorithm
        </button>
        <button onClick={() => this.visualizeAstar()}>
          Visualize A* Algorithm
        </button>
        <button onClick={() => this.visualizeBFS()}>
          Visualize Breadth-First-Search Algorithm
        </button>
        <button onClick={() => this.clearBoard()}>Clear Board</button>
        <div className="grid">
          {
            // using a nested map methods to create each Node component with props from this.state.grid's nodes' properties
            grid.map((row, rowIndex) => {
              return (
                <div className="row" key={rowIndex}>
                  {row.map((node, nodeIndex) => {
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
                  })}
                </div>
              );
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
