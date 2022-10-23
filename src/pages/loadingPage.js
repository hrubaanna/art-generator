import React from "react";
import DalleComponent from "../Components/dalleComponent";
import StartOverButton from "../Components/startOverButton";

const { finalDalleAssembled } = require("../Components/assembler_Obj");
const { Facts } = require("../Components/dataFile.js");

/***
 *
 * The loading page keeps the user pre-occupied
 * while waiting for the image to be generated.
 *
 * It can either showcase previous examples of artworks,
 * or provide fun facts about the artistic process.
 *
 */

class LoadingPage extends React.Component {
  state = {
    funFact: Facts.funFacts[finalDalleAssembled.language][0],
    headings: {
      ENG: "Creating your new artwork:",
      CZ: "Tvé dílo se vytváří:",
      DE: "Erstellen Sie Ihr neues Kunstwerk:",
    },
    hideFacts: false,
  };

  componentDidMount() {
    this.checkScreenSize();
    this.updateFact();
  }

  checkScreenSize = () => {
    //if screen is smaller than 450px, set largeScreen to false
    let x = window.matchMedia("(max-width: 450px)");
    if (x.matches) {
      //hide facts when loading page is small
      console.log("small screen, hiding facts");
      this.state.hideFacts = true;
    }
  };

  updateFact = () => {
    //every 5 seconds, update the fact
    setInterval(() => {
      let randomFact =
        Facts.funFacts[finalDalleAssembled.language][
          Math.floor(
            Math.random() * Facts.funFacts[finalDalleAssembled.language].length
          )
        ];
      this.setState({ funFact: randomFact });
      this.state.funFact = randomFact;
    }, 5500);
  };

  render() {
    return (
      <div>
        <video autoPlay muted loop id="video-background">
          <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
        </video>
        <div className="selection-title" id="generate-art">
          {this.state.headings[finalDalleAssembled.language]}
        </div>

        <DalleComponent
          text={finalDalleAssembled.textENG}
          langText={finalDalleAssembled.textDECZ}
          lang={finalDalleAssembled.language}
        />

        {this.state.hideFacts ? null : (
          <div className="facts"> {this.state.funFact} </div>
        )}
      </div>
    );
  }
}

export default LoadingPage;
