import React from "react";
import HintCloudTest from "../Components/hintCloudTest";
import Prompt from "../Components/prompt";
import Link from "next/link";
import { Facts, Prompts } from "../Components/dataFile";
import StartOverButton from "../Components/startOverButton";
import TimeoutBox from "../Components/timeoutBox";

const {
  responses,
  assembleResponse,
  storeResponse,
  assembleFinalDalle,
  resetResponses,
  finalDalleAssembled,
} = require("../Components/assembler_Obj");

/**
 * The dialogue window
 *
 * Different prompts arise based on where the user is in the creation
 * journey.
 *
 * User gives any input.
 *
 * Tips are provided on the page as word-clouds related to given prompt.
 *
 * User can decide to quit/restart the process.
 * If inactive for X seconds, the user is asked if they want more ideas /
 * wish to start over / quit.
 *
 * Final page before the query is sent to be generated should show the resulting
 * sentence for user revision.
 *
 */

//TODO: check format of input - e.g. 400 character limit

class DialoguePage extends React.Component {
  state = {
    stage: 0,
    hintCloudUpdated: false,
    largeScreen: true,
    medium: "",
    numStages: 7,
    query: "",
    dalleInput: "",
    timer: null,
    language: finalDalleAssembled.language,
    buttons: {
      mediums: {
        painting: {
          ENG: "Painting",
          CZ: "Malba",
          DE: "Gemälde",
        },
        sculpture: {
          ENG: "Sculpture",
          CZ: "Socha",
          DE: "Skulptur",
        },
        photography: {
          ENG: "Photography",
          CZ: "Fotografie",
          DE: "Foto",
        },
      },
      forward: {
        ENG: "skip stage",
        CZ: "přeskočit fázi",
        DE: "überspringen",
      },
      results: {
        ENG: "finish",
        CZ: "hotovo",
        DE: "fertig",
      },
    },
    renderTimeoutBox: false,

    //TODO: for production, change to 60 seconds
    RESET_TIME: 60000,
  };

  //when page loads, start timer to show timeout box
  componentDidMount() {
    this.checkScreenSize();
    if (this.state.stage) this.startInactiveTimer();
    this.resetState();
    resetResponses();
  }

  checkScreenSize = () => {
    //if screen is smaller than 450px, set largeScreen to false
    let x = window.matchMedia("(max-width: 450px)");
    if (x.matches) {
      this.state.largeScreen = false;
    }
  };

  //reset state to initial values
  resetState = () => {
    this.setState({
      stage: 0,
      medium: "",
      query: "",
      dalleInput: "",
      language: this.state.language,
    });
  };

  //increase value of current stage by 1, and update the text and buttons accordingly
  incrementStage = () => {
    let currentStage = this.state.stage;

    //start the timer to check for user inactivity
    this.startInactiveTimer();

    //update forward button text
    document.querySelector("#btn-next-stage").innerHTML =
      this.state.buttons.forward[this.state.language];
    //restore forward button color
    document.getElementById("btn-next-stage").style.backgroundColor =
      "rgba(248, 225, 203, 0.18)";

    //hide forward button, create a submit button
    this.checkSubmitStage(currentStage);

    let userInput = document.querySelector("#current-selection").innerHTML;
    //get text from input field and store it in the query array
    this.storeInputOnPage(userInput);

    //feed input to assembler
    this.addToAssembler(userInput);

    //get assembled query so far, show it on page
    let assembledQuery = assembleResponse(
      responses,
      this.state.medium,
      this.state.language
    );

    document.getElementById("assembled-query").innerHTML = assembledQuery;
    document.getElementById("assembled-query").style.marginRight = "1%";

    //empty the input field
    document.querySelector("#current-selection").innerHTML = "";

    //increase stage by 1
    this.setState({ stage: currentStage + 1 });
  };

  addToAssembler = (userInput) => {
    //add current input to assembler
    if (this.state.stage !== 0) {
      //store response in prefered language
      storeResponse(
        userInput,
        this.state.stage,
        responses,
        this.state.medium,
        this.state.language
      );
      if (this.state.language !== "ENG") {
        //if prefered language is DE/CZ, also store english version of userInput
        //if prefered language is DE/CZ, also store english version of userInput
        //get stageName of hintcloud in preferred language (e.g. painting_types_DE)
        let stageName =
          Prompts[this.state.language][this.state.medium].lookup[
            String(this.state.stage - 1)
          ];
        //get index of DE/CZ input in its hintcloud array
        let idx = Facts[stageName].findIndex(
          (element) => element === userInput
        );
        //get stageName of english version of the same hintcloud
        let stageNameENG =
          Prompts["ENG"][this.state.medium].lookup[
            String(this.state.stage - 1)
          ];
        //get current input in english
        let inputENG = Facts[stageNameENG][idx];
        storeResponse(
          inputENG,
          this.state.stage,
          responses,
          this.state.medium,
          "ENG"
        );
      }
    }
  };

  storeInputOnPage = (userInput) => {
    //get text from input field and store it in the query array
    this.setState({ query: userInput });
  };

  checkSubmitStage = (currentStage) => {
    //if user is on the last stage, change button text
    //hide forward button, create a submit button
    if (currentStage === this.state.numStages - 2) {
      //hide forward button
      document.querySelector("#btn-next-stage").style.display = "none";

      //show submit button
      document.querySelector("#btn-result").style.display = "block";
    }
  };

  //set medium to the value of the selected button
  selectMedium = (e) => {
    this.setState({ medium: e.target.value });
    this.setState({ stage: 1 });
  };

  //get text from final input stage and assemble it into final query for dalle
  finishAssembling = () => {
    if (this.state.stage == this.state.numStages - 1) {
      let input = document.querySelector("#current-selection").innerHTML;
      //store response in prefered language
      storeResponse(
        input,
        this.state.stage,
        responses,
        this.state.medium,
        this.state.language
      );
      if (this.state.language !== "ENG") {
        //if prefered language is DE/CZ, also store english version of userInput
        //get stageName of hintcloud in preferred language (e.g. painting_types_DE)
        let stageName =
          Prompts[this.state.language][this.state.medium].lookup[
            String(this.state.stage - 1)
          ];
        //get index of DE/CZ input in its hintcloud array
        let idx = Facts[stageName].findIndex((element) => element === input);
        //get stageName of english version of the same hintcloud
        let stageNameENG =
          Prompts["ENG"][this.state.medium].lookup[
            String(this.state.stage - 1)
          ];
        //get current input in english
        let inputENG = Facts[stageNameENG][idx];
        storeResponse(
          inputENG,
          this.state.stage,
          responses,
          this.state.medium,
          "ENG"
        );
      }

      let dalleInput = assembleResponse(responses, this.state.medium, "ENG");
      let langPrompt = assembleResponse(
        responses,
        this.state.medium,
        this.state.language
      );
      this.state.dalleInput = dalleInput;
      assembleFinalDalle(dalleInput, langPrompt);
    }
  };

  handleTimeoutBoxUnmount = () => {
    this.setState({ renderTimeoutBox: false });
    console.log("timer reset from handleTimeoutBoxUnmount");
    this.startInactiveTimer();
  };

  handleTimeoutBoxMount = () => {
    this.setState({ renderTimeoutBox: true });
    this.setState({ timer: null });
  };

  startInactiveTimer = () => {
    clearTimeout(this.state.timer);

    this.state.timer = setTimeout(() => {
      //show the timeout box
      this.handleTimeoutBoxMount();
    }, this.state.RESET_TIME);
  };

  render() {
    return (
      <div>
        <video autoPlay muted loop id="video-background">
          <source src="TestPhotos/NorimberkGradient.mp4" type="video/mp4" />
        </video>
        <h1 className="selection-title">
          {" "}
          {this.state.stage === 0
            ? Facts.stage_names[this.state.language]["medium"]
            : null}
          {this.state.stage > 0
            ? Facts.stage_names[this.state.language][this.state.medium][
                this.state.stage - 1
              ]
            : null}
        </h1>

        {this.state.largeScreen ? (
          <Prompt
            medium={this.state.medium}
            stage={this.state.stage}
            language={this.state.language}
          />
        ) : null}

        {this.state.renderTimeoutBox ? (
          <TimeoutBox
            lang={this.state.language}
            unMountTimemoutBox={this.handleTimeoutBoxUnmount}
            resetState={this.resetState}
          ></TimeoutBox>
        ) : null}

        {this.state.stage === 0 ? (
          // Buttons to select a medium
          <div className="div-medium button-selection">
            <button
              className="btn btn-medium"
              value={"painting"}
              onClick={(e) => this.selectMedium(e, "value")}
            >
              {this.state.buttons.mediums.painting[this.state.language]}
            </button>
            <button
              className="btn btn-medium"
              value={"sculpture"}
              onClick={(e) => this.selectMedium(e, "value")}
            >
              {this.state.buttons.mediums.sculpture[this.state.language]}
            </button>
            <button
              className="btn btn-medium"
              value={"photography"}
              onClick={(e) => this.selectMedium(e, "value")}
            >
              {this.state.buttons.mediums.photography[this.state.language]}
            </button>
          </div>
        ) : (
          <div>
            {
              <HintCloudTest
                className="hintCloud"
                medium={this.state.medium}
                stage={this.state.stage}
                language={this.state.language}
              />
            }

            <div id="query-div">
              <div className="ongoing-query" id="assembled-query"></div>

              <div className="ongoing-query" id="current-selection"></div>
            </div>
            <button
              className="btn"
              id="btn-next-stage"
              type="submit"
              onClick={this.incrementStage}
            >
              {this.state.buttons.forward[this.state.language]}
            </button>
          </div>
        )}

        <Link href={"/loadingPage"}>
          <button
            className="btn"
            onClick={this.finishAssembling}
            id="btn-result"
          >
            {this.state.buttons.results[this.state.language]}
          </button>
        </Link>

        {this.state.stage < this.state.numStages ? (
          <StartOverButton lang={this.state.language}></StartOverButton>
        ) : null}
      </div>
    );
  }
}

export default DialoguePage;
