import React from "react";
import SignatureCanvas from "react-signature-canvas";
import Router, { withRouter } from "next/router";
import EmailForm from "./emailForm";

class FinalPublishing extends React.Component {
  state = {
    signatureText: {
      ENG: "Add a signature to your artwork",
      CZ: "Přidat k dílu podpis",
      DE: "Fügen Sie Ihrem Kunstwerk eine Signatur hinzu",
    },
    changeSigColor: {
      ENG: "change signature color",
      CZ: "změnit barvu podpisu",
      DE: "ändern Sie die Signaturfarbe",
    },
    signatureAdd: {
      ENG: "add signature",
      CZ: "přidat podpis",
      DE: "signatur hinzufügen",
    },
    signatureClear: {
      ENG: "clear signature",
      CZ: "vymazat podpis",
      DE: "signatur löschen",
    },
    skip: {
      ENG: "skip",
      CZ: "přeskočit",
      DE: "ueberspringen",
    },
    publishQ: {
      ENG: "Do you want to display your artwork in the Albertina Gallery among the other great artists?",
      CZ: "Chcete své dílo vystavit v Galerii Albertina mezi uznávanými umělci?",
      DE: "DE(Chcete své dílo vystavit v Galerii Albertina mezi uznávanými umělci?)",
    },
    DoPublish: {
      ENG: "publish to gallery",
      CZ: "Vystavit v galerii",
      DE: "DE Vystavit v galerii",
    },
    NotPublish: {
      ENG: "do not publish",
      CZ: "Nevystavovat",
      DE: "DE Nevystavovat",
    },
    thanks: {
      ENG: "Thank you for your contribution!",
      CZ: "Děkujeme za příspěvek!",
      DE: "DE Děkujeme za příspěvek!",
    },
    goodbye: {
      ENG: "You are now a real artist, collaborativelly creating a new art form with the brush of artificial intellignce.",
      CZ: "Nyní jste skutečným umělcem, který společně vytváří novou uměleckou formu pomocí štětce umělé inteligence.",
      DE: "DE Du bist ein Kunstmacher",
    },
    signatureColor: "black",
    publishClicked: false,
    signatureChosen: false,
    signatureSrc: "",
    wantToPublish: false,
    penWidth: 3.6,
  };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  showFinalImage = () => {
    //show signature on image
    let finalImage = document.createElement("img");
    finalImage.src = this.props.finalImage;
    finalImage.setAttribute(
      "style",
      "margin: auto; display: block; border-radius: 10px; width: 28em;"
    );
    finalImage.setAttribute("className", "final-image");

    //place final image on canvas
    document.querySelector(".publish-image-wrapper").appendChild(finalImage);
  };

  saveSignature = () => {
    //document.querySelector(".publish-buttons").style.display = "block";
    document.querySelector("#gallery-publish").style.display = "block";

    this.showFinalImage();

    //place signature image on canvas
    let signatureImage = document.createElement("img");
    //set source as the signature image
    signatureImage.src = this.sigPad.getTrimmedCanvas().toDataURL("image/png");
    this.state.signatureSrc = this.sigPad
      .getTrimmedCanvas()
      .toDataURL("image/png");
    signatureImage.setAttribute("class", "signature-image");
    signatureImage.style.display = "block";
    console.log(signatureImage);
    document
      .querySelector(".publish-image-wrapper")
      .appendChild(signatureImage);

    this.setState({ signatureChosen: true });
  };

  confirmPublish = () => {
    this.setState({ wantToPublish: true });
    this.setState({ publishClicked: true });
  };

  hideSignature = () => {
    this.setState({ signatureChosen: true });
    // document.querySelector(".signature-scheme").style.display = "none";
    //document.querySelector(".publish-buttons").style.display = "block";
    this.showFinalImage();
    document.querySelector("#gallery-publish").style.display = "block";
  };

  changeSignatureColor = () => {
    if (this.state.signatureColor === "black") {
      this.setState({ signatureColor: "white" });
      document.querySelector(".signature-image").style.filter = "invert(100%)";
    } else {
      this.setState({ signatureColor: "black" });
      document.querySelector(".signature-image").style.filter = "invert(0%)";
    }
  };

  // showEmailInput = () => {
  //     document.querySelector('.email-input').style.display = "block";
  //     document.querySelector('.email-buttons').style.display = "none";
  // }

  // hideEmailInput = () => {
  //     document.querySelector('.email-buttons').style.display = "none";
  //     document.querySelector('#gallery-publish').style.display = "block";
  // }

  // sendEmail = () => {
  //     document.querySelector('#gallery-publish').style.display = 'block';
  // }

  cancelPublish = () => {
    document.querySelector("#gallery-publish").style.display = "none";
    this.setState({ publishClicked: true });
  };

  sliderChange = (e) => {
    this.setState({ penWidth: e });
  };

  render() {
    // TODO: remove arpiece description, buttons next to each other
    return (
      <div>
        {!this.state.signatureChosen ? (
          <div id="signature-page">
            <img className="final-image" src={this.props.finalImage} />
            <div className="signature-scheme">
              <h1 className="selection-title">
                {this.state.signatureText[this.props.lang]}
              </h1>
              <div id="canvas-container">
                <div>
                  <SignatureCanvas
                    canvasProps={{
                      width: 518,
                      height: 250,
                      className: "sigCanvas",
                    }}
                    ref={(ref) => {
                      this.sigPad = ref;
                    }}
                    minWidth={this.state.penWidth}
                    maxWidth={this.state.penWidth}
                    dotSize={this.state.penWidth}
                    penColor="black"
                  />
                </div>
              </div>
              <button className="btn btn-signature-cancel" onClick={this.clear}>
                {this.state.signatureClear[this.props.lang]}
              </button>
              <button
                className="btn btn-signature-cancel"
                onClick={this.hideSignature}
              >
                {this.state.skip[this.props.lang]}
              </button>
              <button
                className="btn btn-signature"
                onClick={this.saveSignature}
              >
                {this.state.signatureAdd[this.props.lang]}
              </button>
              <div>
                <h2 className="intensityTitle">Set Intesity of pen</h2>
                <input
                  type="range"
                  id="testRange"
                  min="0.8"
                  max="6.4"
                  defaultValue={this.state.penWidth}
                  onChange={(e) => {
                    this.sliderChange(e.target.value);
                  }}
                  step="any"
                ></input>
              </div>
            </div>
          </div>
        ) : null}

        {!this.state.publishClicked ? (
          <div id="gallery-publish">
            <div className="selection-title" id="publish-title">
              {this.state.publishQ[this.props.lang]}
            </div>

            <div class="publish-image-wrapper" />
            <button
              className="btn btn-signature-cancel"
              id="changeSigColor"
              onClick={this.changeSignatureColor}
            >
              {this.state.changeSigColor[this.props.lang]}
            </button>
            <div className="publish-buttons">
              <button
                className="btn btn-signature-cancel"
                onClick={this.cancelPublish}
              >
                {this.state.NotPublish[this.props.lang]}
              </button>
              <button
                className="btn btn-signature"
                onClick={this.confirmPublish}
              >
                {this.state.DoPublish[this.props.lang]}
              </button>
            </div>
          </div>
        ) : (
          <EmailForm
            task_id={this.props.task_id}
            signatureSrc={this.state.signatureSrc}
            query={this.props.query}
            signatureColor={this.state.signatureColor}
            selected_img_pos={this.props.selected_img_pos}
            finalImage={this.props.finalImage}
            lang={this.props.lang}
            wantToPublish={this.state.wantToPublish}

            //todo: figure out how to go to email form after clicking publish
            //should it actually publish in the email component,
            //or should it publish here and then go to email form?
          ></EmailForm>
        )}

        <div id="final-goodbye">
          <h1>{this.state.thanks[this.props.lang]}</h1>
          <h3>{this.state.goodbye[this.props.lang]}</h3>
        </div>
      </div>
    );
  }
}

export default FinalPublishing;
