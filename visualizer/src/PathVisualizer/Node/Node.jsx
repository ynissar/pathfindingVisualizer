import React, { Component } from 'react'
import './Node.css'

class Node extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    // Render()
    // Puts node into the DOM, adds additional class depending on if it is the end or start
    render() {
        const {isEnd, isStart, isChecked} = this.props;
        const endOrStartClass = isEnd 
            ? 'end-node' 
            : isStart 
            ? 'start-node'
            : isChecked
            ? 'checked-node'
            : '';

        return <div className={`node ${endOrStartClass}`}></div>
    }

}

export default Node;

export const DEFAULT_NODE = {
    row: 0,
    column: 0,
}