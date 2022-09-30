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
