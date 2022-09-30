import React from "react";
const { responses } = require("../Components/assembler_Obj");

class TestPage extends React.Component {
  state = {
    signature_color: "black",
    medium: "painting",
    stage: 1,
    language: "ENG",
  };

  changeBackground = () => {
    console.log("clicked");
    document.querySelector("div").style.backgroundColor = "red";
  };

  changeStage = () => {
    document
      .getElementById("2")
      .setAttribute("src", responses.finalDalleImgSignature);
  };

  render() {
    return (
      <div>
        <h1>Testing the HintCloudTest</h1>

        <img id="2"></img>
        <button onClick={this.changeStage}>click me</button>
      </div>
    );
  }
}

export default TestPage;
