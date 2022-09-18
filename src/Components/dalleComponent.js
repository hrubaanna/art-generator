import React from "react";
import FinalPublishing from "./finalPublishing";

class DalleComponent extends React.Component {
  state = {
    token: "",
    query: "",
    result: [],
    loading: false,
    error: false,
    result_provided: false,
    image_selected: false,
    final_image_src: "",
    task_id: "",
    selected_img_pos: "1",
    button: {
      ENG: "Generating Artwork",
      CZ: "Dílo se vytváří",
      DE: "Ihre Grafik wird generiert",
    },
  };

  componentDidMount() {
    //console.log(`token: ${process.env.DALLE_TOKEN}`);
    this.setState({ token: process.env.DALLE_TOKEN });
    this.setState({ query: this.props.text });
    setTimeout(() => {
      this.getDalle2();
    }, 1000);
  }

  getDalle2 = () => {
    if (this.state.query != "" && this.state.token != "") {
      this.setState({ loading: true });
      this.setState({ error: false });

      fetch(`/api/dalle2?q=${this.state.query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //fixed bug by adding .data to the end of the result
          this.setState({ result: data.result.data });
          this.setState({ loading: false });
          //
          this.setState({ result_provided: true });
          this.setState({ task_id: data.result.data[0].task_id });
          //hide 'Generating artwork' heading when results are provided
          document.querySelector("#generate-art").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: true });
          this.setState({ loading: false });
        });
    } else {
      this.setState({ error: true });
    }
  };

  // selects which image you picked and hides the rest, while enlarging the remaining one and adding finalStyling component
  displayFavorite = (e) => {
    this.setState({ image_selected: true });
    this.setState({ final_image_src: e.target.src });
    this.setState({ selected_img_pos: e.target.id });

    //remove all photos from screen
    document.querySelectorAll(".card").forEach((card) => {
      card.style.display = "none";
    });

    //create new img element
    const newImg = document.createElement("img");
    newImg.src = e.target.src;
    newImg.className = "final-img";
    newImg.setAttribute(
      "style",
      "width: 15em; height: 15em; margin: auto; display: block; border-radius: 10px"
    );
    newImg.style.transition = "transform 0.5s ease";
    //append new img element to the div grid
    document.querySelector(".dalle-grid").appendChild(newImg);

    // e.target.transform = "scale(1.3)";
    // e.target.className = "finalChoice";

    //remove other elements from page
    document.querySelector("h1").style.display = "none";
    document.querySelector(".final-query").style.display = "none";
    document.querySelector(".facts").style.display = "none";
  };

  render() {
    return (
      <div>
        {/* show select heading when results are provided*/}
        {this.state.result_provided && !this.state.image_selected ? (
          <h1 className="selection-title">Select your favourite artwork</h1>
        ) : null}

        <h3 className="final-query">{this.props.langText}</h3>

        {/* {
          //hide the Get Result button after the query has been sent

          this.state.loading == false &&
          this.state.error == false &&
          this.state.result_provided == false &&
          this.state.image_selected == false ? (
            <button
              id="btn-finish-assemble"
              className="btn"
              onClick={this.getDalle2}
            >
              {" "}
              {this.state.button[this.props.lang]}{" "}
            </button>
          ) : null
        } */}

        {/* {
                //TODO: change background color one the results are provided (this code is not working)
                this.state.result_provided === true ? 
                document.querySelector('body').style.backgroundColor = '#f5f5f5' : null
           }  */}

        {this.state.error ? (
          <p className="error">
            {" "}
            your query could not be processed at this time{" "}
          </p>
        ) : null}

        {this.state.loading && (
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {!this.state.image_selected ? (
          <div>
            {/* <p onClick={this.displayFavorite}>get me forward</p> */}
            <div className="dalle-grid">
              {this.state.result.map((result, index) => {
                return (
                  //TODO. hide card
                  <div className="card" onClick={this.displayFavorite}>
                    <img
                      id={index}
                      src={result.generation.image_path}
                      alt=""
                      className="imgPreview"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <FinalPublishing
            finalImage={this.state.final_image_src}
            query={this.state.query}
            task_id={this.state.task_id}
            selected_img_pos={this.state.selected_img_pos}
            lang={this.props.lang}
          ></FinalPublishing>
        )}
      </div>
    );
  }
}

export default DalleComponent;
