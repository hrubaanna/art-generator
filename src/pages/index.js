import React from "react";
import Link from "next/link";
const { finalDalleAssembled } = require("../Components/assembler_Obj");
import Head from "next/head";
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
    INTERVAL_LENGTH: 5000,
    intro_interval: null,
    art: [],
    artObjects: [],
    DBLoaded: false,
  };

  componentDidMount() {
    this.loadArt();
    this.displayIntro();
    this.displayBackgroundImages();
    let element = document.querySelector("#main");
    //element.style.backgroundColor = "rgba(255,255,250,1)";
    element.setAttribute(
      "style",
      "min-height: 100vh; background-color:rgba(51, 51, 153, 0.6); "
    );
    element.addEventListener("click", () => {
      this.changeScreen();
    });
  }

  getDBRandomArt = () => {
    //get the artwork saved in mongo DB
    let artData = [];

    fetch(`/api/artwork?q=random-art`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        artData = data;
        this.setState({ art: artData });
        console.log(this.state.art);
        this.setState({ DBLoaded: true });
      });
  };

  getArtFromTasks = () => {
    //get the task for each art piece
    this.state.art.forEach((artpiece) => {
      fetch(`/api/dalleTask?q=${artpiece.task_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let artObj = {
            img_link:
              data.result.generations.data[artpiece.selected_pos].generation
                .image_path,
            content: artpiece.content,
            signature: artpiece.signature,
          };
          this.state.artObjects.push(artObj);
        });
    });
  };

  loadArt = () => {
    this.getDBRandomArt();
    setTimeout(() => {
      this.getArtFromTasks();
    }, 1000);
  };

  changeLanguage = (e) => {
    finalDalleAssembled.language = e.target.id;
    this.setState({ language: e.target.id });
    console.log(finalDalleAssembled.language);
  };

  fadeOutElement = (element) => {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.05) {
        clearInterval(timer);
        element.style.display = "none";
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.1;
    }, 30);
  };

  fadeInElement = (element) => {
    var op = 0.1; // initial opacity
    element.style.display = "flex";
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += op * 0.1;
    }, 10);
  };

  displayIntro = () => {
    //Every X miliseconds change index for language of intro text
    let waitTime = 2000; //ms
    this.state.intro_interval = setInterval(() => {
      if (this.state.introIndex == 2) {
        let element = document.querySelector("#project-head");
        this.fadeOutElement(element);
        setTimeout(() => {
          this.setState({ introIndex: 0 });
          this.fadeInElement(element);
        }, waitTime);
      } else {
        let element = document.querySelector("#project-head");
        this.fadeOutElement(element);
        setTimeout(() => {
          this.setState({ introIndex: (this.state.introIndex += 1) });
          this.fadeInElement(element);
        }, waitTime);
      }
    }, this.state.INTERVAL_LENGTH);
  };

  displayBackgroundImages = () => {
    let imgNames = ["DALLE_1.png", "DALLE_2.png", "DALLE_3.png", "DALLE_4.png"];
    imgNames.forEach((imgName) => {
      document
        .getElementById("main")
        .append(this.displayFloatingImages("TestPhotos/" + imgName));
    });
  };

  displayFloatingImages = (image_src) => {
    let float = document.createElement("div");
    let size = 10; // assume image is squared
    float.className = "floating-wrapper";
    float.innerHTML = `<img src=${image_src} width="100%" class="floating-image"></img>`;
    float.style.position = "absolute";
    float.style.width = size + "vw";
    float.style.height = size + "vh";
    float.style.left = Math.random() * 80 + size + "vw";
    float.style.top = Math.random() * 80 + size + "vh";
    float.style.zIndex = -1;
    return float;
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
    document
      .querySelector("#main")
      .setAttribute(
        "style",
        "min-height: 100vh; background-color:rgba(255,255,250,0); "
      );
    document.querySelectorAll(".floating-image").forEach((element) => {
      element.style.display = "none";
    });
    clearInterval(this.state.intro_interval);
  };

  render() {
    return (
      <div id="main">
        <video autoPlay muted loop id="video-background">
          <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
        </video>

        <div className="intro-text">
          <h1 id={"project-head"}>
            {this.state.projectHeading[this.state.introIndex]}
          </h1>
          <p id={"click-to-begin"}>
            {this.state.introText[this.state.introIndex]}
          </p>
        </div>

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
