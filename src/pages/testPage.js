import React from "react";
import SignatureCanvas from "react-signature-canvas";

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
        <img
          src="/TestPhotos/DALLE_1.png"
          onClick={this.changeBackground}
        ></img>
      </div>
    );
  }
}

export default TestPage;
