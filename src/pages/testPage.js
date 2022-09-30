import React from "react";
import HintCloudTest from "../Components/hintCloudTest";

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
    this.setState({ stage: ++this.state.stage });
  };

  render() {
    return (
      <div>
        <h1>Testing the HintCloudTest</h1>
        <HintCloudTest
          className="hintCloud"
          medium={this.state.medium}
          stage={this.state.stage}
          language={this.state.language}
        />
        <button onClick={this.changeStage}>next stage</button>
      </div>
    );
  }
}

export default TestPage;
