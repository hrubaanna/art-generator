import React from "react";

class GalleryPage extends React.Component {
  state = {
    art: [],
    artObjects: [],
    DBLoaded: false,
  };

  //get art
  componentDidMount() {
    this.getDBArt();
    setTimeout(() => {
      this.getAllArt();
    }, 1000);
    setTimeout(() => {
      this.showArt();
    }, 2000);
  }

  getDBArt = () => {
    //get the artwork saved in mongo DB
    let artData = [];

    fetch(`/api/artwork?q=all-art`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        artData = data;
        this.setState({ art: artData });
        this.setState({ DBLoaded: true });
      });
  };

  getAllArt = () => {
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

  showArt = () => {
    let galleryList = document.createElement("ul");
    this.state.artObjects.forEach((artpiece) => {
      let galleryItem = document.createElement("li");
      galleryItem.className = "gallery-item";
      galleryItem.innerHTML = `
            <img class='final-image' src=${artpiece.img_link} />
            <img class='signature-image' src=${artpiece.signature} />
            <p class='art-content'>${artpiece.content}</p>
            `;
      galleryList.appendChild(galleryItem);
    });
    document.body.appendChild(galleryList);
  };

  render() {
    return <div />;
  }
}

export default GalleryPage;
