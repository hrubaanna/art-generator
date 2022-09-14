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
    IMAGE_SPAWN_DURATION: 8000,
    INTERVAL_LENGTH: 5000,
    NUM_IMAGES_IN_BATCH: "4",
  };

  componentDidMount() {
    this.getDBRandomArt();
    console.log(this.state.art);
    this.displayIntro();
    document.querySelector("#main").addEventListener("click", () => {
      this.changeScreen();
    });
  }

  getDBRandomArt = () => {
    //get the artwork saved in mongo DB
    let artData = [];

    fetch(`/api/artwork?q=${this.state.NUM_IMAGES_IN_BATCH}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        artData = data;
        this.setState({ art: artData });
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
    //load 4 random dalle art pieces from the DB, store in artObjctes
    this.getDBRandomArt();
    setTimeout(() => {
      this.getArtFromTasks();
    }, 1000);
  };

  changeLanguage = (e) => {
    //when user clicks given element, change language into id of the element
    finalDalleAssembled.language = e.target.id;
    this.setState({ language: e.target.id });
    console.log(finalDalleAssembled.language);
  };

  displayIntro = () => {
    //start oscillating introductory text and projecting dalle images
    this.displayIntroText();
    this.displayBackgroundImages();
  };

  displayIntroText = () => {
    //set an interval to change the introductory text between different languages
    this.setState({
      intro_interval: setInterval(() => {
        this.changeIntroText;
        document.getElementById("overlay-text").className = "";
        document.getElementById("overlay-text").className =
          "animate_change_heading";
      }, 3000),
    });
  };

  changeIntroText = () => {
    //cycle index from 0 to 2, then back to 0
    if (this.state.introIndex == 2) {
      this.setState({ introIndex: 0 });
    } else {
      this.setState({ introIndex: (this.state.introIndex += 1) });
    }
  };

  getImageLinks = () => {
    // load new images from the database

    //get the image links from the artObjects
    let imgLinks = this.state.artObjects.forEach((artObj) => {
      return artObj.img_link;
    });
  };

  displayBackgroundImages = () => {
    this.spawnBackgroundGrid();
    let imgNames = ["DALLE_1.png", "DALLE_2.png", "DALLE_3.png", "DALLE_4.png"];
    console.log(this.state.artObjects);
    // let imgLinks = this.state.artObjects.forEach((artObj) => {
    //   return artObj.img_link;
    // });
    let imgPosition = 0;
    let previousPosition = this.displayFloatingImages(
      "TestPhotos/" + imgNames[imgPosition],
      previousPosition
    );

    let timer = setInterval(() => {
      // don't display images when not on intro page
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
    let size = 10;
    image.src = source;
    image.className = "floating-image";
    image.style.width = `${size}vw`; // assume image is squared
    image.id = `floating-image-${position}`;
    image.style.position = "relative";
    image.style.left = Math.random() * 100 + "%";
    image.style.top = Math.random() * 100 + "%";
    image.style.opacity = 0;
    wrapper.append(image);

    // animate image
    let duration = this.state.IMAGE_SPAWN_DURATION * 1.2;
    image.animate(
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
    image.animate(
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

    // remove image after animation
    setTimeout(() => {
      wrapper.removeChild(image);
    }, duration);
    return position;
  };

  changeScreen = () => {
    //when the screen is clicked, remove current content and display only flags to select language
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
