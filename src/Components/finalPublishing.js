import React from "react";
import SignatureCanvas from "react-signature-canvas";
import Router, { withRouter } from "next/router";

class FinalPublishing extends React.Component {
  state = {
    signatureText: {
      ENG: "Add a signature to your artwork",
      CZ: "Přidat k dílu podpis",
      DE: "Fügen Sie Ihrem Kunstwerk eine Signatur hinzu",
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
    signature_color: "black",
  };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  saveSignature = () => {
    //document.querySelector(".publish-buttons").style.display = "block";
    document.querySelector("#gallery-publish").style.display = "block";

    //show signature on image
    let finalImage = document.createElement("img");
    finalImage.src = this.props.finalImage;
    finalImage.setAttribute(
      "style",
      "margin: auto; display: block; border-radius: 10px;"
    );
    finalImage.setAttribute("className", "final-image");

    //place final image on canvas
    document.querySelector("#gallery-publish").appendChild(finalImage);

    //place signature image on canvas
    let signatureImage = document.createElement("img");
    //set source as the signature image
    signatureImage.src = this.sigPad.getTrimmedCanvas().toDataURL("image/png");
    signatureImage.setAttribute("class", "signature-image");
    signatureImage.style.display = "block";
    console.log(signatureImage);
    document.querySelector("#gallery-publish").appendChild(signatureImage);

    document.querySelector(".signatureScheme").style.display = "none";
  };

  //add photo to gallery database, show the gallery on the page
  addArt = async (e) => {
    e.preventDefault();

    let artpiece = {
      task_id: this.props.task_id,
      selected_img_pos: this.props.selected_img_pos,
      signature: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
      content: this.props.query,
      //TODO: add email and name
      name: "not yet added",
      email: "not yet added",
      //add source of signature
      created_at: new Date().toISOString(),
      currently_selected: false,
      //TODO: get value of selected img
      signature_color: this.state.signature_color,
      selected_pos: this.props.selected_img_pos,
    };

    //save the artpiece
    let response = await fetch("/api/artwork", {
      method: "POST",
      body: JSON.stringify(artpiece),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      console.log("success");
      // set the message

      //TODO: send photo to DB and to gallery
      document.querySelector("#gallery-publish").style.display = "none";
      document.querySelector("#final-goodbye").style.display = "block";
      document.querySelector(".final-query").style.display = "none";
    } else {
      // set the error
      console.log("error");
    }
  };

  hideSignature = () => {
    document.querySelector(".signatureScheme").style.display = "none";
    //document.querySelector(".publish-buttons").style.display = "block";
    document.querySelector("#gallery-publish").style.display = "block";
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
    Router.push("/");
  };

  render() {
    // TODO: remove arpiece description, buttons next to each other
    return (
      <div>
        <img src={this.props.finalImage} />
        <div className="signatureScheme">
          <h1 className="selection-title">
            {this.state.signatureText[this.props.lang]}
          </h1>
          <div id="canvas-container">
            <div>
              <SignatureCanvas
                canvasProps={{
                  width: 520,
                  height: 250,
                  className: "sigCanvas",
                }}
                ref={(ref) => {
                  this.sigPad = ref;
                }}
                penColor="black"
              />
            </div>
          </div>
          <button
            className="btn btn-signature-cancel"
            onClick={this.hideSignature}
          >
            {this.state.skip[this.props.lang]}
          </button>
          <button className="btn btn-signature-cancel" onClick={this.clear}>
            {this.state.signatureClear[this.props.lang]}
          </button>
          <button className="btn btn-signature" onClick={this.saveSignature}>
            {this.state.signatureAdd[this.props.lang]}
          </button>
        </div>

        {/* TODO: send the photo through email
                <div className="publish-buttons">
                    <div className="email-buttons">
                        <p className="email-prompt">Do you wish to receive your artwork through email?</p>
                        <button className="btn email-prompt" onClick={this.showEmailInput}>Send to Email</button>
                        <button className="btn email-prompt" onClick={this.hideEmailInput}>No thank you</button>
                    </div>

                    <form className="email-input">
                        <input className="input" type="text" placeholder="Enter email"></input>
                        <button className="btn" onClick={this.sendEmail}>Submit</button>
                    </form>
                </div> */}

        <div id="gallery-publish">
          <p className="selection-title" id="publish">
            {this.state.publishQ[this.props.lang]}
          </p>
          <button
            className="btn btn-signature-cancel"
            id="changeSigColor"
            onClick={this.changeSignatureColor}
          >
            change signature color
          </button>
          <div>
            <button
              className="btn btn-signature-cancel"
              onClick={this.cancelPublish}
            >
              {this.state.NotPublish[this.props.lang]}
            </button>
            <button className="btn btn-signature" onClick={this.addArt}>
              {this.state.DoPublish[this.props.lang]}
            </button>
          </div>
        </div>

        <div id="final-goodbye">
          <h1>{this.state.thanks[this.props.lang]}</h1>
          <h3>{this.state.goodbye[this.props.lang]}</h3>
        </div>
      </div>
    );
  }
}

export default FinalPublishing;
