import nodemailer from 'nodemailer';
import userModel from '@/models/users';
import bcrypt from 'bcryptjs'

export default async function sendEmail({ email, emailType, userId }) {
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType == 'VERIFY') {
      await userModel.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 900000,
        }
      }
      )
    }
    else if (emailType == 'RESET') {
      await userModel.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 900000,
        }
      }
      )
    }

    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f74f850032e207",
        pass: "b308f029ed2589"
      }
    });

    let mailContext;
    let mailSubject;

    if(emailType == 'VERIFY')
    {
      mailSubject = "verify your email";
      mailContext = `Click <a href="http://localhost:3000/member/verifyMail?token=${hashedToken}">here</a> to verify your email address or copy paste below link to verify. <br><br> http://localhost:3000/member/verifyMail?token=${hashedToken}`
    }else if(emailType == 'RESET')
    {
      mailSubject = "Reset your password";
      mailContext = `Click <a href="http://localhost:3000/member/resetpassword?token=${hashedToken}">here</a> to reset your password or copy paste below link. <br><br> http://localhost:3000/member/resetpassword?token=${hashedToken}`
    }else if(emailType == 'PASS')
    {
      mailSubject = "Default Login credentials";
      mailContext = `<h1>Dear customer,</h1><p>your account is created successfully, you can access your profile using following credentials:- </p><br/><p>Password => ${userId}</p><br/><h2>Thank you</h2>`
    }

    const mailData = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: mailSubject,
      html: mailContext
    }

    const mailresponse = await transport.sendMail(mailData);

    return mailresponse;

  } catch (error) {
    throw new Error(error.message);
  }
}