import React from "react";

class Popup extends React.Component {
  state = {
    stage: 0,
    stageText: {
      stage_0: "upravit levou fotku",
      stage_1: "upravit pravou fotku",
      stage_2: "upravit levý podpis",
      stage_3: "upravit pravý podpis",
      stage_4: "upravit levý box",
      stage_5: "upravit pravý box",
    },
    stageName: {
      stage_0: "gallery_item_0",
      stage_1: "gallery_item_1",
      stage_2: "signature_image_0",
      stage_3: "signature_image_1",
      stage_4: "art_content_0",
      stage_5: "art_content_1",
    },
    gallery_item_0: {
      num_inputs: 3,
      attributes: ["width", "top", "left"],
      width: null,
      top: null,
      left: null,
    },
    gallery_item_1: {
      num_inputs: 3,
      attributes: ["width", "top", "right"],
      width: null,
      top: null,
      left: null,
    },
    signature_image_0: {
      num_inputs: 4,
      attributes: ["top", "right", "height", "width"],
      top: null,
      right: null,
      height: null,
      width: null,
    },
    signature_image_1: {
      num_inputs: 4,
      attributes: ["top", "right", "height", "width"],
      top: null,
      right: null,
      height: null,
      width: null,
    },
    art_content_0: {
      num_inputs: 4,
      attributes: ["top", "left", "width", "height"],
      top: null,
      left: null,
      width: null,
      height: null,
    },
    art_content_1: {
      num_inputs: 4,
      attributes: ["top", "left", "width", "height"],
      top: null,
      left: null,
      width: null,
      height: null,
    },
    loadingTimeout: null,
  };

  componentDidMount = () => {
    //wait for images to be rendered

    new Promise((resolve) => {
      this.state.loadingTimeout = setInterval(() => {
        console.log(this.props.popupTest);
        if (this.props.popupTest) {
          clearInterval(this.state.loadingTimeout);
        }
      }, 500);
      console.log(document.querySelector("ul"));
      resolve();
    }).then(() => {
      this.setupBox();
      this.setupForm();
    });
  };

  setupBox = () => {
    document.querySelector("form").style.display = "inline-flex";
    document.querySelectorAll("img").forEach((img) => {
      img.style.border = "1px solid red";
    });
    let popup = document.querySelector(".popup");
    popup.style.position = "fixed";
    popup.style.top = "30%";
    popup.style.left = "20%";
    popup.style.zIndex = "5";
    popup.style.backgroundColor = "rgba(255,255,255,0.7)";
    popup.style.padding = "1% 3%";
  };

  setupForm = () => {
    //set values in form to be the values of the css of current stage

    //get stage text
    let stageText = this.state.stageText[`stage_${this.state.stage}`];
    //set stage text
    document.querySelector("p").innerHTML = `${this.state.stage}: ${stageText}`;

    //get stage name
    let stageName = this.state.stageName[`stage_${this.state.stage}`];

    //activate number of inputs that the current stage uses
    //get num_inputs for given stage
    let number_inputs = this.state[stageName].num_inputs;
    //set active the number of inputs that are active
    for (let i = 0; i < 4; i++) {
      if (i < number_inputs) {
        //set input as active
        document.querySelector(`#input-${i}`).disabled = false;
        //set accompanying text to input to the name of the css property
        let stage_attribute = this.state[stageName].attributes[i];
        document.querySelector(`#label-${i}`).innerHTML = stage_attribute;
        //set placeholders in each input to the name of the css property
        this.setInputValue(stageName, stage_attribute, i);
        document.querySelector(`#input-${i}`).style.backgroundColor = "white";
      } else {
        //set input as inactive
        document.querySelector(`#input-${i}`).disabled = true;
        document.querySelector(`#input-${i}`).style.backgroundColor =
          "lightgray";
        //show correct labels
        document.querySelector(`#label-${i}`).innerHTML = "-";
      }
    }
  };

  setInputValue = (stageName, stage_attribute, i) => {
    //set input values to the values of the css of current stage

    let el = document.querySelector(`#${stageName}`);

    //get value of current input
    let currentValue = getComputedStyle(el)[stage_attribute];
    document.querySelector(`#input-${i}`).value = currentValue;
  };

  nextStage = (e) => {
    e.preventDefault();

    if (this.state.stage == 4) {
      e.target.innerHTML = "Uložit";
    }
    if (this.state.stage == 5) {
      this.save();
      return;
    }
    //go to next stage
    this.state.stage = this.state.stage + 1;

    //save values from form to state
    this.setupForm();
  };

  prevStage = (e) => {
    e.preventDefault();

    this.state.stage = this.state.stage - 1;
    this.setupForm();
  };

  changeValueInput = (e) => {
    let inputChanged = e.target.id;
    //get the value that is being edited
    let valueToChange = document.querySelector(
      `label[for='${inputChanged}']`
    ).innerHTML;
    //get element which is being edited
    let el = document.querySelector(
      `#${this.state.stageName[`stage_${this.state.stage}`]}`
    );

    try {
      //change the value of the css property
      el.style[valueToChange] = e.target.value;
    } catch (err) {
      console.log(err);
      console.log(el);
      console.log(`#${this.state.stageName[`stage_${this.state.stage}`]}`);
    }
  };

  save = () => {
    //change text on screen to all the values that were changed
    document.querySelector("p").innerHTML =
      "Změněné hodnoty (prosím poslat screenshot):";
    document.querySelector("p").style.padding = "1%";
    document.querySelector("p").style.fontWeight = "600";
    document.querySelector(".popup").style.top = "0%";
    document.querySelector(".popup").style.left = "20%";
    document.querySelector(".popup").style.width = "700px";
    document.querySelector("form").style.display = "none";
    //stage names
    let stageNames = this.state.stageName;
    for (let i = 0; i < 6; i++) {
      let stageName = stageNames[`stage_${i}`];
      let stateAttributes = this.state[stageName].attributes;
      for (let j = 0; j < stateAttributes.length; j++) {
        let stateAttribute = stateAttributes[j];
        let value = document.querySelector(`#${stageName}`).style[
          stateAttribute
        ];
        let textValue = document.createElement("p");
        textValue.innerHTML = `${stageName}: ${stateAttribute} = ${value}`;
        textValue.style.padding = 0;
        document.querySelector(".popup").appendChild(textValue);
      }
      console.log(this.state[stageName]);
    }
  };

  render() {
    return (
      <div className="popup">
        <p></p>
        <form>
          <label for="input-0" id="label-0">
            test
          </label>
          <input
            type="text"
            id="input-0"
            onChange={this.changeValueInput}
          ></input>
          <label for="input-1" id="label-1">
            test
          </label>
          <input
            type="text"
            id="input-1"
            onChange={this.changeValueInput}
          ></input>
          <label for="input-2" id="label-2">
            test
          </label>
          <input
            type="text"
            id="input-2"
            onChange={this.changeValueInput}
          ></input>
          <label for="input-3" id="label-3">
            test
          </label>
          <input
            type="text"
            id="input-3"
            onChange={this.changeValueInput}
          ></input>
          <button onClick={this.nextStage}>potvrdit</button>
          <button id="back-btn" onClick={this.prevStage}>
            zpět
          </button>
        </form>
      </div>
    );
  }
}

export default Popup;
