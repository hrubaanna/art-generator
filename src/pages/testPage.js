import React from "react";
import TimeoutBox from "../Components/timeoutBox";

class TestPage extends React.Component {
  state = {
    signature_color: "black",
  };

  changeBackground = () => {
    console.log("clicked");
    document.querySelector("div").style.backgroundColor = "red";
  };

  render() {
    return (
      <div>
        <h1>Testing the TimeoutBox</h1>
        <TimeoutBox lang="ENG"></TimeoutBox>
      </div>
    );
  }
}

export default TestPage;
