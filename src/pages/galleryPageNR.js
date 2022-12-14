// This page will be shown in Norimberk
// it will display only one image at a time

//screen - 1080 x 1920

import React from "react";

class GalleryPageNR extends React.Component {
  state = {
    art: [],
    toggleArt: false,
    artObjects: [],
    DBLoaded: false,
    loadingTimeout: null,

    NUM_IMAGES_IN_BATCH: 2,
    TIME_TO_RELOAD: 30000,
  };

  componentDidMount() {
    document.body.style.backgroundColor = "black";
    document.body.style.overflow = "visible";
    this.removePreviousImage();
    this.setState({ art: [] });
    this.setState({ artObjects: [] });
    this.displayImages();
    setInterval(() => {
      this.removePreviousImage();
      this.setState({ art: [] });
      this.setState({ artObjects: [] });
      this.displayImages();
    }, this.state.TIME_TO_RELOAD);
  }

  removePreviousImage = () => {
    //if there were images previously shown on the screen, remove them
    let images = document.getElementsByClassName("gallery-item-NR");
    if (images.length > 0) {
      // fadeOut current images
      let frames = document.getElementsByClassName("frame");
      for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = "0";
        frames[i].style.opacity = "0";
        // images.style.backgroundColor = "rgb(248, 225, 203)";
      }

      // after fadeOut remove current Images to make space for new ones
      setTimeout(() => {
        while (images.length > 0) {
          images[0].parentNode.removeChild(images[0]);
        }
      }, 1200);
    }
  };

  displayImages = () => {
    this.loadArt()
      .then(() => {
        //display images saved in artObjects
        this.showArt();
      })
      .catch((err) => {
        console.error(err);

        //handle error by showing pre-saved images
      });
  };

  loadArt = async () => {
    return new Promise((resolve, reject) => {
      // load random images from the DB, store in artObjects
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

  getDBRandomArt = () => {
    let apiLink = "artwork";
    if (this.state.toggleArt) {
      apiLink = "artwork";
      this.state.toggleArt = false;
    } else {
      apiLink = "artworkNR";
      this.state.toggleArt = true;
    }

    return new Promise((resolve, reject) => {
      // get the artwork saved in mongo DB
      fetch(`/api/${apiLink}?q=${this.state.NUM_IMAGES_IN_BATCH}`, {
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
              name: artpiece.name,
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

  showArt = () => {
    // display images saved in artObjects in the gallery

    let numLoaded = 0;
    let imagesToLoad = this.state.artObjects.length * 2;

    let galleryList = document.createElement("ul");
    galleryList.style.visibility = "hidden";
    let frames = document.getElementsByClassName("frame");
    for (let i = 0; i < frames.length; i++) {
      frames[i].style.opacity = "1";
    }

    new Promise((resolve) => {
      this.state.artObjects.forEach((artpiece, index) => {
        //create images and add them to the gallery
        //if image already exists, just replace its src
        if (document.getElementById(`gallery-item-NR`) === null) {
          let galleryItem = document.createElement("li");

          galleryItem.className = "gallery-item-NR";
          galleryItem.id = `gallery_item_NR`;
          //final image photo
          let galleryImage = document.createElement("img");
          galleryImage.src = artpiece.img_link;
          galleryImage.className = "final-image-NR";
          galleryImage.id = `final_image_${index}`;
          galleryItem.appendChild(galleryImage);
          //frames images
          for (let i = 0; i < frames.length; i++) {
            frames[i].style.opacity = "1";
          }

          galleryImage.onload = () => {
            numLoaded++;
          };
          //final image signature
          if (artpiece.signature !== "") {
            let gallerySignature = document.createElement("img");
            gallerySignature.src = artpiece.signature;
            gallerySignature.id = `signature_image_NR_${index}`;
            galleryItem.appendChild(gallerySignature);

            gallerySignature.onload = () => {
              numLoaded++;
            };
          } else {
            numLoaded++;
          }

          //art content div
          let arpieceContent = document.createElement("div");
          arpieceContent.id = `art_content_NR_${index}`;
          //content text
          let contentText = document.createElement("p");
          contentText.className = "content_text";
          contentText.innerHTML = artpiece.content;
          arpieceContent.appendChild(contentText);
          //content author
          let contentAuthour = document.createElement("p");
          contentAuthour.className = "content_author";
          contentAuthour.innerHTML = `Author: ${this.getArtistName(artpiece)}`;
          arpieceContent.appendChild(contentAuthour);

          galleryItem.appendChild(arpieceContent);

          galleryList.appendChild(galleryItem);
        }
      });
      resolve();
    }).then(() => {
      //wait for images to load
      this.state.loadingTimeout = setInterval(() => {
        if (numLoaded === imagesToLoad) {
          document.body.appendChild(galleryList);
          galleryList.style.visibility = "visible";
          for (let i = 0; i < frames.length; i++) {
            frames[i].style.opacity = "1";
          }
          clearInterval(this.state.loadingTimeout);
        }
      }, 500);
    });
  };

  getArtistName = (artpiece) => {
    if (artpiece.name == "not yet added" || artpiece.name == "") {
      return "Anonymous";
    } else {
      return artpiece.name;
    }
  };

  render() {
    return (
      <div>
        <p className="NR-text">
          These pieces were created by you using artifical intelligence:
        </p>
        <img src={"TestPhotos/frame.png"} className="frame" id="frame1" />
        <img src={"TestPhotos/frame.png"} className="frame" id="frame2" />
        <div className="NR-QR-div">
          <p className="QR-text">Create your own artwork:</p>
          <img src={"TestPhotos/QR.png"} className="QR-img" />
        </div>
      </div>
    );
  }
}

export default GalleryPageNR;
