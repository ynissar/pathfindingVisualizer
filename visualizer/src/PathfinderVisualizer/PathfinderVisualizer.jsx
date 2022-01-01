import React, { Component } from 'react'
import Node from './Node/Node';
import './PathfinderVisualizer.css'

const GRID_ROWS = 20;
const GRID_COLUMNS = 50;
const START_NODE_ROW = 9;
const START_NODE_COLUMN = 9;
const END_NODE_ROW = 9;
const END_NODE_COLUMN = 40;


class PathfinderVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeGrid: createInitialGrid(),
        };
    }

    componentDidMount() {

        console.log("did mount");

        let grid = this.state.createInitialGrid;

        grid.map((rows, rowIndex) => {
            return (
                rows.map((nodes, nodeIndex) => {
                    const adjacentNodes = {adjacentNodes: findAdjacentNodes(rowIndex, nodeIndex)}

                    React.cloneElement(nodes, adjacentNodes);
                })
            )
        })

    }

    render() {

        console.log("render stage");

        console.log(this.state.nodeGrid);

        const divStyle = {
            backgroundColor: 'blue',
            height: '100px',
            width: '400px',
        };

        return (
            <div className='grid-container' style={{gridTemplateColumns: `repeat(${GRID_COLUMNS}, auto)`}}>

                {this.state.nodeGrid}

            </div>
        )
    };

}

function createInitialGrid () {
    let grid = [];
    let nodeList = [];
    let adjacencyMatrix = [];

    for (let rows = 0; rows < GRID_ROWS; rows++) {

        let row = [];
        for (let columns = 0; columns < GRID_COLUMNS; columns++) {
            row.push(<Node 
                key={rows*GRID_COLUMNS + columns} 
                isStart={rows == START_NODE_ROW && columns == START_NODE_COLUMN}
                isEnd={rows == END_NODE_ROW && columns == END_NODE_COLUMN}
                row={rows}
                column={columns}
                findAdjacentNodes={findAdjacentNodes}
            />);
            nodeList.push(rows*GRID_COLUMNS + columns);
        }
        grid.push(row);
    }

    return grid;
}

function findAdjacentNodes(row, column) {

    let grid = this.state.nodeGrid;
    let adjacentNodes = [];

    if (row > 0) adjacentNodes.push(grid[row - 1][column]) // pushes node directly above as adjacent
    if (row < GRID_ROWS - 1) adjacentNodes.push(grid[row + 1][column]) // pushes node directly below as adjacent
    if (column > 0) adjacentNodes.push(grid[row][column - 1]) // pushes node on the left as adjacent
    if (column < GRID_COLUMNS - 1) adjacentNodes.push(grid[row][column + 1]) // pushes node on the right as adjacent 

    return adjacentNodes;
}



export default PathfinderVisualizer;