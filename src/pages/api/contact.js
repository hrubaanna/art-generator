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

  const mailData = {
    from: "01aesthetics@email.cz",
    to: req.body.email,
    //subject: `Message From ${req.body.name}`,
    subject: `Message From Anna`,
    html: `
    <div style="background-color: rgba(51, 51, 153, 0.6)">
      <h1
        style="padding-top: 2%; text-align: center; color: rgb(248, 225, 203)"
      >
        Message From Anna
      </h1>
      <h2 style="margin-top: 5%; text-align: center">
        Thank you for using the <em> 01 Aesthetics X Dalle </em> art generator
      </h2>
      <p style="text-align: center">Take a look at the piece you created!</p>
      <p style="text-align: center; color: rgb(248, 225, 203)">
        "Botanical illustration of alien houseplant underwater, apocalyptic,
        sci-fi, in the style of Joan Miro."
      </p>
      <img
        style="margin: auto; display: block"
        src="${req.body.src}"
        alt="Generated Art"
        height="30%"
        width="30%"
      />
    `,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
