import React from "react";
import Link from "next/link";

const { resetResponses } = require("../Components/assembler_Obj");

class StartOverButton extends React.Component {
  state = {
    ENG: "Exit",
    CZ: "Konec",
    DE: "Ende",
  };

  render() {
    return (
      <Link href={"/"}>
        <button className="btn btn-restart" onClick={resetResponses}>
          {this.state[this.props.lang]}
        </button>
      </Link>
    );
  }
}

export default StartOverButton;
