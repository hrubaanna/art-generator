import React from "react";
import SignatureCanvas from "react-signature-canvas";
import EmailForm from "./emailForm";
import Switch from "react-switch";

const { responses } = require("../Components/assembler_Obj");

class FinalPublishing extends React.Component {
  state = {
    signatureText: {
      ENG: "Add a signature to your artwork",
      CZ: "Přidat k dílu podpis",
      DE: "Fügen Sie Ihrem Kunstwerk eine Signatur hinzu",
    },
    sigIntensity: {
      ENG: "set pen intensity",
      CZ: "zvol tloušťku pera",
      DE: "Stiftintensität einstellen",
    },
    sigColor: {
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
    // publishQ: {
    //   ENG: "Do you want to display your artwork in the Albertina Gallery among the other great artists?",
    //   CZ: "Chcete své dílo vystavit v Galerii Albertina mezi uznávanými umělci?",
    //   DE: "Möchten Sie Ihr Kunstwerk in der Albertina-Galerie unter den anderen großen Künstlern ausstellen?",
    // },
    publishQ: {
      ENG: "Do you wish to display your artwork in the Blindspot Booth (7A) among the other great artists?",
      CZ: "Chcete své dílo vystavit v Blindspot Booth (7A) mezi uznávanými umělci?",
      DE: "Möchten Sie Ihr Kunstwerk in der Blindspot Booth (7A) unter den anderen großen Künstlern ausstellen?",
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
    sigClass: {
      ENG: "eng-class",
      CZ: "cz-class",
      DE: "de-class",
    },

    publishClicked: false,
    signatureChosen: false,
    signatureSrc: "",
    wantToPublish: false,
    penWidth: 3.6,
    canvasHeight: 400,
    canvasWidth: 800,
    finalImgWidth: "20em",
    toggleChecked: false,
    largeScree: true,
  };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  compenentDidMount = () => {
    //check screen size
    this.checkScreenSize();
  };

  checkScreenSize = () => {
    //if screen is smaller than 450px, set largeScreen to false
    let x = window.matchMedia("(max-width: 450px)");
    if (x.matches) {
      this.state.largeScreen = false;
      this.state.canvasHeight = 175;
      this.state.canvasWidth = 330;
    } else {
      this.state.finalImgWidth = "28em";
    }
  };

  showFinalImage = () => {
    //show signature on image
    let finalImage = document.createElement("img");
    finalImage.src = this.props.finalImage;
    finalImage.setAttribute("class", "final-image");
    finalImage.setAttribute(
      "style",
      `margin: auto; display: block; border-radius: 10px; width: ${this.state.finalImgWidth};`
    );

    //place final image on canvas
    document.querySelector(".publish-image-wrapper").appendChild(finalImage);
  };

  sliderChange = (e) => {
    this.setState({ penWidth: e });
  };

  handleToggle = () => {
    if (this.state.toggleChecked == false) {
      this.setState({ toggleChecked: true });
    } else {
      this.setState({ toggleChecked: false });
    }
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

  hideSignature = () => {
    this.setState({ signatureChosen: true });
    // document.querySelector(".signature-scheme").style.display = "none";
    //document.querySelector(".publish-buttons").style.display = "block";
    this.showFinalImage();
    document.querySelector("#gallery-publish").style.display = "block";
  };

  confirmPublish = () => {
    this.setState({ wantToPublish: true });
    this.setState({ publishClicked: true });
    responses.finalDalleImgLink = this.props.finalImage;
    responses.finalDalleImgSignature = this.state.signatureSrc;
  };

  cancelPublish = () => {
    document.querySelector("#gallery-publish").style.display = "none";
    this.setState({ publishClicked: true });
    responses.finalDalleImgLink = this.props.finalImage;
    responses.finalDalleImgSignature = this.state.signatureSrc;
  };

  render() {
    // TODO: remove arpiece description, buttons next to each other
    return (
      <div>
        {!this.state.signatureChosen ? (
          <div id="signature-page">
            {/* <img className="final-image" src={this.props.finalImage} /> */}
            <div className="signature-scheme">
              {this.state.largeScreen ? (
                //only show signature details if screen is large
                <div>
                  <h1 className="final-selection-title">
                    {this.state.signatureText[this.props.lang]}
                  </h1>
                  <div className="signature-props">
                    <div>
                      <h2 className="intensityTitle">
                        {this.state.sigIntensity[this.props.lang]}
                      </h2>
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
                    <div>
                      <h2 className="intensityTitle">
                        {this.state.sigColor[this.props.lang]}
                      </h2>
                      <div className="toggleButton">
                        <Switch
                          onChange={this.handleToggle}
                          checked={this.state.toggleChecked}
                          offColor="#000000"
                          onColor="#FFFFFF"
                          uncheckedIcon={false}
                          checkedIcon={false}
                          height={30}
                          width={80}
                          onHandleColor="#f8e1cb"
                          offHandleColor="#f8e1cb"
                          borderRadius={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="crop">
                <img src={this.props.finalImage}></img>
              </div>
              <div id="canvas-container">
                <div>
                  <SignatureCanvas
                    canvasProps={{
                      width: this.state.canvasWidth,
                      height: this.state.canvasHeight,
                      className: "sigCanvas",
                    }}
                    ref={(ref) => {
                      this.sigPad = ref;
                    }}
                    minWidth={parseInt(this.state.penWidth)}
                    maxWidth={parseInt(this.state.penWidth)}
                    dotSize={parseInt(this.state.penWidth)}
                  />
                </div>
              </div>
              <div className="signature-btns">
                <button
                  className="btn btn-signature-cancel"
                  onClick={this.clear}
                >
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
              </div>
            </div>
          </div>
        ) : null}

        {!this.state.publishClicked ? (
          <div id="gallery-publish">
            <div className="final-selection-title" id="publish-title">
              {this.state.publishQ[this.props.lang]}
            </div>

            <div className="publish-image-wrapper" />
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
            selected_pos={this.props.selected_pos}
            finalImage={this.props.finalImage}
            lang={this.props.lang}
            wantToPublish={this.state.wantToPublish}
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
