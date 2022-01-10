import { Component } from "react";
import "./App.css";
import PathVisualizer from "./PathVisualizer/PathVisualizer";
import Practice from "./PathVisualizer/Practice";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PathVisualizer />
        {/* <Practice /> */}
      </div>
    );
  }
}

export default App;
