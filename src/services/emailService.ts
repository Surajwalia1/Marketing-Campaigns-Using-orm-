// src/services/emailService.ts
import nodemailer from 'nodemailer';



/**
 * Sends an email to the specified recipient using nodemailer.
 * Configures the email transport and sends an email with the provided subject and text.
 * @function sendEmail
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The body content of the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
 */


export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    // Configure your email transport (e.g., using Gmail, SMTP, etc.)
    service: 'Gmail',
    auth: {
      user: 'walia.75way@gmail.com',
      pass: 'cwganvczwigkepfh',
    },
  });

  const mailOptions = {
    from: 'walia.75way@gmail.com',
    to: "surajwalia12387@gmail.com",
    subject:"Wish me brooo at 12",
    text:"Tommorow is my birthday come to party",
  };

  await transporter.sendMail(mailOptions);
};
