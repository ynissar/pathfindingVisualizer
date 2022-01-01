import React, { Component } from 'react'
import './Node.css'

class Node extends Component {
    constructor(props) {
        super(props);
        const {isStart, isEnd, row, column} = this.props;
        this.state = {
            isStart: isStart,
            isEnd: isEnd,
            isWall: false,
            isVisited: false,
            distance: Infinity,
        };
    }


    render() {
        const {isStart, isEnd, row, column, findAdjacentNodes} = this.props;

        // console.log(`row: ${row} column: ${column} ${isStart} ${isEnd}`);
        
        if (isEnd) {
            return (
                <div>
                <div className='node ending-node'>
                </div>
            </div>
            )
        }

        else if (isStart) {
            return (
<div>
                <div className='node starting-node'>
                </div>
            </div>
            )
        }

        else {
            return (
            <div>
                <div className='node'>
                </div>
            </div>
            )
        }
    }
}

export default Node;