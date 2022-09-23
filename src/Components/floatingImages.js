import React from "react";

class FloatingImages extends React.Component {
  state = {
    art: [],
    artObjects: [],
    DBLoaded: false,

    // constants
    IMAGE_SPAWN_DURATION: 4000,
    NUM_IMAGES_IN_BATCH: 4,
  };

  componentDidMount() {
    this.displayBackgroundImages();
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

  displayBackgroundImages = () => {
    this.loadArt()
      .then(() => {
        let previousPosition = this.displayFloatingImages(
          this.state.artObjects.pop(),
          null
        );
        let intervalID = setInterval(() => {
          let element = document.querySelector(".background-images");
          if (typeof element != "undefined" && element != null) {
            // TODO: change so that it waits for loadArt before displaying once again
            previousPosition = this.displayFloatingImages(
              this.state.artObjects.pop(),
              previousPosition
            );
            if (this.state.artObjects.length == 0) {
              this.loadArt();
            }
          } else {
            clearTimeout(intervalID);
          }
        }, this.state.IMAGE_SPAWN_DURATION);
      })
      .catch((err) => {
        console.error(
          "Couldn't load art from database. Loading pre-saved art."
        );
        // handle error by displaying pre-saved images
        let artObjects = [
          { img_link: "TestPhotos/DALLE_1.png" },
          { img_link: "TestPhotos/DALLE_2.png" },
          { img_link: "TestPhotos/DALLE_3.png" },
          { img_link: "TestPhotos/DALLE_4.png" },
        ];
        let previousPosition = this.displayFloatingImages(
          artObjects[0],
          null,
          false
        );
        let index = 1;
        let intervalID = setInterval(() => {
          let element = document.querySelector(".background-images");
          if (typeof element != "undefined" && element != null) {
            // TODO: change so that it waits for loadArt before displaying once again
            previousPosition = this.displayFloatingImages(
              artObjects[index],
              previousPosition,
              false
            );
            if ((index = 3)) {
              index = 0;
            }
          } else {
            clearTimeout(intervalID);
          }
          index++;
        }, this.state.IMAGE_SPAWN_DURATION);
        // TODO: load downloaded images because of some API failure
      });
  };

  displayFloatingImages = (
    artObject,
    previousPosition,
    includeSignature = true
  ) => {
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
    wrapper.style.visibility = "hidden";

    let image = document.createElement("img");
    let size = 10;
    image.src = artObject.img_link;
    image.className = "floating-image";
    image.style.width = `${size}vw`; // assume image is squared
    image.id = `floating-image-${position}`;

    if (includeSignature) {
      let signature = document.createElement("img");
      signature.className = "signature-image";
      signature.src = artObject.signature;
      if (artObject.signature_color === "white") {
        signature.style.filter = "invert(100%)";
      }
      wrapper.appendChild(signature);
    }

    // add image to grid
    wrapper.appendChild(image);
    gridPosition.appendChild(wrapper);

    // animate image
    image.onload = () => {
      wrapper.style.visibility = "visible";

      let duration = this.state.IMAGE_SPAWN_DURATION * 1.5;
      // TODO: rewrite this to use keyframes CSS animation in css file
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
  };
  render() {
    return (
      <div className="background-images">
        <div id="floating-grid-0" className="floating-grid"></div>
        <div id="floating-grid-1" className="floating-grid"></div>
        <div id="floating-grid-2" className="floating-grid"></div>
        <div id="floating-grid-3" className="floating-grid"></div>
      </div>
    );
  }
}

export default FloatingImages;
