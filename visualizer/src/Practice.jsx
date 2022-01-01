import React, { Component } from "react"
import PracticeChild from "./PracticeChild";

class Practice extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            characters: [[1, 2, 3],[1, 2, 3],[1, 2, 3],[1, 2, 3]], 
        };
    }

    componentDidMount() {
        console.log("mount");
    }


    render() {

        console.log("render");
        return (
            <div>
                <h4>Characters</h4>
                <ul>
                    {
                        this.state.characters.map((int, index) => {
                            return <div key={index}> {
                                (int.map((number, i) => {
                                    return <PracticeChild key={(this.state.characters.length - 1)*index + i}/>
                                }))
                                }
                            </div>
                        })
                    }
                </ul>
            </div>
        )

    }
}

export default Practice;