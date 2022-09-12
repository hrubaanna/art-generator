import React from "react";
import Image from "next/image";

class TestPage extends React.Component {
  showFavorite = (e) => {
    let img = e.target;
    document.querySelectorAll("img").forEach((photo) => {
      if (photo.id != e.target.id) {
        console.log(photo);
        photo.style.display = "none";
      }
    });
    img.setAttribute(
      "style",
      "width: 5em; height: 5em; margin: auto; display: block;"
    );
    img.className = "favorite-img";
    document.querySelector(".card").appendChild(img);
  };

  render() {
    return (
      <div>
        <div className="card">
          {/* TODO: test removing photo as in Dalle Component, test changing signature color to inverted */}

          <Image
            onClick={this.showFavorite}
            id="0"
            value="0"
            src="/TestPhotos/DALLE_2.png"
            width="500em"
            height="500em"
            className="test-img"
          />
          <Image
            id="1"
            src="/TestPhotos/DALLE_2.png"
            width="500em"
            height="500em"
            className="test-img"
          />
          <Image
            id="2"
            src="/TestPhotos/DALLE_2.png"
            width="500em"
            height="500em"
            className="test-img"
          />
          <Image
            id="3"
            src="/TestPhotos/DALLE_2.png"
            width="500em"
            height="500em"
            className="test-img"
          />
        </div>
      </div>
    );
  }
}

export default TestPage;
