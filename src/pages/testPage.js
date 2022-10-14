import React from "react";
const { responses } = require("../Components/assembler_Obj");

class TestPage extends React.Component {
  state = {
    art: [],
    artObjects: [],
    DBLoaded: false,
    NUM_IMAGES_IN_BATCH: 1,
  };

  displayBackgroundImages = (artObjects) => {
    //show images at a random place on the screen
  };

  loadImages = async () => {
    //get NUM_IMAGES_IN_BATCH images, saved in artObjects
    //which hold the img link and signature
    let art = await this.getDBArt();
    let artObjects = await this.getAllArt(art);
  };

  getDBArt = async () => {
    //get the artwork saved in mongo DB
    let art = await fetch(`/api/artwork?q=${this.state.NUM_IMAGES_IN_BATCH}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ DBLoaded: true });
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
    return art;
  };

  getAllArt = async (art) => {
    //get the task for each art piece
    let artObjects = [];

    for (const artpiece of art) {
      let artObj = await this.getArtObject(artpiece);
      artObjects.push(artObj);
    }
    return artObjects;
  };

  getArtObject = async (artpiece) => {
    //get art image links from the dalle task associated
    //with each piece in the DB
    let artObject = await fetch(`/api/dalleTask?q=${artpiece.task_id}`, {
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
          signature: artpiece.signature,
        };
        return artObj;
      })
      .catch((err) => {
        console.error(err);
      });
    return artObject;
  };

  render() {
    return (
      <div>
        <h1>Testing the HintCloudTest</h1>

        <button onClick={this.loadImages}> add image </button>
      </div>
    );
  }
}

export default TestPage;
