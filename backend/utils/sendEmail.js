// utils/sendEmail.js

import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: "testsamrat000@gmail.com",
        pass: process.env.PASS
      },
    });

    let info = await transporter.sendMail({
      from: '"testsamrat000@gmail.com',
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while sending the email.");
  }
};

export default sendEmail;
