import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  
    const data = await request.json();
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });
    
    const emailContent = `
      <h1>Hello</h1>
      <h4>${data.message}</h4>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
        <li>Phone: ${data.phone}</li>
        <li>Hire for : ${data.radio}</li>
        <li> We are : ${data.dropdown}</li>
        <li>I'm looking for : ${data.CheckboxOptions}</li>
      </ul>
      <p>Best regards</p>
    `;

    const mailData = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: `Message From ${data.name}`,
      html: emailContent,
    }
  
    transporter.sendMail(mailData, (err) => {
      if (err) console.log(err);
    })
    return NextResponse.json({ message: "message sent sucessfully" });
  }