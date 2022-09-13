import React from "react";
import HintCloud from "../Components/hintCloud";
import Prompt from "../Components/prompt";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import { useState } from "react";
import { Facts, Prompts } from "../Components/dataFile";

const {
  responses,
  assembleResponse,
  storeResponse,
  assembleFinalDalle,
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

//TODO: show response, as it is being assembled, on page
//TODO: check format of input - e.g. 400 character limit
//TODO: update stage names of h1 from dataFile instead of here

class DialoguePage extends React.Component {
  state = {
    stage: 0,
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
        ENG: "next",
        CZ: "další",
        DE: "nächste",
      },

      results: {
        ENG: "finish",
        CZ: "hotovo",
        DE: "fertig",
      },
    },
    RESET_TIME: 600000000,
  };

  //when page loads, start timer for 30 seconds, reset state
  componentDidMount() {
    this.state.timer = setTimeout(() => {
      //return to start page
      this.resetState();
      Router.push("/");
    }, this.state.RESET_TIME);
  }

  //reset state to initial values
  resetState = () => {
    this.setState({
      stage: 0,
      medium: "",
      query: "",
      dalleInput: "",
      language: "ENG",
    });
  };

  //increase value of current stage by 1, and update the text and buttons accordingly
  incrementStage = () => {
    let currentStage = this.state.stage;

    //reset timer in each stage, if user is inactive at any stage for 30 seconds, reset state and start over
    clearTimeout(this.state.timer);

    this.state.timer = setTimeout(() => {
      //return to start page
      alert(
        "You have been inactive for 30 seconds. Please restart the process."
      );

      this.resetState();
      Router.push("/");
    }, this.state.RESET_TIME);

    /***
     * Button to next stage:
     * is enabled only if the current stage is less than last,
     * at last stage is replaced by submit button which redirects to loading page.
     *
     * Text field is emptied and value stored.
     */

    //hide forward button, create a submit button
    if (currentStage === this.state.numStages - 2) {
      //hide forward button
      document.querySelector("#btn-next-stage").style.display = "none";

      //show submit button
      document.querySelector("#btn-result").style.display = "block";
    }

    //get text from input field and store it in the query array
    let input = document.querySelector("#current_selection").innerHTML;
    //TODO: change to fit the correct structure
    this.setState({ query: input });

    /****
     * Feed input to assembler
     */
    if (this.state.stage !== 0) {
      let userInput = document.querySelector("#current_selection").innerHTML;
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

    //get assembled query so far, show it on page, clear #current_selection
    let assembledQuery = assembleResponse(
      responses,
      this.state.medium,
      this.state.language
    );
    document.querySelector("#assembled_query").innerHTML = assembledQuery;

    //empty the input field
    document.querySelector("#current_selection").innerHTML = "";

    //increase stage by 1
    this.setState({ stage: currentStage + 1 });
  };

  //set medium to the value of the selected button
  selectMedium = (e) => {
    this.setState({ medium: e.target.value });
    this.setState({ stage: 1 });
  };

  //get text from final input stage and assemble it into final query for dalle
  finishAssembling = () => {
    if (this.state.stage == this.state.numStages - 1) {
      let input = document.querySelector("#current_selection").innerHTML;
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

  render() {
    return (
      <div>
        <video autoPlay muted loop id="video-background">
          <source src="TestPhotos/My_Movie.mp4" type="video/mp4" />
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

        {this.state.stage === 0 ? (
          // Buttons to select a medium
          <div className="div-medium">
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
              <HintCloud
                className="hintCloud"
                medium={this.state.medium}
                stage={this.state.stage}
                language={this.state.language}
              />
            }

            <div id="query_div">
              <p className="ongoing_query" id="assembled_query"></p>
              <p className="ongoing_query" id="current_selection"></p>
            </div>

            <input
              className="btn"
              id="btn-next-stage"
              type="submit"
              onClick={this.incrementStage}
              value={this.state.buttons.forward[this.state.language]}
            />
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

        <Prompt
          medium={this.state.medium}
          stage={this.state.stage}
          language={this.state.language}
        />
      </div>
    );
  }
}

export default DialoguePage;
