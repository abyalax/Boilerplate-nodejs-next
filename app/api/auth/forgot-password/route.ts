import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/common/const/credential';
import { safeHandler } from '~/lib/handler/safe-handler';
import { transport } from '~/lib/mail/transport';

export const POST = safeHandler(async (req: NextRequest) => {
  const { email } = await req.json();

  // TODO : check if email exist first

  console.log(email);

  const expiresIn = '5m';
  const token = jwt.sign({ email }, env.JWT_SECRET, { expiresIn });
  const resetLink = `${env.BASE_URL}/auth/reset-password?token=${token}`;

  const html = `
    <p><strong>You have requested a password change</strong></p>
    <p>We received a request to reset the password for your account. 
    To proceed, please click the link below to create a new password:</p>
    <p><a href="${resetLink}">${env.BASE_URL}</a></p>
    <p>This link will expire in <b>${expiresIn}</b>.</p>
    <p>If you didn't request this password reset, please ignore this email or let us know immediately. 
    Your account remains secure.</p>
    <p>Best regards,<br/>Abya's Team</p>
  `;

  const send = await transport.sendMail({
    from: `"Abya's Team" <${process.env.EMAIL_APPS}>`,
    to: email,
    subject: 'Reset Password',
    html,
  });

  if (send.response.includes('250 2.0.0 OK')) {
    console.log('success send mail for: ', send.envelope);
    return NextResponse.json({ message: 'Success Send Reset Password' }, { status: 200 });
  } else {
    console.log('error send mail: ', send);
    return NextResponse.json({ message: 'Failed Send Reset Password' }, { status: 500 });
  }
});
