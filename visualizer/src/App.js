import { Component } from 'react';
import './App.css';
import PathVisualizer from './PathVisualizer/PathVisualizer';
import Practice from './Practice';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Practice /> */}
        <PathVisualizer />
      </div>
    );
  }
}

export default App;
