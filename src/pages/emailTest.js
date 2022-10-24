import React from "react";
import EmailForm from "../Components/emailForm";
const { finalDalleAssembled } = require("../Components/assembler_Obj");

class EmailTest extends React.Component {
  state = {
    titleText: {
      ENG: "Would you like to receive an email of your piece?",
      CZ: "Chcete dostat email s vaším dílem?",
      DE: "Möchten Sie eine E-Mail mit Ihrem Stück erhalten?",
    },
    disclaimer: {
      ENG: "By providing your e-mail address in this form, you agree that PRO-ZETA a.s. will process your personal data and use your e-mail address and other personal data to send you the work you have just created and to contact you to provide you with further information about our products and activities. At any time, you can request removal of your personal data by sending an email to prozeta@prozeta.eu or by using the unsubscribe link in our emails.",
      CZ: "Poskytnutím své e-mailové adresy v tomto formuláři souhlasíte s tím, že společnost PRO-ZETA a.s. bude zpracovávat vaše osobní údaje a používat vaši e-mailovou adresu a další osobní údaje k tomu, aby vám zaslala právě vytvořenou práci a kontaktovala vás za účelem poskytnutí dalších informací o našich produktech a aktivitách. Kdykoli můžete požádat o odstranění svých osobních údajů zasláním e-mailu na adresu prozeta@prozeta.eu nebo pomocí odhlašovacího odkazu v našich e-mailech.",
      DE: "Mit der Angabe Ihrer E-Mail-Adresse in diesem Formular erklären Sie sich damit einverstanden, dass PRO-ZETA a.s. Ihre personenbezogenen Daten verarbeitet und Ihre E-Mail-Adresse sowie andere personenbezogene Daten verwendet, um Ihnen das soeben erstellte Werk zuzusenden und Sie zu kontaktieren, um Ihnen weitere Informationen über unsere Produkte und Aktivitäten zukommen zu lassen. Sie können jederzeit die Löschung Ihrer persönlichen Daten beantragen, indem Sie eine E-Mail an prozeta@prozeta.eu senden oder den Abmeldelink in unseren E-Mails benutzen.",
    },
  };
  render() {
    return (
      <div className="email-form">
        <EmailForm lang={finalDalleAssembled.language} />
        <p>${this.state.disclaimer.finalDalleAssembled.language}</p>
      </div>
    );
  }
}

export default EmailTest;
