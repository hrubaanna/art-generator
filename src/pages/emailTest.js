import React from "react";
import EmailForm from "../Components/emailForm";
const { finalDalleAssembled } = require("../Components/assembler_Obj");

class EmailTest extends React.Component {
  state = {
    titleText: {
      ENG: "Would you like to receive an email of your piece?",
      CZ: "Chcete dostat email s vaším dílem?",
      DE: "Möchten Sie eine E-Mail mit Ihrem Stück erhalten?",
    },
  };
  render() {
    return (
      <div className="email-form">
        <h1 className="selection-title">
          {this.state.titleText[finalDalleAssembled.language]}
        </h1>
        {/* <h1>Email Test</h1> */}
        <EmailForm lang={finalDalleAssembled.language} />
      </div>
    );
  }
}

export default EmailTest;
