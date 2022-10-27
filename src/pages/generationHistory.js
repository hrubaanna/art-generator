import React from "react";

class GenerationHistory extends React.Component {
  //this page returns all generations created by the user in the last X days

  state = {
    art: [],
    artObjects: [],
    DBLoaded: false,
    loadingTimeout: null,
  };

  componentDidMount() {
    document.body.setAttribute("style", "overflow-y: visible !important;");
    this.loadGenerations();
  }

  loadGenerations = async () => {
    return new Promise((resolve, reject) => {
      // load random images from the DB, store in artObjects
      this.getDBArt().then(() => {
        this.addGenerationToScreen();
      });
      resolve();
    });
  };

  addGenerationToScreen = () => {
    //for each generation, create a li item on screen with the information
    let table = document.querySelector("#generationsDiv");

    this.state.art.forEach((generation) => {
      let item = document.createElement("tr");
      item.className = "generationItem";
      item.id = generation.task_id;

      let contentTd = document.createElement("td");
      contentTd.innerHTML = generation.content;
      item.appendChild(contentTd);

      let createdTd = document.createElement("td");
      createdTd.innerHTML = generation.created_at;
      item.appendChild(createdTd);

      let emailTd = document.createElement("td");
      if (generation.email == "") {
        emailTd.innerHTML = "anonymous";
      } else {
        emailTd.innerHTML = generation.email;
      }
      item.appendChild(emailTd);

      let nameTd = document.createElement("td");
      if (generation.name == "") {
        nameTd.innerHTML = "anonymous";
      } else {
        nameTd.innerHTML = generation.name;
      }
      item.appendChild(nameTd);

      let imageTd = document.createElement("td");
      let image = document.createElement("button");
      image.innerHTML = "Get image";
      image.className = "getGenerationImage";
      image.addEventListener("click", () => {
        this.getArtFromTask(generation.task_id, generation.selected_pos);
      });
      imageTd.appendChild(image);
      item.appendChild(imageTd);

      table.appendChild(item);
    });
  };

  getDBArt = () => {
    return new Promise((resolve, reject) => {
      // get the artwork saved in mongo DB
      fetch(`/api/getGenerationsInTime`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ art: data }, () => {
            resolve();
            this.setState({ DBLoaded: true });
          });
        })
        .catch((err) => {
          console.log(err);
          reject("error in getDBRandomArt");
        });
    });
  };

  getArtFromTask = (generationId, selected_pos) => {
    return new Promise((resolve, reject) => {
      // get the task for each art piece
      fetch(`/api/dalleTask?q=${generationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let img_link = data.result.generations.data[selected_pos].generation;
          window.open(img_link.image_path, "_blank").focus();
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject("error in getArtFromTasks");
        });
    });
  };

  render() {
    return (
      <div>
        <table id="generationsDiv">
          <tr id="headerRow">
            <th>Content:</th>
            <th>Created:</th>
            <th>Email:</th>
            <th>Name:</th>
            <th>Get image:</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default GenerationHistory;
