import { logger } from "@skillprompt-lms/libs/api-contract/utils/logger";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env["USER"],
      pass: process.env["PASS"],
    },
  });
export function sendingEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const mailOptions = {
      from: process.env["USER"],
      to,
      subject,
      text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       logger.info(`error sending email`,error)
      } else {
        logger.info(`OTP sent to `,info.response)
      }
    });
  }
