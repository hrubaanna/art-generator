import React from "react";
const { responses } = require("../Components/assembler_Obj");

class TestPage extends React.Component {
  state = {
    signature_color: "black",
    medium: "painting",
    stage: 1,
    language: "ENG",
  };

  changeBackground = () => {
    console.log("clicked");
    document.querySelector("div").style.backgroundColor = "red";
  };

  addImage = () => {
    let image = document.createElement("img");
    image.src = "https://i.imgur.com/1h1Y1YR.jpg";
    document.querySelector("div").appendChild(image);
    image.setAttribute("id", "1");
    image.addEventListener("click", this.showId);
  };

  showId = (e) => {
    console.log(e.target.id);
  };

  render() {
    return (
      <div>
        <h1>Testing the HintCloudTest</h1>

        <button onClick={this.addImage}> add image </button>
      </div>
    );
  }
}

export default TestPage;
