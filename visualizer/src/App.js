import { Component } from "react";
import "./App.css";
import PathVisualizer from "./PathVisualizer/PathVisualizer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PathVisualizer />
      </div>
    );
  }
}

export default App;
