import React from "react";

class TimeoutBox extends React.Component {
  state = {
    timeRemaining: 60,
    timerInteval: null,
  };

  componentDidMount = () => {
    this.setState({
      //deduct the remaining time every second, update the timeRemaining
      timerInteval: setInterval(() => {
        this.setState({ timeRemaining: this.state.timeRemaining - 1 });
        console.log(this.state.timeRemaining);

        //once remaining seconds is 0, redirect to the opening screen, clear interval
        if (this.state.timeRemaining === 1) {
          clearInterval(this.state.timerInteval);
          window.location.href = "/";
        }
      }, 1000),
    });
  };

  resetTimer = () => {
    //reset original timer passed as props

    //for now, just reset the timer to 10 seconds
    this.setState({ timeRemaining: 10 });
  };

  render() {
    return (
      <div id="timeout-box">
        <h1>Are you there?</h1>
        <p>
          In {this.state.timeRemaining} seconds, you will be taken back to the
          opening screen
        </p>
        <button onClick={this.resetTimer}>Continue</button>
      </div>
    );
  }
}

export default TimeoutBox;
