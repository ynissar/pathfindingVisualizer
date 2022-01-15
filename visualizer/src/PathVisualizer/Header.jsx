import { Component } from "react";
import "./Header.css";
import logo from "./logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      visualizeDFS,
      visualizeBFS,
      visualizeAstar,
      visualizeDijkstra,
      clearBoard,
      clearPath,
    } = this.props;
    return (
      <header>
        <div className="container">
          <img src={logo} alt="logo" className="logo"></img>
          <nav>
            <ul>
              <li>
                <p onClick={() => visualizeDFS()}>Visualize DFS</p>
              </li>
              <li>
                <p onClick={() => visualizeBFS()}>Visualize BFS</p>
              </li>
              <li>
                <p onClick={() => visualizeAstar()}>Visualize A Star</p>
              </li>
              <li>
                <p onClick={() => visualizeDijkstra()}>Visualize Djikstras</p>
              </li>
              <li>
                <p onClick={() => clearBoard()}>Clear Board</p>
              </li>
              <li>
                <p onClick={() => clearPath()}>Clear Path</p>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
