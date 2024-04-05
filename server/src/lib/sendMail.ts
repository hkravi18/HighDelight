import nodemailer from "nodemailer";
import { SendMailHandler } from "interfaces/lib.interface";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const sendMail = async ({ from, to, subject, text, html }: SendMailHandler) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log("Email message sent: %s", info.messageId);
    return info;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`ERROR (send-email): ${err.message}`);
    }
    return null;
  }
};

export default sendMail;
