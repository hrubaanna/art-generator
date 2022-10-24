export default function (req, res) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.seznam.cz",
    auth: {
      //TODO: create burner email for sending emails
      user: "01aesthetics@email.cz",
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  let greetingBlock = "";
  let textBlock1 = "";
  let textBlock2 = "";
  let textBlock3 = "";
  let textBlock4 = "";

  const lang = req.body.lang;
  if (lang == "ENG") {
    greetingBlock =
      req.body.name === ""
        ? "Congratulations, "
        : `Congratulations ${req.body.name},`;

    textBlock1 =
      "You have just become part of an exhibition featuring artists such as Raphael, Sandro Botticelli, Albrecht Dürer, Caspar David Friedrich, Rembrandt and Johannes Vermeer.";
    textBlock2 =
      " Your art will be exhibited in a unique virtual gallery that will take you away from the busy atmosphere of the it-sa fair for a while and guide you through the artworks of the Dresden State Art Collections (SKD).";
    textBlock3 =
      "So come and see your unique creation that combines the latest technology, art and interactivity.";
    textBlock4 =
      "You will find your painting at the Blindspot by Prozeta booth in Hall 7A booth 604.";
  } else if (lang == "CZE") {
    greetingBlock =
      req.body.name === "" ? "Gratulujeme, " : `Gratulujeme ${req.body.name},`;

    textBlock1 =
      "Právě jste se stali součástí výstavy, kde se nachází umělci jako Raphael, Sandro Botticelli, Albrecht Dürer, Caspar David Friedrich, Rembrandt nebo Johannes Vermeer.";
    textBlock2 =
      "Vaše umění bude vystaveno v jedinečné virtuální galerii, která vás na chvíli odvede od rušného veletržního dění veletrhu it-sa a provede vás uměleckými díly Státních uměleckých sbírek Drážďany (SKD).";
    textBlock3 =
      "Přijďte se tedy podívat na váš jedinečný výtvor, jež spojuje technologii, kulturu a interaktivitu.";
    textBlock4 =
      "Váš obraz najdete stánku Blindspot by Prozeta v hale 7A stánek 604.";
  } else {
    greetingBlock = "Herzlichen Glückwunsch!";

    textBlock1 =
      "Sie sind gerade Teil einer Ausstellung geworden, in der Künstler wie Raffael, Sandro Botticelli, Albrecht Dürer, Caspar David Friedrich, Rembrandt und Johannes Vermeer vertreten sind.";
    textBlock2 =
      "Ihre Kunst wird in einer einzigartigen virtuellen Galerie ausgestellt, die Sie für eine Weile aus der geschäftigen Atmosphäre der it-sa herausholt und Sie durch die Kunstwerke der Staatlichen Kunstsammlungen Dresden (SKD) führt.";
    textBlock3 =
      "Kommen Sie also zu uns und sehen Sie sich Ihre einzigartige Kreation an, die modernste Technologie, Kunst und Interaktivität vereint.";
    textBlock4 =
      "Sie finden Ihr Gemälde am Stand von Blindspot by Prozeta in Halle 7A Stand 604.";
  }

  const mailData = {
    from: "01aesthetics@email.cz",
    to: req.body.email,
    subject: `Blindspot by Prozeta`,
    html: `
    <div
      style="
        background-color: rgb(0, 171, 142);
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
          'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      "
    >
      <div
        style="
          background-color: #fbfbfb;
          width: 70%;
          margin: auto;
          display: block;
        "
      >
        <h2 style="padding-top: 2%; text-align: center; color: rgb(0, 171, 142); ">
        ${greetingBlock}
        </h2>
        <h3 style="margin-top: 5%; text-align: center; color: #000000;">
          ${textBlock1}
        </h3>
        <p style="text-align: center; color: #000000">
        ${textBlock2}
        </p>
        <p style="text-align: center; color: #000000>
        ${textBlock3}
        </p>
        <p style="text-align: center; color: #000000>
        ${textBlock4}
        </p>
        <hr style="width: 70%" />
        <p
          style="
            text-align: center;
            color: rgb(0,141,170);
            max-width: 70%;
            margin: auto;
          "
        >
        "${req.body.query}."
        </p>
        <img
          style="margin: auto; display: block; padding: 5%; border-radius: 15%"
          src="${req.body.src}"
          alt="Generated Art"
          height="30%"
          width="30%"
        />
      </div>
    </div>
    `,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
