import React from "react";
import { Facts, Prompts } from "./dataFile";

class HintCloudTest extends React.Component {
  state = {
    hint_elements: [],
    current_stage_hints: [],
    NUM_HINTS: 7,
    last_hint_selected: 7,
    selected_random_hint: null,
    text_change_timeout: null,
    hintInterval: null,
    UPDATE_HINT_INTERVAL: 4000,
    confirmButtonText: {
      ENG: "confirm choice",
      CZ: "potvrdit výběr",
      DE: "bestätigen",
    },
  };

  componentDidMount() {
    this.checkWindowSize();
    this.populateHints();
  }

  checkWindowSize = () => {
    let x = window.matchMedia("(max-width: 450px)");
    if (x.matches) {
      //if screen is a phone screen:
      //only show 3 hints
      this.state.NUM_HINTS = 3;
      //make UPDATE_HINT_INTERVAL smaller
      this.setState({ UPDATE_HINT_INTERVAL: 3000 });
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.hintInterval);
    //remove p elements from the page
    this.removeHints();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateHints();
      if (this.state.selected_random_hint !== null) {
        //when stage is changes during transition, make the transition faster
        //so it does not look like the hint is being replaced twice
        clearTimeout(this.state.text_change_timeout);
        this.state.selected_random_hint.style.transition = "all 0s";
        this.state.selected_random_hint.style.backgroundColor =
          "rgba(39, 39, 39, 0.1)";
        this.state.selected_random_hint.style.opacity = "1";
        this.state.selected_random_hint.style.transition = "all 2s";
      }
    }
  }

  setupHints() {
    //create a <p> element for each hint
    this.generateHints();
    let hint_elements = [];
    this.state.current_stage_hints.forEach((hint, index) => {
      if (index < this.state.NUM_HINTS) {
        let hint_element = document.createElement("p");
        hint_element.innerHTML = hint;
        hint_element.className = "hint";
        hint_element.id = index;
        hint_elements.push(hint_element);
      }
    });
    this.setState({ hint_elements: hint_elements });
    //add the <p> elements to the page
    if (this.state.NUM_HINTS === 7) {
      hint_elements.forEach((element, i) => {
        if (i <= 1) {
          document.querySelector("#leftCloud").append(element);
        } else if (i <= 4) {
          document.querySelector("#middleCloud").append(element);
        } else {
          document.querySelector("#rightCloud").append(element);
        }
      });
    } else if (this.state.NUM_HINTS === 3) {
      hint_elements.forEach((element, i) => {
        document.querySelector("#middleCloud").append(element);
      });
    }

    //add event listener to hints to make them update the query
    hint_elements.forEach((element) => {
      element.addEventListener("click", () => {
        //show selected word in the query field
        document.querySelector("#current-selection").innerHTML =
          element.innerHTML;
        //change text on btn-next-stage to 'confirm choice'
        document.querySelector("#btn-next-stage").innerHTML =
          this.state.confirmButtonText[this.props.language];
        //change forward button color to confirm styling
        document.getElementById("btn-next-stage").style.backgroundColor =
          "rgba(248, 225, 203, 0.4)";
      });
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

    randomHint.style.pointerEvents = "none";

    this.state.selected_random_hint = randomHint;

    this.state.text_change_timeout = setTimeout(() => {
      //replace it with the next unused hint
      randomHint.innerHTML =
        this.state.current_stage_hints[this.state.last_hint_selected];
    }, 1200);

    randomHint.style.opacity = "0";
    randomHint.style.backgroundColor = "rgb(248, 225, 203)";

    setTimeout(() => {
      randomHint.style.backgroundColor = "rgba(39, 39, 39, 0.1)";
      randomHint.style.opacity = "1";
    }, 1200);

    setTimeout(() => {
      randomHint.style.pointerEvents = "auto";
    }, 1500);

    //increment the last hint selected
    this.state.last_hint_selected++;
    //check if end of array has been reached, if so, start from the beginning
    if (
      this.state.current_stage_hints[this.state.last_hint_selected] == undefined
    ) {
      this.state.last_hint_selected = 0;
    }
  }

  removeHints() {
    //remove hints from the page
    this.state.hint_elements.forEach((element) => {
      element.remove();
    });
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
    }, 1000);
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
