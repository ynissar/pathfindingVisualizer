import React, {Component} from 'react'
import Node from './Node/Node'
import './PathVisualizer.css';

const GRID_ROWS = 20;
const GRID_COLUMNS = 50;
const START_NODE_ROW = 9;
const START_NODE_COLUMN = 9;
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

        const grid = [];

        // for loop creating node objects containing node props and pushing it into grid
        for (let row = 0; row < GRID_ROWS; row++) {

            let currRow = [];
            for (let column = 0; column < GRID_COLUMNS; column++) {
                const node = {
                    column,
                    row,
                    isStart: row == START_NODE_ROW && column == START_NODE_COLUMN,
                    isEnd: row == END_NODE_ROW && column == END_NODE_COLUMN,
                };
                currRow.push(node);
            }
            grid.push(currRow);
        }
        this.setState({grid: grid}); // Sets state grid
    }

    // Render(), mounts to DOM
    // Renders a <Node /> for each item in grid
    render() {

        const {grid} = this.state;

        console.log(grid);
        
        return (
            <div className='grid'>
                {
                    // using a nested map methods to create each Node component with props from this.state.grid's nodes' properties
                    grid.map((row, rowIndex) => {
                        return (
                            <div className='row' key={rowIndex}> 
                                {
                                    row.map((node, nodeIndex) => {
                                        const {row, column, isStart, isEnd} = node;
                                        return <Node 
                                            key={nodeIndex}
                                            isStart = {isStart}
                                            isEnd = {isEnd}
                                            row = {row}
                                            column = {column}

                                        ></Node>
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )

    }
}

export default PathVisualizer;