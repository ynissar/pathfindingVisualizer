import React, {Component} from 'react'
import Node from './Node/Node'
import './PathVisualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from './Algorithms/dijkstra'

// Constants for start node, end node, # of rows and # of columns
const GRID_ROWS = 20;
const GRID_COLUMNS = 50;
const START_NODE_ROW = 9;
const START_NODE_COLUMN = 10;
const END_NODE_ROW = 9;
const END_NODE_COLUMN = 40;

class PathVisualizer extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
        }
    }

    // ComponentsDidMount, runs after render(), then causes render to run again
    // Creates grid for PathVisualizer inputting Nodes
    componentDidMount() {

        this.setState({grid: createGrid()}); // Sets state grid
    }

    animateDijkstra(visitedNodesInOrder) {
        console.log(this.state.grid);

        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            console.log(this.state.grid);
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                node.isChecked = true;
                const newGrid = this.state.grid.slice();
                newGrid[node.row][node.column] = node;
                this.setState({grid: newGrid});
            }, 25 * i);
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

    }

    // Render(), mounts to DOM
    // Renders a <Node /> for each item in grid
    render() {

        const {grid} = this.state;
        console.log(grid);
        console.log("render");

        
        return (
            <div>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className='grid'>
                    {
                        // using a nested map methods to create each Node component with props from this.state.grid's nodes' properties
                        grid.map((row, rowIndex) => {
                            return (
                                <div className='row' key={rowIndex}> 
                                    {
                                        row.map((node, nodeIndex) => {
                                            const {row, column, isStart, isEnd, distance, isVisited, isWall, previousNode, isChecked} = node;
                                            return <Node 
                                                key={nodeIndex}
                                                row = {row}
                                                column = {column}
                                                isStart = {isStart}
                                                isEnd = {isEnd}
                                                distance = {distance}
                                                isVisited = {isVisited}
                                                isWall = {isWall}
                                                previousNode = {previousNode}
                                                isChecked = {isChecked}

                                            ></Node>
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

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
        isVisited: false,
        isWall: false,
        previousNode: null,
        isChecked: false,
    }

    return node;
}

export default PathVisualizer;