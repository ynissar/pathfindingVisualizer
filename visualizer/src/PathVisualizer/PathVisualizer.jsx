import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import { DFS } from "./Algorithms/DFS";
import { BFS } from "./Algorithms/BFS";
import { A } from "./Algorithms/A";

// Constants for start node, end node, # of rows and # of columns
const GRID_ROWS = 10;
const GRID_COLUMNS = 15;
const START_NODE_ROW = 5;
const START_NODE_COLUMN = 3;
const END_NODE_ROW = 5;
const END_NODE_COLUMN = 12;

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
    newGrid[row][column].isWall = !newGrid[row][column].isWall; // Changes it to whatever is the opposite of isWall
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

  handleMouseUp() {
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

    const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(visitedNodesInOrder);
    console.log(shortestPath);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  visualizeDFS() {
    const { grid } = this.state;

    const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    const visitedNodesInOrder = DFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(visitedNodesInOrder);
  }

  visualizeAstar() {
    const { grid } = this.state;

    const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

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

    const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    const visitedNodesInOrder = BFS(grid, startNode, endNode);

    console.log(visitedNodesInOrder);
    const shortestPath = getNodesInShortestPathOrder(endNode);
    console.log(shortestPath);
    console.log(visitedNodesInOrder);
    this.animateDijkstra(visitedNodesInOrder);
    this.animateShortest(shortestPath);
  }

  // Render(), mounts to DOM
  // Renders a <Node /> for each item in grid
  render() {
    const { grid } = this.state;
    // console.log(this.state.mouseIsPressed);
    // console.log("render");

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
    isStart: row == START_NODE_ROW && column == START_NODE_COLUMN,
    isEnd: row == END_NODE_ROW && column == END_NODE_COLUMN,
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
