import React from "react";
import Link from "next/link";
const { finalDalleAssembled } = require("../Components/assembler_Obj");
import { Facts } from "../Components/dataFile";
import Image from "next/image";

/**
 * Page that lures the user in
 *
 * Text field with name and short description of the experience
 * Some button or interaction method to allow user to begin the experience
 *
 * TO-DO: uvodni zprava oscilovat mezi jazyky
 */

class OpeningPage extends React.Component {
  state = {
    language: finalDalleAssembled.language,
    projectHeading: ["YOU x DALLE2", "YOU x DALLE2", "YOU x DALLE2"],
    projectHeading2: ["Become an Artist", "Staň se umělcem", "Künstler werden"],
    introText: [
      "Click anywhere to Begin",
      "Klikni kamkoli a začni",
      "Kliken und Anfangen",
    ],
    introIndex: 0,
    INTERVAL_LENGTH: 4000,
    intro_interval: null,
  };

  componentDidMount() {
    this.displayIntro();
  }

  changeLanguage = (e) => {
    finalDalleAssembled.language = e.target.id;
    this.setState({ language: e.target.id });
    console.log(finalDalleAssembled.language);
  };

  displayIntro = () => {
    //Every X miliseconds change index for language of intro text
    this.state.intro_interval = setInterval(() => {
      if (this.state.introIndex == 2) {
        this.setState({ introIndex: 0 });
      } else {
        this.setState({ introIndex: (this.state.introIndex += 1) });
      }
    }, this.state.INTERVAL_LENGTH);
  };

  changeScreen = () => {
    let langButtons = document.querySelectorAll(".btn-language");
    let introTexts = document.querySelectorAll(".intro-text");
    langButtons.forEach((element) => {
      element.style.display = "inline";
    });
    introTexts.forEach((element) => {
      element.style.display = "none";
    });
  };

  render() {
    return (
      <div onClick={this.changeScreen}>
        <h1 className="intro-text" id={"project-head"}>
          {this.state.projectHeading[this.state.introIndex]}
        </h1>
        <p className="intro-text" id={"click-to-begin"}>
          {this.state.introText[this.state.introIndex]}
        </p>

        <div className="div-language">
          <Link href={"/dialoguePage"}>
            <img
              className="btn-language"
              id={"DE"}
              onClick={this.changeLanguage}
              src="/Images/DE_flag.png"
            ></img>
          </Link>
          <Link href={"/dialoguePage"}>
            <img
              className="btn-language"
              id={"ENG"}
              onClick={this.changeLanguage}
              src="/Images/ENG_flag.png"
            ></img>
          </Link>
          <Link href={"/dialoguePage"}>
            <img
              className="btn-language"
              id={"CZ"}
              onClick={this.changeLanguage}
              src="/Images/CZ_flag.png"
            ></img>
          </Link>
        </div>
      </div>
    );
  }
}

export default OpeningPage;
