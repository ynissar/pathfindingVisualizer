import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Should component update lifecycle method
  // Checks whether certain properties affecting the styling of the node have changed
  // If yes, then update the individual component
  shouldComponentUpdate(nextProps) {
    if (
      this.props.isChecked === nextProps.isChecked &&
      this.props.isWall === nextProps.isWall &&
      this.props.isShortest === nextProps.isShortest &&
      this.props.isEnd === nextProps.isEnd &&
      this.props.isStart === nextProps.isStart
    ) {
      return false;
    }
    return true;
  }
  // Render()
  // Puts node into the DOM
  render() {
    const {
      row,
      column,
      isEnd,
      isStart,
      isChecked,
      isShortest,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    // adds additional class based on what type of node it is
    const endOrStartClass = isEnd
      ? "end-node"
      : isStart
      ? "start-node"
      : isShortest && isChecked
      ? "shortest-node"
      : isChecked
      ? "checked-node"
      : isWall
      ? "wall-node"
      : "";

    //returns a node containing mouse down, mouse enter, and mouse up from the parent PathVisualizer component
    return (
      <div
        id={`node-${row}-${column}`}
        className={`node ${endOrStartClass}`}
        onMouseDown={() => onMouseDown(row, column)}
        onMouseEnter={() => onMouseEnter(row, column)}
        onMouseUp={() => onMouseUp(row, column)}
      ></div>
    );
  }
}

export default Node;
