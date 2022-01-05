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

  componentDidMount() {
    console.log(this.props.reference);
  }

  render() {
    const { reference } = this.props;
    return (
      <div ref={reference}>
        <p>Hello!</p>
      </div>
    );
  }
}

export default PracticeChild;
