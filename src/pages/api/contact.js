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

  const greetingBlock =
    req.body.name === "" ? "Hello, " : `Dear ${req.body.name},`;

  const mailData = {
    from: "01aesthetics@email.cz",
    to: req.body.email,
    subject: `Your Artwork from 01 Aesthetics`,
    html: `
    <div
      style="
        background-color: #aebdca;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
          'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      "
    >
      <div
        style="
          background-color: #7895b2;
          width: 70%;
          margin: auto;
          display: block;
        "
      >
        <h1 style="padding-top: 2%; text-align: center; color: #f5efe6">
        ${greetingBlock}
        </h1>
        <h2 style="margin-top: 5%; text-align: center; color: #e8dfca">
          Thank you for using the <em> 01 Aesthetics X DALL-E 2 </em> art
          generator
        </h2>
        <hr style="width: 70%" />
        <p style="text-align: center; color: #cabc9f">
          Take a look at the piece you created:
        </p>
        <p
          style="
            text-align: center;
            color: #e8dfca;
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
