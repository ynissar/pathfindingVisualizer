import { Component } from 'react';
import './App.css';
import PathfinderVisualizer from './PathfinderVisualizer/PathfinderVisualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PathfinderVisualizer />
      </div>
    );
  }
}

export default App;
