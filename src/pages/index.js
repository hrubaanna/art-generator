import React from "react";
import Link from "next/link";
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
    art: [],
    artObjects: [],
    DBLoaded: false,
    introDisplayed: true,

    // constants
    IMAGE_SPAWN_DURATION: 4000,
    NUM_IMAGES_IN_BATCH: 4,
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

  getDBRandomArt = () => {
    return new Promise((resolve, reject) => {
      // get the artwork saved in mongo DB
      fetch(`/api/artwork?q=${this.state.NUM_IMAGES_IN_BATCH}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ art: data }, () => {
            resolve();
            this.setState({ DBLoaded: true });
          });
        })
        .catch((err) => {
          console.log(err);
          reject("error in getDBRandomArt");
        });
    });
  };

  getArtFromTasks = () => {
    return new Promise((resolve, reject) => {
      // get the task for each art piece
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
            if (this.state.artObjects.length === this.state.art.length) {
              resolve();
            }
          })
          .catch((err) => {
            console.log(err);
            reject("error in getArtFromTasks");
          });
      });
    });
  };

  loadArt = () => {
    return new Promise((resolve, reject) => {
      // load 4 random dalle art pieces from the DB, store in artObjctes
      this.getDBRandomArt().then(() => {
        this.getArtFromTasks()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject("error in loadArt");
          });
      });
    });
  };

  changeLanguage = (e) => {
    // when user clicks given element, change language into id of the element
    finalDalleAssembled.language = e.target.id;
    this.setState({ language: e.target.id });
  };

  displayIntro = () => {
    // start oscillating introductory text and projecting dalle images
    this.displayIntroText();
    this.displayBackgroundImages();
  };

  displayIntroText = () => {
    // set an interval to change the introductory text between different languages
    this.setState({
      intro_interval: setInterval(() => {
        this.changeIntroText();
        document.getElementById("overlay-text").className = "";
        document.getElementById("overlay-text").className =
          "animate_change_heading";
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

  displayBackgroundImages = () => {
    this.spawnBackgroundGrid();
    this.loadArt()
      .then(() => {
        let previousPosition = this.displayFloatingImages(
          this.state.artObjects.pop(),
          null
        );
        let intervalID = setInterval(() => {
          if (this.state.introDisplayed) {
            // TODO: change so that it waits for loadArt before displaying once again
            previousPosition = this.displayFloatingImages(
              this.state.artObjects.pop(),
              previousPosition
            );
            if (this.state.artObjects.length == 0) {
              this.loadArt();
            }
          } else if (this.state.introDisplayed == false) {
            clearTimeout(intervalID);
          }
        }, this.state.IMAGE_SPAWN_DURATION);
      })
      .catch((err) => {
        console.log(err);
        // TODO: load downloaded images because of some API failure
      });
  };

  spawnBackgroundGrid = () => {
    // spawn grid
    let wrapper = document.createElement("div");
    wrapper.id = "background-images";
    document.getElementById("main").append(wrapper);

    // fill the grid
    for (let i = 0; i < 4; i++) {
      let wrapper = document.createElement("div");
      wrapper.id = "floating-grid-" + i;
      wrapper.className = "floating-grid";
      document.getElementById("background-images").append(wrapper);
    }
  };

  displayFloatingImages = (artObject, previousPosition) => {
    function getRandomPosition() {
      let x = Math.floor(Math.random() * 4);
      if (x == previousPosition) {
        return getRandomPosition();
      }
      return x;
    }
    let position = getRandomPosition();
    let gridPosition = document.getElementById(`floating-grid-${position}`);

    // create new image
    let wrapper = document.createElement("div");
    wrapper.className = "floating-wrapper";
    wrapper.style.left = Math.random() * 100 + "%";
    wrapper.style.top = Math.random() * 100 + "%";

    let image = document.createElement("img");
    let size = 10;
    image.src = artObject.img_link;
    image.className = "floating-image";
    image.style.width = `${size}vw`; // assume image is squared
    image.id = `floating-image-${position}`;

    let signature = document.createElement("img");
    signature.className = "floating-signature";
    signature.src = artObject.signature;
    if (artObject.signature_color === "white") {
      signature.style.filter = "invert(100%)";
    }

    // add image to grid
    wrapper.appendChild(signature);
    wrapper.appendChild(image);
    gridPosition.appendChild(wrapper);

    // animate image
    let duration = this.state.IMAGE_SPAWN_DURATION * 1.5;
    // TODO: rewrite this to use CSS animation in css file
    wrapper.animate(
      [
        { opacity: "0" },
        {
          opacity: "1",
        },
      ],
      {
        duration: duration / 2,
        direction: "alternate",
        iterations: "2",
      }
    );
    wrapper.animate(
      [
        {
          scale: "1.0",
          transform: `translate(-${size / 2}vw, -${size / 2}vw)`,
        },
        {
          scale: "2.0",
          transform: `translate(-${size}vw, ${size}vw)`,
        },
      ],
      {
        duration: duration,
        fill: "forwards",
      }
    );

    wrapper.animate(
      [
        {
          filter: `blur(2px)`,
        },
        {
          filter: `blur(0px)`,
        },
      ],
      {
        duration: duration * 0.25,
        fill: "forwards",
      }
    );

    // remove image after animation
    setTimeout(() => {
      gridPosition.removeChild(wrapper);
    }, duration * 1.5);
    return position;
  };

  changeScreen = () => {
    // when the screen is clicked, remove current content and display only flags to select language
    this.state.introDisplayed = false;
    document.getElementById("background-images").remove();
    let langButtons = document.querySelectorAll(".btn-language");
    document.getElementById("project-heading").style.display = "none";
    document.getElementById("click-to-begin").style.display = "none";
    langButtons.forEach((element) => {
      element.style.display = "inline";
    });
    document.getElementById("video-background-overlay").style.backgroundColor =
      "rgba(51, 51, 153, 0)";
    document.querySelectorAll(".floating-image").forEach((element) => {
      element.style.display = "none";
    });
    clearInterval(this.state.intro_interval);
    document.querySelector("#project-heading-wrapper").style.display = "none";
  };

  render() {
    return (
      <div id="main">
        <div id="video-background-overlay">
          <video autoPlay muted loop id="video-background">
            <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
          </video>
        </div>

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
