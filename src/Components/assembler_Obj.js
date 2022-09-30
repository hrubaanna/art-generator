/****
 * This object stores the user input for various stages
 * which can be assembled at the end to form full string input into DALLE2.
 */

var responses = {
  ENG: {
    painting: {
      type: "",

      content: [], //add new as ' of ' + 'dragons' OR ' and ' + 'houseplants'

      setting: [], //add new as ' '+'in a park'

      emotion: [], //add new as ', ' + 'grimm'

      looks: [], //add new as ', ' + 'futuristic'

      style: [],
    },

    sculpture: {
      type: [], //add new as 'bronze'
      content: [], //add new as ' sculpture of ' + 'dragons'
      form: [], //add new as ', ' + 'organic'
      emotion: [], //add new as ', ' + 'expressive'
      looks: [], //add new as ', ' + 'lit from above'
      style: [],
    },

    photography: {
      content: [], // add new as 'A photograph of ' + 'alien cactus'
      setting: [], // add new as ' ' + 'in ancient city ruins'
      camera_angle: [], //add new as ', ' + 'close-up shot'
      camera_settings: [], //add new as ', ' + 'polaroid'
      lighting: [], //add new as ', ' + 'golden hour'
      emotion: [], //add new as ', ' + 'vital'
    },
  },
  CZ: {
    painting: {
      type: "", //add new as 'pastelová malba'

      content: [], //add new as ' vyobrazující ' + 'ohnivé draky'

      setting: [], //add new as ' '+'v parku'

      emotion: [], //add new as ', ' + 'ponurý'

      looks: [], //add new as ', ' + 'futuristický'

      style: [], //add new as ', ve stylu ' + 'Picassa'
    },

    sculpture: {
      type: [], //add new as 'bronzova'

      content: [], //add new as ' socha ' + 'africkych valecniku'

      form: [], //add new as ', ' + 'organicka'

      emotion: [], //add new as ', ' + 'expresivni'

      looks: [], //add new as ', ' + 'nasvicena ze spoda'

      style: [], //add new as ', ve stylu ' + 'Kubismu'
    },

    photography: {
      content: [], // add new as 'Fotografie ' + 'vesmirneho kaktusu'

      setting: [], // add new as ' ' + 'v utrobach starobyleho mesta'

      camera_angle: [], //add new as ', ' + 'priblizeni'

      camera_settings: [], //add new as ', ' + 'polaroid'

      lighting: [], //add new as ', ' + 'zlata hodinka'

      emotion: [], //add new as ', ' + 'prijemne'
    },
  },
  DE: {
    painting: {
      type: "",

      content: [], //add new as ' ' + 'dragons' OR ' and ' + 'houseplants'

      setting: [], //add new as ' '+'in a park'

      emotion: [], //add new as ', ' + 'grimm'

      looks: [], //add new as ', ' + 'futuristic'

      style: [],
    },

    sculpture: {
      type: [], //add new as 'Bronze'

      content: [], //add new as 'skulptur ' + 'dragons'

      form: [], //add new as ', ' + 'organic'

      emotion: [], //add new as ', ' + 'expressive'

      looks: [], //add new as ', ' + 'lit from above'

      style: [],
    },

    photography: {
      content: [], // add new as 'Ein Foto ' + 'alien cactus'

      setting: [], // add new as ' ' + 'in ancient city ruins'

      camera_angle: [], //add new as ', ' + 'close-up shot'

      camera_settings: [], //add new as ', ' + 'polaroid'

      lighting: [], //add new as ', ' + 'golden hour'

      emotion: [], //add new as ', ' + 'vital'
    },
  },
  finalDalleImgLink: "",
  finalDalleImgSignature: "",
};

function resetResponses() {
  //Reset all the responses to the original form of the object
  responses.ENG.painting.type = "";
  responses.ENG.painting.content = [];
  responses.ENG.painting.setting = [];
  responses.ENG.painting.emotion = [];
  responses.ENG.painting.looks = [];
  responses.ENG.painting.style = [];

  responses.ENG.sculpture.type = [];
  responses.ENG.sculpture.content = [];
  responses.ENG.sculpture.form = [];
  responses.ENG.sculpture.emotion = [];
  responses.ENG.sculpture.looks = [];
  responses.ENG.sculpture.style = [];

  responses.ENG.photography.content = [];
  responses.ENG.photography.setting = [];
  responses.ENG.photography.camera_angle = [];
  responses.ENG.photography.camera_settings = [];
  responses.ENG.photography.lighting = [];
  responses.ENG.photography.emotion = [];

  responses.CZ.painting.type = "";
  responses.CZ.painting.content = [];
  responses.CZ.painting.setting = [];
  responses.CZ.painting.emotion = [];
  responses.CZ.painting.looks = [];
  responses.CZ.painting.style = [];

  responses.CZ.sculpture.type = [];
  responses.CZ.sculpture.content = [];
  responses.CZ.sculpture.form = [];
  responses.CZ.sculpture.emotion = [];
  responses.CZ.sculpture.looks = [];
  responses.CZ.sculpture.style = [];

  responses.CZ.photography.content = [];
  responses.CZ.photography.setting = [];
  responses.CZ.photography.camera_angle = [];
  responses.CZ.photography.camera_settings = [];
  responses.CZ.photography.lighting = [];
  responses.CZ.photography.emotion = [];

  responses.DE.painting.type = "";
  responses.DE.painting.content = [];
  responses.DE.painting.setting = [];
  responses.DE.painting.emotion = [];
  responses.DE.painting.looks = [];
  responses.DE.painting.style = [];

  responses.DE.sculpture.type = [];
  responses.DE.sculpture.content = [];
  responses.DE.sculpture.form = [];
  responses.DE.sculpture.emotion = [];
  responses.DE.sculpture.looks = [];
  responses.DE.sculpture.style = [];

  responses.DE.photography.content = [];
  responses.DE.photography.setting = [];
  responses.DE.photography.camera_angle = [];
  responses.DE.photography.camera_settings = [];
  responses.DE.photography.lighting = [];
  responses.DE.photography.emotion = [];

  responses.finalDalleImgLink = "";
  responses.finalDalleImgSignature =
    "data:image/png;base64,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";
}

var finalDalleAssembled = {
  language: "ENG",
  textENG: "dalle ENG prompt",
  textDECZ:
    "oil painting of a debating group of friends on a double deck bus in London, warm, cosy, good energy",
};

function assembleFinalDalle(text, langText) {
  finalDalleAssembled.textENG = text;
  finalDalleAssembled.textDECZ = langText;
}

//Function to assemble full response (input int DALLE)
function assembleResponse(responses, medium, language) {
  /***
   * This function assembles the user input from all stages into a full string input into DALLE2.
   * responses: object containing user input for each stage (object)
   * medium: selected art medium
   * language: for which language to assemble response (based on language preference)
   */

  let assembledResponse = "";
  for (const [key, value] of Object.entries(responses[language][medium])) {
    if (value.constructor == Array) {
      assembledResponse += value.join("");
    } else {
      assembledResponse += value;
    }
  }
  return assembledResponse;
}

function storeResponse(userInput, stage, responses, medium, language) {
  /***
   * This function stores the user input for the current stage into Responses_Painting object.
   * userInput: input from the user for the current stage (string)
   * stage: current stage id (integer)
   * medium: selected art medium
   * language: language preference being used
   */
  if (typeof userInput === "undefined") {
    userInput = "";
  }
  if (language === "ENG") {
    if (medium === "painting") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ] = userInput;
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" of " + userInput);
      } else if (stage == 3 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if ((stage == 4 || stage == 5) && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", in the style of " + userInput);
      }
    } else if (medium === "sculpture") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(userInput + " sculpture");
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" of " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", in the style of " + userInput);
      }
    } else if (medium === "photography") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push("A photograph of " + userInput);
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5 || stage == 6) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      }
    }
  } else if (language === "CZ") {
    if (medium === "painting") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ] = userInput;
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" vyobrazující " + userInput);
      } else if (stage == 3 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if ((stage == 4 || stage == 5) && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", ve stylu " + userInput);
      }
    } else if (medium === "sculpture") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(userInput + " socha");
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", ve stylu " + userInput);
      }
    } else if (medium === "photography") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push("Fotografie " + userInput);
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5 || stage == 6) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      }
    }
  } else if (language === "DE") {
    if (medium === "painting") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ] = userInput;
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (stage == 3 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if ((stage == 4 || stage == 5) && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", im Stil " + userInput);
      }
    } else if (medium === "sculpture") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(userInput + "skulptur");
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      } else if (stage == 6 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", im Stil " + userInput);
      }
    } else if (medium === "photography") {
      if (stage == 1) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push("Ein Foto " + userInput);
      } else if (stage == 2 && userInput.length > 0) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(" " + userInput);
      } else if (
        (stage == 3 || stage == 4 || stage == 5 || stage == 6) &&
        userInput.length > 0
      ) {
        responses[language][medium][
          Object.keys(responses[language][medium])[stage - 1]
        ].push(", " + userInput);
      }
    }
  }
}

module.exports = {
  responses,
  resetResponses,
  assembleFinalDalle,
  finalDalleAssembled,
  assembleResponse,
  storeResponse,
};
