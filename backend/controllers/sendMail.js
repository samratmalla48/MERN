import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
  res.send("i am sendmail")
  try {
  

    // connect with the smtp
    let transporter = nodemailer.createTransport({
      
      service:'gmail',
      port: 587,
      auth: {
        user: "testsamrat000@gmail.com",
        pass: process.env.PASS
      },
    });

    let info = await transporter.sendMail({
      from: '"testsamrat000@gmail.com>', // sender address
      to: "samratmalla48@gmail.com", // list of receivers
      subject: "Hello samrat", // Subject line
      text: "Hello maya sanu", // plain text body
      html: "<b>Hello YT Thapa</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while sending the email." });
  }
};

export default sendMail;