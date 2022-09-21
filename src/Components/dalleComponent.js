import React from "react";
import FinalPublishing from "./finalPublishing";

class DalleComponent extends React.Component {
  state = {
    token: "",
    query: "",
    result: [],
    loadedImages: 0,
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
    // console.log(`token: ${process.env.DALLE_TOKEN}`);
    this.setState({ token: process.env.DALLE_TOKEN }, this.getDalle2);
    this.setState({ query: this.props.text });
  }

  getDalle2 = () => {
    if (this.state.query != "" && this.state.token != "") {
      this.setState({ error: false });

      fetch(`/api/dalle2?q=${this.state.query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ result: data.result.data }, this.displayImages);
          this.setState({ result_provided: true });
          this.setState({ task_id: data.result.data[0].task_id });

          // hide facts and change heading
          document.querySelector(".facts").classList.add("short-fadeOut");
          document.querySelector(".selection-title").innerHTML =
            "Select your favourite artwork"; // TODO: missing translation
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
          this.setState({ error: true });
        });
    } else {
      this.setState({ error: true });
    }
  };

  displayImages = () => {
    this.state.result.forEach((result) => {
      // create image elements inside a card element
      let card = document.createElement("div");
      card.className = "dalle-card";
      card.addEventListener("click", this.displayFavorite);
      let img = document.createElement("img");
      img.src = result.generation.image_path;
      img.className = "imgPreview";
      card.append(img);
      document.querySelector(".dalle-grid").append(card);

      // wait for all images to load
      img.onload = () => {
        this.setState({ loadedImages: this.state.loadedImages + 1 });
        if (this.state.loadedImages === this.state.result.length - 1) {
          let duration = 1000; // same as fadeIn effect on DALL-E images

          // remove loader
          let loader = document.querySelector(".loader");

          // have to manually animate so as not to remove the previous animation, then remove
          loader.animate([{ opacity: "1" }, { opacity: "0" }], {
            duration: duration,
            fill: "forwards",
          });
          setTimeout(() => {
            loader.remove();
          }, duration);

          // show images
          let imgs = document.querySelectorAll(".imgPreview");
          imgs.forEach((i) => {
            i.className += " imgPreview-show";
          });
        }
      };
    });
  };

  // selects which image you picked and hides the rest, while enlarging the remaining one and adding finalStyling component
  displayFavorite = (e) => {
    this.setState({ image_selected: true });
    this.setState({ final_image_src: e.target.src });
    this.setState({ selected_img_pos: e.target.id });

    //remove all photos from screen
    document.querySelectorAll(".dalle-card").forEach((card) => {
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
    document.querySelector(".selection-title").style.display = "none";
    document.querySelector(".final-query").style.display = "none";
  };

  render() {
    return (
      <div>
        <div className="final-query">{this.props.langText}</div>

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

        {!this.state.image_selected ? (
          <div className="dalle-grid">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
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
