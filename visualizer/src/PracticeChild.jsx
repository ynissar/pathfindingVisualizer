import React, { Component } from "react";

class PracticeChild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
    };
  }

  render() {
    return (
      <div>
        <p>Hello!</p>
      </div>
    );
  }
}

export default PracticeChild;
