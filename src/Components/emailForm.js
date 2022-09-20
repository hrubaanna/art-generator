import React from "react";
import { useState } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function EmailForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    let data = {
      email,
      name,
      src: "../../../public/TestPhotos/DALLE_1.png",
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
    setFormIsVisible(true);
  };

  return (
    <div className="signature-scheme">
      {!formIsVisible ? (
        <div>
          {/* add into selection-title for lang options {titleText[this.props.lang]} */}
          <h1 className="selection-title">
            Would you like to receive an email of your piece?
          </h1>
          <Link href={"/finalPage"}>
            <button className="btn btn-signature-cancel">No</button>
          </Link>
          <button className="btn btn-signature" onClick={showEmailInput}>
            Yes
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
