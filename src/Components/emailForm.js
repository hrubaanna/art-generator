import React from "react";
import { useState } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function EmailForm(props) {
  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
  const placeholderEmail = {
    ENG: "Enter email",
    CZ: "Zadejte email",
    DE: "Email eingeben",
  };
  const placeholderName = {
    ENG: "Enter name (optional)",
    CZ: "Zadejte jméno (dobrovolné)",
    DE: "Namen eingeben (optional)",
  };
  const submitBtn = {
    ENG: "Submit",
    CZ: "Potvrdit",
    DE: "Einreichen",
  };
  const spamWarning = {
    ENG: "(Don't forget to check your spam folder)",
    CZ: "(Nezapomeňte zkontrolovat složku se spamem)",
    DE: "(Vergessen Sie nicht, Ihren Spam-Ordner zu überprüfen)",
  };

  const disclaimer = {
    ENG: "By providing your e-mail address in this form, you agree that PRO-ZETA a.s. will process your personal data and use your e-mail address and other personal data to send you the work you have just created and to contact you to provide you with further information about our products and activities. At any time, you can request removal of your personal data by sending an email to prozeta@prozeta.eu or by using the unsubscribe link in our emails.",
    CZ: "Poskytnutím své e-mailové adresy v tomto formuláři souhlasíte s tím, že společnost PRO-ZETA a.s. bude zpracovávat vaše osobní údaje a používat vaši e-mailovou adresu a další osobní údaje k tomu, aby vám zaslala právě vytvořenou práci a kontaktovala vás za účelem poskytnutí dalších informací o našich produktech a aktivitách. Kdykoli můžete požádat o odstranění svých osobních údajů zasláním e-mailu na adresu prozeta@prozeta.eu nebo pomocí odhlašovacího odkazu v našich e-mailech.",
    DE: "Mit der Angabe Ihrer E-Mail-Adresse in diesem Formular erklären Sie sich damit einverstanden, dass PRO-ZETA a.s. Ihre personenbezogenen Daten verarbeitet und Ihre E-Mail-Adresse sowie andere personenbezogene Daten verwendet, um Ihnen das soeben erstellte Werk zuzusenden und Sie zu kontaktieren, um Ihnen weitere Informationen über unsere Produkte und Aktivitäten zukommen zu lassen. Sie können jederzeit die Löschung Ihrer persönlichen Daten beantragen, indem Sie eine E-Mail an prozeta@prozeta.eu senden oder den Abmeldelink in unseren E-Mails benutzen.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      publishFinalPiece();
    }, 2000);

    let data = {
      email,
      name,
      lang: props.lang,
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
      //TODO: get value of selected img
      selected_pos: props.selected_pos,
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
      <h1 className="final-selection-title">{titleText[props.lang]}</h1>

      {!formIsVisible ? (
        <div>
          <Link href={`/finalPage`}>
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
          <p id="disclaimer">{disclaimer[props.lang]}</p>
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
              placeholder={placeholderEmail[props.lang]}
            ></input>
          </formGroup>
          <formGroup>
            <input
              className="input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={placeholderName[props.lang]}
              name="name"
              id="name"
            />
          </formGroup>

          <Link href={`/finalPage`}>
            <input
              className="btn btn-signature"
              id="send-email"
              type="submit"
              value={submitBtn[props.lang]}
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </Link>

          <p id="check-spam">
            <i> {spamWarning[props.lang]}</i>
          </p>
        </form>
      )}
    </div>
  );
}
