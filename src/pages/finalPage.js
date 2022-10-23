import React from "react";
import Link from "next/link";
import FloatingImages from "../Components/floatingImages";
import Router from "next/router";

const {
  finalDalleAssembled,
  responses,
} = require("../Components/assembler_Obj");

class FinalPage extends React.Component {
  state = {
    display: true,
    restartTimeout: null,

    //text translations
    thankYou: {
      ENG: "Thank you for participation!",
      CZ: "Děkujeme za účast!",
      DE: "Danke für die Teilnahme!",
    },
    artworkText: {
      ENG: "Go checkout your artwork in Blindspot booth (7A)!",
      CZ: "Podívejte se na své umění u Blindspot (7A)!",
      DE: "Schauen Sie sich Ihr Kunstwerk im Blindspot-Stand (7A) an!",
    },
    clickAnywhere: {
      ENG: "Click anywhere to go to the beginning",
      CZ: "Klikněte kamkoli, abyste se vrátili na začátek",
      DE: "Klicken Sie irgendwohin, um zum Anfang zurückzukehren",
    },

    // constants
    RESTART_INTERVAL: 200000,
    SPAWN_RESTART_BUTTON_INTERVAL: 2000,
  };

  componentDidMount() {
    console.log(finalDalleAssembled.language);

    let img = document.getElementById("final-page-gallery-img");
    img.src = responses.finalDalleImgLink;
    img.onload = () => {
      document.getElementById("wrapper-final").className += " short-fadeIn";
      setTimeout(() => {
        if (
          document.body.contains(document.getElementById("click-to-restart"))
        ) {
          document.getElementById("click-to-restart").style.animation =
            "fadeIn 1s forwards, pulsating-click 0.75s infinite alternate";
        }
      }, this.state.SPAWN_RESTART_BUTTON_INTERVAL);
    };
    //TODO : make this work, so that signature also loads, currently
    //it seems that the signature does not work as src but I dont know why
    let imgSig = document.getElementById("final-page-signature-img");
    imgSig.src = responses.finalDalleImgSignature;

    document.getElementById("final-page").onclick = () => {
      this.returnToStart();
    };

    this.setState({
      restartTimeout: setTimeout(() => {
        // force user to go back to the beginning after X seconds
        this.returnToStart();
      }, this.state.RESTART_INTERVAL),
    });
  }

  returnToStart() {
    document.getElementById("wrapper-final").className = " short-fadeOut";
    document.getElementById("click-to-restart").classList += " short-fadeOut";
    document.getElementById("background-images-final").className =
      " short-fadeOut";

    // go back to the beginning after the animation (1s) is done
    setTimeout(() => {
      clearTimeout(this.state.restartTimeout);
      this.setState({ display: false });
      Router.push("/");
    }, 1000);
  }

  render() {
    let floatingImages;
    if (this.state.display) {
      floatingImages = <FloatingImages />;
    }
    return (
      <div id="final-page">
        <div id="overlay">
          <video autoPlay muted loop id="video-background">
            <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
          </video>
          <div id="wrapper-final">
            <div id="heading-final">
              {this.state.thankYou[finalDalleAssembled.language]}
            </div>
            <div>
              <img id="final-page-gallery-img"></img>
              <img id="final-page-signature-img"></img>
            </div>

            <div id="instructions-final">
              {this.state.artworkText[finalDalleAssembled.language]}
            </div>
          </div>
          <div className="click-to" id="click-to-restart">
            {this.state.clickAnywhere[finalDalleAssembled.language]}
          </div>
        </div>

        <div id="background-images-final">{floatingImages}</div>
      </div>
    );
  }
}

export default FinalPage;
