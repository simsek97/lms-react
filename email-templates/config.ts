import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  // Yes. SMTP!
  service: 'SMTP',
  host: process.env.SMTP_HOST,
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});
