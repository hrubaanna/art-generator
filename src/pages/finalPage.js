import React from "react";
import Link from "next/link";
import FloatingImages from "../Components/floatingImages";
import Router from "next/router";

const { resetResponses } = require("../Components/assembler_Obj");

class FinalPage extends React.Component {
  state = {
    display: true,
    restartTimeout: null,

    // constants
    RESTART_INTERVAL: 20000,
    SPAWN_RESTART_BUTTON_INTERVAL: 2000,
  };

  componentDidMount() {
    let img = document.getElementById("gallery-map");
    img.src = "TestPhotos/placeholder.png";
    img.onload = () => {
      document.getElementById("wrapper-final").className += " short-fadeIn";
      setTimeout(() => {
        if (
          document.body.contains(document.getElementById("click-to-restart"))
        ) {
          document.getElementById("click-to-restart").style.animation =
            "fadeIn 1s forwards, pulsating-click 0.75s infinite alternate";
        }
      }, this.state.SPAWN_RESTART_BUTTON_INTERVAL);
    };

    document.getElementById("final-page").onclick = () => {
      this.returnToStart();
    };

    this.setState({
      restartTimeout: setTimeout(() => {
        // force user to go back to the beginning after X seconds
        this.returnToStart();
      }, this.state.RESTART_INTERVAL),
    });
  }

  returnToStart() {
    document.getElementById("wrapper-final").className = " short-fadeOut";
    document.getElementById("click-to-restart").classList += " short-fadeOut";
    document.getElementById("background-images-final").className =
      " short-fadeOut";

    // go back to the beginning after the animation (1s) is done
    setTimeout(() => {
      clearTimeout(this.state.restartTimeout);
      this.setState({ display: false });
      Router.push("/");
    }, 1000);
  }

  render() {
    let floatingImages;
    if (this.state.display) {
      floatingImages = <FloatingImages />;
    }
    return (
      <div id="final-page">
        <div id="overlay">
          <video autoPlay muted loop id="video-background">
            <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
          </video>
          <div id="wrapper-final">
            <div id="heading-final">Thank you for participation!</div>
            {/* TODO: add translations to text */}
            <img id="gallery-map"></img>
            <div id="instructions-final">
              Go checkout your artwork in the gallery!
            </div>
            {/* TODO: add translations to text */}
          </div>
          <div className="click-to" id="click-to-restart">
            Click anywhere to go to the beginning
            {/* TODO: add translations to text */}
          </div>
        </div>

        <div id="background-images-final">{floatingImages}</div>
      </div>
    );
  }
}

export default FinalPage;
