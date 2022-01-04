import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Render()
  // Puts node into the DOM, adds additional class depending on if it is the end or start
  render() {
    const {
      row,
      column,
      isEnd,
      isStart,
      isChecked,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const endOrStartClass = isEnd
      ? "end-node"
      : isStart
      ? "start-node"
      : isChecked
      ? "checked-node"
      : isWall
      ? "wall-node"
      : "";

    return (
      <div
        id={`node-${row}-${column}`}
        className={`node ${endOrStartClass}`}
        onMouseDown={() => onMouseDown(row, column)}
        onMouseEnter={() => onMouseEnter(row, column)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;

export const DEFAULT_NODE = {
  row: 0,
  column: 0,
};
