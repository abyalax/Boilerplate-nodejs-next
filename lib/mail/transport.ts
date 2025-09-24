import nodemailer from 'nodemailer';

import { env } from '~/common/const/credential';

export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.GOOGLE_EMAIL,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});
