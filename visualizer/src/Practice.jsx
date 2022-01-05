import React, { Component } from "react";
import PracticeChild from "./PracticeChild";

class Practice extends Component {
  constructor(props) {
    super(props);

    let ref = {
      refer: React.createRef(),
    };

    this.state = {
      characters: [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
      foo: [ref],
    };
  }

  componentDidMount() {
    console.log("mount");

    this.state.foo[0].refer.current.setAttribute("class", "chicken");
    this.state.foo[0].refer.current.setAttribute("class", "foul");
    console.log(this.state.foo[0].refer.current);
  }

  render() {
    console.log("render");

    const grid = this.state.foo;

    return (
      <div>
        <button onClick={() => {}}></button>
        <div>
          <PracticeChild reference={grid[0].refer}></PracticeChild>
          {/* <ul>
            {this.state.characters.map((int, index) => {
              return (
                <div key={index}>
                  {int.map((number, i) => {
                    return (
                      <PracticeChild
                        key={(this.state.characters.length - 1) * index + i}
                      />
                    );
                  })}
                </div>
              );
            })}
          </ul> */}
        </div>
      </div>
    );
  }
}

export default Practice;
