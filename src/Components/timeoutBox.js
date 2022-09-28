import React from "react";

const { resetResponses } = require("../Components/assembler_Obj");

class TimeoutBox extends React.Component {
  state = {
    timeRemaining: 10,
    timerInteval: null,
    isUserThere: {
      ENG: "Are you there?",
      CZ: "Jste tam?",
      DE: "Bist du da?",
    },
    resetWarningStart: {
      ENG: "In ",
      CZ: "Za ",
      DE: "In ",
    },
    resetWarningEnd: {
      ENG: ` seconds, you will be taken back to the opening screen`,
      CZ: ` sekund budete přesměrováni na úvodní obrazovku`,
      DE: ` Sekunden werden Sie auf die Startseite weitergeleitet`,
    },
    continueButton: {
      ENG: "Continue",
      CZ: "Pokračovat",
      DE: "Weiter",
    },
  };

  componentDidMount = () => {
    this.setState({
      //deduct the remaining time every second, update the timeRemaining
      timerInteval: setInterval(() => {
        this.setState({ timeRemaining: this.state.timeRemaining - 1 });

        //once remaining seconds is 0, redirect to the opening screen, clear interval
        if (this.state.timeRemaining === 1) {
          clearInterval(this.state.timerInteval);
          this.props.resetState();
          resetResponses();
          window.location.href = "/";
        }
      }, 1000),
    });
    document.querySelector("body").style.background = "rgba(168, 90, 94,0.8)";
  };

  render() {
    return (
      <div id="timeout-box">
        <h1>{this.state.isUserThere[this.props.lang]}</h1>
        <p>
          {this.state.resetWarningStart[this.props.lang]}{" "}
          {this.state.timeRemaining}{" "}
          {this.state.resetWarningEnd[this.props.lang]}
        </p>
        <button
          className="btn btn-signature"
          id="btn-timeout"
          onClick={this.props.unMountTimemoutBox}
        >
          {this.state.continueButton[this.props.lang]}
        </button>
      </div>
    );
  }
}

export default TimeoutBox;
