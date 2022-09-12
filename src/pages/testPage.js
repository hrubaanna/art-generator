import React from "react";
import SignatureCanvas from "react-signature-canvas";

class TestPage extends React.Component {
  state = {
    signature_color: "black",
  };

  showFavorite = (e) => {};

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  changeSignatureColor = () => {
    if (this.state.signature_color === "black") {
      this.setState({ signature_color: "white" });
      document.querySelector(".signature-image").style.filter = "invert(100%)";
    } else {
      this.setState({ signature_color: "black" });
      document.querySelector(".signature-image").style.filter = "invert(0%)";
    }
  };

  saveSignature = () => {
    //place signature image on canvas
    let signatureImage = document.createElement("img");
    //set source as the signature image
    signatureImage.src = this.sigPad.getTrimmedCanvas().toDataURL("image/png");
    signatureImage.setAttribute("class", "signature-image");

    document.querySelector("div").appendChild(signatureImage);

    document
      .querySelector("img")
      .setAttribute(
        "style",
        "margin: auto; display: block; border-radius: 10px;"
      );
  };

  render() {
    return (
      <div>
        <img src="/TestPhotos/DALLE_1.png"></img>
        <SignatureCanvas
          canvasProps={{
            width: 400,
            height: 250,
            className: "sigCanvas",
          }}
          ref={(ref) => {
            this.sigPad = ref;
          }}
          penColor="black"
        />
        <button onClick={this.saveSignature}>Save</button>
        <button onClick={this.clear}>Clear</button>
        <button onClick={this.changeSignatureColor}>Change Color</button>
      </div>
    );
  }
}

export default TestPage;
