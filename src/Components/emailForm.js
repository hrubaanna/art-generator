import React from "react";
import { useState } from "react";

export default function EmailForm() {
  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    let data = {
      email,
      message,
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
        setMessage("");
      }
    });
  };

  return (
    <div>
      <form>
        <formGroup>
          <label for="email">Email</label>
          <input
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
          <label htmlFor="message">Message</label>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="message"
          />
        </formGroup>
        <input
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
    </div>
  );
}
