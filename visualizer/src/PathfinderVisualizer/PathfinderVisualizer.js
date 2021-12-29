import React, { Component } from 'react'
import Node from './Node/Node';
import './PathfinderVisualizer.css'

const GRID_ROWS = 15;
const GRID_COLUMNS = 30;
const START_NODE_ROW = 0;
const START_NODE_COLUMN = 0;
const END_NODE_ROW = 14;
const END_NODE_COLUMN = 20;


class PathfinderVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: createInitialGrid(),
        };
    }

    render() {

        console.log("render stage");

        console.log(this.state.grid);

        const divStyle = {
            backgroundColor: 'blue',
            height: '100px',
            width: '400px',
        };

        return (
            <div className='grid-container'>

                {this.state.grid}

            </div>
        )
    };

}

function createInitialGrid () {
    let grid = [];

    for (let rows = 0; rows < GRID_ROWS; rows++) {

        let row = [];
        for (let columns = 0; columns < GRID_COLUMNS; columns++) {
            row.push(<Node 
                key={rows*GRID_COLUMNS + columns} 
                isStart={rows == START_NODE_ROW && columns == START_NODE_COLUMN}
                isEnd={rows == END_NODE_ROW && columns == END_NODE_COLUMN}
                distance={Infinity}
                row={rows}
                column={columns}
                isWall={false}
            />);
        }
        grid.push(row);
    }

    return grid;
}




export default PathfinderVisualizer;