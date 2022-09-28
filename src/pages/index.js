import React from "react";
import Link from "next/link";
import FloatingImages from "../Components/floatingImages";
const { finalDalleAssembled } = require("../Components/assembler_Obj");

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
    projectHeading2: ["YOU x DALLE2", "YOU x DALLE2", "YOU x DALLE2"],
    projectHeading: [
      "Create Art with Artificial Intelligence",
      "Vytvoř umění s umělou inteligencí",
      "Kunst mit Kuentslicher Intelligenz erschaffen",
    ],
    introText: [
      "click anywhere to begin",
      "klikni kamkoli a začni",
      "kliken und Anfangen",
    ],
    introIndex: 0,
    intro_interval: null,
    introDisplayed: true,
  };

  componentDidMount() {
    this.displayIntro();
    document.getElementById("main").addEventListener(
      "click",
      () => {
        this.changeScreen();
      },
      { once: true }
    );
  }

  changeLanguage = (e) => {
    // when user clicks given element, change language into id of the element
    finalDalleAssembled.language = e.target.id;
    this.setState({ language: e.target.id });
  };

  displayIntro = () => {
    // start oscillating introductory text and projecting dalle images
    this.displayIntroText();
  };

  displayIntroText = () => {
    // set an interval to change the introductory text between different languages
    this.setState({
      intro_interval: setInterval(() => {
        this.changeIntroText();
      }, 3000),
    });
  };

  changeIntroText = () => {
    // cycle index from 0 to 2, then back to 0
    if (this.state.introIndex == 2) {
      this.setState({ introIndex: 0 });
    } else {
      this.setState({ introIndex: (this.state.introIndex += 1) });
    }
  };

  changeScreen = () => {
    // when the screen is clicked, remove current content and display only flags to select language
    this.state.introDisplayed = false;
    document.getElementById("background-images-landing").remove();
    document.getElementById("project-heading-wrapper-landing").remove();
    document.getElementById("click-to-begin").remove();
    document.querySelector(".div-language").style.display = "flex";
    document.querySelector(".btn-language").style.display = "inline";
    document.getElementById("overlay").style.background = "none";
    clearInterval(this.state.intro_interval);

    let textLangBtns = document.querySelectorAll(".textLangBtn");
    textLangBtns.forEach((element) => {
      element.style.display = "inline";
    });
    clearInterval(this.state.intro_interval);
  };

  render() {
    return (
      <div id="main">
        <div id="overlay">
          <video autoPlay muted loop id="video-background">
            <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
          </video>
          <div id="project-heading-wrapper-landing">
            <div className="project-heading">
              {this.state.projectHeading[this.state.introIndex]}
            </div>
          </div>
          <div className="click-to" id="click-to-begin">
            {this.state.introText[this.state.introIndex]}
          </div>
        </div>
        <div id="background-images-landing">
          <FloatingImages></FloatingImages>
        </div>

        <div className="div-language">
          <div className="div-language bars">
            <Link href={"/dialoguePage"}>
              <img
                className="btn-language"
                id={"DE"}
                onClick={this.changeLanguage}
                src="/Images/DE_flag.png"
              ></img>
            </Link>
            <Link href={"/dialoguePage"}>
              <div
                className="textLangBtn"
                id={"DE"}
                onClick={this.changeLanguage}
              >
                {" "}
                anfangen{" "}
              </div>
            </Link>
          </div>
          <div className="div-language bars">
            <Link href={"/dialoguePage"}>
              <img
                className="btn-language"
                id={"ENG"}
                onClick={this.changeLanguage}
                src="/Images/ENG_flag.png"
              ></img>
            </Link>
            <Link href={"/dialoguePage"}>
              <div
                className="textLangBtn"
                id={"ENG"}
                onClick={this.changeLanguage}
              >
                {" "}
                begin{" "}
              </div>
            </Link>
          </div>
          <div className="div-language bars">
            <Link href={"/dialoguePage"}>
              <img
                className="btn-language"
                id={"CZ"}
                onClick={this.changeLanguage}
                src="/Images/CZ_flag.png"
              ></img>
            </Link>
            <Link href={"/dialoguePage"}>
              <div
                className="textLangBtn"
                id={"CZ"}
                onClick={this.changeLanguage}
              >
                {" "}
                začít{" "}
              </div>
            </Link>
          </div>
        </div>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default OpeningPage;
