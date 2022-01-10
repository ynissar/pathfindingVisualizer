// import React, { Component } from "react";
// import Hexagon from "react-hexgrid/lib/Hexagon/Hexagon";
// import "./Node.css";

// class Node extends Component {
//   // Constructor
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (
//       this.props.isChecked === nextProps.isChecked &&
//       this.props.isWall === nextProps.isWall &&
//       this.props.isShortest === nextProps.isShortest
//     ) {
//       return false;
//     }
//     return true;
//   }
//   // Render()
//   // Puts node into the DOM, adds additional class depending on if it is the end or start
//   render() {
//     const {
//       row,
//       column,
//       isEnd,
//       isStart,
//       isChecked,
//       isShortest,
//       isWall,
//       onMouseDown,
//       onMouseEnter,
//       onMouseUp,
//       reference,
//     } = this.props;

//     const endOrStartClass = isEnd
//       ? "end-node"
//       : isStart
//       ? "start-node"
//       : isShortest && isChecked
//       ? "shortest-node"
//       : isChecked
//       ? "checked-node"
//       : isWall
//       ? "wall-node"
//       : "";

//     return (
//       <div
//         ref={reference}
//         id={`node-${row}-${column}`}
//         className={`node bobofinkleton ${endOrStartClass}`}
//         onMouseDown={() => onMouseDown(row, column)}
//         onMouseEnter={() => onMouseEnter(row, column)}
//         onMouseUp={() => onMouseUp()}
//       ></div>
//     );
//   }
// }

// export default Node;
