import React, { Component } from 'react'
import './Node.css'

class Node extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const {isEnd, isStart} = this.props;
        const endOrStartClass = isEnd ? 'end-node' : isStart ? 'start-node': '';
        

        return <div className={`node ${endOrStartClass}`}></div>
    }

}

export default Node;