import React from "react";
import SignatureCanvas from "react-signature-canvas";
import EmailForm from "./emailForm";
import Switch from "react-switch";

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
    sigClass: {
      ENG: "eng-class",
      CZ: "cz-class",
      DE: "de-class",
    },

    signatureColor: "black",
    publishClicked: false,
    signatureChosen: false,
    signatureSrc: "",
    wantToPublish: false,
    penWidth: 3.6,
    toggleChecked: false,
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

  sliderChange = (e) => {
    this.setState({ penWidth: e });
  };

  handleToggle = () => {
    if (this.state.toggleChecked == false) {
      this.setState({ toggleChecked: true });
      this.setState({ signatureColor: "white" });
    } else {
      this.setState({ toggleChecked: false });
      this.setState({ signatureColor: "black" });
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
  };

  cancelPublish = () => {
    document.querySelector("#gallery-publish").style.display = "none";
    this.setState({ publishClicked: true });
  };

  render() {
    // TODO: remove arpiece description, buttons next to each other
    return (
      <div>
        {!this.state.signatureChosen ? (
          <div id="signature-page">
            {/* <img className="final-image" src={this.props.finalImage} /> */}
            <div className="signature-scheme">
              <h1 className="selection-title">
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

              <div class="crop">
                <img src={this.props.finalImage}></img>
              </div>
              <div id="canvas-container">
                <div>
                  <SignatureCanvas
                    canvasProps={{
                      width: 800,
                      height: 400,
                      className: "sigCanvas",
                    }}
                    ref={(ref) => {
                      this.sigPad = ref;
                    }}
                    minWidth={this.state.penWidth}
                    maxWidth={this.state.penWidth}
                    dotSize={this.state.penWidth}
                    penColor={this.state.signatureColor}
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
              {/* <div>
                <h2 className="intensityTitle">Set Intesity and Color</h2>
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
              </div> */}
            </div>
          </div>
        ) : null}

        {!this.state.publishClicked ? (
          <div id="gallery-publish">
            <div className="selection-title" id="publish-title">
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
            signatureColor={this.state.signatureColor}
            selected_pos={this.props.selected_pos}
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
