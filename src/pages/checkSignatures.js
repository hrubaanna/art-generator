//this page will serve as a check for signatures
//if an image is uploaded with a vulgar or innapropriate signature
//it can be checked and removed from this page

import React from "react";

class CheckSignatures extends React.Component {
  state = {
    signatures: [],
    INTERVAL_LENGTH: 60000,
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#B8E8FC";
    //load the last 20 signatures created
    this.showSignatures();
    setInterval(() => {
      this.showSignatures();
    }, this.state.INTERVAL_LENGTH);
  }

  showSignatures = async () => {
    //load the last 20 signatures created
    this.loadSignatures()
      .then(() => {
        //display them in a list
        //this.displaySignatures();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadSignatures = () => {
    //load the last 20 signatures created

    //remove the previous signatures
    let signatures = document.getElementsByClassName("signature-check");
    while (signatures.length > 0) {
      signatures[0].parentNode.removeChild(signatures[0]);
    }

    return new Promise((resolve, reject) => {
      fetch("/api/getSignatures", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ signatures: data }, () => {
            resolve();

            data.forEach((item, index) => {
              this.displaySignatures(item, index);
            });
          });
        })
        .catch((err) => {
          console.log(err);
          reject("error in getSignatures");
        });
    });
  };

  displaySignatures = (item, index) => {
    //display the signatures in a list

    if (item.signature == "") {
      console.log("a signature was empty");
    } else {
      let ul = document.querySelector("ul");
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = item.signature;
      li.id = `sig_${index}`;
      li.className = "signature-check";
      img.className = "signature-check-img";
      let button = document.createElement("button");
      button.className = "btn";
      button.innerHTML = "Delete Item";
      button.addEventListener("click", () => {
        this.deleteSignature(index);
      });
      li.appendChild(img);
      li.appendChild(button);
      ul.appendChild(li);
    }
  };

  deleteSignature = (index) => {
    //remove li element with id sig_index
    let li = document.querySelector(`#sig_${index}`);
    li.remove();

    //remove the signature from the database
    return new Promise((resolve, reject) => {
      fetch(`/api/getSignatures?q=${this.state.signatures[index].task_id}`, {
        method: "PUT",
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject("error in deleteSignature");
        });
    });
  };

  render() {
    return (
      <div>
        <ul className="signature-check-list"></ul>
      </div>
    );
  }
}

export default CheckSignatures;
