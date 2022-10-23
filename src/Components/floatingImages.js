import { bodyStreamToNodeStream } from "next/dist/server/body-streams";
import React from "react";

class FloatingImages extends React.Component {
  state = {
    art: [],
    artObjects: [],
    DBLoaded: false,
    intervalID: null,

    // constants
    IMAGE_SPAWN_DURATION: 4000,
    NUM_IMAGES_IN_BATCH: 4,
  };

  componentDidMount() {
    this.setState({ art: [] });
    this.setState({ artObjects: [] });
    this.setState({ intervalID: null });

    this.displayBackgroundImages();
  }

  componentWillUnmount() {
    clearTimeout(this.state.intervalID);
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
            let selected_pos = parseInt(artpiece.selected_pos);
            let img_link =
              data.result.generations.data[selected_pos].generation;
            let artObj = {
              img_link: img_link.image_path,
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
      this.getDBRandomArt()
        .then(() => {
          this.getArtFromTasks()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject("error in getArtFromTask");
            });
        })
        .catch((err) => {
          console.log(err);
          reject("error in getDBRandomArt");
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
        this.setState({
          intervalID: setInterval(() => {
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
              clearTimeout(this.state.intervalID);
            }
          }, this.state.IMAGE_SPAWN_DURATION),
        });
      })
      .catch((err) => {
        console.error(err);
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
        this.setState({
          intervalID: setInterval(() => {
            let element = document.querySelector(".background-images");
            if (typeof element != "undefined" && element != null) {
              // TODO: change so that it waits for loadArt before displaying once again
              previousPosition = this.displayFloatingImages(
                artObjects[index],
                previousPosition,
                false
              );
              if (index == 3) {
                index = 0;
              }
              index++;
            } else {
              clearTimeout(this.state.intervalID);
            }
          }, this.state.IMAGE_SPAWN_DURATION),
        });
      });
  };

  displayFloatingImages = (
    artObject,
    previousPosition,
    includeSignature = true
  ) => {
    function getRandomPosition(values) {
      let x = Math.floor(Math.random() * values.length);
      if (x == previousPosition) {
        return getRandomPosition(values);
      }
      return x;
    }

    let position;
    if (document.body.contains(document.getElementById("final-page"))) {
      if (previousPosition % 2 == 0) {
        // left side hence spawn to right side
        position = getRandomPosition([1, 3]);
      } else {
        // right side hence spawn to left side
        position = getRandomPosition([0, 2]);
      }
    } else {
      position = getRandomPosition([0, 1, 2, 3]);
    }
    let gridPosition = document.getElementById(`floating-grid-${position}`);

    // spawn images only if the grid is on the screen
    if (
      document.body.contains(
        document.getElementById(`floating-grid-${position}`)
      )
    ) {
      // remove any children from gridPosition if present
      while (gridPosition.firstChild) {
        gridPosition.removeChild(gridPosition.firstChild);
      }

      // create new image
      let wrapper = document.createElement("div");
      wrapper.className = "floating-wrapper";
      wrapper.style.left = Math.random() * 100 + "%";
      wrapper.style.top = Math.random() * 100 + "%";
      wrapper.style.visibility = "hidden";

      let image = document.createElement("img");
      let size = 18;

      try {
        if (artObject?.img_link) {
          console.log(artObject);
        }
        image.src = artObject.img_link;
      } catch (err) {
        console.error(err);
        console.log("img_link is undefined");
        image.src = "TestPhotos/DALLE_1.png";
      }

      image.className = "floating-image";
      image.style.width = `${size}vw`; // assume image is squared
      image.id = `floating-image-${position}`;

      try {
        if (
          includeSignature &&
          (artObject?.signature != "" || artObject.signature == undefined)
        ) {
          let signature = document.createElement("img");
          signature.className = "signature-image";
          signature.src = artObject.signature;
          wrapper.appendChild(signature);
        }
      } catch (err) {
        console.error(err);
        console.error("Error in displaying signature");
      }

      // add image to grid
      wrapper.appendChild(image);
      gridPosition.appendChild(wrapper);

      // animate image
      image.onload = () => {
        wrapper.style.visibility = "visible";

        let duration = this.state.IMAGE_SPAWN_DURATION * 1.5;
        // TODO: rewrite this to use keyframes CSS animation in css file
        wrapper.animate([{ opacity: "0" }, { opacity: "1" }], {
          duration: duration / 2,
          direction: "alternate",
          iterations: "2",
        });
        wrapper.animate([{ scale: "1.0" }, { scale: "2.0" }], {
          duration: duration,
          fill: "forwards",
        });
        wrapper.animate([{ filter: `blur(2px)` }, { filter: `blur(0px)` }], {
          duration: duration * 0.25,
          fill: "forwards",
        });

        if (!document.body.contains(document.getElementById("final-page"))) {
          wrapper.animate(
            [
              { transform: `translate(-${size / 2}vw, -${size / 2}vw)` },
              { transform: `translate(-${size}vw, ${size / 1.8}vw)` },
            ],
            { duration: duration, fill: "forwards" }
          );
        } else {
          wrapper.style.transform = `translate(-${size / 2}vw, -${size / 2}vw)`;
        }
      };
      return position;
    }
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
