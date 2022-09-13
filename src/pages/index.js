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
    intro_interval: null,
    art: [],
    artObjects: [],
    DBLoaded: false,
    introDisplayed: true,

    // constants
    IMAGE_SPAWN_DURATION: 1000,
    INTERVAL_LENGTH: 5000,
  };

  componentDidMount() {
    this.loadArt();
    this.displayIntro();
    document.querySelector("#main").addEventListener("click", () => {
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

  fadeOutElement = (element, interval) => {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.05) {
        clearInterval(timer);
        element.style.display = "none";
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.1;
    }, interval);
  };

  fadeInElement = (element, interval, initialOpacity) => {
    var op = initialOpacity;
    element.style.display = "flex";
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      if (op == 0) {
        op += 0.05;
      } else {
        op += op * 0.1;
      }
    }, interval);
  };

  growElement = (element, interval, finalScale, growFactor) => {
    let scale = 1.0;
    var timer = setInterval(function () {
      if (scale >= finalScale) {
        clearInterval(timer);
      }
      element.style.transform = "scale(" + scale + ")";
      scale += growFactor;
    }, interval);
  };

  displayIntro = () => {
    this.displayIntroText();
    this.displayBackgroundImages();
  };

  displayIntroText = () => {
    this.setState({ intro_interval: setInterval(this.changeIntroText, 3000) });

    //both pulse, not through js, through css
    //change both language at the same time
    //Every X miliseconds change index for language of intro text
    // let waitTime = 2000; //ms
    // this.state.intro_interval = setInterval(() => {
    //   if (this.state.introIndex == 2) {
    //     let element = document.querySelector("#project-heading");
    //     this.fadeOutElement(element, 30);
    //     setTimeout(() => {
    //       this.setState({ introIndex: 0 });
    //       this.fadeInElement(element, 10, 0.1);
    //     }, waitTime);
    //   } else {
    //     let element = document.querySelector("#project-heading");
    //     this.fadeOutElement(element, 30, 0.1);
    //     setTimeout(() => {
    //       this.setState({ introIndex: (this.state.introIndex += 1) });
    //       this.fadeInElement(element, 10);
    //     }, waitTime);
    //   }
    // }, this.state.INTERVAL_LENGTH);
  };

  changeIntroText = () => {
    if (this.state.introIndex == 2) {
      this.setState({ introIndex: 0 });
    } else {
      this.setState({ introIndex: (this.state.introIndex += 1) });
    }
  };

  displayBackgroundImages = () => {
    this.spawnBackgroundGrid();
    let imgNames = ["DALLE_1.png", "DALLE_2.png", "DALLE_3.png", "DALLE_4.png"];
    console.log(this.state.artObjects);
    let imgPosition = 0;
    let previousPosition = this.displayFloatingImages(
      "TestPhotos/" + imgNames[imgPosition],
      previousPosition
    );
    let timer = setInterval(() => {
      if (this.state.introDisplayed == false) {
        clearInterval(timer);
        return;
      }
      previousPosition = this.displayFloatingImages(
        "TestPhotos/" + imgNames[imgPosition],
        previousPosition
      );
      if (imgPosition == 3) {
        imgPosition = 0;
      } else {
        imgPosition += 1;
      }
    }, this.state.IMAGE_SPAWN_DURATION);
  };

  removeBackgroundGrid = () => {
    document.getElementById("background-images").style.display = "none";
  };

  spawnBackgroundGrid = () => {
    // spawn grid
    let wrapper = document.createElement("div");
    wrapper.id = "background-images";
    document.getElementById("main").append(wrapper);

    // fill the grid
    for (let i = 0; i < 4; i++) {
      let wrapper = document.createElement("div");
      wrapper.id = "floating-wrapper-" + i;
      wrapper.className = "floating-wrapper";
      document.getElementById("background-images").append(wrapper);
    }
  };

  displayFloatingImages = (source, previousPosition) => {
    function getRandomPosition() {
      let x = Math.floor(Math.random() * 4);
      if (x == previousPosition) {
        return getRandomPosition();
      }
      return x;
    }
    let position = getRandomPosition();
    let wrapper = document.getElementById(`floating-wrapper-${position}`);

    // create new image
    let image = document.createElement("img");
    image.src = source;
    image.className = "floating-image";
    image.style.width = "10vw"; // assume image is squared
    image.id = `floating-image-${position}`;
    image.style.position = "relative";
    image.style.left = Math.random() * 100 + "%";
    image.style.top = Math.random() * 100 + "%";
    image.style.opacity = 0;
    wrapper.append(image);
    image.animate(
      [
        { opacity: "0" },
        {
          opacity: "1",
        },
      ],
      {
        duration: this.state.IMAGE_SPAWN_DURATION / 2,
        direction: "alternate",
        iterations: "2",
      }
    );
    image.animate(
      [
        { scale: "1.0", translate: "-10vw, 10vw" },
        {
          scale: "2.0",
          translate: "-20vw, 20vw",
        },
      ],
      {
        duration: this.state.IMAGE_SPAWN_DURATION,
        fill: "forwards",
      }
    );

    setTimeout(() => {
      wrapper.removeChild(image);
    }, this.state.IMAGE_SPAWN_DURATION);
    return position;
  };

  changeScreen = () => {
    this.state.introDisplayed = false;
    this.removeBackgroundGrid();
    let langButtons = document.querySelectorAll(".btn-language");
    document.getElementById("project-heading").style.display = "none";
    document.getElementById("click-to-begin").style.display = "none";
    langButtons.forEach((element) => {
      element.style.display = "inline";
    });
    document.getElementById("main").style.backgroundColor =
      "rgba(51, 51, 153, 0)";
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

        <div id="overlay-text">
          <div id={"project-heading-wrapper"}>
            <span id="project-heading">
              {this.state.projectHeading[this.state.introIndex]}
            </span>
          </div>
          <div id={"click-to-begin"}>
            {this.state.introText[this.state.introIndex]}
          </div>
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
