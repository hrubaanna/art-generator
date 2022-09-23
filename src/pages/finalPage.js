import React from "react";
import Link from "next/link";
import FloatingImages from "../Components/floatingImages";

class FinalPage extends React.Component {
  state = {
    RESTART_INTERVAL: 20000,
  };

  componentDidMount() {
    let img = document.getElementById("gallery-map");
    img.src = "TestPhotos/placeholder.png";
    img.onload = () => {
      document.getElementById("wrapper-final").className += " short-fadeIn";
      setTimeout(() => {
        document.getElementById("click-to-restart").style.animation =
          "fadeIn 1s forwards, pulsating-click 0.75s infinite alternate";
      }, this.state.RESTART_INTERVAL * 0.1);
    };

    setTimeout(() => {
      // TODO: force user to go back to the beginning after X seconds
    }, this.state.RESTART_INTERVAL);
    // TODO: add translations to final text
  }

  render() {
    return (
      <Link href="/">
        <div id="final-page">
          <div id="overlay">
            <video autoPlay muted loop id="video-background">
              <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
            </video>
            <div id="wrapper-final">
              <div id="heading-final">Thank you for participation!</div>
              <img id="gallery-map"></img>
              <div id="instructions-final">
                Go checkout your artwork in the gallery!
              </div>
            </div>
            <div className="click-to" id="click-to-restart">
              Click anywhere to go to the beginning
            </div>
          </div>

          <div id="background-images-final">
            <FloatingImages></FloatingImages>
          </div>
        </div>
      </Link>
    );
  }
}

export default FinalPage;
