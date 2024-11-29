import userModel from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import sendEmail from "@/utils/mailer";

export async function POST(request) {

    let data = await request.json();
    let usermail = data.email;

    let existinguser = await userModel.findOne({ 'email' : usermail });
    if(existinguser)
    {
        return NextResponse.json({ message: "User Already Exist",status : 403 })
    }

    let password = data.password;
    let hashpass = await bcrypt.hash(password, 10);

    let newuser = {
        name : data.name,
        email : data.email,
        password : hashpass,
        phone : data.phone
    }

    try {
        let saveduser = await userModel.create(newuser);

        let result = await sendEmail({email : usermail,emailType : 'VERIFY',userId :saveduser._id});
        return NextResponse.json({ message: "User Added Successfully. Verification mail has been sent, Check Inbox", status : 200 })
        
    } catch (error) {
        return NextResponse.json({ message: error , status: 500 })
    }

}