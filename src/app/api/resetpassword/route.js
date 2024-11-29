import { NextResponse } from "next/server";
import userModel from "@/models/users";
import sendEmail from "@/utils/mailer";
import bcrypt from 'bcryptjs';

export async function GET(request)
{
    let email = await request.nextUrl.searchParams.get('email');
    try {
        let user = await userModel.findOne({email});

        if(!user)
        {
            return NextResponse.json({message : "No user Found"})
        }
        let id = user._id;

        let res = await sendEmail({email,emailType : 'RESET',userId : id});

        return NextResponse.json({message : "Email has been sent for password reset, Check Inbox"});
    } catch (error) {
        return NextResponse.json({message : error.message});
    }
}

export async function POST(request)
{
    const reqbody = await request.json();
    const {token} = reqbody;

    try {

        let user = await userModel.findOne({'forgotPasswordToken' : token, 'forgotPasswordTokenExpiry' : {
            $gt : Date.now()
        }})
        
        if(!user)
        {
            return NextResponse.json({message : 'User token Expired', status : 498 });
        }
        return NextResponse.json({message : 'Can change password',status : 200});
        
    } catch (error) {
        return NextResponse.json({message : error.message, status : 500})
    }
}

export async function PUT(request)
{
    let { password,token } = await request.json();

    try {

        let user = await userModel.findOne({'forgotPasswordToken' : token, 'forgotPasswordTokenExpiry' : {
            $gt : Date.now()
        }})
        
        if(!user)
        {
            return NextResponse.json({message : 'User token Expired', status : 498 });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        user.password = hashedpassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message : 'Password Updated Sucessfully',status : 200});
        
    } catch (error) {
        return NextResponse.json({message : error.message, status : 500})
    }

}