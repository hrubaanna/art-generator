import React from "react";
import { useState } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function EmailForm(props) {
  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const titleText = {
    ENG: "Would you like to receive an email of your piece?",
    CZ: "Chcete dostat email s vaším dílem?",
    DE: "Möchten Sie eine E-Mail mit Ihrem Stück erhalten?",
  };
  const buttonTextYes = {
    ENG: "Yes",
    CZ: "Ano",
    DE: "ja",
  };
  const buttonTextNo = {
    ENG: "No",
    CZ: "Ne",
    DE: "nein",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      publishFinalPiece();
    }, 2000);

    let data = {
      email,
      name,
      src: props.finalImage,
      query: props.query,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
        setSubmitted(true);
        setEmail("");
        setName("");
      }
    });
    Router.push("/finalPage");
  };

  const showEmailInput = () => {
    console.log("wanted to publish:");
    console.log(props.wantToPublish);
    setFormIsVisible(true);
  };

  const publishFinalPiece = () => {
    //if user selected they want to publish the piece,
    // add it to gallery and save information to DB
    //if not, skip this step
    if (props.wantToPublish) {
      addArt();
    }
  };

  //add photo to gallery database, show the gallery on the page
  const addArt = async () => {
    let artpiece = {
      task_id: props.task_id,
      signature: props.signatureSrc,
      content: props.query,
      //TODO: add email and name
      name: name,
      email: email,
      //add source of signature
      created_at: new Date().toISOString(),
      currently_selected: false,
      //TODO: get value of selected img
      signature_color: props.signatureColor,
      selected_pos: props.selected_img_pos,
    };

    //save the artpiece
    let response = await fetch("/api/artwork", {
      method: "POST",
      body: JSON.stringify(artpiece),
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      console.log("success");
      // set the message
    } else {
      // set the error
      console.log("error");
    }
  };

  return (
    <div className="email-scheme">
      {/* add into selection-title for lang options {titleText[this.props.lang]} */}
      <h1 className="selection-title">{titleText[props.lang]}</h1>
      {!formIsVisible ? (
        <div>
          <Link href={"/finalPage"}>
            <button
              className="btn btn-signature-cancel"
              id="send-email"
              onClick={publishFinalPiece}
            >
              {buttonTextNo[props.lang]}
            </button>
          </Link>
          <button
            className="btn btn-signature"
            id="send-email"
            onClick={showEmailInput}
          >
            {buttonTextYes[props.lang]}
          </button>
        </div>
      ) : (
        <form className="form">
          <formGroup>
            <input
              className="input"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              id="email"
              placeholder="Enter email"
            ></input>
          </formGroup>
          <formGroup>
            <input
              className="input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter name (optional)"
              name="name"
              id="name"
            />
          </formGroup>
          <Link href={"/finalPage"}>
            <input
              className="btn btn-signature"
              id="send-email"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </Link>
        </form>
      )}
    </div>
  );
}
