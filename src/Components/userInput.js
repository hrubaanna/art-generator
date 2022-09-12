import React from "react";
const { finalDalleAssembled } = require("../Components/assembler_Obj");

/**
 *
 * Form which accepts input from the user.
 *
 */

class UserInput extends React.Component {
  state = {
    finalQuery: "",
  };

  componentDidMount() {
    this.state.finalQuery = finalDalleAssembled.text;
    console.log(this.state.finalQuery);
  }

  render() {
    return (
      <div>
        <p>{this.state.finalQuery}</p>
      </div>
    );
  }
}

export default UserInput;
