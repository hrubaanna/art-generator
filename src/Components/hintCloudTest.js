import React from "react";
import { Facts, Prompts } from "./dataFile";

class HintCloudTest extends React.Component {
  state = {
    hint_elements: [],
    current_stage_hints: [],
    last_hint_selected: 7,
    hintInterval: null,
    UPDATE_HINT_INTERVAL: 4000,
  };

  componentDidMount() {
    this.populateHints();
  }

  componentWillUnmount() {
    clearInterval(this.state.hintInterval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateHints();
    }
  }

  setupHints() {
    //create a <p> element for each hint
    this.generateHints();
    let hint_elements = [];
    this.state.current_stage_hints.forEach((hint, index) => {
      if (index < 7) {
        let hint_element = document.createElement("p");
        hint_element.innerHTML = hint;
        hint_element.className = "hint";
        hint_elements.push(hint_element);
      }
    });
    this.setState({ hint_elements: hint_elements });
    //add the <p> elements to the page
    hint_elements.forEach((element, i) => {
      if (i <= 1) {
        document.querySelector("#leftCloud").append(element);
      } else if (i <= 4) {
        document.querySelector("#middleCloud").append(element);
      } else {
        document.querySelector("#rightCloud").append(element);
      }
    });
  }

  generateHints() {
    //create a hint array for the current stage by shuffling
    //the stage array

    let arrCopy = [
      ...this.getStageName(
        this.props.medium,
        this.props.stage,
        this.props.language
      ),
    ];

    //shuffle the array
    this.state.current_stage_hints = arrCopy.sort(() => 0.5 - Math.random());
  }

  getStageName = (medium, stage, language) => {
    //from given medium and current stage, return the name of the stage
    if (medium !== "") {
      let stageName = Prompts[language][medium].lookup[String(stage - 1)];
      return Facts[stageName];
    } else {
      let arr = [];
      for (let i = 0; i < this.state.NUM_FACTS; i++) {
        arr.push("");
      }
      return arr;
    }
  };

  replaceHint() {
    //replace a random hint with the next unused hint

    //select a random hint to replace
    let randomHint =
      this.state.hint_elements[
        Math.floor(Math.random() * this.state.hint_elements.length)
      ];

    setTimeout(() => {
      //replace it with the next unused hint
      randomHint.innerHTML =
        this.state.current_stage_hints[this.state.last_hint_selected];
    }, 1200);

    randomHint.style.backgroundColor = "rgb(248, 225, 203)";

    setTimeout(() => {
      randomHint.style.backgroundColor = "rgba(39, 39, 39, 0.1)";
    }, 1200);

    //increment the last hint selected
    this.state.last_hint_selected++;
  }

  updateHints() {
    //if the stage has changed, update the hints
    this.generateHints();
    //replace the text in hint elements for values in current_stage_hints
    this.state.hint_elements.forEach((element, i) => {
      element.innerHTML = this.state.current_stage_hints[i];
    });
  }

  populateHints() {
    //populate the hint cloud with initial hints
    this.setupHints();
    //change one hint every INTERVAL_LENGTH
    setTimeout(() => {
      this.state.hintInterval = setInterval(() => {
        this.replaceHint();
      }, this.state.UPDATE_HINT_INTERVAL);
    }, this.state.UPDATE_HINT_INTERVAL);
  }

  render() {
    return (
      <div className="hintDiv">
        <div id="leftCloud"></div>
        <div id="middleCloud"></div>
        <div id="rightCloud"></div>
      </div>
    );
  }
}

export default HintCloudTest;
